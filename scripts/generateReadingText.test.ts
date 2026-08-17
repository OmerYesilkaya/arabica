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
  sliceSegments,
  splitBasmala,
  toJson,
  tokenize,
  unusedGlosses,
} from './generateReadingText'
import type { CorpusLine } from '../src/content/corpus/types'

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

  it('keeps the heading at-Tin is written with, shadda and all', () => {
    // Tanzil marks a shadda on the ba of bismi here and in al-Qadr. Rejoining
    // has to give the line back exactly, so the heading is that surah's own.
    const split = splitBasmala(ayat.get('95:1')!, basmala, 95)
    expect(split.basmala).not.toBe(basmala)
    expect(`${split.basmala} ${split.text}`).toBe(ayat.get('95:1'))
  })

  it('refuses a first ayah that does not open with it', () => {
    expect(() => splitBasmala(ayat.get('2:2')!, basmala, 2)).toThrow(/basmala/)
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

describe('sliceSegments', () => {
  it('cuts a word between its segments', () => {
    expect(sliceSegments('abcd', ['ab', 'cd'], 'test')).toEqual(['ab', 'cd'])
  })

  it('refuses a segment the text does not spell', () => {
    expect(() => sliceSegments('abcd', ['ab', 'ce'], 'test')).toThrow(/does not spell/)
  })

  it('refuses letters left over past the last segment', () => {
    expect(() => sliceSegments('abcd', ['ab'], 'test')).toThrow(/past its segments/)
  })
})

describe('the fold between the two sources', () => {
  it('covers exactly the words they spell differently', () => {
    // The fold is what lets a word be cut into its segments when Tanzil and
    // the morphology write one of its marks differently, and it is deliberately
    // narrow (see `spelling`). This is what keeps it narrow: a corpus swap that
    // introduced a disagreement anywhere else would land here rather than be
    // absorbed. The stored form is the Tanzil one, so a word is on this list
    // exactly when the two sources disagree about it.
    const differing: string[] = []
    for (const surah of built.surahs) {
      const lines: { where: string; line: CorpusLine; morphology: string[] }[] = surah.ayat.map(
        (ayah) => ({
          where: `${surah.surah}:${ayah.ayah}`,
          line: ayah,
          morphology: morphologyWords(surah.surah, ayah.ayah),
        }),
      )
      // The heading's morphology is al-Fatiha 1:1, whatever surah it heads.
      if (surah.basmala) {
        lines.push({
          where: `${surah.surah} basmala`,
          line: surah.basmala,
          morphology: morphologyWords(1, 1),
        })
      }
      for (const { where, line, morphology } of lines) {
        for (const [i, token] of line.tokens.entries()) {
          const stored = token.segments.map((s) => s.form).join('')
          if (stored !== morphology[i]) differing.push(`${where}:${i + 1}`)
        }
      }
    }
    expect(differing.sort()).toEqual(['92:13:3', '93:4:1', '95 basmala:1', '97 basmala:1'])
  })
})

function rowsOfAyah(surah: number, ayah: number) {
  return rows.filter((r) => r.surah === surah && r.ayah === ayah)
}

/** The words of an ayah as the morphology spells them, its segments rejoined. */
function morphologyWords(surah: number, ayah: number): string[] {
  const byWord = new Map<number, string>()
  for (const row of rowsOfAyah(surah, ayah)) {
    byWord.set(row.word, (byWord.get(row.word) ?? '') + row.form)
  }
  return [...byWord.keys()].sort((a, b) => a - b).map((w) => byWord.get(w)!)
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
