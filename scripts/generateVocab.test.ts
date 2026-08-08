// Runner for the one-shot vocabulary scaffold generator (GitHub issue #8).
// A curation tool, not part of the app or the normal test suite. Run:
//
//   pnpm exec vitest run --config scripts/vitest.generate.config.ts
//
// It runs under vitest for the same reason checkCitations.test.ts does: the
// scripts here import src/content directly and so need bundler resolution
// (see tsconfig.scripts.json). The assertions are the point as much as the
// output — they pin the selection invariants the issue settled, so a corpus
// swap or a content rename cannot quietly change which words get taught.

import { describe, expect, it } from 'vitest'
import { normalizeArabic } from '../src/text/arabic'
import {
  LEVEL_COUNT,
  LEVEL_SIZE,
  ayahLengths,
  chooseAyah,
  isStandaloneWord,
  levels,
  load,
  selectLemmas,
  taughtAlready,
} from './generateVocab'

const { segments, index } = load()
const lengths = ayahLengths(segments)
const selected = selectLemmas(index)

describe('vocabulary selection', () => {
  it('filters exactly the 13 clitics, and only those', () => {
    const dropped = [...index.values()]
      .filter((lemma) => !isStandaloneWord(lemma))
      .map((lemma) => lemma.lemma)
    // The definite article, the conjunctions, the prefixed particles, the
    // attached pronouns and the muḍāriʿ prefixes. None is a word to learn.
    expect([...dropped].sort()).toEqual(
      ['أ', 'ال', 'ب', 'ت', 'س', 'ف', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'].sort(),
    )
  })

  it('excludes words an existing deck already teaches', () => {
    const taught = taughtAlready()
    expect(taught.size).toBeGreaterThan(0)
    // Ḥurūf al-Khafḍ is high-frequency, so this exclusion has to actually bite.
    expect(taught.has(normalizeArabic('مِنْ'))).toBe(true)
    for (const lemma of selected) {
      expect(taught.has(normalizeArabic(lemma.lemma)), lemma.lemma).toBe(false)
    }
  })

  it('fills every level', () => {
    expect(selected).toHaveLength(LEVEL_SIZE * LEVEL_COUNT)
    expect(levels(selected)).toHaveLength(LEVEL_COUNT)
  })

  it('is ordered by descending frequency', () => {
    for (let i = 1; i < selected.length; i++) {
      expect(selected[i].count).toBeLessThanOrEqual(selected[i - 1].count)
    }
  })

  it('finds an ayah for every selected word', () => {
    for (const lemma of selected) {
      expect(chooseAyah(lemma, lengths), lemma.lemma).toBeDefined()
    }
  })

  it('reports the selection', () => {
    const standalone = [...index.values()].filter(isStandaloneWord)
    const total = standalone.reduce((sum, lemma) => sum + lemma.count, 0)
    const covered = selected.reduce((sum, lemma) => sum + lemma.count, 0)
    const fragments = selected.filter((l) => chooseAyah(l, lengths)?.fragment).length

    console.log(
      `${selected.length} of ${standalone.length} standalone lemmas, ` +
        `covering ${((100 * covered) / total).toFixed(1)}% of standalone-word occurrences; ` +
        `${fragments} need a clause fragment`,
    )
    for (const [i, words] of levels(selected).entries()) {
      console.log(
        `\n--- level ${i + 1} (occurrences ${words[0].count}-${words[words.length - 1].count}) ---\n` +
          words
            .map((lemma) => {
              const choice = chooseAyah(lemma, lengths)!
              return `${lemma.lemma}\t${lemma.tag}\t${lemma.root ?? '-'}\t${lemma.count}\t${choice.surah}:${choice.ayah}${choice.fragment ? '*' : ''}`
            })
            .join('\n'),
      )
    }
  })
})
