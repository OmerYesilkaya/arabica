import { useLiveQuery } from 'dexie-react-hooks'
import { db, setMeta } from '../db/db'
import type { Meaning } from '../content/types'

/**
 * Which half of a Meaning Reference renders. A Meaning is still both languages
 * together (see CONTEXT.md) — this changes nothing in the data, only which one
 * is on screen, the way hiding tashkeel is a render-time choice in Study.
 *
 * The values are the Meaning field names, so a caller reads the meaning as
 * `meaning[lang]` with no mapping table in between.
 */
export type MeaningLang = keyof Meaning

export const MEANING_LANG_KEY = 'meaningLang'

/** Live Meaning language. Defaults to English. */
export function useMeaningLang(): MeaningLang {
  return useLiveQuery(
    async () =>
      ((await db.meta.get(MEANING_LANG_KEY))?.value as MeaningLang | undefined) ??
      'english',
    [],
    'english',
  )
}

/** Persist the Meaning language. */
export function setMeaningLang(value: MeaningLang): Promise<void> {
  return setMeta(MEANING_LANG_KEY, value)
}
