import { Rating, State } from 'ts-fsrs'
import type { ArabicaDB, ReviewLogRow } from '../db/db'
import { startOfToday } from './engine'
import { DAY_MS, startOfDay } from './day'

export interface DayCount {
  /** Start of day, epoch ms. */
  day: number
  reviews: number
  newIntroduced: number
}

export interface Stats {
  reviewsToday: number
  newToday: number
  streakDays: number
  totalReviews: number
  /** Fraction of Review-state answers that were not Again; NaN when none. */
  retention: number
  last30Days: DayCount[]
}

export async function computeStats(db: ArabicaDB, now: Date): Promise<Stats> {
  const logs = await db.reviewLog.toArray()
  const today = startOfToday(now)

  const byDay = new Map<number, { reviews: number; newIntroduced: number }>()
  for (const log of logs) {
    const day = startOfDay(log.review)
    const entry = byDay.get(day) ?? { reviews: 0, newIntroduced: 0 }
    entry.reviews++
    if (log.state === State.New) entry.newIntroduced++
    byDay.set(day, entry)
  }

  const last30Days: DayCount[] = []
  for (let i = 29; i >= 0; i--) {
    const day = today - i * DAY_MS
    const entry = byDay.get(day)
    last30Days.push({
      day,
      reviews: entry?.reviews ?? 0,
      newIntroduced: entry?.newIntroduced ?? 0,
    })
  }

  let streakDays = 0
  for (let day = today; byDay.has(day); day -= DAY_MS) streakDays++
  // A streak survives today not being studied yet.
  if (streakDays === 0 && byDay.has(today - DAY_MS)) {
    for (let day = today - DAY_MS; byDay.has(day); day -= DAY_MS) streakDays++
  }

  const reviewAnswers = logs.filter((l) => l.state === State.Review)
  const remembered = reviewAnswers.filter((l) => l.rating !== Rating.Again)
  const retention =
    reviewAnswers.length === 0 ? NaN : remembered.length / reviewAnswers.length

  const todayEntry = byDay.get(today)
  return {
    reviewsToday: todayEntry?.reviews ?? 0,
    newToday: todayEntry?.newIntroduced ?? 0,
    streakDays,
    totalReviews: logs.length,
    retention,
    last30Days,
  }
}

export type { ReviewLogRow }
