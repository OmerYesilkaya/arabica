// Reading corpus text checker. A curation tool, not part of the app or the
// normal test suite (needs network). Run:
//
//   pnpm exec vitest run --config scripts/vitest.citations.config.ts
//
// Corpus is never verified by hand, so what stands in for verification is that
// the Arabic is provably right at no human cost. Two checks, deliberately
// independent of each other:
//
//   1. every stored ayah is byte-for-byte the line Tanzil publishes, which is
//      what makes "verbatim" a fact rather than an intention, and is also the
//      licence's condition;
//   2. the same ayah matches the canonical text fetched from api.alquran.cloud
//      — the source checkCitations.test.ts verifies content against — so that
//      a mistake in the vendored file itself would still be caught.
//
// The offline half of the integrity check (offsets, orphans, lemma coverage)
// runs in the normal suite: src/content/corpus/corpus.test.ts.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadSurah, readingTexts } from '../src/content/corpus'
import { parseTanzil } from './generateReadingText'

const tanzil = parseTanzil(
  readFileSync(join(import.meta.dirname, 'data/quran-uthmani.txt'), 'utf8'),
)

const surahs = await Promise.all(readingTexts.map((text) => loadSurah(text.surah)))

/** Every stored ayah, put back together as Tanzil writes the line. */
function storedLines(): { cite: string; line: string }[] {
  const lines: { cite: string; line: string }[] = []
  for (const surah of surahs) {
    for (const ayah of surah.ayat) {
      // Tanzil prefixes the basmala to ayah 1; the reader stores it apart so
      // it can be set as its own line, so rejoin it to compare.
      const line =
        ayah.ayah === 1 && surah.basmala ? `${surah.basmala.text} ${ayah.text}` : ayah.text
      lines.push({ cite: `${surah.surah}:${ayah.ayah}`, line })
    }
  }
  return lines
}

// The same skeleton reduction checkCitations.test.ts uses: strip every mark
// that is not a base letter, then fold the alif and hamza-carrier variants
// that differ between mushaf orthography and plain imla'i writing.
function skeleton(text: string): string {
  return text
    .normalize('NFC')
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[ٱآأإ]/g, 'ا')
    .replace(/ی/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim()
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
let queue: Promise<unknown> = Promise.resolve()

function fetchAyah(cite: string): Promise<string> {
  const job = queue.then(async () => {
    for (let attempt = 1; ; attempt++) {
      const res = await fetch(`https://api.alquran.cloud/v1/ayah/${cite}/quran-uthmani`)
      if (res.ok) {
        const body = (await res.json()) as { data?: { text?: string } }
        if (!body.data?.text) throw new Error(`no text for ${cite}`)
        return body.data.text
      }
      if (res.status !== 429 || attempt >= 6) throw new Error(`HTTP ${res.status} for ${cite}`)
      await sleep(1000 * attempt)
    }
  })
  queue = job.then(
    () => sleep(250),
    () => sleep(250),
  )
  return job
}

describe('the reading corpus is verbatim Tanzil', () => {
  const lines = storedLines()

  it('found ayat to check', () => {
    console.log(`\n${lines.length} ayat stored in the reading corpus\n`)
    expect(lines.length).toBe(readingTexts.reduce((n, t) => n + t.ayat, 0))
  })

  it.each(lines.map((l) => [l.cite, l] as const))('%s byte-matches Tanzil', (_cite, l) => {
    const canonical = tanzil.get(l.cite)
    expect(canonical, `${l.cite} is not in the vendored Tanzil text`).toBeTruthy()
    if (l.line !== canonical) {
      console.error(`\nNOT VERBATIM ${l.cite}\n  stored: ${l.line}\n  tanzil: ${canonical}\n`)
    }
    expect(l.line).toBe(canonical)
  })
})

describe('the reading corpus matches the canonical text independently', () => {
  const lines = storedLines()

  it.each(lines.map((l) => [l.cite, l] as const))(
    '%s matches api.alquran.cloud',
    async (_cite, l) => {
      const canonical = await fetchAyah(l.cite)
      if (skeleton(l.line) !== skeleton(canonical)) {
        console.error(`\nMISMATCH ${l.cite}\n  stored:    ${l.line}\n  canonical: ${canonical}\n`)
      }
      expect(skeleton(l.line)).toBe(skeleton(canonical))
    },
    30_000,
  )
})
