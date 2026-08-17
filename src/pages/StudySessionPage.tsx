import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { State } from 'ts-fsrs'
import { deckById, siblingCardsOf } from '../content/decks'
import type { Direction, Example, Note } from '../content/types'
import { exampleOf } from '../content/types'
import { db, type CardStateRow } from '../db/db'
import {
  answerCard,
  intervalLabel,
  previewIntervals,
  Rating,
  type Grade,
} from '../srs/engine'
import { buildQueue, type QueueItem } from '../srs/queue'
import { useStrings, type Strings } from '../i18n/strings'
import { locateHarf, stripTashkeel } from '../text/arabic'
import { referenceLink } from '../text/morphology'
import { setHideTashkeel, useHideTashkeel } from '../settings/useHideTashkeel'
import { otherLang, setLang, useLang } from '../settings/useLang'

/** Learning cards answered moments ago come back within this window. */
const LEARN_AHEAD_MS = 20 * 60 * 1000

/** Which pane of the answer is open. Not every card offers all three. */
type Pane = 'meaning' | 'example' | 'more'

/**
 * What the front of the card asks you to produce. Two-direction decks show
 * the same note from both sides, and a bare meaning prompt is otherwise
 * indistinguishable from the back of an ar-to-meaning card.
 */
function askLabel(note: Note, direction: Direction, s: Strings): string {
  if (note.sense !== undefined) return s.study.askSense
  return direction === 'ar-to-meaning' ? s.study.askMeaning : s.study.askArabic
}

/** The Arabic example text with `harf` highlighted inside it. */
function Highlighted({ text, harf }: { text: string; harf: string }) {
  const parts = locateHarf(text, harf)
  if (!parts) return <>{text}</>
  return (
    <>
      {parts.before}
      <mark className="harf-mark">{parts.match}</mark>
      {parts.after}
    </>
  )
}

/**
 * One translation line with the authored `span` marked inside it — the words
 * that render the Arabic `Highlighted` above marks.
 *
 * An exact substring, not a search: `span` is written to match the line it is
 * cut from, and a Turkish one is often a suffix rather than a whole word.
 * Content tests hold every span to occurring in its line, so a miss here is a
 * deck drifting from its highlights, and the line still reads plainly.
 */
function Marked({ text, span }: { text: string; span?: string }) {
  const at = span ? text.indexOf(span) : -1
  if (!span || at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="meaning-mark">{span}</mark>
      {text.slice(at + span.length)}
    </>
  )
}

/** A word's principal parts: the label above the value, two to a row. */
function FactGrid({ facts }: { facts: { key: string; value: string; arabic: boolean }[] }) {
  return (
    <div className="fact-grid">
      {facts.map((fact) => (
        <span className="fact" key={fact.key}>
          <span className="fact-key">{fact.key}</span>
          {fact.arabic ? (
            <span className="arabic">{fact.value}</span>
          ) : (
            <span className="fact-value">{fact.value}</span>
          )}
        </span>
      ))}
    </div>
  )
}

/**
 * The study session.
 *
 * The back of a card is two zones and one open pane, not a stack of nine
 * centred blocks: the answer is the one large thing, and the evidence for it —
 * the example, the other senses, the paradigm — sits behind a tab. The pane
 * has a floor rather than a height so the grading row never moves under the
 * thumb between cards. See docs/adr/0004-basalt-one-ramp-one-language.md.
 *
 * One language at a time, swapped from the session bar. A Meaning is still
 * both languages; only one of them is ever on screen.
 */
