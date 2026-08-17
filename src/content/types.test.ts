import { describe, expect, it } from 'vitest'
import { exampleOf } from './types'
import type { Example, Note } from './types'

const example = (arabic: string): Example => ({
  arabic,
  english: arabic,
  turkish: arabic,
})

const noteWith = (fields: Partial<Note>): Note => ({
  id: 'n',
  arabic: 'x',
  english: 'x',
  turkish: 'x',
  ...fields,
})

describe('exampleOf', () => {
  const pool = [example('a'), example('b'), example('c')]

  it('walks the pool in order as the review count grows', () => {
    // The pool only does its work if consecutive reviews land on different
    // sentences: a card whose stimulus never moves is answered from having seen
    // the sentence before.
    const note = noteWith({ examples: pool })
    expect([0, 1, 2].map((reps) => exampleOf(note, reps)?.arabic)).toEqual([
      'a',
      'b',
      'c',
    ])
  })

  it('wraps around, and reads the same example twice for one review count', () => {
    // Front and back are rendered from separate reads of the same count.
    const note = noteWith({ examples: pool })
    expect(exampleOf(note, 3)).toBe(exampleOf(note, 0))
    expect(exampleOf(note, 7)?.arabic).toBe('b')
  })

  it('falls back to the single authored example, and to nothing', () => {
    const one = example('only')
    expect(exampleOf(noteWith({ example: one }), 5)).toBe(one)
    expect(exampleOf(noteWith({ examples: [], example: one }), 0)).toBe(one)
    expect(exampleOf(noteWith({}), 0)).toBeUndefined()
  })
})
