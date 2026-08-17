// Reading the corpus's morphology back out in the Ajurrumiyya's own words.
//
// The corpus records what a word *is* — tag, features, case — in its own
// shorthand. This module turns that into the vocabulary the rest of the app
// teaches, because that is the whole point of the reader: every Quran app can
// say "genitive", and only one that shares your curriculum can say makhfud
// bi-l-kasra and send you to the Hurūf al-Khafd entry that taught it.
//
// Pure functions over corpus data and a Language. No content, no progress, no
// side effects — the Language is a parameter, never read from the database, so
// this module stays testable without one. `Lang` is a type-only import and is
// erased at compile time, so nothing here depends on the settings module at
// runtime.
//
// Every label defaults to English, which is why the existing callers and tests
// read unchanged: English is this module's canonical naming, and the Turkish
// is a second set beside it rather than a translation layer over it.

import type { CorpusSegment, CorpusToken } from '../content/corpus/types'
import type { Lang } from '../settings/useLang'

// ---------- iʿrāb ----------

/**
 * The four states of iʿrāb, plus the fifth case of a word that has none.
 * Named as the Ajurrumiyya names them: the third state is khafd here and in
 * the Reference, not jarr, so the reader and the grammar pages agree.
 */
export type IrabState = 'raf' | 'nasb' | 'khafd' | 'jazm' | 'mabni'

/*
 * The Turkish says mecrur where the English says makhfud, and harf-i cer where
 * it says preposition. This is the one place the two Languages name the same
 * thing after different roots, and it is deliberate: the matn's own term is
 * khafd, but Turkish grammar teaching says cer almost without exception, and a
 * reader who has to learn a second name for a state they already know has been
 * taught nothing. The English keeps khafd, so the Reference entry it links to
 * still agrees with it.
 */
const STATE_LABEL: Record<IrabState, Record<Lang, string>> = {
  raf: { english: 'marfūʿ', turkish: 'merfû' },
  nasb: { english: 'manṣūb', turkish: 'mansûb' },
  khafd: { english: 'makhfūḍ', turkish: 'mecrûr' },
  jazm: { english: 'majzūm', turkish: 'meczûm' },
  mabni: { english: 'mabnī', turkish: 'mebnî' },
}

/** The sign that shows the state, which is the half every reader gets wrong. */
export type IrabSign =
  | 'damma'
  | 'fatha'
  | 'kasra'
  | 'sukun'
  | 'waw'
  | 'alif'
  | 'ya'
  | 'thubut-nun'
  | 'hadhf-nun'
  | 'hadhf-illa'
  | 'muqaddara'

const SIGN_LABEL: Record<IrabSign, Record<Lang, string>> = {
  damma: { english: 'bi-ḍ-ḍamma', turkish: 'damme ile' },
  fatha: { english: 'bi-l-fatḥa', turkish: 'fetha ile' },
  kasra: { english: 'bi-l-kasra', turkish: 'kesra ile' },
  sukun: { english: 'bi-s-sukūn', turkish: 'sükûn ile' },
  waw: { english: 'bi-l-wāw', turkish: 'vav ile' },
  alif: { english: 'bi-l-alif', turkish: 'elif ile' },
  ya: { english: 'bi-l-yāʾ', turkish: 'ya ile' },
  'thubut-nun': { english: 'bi-thubūt an-nūn', turkish: 'nûnun sübûtu ile' },
  'hadhf-nun': { english: 'bi-ḥadhf an-nūn', turkish: 'nûnun hazfi ile' },
  'hadhf-illa': { english: 'bi-ḥadhf ḥarf al-ʿilla', turkish: 'illet harfinin hazfi ile' },
  muqaddara: { english: 'bi-ḍamma muqaddara', turkish: 'mukadder damme ile' },
}

/**
 * State and sign into one label.
 *
 * The order is not a formatting detail. Arabic and English both lead with the
 * state — "makhfud bi-l-kasra". Turkish is head-final and leads with the
 * instrument, so it reads "kesra ile mecrur". Composing per Language is the
 * only way to get a sentence rather than a word-for-word rendering of one.
 */
function joinIrab(state: string, sign: string, lang: Lang): string {
  return lang === 'turkish' ? `${sign} ${state}` : `${state} ${sign}`
}

/**
 * Signs each state can actually take. Anything else is the corpus and the
 * letters disagreeing, and then the state is reported without a sign rather
 * than a sign that cannot be true — "marfūʿ bi-l-kasra" would teach a mistake.
 *
 * The two entries that look wrong are the two famous exceptions the Reference
 * marks with (!): the sound feminine plural takes kasra in nasb, and the
 * diptote takes fatha in khafd.
 */
