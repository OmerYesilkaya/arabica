import { describe, expect, it } from 'vitest'
import { locateParticle, stripTashkeel } from './arabic'

describe('stripTashkeel', () => {
  it('removes tashkeel but keeps letters', () => {
    expect(stripTashkeel('مِنَ الْبَيْتِ')).toBe('من البيت')
  })

  it('removes tatweel and the superscript alif', () => {
    expect(stripTashkeel('عَلَىٰ')).toBe('على')
    expect(stripTashkeel('كــتاب')).toBe('كتاب')
  })

  it('leaves Arabic-Indic digits untouched', () => {
    expect(stripTashkeel('٢٠٢٦')).toBe('٢٠٢٦')
  })

  it('leaves plain Latin text untouched', () => {
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
