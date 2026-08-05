// Content data model. Content lives in data files under src/content only.
// Progress (FSRS state, review log) lives in IndexedDB, never here.

export type Direction = 'ar-to-meaning' | 'meaning-to-ar'

export interface Example {
  arabic: string
  english: string
  turkish: string
}

export interface Note {
  id: string
  arabic: string
  english: string
  turkish: string
  example?: Example
  /** Overrides the deck-level directions for this note. */
  directions?: Direction[]
  /** Reference entry id (+ optional #anchor) opened by the (i) button. */
  referenceId?: string
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
