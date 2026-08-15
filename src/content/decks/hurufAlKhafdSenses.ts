import type { DeckDef, Note } from '../types'
import { hurufAlKhafdRef } from '../reference/hurufAlKhafd'

// Per-sense deck for Ḥurūf al-Khafḍ.
//
// Single source of truth: every card is generated from the sense data in
// src/content/reference/hurufAlKhafd.ts. No sense text is duplicated here.
//
// The card is ar-to-meaning only: the front is the sense example with the harf
// highlighted, the back is the grammatical sense and the meanings.
//
// Unlocked: the first meanings are solid, so the senses are in study now.
// Sense content stays DRAFT until verified against the textbook - correct it
// on sight while studying.

/** Build one note per sense that carries an example, from the reference entry. */
function sensesToNotes(): Note[] {
  const notes: Note[] = []
  for (const section of hurufAlKhafdRef.sections) {
    if (section.kind !== 'harf') continue
    const harf = section
    const token = harf.bareForm ?? harf.arabic
    harf.senses.forEach((sense, index) => {
      if (!sense.example) return
      notes.push({
        id: `${harf.id}-${index}`,
        // The harf token, highlighted inside the example on the card front.
        arabic: token,
        // Sense meanings (the answer).
        english: sense.english,
        turkish: sense.turkish,
        example: sense.example,
        directions: ['ar-to-meaning'],
        referenceId: `${hurufAlKhafdRef.id}#${harf.id}`,
        sense: { term: sense.term, termArabic: sense.termArabic },
        // All senses of one harf bury each other: one new sense per harf per day.
        siblingGroup: harf.id,
      })
    })
  }
  return notes
}

export const hurufAlKhafdSenses: DeckDef = {
  id: 'huruf-al-khafd-senses',
  name: 'Ḥurūf al-Khafḍ — Senses',
  nameArabic: 'مَعَانِي حُرُوفِ الْخَفْضِ',
  description:
    'Each harf’s senses: read the example, recall which sense the harf carries.',
  directions: ['ar-to-meaning'],
  newPerDay: 20,
  burySiblings: true,
  notes: sensesToNotes(),
}
