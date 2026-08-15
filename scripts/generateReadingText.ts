// Reading corpus generator. Emits the per-surah JSON the Reading tab
// lazy-loads, from the vendored Tanzil text and the vendored Quranic Arabic
// Corpus morphology. See GitHub issue #13.
//
// Driven by generateReadingText.test.ts under vitest — see the header there,
// and tsconfig.scripts.json for why curation scripts run that way. It is never
// part of `pnpm build`: a repeatable build step would make builds depend on
// the vendored corpus, and the whole point of committing the output is that a
// corpus change arrives as a reviewable git diff.
//
// Reproducible by construction: no network, no clock, no randomness. Rerunning
// it on unchanged sources produces no diff.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { decks } from '../src/content/decks'
import { readingTexts } from '../src/content/corpus'
import type {
  CorpusAyah,
  CorpusLemma,
  CorpusLemmas,
  CorpusLine,
  CorpusSegment,
  CorpusSurah,
  CorpusToken,
} from '../src/content/corpus/types'
import type { Meaning, Note, PartOfSpeech } from '../src/content/types'
import { hurufAlKhafdRef } from '../src/content/reference/hurufAlKhafd'
import { READING_GLOSSES } from './readingGlosses'

const DATA = join(import.meta.dirname, 'data')
const MORPHOLOGY = join(DATA, 'quran-morphology.txt')
const TANZIL = join(DATA, 'quran-uthmani.txt')

/** The basmala is ayah 1 of al-Fatiha, and the heading of every surah but at-Tawba. */
const BASMALA_SURAH = 1
const BASMALA_AYAH = 1
const NO_BASMALA = 9

/**
 * Quranic annotation marks: waqf signs, the small high seen, the sajda mark.
 * Tanzil sets some of them off by spaces, so a whitespace-separated chunk can
 * be nothing but marks. Those are not words and the morphology has no row for
 * them; they stay in the text and get no Token.
 *
 * Written as codepoints for the same reason src/text/arabic.ts does: these are
 * invisible marks, and a range of them inside a character class cannot be read.
 */
const MARKS_ONLY = /^[\u06D6-\u06ED]+$/

// ---------- vendored sources ----------

export interface Row {
  surah: number
  ayah: number
  /** 1-indexed position of the word in its ayah. */
  word: number
  form: string
  tag: string
  features: string[]
  lemma?: string
  root?: string
  /** The segment is a clitic (prefix or suffix), not a standalone word. */
  affix: boolean
}

const LEM = /^LEM:(.+)$/
const ROOT = /^ROOT:(.+)$/

/**
 * The morphology file, one Row per segment, in corpus order. The vocabulary
 * generator parses the same file into a lemma index instead; reading needs the
 * rows in text order and needs the raw feature tags, which that index drops.
 */
export function parseMorphology(text: string): Row[] {
  const rows: Row[] = []
  for (const line of text.split('\n')) {
    if (!line) continue
    const [location, form, tag, features] = line.split('\t')
    if (!features) continue
    const [surah, ayah, word] = location.split(':').map(Number)
    const fields = features.split('|')
    rows.push({
      surah,
      ayah,
      word,
      form,
      tag,
      features: fields.filter((f) => !LEM.test(f) && !ROOT.test(f)),
      lemma: fields.map((f) => LEM.exec(f)?.[1]).find(Boolean),
      root: fields.map((f) => ROOT.exec(f)?.[1]).find(Boolean),
      affix: fields.includes('PREF') || fields.includes('SUFF'),
    })
  }
  return rows
}

/** The Tanzil text, keyed "surah:ayah". Lines that are not `s|a|text` are the licence block. */
export function parseTanzil(text: string): Map<string, string> {
  const ayat = new Map<string, string>()
  for (const line of text.split('\n')) {
    const match = /^(\d+)\|(\d+)\|(.*)$/.exec(line)
    if (!match) continue
    ayat.set(`${Number(match[1])}:${Number(match[2])}`, match[3])
  }
  return ayat
}

export function load(): { rows: Row[]; ayat: Map<string, string> } {
  return {
    rows: parseMorphology(readFileSync(MORPHOLOGY, 'utf8')),
    ayat: parseTanzil(readFileSync(TANZIL, 'utf8')),
  }
}

// ---------- tokenizing ----------

interface Chunk {
  text: string
  start: number
  end: number
}

