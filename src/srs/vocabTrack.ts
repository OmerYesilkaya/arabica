import { State } from 'ts-fsrs'
import type { ArabicaDB } from '../db/db'
import type { DeckDef } from '../content/types'
import { GRADUATION_THRESHOLD } from '../content/decks/quranVocabTrack'
import { cardsOfDeck } from '../content/decks'

export interface LevelStatus {
  deck: DeckDef
  /** Cards in the level. Vocabulary decks are one direction, so one per word. */
  total: number
  /** Cards that have reached the review state, i.e. words counted as known. */
  graduated: number
  /** Cards that have been seen at all, whatever their state. */
  started: number
  unlocked: boolean
}

export interface TrackStatus {
  levels: LevelStatus[]
  graduated: number
  total: number
  /**
   * 1-based number of the level to work on now: the first unlocked level that
   * is not yet fully graduated, or the last level once they all are.
   */
  currentLevel: number
}

/**
 * Progress through the vocabulary track, read from card state.
 *
 * Unlocking is computed rather than stored: a level opens when the previous one
 * is `GRADUATION_THRESHOLD` graduated. The static `locked` flag on a deck means
 * something different — content not written yet — so the two reasons a deck is
 * closed stay distinguishable.
 */
export async function trackStatus(
  db: ArabicaDB,
  track: DeckDef[],
): Promise<TrackStatus> {
  const levels: LevelStatus[] = []
  let previousGraduatedEnough = true

  for (const deck of track) {
    const rows = await db.cardState.where('deckId').equals(deck.id).toArray()
    const total = cardsOfDeck(deck).length
    let graduated = 0
    for (const row of rows) if (row.state === State.Review) graduated++

    const unlocked: boolean = !deck.locked && previousGraduatedEnough
    levels.push({ deck, total, graduated, started: rows.length, unlocked })
    previousGraduatedEnough =
      unlocked && total > 0 && graduated / total >= GRADUATION_THRESHOLD
  }

  const graduated = levels.reduce((sum, level) => sum + level.graduated, 0)
  const total = levels.reduce((sum, level) => sum + level.total, 0)

  const pending = levels.findIndex(
    (level) => level.unlocked && level.graduated < level.total,
  )
  return {
    levels,
    graduated,
    total,
    currentLevel: pending === -1 ? levels.length : pending + 1,
  }
}
