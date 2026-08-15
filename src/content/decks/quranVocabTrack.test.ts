import { describe, expect, it } from 'vitest'
import { cardsOfDeck, decks } from './index'
import { quranVocabTrack } from './quranVocabTrack'
import { locateHarf } from '../../text/arabic'

describe.each(quranVocabTrack.map((deck) => [deck.name, deck] as const))(
  '%s',
  (_name, deck) => {
    it('holds one level of 50 words', () => {
      expect(deck.notes).toHaveLength(50)
    })

    it('has readable note ids', () => {
      for (const note of deck.notes) expect(note.id).toMatch(/^[a-z][a-z0-9-]*$/)
    })

    it('is recognition only, so it yields one card per note', () => {
      expect(deck.directions).toEqual(['ar-to-meaning'])
      expect(cardsOfDeck(deck)).toHaveLength(deck.notes.length)
    })

    it('has no note overriding the direction back to production', () => {
      for (const note of deck.notes) {
        expect(note.directions ?? deck.directions).not.toContain('meaning-to-ar')
      }
    })

    it('carries both meanings and a cited ayah on every note', () => {
      for (const note of deck.notes) {
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
      for (const note of deck.notes) {
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
     * the highlight silently disappears, which is what a segment-level form
     * (half a word) produced before.
     */
    it('can highlight every occurring form inside its ayah', () => {
      for (const note of deck.notes) {
        const found = locateHarf(note.example!.arabic, note.vocab!.occurringForm)
        expect(found, `${note.id}: ${note.vocab!.occurringForm}`).not.toBeNull()
      }
    })
  },
)

describe('the track as a whole', () => {
  it('runs in descending frequency across level boundaries', () => {
    const counts = quranVocabTrack.flatMap((deck) =>
      deck.notes.map((note) => note.vocab!.occurrences),
    )
    for (let i = 1; i < counts.length; i++) {
      expect(counts[i]).toBeLessThanOrEqual(counts[i - 1])
    }
  })

  /**
   * Card ids are `noteId|direction` and the card-state table is keyed on that,
   * with no deck id in the key. Two decks sharing a note id would silently
   * share one learner's scheduling state.
   */
  it('gives every note in every deck a unique id', () => {
    const seen = new Map<string, string>()
    for (const deck of decks) {
      for (const note of deck.notes) {
        const owner = seen.get(note.id)
        expect(owner, `${note.id} is in both ${owner} and ${deck.id}`).toBeUndefined()
        seen.set(note.id, deck.id)
      }
    }
  })
})