const ALLOWED: Record<IrabState, IrabSign[]> = {
  raf: ['damma', 'waw', 'alif', 'thubut-nun', 'muqaddara'],
  nasb: ['fatha', 'alif', 'ya', 'kasra', 'hadhf-nun', 'muqaddara'],
  khafd: ['kasra', 'ya', 'fatha'],
  jazm: ['sukun', 'hadhf-nun', 'hadhf-illa'],
  mabni: [],
}

export interface Irab {
  state: IrabState
  sign?: IrabSign
  /** What the reader shows, e.g. "makhfūḍ bi-l-kasra". */
  label: string
}

// ---------- the letters ----------

const DAMMA = 'ُ'
const FATHA = 'َ'
const KASRA = 'ِ'
const SUKUN = 'ْ'
const DAMMATAN = 'ٌ'
const FATHATAN = 'ً'
const KASRATAN = 'ٍ'
const SUPERSCRIPT_ALEF = 'ٰ'

/**
 * Every mark that can sit on a letter: harakat, tanwin, shadda, the superscript
 * alef, the Quranic annotation marks and tatweel. Written as codepoints for the
 * reason src/text/arabic.ts gives — a range of invisible combining marks inside
 * a character class cannot be reviewed.
 */
const MARK = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/

/** The weak letters. A verb ending in one hides its sign rather than showing it. */
const WEAK = new Set(['ا', 'و', 'ي', 'ى'])

/** The five nouns, by root: ab, akh, ham, fu, dhu. They take letters for signs. */
const FIVE_NOUN_ROOTS = new Set(['أبو', 'أخو', 'حمو', 'فوه', 'ذوو'])

function letters(form: string): string[] {
  return [...form].filter((c) => !MARK.test(c))
}

function lastLetter(form: string): string | undefined {
  const all = letters(form)
  return all[all.length - 1]
}

/**
 * The vowel that ends the word, searched from the end. Not simply the last
 * character: a word ending in tanwin writes the mark on the letter *before*
 * the silent alif, so reading the final character alone finds nothing.
 */
function finalHarakah(form: string): string | undefined {
  const vowels = new Set([
    DAMMA,
    FATHA,
    KASRA,
    SUKUN,
    DAMMATAN,
    FATHATAN,
    KASRATAN,
    SUPERSCRIPT_ALEF,
  ])
  for (let i = form.length - 1; i >= 0; i--) if (vowels.has(form[i])) return form[i]
  return undefined
}

function signOfHarakah(harakah: string | undefined): IrabSign | undefined {
  if (harakah === DAMMA || harakah === DAMMATAN) return 'damma'
  if (harakah === FATHA || harakah === FATHATAN) return 'fatha'
  if (harakah === KASRA || harakah === KASRATAN) return 'kasra'
  if (harakah === SUKUN) return 'sukun'
  return undefined
}

// ---------- features ----------

function has(segment: CorpusSegment, feature: string): boolean {
  return segment.features.includes(feature)
}

function valueOf(segment: CorpusSegment, prefix: string): string | undefined {
  const found = segment.features.find((f) => f.startsWith(`${prefix}:`))
  return found?.slice(prefix.length + 1)
}

function stateOf(segment: CorpusSegment): IrabState {
  // A particle governs a case without being in one: inna is tagged ACC because
  // it puts its ism in nasb, and inna itself is mabni on the fatha.
  if (segment.tag !== 'N' && segment.tag !== 'V') return 'mabni'
  if (has(segment, 'NOM')) return 'raf'
  if (has(segment, 'ACC')) return 'nasb'
  if (has(segment, 'GEN')) return 'khafd'
  const mood = valueOf(segment, 'MOOD')
  if (mood === 'IND') return 'raf'
  if (mood === 'SUBJ') return 'nasb'
  if (mood === 'JUS') return 'jazm'
  return 'mabni'
}

/**
 * The pronoun that follows the head of a word, when one does. It is what tells
 * a verb of the five (yafʿalūna, tafʿalīna) from a plain one: the corpus makes
 * the subject wāw a segment of its own, so the nūn that the state keeps or
 * drops is on that segment rather than on the verb.
 */
function suffixAfter(token: CorpusToken): CorpusSegment | undefined {
  const next = token.segments[token.head + 1]
  return next && has(next, 'PRON') && has(next, 'SUFF') ? next : undefined
}

