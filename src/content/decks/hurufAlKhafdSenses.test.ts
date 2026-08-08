import { describe, expect, it } from 'vitest'
import { hurufAlKhafdSenses } from './hurufAlKhafdSenses'
import { hurufAlKhafdRef } from '../reference/hurufAlKhafd'
import { cardsOfDeck, siblingCardsOf, siblingGroupOf } from './index'
import type { RefHarf } from '../types'

const harfs = hurufAlKhafdRef.sections.filter(
  (s): s is RefHarf => s.kind === 'harf',
)
const sensesWithExample = harfs.flatMap((h) =>
  h.senses.filter((s) => s.example).map((s) => ({ harf: h, sense: s })),
)

describe('hurufAlKhafdSenses deck', () => {
  it('ships locked and ar-to-meaning only', () => {
    expect(hurufAlKhafdSenses.locked).toBe(true)
    expect(hurufAlKhafdSenses.directions).toEqual(['ar-to-meaning'])
    expect(hurufAlKhafdSenses.id).not.toBe(hurufAlKhafdRef.id)
  })

  it('generates exactly one note per sense that has an example', () => {
    expect(hurufAlKhafdSenses.notes.length).toBe(sensesWithExample.length)
  })

  it('derives meanings and example from the reference (no duplicated text)', () => {
    for (const { harf, sense } of sensesWithExample) {
      const note = hurufAlKhafdSenses.notes.find(
        (n) => n.sense?.termArabic === sense.termArabic && n.arabic === (harf.bareForm ?? harf.arabic),
      )
      expect(note, `note for ${harf.id} / ${sense.term}`).toBeDefined()
      // Same object references prove the deck reads the reference, not a copy.
      expect(note!.example).toBe(sense.example)
      expect(note!.english).toBe(sense.english)
      expect(note!.turkish).toBe(sense.turkish)
      expect(note!.sense!.term).toBe(sense.term)
    }
  })

  it('links each note to its harf anchor and sibling group', () => {
    for (const note of hurufAlKhafdSenses.notes) {
      const harfId = note.siblingGroup!
      expect(note.referenceId).toBe(`${hurufAlKhafdRef.id}#${harfId}`)
      expect(note.directions).toEqual(['ar-to-meaning'])
      expect(harfs.some((h) => h.id === harfId)).toBe(true)
    }
  })

  it('covers every required harf', () => {
    for (const id of ['min', 'ila', 'an', 'ala', 'fi']) {
      const notes = hurufAlKhafdSenses.notes.filter((n) => n.siblingGroup === id)
      const senses = harfs.find((h) => h.id === id)!.senses.filter((s) => s.example)
      expect(notes.length, id).toBe(senses.length)
      expect(notes.length).toBeGreaterThan(0)
    }
  })

  it('produces one card per note (single direction)', () => {
    expect(cardsOfDeck(hurufAlKhafdSenses).length).toBe(
      hurufAlKhafdSenses.notes.length,
    )
  })
})

describe('sibling grouping', () => {
  it('groups all senses of one harf as siblings', () => {
    const minCard = cardsOfDeck(hurufAlKhafdSenses).find(
      (c) => siblingGroupOf(c.note) === 'min',
    )!
    const siblings = siblingCardsOf(hurufAlKhafdSenses, minCard.cardId)
    const minSenseCount = harfs
      .find((h) => h.id === 'min')!
      .senses.filter((s) => s.example).length
    expect(siblings.length).toBe(minSenseCount - 1)
    expect(siblings.every((c) => siblingGroupOf(c.note) === 'min')).toBe(true)
  })

  it('does not group senses of different harfs', () => {
    const minCard = cardsOfDeck(hurufAlKhafdSenses).find(
      (c) => siblingGroupOf(c.note) === 'min',
    )!
    const siblings = siblingCardsOf(hurufAlKhafdSenses, minCard.cardId)
    expect(siblings.some((c) => siblingGroupOf(c.note) !== 'min')).toBe(false)
  })
})
