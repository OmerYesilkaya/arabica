// Small, pure Arabic-text helpers. No UI, no content, no scheduling.

// Arabic combining marks (U+064B-U+065F), the superscript alif (U+0670), and
// tatweel (U+0640). Excludes the Arabic-Indic digits (U+0660+) on purpose.
const MARK = /[ً-ٰٟـ]/
const MARK_GLOBAL = /[ً-ٰٟـ]/g

/** Remove all tashkeel, the superscript alif, and tatweel from a string. */
export function stripTashkeel(text: string): string {
  return text.replace(MARK_GLOBAL, '')
}

export interface HighlightParts {
  before: string
  match: string
  after: string
}

/**
 * Locate `particle` inside `text`, ignoring tashkeel differences (so a bare
 * "bi" matches the attached one of "bi-al-qalam", and "min" matches the
 * case-inflected "mina"). Returns the original substrings around the first
 * match, with the matched letters' trailing marks kept inside `match`, or
 * null when the particle does not occur.
 */
export function locateParticle(
  text: string,
  particle: string,
): HighlightParts | null {
  const target = stripTashkeel(particle)
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
