import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { db } from '../db/db'
import { computeStats } from '../srs/stats'
import { computeForecast } from '../srs/forecast'
import { computeLeeches, type Leech } from '../srs/leeches'
import { computeHeatmap, type HeatmapCell } from '../srs/heatmap'
import { computeCoverage, type Coverage } from '../srs/coverage'

interface Bar {
  day: number
  value: number
}

const HEATMAP_LEVEL_OPACITY = [0, 0.28, 0.5, 0.74, 1]

function Heatmap({ weeks }: { weeks: HeatmapCell[][] }) {
  const cell = 13
  const gap = 3
  const step = cell + gap
  const width = weeks.length * step - gap
  const height = 7 * step - gap

  return (
    <div className="card" style={{ padding: 12, overflow: 'hidden' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Reviews per day, last 26 weeks"
      >
        {weeks.map((column, col) =>
          column.map((c, row) => {
            if (c.future) return null
            return (
              <rect
                key={c.day}
                x={col * step}
                y={row * step}
                width={cell}
                height={cell}
                rx={2}
                fill={c.level === 0 ? 'var(--surface-2)' : 'var(--accent)'}
                fillOpacity={c.level === 0 ? 1 : HEATMAP_LEVEL_OPACITY[c.level]}
                stroke={c.isToday ? 'var(--text)' : 'none'}
                strokeWidth={c.isToday ? 1.5 : 0}
              />
            )
          }),
        )}
      </svg>
      <p className="caption" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>26 weeks ago</span>
        <span>today</span>
      </p>
    </div>
  )
}

function referenceLink(referenceId: string): string {
  const [entry, anchor] = referenceId.split('#')
  return anchor ? `/reference/${entry}?h=${anchor}` : `/reference/${entry}`
}

function LeechRow({ leech }: { leech: Leech }) {
  const body = (
    <>
      <span className="arabic leech-arabic">{leech.arabic}</span>
      <span className="leech-meaning">
        {leech.english} · {leech.turkish}
      </span>
      <span className="leech-lapses">{leech.lapses} lapses</span>
    </>
  )
  return leech.referenceId ? (
    <Link className="card leech-row" to={referenceLink(leech.referenceId)}>
      {body}
    </Link>
  ) : (
    <div className="card leech-row">{body}</div>
  )
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

/**
 * How much of the Qurʾan the learner can read, by word occurrence.
 *
 * Occurrences rather than words: the commonest 50 words are a far larger share
 * of the text than 50 taken at random, and that is the whole reason the
 * vocabulary track is ordered by frequency. The denominator is stated so the
 * number can be read as a claim rather than a score.
 */
function CoveragePanel({ coverage }: { coverage: Coverage }) {
  const percent = coverage.percent
  const shown = percent > 0 && percent < 1 ? percent.toFixed(1) : Math.round(percent)

  return (
    <div className="card coverage">
      <div className="coverage-head">
        <div>
          <div className="coverage-value">
            {shown}
            <span className="coverage-unit">%</span>
          </div>
          <div className="label">of the Qurʾan you can read</div>
        </div>
        {coverage.gained > 0 && (
          <div className="coverage-gain">
            +{coverage.gained < 1 ? coverage.gained.toFixed(1) : Math.round(coverage.gained)}%
            <span className="label">this month</span>
          </div>
        )}
      </div>

      <div className="coverage-bar" aria-hidden="true">
        <div className="coverage-bar-fill" style={{ width: `${Math.min(100, percent)}%` }} />
      </div>

      <p className="coverage-note">
        {coverage.words} word{coverage.words === 1 ? '' : 's'} known, covering{' '}
        {coverage.known.toLocaleString()} of {coverage.total.toLocaleString()} word
        occurrences. Attached particles are excluded from both sides.
      </p>
    </div>
  )
}

export function StatsPage() {
  const stats = useLiveQuery(() => computeStats(db, new Date()))
  const forecast = useLiveQuery(() => computeForecast(db, new Date()))
  const leeches = useLiveQuery(() => computeLeeches(db))
  const heatmap = useLiveQuery(() => computeHeatmap(db, new Date()))
  const coverage = useLiveQuery(() => computeCoverage(db, new Date()))

  if (!stats || !forecast || !leeches || !heatmap || !coverage)
    return <main className="page" />

  return (
    <main className="page">
      <h1 className="page-title">Stats</h1>

      <CoveragePanel coverage={coverage} />

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

      <h2 className="chart-title">Activity</h2>
      <Heatmap weeks={heatmap.weeks} />

      {leeches.length > 0 && (
        <>
          <h2 className="chart-title">Leeches</h2>
          <p className="caption" style={{ marginBottom: 8 }}>
            Cards that keep lapsing. Fix them in the deck.
          </p>
          <div className="leech-list">
            {leeches.map((leech) => (
              <LeechRow key={leech.cardId} leech={leech} />
            ))}
          </div>
        </>
      )}

      <p className="caption" style={{ marginTop: 12 }}>
        {stats.totalReviews} reviews all time.
      </p>
    </main>
  )
}
