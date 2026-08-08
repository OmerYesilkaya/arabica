// Quran citation checker. A curation tool, not part of the app or the normal
// test suite (needs network). Run manually:
//
//   pnpm exec vitest run --config scripts/vitest.citations.config.ts
//
// It walks every Example.source and RefText.source in src/content that cites
// "Qur'an S:A", fetches the canonical ayah text (api.alquran.cloud, simple and
// uthmani editions), and checks that the quoted fragment's letter skeleton is
// a substring of the ayah's. Letter-skeleton comparison ignores tashkeel, so
// wording and citation errors are caught; vowel errors still need the eye.
// The app itself makes no network requests; this script runs on the dev machine.

import { describe, expect, it } from 'vitest'
import { referenceEntries } from '../src/content/reference'
import { decks } from '../src/content/decks'
import type { Example, RefText } from '../src/content/types'

interface Quote {
  where: string
  arabic: string
  surah: number
  ayah: number
  cite: string
}

const CITE = /Qur['’]an (\d+):(\d+)/

function quoteOf(where: string, arabic: string, source: string): Quote | null {
  const m = CITE.exec(source)
  if (!m) return null
  return {
    where,
    arabic,
    surah: Number(m[1]),
    ayah: Number(m[2]),
    cite: `${m[1]}:${m[2]}`,
  }
}

function fromExample(where: string, ex: Example | undefined): Quote[] {
  if (!ex?.source) return []
  const q = quoteOf(where, ex.arabic, ex.source)
  return q ? [q] : []
}

function fromCell(where: string, cell: RefText): Quote[] {
  if (typeof cell === 'string' || !cell.source) return []
  const q = quoteOf(where, cell.ar, cell.source)
  return q ? [q] : []
}

function collectQuotes(): Quote[] {
  const quotes: Quote[] = []
  for (const entry of referenceEntries) {
    for (const [i, section] of entry.sections.entries()) {
      const where = `${entry.id} section ${i} (${section.kind})`
      if (section.kind === 'table') {
        for (const row of section.rows)
          for (const cell of row) quotes.push(...fromCell(where, cell))
      } else if (section.kind === 'harf') {
        for (const sense of section.senses)
          quotes.push(...fromExample(`${where} ${sense.term}`, sense.example))
      }
    }
  }
  for (const deck of decks) {
    for (const note of deck.notes)
      quotes.push(...fromExample(`deck ${deck.id} note ${note.id}`, note.example))
  }
  return quotes
}

// Strip everything that is not a base letter: tashkeel and Quranic annotation
// marks, tatweel, then fold the alif and hamza-carrier variants that differ
// between muṣḥaf orthography and plain imlāʾī writing.
function skeleton(text: string): string {
  return text
    .normalize('NFC')
    .replace(/[ً-ٰٟۖ-ۭ࣓-ࣿـ]/g, '')
    .replace(/[ٱآأإ]/g, 'ا') // ٱ آ أ إ -> ا
    .replace(/ی/g, 'ي') // Farsi yeh -> yeh (defensive)
    .replace(/\s+/g, ' ')
    .trim()
}

interface AyahText {
  simple: string
  uthmani: string
}

const cache = new Map<string, Promise<AyahText>>()

// One request at a time with a gap, and retries on 429: the API rate-limits bursts.
let queue: Promise<unknown> = Promise.resolve()
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const next = queue.then(job)
  queue = next.then(
    () => sleep(250),
    () => sleep(250),
  )
  return next
}

async function getWithRetry(url: string): Promise<string> {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url)
    if (res.ok) {
      const body = (await res.json()) as { data?: { text?: string } }
      const text = body.data?.text
      if (!text) throw new Error(`no text in response for ${url}`)
      return text
    }
    if (res.status !== 429 || attempt >= 6)
      throw new Error(`HTTP ${res.status} for ${url}`)
    await sleep(1000 * attempt)
  }
}

function fetchAyah(surah: number, ayah: number): Promise<AyahText> {
  const key = `${surah}:${ayah}`
  let hit = cache.get(key)
  if (!hit) {
    hit = enqueue(async () => ({
      simple: await getWithRetry(
        `https://api.alquran.cloud/v1/ayah/${key}/quran-simple`,
      ),
      uthmani: await getWithRetry(
        `https://api.alquran.cloud/v1/ayah/${key}/quran-uthmani`,
      ),
    }))
    cache.set(key, hit)
  }
  return hit
}

describe('Quran citations in src/content', () => {
  const quotes = collectQuotes()

  it('found citations to check', () => {
    console.log(`\n${quotes.length} Quranic quotes cited in content\n`)
    expect(quotes.length).toBeGreaterThan(0)
  })

  it.each(quotes.map((q) => [`${q.cite} @ ${q.where}`, q] as const))(
    '%s',
    async (_label, q) => {
      const canon = await fetchAyah(q.surah, q.ayah)
      const frag = skeleton(q.arabic)
      const inSimple = skeleton(canon.simple).includes(frag)
      const inUthmani = skeleton(canon.uthmani).includes(frag)
      if (!inSimple && !inUthmani) {
        console.error(
          `\nMISMATCH ${q.cite} @ ${q.where}\n  quoted:    ${q.arabic}\n  canonical: ${canon.simple}\n`,
        )
      }
      expect(inSimple || inUthmani).toBe(true)
    },
    30_000,
  )
})