function verbSign(token: CorpusToken, head: CorpusSegment, state: IrabState): IrabSign | undefined {
  const suffix = suffixAfter(token)
  // The five verbs: their sign is the nūn staying or dropping, and the corpus
  // writes that nūn on the pronoun segment.
  if (suffix && /[ويا]/.test(suffix.form)) {
    const keepsNun = suffix.form.includes('ن')
    if (state === 'raf' && keepsNun) return 'thubut-nun'
    if ((state === 'nasb' || state === 'jazm') && !keepsNun) return 'hadhf-nun'
  }

  if (state === 'jazm') {
    // A verb whose last root letter is weak drops it in jazm rather than
    // taking a sukun: lam yara, not lam yar'a.
    const rootEnd = head.root ? lastLetter(head.root) : undefined
    if (rootEnd && WEAK.has(rootEnd) && lastLetter(head.form) !== rootEnd) return 'hadhf-illa'
    return 'sukun'
  }

  const end = lastLetter(head.form)
  if (end && WEAK.has(end)) return 'muqaddara'
  return signOfHarakah(finalHarakah(head.form))
}

function nounSign(head: CorpusSegment): IrabSign | undefined {
  const form = head.form
  const plural = has(head, 'MP')
  const dual = has(head, 'FD') || has(head, 'MD') || has(head, 'D')

  /*
   * Letter signs first: they are written as letters, so the harakah at the end
   * of such a word belongs to the sign rather than being it.
   *
   * Each is gated on the number the corpus reports, because the ending alone
   * does not identify one. Din and miskin end in the same two letters as a
   * sound masculine plural and take a plain kasra; only musallin, which the
   * corpus tags MP, takes the ya. The corpus tags broken plurals MP too, but
   * a broken plural never carries these endings, so the pair together is exact.
   */
  if (plural && form.endsWith(`ون${FATHA}`)) return 'waw' // -una
  if (plural && form.endsWith(`ين${FATHA}`)) return 'ya' // -ina
  if (dual && form.endsWith(`ان${KASRA}`)) return 'alif' // -ani
  if (dual && form.endsWith(`ين${KASRA}`)) return 'ya' // -ayni

  const end = lastLetter(form)
  if (head.root && FIVE_NOUN_ROOTS.has(head.root)) {
    if (end === 'و') return 'waw'
    if (end === 'ا') return 'alif'
    if (end === 'ي' || end === 'ى') return 'ya'
  }
  if (dual && (end === 'ا' || end === 'ى')) return 'alif'

  return signOfHarakah(finalHarakah(form))
}

/**
 * The state of a Token and the sign that shows it — the one thing the reader
 * exists to say. Undefined only for a Token whose head carries nothing to
 * report, which does not happen in the corpus as shipped but is not worth
 * crashing over.
 */
export function irabOf(token: CorpusToken, lang: Lang = 'english'): Irab {
  const head = token.segments[token.head]
  const state = stateOf(head)
  
  if (state === 'mabni') return { state, label: STATE_LABEL.mabni[lang] }

  const raw = head.tag === 'V' ? verbSign(token, head, state) : nounSign(head)
  const sign = raw && ALLOWED[state].includes(raw) ? raw : undefined
  return {
    state,
    sign,
    label: sign
      ? joinIrab(STATE_LABEL[state][lang], SIGN_LABEL[sign][lang], lang)
      : STATE_LABEL[state][lang],
  }
}

// ---------- the rest of the morphology ----------

/*
 * Corpus feature tags, as the app names them. Ambiguous ones are read by tag.
 *
 * The Turkish is the vocabulary a Turkish sarf lesson uses, which is
 * Arabic-rooted almost throughout — zamir, sifat, nekre, mechul, ism-i mevsul.
 * That is the point rather than a side effect: naming a feature after the root
 * it comes from teaches the root while it labels the word.
 */
