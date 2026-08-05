// Render-time hide-tashkeel helper. Content files keep full tashkeel
// (invariant 2); this only changes what is drawn on screen.

/**
 * Arabic tashkeel marks (U+064B–U+065F), the superscript alef (U+0670),
 * and the tatweel elongation (U+0640). The gap U+0660–U+066F (Arabic-Indic
 * digits and punctuation) is deliberately left untouched.
 */
const TASHKEEL_RE = /[ـً-ٰٟ]/g

/** Remove tashkeel and tatweel for unvoweled reading. Leaves all else intact. */
export function stripTashkeel(text: string): string {
  return text.replace(TASHKEEL_RE, '')
}
