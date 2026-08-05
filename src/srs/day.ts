// Shared day-bucketing helpers. One implementation for computeStats,
// the forecast, and the heatmap, so date math never drifts between them.

export const DAY_MS = 24 * 60 * 60 * 1000

/** Local start-of-day (00:00) for an epoch-ms timestamp, as epoch ms. */
export function startOfDay(ms: number): number {
  const d = new Date(ms)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}
