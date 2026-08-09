// Runner for the reading corpus generator (GitHub issue #13). A curation
// tool, not part of the app or the normal test suite. Run:
//
//   pnpm exec vitest run --config scripts/vitest.generate.config.ts
//
// It runs under vitest for the same reason checkCitations.test.ts does: the
// scripts here import src/content directly and so need bundler resolution
// (see tsconfig.scripts.json).
//
// Unlike the vocabulary scaffold, this generator's output is not hand-edited
// afterwards, so it is meant to be rerun: the last test writes the files and
// the run is only correct if `git status` is clean afterwards on unchanged
// sources. The assertions above it pin the alignment invariants, so a corpus
// swap cannot quietly move a Token onto the wrong letters.

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { readingTexts } from '../src/content/corpus'
import {
  chunks,
  generate,
  headSegment,
  load,
  parseTanzil,
  splitBasmala,
  toJson,
  tokenize,
  unusedGlosses,
} from './generateReadingText'

const OUT = join(import.meta.dirname, '../src/content/corpus')

const { rows, ayat } = load()
const built = generate()

describe('vendored sources', () => {
  it('reads the whole Tanzil text', () => {
    expect(ayat.size).toBe(6236)
  })

  it('reads the whole morphology', () => {
    expect(rows.length).toBe(130_030)
  })
})

describe('chunks', () => {
  it('reports offsets that slice back to the chunk', () => {
    const text = ' one  two '
    expect(chunks(text).map((c) => text.slice(c.start, c.end))).toEqual(['one', 'two'])
  })
})

describe('headSegment', () => {
  const row = (form: string, over: Partial<{ affix: boolean; lemma: string }> = {}) => ({
    surah: 1,
    ayah: 1,
    word: 1,
    form,
    tag: 'N',
    features: [],
    affix: false,
    ...over,
  })

  it('skips a prefixed clitic', () => {
    expect(headSegment([row('a', { affix: true, lemma: 'x' }), row('b', { lemma: 'y' })])).toBe(1)
  })

  it('stops at the stem when a pronoun follows', () => {
    expect(headSegment([row('a', { lemma: 'x' }), row('b', { affix: true })])).toBe(0)
  })

  it('falls back to the first lemma when every segment is a clitic', () => {
    expect(headSegment([row('a', { affix: true }), row('b', { affix: true, lemma: 'y' })])).toBe(1)
  })
})

describe('splitBasmala', () => {
  const basmala = parseTanzil(readFileSync(join(import.meta.dirname, 'data/quran-uthmani.txt'), 'utf8')).get('1:1')!

  it('leaves al-Fatiha alone, where it is an ayah in its own right', () => {
    expect(splitBasmala(basmala, basmala, 1)).toEqual({ text: basmala })
  })

  it('leaves at-Tawba alone, which has none', () => {
    const line = ayat.get('9:1')!
    expect(splitBasmala(line, basmala, 9)).toEqual({ text: line })
  })

  it('splits it off every other first ayah', () => {
    const split = splitBasmala(ayat.get('112:1')!, basmala, 112)
    expect(split.basmala).toBe(basmala)
    expect(split.text.startsWith(basmala)).toBe(false)
    expect(`${split.basmala} ${split.text}`).toBe(ayat.get('112:1'))
  })
})

describe('tokenize', () => {
  it('refuses text and morphology that disagree on the words', () => {
    expect(() => tokenize('a b', rowsOfAyah(105, 1), 'test')).toThrow(/words/)
  })

  it('gives every word of every read ayah a token', () => {
    for (const surah of built.surahs) {
      for (const ayah of surah.ayat) {
        expect(ayah.tokens.length, `${surah.surah}:${ayah.ayah}`).toBeGreaterThan(0)
      }
    }
  })
})

function rowsOfAyah(surah: number, ayah: number) {
  return rows.filter((r) => r.surah === surah && r.ayah === ayah)
}

describe('the built corpus', () => {
  it('covers exactly the catalogued surahs, with their ayah counts', () => {
    expect(built.surahs.map((s) => s.surah)).toEqual(readingTexts.map((t) => t.surah))
    for (const [i, surah] of built.surahs.entries()) {
      expect(surah.ayat.length, `surah ${surah.surah}`).toBe(readingTexts[i].ayat)
    }
  })

  it('heads every surah with the basmala', () => {
    for (const surah of built.surahs) {
      expect(surah.basmala?.tokens.length, `surah ${surah.surah}`).toBe(4)
    }
  })

  it('slices each token straight out of the stored text', () => {
    for (const surah of built.surahs) {
      const lines = surah.basmala ? [surah.basmala, ...surah.ayat] : surah.ayat
      for (const line of lines) {
        for (const token of line.tokens) {
          const written = token.segments.map((s) => s.form).join('')
          expect(line.text.slice(token.start, token.end)).toBe(written)
        }
      }
    }
  })

  it('glosses every lemma it uses, and uses every lemma it glosses', () => {
    const used = new Set<string>()
    for (const surah of built.surahs) {
      const lines = surah.basmala ? [surah.basmala, ...surah.ayat] : surah.ayat
      for (const line of lines)
        for (const token of line.tokens)
          for (const segment of token.segments) if (segment.lemma) used.add(segment.lemma)
    }
    expect([...used].sort()).toEqual(Object.keys(built.lemmas).sort())
  })

  it('leaves no gloss in the table unused', () => {
    // A leftover is either a typo in a key or a word the decks now teach, and
    // both are worth knowing: the first means a lemma silently missed its
    // gloss, the second that a generated gloss has quietly stopped being read.
    expect(unusedGlosses(built.lemmas)).toEqual([])
  })

  it('takes the gloss from the deck wherever a deck teaches the word', () => {
    const fromDecks = Object.values(built.lemmas).filter((l) => l.glossSource === 'deck')
    // Frequency ordering means the reader is mostly words the track teaches.
    expect(fromDecks.length).toBeGreaterThan(50)
    for (const lemma of fromDecks) expect(lemma.noteId).toBeTruthy()
  })
})

describe('emit', () => {
  it('writes the corpus files', () => {
    for (const surah of built.surahs) {
      writeFileSync(join(OUT, `surah${surah.surah}.json`), toJson(surah))
    }
    writeFileSync(join(OUT, 'lemmas.json'), toJson(built.lemmas))
    console.log(
      `\nwrote ${built.surahs.length} surahs and ${Object.keys(built.lemmas).length} lemmas to src/content/corpus\n`,
    )
  })
})
