import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import { computeStats } from '../srs/stats'
import { computeForecast } from '../srs/forecast'

interface Bar {
  day: number
  value: number
}

function BarChart({
  bars,
  ariaLabel,
  leftLabel,
  rightLabel,
}: {
  bars: Bar[]
  ariaLabel: string
  leftLabel: string
  rightLabel: string
}) {
  const width = 600
  const height = 140
  const barGap = 2
  const barWidth = width / bars.length - barGap
  const max = Math.max(1, ...bars.map((b) => b.value))

  return (
    <div className="card" style={{ padding: 12 }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label={ariaLabel}
      >
        {bars.map((b, i) => {
          const h = (b.value / max) * (height - 20)
          return (
            <rect
              key={b.day}
              x={i * (barWidth + barGap)}
              y={height - h}
              width={barWidth}
              height={h}
              rx={2}
              fill="var(--accent)"
              opacity={b.value === 0 ? 0.15 : 1}
            />
          )
        })}
      </svg>
      <p className="caption" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </p>
    </div>
  )
}

export function StatsPage() {
  const stats = useLiveQuery(() => computeStats(db, new Date()))
  const forecast = useLiveQuery(() => computeForecast(db, new Date()))

  if (!stats || !forecast) return <main className="page" />

  return (
    <main className="page">
      <h1 className="page-title">Stats</h1>

      <div className="stat-tiles">
        <div className="card">
          <div className="value">{stats.reviewsToday}</div>
          <div className="label">reviews today</div>
        </div>
        <div className="card">
          <div className="value">{stats.newToday}</div>
          <div className="label">new cards today</div>
        </div>
        <div className="card">
          <div className="value">{stats.streakDays}</div>
          <div className="label">day streak</div>
        </div>
        <div className="card">
          <div className="value">
            {Number.isNaN(stats.retention)
              ? '—'
              : `${Math.round(stats.retention * 100)}%`}
          </div>
          <div className="label">retention (review cards)</div>
        </div>
      </div>

      <h2 className="chart-title">Reviews per day</h2>
      <BarChart
        bars={stats.last30Days.map((d) => ({ day: d.day, value: d.reviews }))}
        ariaLabel="Reviews per day, last 30 days"
        leftLabel="30 days ago"
        rightLabel="today"
      />

      <h2 className="chart-title">Review forecast</h2>
      <BarChart
        bars={forecast.map((d) => ({ day: d.day, value: d.due }))}
        ariaLabel="Cards due per day, next 30 days"
        leftLabel="today"
        rightLabel="in 30 days"
      />

      <p className="caption" style={{ marginTop: 12 }}>
        {stats.totalReviews} reviews all time.
      </p>
    </main>
  )
}
