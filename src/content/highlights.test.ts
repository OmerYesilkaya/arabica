import { describe, expect, it } from 'vitest'
import { decks } from './decks'
import { referenceEntries } from './reference'
import type { Example } from './types'

// Every Example.highlight is a substring of the translation it annotates: the
// card back marks it with indexOf, so a span that has drifted from its line
// disappears silently rather than failing. This is the test that would notice.
//
// Exactly one occurrence, not merely one or more. A span that occurs twice
// gets its first occurrence marked, which is the wrong one half the time —
// where the natural span repeats, the author widens it until it is unique
// ("does not wrong" for a line that says "wrong" twice).

/** Every Example content carries, named by where a failure has to be fixed. */
function allExamples(): [string, Example][] {
  const found: [string, Example][] = []
  for (const deck of decks) {
    for (const note of deck.notes) {
      if (note.example) found.push([`${deck.id}/${note.id}`, note.example])
      note.examples?.forEach((example, i) =>
        found.push([`${deck.id}/${note.id}[${i}]`, example]),
      )
    }
  }
  for (const entry of referenceEntries) {
    for (const section of entry.sections) {
      if (section.kind !== 'harf') continue
      section.senses.forEach((sense, i) => {
        sense.examples.forEach((example, j) =>
          found.push([`${entry.id}/${section.id}-${i}[${j}]`, example]),
        )
      })
    }
  }
  return found
}

const occurrences = (line: string, span: string) => line.split(span).length - 1

describe('example highlights', () => {
  const examples = allExamples()

  it('finds the examples to check', () => {
    expect(examples.length).toBeGreaterThan(600)
  })

  it('marks a span that occurs exactly once in each translation', () => {
    for (const [where, example] of examples) {
      if (!example.highlight) continue
      expect(occurrences(example.english, example.highlight.english), `${where} english`).toBe(1)
      expect(occurrences(example.turkish, example.highlight.turkish), `${where} turkish`).toBe(1)
    }
  })
})
