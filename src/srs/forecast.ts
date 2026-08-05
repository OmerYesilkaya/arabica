import { State } from 'ts-fsrs'
import type { ArabicaDB } from '../db/db'
import { startOfToday } from './engine'
import { DAY_MS, startOfDay } from './day'

export interface ForecastDay {
  /** Start of day, epoch ms. */
  day: number
  /** Cards scheduled due on this day. */
  due: number
}

/** Days ahead the forecast covers. */
export const FORECAST_DAYS = 30

/**
 * Due-review forecast from cardState. Today first.
 *
 * - Overdue cards (due before today) fold into today's bucket.
 * - New (unintroduced) cards are excluded: their due date is not real yet.
 * - Cards due beyond the window are excluded.
 */
export async function computeForecast(
  db: ArabicaDB,
  now: Date,
  days = FORECAST_DAYS,
): Promise<ForecastDay[]> {
  const rows = await db.cardState.toArray()
  const today = startOfToday(now)
  const horizon = today + days * DAY_MS

  const byDay = new Map<number, number>()
  for (const row of rows) {
    // New-state rows have no meaningful due date (includes buried, not-yet
    // introduced siblings), so they never enter the forecast.
    if (row.state === State.New) continue
    let day = startOfDay(row.due)
    if (day < today) day = today // overdue folds into today
    if (day >= horizon) continue // beyond the window
    byDay.set(day, (byDay.get(day) ?? 0) + 1)
  }

  const forecast: ForecastDay[] = []
  for (let i = 0; i < days; i++) {
    const day = today + i * DAY_MS
    forecast.push({ day, due: byDay.get(day) ?? 0 })
  }
  return forecast
}
