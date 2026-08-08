// Content data model. Content lives in data files under src/content only.
// Progress (FSRS state, review log) lives in IndexedDB, never here.

export type Direction = 'ar-to-meaning' | 'meaning-to-ar'

/**
 * The English and Turkish rendering of an Arabic form. Both languages together
 * are one Meaning; neither alone is. Carried by everything the learner reads:
 * Notes, Examples, Harf senses, drill items, leeches.
 */
export interface Meaning {
  english: string
  turkish: string
}

export interface Example extends Meaning {
  arabic: string
  /**
   * Optional citation for the Arabic, e.g. "Qur'an 17:1" or "Bukhārī 1".
   * Rendered subtly on the card back and in Reference.
   */
  source?: string
}

/**
 * Sense-card metadata: the grammatical sense a per-sense card teaches, named
 * by its term. Derived from HarfSense (declared below, in the Reference
 * section) because the reference entry is where a Sense is defined — the deck
 * only names one. Renaming a field on HarfSense now breaks here rather than
 * letting the two drift apart.
 */
export type NoteSense = Pick<HarfSense, 'term' | 'termArabic'>

export interface Note extends Meaning {
  id: string
  arabic: string
  example?: Example
  /**
   * Voweled Arabic the learner should type in a typed drill, used when
   * `arabic` is a display label rather than the bare word (for example the
   * prefix particles, whose `arabic` names the letter: "الْبَاءُ (بِـ)").
   * Defaults to `arabic` when omitted.
   */
  drillAnswer?: string
  /** Overrides the deck-level directions for this note. */
  directions?: Direction[]
  /** Reference entry id (+ optional #anchor) opened by the (i) button. */
  referenceId?: string
  /**
   * Present on per-sense cards. The card front is the example sentence with
   * `arabic` (the harf) highlighted; the back shows the sense term and meanings.
   */
  sense?: NoteSense
  /**
   * Cards whose notes share a sibling group bury each other for the day.
   * Defaults to the note id, so a note's own directions are always siblings.
   * Per-sense cards set this to the harf id so one sense per harf appears per day.
   */
  siblingGroup?: string
}

export interface DeckDef {
  id: string
  name: string
  nameArabic: string
  description: string
  directions: Direction[]
  newPerDay: number
  burySiblings: boolean
  notes: Note[]
  /** Locked decks are listed but cannot be studied yet ("coming soon"). */
  locked?: boolean
}

// A scheduled card is one (note, direction) pair, Anki-style.
export interface ContentCard {
  cardId: string // `${noteId}|${direction}`
  deckId: string
  note: Note
  direction: Direction
  /** Position in content order; new cards are introduced in this order. */
  ordinal: number
}

export function cardIdOf(noteId: string, direction: Direction): string {
  return `${noteId}|${direction}`
}

export function noteIdOf(cardId: string): string {
  return cardId.slice(0, cardId.lastIndexOf('|'))
}

// ---------- Reference section ----------

/**
 * Table cell / heading text. Strings render as UI text, { ar } renders as
 * Arabic.
 *
 * `footnote` is the small annotation beside the Arabic — a grammatical remark
 * or a variant form. Deliberately not `note`, which is the flashcard unit.
 *
 * `source` is a citation, in the same form as `Example.source`. It is kept
 * apart from `footnote` because the citation checker in `scripts/` reads it:
 * a citation hidden inside a footnote is a citation nobody verifies.
 */
export type RefText =
  | string
  | { ar: string; footnote?: string; source?: string }

export interface RefProse {
  kind: 'prose'
  title?: string
  /** Optional Arabic source text shown above the paragraphs. */
  arabic?: string
  paragraphs: string[]
}

export interface RefTable {
  kind: 'table'
  title?: string
  caption?: string
  columns: RefText[]
  rows: RefText[][]
}

/**
 * One grammatical function of a Harf. The origin of a Sense's identity:
 * NoteSense picks `term` and `termArabic` from here.
 */
export interface HarfSense extends Meaning {
  /** Transliterated grammar term, e.g. "Ibtidāʾ al-ghāyah". */
  term: string
  termArabic: string
  example?: Example
}

export interface RefHarf extends Meaning {
  kind: 'harf'
  /** Anchor id, matches Note.id of the deck card. */
  id: string
  arabic: string
  /**
   * The bare harf token used to highlight it inside a sense example, e.g. "بِ".
   * Falls back to `arabic` when the display form is already the bare token.
   */
  bareForm?: string
  senses: HarfSense[]
}

export type RefSection = RefProse | RefTable | RefHarf

export interface ReferenceEntry {
  id: string
  title: string
  titleArabic: string
  /** Ājurrūmiyya order. */
  order: number
  summary: string
  /** Locked entries render as "coming soon" and cannot be opened. */
  locked?: boolean
  sections: RefSection[]
}