export function StudySessionPage() {
  const { deckId } = useParams()
  const deck = deckId ? deckById(deckId) : undefined
  const s = useStrings()
  const lang = useLang()

  const [queue, setQueue] = useState<QueueItem[] | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [pane, setPane] = useState<Pane | null>(null)
  const [doneCount, setDoneCount] = useState(0)
  const hideTashkeel = useHideTashkeel()
  const showArabic = (text: string) => (hideTashkeel ? stripTashkeel(text) : text)

  useEffect(() => {
    if (!deck || deck.locked) return
    let cancelled = false
    buildQueue(db, deck, new Date()).then((q) => {
      if (!cancelled) setQueue(q)
    })
    return () => {
      cancelled = true
    }
  }, [deck])

  const current = queue?.[0]

  const previews = useMemo(() => {
    if (!current) return null
    const now = new Date()
    const due = previewIntervals(current.state, now)
    const units = s.study.units
    return {
      [Rating.Again]: intervalLabel(now, due[Rating.Again], units),
      [Rating.Hard]: intervalLabel(now, due[Rating.Hard], units),
      [Rating.Good]: intervalLabel(now, due[Rating.Good], units),
      [Rating.Easy]: intervalLabel(now, due[Rating.Easy], units),
    }
  }, [current, s])

  const grade = useCallback(
    async (rating: Grade) => {
      if (!current || !queue || !deck) return
      const now = new Date()
      await answerCard(db, current.content, current.state, rating, now)

      const updated: CardStateRow | undefined = await db.cardState.get(
        current.content.cardId,
      )

      // Drop the answered card and, when burying, its siblings from the session.
      const buried = deck.burySiblings
        ? new Set(siblingCardsOf(deck, current.content.cardId).map((c) => c.cardId))
        : new Set<string>()
      let next = queue
        .slice(1)
        .filter((item) => !buried.has(item.content.cardId))

      // Requeue a learning card that comes back within the learn-ahead window.
      if (
        updated &&
        (updated.state === State.Learning || updated.state === State.Relearning) &&
        updated.due <= now.getTime() + LEARN_AHEAD_MS
      ) {
        next = [...next, { content: current.content, state: updated }]
      }

      setQueue(next)
      setDoneCount((n) => n + 1)
      setRevealed(false)
      // The next card decides its own opening pane; carrying this one's over
      // would land some cards on a tab they do not have.
      setPane(null)
    },
    [current, queue, deck],
  )

  if (!deck) {
    return (
      <main className="page">
        <p>{s.study.unknownDeck}</p>
      </main>
    )
  }

  if (deck.locked) {
    return (
      <main className="page">
        <p>{s.study.deckLocked}</p>
        <p>
          <Link to="/">← {s.study.backToDecks}</Link>
        </p>
      </main>
    )
  }

  if (queue === null) {
    return <main className="page" />
  }

  if (!current) {
    return (
      <main className="page">
        <div className="done-screen">
          <div className="big">🎉</div>
          <h1 className="page-title">{s.study.finished}</h1>
          <p className="muted">{s.study.answersToday(doneCount, deck.name)}</p>
          <Link className="button-primary" to="/">
            {s.study.backToDecks}
          </Link>
        </div>
      </main>
    )
  }

  const { note, direction } = current.content
  const arabicFirst = direction === 'ar-to-meaning'
  const sense = note.sense
  const vocab = note.vocab
  // One read of the review count for the whole card, so the sentence on the
  // front is the sentence explained on the back. A new card has no state yet
  // and starts at the head of the pool.
  const example: Example | undefined = exampleOf(note, current.state?.reps ?? 0)

  /*
   * Which panes this card has, in order. The first is the one it opens on.
   *
   * A vocabulary card has no Meaning pane: its headline already *is* the
   * meaning, so the pane would repeat it, and the example is what the card is
   * actually read for.
   */
  const panes: Pane[] = []
  if (sense || !arabicFirst) panes.push('meaning')
  if (example) panes.push('example')
  if (sense?.contrast.length || vocab) panes.push('more')
  const open: Pane | null = pane && panes.includes(pane) ? pane : (panes[0] ?? null)

  const paneLabel: Record<Pane, string> = {
    meaning: s.study.paneMeaning,
    example: s.study.paneExample,
    more: sense ? s.study.paneSenses : s.study.paneWord,
  }

  const facts = vocab
    ? [
        ...(vocab.root ? [{ key: s.word.root, value: vocab.root, arabic: true }] : []),
        ...(vocab.forms ?? []).map((form) => ({
          key: s.word.forms[form.label] ?? form.label,
          value: form.arabic,
          arabic: true,
        })),
        { key: s.word.hereAs, value: showArabic(vocab.occurringForm), arabic: true },
        {
          key: s.word.occurrences,
          value: String(vocab.occurrences),
          arabic: false,
        },
      ]
    : []

  return (
    <main className="page">
      <div className="session-top">
        <Link className="back" to="/">
          ← {deck.name}
        </Link>
        <button
          type="button"
          className="chrome-toggle"
          aria-pressed={hideTashkeel}
          onClick={() => setHideTashkeel(!hideTashkeel)}
        >
          <span className="mark-sample">ـَـ</span>
          {hideTashkeel ? s.common.harakatOff : s.common.harakatOn}
        </button>
        <button
          type="button"
          className="chrome-toggle"
          aria-label={s.common.langSwitchTo}
          onClick={() => void setLang(otherLang(lang))}
        >
          {s.common.langShort}
          <span className="swap">⇄</span>
        </button>
        <span className="fill" />
        <span className="count">{s.study.left(queue.length)}</span>
      </div>

      <div className="session-card">
        <div className="card-prompt">
          <div className="prompt-ask">{askLabel(note, direction, s)}</div>
          {sense ? (
            <div className="prompt-arabic arabic sense-prompt">
              <Highlighted text={showArabic(example!.arabic)} harf={note.arabic} />
            </div>
          ) : arabicFirst ? (
            <div className="prompt-arabic arabic">{showArabic(note.arabic)}</div>
          ) : (
            <div className="meaning">{note[lang]}</div>
          )}
        </div>

        {revealed && (
          <div className="card-answer">
            <div className="card-lead">
              {sense ? (
                <>
                  {sense.term}
                  <span className="arabic">{sense.termArabic}</span>
                </>
              ) : arabicFirst ? (
                note[lang]
              ) : (
                <span className="arabic answer-arabic">{showArabic(note.arabic)}</span>
              )}
            </div>

            {panes.length > 1 && (
              <div className="pane-tabs" role="tablist">
                {panes.map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    className="pane-tab"
                    aria-selected={name === open}
                    onClick={() => setPane(name)}
                  >
                    {paneLabel[name]}
                  </button>
                ))}
              </div>
            )}

            {open && (
              <div className="pane">
                {open === 'meaning' && <div className="body">{note[lang]}</div>}

                {open === 'example' && example && (
                  <>
                    {/* On a sense card the example is already the prompt, so
                        only its translation is new here. */}
                    {!sense && (
                      <span className="arabic">
                        {vocab ? (
                          <Highlighted
                            text={showArabic(example.arabic)}
                            harf={vocab.occurringForm}
                          />
                        ) : (
                          showArabic(example.arabic)
                        )}
                      </span>
                    )}
                    <span>
                      <Marked text={example[lang]} span={example.highlight?.[lang]} />
                    </span>
                    {example.source && <span className="source">{example.source}</span>}
                  </>
                )}

                {open === 'more' && sense && (
                  <ul className="sense-list">
                    {sense.contrast.map((other) => (
                      <li key={other.term}>
                        <span>{other.term}</span>
                        <span className="arabic">{other.termArabic}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {open === 'more' && vocab && <FactGrid facts={facts} />}
              </div>
            )}

            {note.referenceId && (
              <div className="card-links">
                <Link className="info-link" to={referenceLink(note.referenceId)}>
                  {s.study.fullEntry}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {revealed ? (
        <div className="answer-buttons">
          <button className="again" onClick={() => grade(Rating.Again)}>
            <span className="grade">{s.study.again}</span>
            <span className="ivl">{previews?.[Rating.Again]}</span>
          </button>
          <button className="hard" onClick={() => grade(Rating.Hard)}>
            <span className="grade">{s.study.hard}</span>
            <span className="ivl">{previews?.[Rating.Hard]}</span>
          </button>
          <button className="good" onClick={() => grade(Rating.Good)}>
            <span className="grade">{s.study.good}</span>
            <span className="ivl">{previews?.[Rating.Good]}</span>
          </button>
          <button className="easy" onClick={() => grade(Rating.Easy)}>
            <span className="grade">{s.study.easy}</span>
            <span className="ivl">{previews?.[Rating.Easy]}</span>
          </button>
        </div>
      ) : (
        <button className="primary show-answer" onClick={() => setRevealed(true)}>
          {s.study.showAnswer}
        </button>
      )}
    </main>
  )
}
