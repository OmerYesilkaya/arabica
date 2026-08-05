import type { ReferenceEntry } from '../types'

// Full entry: every harf with its extended senses.
// DRAFT: verify against your textbook before relying on it.

export const hurufAlKhafdRef: ReferenceEntry = {
  id: 'huruf-al-khafd',
  title: 'Ḥurūf al-Khafḍ',
  titleArabic: 'حُرُوفُ الْخَفْضِ',
  order: 3,
  summary: 'All particles of khafḍ with their senses, examples, and glosses.',
  sections: [
    {
      kind: 'prose',
      title: 'Overview',
      arabic:
        'وَهِيَ مِنْ، وَإِلَى، وَعَنْ، وَعَلَى، وَفِي، وَرُبَّ، وَالْبَاءُ، وَالْكَافُ، وَاللَّامُ، وَحُرُوفُ الْقَسَمِ وَهِيَ الْوَاوُ وَالْبَاءُ وَالتَّاءُ',
      paragraphs: [
        'EN: These particles put the noun after them into the state of khafḍ (also called jarr): its ending becomes kasra, or the substitute sign of its word class.',
        'TR: Bu harfler, kendilerinden sonra gelen ismi hafd (cer) durumuna sokar: kelimenin sonu kesra veya o kelime türünün vekil alâmetini alır.',
      ],
    },
    {
      kind: 'table',
      title: 'Quick table',
      columns: ['Ḥarf', 'English', 'Türkçe', 'Example'],
      rows: [
        [{ ar: 'مِنْ' }, 'from', '-den / -dan', { ar: 'مِنَ الْبَيْتِ' }],
        [{ ar: 'إِلَى' }, 'to, towards', '-e / -a (kadar)', { ar: 'إِلَى الْمَسْجِدِ' }],
        [{ ar: 'عَنْ' }, 'away from, about', '-den (uzaklaşma); hakkında', { ar: 'عَنِ الْقَوْسِ' }],
        [{ ar: 'عَلَى' }, 'on, upon', 'üzerinde, üstünde', { ar: 'عَلَى الْكُرْسِيِّ' }],
        [{ ar: 'فِي' }, 'in, inside', 'içinde, -de / -da', { ar: 'فِي الدَّارِ' }],
        [{ ar: 'رُبَّ' }, 'many a ...', 'nice (nice ... vardır ki)', { ar: 'رُبَّ رَجُلٍ' }],
        [{ ar: 'بِـ' }, 'with, by', 'ile, -le / -la', { ar: 'بِالْقَلَمِ' }],
        [{ ar: 'كَـ' }, 'like, as', 'gibi', { ar: 'كَالْأَسَدِ' }],
        [{ ar: 'لِـ' }, 'for, belonging to', 'için; -in (aitlik)', { ar: 'لِزَيْدٍ' }],
        [{ ar: 'وَ' }, 'by (oath)', 'yemin vavı', { ar: 'وَاللَّهِ' }],
        [{ ar: 'بِ' }, 'by (oath)', 'yemin bâsı', { ar: 'بِاللَّهِ' }],
        [{ ar: 'تَ' }, 'by (oath)', 'yemin tâsı', { ar: 'تَاللَّهِ' }],
      ],
    },
    {
      kind: 'harf',
      id: 'min',
      arabic: 'مِنْ',
      english: 'from',
      turkish: '-den / -dan',
      senses: [
        {
          term: 'Ibtidāʾ al-ghāyah',
          termArabic: 'اِبْتِدَاءُ الْغَايَةِ',
          english: 'Starting point of place or time: "from".',
          turkish: 'Mekân veya zamanda başlangıç noktası: "-den itibaren".',
          example: {
            arabic: 'سِرْتُ مِنَ الْبَصْرَةِ',
            english: 'I travelled from Basra',
            turkish: 'Basra’dan yola çıktım',
          },
        },
        {
          term: 'Tabʿīḍ',
          termArabic: 'اَلتَّبْعِيضُ',
          english: 'Partitive: "some of".',
          turkish: 'Kısmîlik bildirir: "bir kısmı, -den bazısı".',
          example: {
            arabic: 'أَخَذْتُ مِنَ الدَّرَاهِمِ',
            english: 'I took some of the dirhams',
            turkish: 'Dirhemlerin bir kısmını aldım',
          },
        },
        {
          term: 'Bayān al-jins',
          termArabic: 'بَيَانُ الْجِنْسِ',
          english: 'Clarifies the kind of a thing: "of (the type of)".',
          turkish: 'Cinsi açıklar: "türünden, cinsinden".',
          example: {
            arabic: 'خَاتَمٌ مِنْ فِضَّةٍ',
            english: 'A ring of silver',
            turkish: 'Gümüşten bir yüzük',
          },
        },
        {
          term: 'Zāʾidah',
          termArabic: 'زَائِدَةٌ',
          english: 'Extra, for emphasis, usually after a negation.',
          turkish: 'Tekid için zâid gelir, çoğunlukla olumsuzdan sonra.',
          example: {
            arabic: 'مَا جَاءَنَا مِنْ أَحَدٍ',
            english: 'No one at all came to us',
            turkish: 'Bize hiç kimse gelmedi',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ila',
      arabic: 'إِلَى',
      english: 'to, towards',
      turkish: '-e / -a (kadar)',
      senses: [
        {
          term: 'Intihāʾ al-ghāyah',
          termArabic: 'اِنْتِهَاءُ الْغَايَةِ',
          english: 'Endpoint of place or time: "to, until".',
          turkish: 'Mekân veya zamanda bitiş noktası: "-e kadar".',
          example: {
            arabic: 'سِرْتُ إِلَى الْكُوفَةِ',
            english: 'I travelled to Kufa',
            turkish: 'Kûfe’ye kadar gittim',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'an',
      arabic: 'عَنْ',
      english: 'away from, about',
      turkish: '-den (uzaklaşma); hakkında',
      senses: [
        {
          term: 'Mujāwazah',
          termArabic: 'اَلْمُجَاوَزَةُ',
          english: 'Passing away or distance from: "away from, off".',
          turkish: 'Uzaklaşma ve ayrılma bildirir: "-den uzağa".',
          example: {
            arabic: 'رَمَيْتُ السَّهْمَ عَنِ الْقَوْسِ',
            english: 'I shot the arrow from the bow',
            turkish: 'Oku yaydan attım',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ala',
      arabic: 'عَلَى',
      english: 'on, upon',
      turkish: 'üzerinde, üstünde',
      senses: [
        {
          term: 'Istiʿlāʾ',
          termArabic: 'اَلْاِسْتِعْلَاءُ',
          english: 'Being above or on top of: "on, over".',
          turkish: 'Üstte olma bildirir: "üzerinde, üstünde".',
          example: {
            arabic: 'صَعِدْتُ عَلَى الْجَبَلِ',
            english: 'I climbed up the mountain',
            turkish: 'Dağın üstüne çıktım',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'fi',
      arabic: 'فِي',
      english: 'in, inside',
      turkish: 'içinde, -de / -da',
      senses: [
        {
          term: 'Ẓarfiyyah',
          termArabic: 'اَلظَّرْفِيَّةُ',
          english: 'Containment in place or time: "in, within".',
          turkish: 'Mekân veya zaman içinde olma: "içinde".',
          example: {
            arabic: 'الْمَاءُ فِي الْكُوزِ',
            english: 'The water is in the jug',
            turkish: 'Su testinin içindedir',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'rubba',
      arabic: 'رُبَّ',
      english: 'many a ... (sometimes: few a ...)',
      turkish: 'nice (nice ... vardır ki)',
      senses: [
        {
          term: 'Takthīr / Taqlīl',
          termArabic: 'اَلتَّكْثِيرُ / اَلتَّقْلِيلُ',
          english:
            'Expresses abundance ("many a ...") or, by context, scarcity ("few a ..."). Enters only on indefinite nouns.',
          turkish:
            'Çokluk ("nice") veya bağlama göre azlık bildirir. Yalnız nekre (belirsiz) isimlerin başına gelir.',
          example: {
            arabic: 'رُبَّ رَجُلٍ كَرِيمٍ لَقِيتُهُ',
            english: 'Many a generous man have I met',
            turkish: 'Nice cömert adamla karşılaştım',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ba',
      arabic: 'الْبَاءُ (بِـ)',
      english: 'with, by',
      turkish: 'ile, -le / -la',
      senses: [
        {
          term: 'Ilṣāq',
          termArabic: 'اَلْإِلْصَاقُ',
          english: 'Attachment or contact: "at, by, in contact with".',
          turkish: 'Yapışma ve temas bildirir: "değme, temas".',
          example: {
            arabic: 'مَرَرْتُ بِزَيْدٍ',
            english: 'I passed by Zayd',
            turkish: 'Zeyd’e uğradım',
          },
        },
        {
          term: 'Istiʿānah',
          termArabic: 'اَلْاِسْتِعَانَةُ',
          english: 'Instrument: "with, by means of".',
          turkish: 'Alet ve vasıta bildirir: "ile".',
          example: {
            arabic: 'كَتَبْتُ بِالْقَلَمِ',
            english: 'I wrote with the pen',
            turkish: 'Kalemle yazdım',
          },
        },
        {
          term: 'Sababiyyah',
          termArabic: 'اَلسَّبَبِيَّةُ',
          english: 'Cause: "because of".',
          turkish: 'Sebep bildirir: "sebebiyle, yüzünden".',
          example: {
            arabic: 'أُخِذَ بِذَنْبِهِ',
            english: 'He was seized because of his sin',
            turkish: 'Günahı sebebiyle yakalandı',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'kaf',
      arabic: 'الْكَافُ (كَـ)',
      english: 'like, as',
      turkish: 'gibi',
      senses: [
        {
          term: 'Tashbīh',
          termArabic: 'اَلتَّشْبِيهُ',
          english: 'Comparison: "like, as".',
          turkish: 'Benzetme bildirir: "gibi".',
          example: {
            arabic: 'زَيْدٌ كَالْأَسَدِ',
            english: 'Zayd is like a lion',
            turkish: 'Zeyd aslan gibidir',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'lam',
      arabic: 'اللَّامُ (لِـ)',
      english: 'for, belonging to',
      turkish: 'için; -in (aitlik)',
      senses: [
        {
          term: 'Milk / Istiḥqāq',
          termArabic: 'اَلْمِلْكُ / اَلْاِسْتِحْقَاقُ',
          english: 'Possession or entitlement: "belongs to, is for".',
          turkish: 'Mülkiyet ve hak edilme bildirir: "-indir, -e aittir".',
          example: {
            arabic: 'الْمَالُ لِزَيْدٍ',
            english: 'The wealth belongs to Zayd',
            turkish: 'Mal Zeyd’indir',
          },
        },
        {
          term: 'Taʿlīl',
          termArabic: 'اَلتَّعْلِيلُ',
          english: 'Reason or purpose: "for, in order to".',
          turkish: 'Sebep ve amaç bildirir: "için".',
          example: {
            arabic: 'جِئْتُ لِلْعِلْمِ',
            english: 'I came for knowledge',
            turkish: 'İlim için geldim',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'waw-qasam',
      arabic: 'وَاوُ الْقَسَمِ (وَ)',
      english: 'by ... (oath)',
      turkish: 'yemin vavı',
      senses: [
        {
          term: 'Qasam',
          termArabic: 'اَلْقَسَمُ',
          english:
            'Oath particle: the most common one. Enters only on the visible (ẓāhir) noun sworn by.',
          turkish:
            'Yemin harfi: en yaygın olanı. Yalnız açık (zâhir) ismin başına gelir.',
          example: {
            arabic: 'وَاللَّهِ لَأَجْتَهِدَنَّ',
            english: 'By Allah, I will surely strive',
            turkish: 'Vallahi, elbette çalışacağım',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ba-qasam',
      arabic: 'بَاءُ الْقَسَمِ (بِ)',
      english: 'by ... (oath)',
      turkish: 'yemin bâsı',
      senses: [
        {
          term: 'Qasam',
          termArabic: 'اَلْقَسَمُ',
          english:
            'Oath particle: the original one. May enter on both visible nouns and pronouns.',
          turkish:
            'Yemin harfi: aslî olanı. Hem açık ismin hem zamirin başına gelebilir.',
          example: {
            arabic: 'بِاللَّهِ عَلَيْكَ',
            english: 'By Allah, (I urge) you',
            turkish: 'Allah aşkına',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ta-qasam',
      arabic: 'تَاءُ الْقَسَمِ (تَ)',
      english: 'by ... (oath)',
      turkish: 'yemin tâsı',
      senses: [
        {
          term: 'Qasam',
          termArabic: 'اَلْقَسَمُ',
          english: 'Oath particle: used almost only with the name of Allah.',
          turkish: 'Yemin harfi: hemen yalnız Allah lafzıyla kullanılır.',
          example: {
            arabic: 'تَاللَّهِ لَأَكِيدَنَّ أَصْنَامَكُمْ',
            english: 'By Allah, I will surely plot against your idols',
            turkish: 'Tallahi, putlarınıza elbette tuzak kuracağım',
          },
        },
      ],
    },
  ],
}
