import { beforeEach, describe, expect, it } from 'vitest'
import { State } from 'ts-fsrs'
import { ArabicaDB, type CardStateRow } from '../db/db'
import { cardIdOf } from '../content/types'
import { computeLeeches, LEECH_THRESHOLD } from './leeches'
import { noteById } from '../content/decks'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`leeches-test-${++counter}`)
})

function row(cardId: string, lapses: number): CardStateRow {
  return {
    cardId,
    deckId: 'huruf-al-khafd-senses',
    due: 0,
    stability: 1,
    difficulty: 1,
    scheduled_days: 1,
    learning_steps: 0,
    reps: lapses,
    lapses,
    state: State.Review,
  }
}

const min = cardIdOf('min', 'ar-to-meaning')
const ila = cardIdOf('ila', 'ar-to-meaning')
const an = cardIdOf('an', 'ar-to-meaning')

describe('computeLeeches', () => {
  it('selects only cards at or above the threshold', async () => {
    await db.cardState.bulkPut([
      row(min, LEECH_THRESHOLD), // exactly at threshold -> leech
      row(ila, LEECH_THRESHOLD - 1), // below -> not
      row(an, LEECH_THRESHOLD + 5), // above -> leech
    ])
    const leeches = await computeLeeches(db)
    expect(leeches.map((l) => l.cardId)).toEqual([an, min]) // worst first
  })

  it('is empty when no card lapses enough', async () => {
    await db.cardState.put(row(min, 0))
    expect(await computeLeeches(db)).toEqual([])
  })

  it('carries content and reference link', async () => {
    await db.cardState.put(row(min, LEECH_THRESHOLD))
    const [leech] = await computeLeeches(db)
    expect(leech.arabic).toBe('مِنْ')
    // Read from content rather than restated: the meaning is the primary
    // sense's, and it is DRAFT text that will be corrected in place.
    expect(leech.english).toBe(noteById('min')!.english)
    expect(leech.lapses).toBe(LEECH_THRESHOLD)
    expect(leech.referenceId).toBe('huruf-al-khafd#min')
  })

  it('skips orphaned progress rows with no content', async () => {
    await db.cardState.put(row('gone|ar-to-meaning', LEECH_THRESHOLD))
    expect(await computeLeeches(db)).toEqual([])
  })
})
