import { describe, expect, it } from 'vitest'
import { quranVocab1 } from './quranVocab1'
import { cardsOfDeck } from './index'
import { locateHarf } from '../../text/arabic'

describe('Quran Vocabulary 1', () => {
  it('holds one level of 50 words', () => {
    expect(quranVocab1.notes).toHaveLength(50)
  })

  it('has unique, readable note ids', () => {
    const ids = quranVocab1.notes.map((note) => note.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z][a-z0-9-]*$/)
  })

  it('is recognition only, so it yields one card per note', () => {
    expect(quranVocab1.directions).toEqual(['ar-to-meaning'])
    expect(cardsOfDeck(quranVocab1)).toHaveLength(quranVocab1.notes.length)
  })

  it('stays out of the drill pool, which needs a meaning-to-ar direction', () => {
    for (const note of quranVocab1.notes) {
      expect(note.directions ?? quranVocab1.directions).not.toContain('meaning-to-ar')
    }
  })

  it('carries both meanings and a cited ayah on every note', () => {
    for (const note of quranVocab1.notes) {
      expect(note.english, note.id).toBeTruthy()
      expect(note.turkish, note.id).toBeTruthy()
      expect(note.example?.arabic, note.id).toBeTruthy()
      expect(note.example?.english, note.id).toBeTruthy()
      expect(note.example?.turkish, note.id).toBeTruthy()
      expect(note.example?.source, note.id).toMatch(/^Qur'an \d+:\d+$/)
    }
  })

  it('carries word detail, in descending frequency order', () => {
    let previous = Infinity
    for (const note of quranVocab1.notes) {
      const vocab = note.vocab
      expect(vocab, note.id).toBeDefined()
      expect(['ism', 'fil', 'harf']).toContain(vocab!.partOfSpeech)
      expect(vocab!.occurrences, note.id).toBeGreaterThan(0)
      expect(vocab!.occurrences, note.id).toBeLessThanOrEqual(previous)
      previous = vocab!.occurrences
    }
  })

  /**
   * The load-bearing one: the card back highlights `occurringForm` inside the
   * ayah with the same helper the page uses. If it fails to locate the token
   * the highlight silently disappears, which is exactly the bug that a
   * segment-level form (half a word) produced before.
   */
  it('can highlight every occurring form inside its ayah', () => {
    for (const note of quranVocab1.notes) {
      const found = locateHarf(note.example!.arabic, note.vocab!.occurringForm)
      expect(found, `${note.id}: ${note.vocab!.occurringForm}`).not.toBeNull()
    }
  })
})
