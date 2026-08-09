import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { loadLemmas, loadSurah, textRef } from '../content/corpus'
import type { CorpusLemmas, CorpusLine, CorpusSurah } from '../content/corpus/types'
import { TokenSheet, type TokenDetail } from '../components/TokenSheet'
import { db } from '../db/db'
import { flaggedRefs, toggleFlag, tokenRef } from '../reading/flags'
import { knownLemmas, useKnownNoteIds } from '../reading/known'
import {
  setMarkKnown,
  setReadingHideTashkeel,
  useMarkKnown,
  useReadingHideTashkeel,
} from '../reading/settings'
import { stripTashkeel } from '../text/arabic'

/** Arabic-Indic digits, as the mushaf writes an ayah number. */
function arabicNumber(n: number): string {
  return String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])
}

/** One line of a Text: an ayah, or the basmala that heads the surah. */
interface Line {
  line: CorpusLine
  /** 0 for the basmala, which is a heading rather than an ayah of this surah. */
  ayah: number
}

interface Selection {
  line: number
  token: number
  expanded: boolean
}

/** The lines of a surah in reading order, the basmala first when it has one. */
function linesOf(text: CorpusSurah): Line[] {
  return [
    ...(text.basmala ? [{ line: text.basmala, ayah: 0 }] : []),
    ...text.ayat.map((ayah) => ({ line: ayah, ayah: ayah.ayah })),
  ]
}

function LineText({
  entry,
  surah,
  index,
  hideTashkeel,
  known,
  flagged,
  markKnown,
  onSelect,
}: {
  entry: Line
  surah: number
  index: number
  hideTashkeel: boolean
  known: Set<string>
  flagged: Set<string>
  markKnown: boolean
  onSelect: (line: number, token: number) => void
}) {
  const { line, ayah } = entry
  const show = (text: string) => (hideTashkeel ? stripTashkeel(text) : text)
  const parts = []
  let cursor = 0

  for (const [i, token] of line.tokens.entries()) {
    // Whatever sits between two words — spaces, and the waqf marks the mushaf
    // sets off on their own — is text, not a word, and is rendered untouched.
    if (token.start > cursor) {
      parts.push(<span key={`gap-${i}`}>{show(line.text.slice(cursor, token.start))}</span>)
    }
    const lemma = token.segments[token.head].lemma
    const ref = tokenRef(surah, ayah, i + 1)
    const classes = ['tok']
    if (markKnown && lemma && known.has(lemma)) classes.push('known')
    if (flagged.has(ref)) classes.push('flagged')
    parts.push(
      <button
        type="button"
        key={`tok-${i}`}
        className={classes.join(' ')}
        onClick={() => onSelect(index, i)}
      >
        {show(line.text.slice(token.start, token.end))}
      </button>,
    )
    cursor = token.end
  }
  if (cursor < line.text.length) {
    parts.push(<span key="tail">{show(line.text.slice(cursor))}</span>)
  }
  if (ayah > 0) {
    parts.push(
      <span key="mark" className="ayah-mark" aria-label={`ayah ${ayah}`}>
        {arabicNumber(ayah)}
      </span>,
    )
  }
  return <>{parts}</>
}

/**
 * The reader: one whole surah, Arabic only, nothing else on the page.
 *
 * Stateless by design. It reads Content, Corpus and — to mark words already
 * known — Progress, and writes none of them. No reading position, no resume,
 * no tap counts: passive telemetry about what a learner looked at earns little
 * and is not what this app is (docs/adr/0002). The two toggles and a reported
 * error are the only writes, and each is a deliberate act.
 */
