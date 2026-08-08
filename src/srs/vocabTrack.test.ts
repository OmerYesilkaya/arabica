import { beforeEach, describe, expect, it } from 'vitest'
import { State } from 'ts-fsrs'
import { ArabicaDB } from '../db/db'
import { cardsOfDeck } from '../content/decks'
import type { DeckDef } from '../content/types'
import { GRADUATION_THRESHOLD } from '../content/decks/quranVocabTrack'
import { trackStatus } from './vocabTrack'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`track-test-${++counter}`)
})

/**
 * Synthetic levels rather than the real decks: this tests the unlock rule, and
 * pinning it to whichever words happen to be in level 1 would make a content
 * edit fail a scheduling test.
 */
function level(id: string, size: number): DeckDef {
  return {
    id,
    name: id,
    nameArabic: id,
    description: id,
    directions: ['ar-to-meaning'],
    newPerDay: 10,
    burySiblings: true,
    notes: Array.from({ length: size }, (_, i) => ({
      id: `${id}-${i}`,
      arabic: 'x',
      english: 'x',
      turkish: 'x',
    })),
  }
}

const quranVocab1 = level('level-one', 50)
const quranVocab2 = level('level-two', 50)
const track = [quranVocab1, quranVocab2]

/** Put `count` of the deck's cards into `state`. */
async function seed(deck: typeof quranVocab1, count: number, state: State) {
  const cards = cardsOfDeck(deck).slice(0, count)
  await db.cardState.bulkPut(
    cards.map((card) => ({
      cardId: card.cardId,
      deckId: deck.id,
      state,
      due: 0,
      stability: 1,
      difficulty: 5,
      scheduled_days: 0,
      learning_steps: 0,
      reps: 1,
      lapses: 0,
    })),
  )
}

describe('trackStatus', () => {
  it('opens the first level and locks the rest on a fresh device', async () => {
    const status = await trackStatus(db, track)
    expect(status.levels[0].unlocked).toBe(true)
    expect(status.levels[1].unlocked).toBe(false)
    expect(status.graduated).toBe(0)
    expect(status.total).toBe(100)
    expect(status.currentLevel).toBe(1)
  })

  it('counts only graduated cards as known, not merely started ones', async () => {
    await seed(quranVocab1, 30, State.Learning)
    const status = await trackStatus(db, track)
    expect(status.levels[0].started).toBe(30)
    expect(status.levels[0].graduated).toBe(0)
    expect(status.levels[1].unlocked).toBe(false)
  })

  it('keeps the next level shut just below the threshold', async () => {
    const total = cardsOfDeck(quranVocab1).length
    await seed(quranVocab1, Math.ceil(total * GRADUATION_THRESHOLD) - 1, State.Review)
    const status = await trackStatus(db, track)
    expect(status.levels[1].unlocked).toBe(false)
  })

  it('opens the next level at the threshold', async () => {
    const total = cardsOfDeck(quranVocab1).length
    await seed(quranVocab1, Math.ceil(total * GRADUATION_THRESHOLD), State.Review)
    const status = await trackStatus(db, track)
    expect(status.levels[1].unlocked).toBe(true)
    expect(status.currentLevel).toBe(1) // level 1 is open but not finished
  })

  it('moves to the next level once the previous one is fully known', async () => {
    await seed(quranVocab1, cardsOfDeck(quranVocab1).length, State.Review)
    const status = await trackStatus(db, track)
    expect(status.currentLevel).toBe(2)
    expect(status.graduated).toBe(50)
  })

  it('never unlocks past a level whose content is not written', async () => {
    const unwritten = { ...quranVocab2, locked: true }
    await seed(quranVocab1, cardsOfDeck(quranVocab1).length, State.Review)
    const status = await trackStatus(db, [quranVocab1, unwritten])
    expect(status.levels[1].unlocked).toBe(false)
  })
})
