import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import { computeStats, type DayCount } from '../srs/stats'

function BarChart({ days }: { days: DayCount[] }) {
  const width = 600
  const height = 140
  const barGap = 2
  const barWidth = width / days.length - barGap
  const max = Math.max(1, ...days.map((d) => d.reviews))

  return (
    <div className="card" style={{ padding: 12 }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Reviews per day, last 30 days"
      >
        {days.map((d, i) => {
          const h = (d.reviews / max) * (height - 20)
          return (
            <rect
              key={d.day}
              x={i * (barWidth + barGap)}
              y={height - h}
              width={barWidth}
              height={h}
              rx={2}
              fill="var(--accent)"
              opacity={d.reviews === 0 ? 0.15 : 1}
            />
          )
        })}
      </svg>
      <p className="caption" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>30 days ago</span>
        <span>today</span>
      </p>
    </div>
  )
}

export function StatsPage() {
  const stats = useLiveQuery(() => computeStats(db, new Date()))

  if (!stats) return <main className="page" />

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
      <BarChart days={stats.last30Days} />

      <p className="caption" style={{ marginTop: 12 }}>
        {stats.totalReviews} reviews all time.
      </p>
    </main>
  )
}
