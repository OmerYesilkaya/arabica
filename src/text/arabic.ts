// Arabic text helpers. Pure string functions, no content and no side effects.

// Tashkeel (harakat) spans U+064B-U+065F, plus the superscript alef U+0670.
// Tatweel (kashida) U+0640 is a decorative stretch, not a letter, so it goes
// with the vowels.
//
// U+06D6-U+06ED are the Qur'anic annotation marks: waqf signs, the small high
// seen, the small low meem. Mushaf orthography sets them between letters, so
// leaving them in breaks letter-level comparison - a word quoted from an ayah
// stops matching the same word written plainly.
//
// Written as codepoints rather than literals: these are invisible combining
// marks, and a range of them inside a character class cannot be reviewed.
const TASHKEEL = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g
const TATWEEL = /\u0640/g

/**
 * The same set as TASHKEEL + TATWEEL, as a single non-global class. Kept
 * separate because `.test()` on a /g regex advances lastIndex between calls.
 */
const MARK = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/

/** Remove tashkeel and tatweel. Letters and all other characters are kept. */
export function stripTashkeel(text: string): string {
  return text.replace(TASHKEEL, '').replace(TATWEEL, '')
}

/**
 * Normalize an Arabic string for lenient answer comparison in drills.
 *
 * Steps, in order:
 *  1. strip tashkeel and tatweel (vowels are not required when typing),
 *  2. fold the hamza carriers to their bare letter: hamza on alef, on waw and
 *     on ya become plain alef, waw and ya,
 *  3. fold alef maqsura to ya, so a typed "ila" matches the written one,
 *  4. fold ta marbuta to ha (see the decision below),
 *  5. collapse runs of whitespace to a single space and trim the ends.
 *
 * Ta marbuta vs ha: we fold ta marbuta to ha. On a phone keyboard the learner
 * reaches ta marbuta with a long-press and often types the plain ha instead,
 * and the two look and sound close once vowels are dropped. Folding them keeps
 * the drill forgiving, which matches its goal: recall of the word, not of
 * orthographic detail. The fully voweled correct form is shown after every
 * submit, so the exact spelling is still taught.
 */
export function normalizeArabic(text: string): string {
  return stripTashkeel(text)
    .replace(/[أإآ]/g, 'ا') // hamza carriers -> bare alef
    .replace(/ؤ/g, 'و') // hamza on waw -> waw
    .replace(/ئ/g, 'ي') // hamza on ya -> ya
    .replace(/ى/g, 'ي') // alef maqsura -> ya
    .replace(/ة/g, 'ه') // ta marbuta -> ha
    .replace(/\s+/g, ' ')
    .trim()
}

/** True when two Arabic strings match after normalization. */
export function arabicAnswersMatch(a: string, b: string): boolean {
  return normalizeArabic(a) === normalizeArabic(b)
}

export interface HighlightParts {
  before: string
  match: string
  after: string
}

/**
 * Locate `harf` inside `text`, ignoring tashkeel differences (so a bare
 * "bi" matches the attached one of "bi-al-qalam", and "min" matches the
 * case-inflected "mina"). Returns the original substrings around the first
 * match, with the matched letters' trailing marks kept inside `match`, or
 * null when the harf does not occur.
 */
export function locateHarf(text: string, harf: string): HighlightParts | null {
  const target = stripTashkeel(harf)
  if (!target) return null

  // Map each kept (non-mark) character to its index in the original string.
  const origIndex: number[] = []
  let stripped = ''
  for (let i = 0; i < text.length; i++) {
    if (!MARK.test(text[i])) {
      origIndex.push(i)
      stripped += text[i]
    }
  }

  const at = stripped.indexOf(target)
  if (at < 0) return null

  const start = origIndex[at]
  const afterStripped = at + target.length
  const end =
    afterStripped < origIndex.length ? origIndex[afterStripped] : text.length

  return {
    before: text.slice(0, start),
    match: text.slice(start, end),
    after: text.slice(end),
  }
}
