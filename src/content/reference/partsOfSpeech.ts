import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, chapter 1: aqsām al-kalām.
// DRAFT: verify against your textbook before relying on it.

export const partsOfSpeech: ReferenceEntry = {
  id: 'parts-of-speech',
  title: { english: 'Parts of Speech', turkish: 'Kelimenin Kısımları' },
  titleArabic: 'أَقْسَامُ الْكَلَامِ',
  order: 1,
  summary: {
    english: 'Kalām and its three parts: ism, fiʿl, ḥarf, with the signs of each.',
    turkish: 'Kelâm ve üç kısmı: isim, fiil, harf; her birinin alâmetleriyle.',
  },
  sections: [
    {
      kind: 'prose',
      title: 'Kalām',
      arabic: 'اَلْكَلَامُ هُوَ اللَّفْظُ الْمُرَكَّبُ الْمُفِيدُ بِالْوَضْعِ',
      paragraphs: [
        {
          english:
            'Speech (kalām) is the utterance (lafẓ) that is compound (murakkab), gives a complete meaning (mufīd), and is set by convention in Arabic (bil-waḍʿ).',
          turkish:
            'Kelâm; lafız olan, mürekkeb (birleşik), müfîd (tam anlam veren) ve Arap dili kurallarına göre konulmuş sözdür.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'The three parts', turkish: 'Üç kısım' },
      columns: [
        { english: 'Part', turkish: 'Tür' },
        { english: 'Arabic', turkish: 'Arapça' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          'Ism',
          { ar: 'اِسْمٌ' },
          {
            english: 'noun (names a thing, person, meaning)',
            turkish: 'isim (varlık veya kavram adı)',
          },
        ],
        [
          'Fiʿl',
          { ar: 'فِعْلٌ' },
          { english: 'verb (action tied to time)', turkish: 'fiil (zamana bağlı eylem)' },
        ],
        [
          'Ḥarf',
          { ar: 'حَرْفٌ' },
          {
            english: 'particle (has meaning only with others)',
            turkish: 'harf (tek başına anlamı olmayan edat)',
          },
        ],
      ],
    },
    {
      kind: 'table',
      title: { english: 'Signs of the ism', turkish: 'İsmin alâmetleri' },
      caption: {
        english: 'A word is an ism if it accepts any of these.',
        turkish: 'Bir kelime bunlardan birini kabul ediyorsa isimdir.',
      },
      columns: [
        { english: 'Sign', turkish: 'Alâmet' },
        { english: 'Arabic', turkish: 'Arapça' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Example', turkish: 'Örnek' },
      ],
      rows: [
        [
          'Khafḍ',
          { ar: 'اَلْخَفْضُ' },
          { english: 'takes the khafḍ ending (kasra)', turkish: 'kesra (esre) alması' },
          { ar: 'بِزَيْدٍ' },
        ],
        [
          'Tanwīn',
          { ar: 'اَلتَّنْوِينُ' },
          { english: 'takes nunation', turkish: 'tenvin alması' },
          { ar: 'رَجُلٌ' },
        ],
        [
          'Alif-lām',
          { ar: 'دُخُولُ الْأَلِفِ وَاللَّامِ' },
          {
            english: 'accepts the definite article al-',
            turkish: 'başına el- takısı gelmesi',
          },
          { ar: 'اَلرَّجُلُ' },
        ],
        [
          'Ḥurūf al-khafḍ',
          { ar: 'حُرُوفُ الْخَفْضِ' },
          {
            english: 'follows a particle of khafḍ',
            turkish: 'harf-i cerden sonra gelmesi',
          },
          { ar: 'فِي الْبَيْتِ' },
        ],
      ],
    },
    {
      kind: 'table',
      title: { english: 'Signs of the fiʿl', turkish: 'Fiilin alâmetleri' },
      caption: {
        english: 'A word is a fiʿl if it accepts any of these.',
        turkish: 'Bir kelime bunlardan birini kabul ediyorsa fiildir.',
      },
      columns: [
        { english: 'Sign', turkish: 'Alâmet' },
        { english: 'Arabic', turkish: 'Arapça' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Example', turkish: 'Örnek' },
      ],
      rows: [
        [
          'Qad',
          { ar: 'قَدْ' },
          { english: 'preceded by qad', turkish: 'başına kad gelmesi' },
          { ar: 'قَدْ قَامَ' },
        ],
        [
          'Sīn',
          { ar: 'اَلسِّينُ' },
          {
            english: 'preceded by sa- (near future)',
            turkish: 'başına sin gelmesi (yakın gelecek)',
          },
          { ar: 'سَيَقُومُ' },
        ],
        [
          'Sawfa',
          { ar: 'سَوْفَ' },
          {
            english: 'preceded by sawfa (future)',
            turkish: 'başına sevfe gelmesi (gelecek)',
          },
          { ar: 'سَوْفَ يَقُومُ' },
        ],
        [
          'Tāʾ of femininity',
          { ar: 'تَاءُ التَّأْنِيثِ السَّاكِنَةُ' },
          {
            english: 'ends with the still tāʾ of femininity',
            turkish: 'sonuna sakin te gelmesi',
          },
          { ar: 'قَامَتْ' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'Sign of the ḥarf', turkish: 'Harfin alâmeti' },
      arabic: 'وَالْحَرْفُ مَا لَا يَصْلُحُ مَعَهُ دَلِيلُ الْاِسْمِ وَلَا دَلِيلُ الْفِعْلِ',
      paragraphs: [
        {
          english:
            'The ḥarf is what accepts neither the signs of the ism nor the signs of the fiʿl.',
          turkish: 'Harf; ne isim alâmetlerini ne de fiil alâmetlerini kabul eden kelimedir.',
        },
      ],
    },
  ],
}
