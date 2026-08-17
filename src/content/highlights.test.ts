import { describe, expect, it } from 'vitest'
import { decks } from './decks'
import { referenceEntries } from './reference'
import { locateHarf, stripTashkeel } from '../text/arabic'
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

// The Arabic side of a sense card: `locateHarf` marks the *first* occurrence of
// the harf's letters in the sentence, and the single-letter prefix particles
// occur inside ordinary words all the time — the lam of "al-hamdu", the ba of
// "yaktubuna", the min hiding in "ar-rahman". A sentence chosen without that in
// mind gets a letter in the middle of a stem marked instead of the harf, which
// teaches the wrong word and looks like a rendering bug rather than a content
// one. This is the test that rejects the sentence.
//
// The rule: the marked span must start a word, or be preceded within its word
// only by a conjunction that attaches in front of a harf ("fa-wa-rabbika",
// "wa-lillahi"). Extend PROCLITICS when content needs another one — it is
// deliberately the shortest list the examples justify. Not airtight: fa- before
// the harf's own letters is indistinguishable from fa- before a word that
// begins with them, so the check narrows the mistake rather than closing it.
const PROCLITICS = new Set(['ف', 'و'])

/** Every pooled Example on a sense card, with the harf token it must mark. */
function senseExamples(): [string, string, Example][] {
  const found: [string, string, Example][] = []
  for (const deck of decks) {
    for (const note of deck.notes) {
      if (!note.sense) continue
      note.examples?.forEach((example, i) =>
        found.push([`${deck.id}/${note.id}[${i}]`, note.bareForm ?? note.arabic, example]),
      )
    }
  }
  return found
}

describe('sense card harf marking', () => {
  const cases = senseExamples()

  it('finds the sense examples to check', () => {
    expect(cases.length).toBeGreaterThan(60)
  })

  it('marks the harf itself, at the head of its word', () => {
    for (const [where, harf, example] of cases) {
      const parts = locateHarf(example.arabic, harf)
      expect(parts, `${where} does not contain ${harf}`).not.toBeNull()
      const lastWord = stripTashkeel(parts!.before).split(' ').at(-1)!
      for (const letter of lastWord) {
        expect(PROCLITICS.has(letter), `${where} marks inside a word`).toBe(true)
      }
    }
  })
})
