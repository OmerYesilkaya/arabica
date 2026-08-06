import type { ReferenceEntry } from '../types'
import { partsOfSpeech } from './partsOfSpeech'
import { irabSigns } from './irabSigns'
import { hurufAlKhafdRef } from './hurufAlKhafd'
import { nawasibAlFil } from './nawasibAlFil'
import { jawazimAlFil } from './jawazimAlFil'
import { damair } from './damair'
import { kanaWaAkhawatuha } from './kanaWaAkhawatuha'
import { innaWaAkhawatuha } from './innaWaAkhawatuha'
import { verbConjugation } from './verbConjugation'

// Locked entries: planned, ordered by the Ājurrūmiyya; unlocked as the course reaches them.
// All planned entries are unlocked; add future locked stubs here.
const comingSoon: ReferenceEntry[] = []

export const referenceEntries: ReferenceEntry[] = [
  partsOfSpeech,
  irabSigns,
  hurufAlKhafdRef,
  nawasibAlFil,
  jawazimAlFil,
  damair,
  kanaWaAkhawatuha,
  innaWaAkhawatuha,
  verbConjugation,
  ...comingSoon,
].sort((a, b) => a.order - b.order)

export function referenceById(id: string): ReferenceEntry | undefined {
  return referenceEntries.find((e) => e.id === id)
}
