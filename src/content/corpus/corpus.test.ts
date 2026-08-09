import { describe, expect, it } from 'vitest'
import { noteById } from '../decks'
import { pronounGloss } from '../../text/morphology'
import { PROVENANCE, loadLemmas, loadSurah, readingTexts, textRef } from '.'
import type { CorpusLine, CorpusSurah } from './types'

/*
 * Machine integrity for the reading corpus.
 *
 * Corpus is never verified by hand — there is far too much of it — so what
 * stands in for verification is a check that costs nothing to run. This is the
 * offline half: offsets resolve, no word is left untokenized, no morphology is
 * orphaned, every lemma a token references exists, and every gloss copied from
 * a Deck still says what that Deck says. The other half, that each stored ayah
 * is byte-for-byte what Tanzil publishes, needs the vendored text and lives in
 * scripts/checkCorpus.test.ts.
 */

/** Whitespace and the Quranic annotation marks, the only things between words. */
const BETWEEN_WORDS = /^[\sۖ-ۭ]*$/

const surahs = await Promise.all(readingTexts.map((text) => loadSurah(text.surah)))
const lemmas = await loadLemmas()

function linesOf(surah: CorpusSurah): CorpusLine[] {
  return surah.basmala ? [surah.basmala, ...surah.ayat] : surah.ayat
}

function everyLine(): { where: string; line: CorpusLine }[] {
  return surahs.flatMap((surah) =>
    linesOf(surah).map((line) => ({
      where: `${surah.surah}:${'ayah' in line ? line.ayah : 'basmala'}`,
      line,
    })),
  )
}

describe('the catalogue and the files agree', () => {
  it('ships a file for every catalogued Text and nothing else', () => {
    expect(surahs.map((s) => s.surah)).toEqual(readingTexts.map((t) => t.surah))
  })

  it('has the ayah count the catalogue promises, numbered from one', () => {
    for (const surah of surahs) {
      const ref = textRef(surah.surah)!
      expect(surah.ayat.length, `surah ${surah.surah}`).toBe(ref.ayat)
      expect(surah.ayat.map((a) => a.ayah)).toEqual(
        Array.from({ length: ref.ayat }, (_, i) => i + 1),
      )
    }
  })

  it('refuses a surah the reader does not carry', async () => {
    await expect(loadSurah(2)).rejects.toThrow()
  })

  it('heads every one of these surahs with the same basmala', () => {
    const texts = new Set(surahs.map((s) => s.basmala?.text))
    expect(texts.size).toBe(1)
    expect([...texts][0]).toBeTruthy()
  })
})

describe('every token points at the letters it annotates', () => {
  it('slices back to exactly the segments it is made of', () => {
    for (const { where, line } of everyLine()) {
      for (const token of line.tokens) {
        const written = token.segments.map((s) => s.form).join('')
        expect(line.text.slice(token.start, token.end), `${where} @${token.start}`).toBe(written)
      }
    }
  })

  it('runs in order, without overlapping', () => {
    for (const { where, line } of everyLine()) {
      let previous = 0
      for (const token of line.tokens) {
        expect(token.start, where).toBeGreaterThanOrEqual(previous)
        expect(token.end, where).toBeGreaterThan(token.start)
        previous = token.end
      }
      expect(previous, where).toBeLessThanOrEqual(line.text.length)
    }
  })

  it('leaves no word untokenized', () => {
    // Everything the tokens do not cover has to be space or an annotation
    // mark. If a word ever fell outside one, it would render as plain text
    // that cannot be tapped, and nothing else would notice.
    for (const { where, line } of everyLine()) {
      let cursor = 0
      const gaps: string[] = []
      for (const token of line.tokens) {
        gaps.push(line.text.slice(cursor, token.start))
        cursor = token.end
      }
      gaps.push(line.text.slice(cursor))
      for (const gap of gaps) expect(BETWEEN_WORDS.test(gap), `${where}: "${gap}"`).toBe(true)
    }
  })

  it('has a head segment inside its own segments', () => {
    for (const { where, line } of everyLine()) {
      for (const token of line.tokens) {
        expect(token.head, where).toBeGreaterThanOrEqual(0)
        expect(token.head, where).toBeLessThan(token.segments.length)
      }
    }
  })

  it('gives every token a head that can be glossed', () => {
    // The head is what the gloss hangs on, so a head with nothing to say is a
    // word the reader cannot explain. The corpus lemmatizes everything except
    // the pronouns, whose meaning is read off their person instead.
    for (const { where, line } of everyLine()) {
      for (const token of line.tokens) {
        const head = token.segments[token.head]
        expect(
          Boolean(head.lemma) || Boolean(pronounGloss(head)),
          `${where} ${token.start} ${head.form}`,
        ).toBe(true)
      }
    }
  })
})

describe('the lemma dictionary', () => {
  it('glosses every lemma the texts use, and nothing they do not', () => {
    const used = new Set<string>()
    for (const { line } of everyLine()) {
      for (const token of line.tokens) {
        for (const segment of token.segments) if (segment.lemma) used.add(segment.lemma)
      }
    }
    expect([...used].sort()).toEqual(Object.keys(lemmas).sort())
  })

  it('gives every lemma both languages', () => {
    for (const [lemma, entry] of Object.entries(lemmas)) {
      expect(entry.english, lemma).toBeTruthy()
      expect(entry.turkish, lemma).toBeTruthy()
    }
  })

  it('resolves every note it names', () => {
    for (const [lemma, entry] of Object.entries(lemmas)) {
      if (!entry.noteId) continue
      expect(noteById(entry.noteId), `${lemma} -> ${entry.noteId}`).toBeTruthy()
    }
  })

  it('still says what the deck says, wherever it copied a deck', () => {
    // The generator copies an authored Meaning so the corpus files stand on
    // their own. This is what stops the copy going stale after a deck is
    // edited: it fails, and the fix is to rerun the generator.
    for (const [lemma, entry] of Object.entries(lemmas)) {
      if (entry.glossSource !== 'deck') continue
      const note = noteById(entry.noteId!)!
      expect({ english: entry.english, turkish: entry.turkish }, lemma).toEqual({
        english: note.english,
        turkish: note.turkish,
      })
    }
  })

  it('names a note for every deck gloss and none for a generated one', () => {
    for (const [lemma, entry] of Object.entries(lemmas)) {
      expect(Boolean(entry.noteId), lemma).toBe(entry.glossSource === 'deck')
    }
  })
})

describe('provenance', () => {
  it('names both sources it is built from', () => {
    expect(PROVENANCE.text.name).toBe('Tanzil')
    expect(PROVENANCE.morphology.name).toBe('Quranic Arabic Corpus')
  })
})
