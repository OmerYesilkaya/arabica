import type { DeckDef } from '../content/types'

// A synthetic deck for the scheduling tests.
//
// The queue and the burying rules are generic over content, so testing them
// against a shipped deck couples them to authoring decisions. These tests used
// to read the Hurūf al-Khafd gloss deck, and would have lost their
// two-direction case the day that deck was replaced by one that teaches senses
// in a single direction - a scheduling rule silently going untested because a
// content file changed. A fixture states what the test needs, and no authoring
// decision can edit it out from under the test.
//
// Deliberately not Arabic: nothing in the queue reads `arabic`, and a fixture
// that looked like content would invite someone to assert content facts on it.

/** Twelve two-direction notes, one of them single-direction. 23 cards. */
export const testDeck: DeckDef = {
  id: 'test-deck',
  name: 'Test Deck',
  nameArabic: 'test',
  description: 'Synthetic deck for scheduling tests.',
  directions: ['ar-to-meaning', 'meaning-to-ar'],
  newPerDay: 20,
  burySiblings: true,
  notes: Array.from({ length: 12 }, (_, i) => ({
    id: `test-note-${i + 1}`,
    arabic: `form-${i + 1}`,
    english: `meaning ${i + 1}`,
    turkish: `anlam ${i + 1}`,
    // One note is asked one way only, as the oath particles were: the deck's
    // directions are a default that a note may narrow.
    ...(i === 11 ? { directions: ['ar-to-meaning' as const] } : {}),
  })),
}
