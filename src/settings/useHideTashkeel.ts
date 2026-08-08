import { useLiveQuery } from 'dexie-react-hooks'
import { db, setMeta } from '../db/db'

/** Persistent render-time setting in the `meta` table. */
export const HIDE_TASHKEEL_KEY = 'hideTashkeel'

// TODO(deck-browse): a card-level deck browse view does not exist yet. When
// one is added, strip its card Arabic with stripTashkeel + this hook, the same
// as StudySessionPage. Reference pages must keep full tashkeel: hiding tashkeel
// is a render-time choice in Study only, never a change to the data.

/** Live hide-tashkeel setting. Defaults to false (full tashkeel shown). */
export function useHideTashkeel(): boolean {
  return useLiveQuery(
    async () =>
      ((await db.meta.get(HIDE_TASHKEEL_KEY))?.value as boolean | undefined) ??
      false,
    [],
    false,
  )
}

/** Persist the hide-tashkeel setting. */
export function setHideTashkeel(value: boolean): Promise<void> {
  return setMeta(HIDE_TASHKEEL_KEY, value)
}
