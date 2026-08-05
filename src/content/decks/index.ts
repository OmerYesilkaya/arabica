import type { ContentCard, DeckDef, Direction } from '../types'
import { cardIdOf } from '../types'
import { hurufAlKhafd } from './hurufAlKhafd'

export const decks: DeckDef[] = [hurufAlKhafd]

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
