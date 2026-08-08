// Quran vocabulary scaffold generator. A one-shot curation tool, not part of
// the app and not part of the normal test run. See GitHub issue #8.
//
// Driven by generateVocab.test.ts, which runs it under vitest — see the header
// there, and tsconfig.scripts.json for why curation scripts run that way.
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
  /**
   * Absent on segments the corpus gives no lemma, mostly the attached
   * pronouns. Those are kept anyway: a word is only whole when every one of
   * its segments is joined back together.
   */
  lemma?: string
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
    const [surah, ayah, word] = location.split(':').map(Number)
    segments.push({
      surah,
      ayah,
      word,
      form,
      tag,
      lemma: LEM.exec(features)?.[1],
      root: ROOT.exec(features)?.[1],
      affix: AFFIX.test(features),
    })
  }
  return segments
}

export function indexLemmas(segments: Segment[]): Map<string, Lemma> {
  const byLemma = new Map<string, Lemma & { tags: Map<string, number>; formCounts: Map<string, number> }>()
  for (const seg of segments) {
    if (!seg.lemma) continue
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
 * the definite article al-, the conjunctions wa- and fa-, the attached
 * pronouns. Exactly 13 lemmas are filtered out here, and every one of them is
 * 100% affix — there is no judgement call in the threshold.
 */
export function isStandaloneWord(lemma: Lemma): boolean {
  return lemma.occurrences.some((seg) => !seg.affix)
}

/**
 * Words already taught by an existing deck, as normalized Arabic. Matching is
 * on `drillAnswer ?? arabic` so the prefix particles, whose display form names
 * the letter ("al-ba'u"), are matched by their bare particle.
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
  /**
   * The whole word as written in the ayah, which is the token to highlight.
   * Not the lemma's segment alone: a segment is often half a word — the stem
   * of a verb without its subject suffix, a noun without its article — and
   * highlighting half a word renders as a broken mark.
   */
  form: string
  words: number
  /** Clitics attached to the target word. Fewer is a cleaner example. */
  attached: number
  /** True when the ayah exceeds MAX_AYAH_WORDS and must be quoted as a clause. */
  fragment: boolean
}

/** Every segment of the ayah's words, keyed "surah:ayah:word". */
export function indexWords(segments: Segment[]): Map<string, Segment[]> {
  const words = new Map<string, Segment[]>()
  for (const seg of segments) {
    const key = `${seg.surah}:${seg.ayah}:${seg.word}`
    const list = words.get(key)
    if (list) list.push(seg)
    else words.set(key, [seg])
  }
  return words
}

/**
 * Pick the ayah to quote for a lemma. In order of priority:
 *
 *  1. the ayah fits without being cut to a fragment,
 *  2. the fewest clitics are attached to the word — a lemma fused into another
 *     word teaches badly, which is why "ma" is not taught from "'amma",
 *  3. the ayah is short, since it is read in full on every review,
 *  4. the passage is one the learner already recites.
 */
export function chooseAyah(
  lemma: Lemma,
  lengths: Map<string, number>,
  words: Map<string, Segment[]>,
): AyahChoice | undefined {
  const rank = (c: AyahChoice): number[] => [
    c.fragment ? 1 : 0,
    c.attached,
    c.words,
    isFamiliar(c.surah, c.ayah) ? 0 : 1,
  ]

  let best: AyahChoice | undefined
  for (const seg of lemma.occurrences) {
    if (seg.affix) continue
    const wordSegments = words.get(`${seg.surah}:${seg.ayah}:${seg.word}`) ?? [seg]
    const count = lengths.get(`${seg.surah}:${seg.ayah}`) ?? Infinity
    const candidate: AyahChoice = {
      surah: seg.surah,
      ayah: seg.ayah,
      form: wordSegments.map((s) => s.form).join(''),
      words: count,
      attached: wordSegments.length - 1,
      fragment: count > MAX_AYAH_WORDS,
    }
    if (!best) {
      best = candidate
      continue
    }
    const [a, b] = [rank(candidate), rank(best)]
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) continue
      if (a[i] < b[i]) best = candidate
      break
    }
  }
  return best
}

// ---------- entry point ----------

export function load(): { segments: Segment[]; index: Map<string, Lemma> } {
  const segments = parseMorphology(readFileSync(MORPHOLOGY, 'utf8'))
  return { segments, index: indexLemmas(segments) }
}

// ---------- ayah text ----------

// The displayed ayah is fetched from api.alquran.cloud, the same canonical
// source checkCitations.test.ts verifies against — deliberately not
// reconstructed from the corpus, so generation and verification stay
// independent. The API rate-limits bursts, so requests are serialized.
let queue: Promise<unknown> = Promise.resolve()
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * The uthmani edition prefixes the basmala to the first ayah of every surah
 * except al-Fatiha, where it is ayah 1 in its own right, and at-Tawba, which
 * has none. Left in, it would head half the cards in level 1 and make the
 * quoted ayah far longer than its word count promised.
 */
