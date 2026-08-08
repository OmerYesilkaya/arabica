import type { ContentCard, DeckDef, Direction, Note } from '../types'
import { cardIdOf } from '../types'
import { hurufAlKhafd } from './hurufAlKhafd'
import { hurufAlKhafdSenses } from './hurufAlKhafdSenses'
import { quranVocab1 } from './quranVocab1'
import { quranVocab2 } from './quranVocab2'

export const decks: DeckDef[] = [
  hurufAlKhafd,
  hurufAlKhafdSenses,
  quranVocab1,
  quranVocab2,
]

export function deckById(deckId: string): DeckDef | undefined {
  return decks.find((d) => d.id === deckId)
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
