import type { DeckDef, Note, SenseRef } from '../types'
import { hurufAlKhafdRef } from '../reference/hurufAlKhafd'

// The Hurūf al-Khafd deck: every harf taught by Sense.
//
// This deck replaced a second one that taught each harf as a headword with a
// single English gloss. A harf does not have a Meaning the way a noun does —
// it has an inventory of Senses, and a card claiming "min = from" teaches that
// the other three senses do not exist. What is worth drilling is which sense
// is operating, which is what the front of these cards asks.
//
// Single source of truth: every card is generated from the sense data in
// src/content/reference/hurufAlKhafd.ts. No sense text is duplicated here.
//
// The card is ar-to-meaning only: the front is an example carrying the sense
// with the harf highlighted, the back is the sense term, its meanings, and the
// harf's other senses as the contrast set.
//
// Sense content stays DRAFT until verified against the textbook - correct it
// on sight while studying.

/**
 * A term reduced to an ASCII slug for a note id: NFD, combining marks dropped,
 * everything outside [a-z0-9] treated as a separator.
 *
 * Transliterated terms carry macrons, dots and the two ayn/hamza letters, none
 * of which belong in an id that gets typed, grepped and stored as half a card
 * id. "Tabʿīḍ" is `tabid`, "Milk / Istiḥqāq" is `milk-istihqaq`.
 */
function slug(term: string): string {
  return term
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Build one note per sense, from the reference entry.
 *
 * The first sense of a harf is its primary one — the sense a beginner meets as
 * the word's "meaning", and the one the deck introduces first because deck
 * order is the order new cards appear in. Its note takes the *harf's own id*,
 * unsuffixed, which is load-bearing in three places outside this file:
 *
 *   - `OCCURRENCES_OUTSIDE_TRACK` in content/quranCoverage.ts attributes the
 *     harf's Quranic occurrences to that id. Attributing them to the primary
 *     sense is the claim that knowing the core sense is what lets you read the
 *     word — the other senses deepen it and buy no new occurrences.
 *   - `HURUF_LEMMAS` in scripts/generateReadingText.ts maps a corpus lemma to
 *     it, and throws if no note owns the id.
 *   - the shipped corpus lemma glosses, which carry that note id.
 *
 * Later senses are suffixed with their term rather than their position, so
 * that inserting a sense cannot silently hand one card's schedule to another.
 */
function sensesToNotes(): Note[] {
  const notes: Note[] = []
  for (const section of hurufAlKhafdRef.sections) {
    if (section.kind !== 'harf') continue
    const harf = section
    const token = harf.bareForm ?? harf.arabic
    const refs: SenseRef[] = harf.senses.map((s) => ({
      term: s.term,
      termArabic: s.termArabic,
    }))
    harf.senses.forEach((sense, index) => {
      notes.push({
        id: index === 0 ? harf.id : `${harf.id}-${slug(sense.term)}`,
        // The harf token, highlighted inside the example on the card front.
        arabic: token,
        // Sense meanings (the answer).
        english: sense.english,
        turkish: sense.turkish,
        // The stimulus pool, rotated per review so the card tests the sense
        // rather than recognition of one sentence.
        examples: sense.examples,
        directions: ['ar-to-meaning'],
        referenceId: `${hurufAlKhafdRef.id}#${harf.id}`,
        sense: {
          term: sense.term,
          termArabic: sense.termArabic,
          harfId: harf.id,
          contrast: refs.filter((_, i) => i !== index),
        },
        // All senses of one harf bury each other: one new sense per harf per day.
        siblingGroup: harf.id,
      })
    })
  }
  return notes
}

export const hurufAlKhafdSenses: DeckDef = {
  id: 'huruf-al-khafd-senses',
  name: 'Ḥurūf al-Khafḍ',
  nameArabic: 'حُرُوفُ الْخَفْضِ',
  description:
    'Each harf by its senses: read the example, recall which sense the harf carries.',
  directions: ['ar-to-meaning'],
  newPerDay: 20,
  burySiblings: true,
  notes: sensesToNotes(),
}
