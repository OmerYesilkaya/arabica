import type { ReferenceEntry } from '../types'

// Full entry: every harf with its extended senses.
// DRAFT: verify against your textbook before relying on it.
//
// Sourcing: sense examples follow Quran > Hadith > fusha. Quranic examples
// carry a `source` citation (surah:ayah). Where a clear, short Quranic (or
// Hadith) example is not safely at hand, the fusha fallback is kept and
// flagged with a "DRAFT (fusha fallback)" comment explaining why.

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
            arabic: 'مِنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى',
            english: 'from the Sacred Mosque to the Farthest Mosque',
            turkish: 'Mescid-i Haram’dan Mescid-i Aksa’ya',
            source: 'Qur’an 17:1',
          },
        },
        {
          term: 'Tabʿīḍ',
          termArabic: 'اَلتَّبْعِيضُ',
          english: 'Partitive: "some of".',
          turkish: 'Kısmîlik bildirir: "bir kısmı, -den bazısı".',
          // DRAFT (fusha fallback): clear Quranic partitives use the contracted
          // مِمَّا, which hides the harf; a plain مِنْ + noun reads as ibtidāʾ.
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
            arabic: 'فَاجْتَنِبُوا الرِّجْسَ مِنَ الْأَوْثَانِ',
            english: 'so avoid the abomination of idols',
            turkish: 'putlardan ibaret o pislikten kaçının',
            source: 'Qur’an 22:30',
          },
        },
        {
          term: 'Zāʾidah',
          termArabic: 'زَائِدَةٌ',
          english: 'Extra, for emphasis, usually after a negation.',
          turkish: 'Tekid için zâid gelir, çoğunlukla olumsuzdan sonra.',
          example: {
            arabic: 'مَا جَاءَنَا مِن بَشِيرٍ وَلَا نَذِيرٍ',
            english: 'No bringer of glad tidings has come to us, nor a warner',
            turkish: 'Bize ne bir müjdeci ne de bir uyarıcı geldi',
            source: 'Qur’an 5:19',
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
            arabic: 'ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ',
            english: 'then complete the fast until night',
            turkish: 'sonra orucu geceye kadar tamamlayın',
            source: 'Qur’an 2:187',
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
            arabic: 'وَأَعْرِضْ عَنِ الْجَاهِلِينَ',
            english: 'and turn away from the ignorant',
            turkish: 've cahillerden yüz çevir',
            source: 'Qur’an 7:199',
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
            arabic: 'وَعَلَى الْفُلْكِ تُحْمَلُونَ',
            english: 'and upon the ships you are carried',
            turkish: 've gemiler üstünde taşınırsınız',
            source: 'Qur’an 23:22',
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
            arabic: 'فِي بِضْعِ سِنِينَ',
            english: 'within a few years',
            turkish: 'birkaç yıl içinde',
            source: 'Qur’an 30:4',
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
          // DRAFT (fusha fallback): رُبَّ occurs in the Qur’an only as رُبَمَا
          // (15:2), which does not enter on a bare indefinite noun as here.
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
      particle: 'بِ',
      english: 'with, by',
      turkish: 'ile, -le / -la',
      senses: [
        {
          term: 'Ilṣāq',
          termArabic: 'اَلْإِلْصَاقُ',
          english: 'Attachment or contact: "at, by, in contact with".',
          turkish: 'Yapışma ve temas bildirir: "değme, temas".',
          // DRAFT (fusha fallback): the textbook ilṣāq example; the Qur’anic
          // بِرُءُوسِكُمْ (5:6) is disputed (ilṣāq vs tabʿīḍ), so it teaches less cleanly.
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
            arabic: 'الَّذِي عَلَّمَ بِالْقَلَمِ',
            english: 'who taught by the pen',
            turkish: 'kalemle öğreten',
            source: 'Qur’an 96:4',
          },
        },
        {
          term: 'Sababiyyah',
          termArabic: 'اَلسَّبَبِيَّةُ',
          english: 'Cause: "because of".',
          turkish: 'Sebep bildirir: "sebebiyle, yüzünden".',
          example: {
            arabic: 'فَكُلًّا أَخَذْنَا بِذَنبِهِ',
            english: 'each We seized for his sin',
            turkish: 'her birini günahı sebebiyle yakaladık',
            source: 'Qur’an 29:40',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'kaf',
      arabic: 'الْكَافُ (كَـ)',
      particle: 'كَ',
      english: 'like, as',
      turkish: 'gibi',
      senses: [
        {
          term: 'Tashbīh',
          termArabic: 'اَلتَّشْبِيهُ',
          english: 'Comparison: "like, as".',
          turkish: 'Benzetme bildirir: "gibi".',
          example: {
            arabic: 'كَمَثَلِ الْحِمَارِ يَحْمِلُ أَسْفَارًا',
            english: 'like a donkey carrying books',
            turkish: 'kitaplar taşıyan eşek gibi',
            source: 'Qur’an 62:5',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'lam',
      arabic: 'اللَّامُ (لِـ)',
      particle: 'لِ',
      english: 'for, belonging to',
      turkish: 'için; -in (aitlik)',
      senses: [
        {
          term: 'Milk / Istiḥqāq',
          termArabic: 'اَلْمِلْكُ / اَلْاِسْتِحْقَاقُ',
          english: 'Possession or entitlement: "belongs to, is for".',
          turkish: 'Mülkiyet ve hak edilme bildirir: "-indir, -e aittir".',
          example: {
            arabic: 'لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
            english: 'To Allah belongs whatever is in the heavens and the earth',
            turkish: 'Göklerde ve yerde ne varsa Allah’ındır',
            source: 'Qur’an 2:284',
          },
        },
        {
          term: 'Taʿlīl',
          termArabic: 'اَلتَّعْلِيلُ',
          english: 'Reason or purpose: "for, in order to".',
          turkish: 'Sebep ve amaç bildirir: "için".',
          // DRAFT (fusha fallback): the Qur’anic lām of taʿlīl governs verbs
          // (lām kay), e.g. لِيَعْبُدُونِ (51:56); a short one over a bare noun is not at hand.
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
      particle: 'وَ',
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
            arabic: 'وَالْعَصْرِ',
            english: 'By the ˹passage of˺ time',
            turkish: 'Asra (zamana) andolsun',
            source: 'Qur’an 103:1',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ba-qasam',
      arabic: 'بَاءُ الْقَسَمِ (بِ)',
      particle: 'بِ',
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
            arabic: 'وَأَقْسَمُوا بِاللَّهِ جَهْدَ أَيْمَانِهِمْ',
            english: 'And they swear by Allah their strongest oaths',
            turkish: 'Var güçleriyle Allah’a yemin ettiler',
            source: 'Qur’an 16:38',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ta-qasam',
      arabic: 'تَاءُ الْقَسَمِ (تَ)',
      particle: 'تَ',
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
            turkish: 'Allah’a andolsun, putlarınıza mutlaka bir tuzak kuracağım',
            source: 'Qur’an 21:57',
          },
        },
      ],
    },
  ],
}
