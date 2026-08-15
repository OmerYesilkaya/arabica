import { beforeEach, describe, expect, it } from 'vitest'
import { Rating } from 'ts-fsrs'
import { ArabicaDB } from '../db/db'
import { hurufAlKhafdSenses } from '../content/decks/hurufAlKhafdSenses'
import { testDeck } from './testDeck'
import { cardsOfDeck, siblingCardsOf, siblingGroupOf } from '../content/decks'
import { answerCard } from './engine'
import { buildQueue } from './queue'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`sense-test-${++counter}`)
})

describe('default siblings', () => {
  it('are the same note in the other direction', () => {
    const card = cardsOfDeck(testDeck).find((c) => c.note.id === 'test-note-1')!
    const siblings = siblingCardsOf(testDeck, card.cardId)
    expect(siblings.length).toBe(1)
    expect(siblings[0].note.id).toBe('test-note-1')
    expect(siblings[0].direction).not.toBe(card.direction)
  })
})

describe('sense deck burying across a harf', () => {
  const minSenseCount = () =>
    cardsOfDeck(hurufAlKhafdSenses).filter((c) => siblingGroupOf(c.note) === 'min')
      .length

  it('buries the other senses of the answered harf until tomorrow', async () => {
    const now = new Date()
    const queue = await buildQueue(db, hurufAlKhafdSenses, now)
    const minCard = queue.find((i) => siblingGroupOf(i.content.note) === 'min')!

    await answerCard(db, minCard.content, minCard.state, Rating.Good, now)

    // Same day: no card of the min group is visible (answered one is learning,
    // its sense siblings are buried).
    const sameDay = await buildQueue(db, hurufAlKhafdSenses, now)
    expect(
      sameDay.filter((i) => siblingGroupOf(i.content.note) === 'min').length,
    ).toBe(0)

    // Other harfs are untouched.
    expect(
      sameDay.some((i) => siblingGroupOf(i.content.note) === 'ba'),
    ).toBe(true)

    // Next day the buried senses reappear.
    const tomorrow = new Date(now.getTime() + 25 * 60 * 60 * 1000)
    const tmrw = await buildQueue(db, hurufAlKhafdSenses, tomorrow)
    const minTomorrow = tmrw.filter(
      (i) => siblingGroupOf(i.content.note) === 'min',
    )
    expect(minTomorrow.length).toBeGreaterThanOrEqual(minSenseCount() - 1)
  })
})
