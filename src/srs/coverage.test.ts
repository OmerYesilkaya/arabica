import { beforeEach, describe, expect, it } from 'vitest'
import { State } from 'ts-fsrs'
import { ArabicaDB } from '../db/db'
import { cardIdOf } from '../content/types'
import { quranVocab1 } from '../content/decks/quranVocab1'
import { hurufAlKhafd } from '../content/decks/hurufAlKhafd'
import { decks as allDecks } from '../content/decks'
import { TOTAL_WORD_OCCURRENCES } from '../content/quranCoverage'
import { computeCoverage, occurrencesOf } from './coverage'

let db: ArabicaDB
let counter = 0

const NOW = new Date('2026-06-15T12:00:00Z')
const DAY = 24 * 60 * 60 * 1000

beforeEach(() => {
  db = new ArabicaDB(`coverage-test-${++counter}`)
})

async function graduate(cardId: string, deckId: string) {
  await db.cardState.put({
    cardId,
    deckId,
    state: State.Review,
    due: 0,
    stability: 1,
    difficulty: 5,
    scheduled_days: 0,
    learning_steps: 0,
    reps: 1,
    lapses: 0,
  })
}

async function logReview(cardId: string, deckId: string, state: State, at: number) {
  await db.reviewLog.add({
    cardId,
    deckId,
    rating: 3,
    state,
    due: 0,
    stability: 1,
    difficulty: 5,
    scheduled_days: 0,
    learning_steps: 0,
    review: at,
  })
}

describe('computeCoverage', () => {
  it('reads zero on a device that has studied nothing', async () => {
    const coverage = await computeCoverage(db, NOW)
    expect(coverage.known).toBe(0)
    expect(coverage.words).toBe(0)
    expect(coverage.percent).toBe(0)
    expect(coverage.gained).toBe(0)
    expect(Number.isNaN(coverage.percent)).toBe(false)
    expect(coverage.total).toBe(TOTAL_WORD_OCCURRENCES)
  })

  it('counts a graduated word by its occurrences, not as one word', async () => {
    const note = quranVocab1.notes[0] // the commonest word in the track
    await graduate(cardIdOf(note.id, 'ar-to-meaning'), quranVocab1.id)

    const coverage = await computeCoverage(db, NOW)
    expect(coverage.words).toBe(1)
    expect(coverage.known).toBe(note.vocab!.occurrences)
    expect(coverage.percent).toBeCloseTo(
      (100 * note.vocab!.occurrences) / TOTAL_WORD_OCCURRENCES,
      6,
    )
  })

  it('ignores cards that have not graduated', async () => {
    const note = quranVocab1.notes[0]
    await db.cardState.put({
      cardId: cardIdOf(note.id, 'ar-to-meaning'),
      deckId: quranVocab1.id,
      state: State.Learning,
      due: 0,
      stability: 1,
      difficulty: 5,
      scheduled_days: 0,
      learning_steps: 0,
      reps: 1,
      lapses: 0,
    })
    expect((await computeCoverage(db, NOW)).words).toBe(0)
  })

  it('counts a word once however many directions it has', async () => {
    // Huruf notes are scheduled in both directions; knowing one word twice is
    // still one word.
    const note = hurufAlKhafd.notes.find((n) => n.id === 'min')!
    await graduate(cardIdOf(note.id, 'ar-to-meaning'), hurufAlKhafd.id)
    await graduate(cardIdOf(note.id, 'meaning-to-ar'), hurufAlKhafd.id)

    const coverage = await computeCoverage(db, NOW)
    expect(coverage.words).toBe(1)
    expect(coverage.known).toBe(occurrencesOf(note))
  })

  it('counts words taught outside the vocabulary track', async () => {
    const note = hurufAlKhafd.notes.find((n) => n.id === 'min')!
    expect(note.vocab).toBeUndefined()
    expect(occurrencesOf(note)).toBeGreaterThan(3000)
  })

  it('contributes nothing for a word with no occurrence count', async () => {
    const prefix = hurufAlKhafd.notes.find((n) => n.id === 'ba')!
    await graduate(cardIdOf(prefix.id, 'ar-to-meaning'), hurufAlKhafd.id)
    const coverage = await computeCoverage(db, NOW)
    expect(coverage.words).toBe(0)
    expect(coverage.known).toBe(0)
  })

  it('credits a graduation inside the window to recent gain', async () => {
    const note = quranVocab1.notes[0]
    const cardId = cardIdOf(note.id, 'ar-to-meaning')
    await graduate(cardId, quranVocab1.id)
    await logReview(cardId, quranVocab1.id, State.Learning, NOW.getTime() - 3 * DAY)

    const coverage = await computeCoverage(db, NOW)
    expect(coverage.gained).toBeCloseTo(coverage.percent, 6)
  })

  it('does not credit a graduation older than the window', async () => {
    const note = quranVocab1.notes[0]
    const cardId = cardIdOf(note.id, 'ar-to-meaning')
    await graduate(cardId, quranVocab1.id)
    await logReview(cardId, quranVocab1.id, State.Learning, NOW.getTime() - 60 * DAY)

    const coverage = await computeCoverage(db, NOW)
    expect(coverage.percent).toBeGreaterThan(0)
    expect(coverage.gained).toBe(0)
  })

  it('does not treat an ordinary review of a known card as a new gain', async () => {
    const note = quranVocab1.notes[0]
    const cardId = cardIdOf(note.id, 'ar-to-meaning')
    await graduate(cardId, quranVocab1.id)
    // Prior state Review: the card was already known before this review.
    await logReview(cardId, quranVocab1.id, State.Review, NOW.getTime() - 2 * DAY)

    expect((await computeCoverage(db, NOW)).gained).toBe(0)
  })

  it('reaches the syllabus ceiling, and never passes 100%, when all is known', async () => {
    for (const deck of allDecks) {
      for (const note of deck.notes) {
        await graduate(cardIdOf(note.id, 'ar-to-meaning'), deck.id)
      }
    }
    const coverage = await computeCoverage(db, NOW)
    // The 600-word track plus the huruf is what the app can currently teach.
    expect(coverage.percent).toBeGreaterThan(80)
    expect(coverage.percent).toBeLessThanOrEqual(100)
    expect(coverage.words).toBe(606)
  })

  it('shows what level 1 and the huruf alone are worth', async () => {
    for (const deck of [quranVocab1, hurufAlKhafd]) {
      for (const note of deck.notes) {
        await graduate(cardIdOf(note.id, 'ar-to-meaning'), deck.id)
      }
    }
    // Frequency ordering earns its keep here: 56 words, nearly half the Quran.
    const coverage = await computeCoverage(db, NOW)
    expect(coverage.percent).toBeGreaterThan(45)
  })
})
