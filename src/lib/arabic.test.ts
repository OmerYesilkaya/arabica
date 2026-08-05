import { describe, expect, it } from 'vitest'
import { locateParticle, stripTashkeel } from './arabic'

describe('stripTashkeel', () => {
  it('removes harakat and sukun but keeps letters', () => {
    expect(stripTashkeel('مِنْ')).toBe('من')
    expect(stripTashkeel('مِنَ الْبَيْتِ')).toBe('من البيت')
  })

  it('removes the superscript alef (U+0670)', () => {
    expect(stripTashkeel('هَٰذَا')).toBe('هذا')
    expect(stripTashkeel('عَلَىٰ')).toBe('على')
  })

  it('removes tatweel (U+0640)', () => {
    expect(stripTashkeel('بِـ')).toBe('ب')
    expect(stripTashkeel('كــتــاب')).toBe('كتاب')
  })

  it('leaves bare Arabic letters untouched', () => {
    expect(stripTashkeel('من البيت')).toBe('من البيت')
  })

  it('leaves Arabic-Indic digits (U+0660–U+0669) untouched', () => {
    expect(stripTashkeel('١٢٣')).toBe('١٢٣')
    expect(stripTashkeel('٢٠٢٦')).toBe('٢٠٢٦')
  })

  it('handles mixed Arabic and Latin text', () => {
    expect(stripTashkeel('from الْبَيْت home')).toBe('from البيت home')
  })

  it('is a no-op on plain Latin text', () => {
    expect(stripTashkeel('Qur’an 17:1')).toBe('Qur’an 17:1')
  })
})

describe('locateParticle', () => {
  it('matches a standalone harf despite case-vowel changes', () => {
    const parts = locateParticle('مِنَ الْبَيْتِ', 'مِنْ')
    expect(parts).not.toBeNull()
    expect(parts!.before).toBe('')
    expect(parts!.match).toBe('مِنَ')
    expect(parts!.after).toBe(' الْبَيْتِ')
  })

  it('matches an attached prefix harf', () => {
    const parts = locateParticle('بِالْقَلَمِ', 'بِ')
    expect(parts).not.toBeNull()
    expect(parts!.before).toBe('')
    expect(stripTashkeel(parts!.match)).toBe('ب')
    expect(parts!.before + parts!.match + parts!.after).toBe('بِالْقَلَمِ')
  })

  it('finds the harf mid-sentence and preserves the whole string', () => {
    const text = 'ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ'
    const parts = locateParticle(text, 'إِلَى')
    expect(parts).not.toBeNull()
    expect(stripTashkeel(parts!.match)).toBe('إلى')
    expect(parts!.before + parts!.match + parts!.after).toBe(text)
  })

  it('returns null when the harf is absent', () => {
    expect(locateParticle('الْبَيْتُ كَبِيرٌ', 'مِنْ')).toBeNull()
  })
})
