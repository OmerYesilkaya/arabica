import Dexie, { type EntityTable } from 'dexie'
import { State } from 'ts-fsrs'

// Progress database. Content is code; only progress lives here.
// All timestamps are epoch milliseconds.

export interface CardStateRow {
  cardId: string // `${noteId}|${direction}`
  deckId: string
  due: number
  stability: number
  difficulty: number
  scheduled_days: number
  learning_steps: number
  reps: number
  lapses: number
  state: State
  last_review?: number
  /** Sibling burying: hidden from the queue until this time. */
  buriedUntil?: number
}

export interface ReviewLogRow {
  id?: number
  cardId: string
  deckId: string
  rating: number
  /** FSRS state before the review. State.New marks the card's introduction. */
  state: State
  due: number
  stability: number
  difficulty: number
  scheduled_days: number
  learning_steps: number
  review: number
}

export interface MetaRow {
  key: string
  value: unknown
}

/**
 * A Token in the reading corpus the learner has marked as wrong.
 *
 * Corpus is unverified by design and there is far too much of it to check by
 * hand, so the app has to make reporting an error cheap enough to do the
 * moment it is noticed — an error spotted on the bus and remembered until
 * evening is an error nobody reports.
 *
 * Flags do not break the reader's statelessness (see docs/adr/0002): nothing
 * here records what was read. A flag is a deliberate act, not an observation.
 */
export interface CorpusFlagRow {
  /** `surah:ayah:word`, all 1-indexed; ayah 0 is the basmala heading a surah. */
  ref: string
  /**
   * The Lemma whose gloss or morphology is being reported, or the word as
   * written when the corpus gives it none, as it does for every pronoun.
   */
  lemma: string
  flaggedAt: number
}

export class ArabicaDB extends Dexie {
  cardState!: EntityTable<CardStateRow, 'cardId'>
  reviewLog!: EntityTable<ReviewLogRow, 'id'>
  meta!: EntityTable<MetaRow, 'key'>
  corpusFlags!: EntityTable<CorpusFlagRow, 'ref'>

  constructor(name = 'arabica') {
    super(name)
    this.version(1).stores({
      cardState: 'cardId, deckId, due, state',
      reviewLog: '++id, cardId, deckId, review',
      meta: 'key',
    })
    // Version 2 adds corpusFlags. Dexie leaves the existing stores alone, so
    // a device that upgrades keeps every card and every review it had.
    this.version(2).stores({
      corpusFlags: 'ref, lemma',
    })
  }
}

export const db = new ArabicaDB()

export async function getMeta<T>(key: string): Promise<T | undefined> {
  const row = await db.meta.get(key)
  return row?.value as T | undefined
}

export async function setMeta(key: string, value: unknown): Promise<void> {
  await db.meta.put({ key, value })
}
