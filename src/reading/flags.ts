import type { ArabicaDB, CorpusFlagRow } from '../db/db'

/**
 * Reference for one Token of one Text: `surah:ayah:word`, all 1-indexed, with
 * ayah 0 for the basmala that heads a surah. The same shape as a Source
 * citation, extended by the word, so a flag can be read by eye in an export.
 */
export function tokenRef(surah: number, ayah: number, word: number): string {
  return `${surah}:${ayah}:${word}`
}

/** Mark a Token's corpus data as wrong, or clear the mark. Returns the new state. */
export async function toggleFlag(
  db: ArabicaDB,
  ref: string,
  lemma: string,
  now: Date = new Date(),
): Promise<boolean> {
  const existing = await db.corpusFlags.get(ref)
  if (existing) {
    await db.corpusFlags.delete(ref)
    return false
  }
  await db.corpusFlags.put({ ref, lemma, flaggedAt: now.getTime() })
  return true
}

export async function flaggedRefs(db: ArabicaDB): Promise<Set<string>> {
  const rows = await db.corpusFlags.toArray()
  return new Set(rows.map((row) => row.ref))
}

export function flagsOfSurah(rows: CorpusFlagRow[], surah: number): CorpusFlagRow[] {
  return rows.filter((row) => row.ref.startsWith(`${surah}:`))
}
