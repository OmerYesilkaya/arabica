import type { ArabicaDB } from '../db/db'
import { startOfToday } from './engine'
import { DAY_MS, startOfDay } from './day'

/** Weeks (columns) shown; fits an iPhone width without horizontal scroll. */
export const HEATMAP_WEEKS = 26
/** Intensity levels, 0 (no reviews) through 4 (busiest). */
export const HEATMAP_LEVELS = 5

export interface HeatmapCell {
  /** Start of day, epoch ms. */
  day: number
  reviews: number
  /** 0..4; 0 means no reviews and is visibly distinct. */
  level: number
  isToday: boolean
  /** Trailing cells after today in the last column: no day to show. */
  future: boolean
}

export interface Heatmap {
  /** One entry per week column; each column has 7 cells, Sun (row 0)..Sat (row 6). */
  weeks: HeatmapCell[][]
  /** Busiest day's review count in the period (>= 1 for scaling). */
  max: number
}

/** Intensity level 0..4 for a day's count relative to the period maximum. */
export function levelOf(reviews: number, max: number): number {
  if (reviews <= 0 || max <= 0) return 0
  const frac = reviews / max
  if (frac <= 0.25) return 1
  if (frac <= 0.5) return 2
  if (frac <= 0.75) return 3
  return 4
}

/**
 * GitHub-style review heatmap from the review log. Columns are weeks,
 * rows are weekdays (Sunday first). Today sits in the last column; cells
 * after today are marked `future`. Day bucketing is the shared helper, so
 * it matches computeStats exactly.
 */
export async function computeHeatmap(
  db: ArabicaDB,
  now: Date,
  weeks = HEATMAP_WEEKS,
): Promise<Heatmap> {
  const logs = await db.reviewLog.toArray()
  const byDay = new Map<number, number>()
  for (const log of logs) {
    const day = startOfDay(log.review)
    byDay.set(day, (byDay.get(day) ?? 0) + 1)
  }

  const today = startOfToday(now)
  const weekday = new Date(today).getDay() // 0 = Sunday
  // Sunday of the leftmost column.
  const gridStart = today - (weekday + (weeks - 1) * 7) * DAY_MS

  let max = 1
  for (let col = 0; col < weeks; col++) {
    for (let row = 0; row < 7; row++) {
      const day = gridStart + (col * 7 + row) * DAY_MS
      if (day > today) continue
      const reviews = byDay.get(day) ?? 0
      if (reviews > max) max = reviews
    }
  }

  const columns: HeatmapCell[][] = []
  for (let col = 0; col < weeks; col++) {
    const cells: HeatmapCell[] = []
    for (let row = 0; row < 7; row++) {
      const day = gridStart + (col * 7 + row) * DAY_MS
      const future = day > today
      const reviews = future ? 0 : (byDay.get(day) ?? 0)
      cells.push({
        day,
        reviews,
        level: future ? 0 : levelOf(reviews, max),
        isToday: day === today,
        future,
      })
    }
    columns.push(cells)
  }

  return { weeks: columns, max }
}
