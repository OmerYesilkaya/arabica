import type { DeckDef } from '../types'
import { quranVocab1 } from './quranVocab1'
import { quranVocab2 } from './quranVocab2'
import { quranVocab3 } from './quranVocab3'
import { quranVocab4 } from './quranVocab4'
import { quranVocab5 } from './quranVocab5'
import { quranVocab6 } from './quranVocab6'
import { quranVocab7 } from './quranVocab7'
import { quranVocab8 } from './quranVocab8'
import { quranVocab9 } from './quranVocab9'
import { quranVocab10 } from './quranVocab10'
import { quranVocab11 } from './quranVocab11'
import { quranVocab12 } from './quranVocab12'

/**
 * The Quran vocabulary levels, in the order they are studied. Frequency order
 * is the whole point of the track, so this array is the syllabus: level N+1 is
 * only worth opening once level N is mostly known.
 *
 * The track is one thing being progressed through rather than a set of peer
 * decks, so the decks page collapses it into a single row.
 */
export const quranVocabTrack: DeckDef[] = [
  quranVocab1,
  quranVocab2,
  quranVocab3,
  quranVocab4,
  quranVocab5,
  quranVocab6,
  quranVocab7,
  quranVocab8,
  quranVocab9,
  quranVocab10,
  quranVocab11,
  quranVocab12,
]

/**
 * Share of a level's cards that must have graduated to the review state before
 * the next level opens. Gating on mastery rather than on introduction stops a
 * half-learned level from piling up behind a fresh one.
 */
export const GRADUATION_THRESHOLD = 0.8

export function isVocabTrackDeck(deckId: string): boolean {
  return quranVocabTrack.some((deck) => deck.id === deckId)
}
