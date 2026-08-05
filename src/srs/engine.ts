import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card,
  type Grade,
} from 'ts-fsrs'
import type { ArabicaDB, CardStateRow } from '../db/db'
import type { ContentCard } from '../content/types'
import { noteIdOf, cardIdOf } from '../content/types'
import { decks, deckById, cardsOfDeck } from '../content/decks'

export { Rating, State }
export type { Grade }

// Anki-compatible FSRS defaults: retention 0.9, fuzz on,
// learning steps 1m/10m via ts-fsrs short-term scheduler.
export const scheduler = fsrs(
  generatorParameters({ request_retention: 0.9, enable_fuzz: true }),
)

export function rowToFsrsCard(row: CardStateRow): Card {
  return {
    due: new Date(row.due),
    stability: row.stability,
    difficulty: row.difficulty,
    elapsed_days: 0,
    scheduled_days: row.scheduled_days,
    learning_steps: row.learning_steps,
    reps: row.reps,
    lapses: row.lapses,
    state: row.state,
    last_review: row.last_review === undefined ? undefined : new Date(row.last_review),
  }
}

export function fsrsCardToRow(
  card: Card,
  cardId: string,
  deckId: string,
  buriedUntil?: number,
): CardStateRow {
  return {
    cardId,
    deckId,
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    scheduled_days: card.scheduled_days,
    learning_steps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.last_review?.getTime(),
    ...(buriedUntil !== undefined ? { buriedUntil } : {}),
  }
}

export function newFsrsCard(now: Date): Card {
  return createEmptyCard(now)
}

export function startOfToday(now: Date): number {
  const d = new Date(now)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export function startOfTomorrow(now: Date): number {
  return startOfToday(now) + 24 * 60 * 60 * 1000
}

/**
 * Answer one card: compute the FSRS outcome, persist the new state,
 * append to the review log, and bury pending siblings for the day.
 */
export async function answerCard(
  db: ArabicaDB,
  content: ContentCard,
  existing: CardStateRow | undefined,
  grade: Grade,
  now: Date,
): Promise<void> {
  const before: Card = existing ? rowToFsrsCard(existing) : newFsrsCard(now)
  const { card, log } = scheduler.next(before, now, grade)

  const deck = deckById(content.deckId)

  await db.transaction('rw', db.cardState, db.reviewLog, async () => {
    await db.cardState.put(fsrsCardToRow(card, content.cardId, content.deckId))
    await db.reviewLog.add({
      cardId: content.cardId,
      deckId: content.deckId,
      rating: log.rating,
      state: log.state,
      due: log.due.getTime(),
      stability: log.stability,
      difficulty: log.difficulty,
      scheduled_days: log.scheduled_days,
      learning_steps: log.learning_steps,
      review: log.review.getTime(),
    })

    if (deck?.burySiblings) {
      await burySiblings(db, content, now)
    }
  })
}

/**
 * Bury the answered card's siblings (same note, other directions) until
 * tomorrow, so both directions of one note never appear in one session.
 */
async function burySiblings(
  db: ArabicaDB,
  content: ContentCard,
  now: Date,
): Promise<void> {
  const deck = deckById(content.deckId)
  if (!deck) return
  const noteId = noteIdOf(content.cardId)
  const note = deck.notes.find((n) => n.id === noteId)
  if (!note) return

  const buriedUntil = startOfTomorrow(now)
  const directions = note.directions ?? deck.directions
  for (const direction of directions) {
    const siblingId = cardIdOf(noteId, direction)
    if (siblingId === content.cardId) continue
    const sibling = await db.cardState.get(siblingId)
    if (sibling) {
      await db.cardState.update(siblingId, { buriedUntil })
    } else {
      // Not yet introduced: store a New-state row that carries the bury flag.
      await db.cardState.put(
        fsrsCardToRow(newFsrsCard(now), siblingId, content.deckId, buriedUntil),
      )
    }
  }
}

/** Preview the four grade outcomes for the answer buttons. */
export function previewIntervals(
  existing: CardStateRow | undefined,
  now: Date,
): Record<Grade, Date> {
  const before: Card = existing ? rowToFsrsCard(existing) : newFsrsCard(now)
  const preview = scheduler.repeat(before, now)
  return {
    [Rating.Again]: preview[Rating.Again].card.due,
    [Rating.Hard]: preview[Rating.Hard].card.due,
    [Rating.Good]: preview[Rating.Good].card.due,
    [Rating.Easy]: preview[Rating.Easy].card.due,
  }
}

/** Anki-style compact interval label: 1m, 10m, 3h, 4d, 2mo, 1.5y */
export function intervalLabel(from: Date, to: Date): string {
  const minutes = Math.max(1, Math.round((to.getTime() - from.getTime()) / 60000))
  if (minutes < 60) return `${minutes}m`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d`
  const months = days / 30.44
  if (months < 12) return `${Math.round(months)}mo`
  const years = days / 365.25
  return `${years < 3 ? years.toFixed(1) : Math.round(years)}y`
}

/** Count of cards introduced today (first review had state New). */
export async function newIntroducedToday(
  db: ArabicaDB,
  deckId: string,
  now: Date,
): Promise<number> {
  const since = startOfToday(now)
  return db.reviewLog
    .where('review')
    .aboveOrEqual(since)
    .filter((r) => r.deckId === deckId && r.state === State.New)
    .count()
}

/** Delete all progress for cards that no longer exist in content. */
export async function pruneOrphanedState(db: ArabicaDB): Promise<void> {
  const known = new Set<string>()
  for (const deck of decks) {
    for (const c of cardsOfDeck(deck)) known.add(c.cardId)
  }
  const orphans = (await db.cardState.toArray())
    .filter((r) => !known.has(r.cardId))
    .map((r) => r.cardId)
  if (orphans.length > 0) await db.cardState.bulkDelete(orphans)
}
