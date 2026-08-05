import type { ArabicaDB, CardStateRow, MetaRow, ReviewLogRow } from './db'
import { setMeta } from './db'

export interface BackupFile {
  app: 'arabica'
  schemaVersion: 1
  exportedAt: string
  cardState: CardStateRow[]
  reviewLog: ReviewLogRow[]
  meta: MetaRow[]
}

export const LAST_EXPORT_KEY = 'lastExportAt'

export async function buildBackup(db: ArabicaDB, now: Date): Promise<BackupFile> {
  return {
    app: 'arabica',
    schemaVersion: 1,
    exportedAt: now.toISOString(),
    cardState: await db.cardState.toArray(),
    reviewLog: await db.reviewLog.toArray(),
    meta: await db.meta.toArray(),
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
  if (data.app !== 'arabica' || data.schemaVersion !== 1) {
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
  await db.transaction('rw', db.cardState, db.reviewLog, db.meta, async () => {
    await db.cardState.clear()
    await db.reviewLog.clear()
    await db.meta.clear()
    await db.cardState.bulkPut(backup.cardState)
    // Strip ids so the autoincrement counter stays consistent.
    await db.reviewLog.bulkAdd(backup.reviewLog.map(({ id: _id, ...r }) => r))
    await db.meta.bulkPut(backup.meta)
  })
}
