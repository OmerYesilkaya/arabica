// Corpus data model: third-party linguistic data about real Arabic text,
// emitted by scripts/generateReadingText.ts and never hand-edited. See
// docs/adr/0002-corpus-is-neither-content-nor-progress.md.
//
// Corpus is read, never scheduled. Nothing here may be turned into a Card:
// the glosses are unverified, and an unverified gloss that reaches FSRS gets
// rehearsed to permanent retention by design.

import type { PartOfSpeech } from '../types'

/**
 * One morphological segment of a Token, verbatim from the Quranic Arabic
 * Corpus. A word is often several: a prefixed particle, the stem, an attached
 * pronoun.
 */
export interface CorpusSegment {
  /** The segment as written, in mushaf orthography. */
  form: string
  /** Coarse corpus tag: N (noun), V (verb), P (particle). */
  tag: string
  /**
   * The corpus feature tags of this segment, in corpus order, with the
   * `LEM:` and `ROOT:` fields lifted out into their own fields below.
   */
  features: string[]
  /** Absent on segments the corpus gives no lemma, mostly attached pronouns. */
  lemma?: string
  root?: string
}

/**
 * One word as it occurs in a Text, at one position in it. `start` and `end`
 * are offsets into the containing line's `text`, so that the stored text stays
 * byte-for-byte what Tanzil publishes and the tokens point into it rather than
 * restating it.
 */
export interface CorpusToken {
  start: number
  end: number
  /**
   * Index in `segments` of the segment the gloss hangs on: the first that is
   * neither a prefix nor a suffix. Glosses hang on the Lemma and grammar hangs
   * on the Token, so a word carries one gloss however many segments it has.
   */
  head: number
  segments: CorpusSegment[]
}

/** A line of Text with its Tokens: an ayah, or the basmala heading a surah. */
export interface CorpusLine {
  /** Verbatim Tanzil text. Never normalized, never re-spaced. */
  text: string
  tokens: CorpusToken[]
}

export interface CorpusAyah extends CorpusLine {
  ayah: number
}

export interface CorpusSurah {
  surah: number
  /**
   * The basmala, which the mushaf sets above every surah but al-Fatiha, where
   * it is ayah 1 in its own right, and at-Tawba, which has none. Tanzil
   * prefixes it to ayah 1; it is split off here so that the reader can set it
   * as its own line, and so that each stored ayah is the ayah alone.
   */
  basmala?: CorpusLine
  ayat: CorpusAyah[]
}

/** Where a gloss came from. Shown beside it: an error must be attributable. */
export type GlossSource = 'deck' | 'generated'

/**
 * The dictionary form a Token inflects from, glossed once. What a Lemma means
 * *here* is carried by its Token's morphology, not by a second gloss.
 */
export interface CorpusLemma {
  pos: PartOfSpeech
  root?: string
  english: string
  turkish: string
  /**
   * `deck` — the gloss is the authored, verified Meaning of the Note that
   * teaches this Lemma. `generated` — machine-written convenience text from
   * scripts/readingGlosses.ts, permanently unverified.
   */
  glossSource: GlossSource
  /**
   * The Note that teaches this Lemma, when a Deck does. Read only: it is what
   * lets the reader mark words already known and link to the word detail. It
   * never runs the other way — Corpus never creates or schedules a Card.
   */
  noteId?: string
}

/** The shared Lemma dictionary, keyed by the corpus lemma. */
export type CorpusLemmas = Record<string, CorpusLemma>