/** Whitespace-separated chunks of a line, with their offsets into it. */
export function chunks(text: string): Chunk[] {
  const found: Chunk[] = []
  const pattern = /\S+/g
  for (let m = pattern.exec(text); m; m = pattern.exec(text)) {
    found.push({ text: m[0], start: m.index, end: m.index + m[0].length })
  }
  return found
}

function segmentOf(row: Row): CorpusSegment {
  const segment: CorpusSegment = { form: row.form, tag: row.tag, features: row.features }
  if (row.lemma) segment.lemma = row.lemma
  if (row.root) segment.root = row.root
  return segment
}

/**
 * Index in `segments` of the segment a Token's gloss hangs on: the first that
 * is a word rather than a clitic. Falling back to the first segment carrying a
 * lemma covers the attached pronouns, which the corpus leaves lemma-less.
 */
export function headSegment(rows: Row[]): number {
  const standalone = rows.findIndex((r) => !r.affix && r.lemma)
  if (standalone >= 0) return standalone
  const lemmatized = rows.findIndex((r) => r.lemma)
  return lemmatized >= 0 ? lemmatized : 0
}

/**
 * Lay the morphology's words over the Tanzil line, so that every Token points
 * at the exact span of the stored text it annotates.
 *
 * Both sides are checked rather than trusted. The corpus segments a word into
 * its clitics and the text writes them joined, so a word's segments must
 * concatenate to exactly the chunk of text they claim — if they ever do not,
 * the two sources have drifted and the generator must stop rather than emit
 * offsets that point at the wrong letters.
 */
export function tokenize(text: string, rows: Row[], where: string): CorpusToken[] {
  const words = new Map<number, Row[]>()
  for (const row of rows) {
    const list = words.get(row.word)
    if (list) list.push(row)
    else words.set(row.word, [row])
  }
  const ordered = [...words.keys()].sort((a, b) => a - b).map((w) => words.get(w)!)
  const spans = chunks(text).filter((c) => !MARKS_ONLY.test(c.text))

  if (spans.length !== ordered.length) {
    throw new Error(
      `${where}: text has ${spans.length} words, morphology has ${ordered.length}`,
    )
  }

  return spans.map((span, i) => {
    const wordRows = ordered[i]
    const joined = wordRows.map((r) => r.form).join('')
    if (joined !== span.text) {
      throw new Error(`${where} word ${i + 1}: text "${span.text}" vs morphology "${joined}"`)
    }
    return {
      start: span.start,
      end: span.end,
      head: headSegment(wordRows),
      segments: wordRows.map(segmentOf),
    }
  })
}

// ---------- surahs ----------

function rowsOf(rows: Row[], surah: number, ayah: number): Row[] {
  return rows.filter((r) => r.surah === surah && r.ayah === ayah)
}

/**
 * Split the basmala off ayah 1. Tanzil prefixes it to the first ayah of every
 * surah but al-Fatiha, where it is ayah 1 in its own right, and at-Tawba,
 * which has none; the morphology numbers the ayah's own words from 1 either
 * way. Its Tokens come from al-Fatiha 1:1, whose text is the same string.
 */
export function splitBasmala(
  line: string,
  basmala: string,
  surah: number,
): { basmala?: string; text: string } {
  if (surah === BASMALA_SURAH || surah === NO_BASMALA) return { text: line }
  const prefix = `${basmala} `
  if (!line.startsWith(prefix)) {
    throw new Error(`surah ${surah} ayah 1 does not open with the basmala`)
  }
  return { basmala, text: line.slice(prefix.length) }
}

export function buildSurah(surah: number, rows: Row[], ayat: Map<string, string>): CorpusSurah {
  const basmalaText = ayat.get(`${BASMALA_SURAH}:${BASMALA_AYAH}`)
  if (!basmalaText) throw new Error('the Tanzil text has no 1:1')

  const numbers = [...new Set(rows.filter((r) => r.surah === surah).map((r) => r.ayah))].sort(
    (a, b) => a - b,
  )

  let basmala: CorpusLine | undefined
  const built: CorpusAyah[] = []
  for (const ayah of numbers) {
    const line = ayat.get(`${surah}:${ayah}`)
    if (line === undefined) throw new Error(`the Tanzil text has no ${surah}:${ayah}`)
    const where = `${surah}:${ayah}`

    let text = line
    if (ayah === 1) {
      const split = splitBasmala(line, basmalaText, surah)
      text = split.text
      if (split.basmala !== undefined) {
        basmala = {
          text: split.basmala,
          tokens: tokenize(
            split.basmala,
            rowsOf(rows, BASMALA_SURAH, BASMALA_AYAH),
            `${surah} basmala`,
          ),
        }
      }
    }
    built.push({ ayah, text, tokens: tokenize(text, rowsOf(rows, surah, ayah), where) })
  }

  const surahRef = readingTexts.find((t) => t.surah === surah)
  if (surahRef && surahRef.ayat !== built.length) {
    throw new Error(
      `surah ${surah}: catalogue says ${surahRef.ayat} ayat, corpus has ${built.length}`,
    )
  }

  return basmala ? { surah, basmala, ayat: built } : { surah, ayat: built }
}

