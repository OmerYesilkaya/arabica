// Arabic text helpers. Pure string functions, no content and no side effects.

import { stripTashkeel } from '../lib/arabic'

/**
 * Normalize an Arabic string for lenient answer comparison in drills.
 *
 * Steps, in order:
 *  1. strip tashkeel and tatweel (vowels are not required when typing),
 *  2. fold hamza carriers to their bare letter: أ إ آ -> ا, ؤ -> و, ئ -> ي,
 *  3. fold alef maqsura ى -> ya ي, so "الي" matches "إِلَى",
 *  4. fold ta marbuta ة -> ha ه (see decision below),
 *  5. collapse runs of whitespace to a single space and trim the ends.
 *
 * ة vs ه decision: we fold ة to ه. On a phone keyboard the learner reaches
 * ة with a long-press and often types the plain ه instead, and the two look
 * and sound close once vowels are dropped. Folding them keeps the drill
 * forgiving, which matches its goal: recall of the word, not of orthographic
 * detail. The fully voweled correct form is shown after every submit, so the
 * exact spelling is still taught.
 */
export function normalizeArabic(text: string): string {
  return stripTashkeel(text)
    .replace(/[أإآ]/g, 'ا') // أ إ آ -> ا
    .replace(/ؤ/g, 'و') // ؤ -> و
    .replace(/ئ/g, 'ي') // ئ -> ي
    .replace(/ى/g, 'ي') // ى -> ي
    .replace(/ة/g, 'ه') // ة -> ه
    .replace(/\s+/g, ' ')
    .trim()
}

/** True when two Arabic strings match after normalization. */
export function arabicAnswersMatch(a: string, b: string): boolean {
  return normalizeArabic(a) === normalizeArabic(b)
}
