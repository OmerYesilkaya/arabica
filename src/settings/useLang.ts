import { useLiveQuery } from 'dexie-react-hooks'
import { db, setMeta } from '../db/db'
import type { Meaning } from '../content/types'

/**
 * The app's Language: its own chrome, and which half of every Meaning is on
 * screen. See CONTEXT.md.
 *
 * The values are the Meaning field names, so a caller reads a meaning as
 * `meaning[lang]` with no mapping table in between. That is also why this is
 * one setting rather than two: a learner reading a Turkish interface wants the
 * Turkish gloss, and a second switch for that would be a second thing to keep
 * in agreement with the first.
 *
 * A Meaning is still both languages together — this changes nothing in the
 * data, only what is drawn, the way hiding tashkeel does.
 */
export type Lang = keyof Meaning

export const LANG_KEY = 'lang'

/**
 * The key this setting used when it only governed Reference. Read as a
 * fallback so an existing choice survives the rename; never written, so the
 * old key dies out on its own once the learner touches the switch.
 */
const LEGACY_KEY = 'meaningLang'

async function readLang(): Promise<Lang> {
  const current = (await db.meta.get(LANG_KEY))?.value as Lang | undefined
  if (current) return current
  const legacy = (await db.meta.get(LEGACY_KEY))?.value as Lang | undefined
  return legacy ?? 'english'
}

/** Live app Language. Defaults to English. */
export function useLang(): Lang {
  return useLiveQuery(readLang, [], 'english')
}

/** Persist the app Language. */
export function setLang(value: Lang): Promise<void> {
  return setMeta(LANG_KEY, value)
}

/** The other one, for a control that swaps between the two. */
export function otherLang(lang: Lang): Lang {
  return lang === 'english' ? 'turkish' : 'english'
}
