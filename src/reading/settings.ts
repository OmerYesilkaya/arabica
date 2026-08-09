import { useLiveQuery } from 'dexie-react-hooks'
import { db, setMeta } from '../db/db'

/*
 * The reader's two settings, in `meta` where settings already live.
 *
 * They are the only things a reading session writes. Reading records nothing
 * about what was read — no position, no resume, no tap counts (see
 * docs/adr/0002) — and a toggle the learner flips is a deliberate act rather
 * than an observation of one.
 */

/**
 * Deliberately not the Study setting of the same name. Reading unvowelled text
 * and supplying the iʿrāb yourself before tapping to check is the exercise
 * this feature exists for, and it is the opposite of what a learner wants on a
 * vocabulary card, where the tashkeel is half of what is being learned.
 */
export const READING_HIDE_TASHKEEL_KEY = 'readingHideTashkeel'

/**
 * Marking words already known. On by default and deliberately quiet: the point
 * of the reader is to meet the grammar unprepared, so the marking has to be
 * subtle enough to ignore rather than turn a reading session into a dashboard.
 */
export const READING_MARK_KNOWN_KEY = 'readingMarkKnown'

function useSetting(key: string, fallback: boolean): boolean {
  return useLiveQuery(
    async () => ((await db.meta.get(key))?.value as boolean | undefined) ?? fallback,
    [key],
    fallback,
  )
}

export function useReadingHideTashkeel(): boolean {
  return useSetting(READING_HIDE_TASHKEEL_KEY, false)
}

export function setReadingHideTashkeel(value: boolean): Promise<void> {
  return setMeta(READING_HIDE_TASHKEEL_KEY, value)
}

export function useMarkKnown(): boolean {
  return useSetting(READING_MARK_KNOWN_KEY, true)
}

export function setMarkKnown(value: boolean): Promise<void> {
  return setMeta(READING_MARK_KNOWN_KEY, value)
}
