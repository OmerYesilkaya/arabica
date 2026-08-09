import { Link } from 'react-router-dom'
import { PROVENANCE } from '../content/corpus'
import type { CorpusLemma, CorpusToken } from '../content/corpus/types'
import { noteById } from '../content/decks'
import {
  describeSegment,
  irabOf,
  pronounGloss,
  referenceFor,
  referenceLink,
} from '../text/morphology'
import { Sheet } from './Sheet'

const PART_OF_SPEECH: Record<string, string> = {
  ism: 'ism (noun)',
  fil: "fi'l (verb)",
  harf: 'harf (particle)',
}

const ROLE_LABEL: Record<string, string> = {
  prefix: 'prefixed',
  stem: 'the word',
  suffix: 'attached',
}

/**
 * Where the meaning came from, in a sentence. Corpus is unverified by design,
 * so an error has to be attributable rather than anonymous — and the three
 * cases are not equally trustworthy, which is the whole reason to say which.
 */
function glossProvenance(
  lemma: CorpusLemma | undefined,
  gloss: { english: string } | undefined,
): string {
  if (lemma?.glossSource === 'deck') return 'The meaning is the one this app teaches on its cards.'
  if (lemma) return 'The meaning is machine-generated and unverified.'
  if (gloss) return 'The meaning is read from the person and gender the corpus records.'
  return 'The corpus gives this word no meaning of its own.'
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
 * Two levels, because they answer different questions. The first is the lemma
 * gloss and one line of morphology — enough to keep reading. The second is the
 * grammar, and it ends in a link into the Reference entry that teaches the
 * feature: that link is the point of the whole reader, and the one thing a
 * general Quran app cannot offer, because it does not know your syllabus.
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
  const { token, lemma, written, known, flagged } = detail
  const head = token.segments[token.head]
  const irab = irabOf(token)
  const note = lemma?.noteId ? noteById(lemma.noteId) : undefined
  const reference = referenceFor(token, note?.referenceId)
  // A pronoun carries no lemma in the corpus, so its meaning is read off its
  // person, gender and number instead.
  const gloss = lemma ?? pronounGloss(head)
  const headDescription = describeSegment(head)

  return (
    <Sheet label={`Word detail for ${lemma?.english ?? written}`} onClose={onClose}>
      <div className="sheet-head">
        <span className="arabic sheet-word">{written}</span>
        <span className="sheet-pos">
          {PART_OF_SPEECH[lemma?.pos ?? headDescription.partOfSpeech]}
          {known && <span className="known-badge"> · known</span>}
        </span>
      </div>

      {gloss && (
        <div className="token-gloss">
          <p className="token-english">{gloss.english}</p>
          <p className="token-turkish">{gloss.turkish}</p>
        </div>
      )}

      <dl className="sheet-rows">
        {head.lemma && head.lemma !== written && (
          <div className="sheet-row">
            <dt>Dictionary form</dt>
            <dd className="arabic">{head.lemma}</dd>
          </div>
        )}
        <div className="sheet-row">
          <dt>This word</dt>
          <dd>
            {[PART_OF_SPEECH[headDescription.partOfSpeech], ...headDescription.traits].join(
              ' · ',
            )}
          </dd>
        </div>
        <div className="sheet-row">
          <dt>Iʿrāb</dt>
          <dd>{irab.label}</dd>
        </div>
      </dl>

      {expanded ? (
        <>
          <dl className="sheet-rows">
            {(lemma?.root ?? head.root) && (
              <div className="sheet-row">
                <dt>Root</dt>
                <dd className="arabic">{lemma?.root ?? head.root}</dd>
              </div>
            )}
            {token.segments.map((segment, i) => {
              const described = describeSegment(segment)
              return (
                <div className="sheet-row" key={`${segment.form}-${i}`}>
                  <dt>
                    <span className="arabic segment-form">{segment.form}</span>
                    <span className="segment-role">{ROLE_LABEL[described.role]}</span>
                  </dt>
                  <dd>
                    {[PART_OF_SPEECH[described.partOfSpeech], ...described.traits].join(' · ')}
                  </dd>
                </div>
              )
            })}
          </dl>

          {reference && (
            <Link className="token-reference" to={referenceLink(reference)}>
              Read the grammar that teaches this →
            </Link>
          )}

          <p className="token-provenance">
            Text from{' '}
            <a href={PROVENANCE.text.url} target="_blank" rel="noreferrer">
              {PROVENANCE.text.name}
            </a>
            , morphology from{' '}
            <a href={PROVENANCE.morphology.url} target="_blank" rel="noreferrer">
              {PROVENANCE.morphology.name}
            </a>
            {`. ${glossProvenance(lemma, gloss)}`}
          </p>

          <button
            type="button"
            className={flagged ? 'token-flag flagged' : 'token-flag'}
            onClick={onToggleFlag}
          >
            {flagged ? 'Reported as wrong — undo' : 'Report this word as wrong'}
          </button>
        </>
      ) : (
        <button type="button" className="token-more" onClick={onExpand}>
          Grammar and where it came from
        </button>
      )}
    </Sheet>
  )
}
