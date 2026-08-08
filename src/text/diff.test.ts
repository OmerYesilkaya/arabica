import { describe, expect, it } from 'vitest'
import { diffChars } from './diff'

describe('diffChars', () => {
  it('marks identical strings as one equal run', () => {
    expect(diffChars('من', 'من')).toEqual([{ op: 'equal', value: 'من' }])
  })

  it('marks a pure insertion', () => {
    expect(diffChars('من', 'منن')).toEqual([
      { op: 'equal', value: 'من' },
      { op: 'insert', value: 'ن' },
    ])
  })

  it('marks a pure deletion', () => {
    expect(diffChars('على', 'عل')).toEqual([
      { op: 'equal', value: 'عل' },
      { op: 'delete', value: 'ى' },
    ])
  })

  it('marks a substitution as delete then insert', () => {
    // "ila" spelled with alef maqsura vs with ya: the last letter differs.
    expect(diffChars('الى', 'الي')).toEqual([
      { op: 'equal', value: 'ال' },
      { op: 'delete', value: 'ى' },
      { op: 'insert', value: 'ي' },
    ])
  })

  it('reconstructs each side from its parts', () => {
    const parts = diffChars('عَنْ', 'عن')
    const expected = parts
      .filter((p) => p.op !== 'insert')
      .map((p) => p.value)
      .join('')
    const typed = parts
      .filter((p) => p.op !== 'delete')
      .map((p) => p.value)
      .join('')
    expect(expected).toBe('عَنْ')
    expect(typed).toBe('عن')
  })

  it('handles an empty typed answer', () => {
    expect(diffChars('في', '')).toEqual([{ op: 'delete', value: 'في' }])
  })
})
