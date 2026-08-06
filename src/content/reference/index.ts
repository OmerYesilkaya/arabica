import type { ReferenceEntry } from '../types'
import { partsOfSpeech } from './partsOfSpeech'
import { irabSigns } from './irabSigns'
import { hurufAlKhafdRef } from './hurufAlKhafd'
import { nawasibAlFil } from './nawasibAlFil'
import { jawazimAlFil } from './jawazimAlFil'
import { damair } from './damair'
import { kanaWaAkhawatuha } from './kanaWaAkhawatuha'
import { innaWaAkhawatuha } from './innaWaAkhawatuha'

// Locked entries: planned, ordered by the Ājurrūmiyya; unlocked as the course reaches them.
const comingSoon: ReferenceEntry[] = [
  {
    id: 'verb-conjugation',
    title: 'Verb Conjugation Tables',
    titleArabic: 'تَصْرِيفُ الْأَفْعَالِ',
    order: 9,
    summary: 'Māḍī, muḍāriʿ, and amr tables for the sound triliteral verb.',
    locked: true,
    sections: [],
  },
]

export const referenceEntries: ReferenceEntry[] = [
  partsOfSpeech,
  irabSigns,
  hurufAlKhafdRef,
  nawasibAlFil,
  jawazimAlFil,
  damair,
  kanaWaAkhawatuha,
  innaWaAkhawatuha,
  ...comingSoon,
].sort((a, b) => a.order - b.order)

export function referenceById(id: string): ReferenceEntry | undefined {
  return referenceEntries.find((e) => e.id === id)
}