export function ReadingSurahPage() {
  const { surah: param } = useParams()
  const surah = Number(param)
  const ref = textRef(surah)

  const [text, setText] = useState<CorpusSurah | null>(null)
  const [lemmas, setLemmas] = useState<CorpusLemmas | null>(null)
  const [failed, setFailed] = useState(false)
  const [selection, setSelection] = useState<Selection | null>(null)

  const hideTashkeel = useReadingHideTashkeel()
  const markKnown = useMarkKnown()
  const knownNotes = useKnownNoteIds()
  const flagged = useLiveQuery(() => flaggedRefs(db), [], new Set<string>())

  // Lazy: each surah is its own chunk, fetched when it is opened, so the main
  // bundle does not grow with the corpus.
  useEffect(() => {
    if (!ref) return
    let live = true
    Promise.all([loadSurah(surah), loadLemmas()])
      .then(([loadedText, loadedLemmas]) => {
        if (!live) return
        setText(loadedText)
        setLemmas(loadedLemmas)
      })
      .catch(() => {
        if (live) setFailed(true)
      })
    return () => {
      live = false
    }
  }, [surah, ref])

  const known = useMemo(
    () => (lemmas ? knownLemmas(lemmas, knownNotes) : new Set<string>()),
    [lemmas, knownNotes],
  )

  const lines = useMemo(() => (text ? linesOf(text) : []), [text])

  const select = (line: number, token: number) =>
    setSelection((current) =>
      // Tapping the same word again opens its grammar: the second tap the
      // reader promises, without a gesture that has to be learned.
      current && current.line === line && current.token === token
        ? { ...current, expanded: true }
        : { line, token, expanded: false },
    )

  if (!ref) {
    return (
      <main className="page">
        <p>That surah is not in the reader yet.</p>
        <p style={{ marginTop: 12 }}>
          <Link to="/reading">← Reading</Link>
        </p>
      </main>
    )
  }

  const chosen = selection ? lines[selection.line] : undefined
  let detail: TokenDetail | null = null
  if (chosen && lemmas && selection) {
    const token = chosen.line.tokens[selection.token]
    const lemmaKey = token.segments[token.head].lemma
    const tokenId = tokenRef(surah, chosen.ayah, selection.token + 1)
    detail = {
      written: chosen.line.text.slice(token.start, token.end),
      token,
      lemma: lemmaKey ? lemmas[lemmaKey] : undefined,
      ref: tokenId,
      known: Boolean(lemmaKey && known.has(lemmaKey)),
      flagged: flagged.has(tokenId),
    }
  }

  return (
    <main className="page reading-page">
      <p style={{ marginBottom: 8 }}>
        <Link to="/reading" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          ← Reading
        </Link>
      </p>
      <h1 className="page-title">
        {ref.name} · <span className="arabic">{ref.nameArabic}</span>
      </h1>

      <div className="reading-toolbar">
        <button
          type="button"
          className={hideTashkeel ? 'toggle on' : 'toggle'}
          aria-pressed={hideTashkeel}
          onClick={() => void setReadingHideTashkeel(!hideTashkeel)}
        >
          Hide tashkeel
        </button>
        <button
          type="button"
          className={markKnown ? 'toggle on' : 'toggle'}
          aria-pressed={markKnown}
          onClick={() => void setMarkKnown(!markKnown)}
        >
          Mark known words
        </button>
      </div>

      {failed && <p className="reading-empty">That surah could not be loaded.</p>}
      {!text && !failed && <p className="reading-empty">Loading…</p>}

      {text && lemmas && (
        <div className="arabic reading-text">
          {lines.map((entry, i) =>
            entry.ayah === 0 ? (
              <p key="basmala" className="reading-basmala">
                <LineText
                  entry={entry}
                  surah={surah}
                  index={i}
                  hideTashkeel={hideTashkeel}
                  known={known}
                  flagged={flagged}
                  markKnown={markKnown}
                  onSelect={select}
                />
              </p>
            ) : null,
          )}
          <p className="reading-body">
            {lines.map((entry, i) =>
              entry.ayah === 0 ? null : (
                <LineText
                  key={entry.ayah}
                  entry={entry}
                  surah={surah}
                  index={i}
                  hideTashkeel={hideTashkeel}
                  known={known}
                  flagged={flagged}
                  markKnown={markKnown}
                  onSelect={select}
                />
              ),
            )}
          </p>
        </div>
      )}

      {detail && selection && (
        <TokenSheet
          detail={detail}
          expanded={selection.expanded}
          onExpand={() => setSelection({ ...selection, expanded: true })}
          onToggleFlag={() => {
            // A pronoun has no lemma in the corpus; the word as written is
            // what makes the report legible in an export either way.
            const head = detail.token.segments[detail.token.head]
            void toggleFlag(db, detail.ref, head.lemma ?? detail.written)
          }}
          onClose={() => setSelection(null)}
        />
      )}
    </main>
  )
}