const FEATURE_LABEL: Record<string, Record<Lang, string>> = {
  DET: { english: 'definite article', turkish: 'harf-i tarif' },
  CONJ: { english: 'conjunction', turkish: 'atıf harfi' },
  NEG: { english: 'negation', turkish: 'nefiy harfi' },
  INTG: { english: 'interrogative', turkish: 'istifham harfi' },
  EQ: { english: 'equalizing hamza', turkish: 'tesviye hemzesi' },
  FUT: { english: 'future particle', turkish: 'istikbal harfi' },
  VOC: { english: 'vocative particle', turkish: 'nida harfi' },
  ATT: { english: 'particle of attention', turkish: 'tenbih harfi' },
  REM: { english: 'resumption', turkish: 'istinaf harfi' },
  RSLT: { english: 'result', turkish: 'cevap harfi' },
  DIST: { english: 'particle of distance', turkish: 'uzaklık lâmı' },
  ADDR: { english: 'particle of address', turkish: 'hitap kâfı' },
  PRON: { english: 'pronoun', turkish: 'zamir' },
  REL: { english: 'relative pronoun', turkish: 'ism-i mevsûl' },
  DEM: { english: 'demonstrative', turkish: 'ism-i işaret' },
  T: { english: 'adverb of time', turkish: 'zarf-ı zaman' },
  PN: { english: 'proper noun', turkish: 'ism-i alem' },
  ADJ: { english: 'adjective', turkish: 'sıfat' },
  VN: { english: 'maṣdar', turkish: 'masdar' },
  ACT_PCPL: { english: 'ism al-fāʿil', turkish: 'ism-i fâil' },
  PASS_PCPL: { english: 'ism al-mafʿūl', turkish: 'ism-i mef’ûl' },
  PERF: { english: 'māḍī', turkish: 'mâzî' },
  IMPF: { english: 'muḍāriʿ', turkish: 'muzâri' },
  IMPV: { english: 'amr', turkish: 'emir' },
  PASS: { english: 'passive', turkish: 'meçhul' },
  INDEF: { english: 'indefinite', turkish: 'nekre' },
}

/** Person, gender and number, as the corpus writes them on a verb or pronoun. */
const PERSON_LABEL: Record<string, Record<Lang, string>> = {
  '1S': { english: 'I', turkish: 'ben' },
  '1P': { english: 'we', turkish: 'biz' },
  '2MS': { english: 'you (m. sg.)', turkish: 'sen (müzekker müfred)' },
  '2FS': { english: 'you (f. sg.)', turkish: 'sen (müennes müfred)' },
  '2MP': { english: 'you (m. pl.)', turkish: 'siz (müzekker cemi)' },
  '2FP': { english: 'you (f. pl.)', turkish: 'siz (müennes cemi)' },
  '2D': { english: 'you (dual)', turkish: 'siz (tesniye)' },
  '3MS': { english: 'he', turkish: 'o (müzekker)' },
  '3FS': { english: 'she', turkish: 'o (müennes)' },
  '3MP': { english: 'they (m.)', turkish: 'onlar (müzekker)' },
  '3FP': { english: 'they (f.)', turkish: 'onlar (müennes)' },
  '3D': { english: 'they (dual)', turkish: 'o ikisi (tesniye)' },
}

/** Gender and number on a noun. The same letters mean other things on a verb. */
const NUMBER_LABEL: Record<string, Record<Lang, string>> = {
  M: { english: 'masculine', turkish: 'müzekker' },
  F: { english: 'feminine', turkish: 'müennes' },
  MS: { english: 'masculine singular', turkish: 'müzekker müfred' },
  FS: { english: 'feminine singular', turkish: 'müennes müfred' },
  MD: { english: 'masculine dual', turkish: 'müzekker tesniye' },
  FD: { english: 'feminine dual', turkish: 'müennes tesniye' },
  MP: { english: 'masculine plural', turkish: 'müzekker cemi' },
  FP: { english: 'feminine plural', turkish: 'müennes cemi' },
  P: { english: 'plural', turkish: 'cemi' },
  D: { english: 'dual', turkish: 'tesniye' },
}

/** `P` names the prepositions on a particle and the plural on a noun. */
const P_LABEL: Record<'harf' | 'ism', Record<Lang, string>> = {
  harf: { english: 'preposition', turkish: 'harf-i cer' },
  ism: { english: 'plural', turkish: 'cemi' },
}

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/** Turkish teaches the augmented verb forms as babs, and counts them the same. */
function formLabel(roman: string, lang: Lang): string {
  return lang === 'turkish' ? `${roman}. bâb` : `Form ${roman}`
}

/**
 * The corpus gives a pronoun no lemma — neither the attached ones nor the
 * detached huwa and antum — so a pronoun would be the one word in the reader
 * with nothing to say when tapped, and huwa opens al-Ikhlas.
 *
 * Deriving the meaning from the person tag rather than adding it to the gloss
 * table is what keeps it honest: a pronoun means exactly its person, gender
 * and number, and the corpus states all three.
 */
