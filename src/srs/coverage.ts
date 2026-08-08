import { State } from 'ts-fsrs'
import type { ArabicaDB } from '../db/db'
import type { Note } from '../content/types'
import { noteIdOf } from '../content/types'
import { cardsOfDeck, decks } from '../content/decks'
import {
  OCCURRENCES_OUTSIDE_TRACK,
  TOTAL_WORD_OCCURRENCES,
} from '../content/quranCoverage'

/** Reviews within this window count towards "gained recently". */
const RECENT_MS = 30 * 24 * 60 * 60 * 1000

export interface Coverage {
  /** Occurrences in the Qurʾan covered by the words known. */
  known: number
  /** Every occurrence of a standalone word, the denominator. */
  total: number
  /** Share of occurrences covered, 0-100. */
  percent: number
  /** Distinct words known. */
  words: number
  /** Percentage points gained in the last 30 days. */
  gained: number
}

/** How many Qurʾanic occurrences knowing this note buys. */
export function occurrencesOf(note: Note): number {
  return note.vocab?.occurrences ?? OCCURRENCES_OUTSIDE_TRACK[note.id] ?? 0
}

function notesById(): Map<string, Note> {
  const notes = new Map<string, Note>()
  for (const deck of decks) {
    for (const card of cardsOfDeck(deck)) notes.set(card.note.id, card.note)
  }
  return notes
}

/**
 * How much of the Qurʾan the learner can read, by word occurrence.
 *
 * Percentage of *occurrences* rather than of words is the whole point: the 50
 * commonest words are a far larger share of the text than 50 words taken at
 * random, and a metric that could not show that would not be worth having.
 *
 * A word counts once it has graduated to the review state, and counts once
 * however many cards it has - the two directions of a harf are one word known,
 * not two.
 */
export async function computeCoverage(
  db: ArabicaDB,
  now: Date = new Date(),
): Promise<Coverage> {
  const notes = notesById()
  const graduated = await db.cardState.where('state').equals(State.Review).toArray()

  const knownNotes = new Set<string>()
  for (const row of graduated) knownNotes.add(noteIdOf(row.cardId))

  let known = 0
  let words = 0
  for (const noteId of knownNotes) {
    const note = notes.get(noteId)
    if (!note) continue // content removed since the card was scheduled
    const occurrences = occurrencesOf(note)
    if (occurrences === 0) continue
    known += occurrences
    words++
  }

  /*
   * Recently gained: a review inside the window whose *prior* state was not
   * Review is the review that graduated the card, since the log records the
   * state a card was in before it was answered. Cards that have since lapsed
   * are excluded by intersecting with what is graduated now, so the figure
   * tracks what is known today rather than what was once learned.
   */
  const cutoff = now.getTime() - RECENT_MS
  const recentLogs = await db.reviewLog.where('review').aboveOrEqual(cutoff).toArray()
  const recentlyGraduated = new Set<string>()
  for (const log of recentLogs) {
    if (log.state === State.Review) continue
    const noteId = noteIdOf(log.cardId)
    if (knownNotes.has(noteId)) recentlyGraduated.add(noteId)
  }

  let gainedOccurrences = 0
  for (const noteId of recentlyGraduated) {
    const note = notes.get(noteId)
    if (note) gainedOccurrences += occurrencesOf(note)
  }

  const total = TOTAL_WORD_OCCURRENCES
  return {
    known,
    total,
    percent: total ? (100 * known) / total : 0,
    words,
    gained: total ? (100 * gainedOccurrences) / total : 0,
  }
}
