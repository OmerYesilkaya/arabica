import { beforeEach, describe, expect, it } from 'vitest'
import { State } from 'ts-fsrs'
import { ArabicaDB, type CardStateRow } from '../db/db'
import { computeForecast } from './forecast'
import { DAY_MS } from './day'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`forecast-test-${++counter}`)
})

function row(cardId: string, due: number, state = State.Review): CardStateRow {
  return {
    cardId,
    deckId: 'd',
    due,
    stability: 1,
    difficulty: 1,
    scheduled_days: 1,
    learning_steps: 0,
    reps: 1,
    lapses: 0,
    state,
  }
}

// A fixed mid-day "now" so day math is unambiguous.
const now = new Date('2026-08-05T13:00:00')
const today = new Date('2026-08-05T00:00:00').getTime()

describe('computeForecast', () => {
  it('returns 30 buckets, today first', async () => {
    const forecast = await computeForecast(db, now)
    expect(forecast.length).toBe(30)
    expect(forecast[0].day).toBe(today)
    expect(forecast[29].day).toBe(today + 29 * DAY_MS)
  })

  it('empty when nothing is scheduled', async () => {
    const forecast = await computeForecast(db, now)
    expect(forecast.every((d) => d.due === 0)).toBe(true)
  })

  it('folds overdue cards into today', async () => {
    await db.cardState.bulkPut([
      row('a', today - 5 * DAY_MS), // overdue
      row('b', now.getTime() - 60 * 1000), // due earlier today
      row('c', today + 2 * DAY_MS), // future
    ])
    const forecast = await computeForecast(db, now)
    expect(forecast[0].due).toBe(2) // overdue + earlier-today
    expect(forecast[2].due).toBe(1)
  })

  it('buckets by local day across midnight', async () => {
    await db.cardState.bulkPut([
      row('a', today + DAY_MS + 30 * 60 * 1000), // 00:30 tomorrow
      row('b', today + 2 * DAY_MS - 30 * 60 * 1000), // 23:30 tomorrow
    ])
    const forecast = await computeForecast(db, now)
    expect(forecast[1].due).toBe(2) // both land on tomorrow
    expect(forecast[0].due).toBe(0)
    expect(forecast[2].due).toBe(0)
  })

  it('excludes New (unintroduced) cards', async () => {
    await db.cardState.bulkPut([
      row('a', today, State.New),
      row('b', today, State.Learning),
    ])
    const forecast = await computeForecast(db, now)
    expect(forecast[0].due).toBe(1) // only the Learning card
  })

  it('excludes cards due beyond the window', async () => {
    await db.cardState.put(row('a', today + 40 * DAY_MS))
    const forecast = await computeForecast(db, now)
    expect(forecast.every((d) => d.due === 0)).toBe(true)
  })
})
