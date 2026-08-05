import { describe, expect, it } from 'vitest'
import { State } from 'ts-fsrs'
import type { ReviewLogRow } from '../db/db'
import {
  aggregateMetrics,
  buildEvalArrays,
  buildTrainingArrays,
  groupSequences,
} from './optimizeData'

const MS_PER_DAY = 24 * 60 * 60 * 1000
// Noon on a DST-free date so each +1 day is exactly one calendar day.
const BASE = new Date(2025, 0, 1, 12, 0, 0).getTime()

function review(cardId: string, day: number, rating: number): ReviewLogRow {
  return {
    cardId,
    deckId: 'd',
    rating,
    state: State.Review,
    due: 0,
    stability: 0,
    difficulty: 0,
    scheduled_days: 0,
    learning_steps: 0,
    review: BASE + day * MS_PER_DAY,
  }
}

// Three cards chosen so the expanded training set matches fsrs-browser's own
// serialization fixture (sandbox/src/testSerialization.ts).
// Review days are cumulative sums of the fixture's delta_t values, so the
// per-card day gaps reproduce the fixture's [0,5,11], [0,2,6,16,39], [0,1,1].
function fixtureRows(): ReviewLogRow[] {
  return [
    review('A', 0, 4),
    review('A', 5, 3),
    review('A', 16, 3),
    review('B', 0, 4),
    review('B', 2, 3),
    review('B', 8, 3),
    review('B', 24, 3),
    review('B', 63, 3),
    review('E', 0, 1),
    review('E', 1, 1),
    review('E', 2, 3),
  ]
}

describe('groupSequences', () => {
  it('groups by card, sorts by time, and computes day-gap delta_t', () => {
    const seqs = groupSequences([
      review('A', 5, 3),
      review('A', 0, 4),
      review('A', 11, 3),
    ])
    expect(seqs).toHaveLength(1)
    expect(seqs[0]).toEqual([
      { rating: 4, deltaT: 0 },
      { rating: 3, deltaT: 5 },
      { rating: 3, deltaT: 6 },
    ])
  })

  it('drops cards with fewer than two reviews', () => {
    const seqs = groupSequences([review('solo', 0, 3), review('B', 0, 3), review('B', 1, 3)])
    expect(seqs).toHaveLength(1)
  })
})

describe('buildTrainingArrays', () => {
  it('expands each card into prefixes of length 2..N', () => {
    const arrays = buildTrainingArrays(groupSequences(fixtureRows()))
    expect(Array.from(arrays.lengths)).toEqual([2, 3, 2, 3, 4, 5, 2, 3])
    expect(Array.from(arrays.ratings)).toEqual([
      4, 3, 4, 3, 3, // A
      4, 3, 4, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, // B
      1, 1, 1, 1, 3, // E
    ])
    expect(Array.from(arrays.deltaTs)).toEqual([
      0, 5, 0, 5, 11, // A
      0, 2, 0, 2, 6, 0, 2, 6, 16, 0, 2, 6, 16, 39, // B
      0, 1, 0, 1, 1, // E
    ])
    // ratings and deltaTs are aligned and sum of lengths matches.
    expect(arrays.ratings.length).toBe(arrays.deltaTs.length)
    expect(arrays.ratings.length).toBe(
      Array.from(arrays.lengths).reduce((a, b) => a + b, 0),
    )
  })
})

describe('buildEvalArrays', () => {
  it('builds history prefixes and aligned prediction labels', () => {
    const e = buildEvalArrays(groupSequences(fixtureRows()))
    expect(Array.from(e.histLengths)).toEqual([1, 2, 1, 2, 3, 4, 1, 2])
    expect(Array.from(e.predDeltaTs)).toEqual([5, 11, 2, 6, 16, 39, 1, 1])
    // Again (rating 1) is the only "not recalled" label.
    expect(Array.from(e.predLabels)).toEqual([1, 1, 1, 1, 1, 1, 0, 1])
    expect(Array.from(e.histRatings)).toEqual([
      4, 4, 3, // A histories
      4, 4, 3, 4, 3, 3, 4, 3, 3, 3, // B histories
      1, 1, 1, // E histories
    ])
    expect(e.histRatings.length).toBe(
      Array.from(e.histLengths).reduce((a, b) => a + b, 0),
    )
    expect(e.predDeltaTs.length).toBe(e.predLabels.length)
    expect(e.predDeltaTs.length).toBe(e.histLengths.length)
  })
})

describe('aggregateMetrics', () => {
  it('computes log-loss and RMSE against labels', () => {
    const m = aggregateMetrics([0.9, 0.9], [1, 1])
    expect(m.count).toBe(2)
    expect(m.logLoss).toBeCloseTo(-Math.log(0.9), 6)
    expect(m.rmse).toBeCloseTo(0.1, 6)
  })

  it('clamps 0/1 predictions so log-loss stays finite', () => {
    const m = aggregateMetrics([1, 0], [1, 0])
    expect(Number.isFinite(m.logLoss)).toBe(true)
    expect(m.logLoss).toBeGreaterThanOrEqual(0)
    expect(m.rmse).toBeLessThan(1e-5)
  })

  it('returns zeros for an empty set', () => {
    expect(aggregateMetrics([], [])).toEqual({ logLoss: 0, rmse: 0, count: 0 })
  })
})
