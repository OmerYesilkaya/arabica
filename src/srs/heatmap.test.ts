import { beforeEach, describe, expect, it } from 'vitest'
import { State } from 'ts-fsrs'
import { ArabicaDB, type ReviewLogRow } from '../db/db'
import { computeHeatmap, levelOf, HEATMAP_WEEKS } from './heatmap'
import { DAY_MS } from './day'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`heatmap-test-${++counter}`)
})

function log(review: number): ReviewLogRow {
  return {
    cardId: 'c',
    deckId: 'd',
    rating: 3,
    state: State.Review,
    due: review,
    stability: 1,
    difficulty: 1,
    scheduled_days: 1,
    learning_steps: 0,
    review,
  }
}

// A Wednesday, mid-day.
const now = new Date('2026-08-05T13:00:00')
const today = new Date('2026-08-05T00:00:00').getTime()

describe('levelOf', () => {
  it('maps zero to level 0 and clamps to 0..4', () => {
    expect(levelOf(0, 10)).toBe(0)
    expect(levelOf(5, 0)).toBe(0) // no max yet
    expect(levelOf(1, 10)).toBe(1)
    expect(levelOf(2.5, 10)).toBe(1)
    expect(levelOf(5, 10)).toBe(2)
    expect(levelOf(7, 10)).toBe(3)
    expect(levelOf(10, 10)).toBe(4)
  })
})

describe('computeHeatmap', () => {
  it('lays out weeks x 7 weekdays with today in the last column', async () => {
    const { weeks } = await computeHeatmap(db, now)
    expect(weeks.length).toBe(HEATMAP_WEEKS)
    expect(weeks.every((c) => c.length === 7)).toBe(true)

    const lastCol = weeks[weeks.length - 1]
    const todayCell = lastCol.find((c) => c.isToday)
    expect(todayCell?.day).toBe(today)
    // Wednesday -> row index 3 (Sun=0).
    expect(lastCol.indexOf(todayCell!)).toBe(3)
    // Cells after today (Thu..Sat) are future.
    expect(lastCol.slice(4).every((c) => c.future)).toBe(true)
  })

  it('buckets reviews by local day', async () => {
    await db.reviewLog.bulkAdd([
      log(today + 30 * 60 * 1000), // today 00:30
      log(now.getTime()), // today 13:00
      log(today - DAY_MS + 60 * 1000), // yesterday
    ])
    const { weeks } = await computeHeatmap(db, now)
    const cells = weeks.flat()
    const todayCell = cells.find((c) => c.day === today)
    const yesterday = cells.find((c) => c.day === today - DAY_MS)
    expect(todayCell?.reviews).toBe(2)
    expect(yesterday?.reviews).toBe(1)
  })

  it('scales levels against the busiest day', async () => {
    // Busiest day gets 4 reviews -> level 4; a 1-review day -> level 1.
    await db.reviewLog.bulkAdd([
      log(today),
      log(today),
      log(today),
      log(today),
      log(today - DAY_MS),
    ])
    const { weeks, max } = await computeHeatmap(db, now)
    const cells = weeks.flat()
    expect(max).toBe(4)
    expect(cells.find((c) => c.day === today)?.level).toBe(4)
    expect(cells.find((c) => c.day === today - DAY_MS)?.level).toBe(1)
  })

  it('marks empty days as level 0', async () => {
    const { weeks } = await computeHeatmap(db, now)
    expect(weeks.flat().every((c) => c.level === 0 && c.reviews === 0)).toBe(true)
  })
})
