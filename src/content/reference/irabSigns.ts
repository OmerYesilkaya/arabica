import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, chapter 2: al-iʿrāb and its signs.
// DRAFT: verify against your textbook before relying on it.

export const irabSigns: ReferenceEntry = {
  id: 'irab-signs',
  title: 'Iʿrāb and its Signs',
  titleArabic: 'اَلْإِعْرَابُ وَعَلَامَاتُهُ',
  order: 2,
  summary: 'The four states (rafʿ, naṣb, khafḍ, jazm) and the sign each word class takes.',
  sections: [
    {
      kind: 'prose',
      title: 'What iʿrāb is',
      arabic:
        'اَلْإِعْرَابُ هُوَ تَغْيِيرُ أَوَاخِرِ الْكَلِمِ لِاخْتِلَافِ الْعَوَامِلِ الدَّاخِلَةِ عَلَيْهَا لَفْظًا أَوْ تَقْدِيرًا',
      paragraphs: [
        'EN: Iʿrāb is the change of word endings caused by the different governing agents that act on them, shown openly (lafẓan) or implied (taqdīran).',
        'TR: İʿrâb; kelime sonlarının, başlarına gelen âmillerin değişmesiyle açıkça (lafzan) veya takdiren değişmesidir.',
      ],
    },
    {
      kind: 'table',
      title: 'The four states',
      columns: ['State', 'Arabic', 'Primary sign', 'Applies to', 'Türkçe'],
      rows: [
        ['Rafʿ', { ar: 'اَلرَّفْعُ' }, { ar: 'ـُ', footnote: 'ḍamma' }, 'nouns and verbs', 'ref (ötre)'],
        ['Naṣb', { ar: 'اَلنَّصْبُ' }, { ar: 'ـَ', footnote: 'fatḥa' }, 'nouns and verbs', 'nasb (üstün)'],
        ['Khafḍ', { ar: 'اَلْخَفْضُ' }, { ar: 'ـِ', footnote: 'kasra' }, 'nouns only', 'hafd / cer (esre)'],
        ['Jazm', { ar: 'اَلْجَزْمُ' }, { ar: 'ـْ', footnote: 'sukūn' }, 'verbs only', 'cezm (cezim)'],
      ],
    },
    {
      kind: 'table',
      title: 'Signs by word class',
      caption:
        'EN: Which sign each word class takes in each state. A dash means the state does not apply. / TR: Her kelime türünün her durumda aldığı alâmet. Çizgi, o durumun geçerli olmadığını gösterir.',
      columns: ['Word class', 'Rafʿ', 'Naṣb', 'Khafḍ', 'Jazm'],
      rows: [
        [
          { ar: 'اَلْاِسْمُ الْمُفْرَدُ', footnote: 'singular noun / tekil isim' },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { ar: 'ـِ', footnote: 'kasra' },
          '—',
        ],
        [
          { ar: 'جَمْعُ التَّكْسِيرِ', footnote: 'broken plural / kırık çoğul' },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { ar: 'ـِ', footnote: 'kasra' },
          '—',
        ],
        [
          { ar: 'جَمْعُ الْمُؤَنَّثِ السَّالِمُ', footnote: 'sound fem. plural / kurallı dişil çoğul' },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـِ', footnote: 'kasra (!)' },
          { ar: 'ـِ', footnote: 'kasra' },
          '—',
        ],
        [
          { ar: 'اَلْمَمْنُوعُ مِنَ الصَّرْفِ', footnote: 'diptote / gayr-i munsarif' },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { ar: 'ـَ', footnote: 'fatḥa (!)' },
          '—',
        ],
        [
          { ar: 'اَلْمُثَنَّى', footnote: 'dual / ikil' },
          { ar: 'ـَانِ', footnote: 'alif' },
          { ar: 'ـَيْنِ', footnote: 'yāʾ' },
          { ar: 'ـَيْنِ', footnote: 'yāʾ' },
          '—',
        ],
        [
          { ar: 'جَمْعُ الْمُذَكَّرِ السَّالِمُ', footnote: 'sound masc. plural / kurallı eril çoğul' },
          { ar: 'ـُونَ', footnote: 'wāw' },
          { ar: 'ـِينَ', footnote: 'yāʾ' },
          { ar: 'ـِينَ', footnote: 'yāʾ' },
          '—',
        ],
        [
          { ar: 'اَلْأَسْمَاءُ الْخَمْسَةُ', footnote: 'five nouns / beş isim' },
          { ar: 'أَبُوكَ', footnote: 'wāw' },
          { ar: 'أَبَاكَ', footnote: 'alif' },
          { ar: 'أَبِيكَ', footnote: 'yāʾ' },
          '—',
        ],
        [
          { ar: 'اَلْفِعْلُ الْمُضَارِعُ الصَّحِيحُ', footnote: 'sound present verb / sahih muzari fiil' },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          '—',
          { ar: 'ـْ', footnote: 'sukūn' },
        ],
        [
          { ar: 'اَلْفِعْلُ الْمُعْتَلُّ الْآخِرِ', footnote: 'weak-ending verb / muʿtel fiil' },
          { ar: 'ـُ', footnote: 'implied ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          '—',
          { ar: 'حَذْفُ حَرْفِ الْعِلَّةِ', footnote: 'drop weak letter' },
        ],
        [
          { ar: 'اَلْأَفْعَالُ الْخَمْسَةُ', footnote: 'five verb forms / beş fiil' },
          { ar: 'ثُبُوتُ النُّونِ', footnote: 'nūn stays' },
          { ar: 'حَذْفُ النُّونِ', footnote: 'nūn drops' },
          '—',
          { ar: 'حَذْفُ النُّونِ', footnote: 'nūn drops' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'How to use this table',
      paragraphs: [
        'EN: To parse a word: find its class in the first column, find its state from its role in the sentence, and read off the sign. The (!) marks the two famous exceptions: sound feminine plural takes kasra in naṣb, and the diptote takes fatḥa in khafḍ.',
        'TR: Bir kelimeyi tahlil etmek için: türünü ilk sütunda bul, cümledeki görevinden durumunu belirle ve alâmeti oku. (!) işareti iki meşhur istisnayı gösterir: kurallı dişil çoğul nasb halinde kesra alır, gayr-i munsarif ise cer halinde fetha alır.',
      ],
    },
  ],
}
