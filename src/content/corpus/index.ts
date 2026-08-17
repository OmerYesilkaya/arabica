import type { Meaning } from '../types'
import type { CorpusLemmas, CorpusSurah } from './types'

/**
 * The Texts the reader can open: whole surahs, in their own order. The last
 * twenty-five — short enough to be read in one sitting, and the ones a learner
 * is most likely to already recite.
 *
 * Names are authored here rather than taken from the corpus: neither Tanzil's
 * text file nor the morphology carries them, and this many are still not worth
 * a second vendored file.
 */
export interface TextRef {
  surah: number
  /** Surah name in Arabic, as the mushaf heads it. */
  nameArabic: string
  /** Transliterated name, the one used in prose about the app. */
  name: string
  /** What the name means, which is the half that differs by Language. */
  meaning: Meaning
  ayat: number
}

export const readingTexts: TextRef[] = [
  { surah: 90, nameArabic: 'البَلَد', name: 'al-Balad', meaning: { english: 'The City', turkish: 'Belde, şehir' }, ayat: 20 },
  { surah: 91, nameArabic: 'الشَّمْس', name: 'ash-Shams', meaning: { english: 'The Sun', turkish: 'Güneş' }, ayat: 15 },
  { surah: 92, nameArabic: 'اللَّيْل', name: 'al-Layl', meaning: { english: 'The Night', turkish: 'Gece' }, ayat: 21 },
  { surah: 93, nameArabic: 'الضُّحَى', name: 'aḍ-Ḍuḥā', meaning: { english: 'The Morning Light', turkish: 'Kuşluk vakti' }, ayat: 11 },
  { surah: 94, nameArabic: 'الشَّرْح', name: 'ash-Sharḥ', meaning: { english: 'The Relief', turkish: 'İnşirah, ferahlama' }, ayat: 8 },
  { surah: 95, nameArabic: 'التِّين', name: 'at-Tīn', meaning: { english: 'The Fig', turkish: 'İncir' }, ayat: 8 },
  { surah: 96, nameArabic: 'العَلَق', name: 'al-ʿAlaq', meaning: { english: 'The Clinging Form', turkish: 'Alaka, kan pıhtısı' }, ayat: 19 },
  { surah: 97, nameArabic: 'القَدْر', name: 'al-Qadr', meaning: { english: 'Destiny', turkish: 'Kadir, takdir' }, ayat: 5 },
  { surah: 98, nameArabic: 'البَيِّنَة', name: 'al-Bayyina', meaning: { english: 'The Clear Evidence', turkish: 'Beyyine, apaçık delil' }, ayat: 8 },
  { surah: 99, nameArabic: 'الزَّلْزَلَة', name: 'az-Zalzala', meaning: { english: 'The Earthquake', turkish: 'Zelzele, deprem' }, ayat: 8 },
  { surah: 100, nameArabic: 'العَادِيَات', name: 'al-ʿĀdiyāt', meaning: { english: 'The Charging Steeds', turkish: 'Koşan atlar' }, ayat: 11 },
  { surah: 101, nameArabic: 'القَارِعَة', name: 'al-Qāriʿa', meaning: { english: 'The Calamity', turkish: 'Kâria, çarpan âfet' }, ayat: 11 },
  { surah: 102, nameArabic: 'التَّكَاثُر', name: 'at-Takāthur', meaning: { english: 'Rivalry in Increase', turkish: 'Mal çoğaltma yarışı' }, ayat: 8 },
  { surah: 103, nameArabic: 'العَصْر', name: 'al-ʿAṣr', meaning: { english: 'The Passing Time', turkish: 'Asır, ikindi vakti' }, ayat: 3 },
  { surah: 104, nameArabic: 'الهُمَزَة', name: 'al-Humaza', meaning: { english: 'The Slanderer', turkish: 'Hümeze, gıybetçi' }, ayat: 9 },
  { surah: 105, nameArabic: 'الفِيل', name: 'al-Fīl', meaning: { english: 'The Elephant', turkish: 'Fil' }, ayat: 5 },
  { surah: 106, nameArabic: 'قُرَيْش', name: 'Quraysh', meaning: { english: 'Quraysh', turkish: 'Kureyş' }, ayat: 4 },
  { surah: 107, nameArabic: 'المَاعُون', name: 'al-Māʿūn', meaning: { english: 'Small Kindnesses', turkish: 'Küçük İyilikler' }, ayat: 7 },
  { surah: 108, nameArabic: 'الكَوْثَر', name: 'al-Kawthar', meaning: { english: 'Abundance', turkish: 'Kevser, bolluk' }, ayat: 3 },
  { surah: 109, nameArabic: 'الكَافِرُون', name: 'al-Kāfirūn', meaning: { english: 'The Disbelievers', turkish: 'Kâfirler' }, ayat: 6 },
  { surah: 110, nameArabic: 'النَّصْر', name: 'an-Naṣr', meaning: { english: 'Divine Support', turkish: 'İlâhî Yardım' }, ayat: 3 },
  { surah: 111, nameArabic: 'المَسَد', name: 'al-Masad', meaning: { english: 'The Palm Fibre', turkish: 'Hurma Lifi' }, ayat: 5 },
  { surah: 112, nameArabic: 'الإِخْلَاص', name: 'al-Ikhlāṣ', meaning: { english: 'Sincerity', turkish: 'İhlâs, samimiyet' }, ayat: 4 },
  { surah: 113, nameArabic: 'الفَلَق', name: 'al-Falaq', meaning: { english: 'The Daybreak', turkish: 'Şafak' }, ayat: 5 },
  { surah: 114, nameArabic: 'النَّاس', name: 'an-Nās', meaning: { english: 'Mankind', turkish: 'İnsanlar' }, ayat: 6 },
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
 * main bundle does not grow with the corpus — twenty-five surahs today, and
 * the same shape if all 114 are ever added.
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
