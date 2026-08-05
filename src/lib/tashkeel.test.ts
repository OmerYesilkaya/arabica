import { describe, expect, it } from 'vitest'
import { stripTashkeel } from './tashkeel'

describe('stripTashkeel', () => {
  it('removes harakat and sukun from a voweled phrase', () => {
    expect(stripTashkeel('مِنَ الْبَيْتِ')).toBe('من البيت')
  })

  it('strips a superscript alef (U+0670)', () => {
    // هٰذَا -> هذا
    expect(stripTashkeel('هٰذَا')).toBe('هذا')
  })

  it('strips tatweel (U+0640)', () => {
    expect(stripTashkeel('كتـــاب')).toBe('كتاب')
  })

  it('leaves bare Arabic letters untouched', () => {
    expect(stripTashkeel('من البيت')).toBe('من البيت')
  })

  it('handles mixed Arabic and English text', () => {
    expect(stripTashkeel('from الْبَيْت home')).toBe('from البيت home')
  })

  it('preserves Arabic-Indic digits (U+0660–U+066F)', () => {
    expect(stripTashkeel('١٢٣')).toBe('١٢٣')
  })

  it('is a no-op on plain English', () => {
    expect(stripTashkeel('hello world')).toBe('hello world')
  })
})
