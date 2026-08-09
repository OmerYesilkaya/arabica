import type { ArabicaDB, CardStateRow, CorpusFlagRow, MetaRow, ReviewLogRow } from './db'
import { setMeta } from './db'

// schemaVersion history:
//   1 - cardState, reviewLog, meta.
//   2 - unchanged tables; meta now may carry personalized FSRS weights
//       (key `fsrsParams`). Version-1 files import unchanged.
//   3 - adds corpusFlags, the reading corpus errors the learner has reported.
//       Older files import unchanged and arrive with no flags.
export const CURRENT_SCHEMA_VERSION = 3

const KNOWN_VERSIONS = [1, 2, 3] as const
export type SchemaVersion = (typeof KNOWN_VERSIONS)[number]

export interface BackupFile {
  app: 'arabica'
  schemaVersion: SchemaVersion
  exportedAt: string
  cardState: CardStateRow[]
  reviewLog: ReviewLogRow[]
  meta: MetaRow[]
  /** Absent in files written before version 3. */
  corpusFlags?: CorpusFlagRow[]
}

export const LAST_EXPORT_KEY = 'lastExportAt'

export async function buildBackup(db: ArabicaDB, now: Date): Promise<BackupFile> {
  return {
    app: 'arabica',
    schemaVersion: CURRENT_SCHEMA_VERSION,
    exportedAt: now.toISOString(),
    // meta carries the personalized FSRS weights, so they round-trip here.
    cardState: await db.cardState.toArray(),
    reviewLog: await db.reviewLog.toArray(),
    meta: await db.meta.toArray(),
    // Reported corpus errors ride in the same file: they are local, and a
    // learner who restores a backup should not have to find them all again.
    corpusFlags: await db.corpusFlags.toArray(),
  }
}

export async function exportBackup(db: ArabicaDB, now: Date): Promise<void> {
  const backup = await buildBackup(db, now)
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `arabica-backup-${now.toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  await setMeta(LAST_EXPORT_KEY, now.getTime())
}

export function parseBackup(text: string): BackupFile {
  const data = JSON.parse(text) as Partial<BackupFile>
  if (
    data.app !== 'arabica' ||
    !KNOWN_VERSIONS.includes(data.schemaVersion as SchemaVersion)
  ) {
    throw new Error('Not a valid arabica backup file')
  }
  if (
    !Array.isArray(data.cardState) ||
    !Array.isArray(data.reviewLog) ||
    !Array.isArray(data.meta)
  ) {
    throw new Error('Backup file is missing tables')
  }
  return data as BackupFile
}

/** Replaces ALL current progress with the backup's contents. */
export async function importBackup(db: ArabicaDB, backup: BackupFile): Promise<void> {
  await db.transaction(
    'rw',
    db.cardState,
    db.reviewLog,
    db.meta,
    db.corpusFlags,
    async () => {
      await db.cardState.clear()
      await db.reviewLog.clear()
      await db.meta.clear()
      await db.corpusFlags.clear()
      await db.cardState.bulkPut(backup.cardState)
      // Strip ids so the autoincrement counter stays consistent.
      await db.reviewLog.bulkAdd(backup.reviewLog.map(({ id: _id, ...r }) => r))
      await db.meta.bulkPut(backup.meta)
      // Older files carry no flags, and clearing above is what makes an import
      // of one leave none behind rather than keeping this device's.
      await db.corpusFlags.bulkPut(backup.corpusFlags ?? [])
    },
  )
}
