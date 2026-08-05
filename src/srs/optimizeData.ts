import { Rating } from 'ts-fsrs'
import type { ReviewLogRow } from '../db/db'

// Pure transforms from the append-only review log into the flat arrays that
// `fsrs-browser` consumes. The review log is never modified (invariant 3).
//
// Data layout mirrors fsrs-rs `FSRSItem`s: reviews are grouped per card in
// chronological order; `delta_t` is the whole-day gap since the previous
// review of that card (0 for same-day/learning-step reviews). Training items
// are the review-prefixes of length >= 2, one per predicted review.

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** One review reduced to what FSRS training needs. */
export interface ReviewPoint {
  rating: number
  /** Whole days since the previous review of the same card (0 for the first). */
  deltaT: number
}

/** Flat arrays for a batch of FSRS items, grouped by `lengths`. */
export interface FsrsArrays {
  ratings: Uint32Array
  deltaTs: Uint32Array
  lengths: Uint32Array
}

/** Everything one optimization run needs, derived once from the review log. */
export interface EvalArrays {
  /** History prefixes (length 1 .. n-1) whose memory state predicts a review. */
  histRatings: Uint32Array
  histDeltaTs: Uint32Array
  histLengths: Uint32Array
  /** For each prediction: the elapsed days and the observed recall label. */
  predDeltaTs: Uint32Array
  predLabels: Uint8Array
}

/** Local calendar day index, DST-safe (uses the local Y/M/D, not raw ms). */
function dayIndex(ms: number): number {
  const d = new Date(ms)
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / MS_PER_DAY)
}

/** A review counts as "recalled" for any grade other than Again. */
function recalled(rating: number): number {
  return rating === Rating.Again ? 0 : 1
}

/**
 * Group the review log into per-card chronological sequences. Cards with fewer
 * than two reviews are dropped: with a single review there is nothing to
 * predict and no elapsed time to learn from.
 */
export function groupSequences(rows: ReviewLogRow[]): ReviewPoint[][] {
  const byCard = new Map<string, ReviewLogRow[]>()
  for (const row of rows) {
    const list = byCard.get(row.cardId)
    if (list) list.push(row)
    else byCard.set(row.cardId, [row])
  }

  const sequences: ReviewPoint[][] = []
  for (const list of byCard.values()) {
    if (list.length < 2) continue
    list.sort((a, b) => a.review - b.review)
    const points: ReviewPoint[] = []
    let prevDay = dayIndex(list[0].review)
    list.forEach((row, i) => {
      const day = dayIndex(row.review)
      points.push({ rating: row.rating, deltaT: i === 0 ? 0 : day - prevDay })
      prevDay = day
    })
    sequences.push(points)
  }
  return sequences
}

/**
 * Expand sequences into training items: for a card with reviews r1..rN, one
 * FSRSItem per prefix of length 2..N (each predicts its final review). This is
 * the exact layout `Fsrs.computeParameters` expects.
 */
export function buildTrainingArrays(sequences: ReviewPoint[][]): FsrsArrays {
  const ratings: number[] = []
  const deltaTs: number[] = []
  const lengths: number[] = []
  for (const seq of sequences) {
    for (let end = 2; end <= seq.length; end++) {
      for (let i = 0; i < end; i++) {
        ratings.push(seq[i].rating)
        deltaTs.push(seq[i].deltaT)
      }
      lengths.push(end)
    }
  }
  return {
    ratings: Uint32Array.from(ratings),
    deltaTs: Uint32Array.from(deltaTs),
    lengths: Uint32Array.from(lengths),
  }
}

/**
 * Build the arrays used to score a parameter set. For each predicted review j
 * (j = 2..N of a card) the history is reviews 1..j-1; the memory state after
 * that history, evaluated at the j-th review's elapsed days, gives the
 * predicted recall probability compared against the observed label.
 */
export function buildEvalArrays(sequences: ReviewPoint[][]): EvalArrays {
  const histRatings: number[] = []
  const histDeltaTs: number[] = []
  const histLengths: number[] = []
  const predDeltaTs: number[] = []
  const predLabels: number[] = []
  for (const seq of sequences) {
    for (let j = 1; j < seq.length; j++) {
      for (let i = 0; i < j; i++) {
        histRatings.push(seq[i].rating)
        histDeltaTs.push(seq[i].deltaT)
      }
      histLengths.push(j)
      predDeltaTs.push(seq[j].deltaT)
      predLabels.push(recalled(seq[j].rating))
    }
  }
  return {
    histRatings: Uint32Array.from(histRatings),
    histDeltaTs: Uint32Array.from(histDeltaTs),
    histLengths: Uint32Array.from(histLengths),
    predDeltaTs: Uint32Array.from(predDeltaTs),
    predLabels: Uint8Array.from(predLabels),
  }
}

export interface Metrics {
  /** Mean binary cross-entropy of predicted vs observed recall. Lower is better. */
  logLoss: number
  /** Root mean squared error of predicted probability vs observed recall. */
  rmse: number
  /** Number of scored predictions. */
  count: number
}

/**
 * Aggregate predicted recall probabilities against observed labels into
 * log-loss and RMSE. Probabilities are clamped away from 0/1 so log-loss stays
 * finite.
 */
export function aggregateMetrics(
  predicted: ArrayLike<number>,
  labels: ArrayLike<number>,
): Metrics {
  const n = predicted.length
  if (n === 0) return { logLoss: 0, rmse: 0, count: 0 }
  const eps = 1e-6
  let loss = 0
  let squared = 0
  for (let i = 0; i < n; i++) {
    const p = Math.min(1 - eps, Math.max(eps, predicted[i]))
    const y = labels[i]
    loss += -(y * Math.log(p) + (1 - y) * Math.log(1 - p))
    squared += (p - y) * (p - y)
  }
  return { logLoss: loss / n, rmse: Math.sqrt(squared / n), count: n }
}
