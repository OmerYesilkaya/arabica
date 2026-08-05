import { afterEach, describe, expect, it } from 'vitest'
import { Rating } from 'ts-fsrs'
import { ArabicaDB } from '../db/db'
import {
  getScheduler,
  loadScheduler,
  newFsrsCard,
  setSchedulerWeights,
} from './engine'
import { defaultWeights, storeWeights } from './fsrsParams'

let counter = 0
function freshDb() {
  return new ArabicaDB(`engine-test-${++counter}`)
}

// A new card graded Good takes its stability from the Good initial weight
// (index 2). Doubling that weight must change the scheduled memory state.
function customWeights() {
  const w = defaultWeights()
  w[2] = w[2] + 5
  return w
}

afterEach(() => {
  setSchedulerWeights(undefined)
})

describe('scheduler weights', () => {
  it('schedules a new card differently with custom weights', () => {
    const now = new Date(2025, 0, 1, 12, 0, 0)
    const before = newFsrsCard(now)

    setSchedulerWeights(undefined)
    const withDefault = getScheduler().next(before, now, Rating.Good).card.stability

    setSchedulerWeights(customWeights())
    const withCustom = getScheduler().next(before, now, Rating.Good).card.stability

    expect(withCustom).not.toBeCloseTo(withDefault, 4)
  })

  it('loadScheduler reads stored weights from meta', async () => {
    const db = freshDb()
    const now = new Date(2025, 0, 1, 12, 0, 0)
    const before = newFsrsCard(now)

    await storeWeights(db, customWeights())
    await loadScheduler(db)
    const stored = getScheduler().next(before, now, Rating.Good).card.stability

    setSchedulerWeights(customWeights())
    const direct = getScheduler().next(before, now, Rating.Good).card.stability

    expect(stored).toBeCloseTo(direct, 6)

    setSchedulerWeights(undefined)
    const fallback = getScheduler().next(before, now, Rating.Good).card.stability
    expect(stored).not.toBeCloseTo(fallback, 4)
  })
})
