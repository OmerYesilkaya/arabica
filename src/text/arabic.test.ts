import { describe, expect, it } from 'vitest'
import { arabicAnswersMatch, normalizeArabic, stripTashkeel } from './arabic'

describe('stripTashkeel', () => {
  it('removes harakat', () => {
    expect(stripTashkeel('مِنْ')).toBe('من')
    expect(stripTashkeel('مِنَ الْبَيْتِ')).toBe('من البيت')
  })

  it('removes the superscript alef U+0670', () => {
    expect(stripTashkeel('هَٰذَا')).toBe('هذا')
  })

  it('removes tatweel', () => {
    expect(stripTashkeel('بِـ')).toBe('ب')
    expect(stripTashkeel('كــتــاب')).toBe('كتاب')
  })

  it('leaves Latin text and spacing untouched', () => {
    expect(stripTashkeel('from مِنْ')).toBe('from من')
  })
})

describe('normalizeArabic', () => {
  it('accepts a bare form for a voweled one (required: من for مِنْ)', () => {
    expect(normalizeArabic('من')).toBe(normalizeArabic('مِنْ'))
  })

  it('accepts الي for إِلَى (hamza and alef maqsura folded)', () => {
    expect(normalizeArabic('الي')).toBe(normalizeArabic('إِلَى'))
  })

  it('folds every hamza carrier to its bare letter', () => {
    expect(normalizeArabic('أإآ')).toBe('ااا')
    expect(normalizeArabic('مؤمن')).toBe('مومن')
    expect(normalizeArabic('قائم')).toBe('قايم')
  })

  it('folds ta marbuta to ha', () => {
    expect(normalizeArabic('مدرسة')).toBe(normalizeArabic('مدرسه'))
  })

  it('collapses and trims whitespace', () => {
    expect(normalizeArabic('  من    البيت  ')).toBe('من البيت')
  })

  it('handles mixed Arabic and Latin text', () => {
    expect(normalizeArabic('  al إِلَى  x ')).toBe('al الي x')
  })
})

describe('arabicAnswersMatch', () => {
  it('matches the required drill cases', () => {
    expect(arabicAnswersMatch('من', 'مِنْ')).toBe(true)
    expect(arabicAnswersMatch('الي', 'إِلَى')).toBe(true)
  })

  it('rejects a genuinely different word', () => {
    expect(arabicAnswersMatch('على', 'عَنْ')).toBe(false)
  })
})
