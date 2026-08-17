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
  title: { english: 'Ḥurūf al-Khafḍ', turkish: 'Cer Harfleri' },
  titleArabic: 'حُرُوفُ الْخَفْضِ',
  order: 3,
  summary: {
    english: 'All particles of khafḍ with their senses, examples, and meanings.',
    turkish: 'Bütün cer harfleri; vecihleri, misalleri ve manalarıyla.',
  },
  sections: [
    {
      kind: 'prose',
      title: { english: 'Overview', turkish: 'Genel bakış' },
      arabic:
        'وَهِيَ مِنْ، وَإِلَى، وَعَنْ، وَعَلَى، وَفِي، وَرُبَّ، وَالْبَاءُ، وَالْكَافُ، وَاللَّامُ، وَحُرُوفُ الْقَسَمِ وَهِيَ الْوَاوُ وَالْبَاءُ وَالتَّاءُ',
      paragraphs: [
        {
          english:
            'These particles put the noun after them into the state of khafḍ (also called jarr): its ending becomes kasra, or the substitute sign of its word class.',
          turkish:
            'Bu harfler, kendilerinden sonra gelen ismi hafd (cer) durumuna sokar: kelimenin sonu kesra veya o kelime türünün vekil alâmetini alır.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'Quick table', turkish: 'Kısa tablo' },
      columns: [
        'Ḥarf',
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Example', turkish: 'Örnek' },
      ],
      rows: [
        [{ ar: 'مِنْ' }, { english: 'from', turkish: '-den / -dan' }, { ar: 'مِنَ الْبَيْتِ' }],
        [
          { ar: 'إِلَى' },
          { english: 'to, towards', turkish: '-e / -a (kadar)' },
          { ar: 'إِلَى الْمَسْجِدِ' },
        ],
        [
          { ar: 'عَنْ' },
          { english: 'away from, about', turkish: '-den (uzaklaşma); hakkında' },
          { ar: 'عَنِ الْقَوْسِ' },
        ],
        [
          { ar: 'عَلَى' },
          { english: 'on, upon', turkish: 'üzerinde, üstünde' },
          { ar: 'عَلَى الْكُرْسِيِّ' },
        ],
        [
          { ar: 'فِي' },
          { english: 'in, inside', turkish: 'içinde, -de / -da' },
          { ar: 'فِي الدَّارِ' },
        ],
        [
          { ar: 'رُبَّ' },
          { english: 'many a ...', turkish: 'nice (nice ... vardır ki)' },
          { ar: 'رُبَّ رَجُلٍ' },
        ],
        [{ ar: 'بِـ' }, { english: 'with, by', turkish: 'ile, -le / -la' }, { ar: 'بِالْقَلَمِ' }],
        [{ ar: 'كَـ' }, { english: 'like, as', turkish: 'gibi' }, { ar: 'كَالْأَسَدِ' }],
        [
          { ar: 'لِـ' },
          { english: 'for, belonging to', turkish: 'için; -in (aitlik)' },
          { ar: 'لِزَيْدٍ' },
        ],
        [{ ar: 'وَ' }, { english: 'by (oath)', turkish: 'yemin vavı' }, { ar: 'وَاللَّهِ' }],
        [{ ar: 'بِ' }, { english: 'by (oath)', turkish: 'yemin bâsı' }, { ar: 'بِاللَّهِ' }],
        [{ ar: 'تَ' }, { english: 'by (oath)', turkish: 'yemin tâsı' }, { ar: 'تَاللَّهِ' }],
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
          examples: [
            {
              arabic: 'مِنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى',
              english: 'from the Sacred Mosque to the Farthest Mosque',
              turkish: 'Mescid-i Haram’dan Mescid-i Aksa’ya',
              source: 'Qur’an 17:1',
              highlight: { english: 'from', turkish: 'dan' },
            },
            {
              arabic: 'وَمِنْ حَيْثُ خَرَجْتَ فَوَلِّ وَجْهَكَ',
              english: 'And from wherever you set out, turn your face',
              turkish: 'Nereden çıkarsan, yüzünü o yöne çevir',
              source: 'Qur’an 2:149',
              highlight: { english: 'from', turkish: 'den' },
            },
            {
              arabic: 'أُسِّسَ عَلَى التَّقْوَى مِنْ أَوَّلِ يَوْمٍ',
              english: 'founded upon piety from the first day',
              turkish: 'ilk günden beri takva üzerine kurulmuş',
              source: 'Qur’an 9:108',
              highlight: { english: 'from', turkish: 'den' },
            },
            {
              arabic: 'أَنْ خَلَقَكُمْ مِنْ تُرَابٍ',
              english: 'that He created you from dust',
              turkish: 'sizi topraktan yaratması',
              source: 'Qur’an 30:20',
              highlight: { english: 'from', turkish: 'tan' },
            },
          ],
        },
        {
          term: 'Tabʿīḍ',
          termArabic: 'اَلتَّبْعِيضُ',
          english: 'Partitive: "some of".',
          turkish: 'Kısmîlik bildirir: "bir kısmı, -den bazısı".',
          examples: [
            {
              arabic: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً',
              english: 'Take from their wealth a charity',
              turkish: 'Mallarının bir kısmını sadaka olarak al',
              source: 'Qur’an 9:103',
              highlight: { english: 'from', turkish: 'bir kısmını' },
            },
            {
              arabic: 'أَنْفِقُوا مِنْ طَيِّبَاتِ مَا كَسَبْتُمْ',
              english: 'Spend from the good things you have earned',
              turkish: 'Kazandıklarınızın iyilerinden infak edin',
              source: 'Qur’an 2:267',
              highlight: { english: 'from', turkish: 'lerinden' },
            },
            {
              arabic: 'كُلُوا مِنْ ثَمَرِهِ إِذَا أَثْمَرَ',
              english: 'Eat some of its fruit when it bears fruit',
              turkish: 'Ürün verdiğinde meyvesinden yiyin',
              source: 'Qur’an 6:141',
              highlight: { english: 'some of', turkish: 'sinden' },
            },
            // The textbook's own partitive, kept last: it is the one sentence
            // here where the partitive reading is forced rather than read off
            // the context, which is what makes it worth drilling beside the
            // three ayat.
            {
              arabic: 'أَخَذْتُ مِنَ الدَّرَاهِمِ',
              english: 'I took some of the dirhams',
              turkish: 'Dirhemlerin bir kısmını aldım',
              highlight: { english: 'some of', turkish: 'bir kısmını' },
            },
          ],
        },
        {
          term: 'Bayān al-jins',
          termArabic: 'بَيَانُ الْجِنْسِ',
          english: 'Clarifies the kind of a thing: "of (the type of)".',
          turkish: 'Cinsi açıklar: "türünden, cinsinden".',
          examples: [
            {
              arabic: 'فَاجْتَنِبُوا الرِّجْسَ مِنَ الْأَوْثَانِ',
              english: 'so avoid the abomination of idols',
              turkish: 'putlardan ibaret o pislikten kaçının',
              source: 'Qur’an 22:30',
              highlight: { english: 'of', turkish: 'dan' },
            },
            {
              arabic: 'أَسَاوِرَ مِنْ ذَهَبٍ',
              english: 'bracelets of gold',
              turkish: 'altından bilezikler',
              source: 'Qur’an 22:23',
              highlight: { english: 'of', turkish: 'dan' },
            },
            {
              arabic: 'وَأَنْهَارٌ مِنْ عَسَلٍ مُصَفًّى',
              english: 'and rivers of purified honey',
              turkish: 've süzme baldan ırmaklar',
              source: 'Qur’an 47:15',
              highlight: { english: 'of', turkish: 'dan' },
            },
            {
              arabic: 'وَيَلْبَسُونَ ثِيَابًا خُضْرًا مِنْ سُنْدُسٍ',
              english: 'and they will wear green garments of fine silk',
              turkish: 've ince ipekten yeşil elbiseler giyecekler',
              source: 'Qur’an 18:31',
              highlight: { english: 'of', turkish: 'ten' },
            },
          ],
        },
        {
          term: 'Zāʾidah',
          termArabic: 'زَائِدَةٌ',
          english: 'Extra, for emphasis, usually after a negation.',
          turkish: 'Tekid için zâid gelir, çoğunlukla olumsuzdan sonra.',
          // No highlight on any of these: a zaidah harf adds emphasis and
          // nothing a translation renders as a word of its own, so there is no
          // counterpart span to mark.
          examples: [
            {
              arabic: 'مَا جَاءَنَا مِن بَشِيرٍ وَلَا نَذِيرٍ',
              english: 'No bringer of glad tidings has come to us, nor a warner',
              turkish: 'Bize ne bir müjdeci ne de bir uyarıcı geldi',
              source: 'Qur’an 5:19',
            },
            {
              arabic: 'مَا فَرَّطْنَا فِي الْكِتَابِ مِنْ شَيْءٍ',
              english: 'We have not neglected a thing in the Book',
              turkish: 'Kitapta hiçbir şeyi eksik bırakmadık',
              source: 'Qur’an 6:38',
            },
            {
              arabic: 'وَمَا تَسْقُطُ مِنْ وَرَقَةٍ إِلَّا يَعْلَمُهَا',
              english: 'and not a leaf falls but He knows it',
              turkish: 've O bilmedikçe bir yaprak bile düşmez',
              source: 'Qur’an 6:59',
            },
            {
              arabic: 'مَا يَفْتَحِ اللَّهُ لِلنَّاسِ مِنْ رَحْمَةٍ',
              english: 'whatever mercy Allah opens for people',
              turkish: 'Allah insanlara hangi rahmeti açarsa',
              source: 'Qur’an 35:2',
            },
          ],
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
          examples: [
            {
              arabic: 'ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ',
              english: 'then complete the fast until night',
              turkish: 'sonra orucu geceye kadar tamamlayın',
              source: 'Qur’an 2:187',
              highlight: { english: 'until', turkish: 'kadar' },
            },
            {
              arabic: 'وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ',
              english: 'and your hands up to the elbows',
              turkish: 've dirseklere kadar ellerinizi',
              source: 'Qur’an 5:6',
              highlight: { english: 'up to', turkish: 'kadar' },
            },
            {
              arabic: 'وَلَكُمْ فِي الْأَرْضِ مُسْتَقَرٌّ وَمَتَاعٌ إِلَى حِينٍ',
              english:
                'and for you on the earth is a dwelling and provision until a time',
              turkish: 'Yerde bir süreye kadar barınak ve geçimlik sizin içindir',
              source: 'Qur’an 2:36',
              highlight: { english: 'until', turkish: 'kadar' },
            },
            {
              arabic: 'إِنَّ إِلَى رَبِّكَ الرُّجْعَى',
              english: 'Indeed, to your Lord is the return',
              turkish: 'Şüphesiz dönüş Rabbinedir',
              source: 'Qur’an 96:8',
              highlight: { english: 'to', turkish: 'ne' },
            },
          ],
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
          examples: [
            {
              arabic: 'وَأَعْرِضْ عَنِ الْجَاهِلِينَ',
              english: 'and turn away from the ignorant',
              turkish: 've cahillerden yüz çevir',
              source: 'Qur’an 7:199',
              highlight: { english: 'away from', turkish: 'den' },
            },
            {
              arabic: 'وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ',
              english: 'and those who turn away from vain talk',
              turkish: 'boş sözden yüz çevirenler',
              source: 'Qur’an 23:3',
              highlight: { english: 'away from', turkish: 'den' },
            },
            {
              arabic: 'الَّذِينَ يَصْدِفُونَ عَنْ آيَاتِنَا',
              english: 'those who turn away from Our signs',
              turkish: 'ayetlerimizden yüz çevirenler',
              source: 'Qur’an 6:157',
              highlight: { english: 'away from', turkish: 'den' },
            },
            {
              arabic: 'فَمَنْ زُحْزِحَ عَنِ النَّارِ',
              english: 'so whoever is drawn away from the Fire',
              turkish: 'kim ateşten uzaklaştırılırsa',
              source: 'Qur’an 3:185',
              highlight: { english: 'away from', turkish: 'ten' },
            },
          ],
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
          examples: [
            {
              arabic: 'وَعَلَى الْفُلْكِ تُحْمَلُونَ',
              english: 'and upon the ships you are carried',
              turkish: 've gemiler üstünde taşınırsınız',
              source: 'Qur’an 23:22',
              highlight: { english: 'upon', turkish: 'üstünde' },
            },
            {
              arabic: 'الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا',
              english: 'those who walk upon the earth humbly',
              turkish: 'yeryüzünde alçakgönüllüce yürüyenler',
              source: 'Qur’an 25:63',
              highlight: { english: 'upon', turkish: 'nde' },
            },
            {
              arabic: 'وَكَانَ عَرْشُهُ عَلَى الْمَاءِ',
              english: 'and His Throne was upon the water',
              turkish: 've Arşı suyun üstündeydi',
              source: 'Qur’an 11:7',
              highlight: { english: 'upon', turkish: 'üstünde' },
            },
            {
              arabic: 'عَلَى سُرُرٍ مُتَقَابِلِينَ',
              english: 'upon couches, facing one another',
              turkish: 'karşılıklı tahtlar üzerinde',
              source: 'Qur’an 37:44',
              highlight: { english: 'upon', turkish: 'üzerinde' },
            },
          ],
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
          examples: [
            {
              arabic: 'فِي بِضْعِ سِنِينَ',
              english: 'within a few years',
              turkish: 'birkaç yıl içinde',
              source: 'Qur’an 30:4',
              highlight: { english: 'within', turkish: 'içinde' },
            },
            {
              arabic: 'فِي بُيُوتٍ أَذِنَ اللَّهُ أَنْ تُرْفَعَ',
              english: 'in houses that Allah has ordered to be raised high',
              turkish: 'Allah’ın yükseltilmesini buyurduğu evlerde',
              source: 'Qur’an 24:36',
              highlight: { english: 'in', turkish: 'lerde' },
            },
            {
              arabic: 'فَلَبِثَ فِي السِّجْنِ بِضْعَ سِنِينَ',
              english: 'so he stayed in prison for several years',
              turkish: 'hapishanede birkaç yıl kaldı',
              source: 'Qur’an 12:42',
              highlight: { english: 'in', turkish: 'de' },
            },
            {
              arabic: 'فِي يَوْمٍ كَانَ مِقْدَارُهُ أَلْفَ سَنَةٍ',
              english: 'in a day whose measure is a thousand years',
              turkish: 'ölçüsü bin yıl olan bir günde',
              source: 'Qur’an 32:5',
              highlight: { english: 'in', turkish: 'de' },
            },
          ],
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
          // DRAFT (fusha fallback): rubba occurs in the Qur’an only as rubama
          // (15:2), which does not enter on a bare indefinite noun as here. The
          // whole pool is therefore textbook fusha, and the last one is the
          // taqlīl reading, which only the context distinguishes.
          examples: [
            {
              arabic: 'رُبَّ رَجُلٍ كَرِيمٍ لَقِيتُهُ',
              english: 'Many a generous man have I met',
              turkish: 'Nice cömert adamla karşılaştım',
              highlight: { english: 'Many a', turkish: 'Nice' },
            },
            {
              arabic: 'رُبَّ كِتَابٍ نَافِعٍ قَرَأْتُهُ',
              english: 'Many a useful book have I read',
              turkish: 'Nice faydalı kitap okudum',
              highlight: { english: 'Many a', turkish: 'Nice' },
            },
            {
              arabic: 'رُبَّ سَاعَةٍ غَيَّرَتْ حَيَاةَ إِنْسَانٍ',
              english: 'Many an hour has changed a person’s life',
              turkish: 'Nice saat bir insanın hayatını değiştirdi',
              highlight: { english: 'Many an', turkish: 'Nice' },
            },
            {
              arabic: 'رُبَّ عَالِمٍ يَعْمَلُ بِعِلْمِهِ',
              english: 'Rarely does a scholar act on his knowledge',
              turkish: 'Pek az âlim ilmiyle amel eder',
              highlight: { english: 'Rarely', turkish: 'Pek az' },
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ba',
      arabic: 'الْبَاءُ (بِـ)',
      bareForm: 'بِ',
      english: 'with, by',
      turkish: 'ile, -le / -la',
      senses: [
        {
          term: 'Ilṣāq',
          termArabic: 'اَلْإِلْصَاقُ',
          english: 'Attachment or contact: "at, by, in contact with".',
          turkish: 'Yapışma ve temas bildirir: "değme, temas".',
          // The Qur’anic ilṣāq here is all of grasping and clinging, where the
          // contact is physical and undisputed. The much-quoted "bi-ru'usikum"
          // (5:6) is left out: ilṣāq vs tabʿīḍ is contested there, so it
          // teaches the argument rather than the sense.
          examples: [
            {
              arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا',
              english: 'And hold fast, all of you, to the rope of Allah',
              turkish: 'Hepiniz Allah’ın ipine sımsıkı sarılın',
              source: 'Qur’an 3:103',
              highlight: { english: 'to', turkish: 'ipine' },
            },
            {
              arabic: 'وَأَخَذَ بِرَأْسِ أَخِيهِ يَجُرُّهُ إِلَيْهِ',
              english: 'and he seized his brother by the head, dragging him towards himself',
              turkish: 'kardeşinin başını tutup kendine doğru çekti',
              source: 'Qur’an 7:150',
              highlight: { english: 'by', turkish: 'başını' },
            },
            {
              arabic: 'وَخُذْ بِيَدِكَ ضِغْثًا',
              english: 'And take in your hand a bunch of grass',
              turkish: 'Eline bir demet al',
              source: 'Qur’an 38:44',
              highlight: { english: 'in', turkish: 'Eline' },
            },
            // The textbook's own ilṣāq example, kept last: "marartu bi-" is the
            // sentence the sense is usually named from.
            {
              arabic: 'مَرَرْتُ بِزَيْدٍ',
              english: 'I passed by Zayd',
              turkish: 'Zeyd’e uğradım',
              highlight: { english: 'by', turkish: 'Zeyd’e' },
            },
          ],
        },
        {
          term: 'Istiʿānah',
          termArabic: 'اَلْاِسْتِعَانَةُ',
          english: 'Instrument: "with, by means of".',
          turkish: 'Alet ve vasıta bildirir: "ile".',
          examples: [
            {
              arabic: 'الَّذِي عَلَّمَ بِالْقَلَمِ',
              english: 'who taught by the pen',
              turkish: 'kalemle öğreten',
              source: 'Qur’an 96:4',
              highlight: { english: 'by', turkish: 'kalemle' },
            },
            {
              arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
              english: 'And seek help through patience and prayer',
              turkish: 'Sabır ve namaz ile yardım isteyin',
              source: 'Qur’an 2:45',
              highlight: { english: 'through', turkish: 'ile' },
            },
            {
              arabic: 'وَأَيَّدَهُ بِجُنُودٍ لَمْ تَرَوْهَا',
              english: 'and He supported him with soldiers you did not see',
              turkish: 'onu görmediğiniz askerlerle destekledi',
              source: 'Qur’an 9:40',
              highlight: { english: 'with', turkish: 'askerlerle' },
            },
            {
              arabic: 'تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ',
              english: 'pelting them with stones of baked clay',
              turkish: 'onlara pişmiş çamurdan taşlar atıyorlardı',
              source: 'Qur’an 105:4',
              highlight: { english: 'with', turkish: 'taşlar' },
            },
          ],
        },
        {
          term: 'Sababiyyah',
          termArabic: 'اَلسَّبَبِيَّةُ',
          english: 'Cause: "because of".',
          turkish: 'Sebep bildirir: "sebebiyle, yüzünden".',
          examples: [
            {
              arabic: 'فَكُلًّا أَخَذْنَا بِذَنبِهِ',
              english: 'each We seized for his sin',
              turkish: 'her birini günahı sebebiyle yakaladık',
              source: 'Qur’an 29:40',
              highlight: { english: 'for', turkish: 'sebebiyle' },
            },
            {
              arabic: 'فَبِظُلْمٍ مِنَ الَّذِينَ هَادُوا حَرَّمْنَا عَلَيْهِمْ طَيِّبَاتٍ',
              english:
                'So because of the wrongdoing of those who were Jews, We forbade them good things',
              turkish:
                'Yahudilerin zulmü sebebiyle onlara helal olan temiz şeyleri haram kıldık',
              source: 'Qur’an 4:160',
              highlight: { english: 'because of', turkish: 'sebebiyle' },
            },
            {
              arabic: 'ذَلِكَ بِأَنَّهُمْ كَانُوا يَكْفُرُونَ بِآيَاتِ اللَّهِ',
              english: 'That was because they used to disbelieve in the signs of Allah',
              turkish: 'Bu, Allah’ın ayetlerini inkâr etmeleri sebebiyleydi',
              source: 'Qur’an 2:61',
              highlight: { english: 'because', turkish: 'sebebiyle' },
            },
            {
              arabic: 'بِمَا كَسَبَتْ أَيْدِي النَّاسِ',
              english: 'because of what the hands of men have earned',
              turkish: 'insanların elleriyle kazandıkları sebebiyle',
              source: 'Qur’an 30:41',
              highlight: { english: 'because of', turkish: 'sebebiyle' },
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'kaf',
      arabic: 'الْكَافُ (كَـ)',
      bareForm: 'كَ',
      english: 'like, as',
      turkish: 'gibi',
      senses: [
        {
          term: 'Tashbīh',
          termArabic: 'اَلتَّشْبِيهُ',
          english: 'Comparison: "like, as".',
          turkish: 'Benzetme bildirir: "gibi".',
          examples: [
            {
              arabic: 'كَمَثَلِ الْحِمَارِ يَحْمِلُ أَسْفَارًا',
              english: 'like a donkey carrying books',
              turkish: 'kitaplar taşıyan eşek gibi',
              source: 'Qur’an 62:5',
              highlight: { english: 'like', turkish: 'gibi' },
            },
            {
              arabic: 'الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ',
              english: 'the mountains like carded wool',
              turkish: 'dağlar atılmış yün gibi',
              source: 'Qur’an 101:5',
              highlight: { english: 'like', turkish: 'gibi' },
            },
            {
              arabic: 'خَلَقَ الْإِنْسَانَ مِنْ صَلْصَالٍ كَالْفَخَّارِ',
              english: 'He created man from clay like pottery',
              turkish: 'İnsanı pişmiş çamur gibi bir balçıktan yarattı',
              source: 'Qur’an 55:14',
              highlight: { english: 'like', turkish: 'gibi' },
            },
            {
              arabic: 'أَعْمَالُهُمْ كَسَرَابٍ بِقِيعَةٍ',
              english: 'their deeds are like a mirage in a desert plain',
              turkish: 'amelleri çöl düzlüğündeki bir serap gibidir',
              source: 'Qur’an 24:39',
              highlight: { english: 'like', turkish: 'gibi' },
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'lam',
      arabic: 'اللَّامُ (لِـ)',
      bareForm: 'لِ',
      english: 'for, belonging to',
      turkish: 'için; -in (aitlik)',
      senses: [
        {
          term: 'Milk / Istiḥqāq',
          termArabic: 'اَلْمِلْكُ / اَلْاِسْتِحْقَاقُ',
          english: 'Possession or entitlement: "belongs to, is for".',
          turkish: 'Mülkiyet ve hak edilme bildirir: "-indir, -e aittir".',
          examples: [
            {
              arabic: 'لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
              english: 'To Allah belongs whatever is in the heavens and the earth',
              turkish: 'Göklerde ve yerde ne varsa Allah’ındır',
              source: 'Qur’an 2:284',
              highlight: { english: 'belongs', turkish: 'ındır' },
            },
            {
              arabic: 'وَلِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ',
              english: 'And to Allah belongs the dominion of the heavens and the earth',
              turkish: 'Göklerin ve yerin mülkü Allah’ındır',
              source: 'Qur’an 3:189',
              highlight: { english: 'belongs', turkish: 'ındır' },
            },
            {
              arabic: 'لِلرِّجَالِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ',
              english: 'For men is a share of what the parents leave',
              turkish: 'Ana babanın bıraktığından erkeklere bir pay vardır',
              source: 'Qur’an 4:7',
              highlight: { english: 'For', turkish: 'erkeklere' },
            },
            {
              arabic: 'لِمَنِ الْمُلْكُ الْيَوْمَ لِلَّهِ الْوَاحِدِ الْقَهَّارِ',
              english: 'Whose is the sovereignty today? Allah’s, the One, the Prevailing',
              turkish: 'Bugün mülk kimin? Tek ve mutlak güç sahibi Allah’ın',
              source: 'Qur’an 40:16',
              highlight: { english: 'Whose', turkish: 'kimin' },
            },
          ],
        },
        {
          term: 'Taʿlīl',
          termArabic: 'اَلتَّعْلِيلُ',
          english: 'Reason or purpose: "for, in order to".',
          turkish: 'Sebep ve amaç bildirir: "için".',
          // Mostly fusha, and for a reason worth keeping: the Qur’anic lām of
          // taʿlīl usually governs a verb (lām kay), e.g. "li-yaʿbuduni"
          // (51:56), and a verb after it is in naṣb, not khafḍ — which is the
          // wrong thing to teach on a card about the particles of khafḍ. The
          // one ayah here is a lām of taʿlīl over a noun.
          examples: [
            {
              arabic: 'إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ',
              english: 'We feed you only for the sake of Allah',
              turkish: 'Biz size sadece Allah rızası için yemek veriyoruz',
              source: 'Qur’an 76:9',
              highlight: { english: 'for the sake of', turkish: 'için' },
            },
            {
              arabic: 'جِئْتُ لِلْعِلْمِ',
              english: 'I came for knowledge',
              turkish: 'İlim için geldim',
              highlight: { english: 'for', turkish: 'için' },
            },
            {
              arabic: 'سَافَرْتُ لِلتِّجَارَةِ',
              english: 'I travelled for trade',
              turkish: 'Ticaret için yolculuk yaptım',
              highlight: { english: 'for', turkish: 'için' },
            },
            {
              arabic: 'دَرَسْتُ لِلنَّجَاحِ',
              english: 'I studied in order to succeed',
              turkish: 'Başarmak için çalıştım',
              highlight: { english: 'in order to', turkish: 'için' },
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'waw-qasam',
      arabic: 'وَاوُ الْقَسَمِ (وَ)',
      bareForm: 'وَ',
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
          examples: [
            {
              arabic: 'وَالْعَصْرِ',
              english: 'By the ˹passage of˺ time',
              turkish: 'Asra (zamana) andolsun',
              source: 'Qur’an 103:1',
              highlight: { english: 'By', turkish: 'andolsun' },
            },
            {
              arabic: 'وَالشَّمْسِ وَضُحَاهَا',
              english: 'By the sun and its brightness',
              turkish: 'Güneşe ve onun aydınlığına andolsun',
              source: 'Qur’an 91:1',
              highlight: { english: 'By', turkish: 'andolsun' },
            },
            {
              arabic: 'وَالتِّينِ وَالزَّيْتُونِ',
              english: 'By the fig and the olive',
              turkish: 'İncire ve zeytine andolsun',
              source: 'Qur’an 95:1',
              highlight: { english: 'By', turkish: 'andolsun' },
            },
            {
              arabic: 'فَوَرَبِّكَ لَنَسْأَلَنَّهُمْ أَجْمَعِينَ',
              english: 'So by your Lord, We will surely question them all',
              turkish: 'Rabbine andolsun ki onların hepsini mutlaka sorguya çekeceğiz',
              source: 'Qur’an 15:92',
              highlight: { english: 'by', turkish: 'andolsun' },
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ba-qasam',
      arabic: 'بَاءُ الْقَسَمِ (بِ)',
      bareForm: 'بِ',
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
          examples: [
            {
              arabic: 'وَأَقْسَمُوا بِاللَّهِ جَهْدَ أَيْمَانِهِمْ',
              english: 'And they swear by Allah their strongest oaths',
              turkish: 'Var güçleriyle Allah’a yemin ettiler',
              source: 'Qur’an 16:38',
              highlight: { english: 'by', turkish: 'yemin' },
            },
            {
              arabic: 'لَا أُقْسِمُ بِيَوْمِ الْقِيَامَةِ',
              english: 'I swear by the Day of Resurrection',
              turkish: 'Kıyamet gününe yemin ederim',
              source: 'Qur’an 75:1',
              highlight: { english: 'by', turkish: 'yemin' },
            },
            {
              arabic: 'قَالَ فَبِعِزَّتِكَ لَأُغْوِيَنَّهُمْ أَجْمَعِينَ',
              english: 'He said: By Your might, I will surely mislead them all',
              turkish: 'Senin izzetine yemin olsun ki onların hepsini saptıracağım, dedi',
              source: 'Qur’an 38:82',
              highlight: { english: 'By', turkish: 'yemin' },
            },
            {
              arabic: 'وَيَحْلِفُونَ بِاللَّهِ إِنَّهُمْ لَمِنْكُمْ',
              english: 'And they swear by Allah that they are of you',
              turkish: 'Sizden olduklarına dair Allah’a yemin ediyorlar',
              source: 'Qur’an 9:56',
              highlight: { english: 'by', turkish: 'yemin' },
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'ta-qasam',
      arabic: 'تَاءُ الْقَسَمِ (تَ)',
      bareForm: 'تَ',
      english: 'by ... (oath)',
      turkish: 'yemin tâsı',
      senses: [
        {
          term: 'Qasam',
          termArabic: 'اَلْقَسَمُ',
          english: 'Oath particle: used almost only with the name of Allah.',
          turkish: 'Yemin harfi: hemen yalnız Allah lafzıyla kullanılır.',
          examples: [
            {
              arabic: 'تَاللَّهِ لَأَكِيدَنَّ أَصْنَامَكُمْ',
              english: 'By Allah, I will surely plot against your idols',
              turkish: 'Allah’a andolsun, putlarınıza mutlaka bir tuzak kuracağım',
              source: 'Qur’an 21:57',
              highlight: { english: 'By', turkish: 'andolsun' },
            },
            {
              arabic: 'قَالُوا تَاللَّهِ لَقَدْ آثَرَكَ اللَّهُ عَلَيْنَا',
              english: 'They said: By Allah, Allah has certainly preferred you over us',
              turkish: 'Allah’a andolsun ki Allah seni bize üstün kıldı, dediler',
              source: 'Qur’an 12:91',
              highlight: { english: 'By', turkish: 'andolsun' },
            },
            {
              arabic: 'تَاللَّهِ لَتُسْأَلُنَّ عَمَّا كُنْتُمْ تَفْتَرُونَ',
              english: 'By Allah, you will surely be questioned about what you used to invent',
              turkish: 'Allah’a andolsun, uydurduklarınızdan mutlaka sorguya çekileceksiniz',
              source: 'Qur’an 16:56',
              highlight: { english: 'By', turkish: 'andolsun' },
            },
            {
              arabic: 'قَالَ تَاللَّهِ إِنْ كِدْتَ لَتُرْدِينِ',
              english: 'He said: By Allah, you almost ruined me',
              turkish: 'Allah’a andolsun, neredeyse beni de helak edecektin, dedi',
              source: 'Qur’an 37:56',
              highlight: { english: 'By', turkish: 'andolsun' },
            },
          ],
        },
      ],
    },
  ],
}