export function stripBasmala(text: string, surah: number, ayah: number): string {
  if (ayah !== 1 || surah === 1) return text
  // Fold the alef variants: the edition writes the wasla, the plain spelling
  // does not, and without folding the prefix never matches.
  const letters = (s: string) => s.replace(/[ً-ٰۖ-ۭـ]/g, '').replace(/[ٱآأإ]/g, 'ا')
  const basmala = 'بسم الله الرحمن الرحيم'
  const stripped = letters(text).replace(/\s+/g, ' ')
  if (!stripped.startsWith(letters(basmala).replace(/\s+/g, ' '))) return text
  // Cut at the fourth word boundary of the original, which the basmala spans.
  const parts = text.split(/\s+/)
  return parts.slice(4).join(' ')
}

export async function fetchAyah(surah: number, ayah: number): Promise<string> {
  const job = queue.then(async () => {
    for (let attempt = 1; ; attempt++) {
      const res = await fetch(
        `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/quran-uthmani`,
      )
      if (res.ok) {
        const body = (await res.json()) as { data?: { text?: string } }
        const text = body.data?.text
        if (!text) throw new Error(`no text for ${surah}:${ayah}`)
        return text
      }
      if (res.status !== 429 || attempt >= 6)
        throw new Error(`HTTP ${res.status} for ${surah}:${ayah}`)
      await sleep(1000 * attempt)
    }
  })
  queue = job.then(() => sleep(250), () => sleep(250))
  return job
}

/** Corpus tag to the Ājurrūmiyya's division. N covers adjectives too. */
export function partOfSpeech(tag: string): 'ism' | 'fil' | 'harf' {
  if (tag === 'V') return 'fil'
  if (tag === 'P') return 'harf'
  return 'ism'
}

/**
 * A transliterated, unique, stable note id. Arabic ids would be unreadable in
 * card ids, review logs and export files, all of which are read by eye.
 */
export function noteId(lemma: string, taken: Set<string>): string {
  // Short vowels are transliterated too: consonant skeletons alone collide
  // ('alima and lam both reduce to "lm") and cannot be read back.
  // The hamza carriers and ayn contribute nothing on their own: the harakat
  // that follows supplies the vowel, so mapping them to a letter would double
  // it ("anzala" would come out "aanzala").
  const consonants: Record<string, string> = {
    ء: '', أ: '', إ: '', ٱ: '', ؤ: '', ئ: '', ع: '',
    ا: 'a', آ: 'a', ى: 'a', ة: '',
    ب: 'b', ت: 't', ث: 'th', ج: 'j', ح: 'h', خ: 'kh', د: 'd', ذ: 'dh',
    ر: 'r', ز: 'z', س: 's', ش: 'sh', ص: 's', ض: 'd', ط: 't', ظ: 'z',
    غ: 'gh', ف: 'f', ق: 'q', ك: 'k', ل: 'l', م: 'm', ن: 'n', ه: 'h',
    و: 'w', ي: 'y',
  }
  const vowels: Record<string, string> = {
    'َ': 'a', 'ِ': 'i', 'ُ': 'u', 'ٰ': 'a',
    'ً': 'an', 'ٍ': 'in', 'ٌ': 'un', 'ْ': '',
  }

  let out = ''
  let lastConsonant = ''
  for (const ch of lemma) {
    if (ch === 'ّ') {
      out += lastConsonant // shadda doubles the consonant just written
      continue
    }
    const vowel = vowels[ch]
    if (vowel !== undefined) {
      out += vowel
      continue
    }
    const consonant = consonants[ch] ?? ''
    out += consonant
    if (consonant && consonant !== 'a') lastConsonant = consonant
  }
  // A word written with a doubled letter *and* a shadda triples it.
  const base =
    out.replace(/([a-z])\1{2,}/g, '$1$1').replace(/^-+|-+$/g, '') || 'word'
  let id = base
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`
  taken.add(id)
  return id
}

export interface Scaffold {
  id: string
  arabic: string
  partOfSpeech: string
  root?: string
  occurrences: number
  occurringForm: string
  ayahArabic: string
  source: string
  fragment: boolean
}

/**
 * Note ids already used by any deck. Card ids are `noteId|direction` and the
 * card-state table is keyed on that, with no deck in the key: two decks
 * sharing a note id would share one learner's scheduling state.
 */
export function existingNoteIds(): Set<string> {
  const ids = new Set<string>()
  for (const deck of decks) for (const note of deck.notes) ids.add(note.id)
  return ids
}

export async function scaffoldLevel(
  lemmas: Lemma[],
  lengths: Map<string, number>,
  words: Map<string, Segment[]>,
): Promise<Scaffold[]> {
  const taken = existingNoteIds()
  const out: Scaffold[] = []
  for (const lemma of lemmas) {
    const choice = chooseAyah(lemma, lengths, words)
    if (!choice) throw new Error(`no ayah for ${lemma.lemma}`)
    out.push({
      id: noteId(lemma.lemma, taken),
      arabic: lemma.lemma,
      partOfSpeech: partOfSpeech(lemma.tag),
      root: lemma.root,
      occurrences: lemma.count,
      occurringForm: choice.form,
      ayahArabic: stripBasmala(
        await fetchAyah(choice.surah, choice.ayah),
        choice.surah,
        choice.ayah,
      ),
      source: `Qur'an ${choice.surah}:${choice.ayah}`,
      fragment: choice.fragment,
    })
  }
  return out
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
