import type { DeckDef } from '../types'

// Hurūf al-Khafd per the Ājurrūmiyya, in the matn's order: min, ila, an,
// ala, fi, rubba, al-ba, al-kaf, al-lam, and the oath particles al-waw,
// al-ba and al-ta. The particles themselves are the deck's data below.
//
// DRAFT: verify every meaning against your textbook before first study.
// The three oath particles share the meaning "by (oath)", so their
// meaning->ar direction is disabled to keep answers unambiguous.

export const hurufAlKhafd: DeckDef = {
  id: 'huruf-al-khafd',
  name: 'Ḥurūf al-Khafḍ',
  nameArabic: 'حُرُوفُ الْخَفْضِ',
  description:
    'The particles of khafḍ from the Ājurrūmiyya, with their primary meanings.',
  directions: ['ar-to-meaning', 'meaning-to-ar'],
  newPerDay: 20,
  burySiblings: true,
  notes: [
    {
      id: 'min',
      arabic: 'مِنْ',
      english: 'from',
      turkish: '-den / -dan',
      example: {
        arabic: 'خَرَجْتُ مِنَ الْبَيْتِ',
        english: 'I went out of the house',
        turkish: 'Evden çıktım',
      },
      referenceId: 'huruf-al-khafd#min',
    },
    {
      id: 'ila',
      arabic: 'إِلَى',
      english: 'to, towards',
      turkish: '-e / -a (kadar)',
      example: {
        arabic: 'ذَهَبْتُ إِلَى الْمَسْجِدِ',
        english: 'I went to the mosque',
        turkish: 'Mescide gittim',
      },
      referenceId: 'huruf-al-khafd#ila',
    },
    {
      id: 'an',
      arabic: 'عَنْ',
      english: 'away from, about',
      turkish: '-den (uzaklaşma); hakkında',
      example: {
        arabic: 'رَمَيْتُ السَّهْمَ عَنِ الْقَوْسِ',
        english: 'I shot the arrow from the bow',
        turkish: 'Oku yaydan attım',
      },
      referenceId: 'huruf-al-khafd#an',
    },
    {
      id: 'ala',
      arabic: 'عَلَى',
      english: 'on, upon',
      turkish: 'üzerinde, üstünde',
      example: {
        arabic: 'جَلَسْتُ عَلَى الْكُرْسِيِّ',
        english: 'I sat on the chair',
        turkish: 'Sandalyenin üzerine oturdum',
      },
      referenceId: 'huruf-al-khafd#ala',
    },
    {
      id: 'fi',
      arabic: 'فِي',
      english: 'in, inside',
      turkish: 'içinde, -de / -da',
      example: {
        arabic: 'الْمَاءُ فِي الْكُوزِ',
        english: 'The water is in the jug',
        turkish: 'Su testinin içindedir',
      },
      referenceId: 'huruf-al-khafd#fi',
    },
    {
      id: 'rubba',
      arabic: 'رُبَّ',
      english: 'many a ... (sometimes: few a ...)',
      turkish: 'nice (nice ... vardır ki)',
      example: {
        arabic: 'رُبَّ رَجُلٍ كَرِيمٍ لَقِيتُهُ',
        english: 'Many a generous man have I met',
        turkish: 'Nice cömert adamla karşılaştım',
      },
      referenceId: 'huruf-al-khafd#rubba',
    },
    {
      id: 'ba',
      arabic: 'الْبَاءُ (بِـ)',
      // The bare particle, since `arabic` above names the letter.
      bareForm: 'بِ',
      english: 'with, by (instrument)',
      turkish: 'ile, -le / -la',
      example: {
        arabic: 'كَتَبْتُ بِالْقَلَمِ',
        english: 'I wrote with the pen',
        turkish: 'Kalemle yazdım',
      },
      referenceId: 'huruf-al-khafd#ba',
    },
    {
      id: 'kaf',
      arabic: 'الْكَافُ (كَـ)',
      // The bare particle, since `arabic` above names the letter.
      bareForm: 'كَ',
      english: 'like, as',
      turkish: 'gibi',
      example: {
        arabic: 'زَيْدٌ كَالْأَسَدِ',
        english: 'Zayd is like a lion',
        turkish: 'Zeyd aslan gibidir',
      },
      referenceId: 'huruf-al-khafd#kaf',
    },
    {
      id: 'lam',
      arabic: 'اللَّامُ (لِـ)',
      // The bare particle, since `arabic` above names the letter.
      bareForm: 'لِ',
      english: 'for, belonging to',
      turkish: 'için; -in (aitlik)',
      example: {
        arabic: 'الْمَالُ لِزَيْدٍ',
        english: 'The wealth belongs to Zayd',
        turkish: 'Mal Zeyd’indir',
      },
      referenceId: 'huruf-al-khafd#lam',
    },
    {
      id: 'waw-qasam',
      arabic: 'وَاوُ الْقَسَمِ (وَ)',
      english: 'by ... (oath)',
      turkish: 'yemin vavı: andolsun',
      directions: ['ar-to-meaning'],
      example: {
        arabic: 'وَاللَّهِ',
        english: 'By Allah!',
        turkish: 'Vallahi (Allah’a andolsun)',
      },
      referenceId: 'huruf-al-khafd#waw-qasam',
    },
    {
      id: 'ba-qasam',
      arabic: 'بَاءُ الْقَسَمِ (بِ)',
      english: 'by ... (oath)',
      turkish: 'yemin bâsı: andolsun',
      directions: ['ar-to-meaning'],
      example: {
        arabic: 'بِاللَّهِ',
        english: 'By Allah!',
        turkish: 'Billahi (Allah’a andolsun)',
      },
      referenceId: 'huruf-al-khafd#ba-qasam',
    },
    {
      id: 'ta-qasam',
      arabic: 'تَاءُ الْقَسَمِ (تَ)',
      english: 'by ... (oath)',
      turkish: 'yemin tâsı: andolsun',
      directions: ['ar-to-meaning'],
      example: {
        arabic: 'تَاللَّهِ',
        english: 'By Allah!',
        turkish: 'Tallahi (Allah’a andolsun)',
      },
      referenceId: 'huruf-al-khafd#ta-qasam',
    },
  ],
}
