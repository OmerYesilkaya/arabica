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
        ['Rafʿ', { ar: 'اَلرَّفْعُ' }, { ar: 'ـُ', note: 'ḍamma' }, 'nouns and verbs', 'ref (ötre)'],
        ['Naṣb', { ar: 'اَلنَّصْبُ' }, { ar: 'ـَ', note: 'fatḥa' }, 'nouns and verbs', 'nasb (üstün)'],
        ['Khafḍ', { ar: 'اَلْخَفْضُ' }, { ar: 'ـِ', note: 'kasra' }, 'nouns only', 'hafd / cer (esre)'],
        ['Jazm', { ar: 'اَلْجَزْمُ' }, { ar: 'ـْ', note: 'sukūn' }, 'verbs only', 'cezm (cezim)'],
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
          { ar: 'اَلْاِسْمُ الْمُفْرَدُ', note: 'singular noun / tekil isim' },
          { ar: 'ـُ', note: 'ḍamma' },
          { ar: 'ـَ', note: 'fatḥa' },
          { ar: 'ـِ', note: 'kasra' },
          '—',
        ],
        [
          { ar: 'جَمْعُ التَّكْسِيرِ', note: 'broken plural / kırık çoğul' },
          { ar: 'ـُ', note: 'ḍamma' },
          { ar: 'ـَ', note: 'fatḥa' },
          { ar: 'ـِ', note: 'kasra' },
          '—',
        ],
        [
          { ar: 'جَمْعُ الْمُؤَنَّثِ السَّالِمُ', note: 'sound fem. plural / kurallı dişil çoğul' },
          { ar: 'ـُ', note: 'ḍamma' },
          { ar: 'ـِ', note: 'kasra (!)' },
          { ar: 'ـِ', note: 'kasra' },
          '—',
        ],
        [
          { ar: 'اَلْمَمْنُوعُ مِنَ الصَّرْفِ', note: 'diptote / gayr-i munsarif' },
          { ar: 'ـُ', note: 'ḍamma' },
          { ar: 'ـَ', note: 'fatḥa' },
          { ar: 'ـَ', note: 'fatḥa (!)' },
          '—',
        ],
        [
          { ar: 'اَلْمُثَنَّى', note: 'dual / ikil' },
          { ar: 'ـَانِ', note: 'alif' },
          { ar: 'ـَيْنِ', note: 'yāʾ' },
          { ar: 'ـَيْنِ', note: 'yāʾ' },
          '—',
        ],
        [
          { ar: 'جَمْعُ الْمُذَكَّرِ السَّالِمُ', note: 'sound masc. plural / kurallı eril çoğul' },
          { ar: 'ـُونَ', note: 'wāw' },
          { ar: 'ـِينَ', note: 'yāʾ' },
          { ar: 'ـِينَ', note: 'yāʾ' },
          '—',
        ],
        [
          { ar: 'اَلْأَسْمَاءُ الْخَمْسَةُ', note: 'five nouns / beş isim' },
          { ar: 'أَبُوكَ', note: 'wāw' },
          { ar: 'أَبَاكَ', note: 'alif' },
          { ar: 'أَبِيكَ', note: 'yāʾ' },
          '—',
        ],
        [
          { ar: 'اَلْفِعْلُ الْمُضَارِعُ الصَّحِيحُ', note: 'sound present verb / sahih muzari fiil' },
          { ar: 'ـُ', note: 'ḍamma' },
          { ar: 'ـَ', note: 'fatḥa' },
          '—',
          { ar: 'ـْ', note: 'sukūn' },
        ],
        [
          { ar: 'اَلْفِعْلُ الْمُعْتَلُّ الْآخِرِ', note: 'weak-ending verb / muʿtel fiil' },
          { ar: 'ـُ', note: 'implied ḍamma' },
          { ar: 'ـَ', note: 'fatḥa' },
          '—',
          { ar: 'حَذْفُ حَرْفِ الْعِلَّةِ', note: 'drop weak letter' },
        ],
        [
          { ar: 'اَلْأَفْعَالُ الْخَمْسَةُ', note: 'five verb forms / beş fiil' },
          { ar: 'ثُبُوتُ النُّونِ', note: 'nūn stays' },
          { ar: 'حَذْفُ النُّونِ', note: 'nūn drops' },
          '—',
          { ar: 'حَذْفُ النُّونِ', note: 'nūn drops' },
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
