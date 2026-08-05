import { State } from 'ts-fsrs'
import type { ArabicaDB, CardStateRow } from '../db/db'
import type { ContentCard, DeckDef } from '../content/types'
import { cardsOfDeck } from '../content/decks'
import { newIntroducedToday } from './engine'

export interface QueueItem {
  content: ContentCard
  state?: CardStateRow
}

export interface DeckCounts {
  newCount: number
  learningCount: number
  dueCount: number
}

/**
 * Build today's review queue for one deck, Anki-ordered:
 * (re)learning cards due now, then due review cards, then new cards
 * up to the remaining daily new limit, in content order.
 */
export async function buildQueue(
  db: ArabicaDB,
  deck: DeckDef,
  now: Date,
): Promise<QueueItem[]> {
  const nowMs = now.getTime()
  const content = cardsOfDeck(deck)
  const rows = new Map(
    (await db.cardState.where('deckId').equals(deck.id).toArray()).map((r) => [
      r.cardId,
      r,
    ]),
  )

  const visible = (r: CardStateRow) => !r.buriedUntil || r.buriedUntil <= nowMs

  const learning: QueueItem[] = []
  const review: QueueItem[] = []
  const fresh: QueueItem[] = []

  for (const c of content) {
    const row = rows.get(c.cardId)
    if (!row || row.state === State.New) {
      if (!row || visible(row)) fresh.push({ content: c, state: row })
      continue
    }
    if (!visible(row)) continue
    if (row.due > nowMs) continue
    if (row.state === State.Learning || row.state === State.Relearning) {
      learning.push({ content: c, state: row })
    } else {
      review.push({ content: c, state: row })
    }
  }

  learning.sort((a, b) => a.state!.due - b.state!.due)
  review.sort((a, b) => a.state!.due - b.state!.due)

  const introduced = await newIntroducedToday(db, deck.id, now)
  const newAllowance = Math.max(0, deck.newPerDay - introduced)
  const news = fresh.slice(0, newAllowance)

  return [...learning, ...review, ...news]
}

export async function deckCounts(
  db: ArabicaDB,
  deck: DeckDef,
  now: Date,
): Promise<DeckCounts> {
  const queue = await buildQueue(db, deck, now)
  let newCount = 0
  let learningCount = 0
  let dueCount = 0
  for (const item of queue) {
    const state = item.state?.state ?? State.New
    if (state === State.New) newCount++
    else if (state === State.Learning || state === State.Relearning) learningCount++
    else dueCount++
  }
  return { newCount, learningCount, dueCount }
}
