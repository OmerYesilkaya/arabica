import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, chapter 2: al-iʿrāb and its signs.
// DRAFT: verify against your textbook before relying on it.

export const irabSigns: ReferenceEntry = {
  id: 'irab-signs',
  title: { english: 'Iʿrāb and its Signs', turkish: 'İrab ve Alâmetleri' },
  titleArabic: 'اَلْإِعْرَابُ وَعَلَامَاتُهُ',
  order: 2,
  summary: {
    english:
      'The four states (rafʿ, naṣb, khafḍ, jazm) and the sign each word class takes.',
    turkish:
      'Dört hâl (ref, nasb, cer, cezm) ve her kelime türünün aldığı alâmet.',
  },
  sections: [
    {
      kind: 'prose',
      title: { english: 'What iʿrāb is', turkish: 'İʿrâb nedir' },
      arabic:
        'اَلْإِعْرَابُ هُوَ تَغْيِيرُ أَوَاخِرِ الْكَلِمِ لِاخْتِلَافِ الْعَوَامِلِ الدَّاخِلَةِ عَلَيْهَا لَفْظًا أَوْ تَقْدِيرًا',
      paragraphs: [
        {
          english:
            'Iʿrāb is the change of word endings caused by the different governing agents that act on them, shown openly (lafẓan) or implied (taqdīran).',
          turkish:
            'İʿrâb; kelime sonlarının, başlarına gelen âmillerin değişmesiyle açıkça (lafzan) veya takdiren değişmesidir.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'The four states', turkish: 'Dört durum' },
      columns: [
        { english: 'State', turkish: 'Durum' },
        { english: 'Arabic', turkish: 'Arapça' },
        { english: 'Primary sign', turkish: 'Aslî alâmet' },
        { english: 'Applies to', turkish: 'Geçerli olduğu' },
      ],
      rows: [
        [
          { english: 'Rafʿ', turkish: 'Ref (ötre)' },
          { ar: 'اَلرَّفْعُ' },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { english: 'nouns and verbs', turkish: 'isim ve fiiller' },
        ],
        [
          { english: 'Naṣb', turkish: 'Nasb (üstün)' },
          { ar: 'اَلنَّصْبُ' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { english: 'nouns and verbs', turkish: 'isim ve fiiller' },
        ],
        [
          { english: 'Khafḍ', turkish: 'Hafd / cer (esre)' },
          { ar: 'اَلْخَفْضُ' },
          { ar: 'ـِ', footnote: 'kasra' },
          { english: 'nouns only', turkish: 'yalnız isimler' },
        ],
        [
          { english: 'Jazm', turkish: 'Cezm (cezim)' },
          { ar: 'اَلْجَزْمُ' },
          { ar: 'ـْ', footnote: 'sukūn' },
          { english: 'verbs only', turkish: 'yalnız fiiller' },
        ],
      ],
    },
    {
      kind: 'table',
      title: { english: 'Signs by word class', turkish: 'Kelime türüne göre alâmetler' },
      caption: {
        english:
          'Which sign each word class takes in each state. A dash means the state does not apply.',
        turkish:
          'Her kelime türünün her durumda aldığı alâmet. Çizgi, o durumun geçerli olmadığını gösterir.',
      },
      columns: [
        { english: 'Word class', turkish: 'Kelime türü' },
        'Rafʿ',
        'Naṣb',
        'Khafḍ',
        'Jazm',
      ],
      rows: [
        [
          {
            ar: 'اَلْاِسْمُ الْمُفْرَدُ',
            footnote: { english: 'singular noun', turkish: 'tekil isim' },
          },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { ar: 'ـِ', footnote: 'kasra' },
          '—',
        ],
        [
          {
            ar: 'جَمْعُ التَّكْسِيرِ',
            footnote: { english: 'broken plural', turkish: 'kırık çoğul' },
          },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { ar: 'ـِ', footnote: 'kasra' },
          '—',
        ],
        [
          {
            ar: 'جَمْعُ الْمُؤَنَّثِ السَّالِمُ',
            footnote: { english: 'sound fem. plural', turkish: 'kurallı dişil çoğul' },
          },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـِ', footnote: 'kasra (!)' },
          { ar: 'ـِ', footnote: 'kasra' },
          '—',
        ],
        [
          {
            ar: 'اَلْمَمْنُوعُ مِنَ الصَّرْفِ',
            footnote: { english: 'diptote', turkish: 'gayr-i munsarif' },
          },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { ar: 'ـَ', footnote: 'fatḥa (!)' },
          '—',
        ],
        [
          { ar: 'اَلْمُثَنَّى', footnote: { english: 'dual', turkish: 'ikil' } },
          { ar: 'ـَانِ', footnote: 'alif' },
          { ar: 'ـَيْنِ', footnote: 'yāʾ' },
          { ar: 'ـَيْنِ', footnote: 'yāʾ' },
          '—',
        ],
        [
          {
            ar: 'جَمْعُ الْمُذَكَّرِ السَّالِمُ',
            footnote: { english: 'sound masc. plural', turkish: 'kurallı eril çoğul' },
          },
          { ar: 'ـُونَ', footnote: 'wāw' },
          { ar: 'ـِينَ', footnote: 'yāʾ' },
          { ar: 'ـِينَ', footnote: 'yāʾ' },
          '—',
        ],
        [
          {
            ar: 'اَلْأَسْمَاءُ الْخَمْسَةُ',
            footnote: { english: 'five nouns', turkish: 'beş isim' },
          },
          { ar: 'أَبُوكَ', footnote: 'wāw' },
          { ar: 'أَبَاكَ', footnote: 'alif' },
          { ar: 'أَبِيكَ', footnote: 'yāʾ' },
          '—',
        ],
        [
          {
            ar: 'اَلْفِعْلُ الْمُضَارِعُ الصَّحِيحُ',
            footnote: { english: 'sound present verb', turkish: 'sahih muzari fiil' },
          },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          '—',
          { ar: 'ـْ', footnote: 'sukūn' },
        ],
        [
          {
            ar: 'اَلْفِعْلُ الْمُعْتَلُّ الْآخِرِ',
            footnote: { english: 'weak-ending verb', turkish: 'muʿtel fiil' },
          },
          { ar: 'ـُ', footnote: { english: 'implied ḍamma', turkish: 'takdirî damme' } },
          { ar: 'ـَ', footnote: 'fatḥa' },
          '—',
          {
            ar: 'حَذْفُ حَرْفِ الْعِلَّةِ',
            footnote: { english: 'drop weak letter', turkish: 'illet harfi düşer' },
          },
        ],
        [
          {
            ar: 'اَلْأَفْعَالُ الْخَمْسَةُ',
            footnote: { english: 'five verb forms', turkish: 'beş fiil' },
          },
          { ar: 'ثُبُوتُ النُّونِ', footnote: { english: 'nūn stays', turkish: 'nûn sabit' } },
          { ar: 'حَذْفُ النُّونِ', footnote: { english: 'nūn drops', turkish: 'nûn düşer' } },
          '—',
          { ar: 'حَذْفُ النُّونِ', footnote: { english: 'nūn drops', turkish: 'nûn düşer' } },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'How to use this table', turkish: 'Bu tablo nasıl kullanılır' },
      paragraphs: [
        {
          english:
            'To parse a word: find its class in the first column, find its state from its role in the sentence, and read off the sign. The (!) marks the two famous exceptions: sound feminine plural takes kasra in naṣb, and the diptote takes fatḥa in khafḍ.',
          turkish:
            'Bir kelimeyi tahlil etmek için: türünü ilk sütunda bul, cümledeki görevinden durumunu belirle ve alâmeti oku. (!) işareti iki meşhur istisnayı gösterir: kurallı dişil çoğul nasb halinde kesra alır, gayr-i munsarif ise cer halinde fetha alır.',
        },
      ],
    },
  ],
}
