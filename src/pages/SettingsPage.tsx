import { useRef, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import {
  exportBackup,
  importBackup,
  parseBackup,
  LAST_EXPORT_KEY,
} from '../db/exportImport'
import { setHideTashkeel, useHideTashkeel } from '../settings/useHideTashkeel'
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
import { useStrings } from '../i18n/strings'
import { setLang, useLang, type Lang } from '../settings/useLang'

const LANGS: { value: Lang; label: (s: ReturnType<typeof useStrings>) => string }[] = [
  { value: 'english', label: (s) => s.settings.english },
  { value: 'turkish', label: (s) => s.settings.turkish },
]

function fmt(n: number): string {
  return n.toFixed(4)
}

function weightsLine(w: number[]): string {
  return w.map((n) => n.toFixed(4)).join(', ')
}

export function SettingsPage() {
  const s = useStrings()
  const lang = useLang()
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
    setMessage(s.settings.exported)
  }

  async function onImportFile(file: File) {
    try {
      const backup = parseBackup(await file.text())
      const ok = window.confirm(
        s.settings.confirmImport(backup.exportedAt.slice(0, 10), backup.reviewLog.length),
      )
      if (!ok) return
      await importBackup(db, backup)
      // Adopt any personalized weights the backup carried.
      setSchedulerWeights(await getStoredWeights(db))
      setMessage(s.settings.imported)
    } catch (err) {
      setMessage(s.settings.importFailed(err instanceof Error ? err.message : String(err)))
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
    const ok = window.confirm(s.settings.confirmApply)
    if (!ok) return
    await storeWeights(db, result.proposed)
    setSchedulerWeights(result.proposed)
    setResult(null)
    setOptState('idle')
    setMessage(s.settings.applied)
  }

  async function onReset() {
    const ok = window.confirm(s.settings.confirmReset)
    if (!ok) return
    await clearStoredWeights(db)
    setSchedulerWeights(undefined)
    setResult(null)
    setOptState('idle')
    setMessage(s.settings.resetDone)
  }

  return (
    <main className="page">
      <h1 className="page-title">{s.settings.title}</h1>

      {message && <div className="banner">{message}</div>}

      <div className="card settings-block">
        <h2>{s.settings.language}</h2>
        <p>{s.settings.languageHint}</p>
        <div className="setting-choice">
          {LANGS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={option.value === lang ? 'toggle on' : 'toggle'}
              aria-pressed={option.value === lang}
              onClick={() => void setLang(option.value)}
            >
              {option.label(s)}
            </button>
          ))}
        </div>
      </div>

      <div className="card settings-block">
        <h2>{s.settings.reading}</h2>
        <label className="setting-row">
          <span>
            {s.settings.hideTashkeel}
            <span className="muted setting-hint">{s.settings.hideTashkeelHint}</span>
          </span>
          <input
            type="checkbox"
            checked={hideTashkeel}
            onChange={(e) => setHideTashkeel(e.target.checked)}
          />
        </label>
      </div>

      <div className="card settings-block">
        <h2>{s.settings.fsrsTitle}</h2>
        <p>
          {personalized ? s.settings.fsrsPersonalized : s.settings.fsrsDefault}{' '}
          {s.settings.fsrsExplain}
        </p>

        {!coiReady && (
          <p className="muted">{s.settings.fsrsNeedsInstall}</p>
        )}
        {coiReady && !enoughReviews && (
          <p className="muted">
            {s.settings.fsrsNeedsReviews(MIN_REVIEWS_TO_OPTIMIZE, totalReviews ?? 0)}
          </p>
        )}

        <div className="settings-actions">
          <button
            className="primary"
            onClick={onOptimize}
            disabled={!coiReady || !enoughReviews || optState === 'running'}
          >
            {optState === 'running' ? s.settings.optimizing : s.settings.optimize}
          </button>
          <button className="secondary" onClick={onReset} disabled={!personalized}>
            {s.settings.resetDefaults}
          </button>
        </div>

        {optState === 'running' && (
          <p className="muted">
            {progress && progress.total > 0
              ? s.settings.training(progress.processed, progress.total)
              : s.settings.trainingUnknown}
          </p>
        )}

        {optError && <p className="muted">{s.settings.optimizeFailed(optError)}</p>}

        {result && (
          <div className="optimize-result">
            <div className="optimize-metrics">
              <div>
                <span className="muted">{s.settings.logLoss}</span> {fmt(result.current.logLoss)}{' '}
                → {fmt(result.proposedMetrics.logLoss)}
              </div>
              <div>
                <span className="muted">{s.settings.rmse}</span> {fmt(result.current.rmse)} →{' '}
                {fmt(result.proposedMetrics.rmse)}
              </div>
              <div className="muted">
                {s.settings.scoredOn(result.proposedMetrics.count, result.reviewCount)}
              </div>
            </div>
            <details className="params-compare">
              <summary>{s.settings.parameters}</summary>
              <p>
                <span className="muted">{s.settings.current}</span>
                <code>{weightsLine(storedWeights ?? defaultWeights())}</code>
              </p>
              <p>
                <span className="muted">{s.settings.proposed}</span>
                <code>{weightsLine(result.proposed)}</code>
              </p>
            </details>
            <div className="settings-actions">
              <button className="primary" onClick={onApply}>
                {s.settings.applyProposed}
              </button>
              <button
                className="secondary"
                onClick={() => {
                  setResult(null)
                  setOptState('idle')
                }}
              >
                {s.settings.discard}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card settings-block">
        <h2>{s.settings.backupTitle}</h2>
        <p>
          {s.settings.backupExplain}
          {lastExport != null
            ? s.settings.lastExport(
                new Date(lastExport).toLocaleDateString(s.common.locale),
              )
            : s.settings.neverExported}
        </p>
        <button className="primary" onClick={onExport}>
          {s.settings.exportBackup}
        </button>
      </div>

      <div className="card settings-block">
        <h2>{s.settings.restoreTitle}</h2>
        <p>{s.settings.restoreExplain}</p>
        <button className="secondary" onClick={() => fileInput.current?.click()}>
          {s.settings.importBackup}
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
        <h2>{s.settings.aboutTitle}</h2>
        <p>{s.settings.about(totalReviews ?? 0)}</p>
      </div>
    </main>
  )
}