// ---------- the lemma dictionary ----------

/**
 * Lemmas the Huruf al-Khafd deck teaches, whose Note `arabic` is a display
 * form rather than the corpus lemma — the prefixed particles are listed by the
 * name of their letter, and min and an are written with their sukun. Every
 * other taught lemma matches a Note's `arabic` exactly, because the vocabulary
 * track's headwords were generated from these same lemmas.
 *
 * The oath particles are deliberately absent: the corpus lemma for the waw is
 * the conjunction, not the oath, and mapping one to the other would mark a
 * word known that the learner has not met.
 *
 * Sense cards are not mapped either. They are keyed by sense rather than by
 * word, and the coverage metric already treats them the same way — a Sense
 * graduating is not the word being known.
 */
export const HURUF_LEMMAS: Record<string, string> = {
  مِن: 'min',
  عَن: 'an',
  رُبَّ: 'rubba',
  ب: 'ba',
  ك: 'kaf',
  ل: 'lam',
}

/**
 * Match key for an Arabic string written by two different hands.
 *
 * The corpus writes a shadda *before* the vowel it doubles; Unicode's
 * canonical order puts it after. The two are byte-different and render
 * identically, so a lemma typed here — a gloss key, a mapping above — never
 * matches its corpus form until both sides are normalized. Only lookups are
 * normalized: what gets stored keeps the corpus's own bytes, because verbatim
 * is the whole promise of the text.
 */
export function matchKey(arabic: string): string {
  return arabic.normalize('NFC')
}

/** Notes by the Arabic form they are listed under, across every deck. */
export function notesByForm(): Map<string, Note> {
  const byForm = new Map<string, Note>()
  for (const deck of decks) {
    for (const note of deck.notes) {
      const key = matchKey(note.arabic)
      if (!byForm.has(key)) byForm.set(key, note)
    }
  }
  return byForm
}

/** Notes by id, across every deck. */
export function notesById(): Map<string, Note> {
  const byId = new Map<string, Note>()
  for (const deck of decks) for (const note of deck.notes) byId.set(note.id, note)
  return byId
}

/**
 * The headline gloss of each harf, by the id `HURUF_LEMMAS` maps a lemma to.
 *
 * Not the note's meaning, which is the *sense* the card teaches: the note
 * behind `min` is its primary sense and reads "Starting point of place or
 * time", a definition rather than a gloss. A reader tapping a word wants the
 * word, so the RefHarf's own Meaning is what belongs beside it — and being the
 * only place that gloss is now written, it cannot drift from anything.
 */
export function harfGlosses(): Map<string, Meaning> {
  const byId = new Map<string, Meaning>()
  for (const section of hurufAlKhafdRef.sections) {
    if (section.kind !== 'harf') continue
    byId.set(section.id, { english: section.english, turkish: section.turkish })
  }
  return byId
}

/**
 * Feature tags that name a particle class and nothing else. A lemma every one
 * of whose occurrences carries one is a harf whatever its coarse tag says: the
 * interrogative hamza is tagged as a noun throughout.
 *
 * `P` is deliberately not here even though it marks the prepositions. On a
 * noun the same letter means plural — Quraysh is tagged `PN|P|GEN` — so
 * reading it as a particle would make a proper noun a harf. The coarse tag
 * below already covers the prepositions.
 */
const PARTICLE_FEATURES = new Set(['NEG', 'INTG', 'EQ', 'CONJ', 'DET', 'FUT', 'VOC', 'ATT'])

export function partOfSpeech(rows: Row[]): PartOfSpeech {
  if (rows.every((r) => r.features.some((f) => PARTICLE_FEATURES.has(f)))) return 'harf'
  const counts = new Map<string, number>()
  for (const row of rows) counts.set(row.tag, (counts.get(row.tag) ?? 0) + 1)
  const dominant = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0]
  if (dominant === 'V') return 'fil'
  if (dominant === 'P') return 'harf'
  return 'ism'
}

