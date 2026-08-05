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

export class ArabicaDB extends Dexie {
  cardState!: EntityTable<CardStateRow, 'cardId'>
  reviewLog!: EntityTable<ReviewLogRow, 'id'>
  meta!: EntityTable<MetaRow, 'key'>

  constructor(name = 'arabica') {
    super(name)
    this.version(1).stores({
      cardState: 'cardId, deckId, due, state',
      reviewLog: '++id, cardId, deckId, review',
      meta: 'key',
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
