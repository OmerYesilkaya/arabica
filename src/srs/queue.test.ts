import { beforeEach, describe, expect, it } from 'vitest'
import { Rating, State } from 'ts-fsrs'
import { ArabicaDB } from '../db/db'
import { testDeck } from './testDeck'
import { quranVocab1 } from '../content/decks/quranVocab1'
import { cardsOfDeck } from '../content/decks'
import { answerCard } from './engine'
import { buildQueue, deckCounts } from './queue'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`test-${++counter}`)
})

// A shipped deck, because answerCard resolves the deck from the content
// registry by id and a fixture is not in it. Level 1 is the deck whose shape
// these tests want anyway: 50 cards against a limit of 10, so the daily
// allowance is exercised rather than merely satisfied.
//
// Burying is not tested here - it needs sibling cards, and every shipped deck
// now asks one direction only. senseBury.test.ts covers it against the sense
// deck, whose siblings are the senses of one harf.
const deck = quranVocab1
const allCards = cardsOfDeck(deck)

describe('buildQueue', () => {
  it('starts with only new cards, capped by the daily limit', async () => {
    const queue = await buildQueue(db, deck, new Date())
    expect(queue.length).toBe(Math.min(deck.newPerDay, allCards.length))
    expect(queue.every((i) => i.state === undefined)).toBe(true)
  })

  it('keeps content order for new cards', async () => {
    const queue = await buildQueue(db, deck, new Date())
    const ordinals = queue.map((i) => i.content.ordinal)
    expect(ordinals).toEqual([...ordinals].sort((a, b) => a - b))
  })

  it('a note may narrow the deck directions to one', () => {
    // On the fixture: no shipped deck asks two directions today, so this rule
    // would otherwise go untested until one does.
    const cards = cardsOfDeck(testDeck)
    expect(cards.filter((c) => c.note.id === 'test-note-1').length).toBe(2)
    expect(
      cards.filter((c) => c.note.id === 'test-note-12').map((c) => c.direction),
    ).toEqual(['ar-to-meaning'])
  })

  it('counts new cards introduced today against the limit', async () => {
    const now = new Date()
    const queue = await buildQueue(db, deck, now)
    await answerCard(db, queue[0].content, queue[0].state, Rating.Good, now)

    const later = await buildQueue(db, deck, now)
    const newItems = later.filter(
      (i) => !i.state || i.state.state === State.New,
    )
    // One new card was introduced, so the allowance shrinks by one; the
    // answered card is now in learning and no longer counts as new.
    expect(newItems.length).toBe(deck.newPerDay - 1)
  })

  it('puts learning cards before new cards', async () => {
    const now = new Date()
    const queue = await buildQueue(db, deck, now)
    await answerCard(db, queue[0].content, queue[0].state, Rating.Again, now)

    const oneMinuteLater = new Date(now.getTime() + 2 * 60 * 1000)
    const later = await buildQueue(db, deck, oneMinuteLater)
    expect(later[0].content.cardId).toBe(queue[0].content.cardId)
    expect(later[0].state?.state).toBe(State.Learning)
  })

  it('graduated cards leave the queue until due', async () => {
    const now = new Date()
    const queue = await buildQueue(db, deck, now)
    await answerCard(db, queue[0].content, queue[0].state, Rating.Easy, now)

    const later = await buildQueue(db, deck, new Date(now.getTime() + 60 * 1000))
    expect(later.find((i) => i.content.cardId === queue[0].content.cardId)).toBeUndefined()

    const counts = await deckCounts(db, deck, new Date(now.getTime() + 60 * 1000))
    expect(counts.dueCount).toBe(0)
  })
})
