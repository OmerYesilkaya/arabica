import type { ContentCard, DeckDef, Direction, Note } from '../types'
import { cardIdOf } from '../types'
import { hurufAlKhafd } from './hurufAlKhafd'
import { hurufAlKhafdSenses } from './hurufAlKhafdSenses'
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

export const decks: DeckDef[] = [
  hurufAlKhafd,
  hurufAlKhafdSenses,
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

export function deckById(deckId: string): DeckDef | undefined {
  return decks.find((d) => d.id === deckId)
}

/**
 * The Note with this id, whichever deck holds it. Note ids are unique across
 * decks by construction — card ids are `noteId|direction` and the card-state
 * table is keyed on that with no deck in the key.
 */
export function noteById(noteId: string): Note | undefined {
  for (const deck of decks) {
    const note = deck.notes.find((n) => n.id === noteId)
    if (note) return note
  }
  return undefined
}

/** All scheduled cards of a deck, in content order (the new-card order). */
export function cardsOfDeck(deck: DeckDef): ContentCard[] {
  const cards: ContentCard[] = []
  let ordinal = 0
  for (const note of deck.notes) {
    const directions: Direction[] = note.directions ?? deck.directions
    for (const direction of directions) {
      cards.push({
        cardId: cardIdOf(note.id, direction),
        deckId: deck.id,
        note,
        direction,
        ordinal: ordinal++,
      })
    }
  }
  return cards
}

export function cardsById(deck: DeckDef): Map<string, ContentCard> {
  return new Map(cardsOfDeck(deck).map((c) => [c.cardId, c]))
}

/**
 * Sibling grouping key: cards whose notes share this key bury each other.
 * Defaults to the note id, so a note's own directions are always siblings.
 * Per-sense cards override it with the harf id, grouping all its senses.
 */
export function siblingGroupOf(note: Note): string {
  return note.siblingGroup ?? note.id
}

/** The cards that should be buried when `cardId` is answered (excluding itself). */
export function siblingCardsOf(deck: DeckDef, cardId: string): ContentCard[] {
  const all = cardsOfDeck(deck)
  const self = all.find((c) => c.cardId === cardId)
  if (!self) return []
  const group = siblingGroupOf(self.note)
  return all.filter(
    (c) => c.cardId !== cardId && siblingGroupOf(c.note) === group,
  )
}
