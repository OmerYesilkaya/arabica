// Quran vocabulary scaffold generator. A one-shot curation tool, not part of
// the app and not part of the normal test run. See GitHub issue #8.
//
//   pnpm exec tsx scripts/generateVocab.ts --select        # offline, prints the word list
//   pnpm exec tsx scripts/generateVocab.ts --emit          # + fetches ayahs, writes deck files
//
// It emits a *scaffold*: everything mechanical (headword, root, part of
// speech, inflected forms, occurrence count, the ayah and its citation) is
// derived here, and the English and Turkish meanings are left as TODO for a
// human to author. Once emitted, the deck files are hand-maintained content
// exactly like hurufAlKhafd.ts — this script is never run again over them.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { decks } from '../src/content/decks'
import { normalizeArabic } from '../src/text/arabic'

const MORPHOLOGY = join(import.meta.dirname, 'data/quran-morphology.txt')

/** 12 levels of 50. */
export const LEVEL_SIZE = 50
export const LEVEL_COUNT = 12
const WANTED = LEVEL_SIZE * LEVEL_COUNT

/** Ayahs longer than this are only quoted as a clause fragment. */
const MAX_AYAH_WORDS = 12

export interface Segment {
  surah: number
  ayah: number
  word: number
  form: string
  tag: string
  lemma: string
  root?: string
  /** The segment is a clitic (prefix or suffix), not a standalone word. */
  affix: boolean
}

export interface Lemma {
  lemma: string
  root?: string
  /** Dominant corpus tag: N (noun), V (verb), P (particle). */
  tag: string
  count: number
  /** Inflected forms by frequency, most frequent first. */
  forms: string[]
  occurrences: Segment[]
}

// ---------- parsing ----------

const LEM = /(?:^|\|)LEM:([^|]+)/
const ROOT = /(?:^|\|)ROOT:([^|]+)/
const AFFIX = /(?:^|\|)(?:PREF|SUFF)(?:\||$)/

export function parseMorphology(text: string): Segment[] {
  const segments: Segment[] = []
  for (const line of text.split('\n')) {
    if (!line) continue
    const [location, form, tag, features] = line.split('\t')
    if (!features) continue
    const lemma = LEM.exec(features)?.[1]
    if (!lemma) continue
    const [surah, ayah, word] = location.split(':').map(Number)
    segments.push({
      surah,
      ayah,
      word,
      form,
      tag,
      lemma,
      root: ROOT.exec(features)?.[1],
      affix: AFFIX.test(features),
    })
  }
  return segments
}

export function indexLemmas(segments: Segment[]): Map<string, Lemma> {
  const byLemma = new Map<string, Lemma & { tags: Map<string, number>; formCounts: Map<string, number> }>()
  for (const seg of segments) {
    let entry = byLemma.get(seg.lemma)
    if (!entry) {
      entry = {
        lemma: seg.lemma,
        root: seg.root,
        tag: seg.tag,
        count: 0,
        forms: [],
        occurrences: [],
        tags: new Map(),
        formCounts: new Map(),
      }
      byLemma.set(seg.lemma, entry)
    }
    entry.count++
    entry.root ??= seg.root
    entry.tags.set(seg.tag, (entry.tags.get(seg.tag) ?? 0) + 1)
    entry.formCounts.set(seg.form, (entry.formCounts.get(seg.form) ?? 0) + 1)
    entry.occurrences.push(seg)
  }
  const result = new Map<string, Lemma>()
  for (const [lemma, entry] of byLemma) {
    const byCount = <T>(a: [T, number], b: [T, number]) => b[1] - a[1]
    result.set(lemma, {
      lemma: entry.lemma,
      root: entry.root,
      tag: [...entry.tags].sort(byCount)[0][0],
      count: entry.count,
      forms: [...entry.formCounts].sort(byCount).map(([form]) => form),
      occurrences: entry.occurrences,
    })
  }
  return result
}

// ---------- selection ----------

