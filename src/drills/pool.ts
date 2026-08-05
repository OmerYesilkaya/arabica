// Drill pool construction. Drills are unscheduled practice: this module never
// touches cardState or reviewLog; it only reads content data.

import { decks } from '../content/decks'
import type { Direction } from '../content/types'

export interface DrillItem {
  id: string
  arabic: string
  english: string
  turkish: string
}

/**
 * Pool for drill type 1 (type the Arabic for a gloss): every note whose
 * effective directions include meaning-to-ar. That excludes the oath
 * particles, whose meanings are identical and so cannot be produced from a
 * gloss unambiguously. The Arabic to type is `drillAnswer` when set, so
 * label-form notes (the prefix particles) ask for the bare particle.
 */
export function buildDrillPool(): DrillItem[] {
  const items: DrillItem[] = []
  for (const deck of decks) {
    for (const note of deck.notes) {
      const directions: Direction[] = note.directions ?? deck.directions
      if (!directions.includes('meaning-to-ar')) continue
      items.push({
        id: `${deck.id}:${note.id}`,
        arabic: note.drillAnswer ?? note.arabic,
        english: note.english,
        turkish: note.turkish,
      })
    }
  }
  return items
}
