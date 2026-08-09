import type { CorpusLemmas, CorpusSurah } from './types'

/**
 * The Texts the reader can open: whole surahs, in their own order. The last
 * ten to begin with — short enough to be read in one sitting, and the ones a
 * learner is most likely to already recite.
 *
 * Names are authored here rather than taken from the corpus: neither Tanzil's
 * text file nor the morphology carries them, and ten of them are not worth a
 * second vendored file.
 */
export interface TextRef {
  surah: number
  /** Surah name in Arabic, as the mushaf heads it. */
  nameArabic: string
  /** Transliterated name, the one used in prose about the app. */
  name: string
  english: string
  ayat: number
}

export const readingTexts: TextRef[] = [
  { surah: 105, nameArabic: 'الفِيل', name: 'al-Fīl', english: 'The Elephant', ayat: 5 },
  { surah: 106, nameArabic: 'قُرَيْش', name: 'Quraysh', english: 'Quraysh', ayat: 4 },
  { surah: 107, nameArabic: 'المَاعُون', name: 'al-Māʿūn', english: 'Small Kindnesses', ayat: 7 },
  { surah: 108, nameArabic: 'الكَوْثَر', name: 'al-Kawthar', english: 'Abundance', ayat: 3 },
  { surah: 109, nameArabic: 'الكَافِرُون', name: 'al-Kāfirūn', english: 'The Disbelievers', ayat: 6 },
  { surah: 110, nameArabic: 'النَّصْر', name: 'an-Naṣr', english: 'Divine Support', ayat: 3 },
  { surah: 111, nameArabic: 'المَسَد', name: 'al-Masad', english: 'The Palm Fibre', ayat: 5 },
  { surah: 112, nameArabic: 'الإِخْلَاص', name: 'al-Ikhlāṣ', english: 'Sincerity', ayat: 4 },
  { surah: 113, nameArabic: 'الفَلَق', name: 'al-Falaq', english: 'The Daybreak', ayat: 5 },
  { surah: 114, nameArabic: 'النَّاس', name: 'an-Nās', english: 'Mankind', ayat: 6 },
]

export function textRef(surah: number): TextRef | undefined {
  return readingTexts.find((t) => t.surah === surah)
}

/**
 * Provenance, shown in the reader beside the data it describes. Corpus is
 * unverified by design, so an error has to be attributable rather than
 * anonymous.
 */
export const PROVENANCE = {
  text: {
    name: 'Tanzil',
    detail: 'Uthmani text, verbatim',
    url: 'https://tanzil.net',
  },
  morphology: {
    name: 'Quranic Arabic Corpus',
    detail: 'v0.4, Kais Dukes',
    url: 'https://corpus.quran.com',
  },
} as const

/*
 * Lazy loading. Each surah is its own chunk, fetched when it is opened, so the
 * main bundle does not grow with the corpus — ten surahs today, and the same
 * shape if all 114 are ever added.
 *
 * import.meta.glob rather than a bare dynamic import: it keeps the JSON out of
 * the typechecker (a literal type per ayah would be enormous and useless)
 * while still letting the bundler split and precache each file.
 */
const files = import.meta.glob('./*.json')

function load<T>(name: string): Promise<T> {
  const loader = files[`./${name}.json`]
  if (!loader) throw new Error(`no corpus file ${name}.json`)
  return loader().then((module) => (module as { default: T }).default)
}

export async function loadSurah(surah: number): Promise<CorpusSurah> {
  if (!textRef(surah)) throw new Error(`surah ${surah} is not in the reader`)
  return load<CorpusSurah>(`surah${surah}`)
}

export async function loadLemmas(): Promise<CorpusLemmas> {
  return load<CorpusLemmas>('lemmas')
}
