import { State } from 'ts-fsrs'
import type { ArabicaDB } from '../db/db'
import { noteIdOf } from '../content/types'

/**
 * What it means to know a word: the Note has a Card that has graduated to the
 * FSRS review state.
 *
 * One definition, in one place, because two things read it — the coverage
 * metric on Stats, which answers "how much of the Qurʾan can you read?" as a
 * number, and the reader, which answers the same question as the page itself.
 * If those two ever disagreed, one of them would be lying.
 *
 * A Note counts once however many Cards it has: the two directions of a harf
 * are one word known, not two.
 */
export async function knownNoteIds(db: ArabicaDB): Promise<Set<string>> {
  const graduated = await db.cardState.where('state').equals(State.Review).toArray()
  return new Set(graduated.map((row) => noteIdOf(row.cardId)))
}
