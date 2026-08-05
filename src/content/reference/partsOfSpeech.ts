import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, chapter 1: aqsām al-kalām.
// DRAFT: verify against your textbook before relying on it.

export const partsOfSpeech: ReferenceEntry = {
  id: 'parts-of-speech',
  title: 'Parts of Speech',
  titleArabic: 'أَقْسَامُ الْكَلَامِ',
  order: 1,
  summary: 'Kalām and its three parts: ism, fiʿl, ḥarf, with the signs of each.',
  sections: [
    {
      kind: 'prose',
      title: 'Kalām',
      arabic: 'اَلْكَلَامُ هُوَ اللَّفْظُ الْمُرَكَّبُ الْمُفِيدُ بِالْوَضْعِ',
      paragraphs: [
        'EN: Speech (kalām) is the utterance (lafẓ) that is compound (murakkab), gives a complete meaning (mufīd), and is set by convention in Arabic (bil-waḍʿ).',
        'TR: Kelâm; lafız olan, mürekkeb (birleşik), müfîd (tam anlam veren) ve Arap dili kurallarına göre konulmuş sözdür.',
      ],
    },
    {
      kind: 'table',
      title: 'The three parts',
      columns: ['Part', 'Arabic', 'English', 'Türkçe'],
      rows: [
        ['Ism', { ar: 'اِسْمٌ' }, 'noun (names a thing, person, meaning)', 'isim (varlık veya kavram adı)'],
        ['Fiʿl', { ar: 'فِعْلٌ' }, 'verb (action tied to time)', 'fiil (zamana bağlı eylem)'],
        ['Ḥarf', { ar: 'حَرْفٌ' }, 'particle (has meaning only with others)', 'harf (tek başına anlamı olmayan edat)'],
      ],
    },
    {
      kind: 'table',
      title: 'Signs of the ism',
      caption:
        'EN: A word is an ism if it accepts any of these. / TR: Bir kelime bunlardan birini kabul ediyorsa isimdir.',
      columns: ['Sign', 'Arabic', 'English', 'Türkçe', 'Example'],
      rows: [
        ['Khafḍ', { ar: 'اَلْخَفْضُ' }, 'takes the khafḍ ending (kasra)', 'kesra (esre) alması', { ar: 'بِزَيْدٍ' }],
        ['Tanwīn', { ar: 'اَلتَّنْوِينُ' }, 'takes nunation', 'tenvin alması', { ar: 'رَجُلٌ' }],
        ['Alif-lām', { ar: 'دُخُولُ الْأَلِفِ وَاللَّامِ' }, 'accepts the definite article al-', 'başına el- takısı gelmesi', { ar: 'اَلرَّجُلُ' }],
        ['Ḥurūf al-khafḍ', { ar: 'حُرُوفُ الْخَفْضِ' }, 'follows a particle of khafḍ', 'harf-i cerden sonra gelmesi', { ar: 'فِي الْبَيْتِ' }],
      ],
    },
    {
      kind: 'table',
      title: 'Signs of the fiʿl',
      caption:
        'EN: A word is a fiʿl if it accepts any of these. / TR: Bir kelime bunlardan birini kabul ediyorsa fiildir.',
      columns: ['Sign', 'Arabic', 'English', 'Türkçe', 'Example'],
      rows: [
        ['Qad', { ar: 'قَدْ' }, 'preceded by qad', 'başına kad gelmesi', { ar: 'قَدْ قَامَ' }],
        ['Sīn', { ar: 'اَلسِّينُ' }, 'preceded by sa- (near future)', 'başına sin gelmesi (yakın gelecek)', { ar: 'سَيَقُومُ' }],
        ['Sawfa', { ar: 'سَوْفَ' }, 'preceded by sawfa (future)', 'başına sevfe gelmesi (gelecek)', { ar: 'سَوْفَ يَقُومُ' }],
        ['Tāʾ of femininity', { ar: 'تَاءُ التَّأْنِيثِ السَّاكِنَةُ' }, 'ends with the still tāʾ of femininity', 'sonuna sakin te gelmesi', { ar: 'قَامَتْ' }],
      ],
    },
    {
      kind: 'prose',
      title: 'Sign of the ḥarf',
      arabic: 'وَالْحَرْفُ مَا لَا يَصْلُحُ مَعَهُ دَلِيلُ الْاِسْمِ وَلَا دَلِيلُ الْفِعْلِ',
      paragraphs: [
        'EN: The ḥarf is what accepts neither the signs of the ism nor the signs of the fiʿl.',
        'TR: Harf; ne isim alâmetlerini ne de fiil alâmetlerini kabul eden kelimedir.',
      ],
    },
  ],
}