/**
 * A lemma that never appears as a standalone word is a clitic, not vocabulary:
 * the definite article ال, the conjunctions و and ف, the attached pronouns.
 * Exactly 13 lemmas are filtered out here, and every one of them is 100%
 * affix — there is no judgement call in the threshold.
 */
export function isStandaloneWord(lemma: Lemma): boolean {
  return lemma.occurrences.some((seg) => !seg.affix)
}

/**
 * Words already taught by an existing deck, as normalized Arabic. Matching is
 * on `drillAnswer ?? arabic` so the prefix particles, whose display form names
 * the letter ("الْبَاءُ (بِـ)"), are matched by their bare particle.
 */
export function taughtAlready(): Set<string> {
  const taught = new Set<string>()
  for (const deck of decks) {
    for (const note of deck.notes) {
      taught.add(normalizeArabic(note.drillAnswer ?? note.arabic))
    }
  }
  return taught
}

export function selectLemmas(index: Map<string, Lemma>, limit = WANTED): Lemma[] {
  const taught = taughtAlready()
  return [...index.values()]
    .filter(isStandaloneWord)
    .filter((lemma) => !taught.has(normalizeArabic(lemma.lemma)))
    .sort((a, b) => b.count - a.count || a.lemma.localeCompare(b.lemma))
    .slice(0, limit)
}

// ---------- ayah choice ----------

/** Word count per ayah, keyed "surah:ayah", from the corpus itself. */
export function ayahLengths(segments: Segment[]): Map<string, number> {
  const lengths = new Map<string, number>()
  for (const seg of segments) {
    const key = `${seg.surah}:${seg.ayah}`
    lengths.set(key, Math.max(lengths.get(key) ?? 0, seg.word))
  }
  return lengths
}

/**
 * Frequently recited passages, preferred when two candidate ayahs are equally
 * short: al-Fātiḥa, Āyat al-Kursī, and Juzʾ ʿAmma.
 */
function isFamiliar(surah: number, ayah: number): boolean {
  if (surah === 1) return true
  if (surah === 2 && ayah === 255) return true
  return surah >= 78
}

export interface AyahChoice {
  surah: number
  ayah: number
  /** The inflected form as it occurs there — the token to highlight. */
  form: string
  words: number
  /** True when the ayah exceeds MAX_AYAH_WORDS and must be quoted as a clause. */
  fragment: boolean
}

/**
 * Pick the ayah to quote for a lemma: the shortest ayah containing any
 * inflected form of it, preferring familiar passages on a tie. Length is the
 * dominant criterion because the card front is a bare word and the ayah is
 * read in full on every review.
 */
export function chooseAyah(lemma: Lemma, lengths: Map<string, number>): AyahChoice | undefined {
  let best: AyahChoice | undefined
  for (const seg of lemma.occurrences) {
    if (seg.affix) continue
    const words = lengths.get(`${seg.surah}:${seg.ayah}`) ?? Infinity
    const candidate: AyahChoice = {
      surah: seg.surah,
      ayah: seg.ayah,
      form: seg.form,
      words,
      fragment: words > MAX_AYAH_WORDS,
    }
    if (!best) {
      best = candidate
      continue
    }
    if (candidate.words !== best.words) {
      if (candidate.words < best.words) best = candidate
      continue
    }
    const candidateFamiliar = isFamiliar(candidate.surah, candidate.ayah)
    if (candidateFamiliar && !isFamiliar(best.surah, best.ayah)) best = candidate
  }
  return best
}

// ---------- entry point ----------

export function load(): { segments: Segment[]; index: Map<string, Lemma> } {
  const segments = parseMorphology(readFileSync(MORPHOLOGY, 'utf8'))
  return { segments, index: indexLemmas(segments) }
}

/** The selected lemmas split into levels, in frequency order. */
export function levels(selected: Lemma[]): Lemma[][] {
  const result: Lemma[][] = []
  for (let level = 0; level < LEVEL_COUNT; level++) {
    const words = selected.slice(level * LEVEL_SIZE, (level + 1) * LEVEL_SIZE)
    if (words.length) result.push(words)
  }
  return result
}
