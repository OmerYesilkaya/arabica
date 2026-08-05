import { beforeEach, describe, expect, it } from 'vitest'
import { Rating, State } from 'ts-fsrs'
import { ArabicaDB } from '../db/db'
import { hurufAlKhafd } from '../content/decks/hurufAlKhafd'
import { cardsOfDeck } from '../content/decks'
import { answerCard } from './engine'
import { buildQueue, deckCounts } from './queue'
import { noteIdOf } from '../content/types'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`test-${++counter}`)
})

const deck = hurufAlKhafd
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

  it('oath particles schedule only the ar-to-meaning direction', () => {
    const oath = allCards.filter((c) => c.note.id === 'waw-qasam')
    expect(oath.map((c) => c.direction)).toEqual(['ar-to-meaning'])
  })

  it('counts new cards introduced today against the limit', async () => {
    const now = new Date()
    const queue = await buildQueue(db, deck, now)
    await answerCard(db, queue[0].content, queue[0].state, Rating.Good, now)

    const later = await buildQueue(db, deck, now)
    const newItems = later.filter(
      (i) => !i.state || i.state.state === State.New,
    )
    // One new card was introduced, so allowance shrinks by one; the answered
    // card is now in learning and its sibling is buried.
    expect(newItems.length).toBe(deck.newPerDay - 1)
  })

  it('buries siblings until the next day', async () => {
    const now = new Date()
    const queue = await buildQueue(db, deck, now)
    const first = queue[0]
    await answerCard(db, first.content, first.state, Rating.Good, now)

    const noteId = noteIdOf(first.content.cardId)
    const sameNoteVisible = (await buildQueue(db, deck, now)).filter(
      (i) => noteIdOf(i.content.cardId) === noteId && i.content.cardId !== first.content.cardId,
    )
    expect(sameNoteVisible.length).toBe(0)

    const tomorrow = new Date(now.getTime() + 25 * 60 * 60 * 1000)
    const tomorrowQueue = await buildQueue(db, deck, tomorrow)
    const siblingTomorrow = tomorrowQueue.filter(
      (i) => noteIdOf(i.content.cardId) === noteId && i.content.cardId !== first.content.cardId,
    )
    expect(siblingTomorrow.length).toBe(1)
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
