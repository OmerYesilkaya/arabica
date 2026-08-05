// Content data model. Content lives in data files under src/content only.
// Progress (FSRS state, review log) lives in IndexedDB, never here.

export type Direction = 'ar-to-meaning' | 'meaning-to-ar'

export interface Example {
  arabic: string
  english: string
  turkish: string
  /**
   * Optional citation for the Arabic, e.g. "Qur'an 17:1" or "Bukhārī 1".
   * Rendered subtly on the card back and in Reference.
   */
  source?: string
}

/** Sense-card metadata: the grammatical sense a per-sense card teaches. */
export interface NoteSense {
  /** Transliterated grammar term, e.g. "Ibtidāʾ al-ghāyah". */
  term: string
  termArabic: string
}

export interface Note {
  id: string
  arabic: string
  english: string
  turkish: string
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
   * `arabic` (the harf) highlighted; the back shows the sense term and glosses.
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

/** Table cell / heading text. Strings render as UI text, { ar } renders as Arabic. */
export type RefText = string | { ar: string; note?: string }

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

export interface HarfSense {
  /** Grammar term, e.g. "Ibtidāʾ al-ghāyah" */
  term: string
  termArabic: string
  english: string
  turkish: string
  example?: Example
}

export interface RefHarf {
  kind: 'harf'
  /** Anchor id, matches Note.id of the deck card. */
  id: string
  arabic: string
  english: string
  turkish: string
  /**
   * The bare harf token used to highlight it inside a sense example, e.g. "بِ".
   * Falls back to `arabic` when the display form is already the bare token.
   */
  particle?: string
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