const PRONOUN_GLOSS: Record<string, { english: string; turkish: string }> = {
  '1S': { english: 'I, me, my', turkish: 'ben, beni, benim' },
  '1P': { english: 'we, us, our', turkish: 'biz, bizi, bizim' },
  '2MS': { english: 'you, your (m. sg.)', turkish: 'sen, senin' },
  '2FS': { english: 'you, your (f. sg.)', turkish: 'sen, senin' },
  '2MP': { english: 'you, your (m. pl.)', turkish: 'siz, sizin' },
  '2FP': { english: 'you, your (f. pl.)', turkish: 'siz, sizin' },
  '2D': { english: 'you two, your (dual)', turkish: 'siz ikiniz' },
  '3MS': { english: 'he, him, his, it', turkish: 'o, onu, onun' },
  '3FS': { english: 'she, her, it', turkish: 'o, onu, onun' },
  '3MP': { english: 'they, them, their (m.)', turkish: 'onlar, onları, onların' },
  '3FP': { english: 'they, them, their (f.)', turkish: 'onlar, onları, onların' },
  '3D': { english: 'they two, their (dual)', turkish: 'o ikisi' },
}

export function pronounGloss(
  segment: CorpusSegment,
): { english: string; turkish: string } | undefined {
  if (!has(segment, 'PRON')) return undefined
  const person = segment.features.find((f) => f in PRONOUN_GLOSS)
  return person ? PRONOUN_GLOSS[person] : undefined
}

/** The Ajurrumiyya's three-way division, from the corpus's coarse tag. */
export function partOfSpeechOf(segment: CorpusSegment): 'ism' | 'fil' | 'harf' {
  if (segment.tag === 'V') return 'fil'
  if (segment.tag === 'P') return 'harf'
  return 'ism'
}

export interface SegmentDescription {
  /** 'prefix' and 'suffix' are the clitics; 'stem' is the word itself. */
  role: 'prefix' | 'stem' | 'suffix'
  partOfSpeech: 'ism' | 'fil' | 'harf'
  /** Short phrases naming what the segment is, in reading order. */
  traits: string[]
}

export function describeSegment(
  segment: CorpusSegment,
  lang: Lang = 'english',
): SegmentDescription {
  const traits: string[] = []
  for (const feature of segment.features) {
    if (feature === 'PREF' || feature === 'SUFF') continue
    if (feature === 'P') {
      traits.push(segment.tag === 'P' ? P_LABEL.harf[lang] : P_LABEL.ism[lang])
      continue
    }
    const named = (FEATURE_LABEL[feature] ?? PERSON_LABEL[feature] ?? NUMBER_LABEL[feature])?.[
      lang
    ]
    if (named) {
      traits.push(named)
      continue
    }
    const form = feature.startsWith('VF:') ? Number(feature.slice(3)) : undefined
    if (form && ROMAN[form]) traits.push(formLabel(ROMAN[form], lang))
    // NOM/ACC/GEN/MOOD are the iʿrāb, reported on their own; FAM names the
    // family a word belongs to, which the reference link says better than a
    // trait would.
  }
  return {
    role: has(segment, 'PREF') ? 'prefix' : has(segment, 'SUFF') ? 'suffix' : 'stem',
    partOfSpeech: partOfSpeechOf(segment),
    traits,
  }
}

// ---------- into the Reference ----------

/**
 * The Reference entry that teaches what this Token is doing — the reason the
 * reader exists. Every Quran app shows a root and a part of speech; this is
 * the one that can say "makhfūḍ bi-l-kasra, read Hurūf al-Khafd" and land on a
 * page written in the learner's own curriculum.
 *
 * `taught` is the `referenceId` of the Note that teaches the head Lemma, when
 * a Deck teaches it. It wins for a particle, where the authored link names the
 * exact harf rather than the class it belongs to. Read only: nothing here ever
 * writes or schedules a Card.
 */
export function referenceFor(token: CorpusToken, taught?: string): string | undefined {
  const head = token.segments[token.head]

  const family = valueOf(head, 'FAM')
  if (family) {
    // The corpus names the family by its head word; kana's is the only one of
    // the two whose members conjugate, so the two entries are told apart by
    // the tag rather than by matching the Arabic.
    return head.tag === 'V' ? 'kana-wa-akhawatuha' : 'inna-wa-akhawatuha'
  }

  if (head.tag === 'V') {
    const mood = valueOf(head, 'MOOD')
    if (mood === 'JUS') return 'jawazim-al-fil'
    if (mood === 'SUBJ') return 'nawasib-al-fil'
    return 'verb-conjugation'
  }

  if (has(head, 'PRON')) return has(head, 'SUFF') ? 'damair' : 'damair#munfasil'

  if (head.tag === 'P') return taught ?? 'parts-of-speech'

  if (stateOf(head) !== 'mabni') return 'irab-signs'
  return 'parts-of-speech'
}

/** Route for a `referenceId`, matching how card backs link into Reference. */
export function referenceLink(referenceId: string): string {
  const [entry, anchor] = referenceId.split('#')
  return anchor ? `/reference/${entry}?h=${anchor}` : `/reference/${entry}`
}