/**
 * Gloss every Lemma the built surahs use, once. A Lemma a Deck teaches takes
 * that Note's authored Meaning and says so; the rest take machine-written text
 * from readingGlosses.ts and say that instead. Copying rather than linking is
 * what makes the corpus files self-contained and reviewable on their own — the
 * test run checks that a copied Meaning still matches its Note.
 */
export function buildLemmas(rows: Row[]): CorpusLemmas {
  const byLemma = new Map<string, Row[]>()
  for (const row of rows) {
    if (!row.lemma) continue
    const list = byLemma.get(row.lemma)
    if (list) list.push(row)
    else byLemma.set(row.lemma, [row])
  }

  const byForm = notesByForm()
  const byId = notesById()
  const glosses = harfGlosses()
  const huruf = new Map(
    Object.entries(HURUF_LEMMAS).map(([lemma, noteId]) => [matchKey(lemma), noteId]),
  )
  const lemmas: CorpusLemmas = {}
  for (const lemma of [...byLemma.keys()].sort()) {
    const occurrences = byLemma.get(lemma)!
    const hurufId = huruf.get(matchKey(lemma))
    const note = hurufId ? byId.get(hurufId) : byForm.get(matchKey(lemma))
    if (hurufId && !note) throw new Error(`no note "${hurufId}" for lemma ${lemma}`)
    // A sense note is glossed by its harf's entry, everything else by the note
    // itself. Keyed on the note rather than on HURUF_LEMMAS because most harfs
    // are matched by form and never go through that table at all.
    // `noteId` stays the note either way: it is what marks a word known.
    const harfId = note?.sense?.harfId
    const gloss = harfId ? glosses.get(harfId) : note
    if (harfId && !gloss) throw new Error(`no harf gloss for "${harfId}"`)

    const root = occurrences.map((r) => r.root).find(Boolean)
    const entry: CorpusLemma = note
      ? {
          pos: partOfSpeech(occurrences),
          english: gloss!.english,
          turkish: gloss!.turkish,
          glossSource: 'deck',
          noteId: note.id,
        }
      : {
          pos: partOfSpeech(occurrences),
          ...glossFor(lemma),
          glossSource: 'generated',
        }
    if (root) entry.root = root
    lemmas[lemma] = entry
  }
  return lemmas
}

/** The gloss table, keyed for matching. Built once: it is read per lemma. */
const glosses = new Map(
  Object.entries(READING_GLOSSES).map(([lemma, gloss]) => [matchKey(lemma), gloss]),
)

function glossFor(lemma: string): { english: string; turkish: string } {
  const gloss = glosses.get(matchKey(lemma))
  if (!gloss) {
    throw new Error(
      `no gloss for lemma ${lemma}: no deck teaches it, so add it to scripts/readingGlosses.ts`,
    )
  }
  return { english: gloss.english, turkish: gloss.turkish }
}

/** Gloss keys no built Lemma reached: a typo, or a word a Deck now teaches. */
export function unusedGlosses(lemmas: CorpusLemmas): string[] {
  const generated = new Set(
    Object.entries(lemmas)
      .filter(([, l]) => l.glossSource === 'generated')
      .map(([lemma]) => matchKey(lemma)),
  )
  return Object.keys(READING_GLOSSES).filter((lemma) => !generated.has(matchKey(lemma)))
}

// ---------- emit ----------

export interface Generated {
  surahs: CorpusSurah[]
  lemmas: CorpusLemmas
}

export function generate(): Generated {
  const { rows, ayat } = load()
  const surahs = readingTexts.map((text) => buildSurah(text.surah, rows, ayat))

  // Only the rows the reader actually ships are glossed, the basmala included.
  const used = new Set<string>()
  for (const surah of surahs) {
    const lines: CorpusLine[] = surah.basmala ? [surah.basmala, ...surah.ayat] : surah.ayat
    for (const line of lines) {
      for (const token of line.tokens) {
        for (const segment of token.segments) if (segment.lemma) used.add(segment.lemma)
      }
    }
  }

  return { surahs, lemmas: buildLemmas(rows.filter((r) => r.lemma && used.has(r.lemma))) }
}

/** Stable, diffable JSON: two-space indent and a trailing newline, as Prettier writes it. */
export function toJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`
}
