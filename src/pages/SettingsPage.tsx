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

export function SettingsPage() {
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)

  const lastExport = useLiveQuery(async () => {
    const row = await db.meta.get(LAST_EXPORT_KEY)
    return (row?.value as number | undefined) ?? null
  })

  const totalReviews = useLiveQuery(() => db.reviewLog.count())

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
      setMessage('Backup imported.')
    } catch (err) {
      setMessage(`Import failed: ${err instanceof Error ? err.message : String(err)}`)
    }
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
