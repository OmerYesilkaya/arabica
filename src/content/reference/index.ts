import type { ReferenceEntry } from '../types'
import { partsOfSpeech } from './partsOfSpeech'
import { irabSigns } from './irabSigns'
import { hurufAlKhafdRef } from './hurufAlKhafd'
import { nawasibAlFil } from './nawasibAlFil'

// Locked entries: planned, ordered by the Ājurrūmiyya; unlocked as the course reaches them.
const comingSoon: ReferenceEntry[] = [
  {
    id: 'jawazim-al-fil',
    title: 'Jazm Particles of the Verb',
    titleArabic: 'جَوَازِمُ الْفِعْلِ',
    order: 5,
    summary: 'The particles that put the present verb into jazm.',
    locked: true,
    sections: [],
  },
  {
    id: 'damair',
    title: 'Pronouns',
    titleArabic: 'اَلضَّمَائِرُ',
    order: 6,
    summary: 'Attached and detached pronoun tables.',
    locked: true,
    sections: [],
  },
  {
    id: 'kana-wa-akhawatuha',
    title: 'Kāna and its Sisters',
    titleArabic: 'كَانَ وَأَخَوَاتُهَا',
    order: 7,
    summary: 'The verbs that raise the subject and put the predicate into naṣb.',
    locked: true,
    sections: [],
  },
  {
    id: 'inna-wa-akhawatuha',
    title: 'Inna and its Sisters',
    titleArabic: 'إِنَّ وَأَخَوَاتُهَا',
    order: 8,
    summary: 'The particles that put the subject into naṣb and raise the predicate.',
    locked: true,
    sections: [],
  },
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
  ...comingSoon,
].sort((a, b) => a.order - b.order)

export function referenceById(id: string): ReferenceEntry | undefined {
  return referenceEntries.find((e) => e.id === id)
}
