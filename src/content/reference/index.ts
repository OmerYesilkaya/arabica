import type { ReferenceEntry } from '../types'
import { partsOfSpeech } from './partsOfSpeech'
import { irabSigns } from './irabSigns'
import { hurufAlKhafdRef } from './hurufAlKhafd'
import { genderAndNumber } from './genderAndNumber'
import { nawasibAlFil } from './nawasibAlFil'
import { jawazimAlFil } from './jawazimAlFil'
import { damair } from './damair'
import { kanaWaAkhawatuha } from './kanaWaAkhawatuha'
import { innaWaAkhawatuha } from './innaWaAkhawatuha'
import { verbConjugation } from './verbConjugation'

// `order` is the order the course teaches the entries in, which follows the
// Ājurrūmiyya wherever the matn has a chapter and interleaves the rest where
// they are needed. See docs/adr/0003-reference-order-is-course-order.md.
//
// Locked entries: planned, in the same order; unlocked as the course reaches them.
// All planned entries are unlocked; add future locked stubs here.
const comingSoon: ReferenceEntry[] = []

export const referenceEntries: ReferenceEntry[] = [
  partsOfSpeech,
  irabSigns,
  hurufAlKhafdRef,
  genderAndNumber,
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
