import { useRef, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import {
  exportBackup,
  importBackup,
  parseBackup,
  LAST_EXPORT_KEY,
} from '../db/exportImport'
import { setHideTashkeel, useHideTashkeel } from '../lib/useHideTashkeel'
import { setSchedulerWeights } from '../srs/engine'
import {
  MIN_REVIEWS_TO_OPTIMIZE,
  clearStoredWeights,
  defaultWeights,
  getStoredWeights,
  storeWeights,
} from '../srs/fsrsParams'
import {
  canOptimize,
  optimizeParameters,
  type OptimizeProgress,
  type OptimizeResult,
} from '../srs/optimizer'

function fmt(n: number): string {
  return n.toFixed(4)
}

function weightsLine(w: number[]): string {
  return w.map((n) => n.toFixed(4)).join(', ')
}

export function SettingsPage() {
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)

  const [optState, setOptState] = useState<'idle' | 'running' | 'ready'>('idle')
  const [progress, setProgress] = useState<OptimizeProgress | null>(null)
  const [result, setResult] = useState<OptimizeResult | null>(null)
  const [optError, setOptError] = useState<string | null>(null)

  const lastExport = useLiveQuery(async () => {
    const row = await db.meta.get(LAST_EXPORT_KEY)
    return (row?.value as number | undefined) ?? null
  })

  const totalReviews = useLiveQuery(() => db.reviewLog.count())
  const storedWeights = useLiveQuery(() => getStoredWeights(db))
  const personalized = storedWeights != null

  const coiReady = canOptimize()
  const enoughReviews = (totalReviews ?? 0) >= MIN_REVIEWS_TO_OPTIMIZE

  const hideTashkeel = useHideTashkeel()

  async function onExport() {
    await exportBackup(db, new Date())
    setMessage('Backup exported. Save the file to iCloud Files.')
  }

  async function onImportFile(file: File) {
    try {
      const backup = parseBackup(await file.text())
      const ok = window.confirm(
        `Replace ALL progress on this device with the backup from ${backup.exportedAt.slice(0, 10)} (${backup.reviewLog.length} reviews)?`,
      )
      if (!ok) return
      await importBackup(db, backup)
      // Adopt any personalized weights the backup carried.
      setSchedulerWeights(await getStoredWeights(db))
      setMessage('Backup imported.')
    } catch (err) {
      setMessage(`Import failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  async function onOptimize() {
    setOptState('running')
    setOptError(null)
    setResult(null)
    setProgress(null)
    try {
      const rows = await db.reviewLog.toArray()
      const current = (await getStoredWeights(db)) ?? defaultWeights()
      const res = await optimizeParameters(rows, current, setProgress)
      setResult(res)
      setOptState('ready')
    } catch (err) {
      setOptError(err instanceof Error ? err.message : String(err))
      setOptState('idle')
    }
  }

  async function onApply() {
    if (!result) return
    const ok = window.confirm(
      'Apply the proposed FSRS parameters? Future scheduling will use them.',
    )
    if (!ok) return
    await storeWeights(db, result.proposed)
    setSchedulerWeights(result.proposed)
    setResult(null)
    setOptState('idle')
    setMessage('Personalized parameters applied.')
  }

  async function onReset() {
    const ok = window.confirm('Reset FSRS parameters to the defaults?')
    if (!ok) return
    await clearStoredWeights(db)
    setSchedulerWeights(undefined)
    setResult(null)
    setOptState('idle')
    setMessage('Parameters reset to defaults.')
  }

  return (
    <main className="page">
      <h1 className="page-title">Settings</h1>

      {message && <div className="banner">{message}</div>}

      <div className="card settings-block">
        <h2>Reading</h2>
        <label className="setting-row">
          <span>
            Hide tashkeel
            <span className="muted setting-hint">
              Vowel marks are hidden on flashcards. Reference always shows them.
            </span>
          </span>
          <input
            type="checkbox"
            checked={hideTashkeel}
            onChange={(e) => setHideTashkeel(e.target.checked)}
          />
        </label>
      </div>

      <div className="card settings-block">
        <h2>FSRS parameters</h2>
        <p>
          {personalized
            ? 'Scheduling uses your personalized parameters.'
            : 'Scheduling uses the default parameters.'}{' '}
          Optimization learns parameters from your review history, on-device.
        </p>

        {!coiReady && (
          <p className="muted">
            Optimization runs only in the installed app (it needs a
            cross-origin-isolated context). Open arabica from your home screen,
            or reload once after install.
          </p>
        )}
        {coiReady && !enoughReviews && (
          <p className="muted">
            Needs at least {MIN_REVIEWS_TO_OPTIMIZE} reviews. You have{' '}
            {totalReviews ?? 0}.
          </p>
        )}

        <div className="settings-actions">
          <button
            className="primary"
            onClick={onOptimize}
            disabled={!coiReady || !enoughReviews || optState === 'running'}
          >
            {optState === 'running' ? 'Optimizing…' : 'Optimize parameters'}
          </button>
          <button className="secondary" onClick={onReset} disabled={!personalized}>
            Reset to defaults
          </button>
        </div>

        {optState === 'running' && (
          <p className="muted">
            {progress && progress.total > 0
              ? `Training… ${progress.processed}/${progress.total}`
              : 'Training… this can take a moment.'}
          </p>
        )}

        {optError && <p className="muted">Optimization failed: {optError}</p>}

        {result && (
          <div className="optimize-result">
            <div className="optimize-metrics">
              <div>
                <span className="muted">Log-loss</span> {fmt(result.current.logLoss)}{' '}
                → {fmt(result.proposedMetrics.logLoss)}
              </div>
              <div>
                <span className="muted">RMSE</span> {fmt(result.current.rmse)} →{' '}
                {fmt(result.proposedMetrics.rmse)}
              </div>
              <div className="muted">
                Scored on {result.proposedMetrics.count} predictions from{' '}
                {result.reviewCount} reviews. Lower is better.
              </div>
            </div>
            <details className="params-compare">
              <summary>Parameters</summary>
              <p>
                <span className="muted">Current</span>
                <code>{weightsLine(storedWeights ?? defaultWeights())}</code>
              </p>
              <p>
                <span className="muted">Proposed</span>
                <code>{weightsLine(result.proposed)}</code>
              </p>
            </details>
            <div className="settings-actions">
              <button className="primary" onClick={onApply}>
                Apply proposed
              </button>
              <button
                className="secondary"
                onClick={() => {
                  setResult(null)
                  setOptState('idle')
                }}
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card settings-block">
        <h2>Backup</h2>
        <p>
          Progress lives only in this browser. Export a JSON backup regularly and
          keep it in iCloud Files.
          {lastExport != null
            ? ` Last export: ${new Date(lastExport).toLocaleDateString()}.`
            : ' Never exported yet.'}
        </p>
        <button className="primary" onClick={onExport}>
          Export backup
        </button>
      </div>

      <div className="card settings-block">
        <h2>Restore</h2>
        <p>Import a backup file. This replaces all progress on this device.</p>
        <button className="secondary" onClick={() => fileInput.current?.click()}>
          Import backup…
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onImportFile(file)
            e.target.value = ''
          }}
        />
      </div>

      <div className="card settings-block">
        <h2>About</h2>
        <p>
          arabica · personal Arabic study. Scheduling by ts-fsrs (FSRS).{' '}
          {totalReviews ?? 0} review{totalReviews === 1 ? '' : 's'} recorded.
        </p>
      </div>
    </main>
  )
}
