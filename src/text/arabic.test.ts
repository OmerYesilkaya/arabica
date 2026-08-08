import { describe, expect, it } from 'vitest'
import {
  arabicAnswersMatch,
  locateHarf,
  normalizeArabic,
  stripTashkeel,
} from './arabic'

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
    expect(stripTashkeel('Qur’an 17:1')).toBe('Qur’an 17:1')
  })

  // U+0660-U+066F sits just past the tashkeel range and must survive: the
  // class is U+064B-U+065F plus U+0670 and U+0640, never a span to U+0670.
  it('preserves Arabic-Indic digits and punctuation (U+0660-U+066F)', () => {
    expect(stripTashkeel('٢٠٢٦')).toBe('٢٠٢٦')
    expect(stripTashkeel('١٢٣')).toBe('١٢٣')
    expect(stripTashkeel('٪٫ٮٯ')).toBe('٪٫ٮٯ')
  })
})

describe('locateHarf', () => {
  it('matches a standalone harf despite case-vowel changes', () => {
    const parts = locateHarf('مِنَ الْبَيْتِ', 'مِنْ')
    expect(parts).not.toBeNull()
    expect(parts!.before).toBe('')
    expect(parts!.match).toBe('مِنَ')
    expect(parts!.after).toBe(' الْبَيْتِ')
  })

  it('matches an attached prefix harf', () => {
    const parts = locateHarf('بِالْقَلَمِ', 'بِ')
    expect(parts).not.toBeNull()
    expect(parts!.before).toBe('')
    expect(stripTashkeel(parts!.match)).toBe('ب')
    expect(parts!.before + parts!.match + parts!.after).toBe('بِالْقَلَمِ')
  })

  it('finds the harf mid-sentence and preserves the whole string', () => {
    const text = 'ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ'
    const parts = locateHarf(text, 'إِلَى')
    expect(parts).not.toBeNull()
    expect(stripTashkeel(parts!.match)).toBe('إلى')
    expect(parts!.before + parts!.match + parts!.after).toBe(text)
  })

  it('returns null when the harf is absent', () => {
    expect(locateHarf('الْبَيْتُ كَبِيرٌ', 'مِنْ')).toBeNull()
  })

  it('is not affected by regex lastIndex across repeated calls', () => {
    const text = 'مِنَ الْبَيْتِ'
    expect(locateHarf(text, 'مِنْ')!.match).toBe(locateHarf(text, 'مِنْ')!.match)
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
