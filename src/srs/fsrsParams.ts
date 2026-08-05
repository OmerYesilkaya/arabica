import { generatorParameters } from 'ts-fsrs'
import type { ArabicaDB } from '../db/db'

/** Meta key under which personalized FSRS weights (the `w` vector) live. */
export const FSRS_PARAMS_KEY = 'fsrsParams'

/**
 * Minimum number of reviews before optimization is offered. The FSRS project
 * recommends at least ~1000 reviews for stable parameters.
 */
export const MIN_REVIEWS_TO_OPTIMIZE = 1000

/** Number of weights in an FSRS-6 parameter vector. */
export const FSRS_WEIGHT_COUNT = 21

/**
 * Scheduler configuration shared by the default and personalized schedulers.
 * Anki-compatible: retention 0.9, fuzz on. Only the `w` vector is personalized.
 */
export const BASE_SCHEDULER_CONFIG = {
  request_retention: 0.9,
  enable_fuzz: true,
} as const

/** The ts-fsrs default weights (FSRS-6, 21 values). */
export function defaultWeights(): number[] {
  return [...generatorParameters(BASE_SCHEDULER_CONFIG).w]
}

/** True when `w` is a usable FSRS-6 weight vector. */
export function isValidWeights(w: unknown): w is number[] {
  return (
    Array.isArray(w) &&
    w.length === FSRS_WEIGHT_COUNT &&
    w.every((n) => typeof n === 'number' && Number.isFinite(n))
  )
}

/** Personalized weights from `meta`, or undefined when none are stored. */
export async function getStoredWeights(db: ArabicaDB): Promise<number[] | undefined> {
  const row = await db.meta.get(FSRS_PARAMS_KEY)
  return isValidWeights(row?.value) ? (row.value as number[]) : undefined
}

/** Persist personalized weights in `meta`. */
export async function storeWeights(db: ArabicaDB, w: number[]): Promise<void> {
  await db.meta.put({ key: FSRS_PARAMS_KEY, value: w })
}

/** Remove personalized weights so scheduling falls back to defaults. */
export async function clearStoredWeights(db: ArabicaDB): Promise<void> {
  await db.meta.delete(FSRS_PARAMS_KEY)
}
