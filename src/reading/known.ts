import { useLiveQuery } from 'dexie-react-hooks'
import type { CorpusLemmas } from '../content/corpus/types'
import { db } from '../db/db'
import { knownNoteIds } from '../srs/known'

/**
 * The Lemmas of a Text the learner already knows, for the reader to mark.
 *
 * Marking hangs on the Lemma, not the Token: knowing a word means knowing it
 * in any inflection, so every occurrence of a known Lemma is marked whatever
 * case or person it is in here.
 *
 * "Known" is not decided here — it comes from src/srs/known.ts, the same
 * function the coverage metric on Stats reads. Reading only *reads* Progress:
 * looking at Card State to decide how to render a word records nothing about
 * what was read.
 */
export function knownLemmas(lemmas: CorpusLemmas, knownNotes: Set<string>): Set<string> {
  const known = new Set<string>()
  for (const [lemma, entry] of Object.entries(lemmas)) {
    if (entry.noteId && knownNotes.has(entry.noteId)) known.add(lemma)
  }
  return known
}

/** Live known-note set. Empty on a device that has studied nothing. */
export function useKnownNoteIds(): Set<string> {
  return useLiveQuery(() => knownNoteIds(db), [], new Set<string>())
}
