import type { ArabicaDB } from '../db/db'
import type { Direction, Meaning } from '../content/types'
import { decks, cardsOfDeck } from '../content/decks'

/** Anki default: a card is a leech once it has lapsed this many times. */
export const LEECH_THRESHOLD = 8

export interface Leech extends Meaning {
  cardId: string
  deckId: string
  direction: Direction
  arabic: string
  lapses: number
  referenceId?: string
}

let contentIndex: Map<string, ReturnType<typeof cardsOfDeck>[number]> | undefined

function cardContent(cardId: string) {
  if (!contentIndex) {
    contentIndex = new Map()
    for (const deck of decks) {
      for (const c of cardsOfDeck(deck)) contentIndex.set(c.cardId, c)
    }
  }
  return contentIndex.get(cardId)
}

/**
 * Cards that have lapsed at least LEECH_THRESHOLD times, worst first.
 * Read-only: no scheduling change, no auto-suspend. Orphaned progress
 * rows (content removed) are skipped.
 */
export async function computeLeeches(db: ArabicaDB): Promise<Leech[]> {
  // `lapses` is not an index, so filter the table rather than query a range.
  const rows = await db.cardState
    .filter((r) => r.lapses >= LEECH_THRESHOLD)
    .toArray()

  const leeches: Leech[] = []
  for (const row of rows) {
    const content = cardContent(row.cardId)
    if (!content) continue
    const { note } = content
    leeches.push({
      cardId: row.cardId,
      deckId: row.deckId,
      direction: content.direction,
      arabic: note.arabic,
      english: note.english,
      turkish: note.turkish,
      lapses: row.lapses,
      referenceId: note.referenceId,
    })
  }
  leeches.sort((a, b) => b.lapses - a.lapses)
  return leeches
}
