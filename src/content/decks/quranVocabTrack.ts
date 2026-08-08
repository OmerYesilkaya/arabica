import type { DeckDef } from '../types'
import { quranVocab1 } from './quranVocab1'
import { quranVocab2 } from './quranVocab2'

/**
 * The Quran vocabulary levels, in the order they are studied. Frequency order
 * is the whole point of the track, so this array is the syllabus: level N+1 is
 * only worth opening once level N is mostly known.
 *
 * The track is one thing being progressed through rather than a set of peer
 * decks, so the decks page collapses it into a single row.
 */
export const quranVocabTrack: DeckDef[] = [quranVocab1, quranVocab2]

/**
 * Share of a level's cards that must have graduated to the review state before
 * the next level opens. Gating on mastery rather than on introduction stops a
 * half-learned level from piling up behind a fresh one.
 */
export const GRADUATION_THRESHOLD = 0.8

export function isVocabTrackDeck(deckId: string): boolean {
  return quranVocabTrack.some((deck) => deck.id === deckId)
}
