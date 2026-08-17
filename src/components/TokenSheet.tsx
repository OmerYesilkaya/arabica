import { Link } from 'react-router-dom'
import { PROVENANCE } from '../content/corpus'
import type { CorpusLemma, CorpusToken } from '../content/corpus/types'
import { noteById } from '../content/decks'
import { useStrings, type Strings } from '../i18n/strings'
import { useLang } from '../settings/useLang'
import {
  describeSegment,
  irabOf,
  pronounGloss,
  referenceFor,
  referenceLink,
} from '../text/morphology'
import { Sheet } from './Sheet'

function partOfSpeech(kind: string, s: Strings): string {
  if (kind === 'ism') return s.word.ism
  if (kind === 'fil') return s.word.fil
  return s.word.harf
}

function roleLabel(role: 'prefix' | 'stem' | 'suffix', s: Strings): string {
  if (role === 'prefix') return s.word.rolePrefix
  if (role === 'suffix') return s.word.roleSuffix
  return s.word.roleStem
}

/**
 * Where the meaning came from, in a sentence. Corpus is unverified by design,
 * so an error has to be attributable rather than anonymous — and the three
 * cases are not equally trustworthy, which is the whole reason to say which.
 */
function glossProvenance(
  lemma: CorpusLemma | undefined,
  gloss: { english: string } | undefined,
  s: Strings,
): string {
  if (lemma?.glossSource === 'deck') return s.word.glossFromDeck
  if (lemma) return s.word.glossGenerated
  if (gloss) return s.word.glossFromPerson
  return s.word.glossNone
}

export interface TokenDetail {
  /** The word exactly as the Text writes it, marks and all. */
  written: string
  token: CorpusToken
  /** Absent only if the corpus gives the head segment no lemma. */
  lemma?: CorpusLemma
  /** `surah:ayah:word`, the flag's key. */
  ref: string
  known: boolean
  flagged: boolean
}

/**
 * Token detail in the reader: what this word means, and what it is doing here.
 *
 * Two levels, because they answer different questions. The first is the gloss
 * and one line of morphology — enough to keep reading. The second is the
 * grammar, and it ends in a link into the Reference entry that teaches the
 * feature: that link is the point of the whole reader, and the one thing a
 * general Quran app cannot offer, because it does not know your syllabus.
 *
 * Laid out like the back of a card, for the same reasons. The word you tapped
 * sits on its own ground as the question; the gloss under it is the one large
 * Latin line, because it is the answer; and everything that is evidence for
 * that answer — the parse, the segments, the provenance — is a step down the
 * ramp rather than another block of the same weight.
 *
 * One gloss per Lemma, not per Token. What the word means *here* is carried by
 * its morphology, not by a second translation — grammar is the contextual
 * meaning, which is the thesis the rest of the app is built on.
 */
export function TokenSheet({
  detail,
  expanded,
  onExpand,
  onToggleFlag,
  onClose,
}: {
  detail: TokenDetail
  expanded: boolean
  onExpand: () => void
  onToggleFlag: () => void
  onClose: () => void
}) {
  const s = useStrings()
  const lang = useLang()
  const { token, lemma, written, known, flagged } = detail
  const head = token.segments[token.head]
  const irab = irabOf(token)
  const note = lemma?.noteId ? noteById(lemma.noteId) : undefined
  const reference = referenceFor(token, note?.referenceId)
  // A pronoun carries no lemma in the corpus, so its meaning is read off its
  // person, gender and number instead.
  const gloss = lemma ?? pronounGloss(head)
  const headDescription = describeSegment(head)

  const facts = [
    ...(head.lemma && head.lemma !== written
      ? [{ key: s.word.dictionaryForm, value: head.lemma, arabic: true }]
      : []),
    {
      key: s.word.thisWord,
      value: [partOfSpeech(headDescription.partOfSpeech, s), ...headDescription.traits].join(
        ' · ',
      ),
      arabic: false,
    },
    { key: s.word.irab, value: irab.label, arabic: false },
    ...(expanded && (lemma?.root ?? head.root)
      ? [{ key: s.word.root, value: (lemma?.root ?? head.root)!, arabic: true }]
      : []),
  ]

  return (
    <Sheet label={s.word.detailFor(lemma?.[lang] ?? written)} onClose={onClose}>
      <div className="sheet-head">
        <span className="arabic sheet-word">{written}</span>
        <span className="sheet-pos">
          {partOfSpeech(lemma?.pos ?? headDescription.partOfSpeech, s)}
          {known && <span className="known-badge"> · {s.word.known}</span>}
        </span>
      </div>

      {gloss && <p className="sheet-lead">{gloss[lang]}</p>}

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

      {expanded ? (
        <>
          {/* Only worth listing when the word is more than one piece: a bare
              stem would repeat the parse two rows above it. */}
          {token.segments.length > 1 && (
            <ul className="segment-list">
              {token.segments.map((segment, i) => {
                const described = describeSegment(segment)
                return (
                  <li className="segment-row" key={`${segment.form}-${i}`}>
                    <span className="arabic segment-form">{segment.form}</span>
                    <span className="segment-role">{roleLabel(described.role, s)}</span>
                    <span className="segment-traits">
                      {[partOfSpeech(described.partOfSpeech, s), ...described.traits].join(
                        ' · ',
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}

          {reference && (
            <Link className="token-reference" to={referenceLink(reference)}>
              {s.word.readGrammar}
            </Link>
          )}

          <p className="token-provenance">
            {s.word.provenanceText}{' '}
            <a href={PROVENANCE.text.url} target="_blank" rel="noreferrer">
              {PROVENANCE.text.name}
            </a>
            {s.word.provenanceMorphology}{' '}
            <a href={PROVENANCE.morphology.url} target="_blank" rel="noreferrer">
              {PROVENANCE.morphology.name}
            </a>
            {`. ${glossProvenance(lemma, gloss, s)}`}
          </p>

          <button
            type="button"
            className={flagged ? 'token-flag flagged' : 'token-flag'}
            onClick={onToggleFlag}
          >
            {flagged ? s.word.reportedUndo : s.word.reportWrong}
          </button>
        </>
      ) : (
        <button type="button" className="token-more" onClick={onExpand}>
          {s.word.grammarAndSource}
        </button>
      )}
    </Sheet>
  )
}
