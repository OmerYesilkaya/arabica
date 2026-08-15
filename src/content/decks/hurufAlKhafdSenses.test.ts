import { describe, expect, it } from 'vitest'
import { hurufAlKhafdSenses } from './hurufAlKhafdSenses'
import { hurufAlKhafdRef } from '../reference/hurufAlKhafd'
import { cardsOfDeck, siblingCardsOf, siblingGroupOf } from './index'
import { OCCURRENCES_OUTSIDE_TRACK } from '../quranCoverage'
import type { RefHarf } from '../types'

const harfs = hurufAlKhafdRef.sections.filter(
  (s): s is RefHarf => s.kind === 'harf',
)
const allSenses = harfs.flatMap((h) => h.senses.map((sense) => ({ harf: h, sense })))

describe('hurufAlKhafdSenses deck', () => {
  it('ships unlocked and ar-to-meaning only', () => {
    expect(hurufAlKhafdSenses.locked).toBeUndefined()
    expect(hurufAlKhafdSenses.directions).toEqual(['ar-to-meaning'])
    expect(hurufAlKhafdSenses.id).not.toBe(hurufAlKhafdRef.id)
  })

  it('generates exactly one note per sense', () => {
    expect(hurufAlKhafdSenses.notes.length).toBe(allSenses.length)
  })

  it('derives meanings and examples from the reference (no duplicated text)', () => {
    for (const { harf, sense } of allSenses) {
      const note = hurufAlKhafdSenses.notes.find(
        (n) =>
          n.sense?.termArabic === sense.termArabic &&
          n.arabic === (harf.bareForm ?? harf.arabic),
      )
      expect(note, `note for ${harf.id} / ${sense.term}`).toBeDefined()
      // Same object references prove the deck reads the reference, not a copy.
      expect(note!.examples).toBe(sense.examples)
      expect(note!.english).toBe(sense.english)
      expect(note!.turkish).toBe(sense.turkish)
      expect(note!.sense!.term).toBe(sense.term)
    }
  })

  it('gives every sense at least one example to ask from', () => {
    for (const { harf, sense } of allSenses) {
      expect(sense.examples.length, `${harf.id} / ${sense.term}`).toBeGreaterThan(0)
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
      expect(notes.length, id).toBe(harfs.find((h) => h.id === id)!.senses.length)
      expect(notes.length).toBeGreaterThan(0)
    }
  })

  it('produces one card per note (single direction)', () => {
    expect(cardsOfDeck(hurufAlKhafdSenses).length).toBe(
      hurufAlKhafdSenses.notes.length,
    )
  })
})

describe('note ids', () => {
  it('gives the primary sense the harf id itself', () => {
    for (const harf of harfs) {
      const primary = hurufAlKhafdSenses.notes.find((n) => n.id === harf.id)
      expect(primary, `primary note for ${harf.id}`).toBeDefined()
      expect(primary!.sense!.term).toBe(harf.senses[0].term)
    }
  })

  it('names later senses by their term, never by their position', () => {
    // A positional id hands one sense's schedule to another the moment a sense
    // is inserted above it. Digits here would mean that has crept back in.
    const later = hurufAlKhafdSenses.notes.filter(
      (n) => !harfs.some((h) => h.id === n.id),
    )
    expect(later.length).toBeGreaterThan(0)
    for (const note of later) {
      expect(note.id, note.id).toMatch(/^[a-z-]+$/)
    }
  })

  it('is unique across the deck', () => {
    const ids = hurufAlKhafdSenses.notes.map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('owns every id the coverage metric attributes occurrences to', () => {
    // occurrencesOf() looks these up by note id, so a renamed primary note
    // silently drops thousands of occurrences off the Stats page.
    for (const id of Object.keys(OCCURRENCES_OUTSIDE_TRACK)) {
      expect(hurufAlKhafdSenses.notes.some((n) => n.id === id), id).toBe(true)
    }
  })
})

describe('contrast set', () => {
  it('names the harf’s other senses, and never itself', () => {
    for (const { harf, sense } of allSenses) {
      const note = hurufAlKhafdSenses.notes.find(
        (n) => n.sense?.term === sense.term && n.siblingGroup === harf.id,
      )!
      expect(note.sense!.contrast.length).toBe(harf.senses.length - 1)
      expect(note.sense!.contrast.some((c) => c.term === sense.term)).toBe(false)
      for (const other of note.sense!.contrast) {
        expect(harf.senses.some((s) => s.term === other.term)).toBe(true)
      }
    }
  })

  it('is empty for a harf with one sense', () => {
    const single = harfs.filter((h) => h.senses.length === 1)
    expect(single.length).toBeGreaterThan(0)
    for (const harf of single) {
      const note = hurufAlKhafdSenses.notes.find((n) => n.id === harf.id)!
      expect(note.sense!.contrast).toEqual([])
    }
  })
})

describe('sibling grouping', () => {
  it('groups all senses of one harf as siblings', () => {
    const minCard = cardsOfDeck(hurufAlKhafdSenses).find(
      (c) => siblingGroupOf(c.note) === 'min',
    )!
    const siblings = siblingCardsOf(hurufAlKhafdSenses, minCard.cardId)
    const minSenseCount = harfs.find((h) => h.id === 'min')!.senses.length
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
