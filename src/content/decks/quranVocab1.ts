import type { DeckDef } from '../types'

// Quran Vocabulary, level 1: the 50 most frequent words of the Qur'an that no
// other deck teaches, in descending order of occurrence. See GitHub issue #8.
//
// Scaffolded by scripts/generateVocab.ts and then authored by hand: the
// headword, root, occurrence count, ayah and citation come from the corpus and
// the canonical text, the meanings and principal parts were written here. Four
// ayat were chosen by hand where the generator's pick taught the word badly
// (kafara, dha, sama, anzala).
//
// DRAFT: verify every English meaning before memorizing it. Turkish is
// generated convenience text and stays draft - correct it on sight while
// studying.
//
// Recognition only: the card front is the bare headword, the back carries the
// meaning and the ayah with the occurring form highlighted. There is no
// meaning-to-Arabic direction, because one English meaning maps to several
// Quranic words and a wrong-but-correct answer would corrupt the schedule.

export const quranVocab1: DeckDef = {
  id: 'quran-vocab-1',
  name: 'Quran Vocabulary 1',
  nameArabic: 'مُفْرَدَاتُ الْقُرْآنِ ١',
  description:
    'The 50 most frequent Quranic words, each with an ayah where it occurs.',
  directions: ['ar-to-meaning'],
  newPerDay: 10,
  burySiblings: true,
  notes: [
    {
      id: 'allah',
      arabic: 'اللَّه',
      english: 'Allah, God',
      turkish: 'Allah',
      example: {
        arabic: 'ٱللَّهُ ٱلصَّمَدُ',
        english: 'Allah, the Eternal Refuge.',
        turkish: 'Allah Samed’dir.',
        source: 'Qur\'an 112:2',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'أله',
        occurrences: 2699,
        occurringForm: 'ٱللَّهُ',
      },
    },
    {
      id: 'ma',
      arabic: 'ما',
      english: 'what; not',
      turkish: 'ne; değil',
      example: {
        arabic: 'مَا ٱلْقَارِعَةُ',
        english: 'What is the Striking Calamity?',
        turkish: 'Nedir o kâria?',
        source: 'Qur\'an 101:2',
      },
      vocab: {
        partOfSpeech: 'ism',
        occurrences: 2565,
        occurringForm: 'مَا',
      },
    },
    {
      id: 'la',
      arabic: 'لا',
      english: 'no, not',
      turkish: 'hayır, değil',
      example: {
        arabic: 'وَمَا لَا تُبْصِرُونَ',
        english: 'and what you do not see.',
        turkish: 've görmediklerinize.',
        source: 'Qur\'an 69:39',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 1742,
        occurringForm: 'لَا',
      },
    },
    {
      id: 'inn',
      arabic: 'إِنّ',
      english: 'indeed, truly',
      turkish: 'muhakkak ki, şüphesiz',
      example: {
        arabic: 'إِنَّ لِلْمُتَّقِينَ مَفَازًا',
        english: 'Indeed, for the righteous is attainment.',
        turkish: 'Şüphesiz takva sahipleri için bir kurtuluş vardır.',
        source: 'Qur\'an 78:31',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 1682,
        occurringForm: 'إِنَّ',
      },
    },
    {
      id: 'qala',
      arabic: 'قالَ',
      english: 'to say',
      turkish: 'demek, söylemek',
      example: {
        arabic: 'قُلْ يَٰٓأَيُّهَا ٱلْكَٰفِرُونَ',
        english: 'Say: O disbelievers!',
        turkish: 'De ki: Ey kâfirler!',
        source: 'Qur\'an 109:1',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'قول',
        forms: [
          { label: 'mudari', arabic: 'يَقُولُ' },
          { label: 'masdar', arabic: 'قَوْل' },
        ],
        occurrences: 1618,
        occurringForm: 'قُلْ',
      },
    },
    {
      id: 'alladhiy',
      arabic: 'الَّذِي',
      english: 'who, which (relative)',
      turkish: 'ki o, -en/-an (ilgi zamiri)',
      example: {
        arabic: 'ٱلَّذِى خَلَقَ فَسَوَّىٰ',
        english: 'who created and proportioned,',
        turkish: 'O ki yarattı, düzenledi,',
        source: 'Qur\'an 87:2',
      },
      vocab: {
        partOfSpeech: 'ism',
        forms: [
          { label: 'plural', arabic: 'ٱلَّذِينَ' },
        ],
        occurrences: 1468,
        occurringForm: 'ٱلَّذِى',
      },
    },
    {
      id: 'kana',
      arabic: 'كانَ',
      english: 'to be',
      turkish: 'olmak, idi',
      example: {
        arabic: 'يَٰلَيْتَهَا كَانَتِ ٱلْقَاضِيَةَ',
        english: 'I wish it had been the decisive one.',
        turkish: 'Keşke o iş bitirici olsaydı.',
        source: 'Qur\'an 69:27',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'كون',
        forms: [
          { label: 'mudari', arabic: 'يَكُونُ' },
        ],
        occurrences: 1358,
        occurringForm: 'كَانَتِ',
      },
    },
    {
      id: 'dha',
      arabic: 'ذا',
      english: 'this, that (demonstrative)',
      turkish: 'bu, şu, o (işaret)',
      example: {
        arabic: 'ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًۭى لِّلْمُتَّقِينَ',
        english: 'That is the Book about which there is no doubt, a guidance for the righteous.',
        turkish: 'İşte o kitap, kendisinde şüphe yoktur; takva sahipleri için bir yol göstericidir.',
        source: 'Qur\'an 2:2',
      },
      vocab: {
        partOfSpeech: 'ism',
        forms: [
          { label: 'plural', arabic: 'أُو۟لَٰٓئِكَ' },
        ],
        occurrences: 1058,
        occurringForm: 'ذَٰلِكَ',
      },
    },
    {
      id: 'in',
      arabic: 'إِن',
      english: 'if',
      turkish: 'eğer, şayet',
      example: {
        arabic: 'فَذَكِّرْ إِن نَّفَعَتِ ٱلذِّكْرَىٰ',
        english: 'So remind, if the reminder benefits.',
        turkish: 'Öğüt ver, eğer öğüt fayda verirse.',
        source: 'Qur\'an 87:9',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 703,
        occurringForm: 'إِن',
      },
    },
    {
      id: 'illa',
      arabic: 'إِلّا',
      english: 'except, only',
      turkish: 'ancak, -den başka',
      example: {
        arabic: 'إِلَّا ٱلْمُصَلِّينَ',
        english: 'except the observers of prayer,',
        turkish: 'ancak namaz kılanlar müstesna,',
        source: 'Qur\'an 70:22',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 659,
        occurringForm: 'إِلَّا',
      },
    },
    {
      id: 'an-2',
      arabic: 'أَن',
      english: 'that, to (subordinating)',
      turkish: '-mesi, -mek (mastar edatı)',
      example: {
        arabic: 'أَن جَآءَهُ ٱلْأَعْمَىٰ',
        english: 'because the blind man came to him.',
        turkish: 'Yanına âmâ geldi diye.',
        source: 'Qur\'an 80:2',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 616,
        occurringForm: 'أَن',
      },
    },
    {
      id: 'amana',
      arabic: 'آمَنَ',
      english: 'to believe',
      turkish: 'iman etmek, inanmak',
      example: {
        arabic: 'إِنَّهُۥ كَانَ لَا يُؤْمِنُ بِٱللَّهِ ٱلْعَظِيمِ',
        english: 'Indeed, he did not use to believe in Allah, the Most Great,',
        turkish: 'Çünkü o, yüce Allah’a inanmıyordu,',
        source: 'Qur\'an 69:33',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'أمن',
        forms: [
          { label: 'mudari', arabic: 'يُؤْمِنُ' },
          { label: 'masdar', arabic: 'إِيمَان' },
        ],
        occurrences: 537,
        occurringForm: 'يُؤْمِنُ',
      },
    },
    {
      id: 'yawm',
      arabic: 'يَوْم',
      english: 'day',
      turkish: 'gün',
      example: {
        arabic: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',
        english: 'Sovereign of the Day of Recompense.',
        turkish: 'Din gününün sahibi.',
        source: 'Qur\'an 1:4',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'يوم',
        forms: [
          { label: 'plural', arabic: 'أَيَّام' },
        ],
        occurrences: 475,
        occurringForm: 'يَوْمِ',
      },
    },
    {
      id: 'ard',
      arabic: 'أَرْض',
      english: 'earth, land',
      turkish: 'yeryüzü, toprak',
      example: {
        arabic: 'وَإِذَا ٱلْأَرْضُ مُدَّتْ',
        english: 'And when the earth is spread out,',
        turkish: 'Yer uzatıldığı zaman,',
        source: 'Qur\'an 84:3',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'أرض',
        forms: [
          { label: 'plural', arabic: 'أَرَضُون' },
        ],
        occurrences: 461,
        occurringForm: 'ٱلْأَرْضُ',
      },
    },
    {
      id: 'idha',
      arabic: 'إِذا',
      english: 'when',
      turkish: '-diği zaman, -ince',
      example: {
        arabic: 'إِذَا ٱلشَّمْسُ كُوِّرَتْ',
        english: 'When the sun is wrapped up,',
        turkish: 'Güneş dürüldüğü zaman,',
        source: 'Qur\'an 81:1',
      },
      vocab: {
        partOfSpeech: 'ism',
        occurrences: 423,
        occurringForm: 'إِذَا',
      },
    },
    {
      id: 'qad',
      arabic: 'قَد',
      english: 'indeed, already',
      turkish: 'gerçekten, muhakkak',
      example: {
        arabic: 'قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ',
        english: 'Certainly will the believers have succeeded.',
        turkish: 'Müminler gerçekten kurtuluşa ermiştir.',
        source: 'Qur\'an 23:1',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 406,
        occurringForm: 'قَدْ',
      },
    },
    {
      id: 'qawm',
      arabic: 'قَوْم',
      english: 'people, folk',
      turkish: 'kavim, topluluk',
      example: {
        arabic: 'قَالَ إِنَّكُمْ قَوْمٌۭ مُّنكَرُونَ',
        english: 'He said: Indeed, you are a people unknown.',
        turkish: 'Dedi ki: Doğrusu siz tanınmayan bir topluluksunuz.',
        source: 'Qur\'an 15:62',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'قوم',
        forms: [
          { label: 'plural', arabic: 'أَقْوَام' },
        ],
        occurrences: 383,
        occurringForm: 'قَوْمٌ',
      },
    },
    {
      id: 'aya',
      arabic: 'آيَة',
      english: 'sign, verse',
      turkish: 'ayet, işaret',
      example: {
        arabic: 'تِلْكَ ءَايَٰتُ ٱلْكِتَٰبِ ٱلْمُبِينِ',
        english: 'These are the verses of the clear Book.',
        turkish: 'Bunlar apaçık kitabın ayetleridir.',
        source: 'Qur\'an 26:2',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'أيي',
        forms: [
          { label: 'plural', arabic: 'آيَات' },
        ],
        occurrences: 382,
        occurringForm: 'ءَايَٰتُ',
      },
    },
    {
      id: 'alima',
      arabic: 'عَلِمَ',
      english: 'to know',
      turkish: 'bilmek',
      example: {
        arabic: 'عَلِمَتْ نَفْسٌۭ مَّآ أَحْضَرَتْ',
        english: 'A soul will then know what it has brought.',
        turkish: 'Her nefis ne hazırladığını bilecektir.',
        source: 'Qur\'an 81:14',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'علم',
        forms: [
          { label: 'mudari', arabic: 'يَعْلَمُ' },
          { label: 'masdar', arabic: 'عِلْم' },
        ],
        occurrences: 382,
        occurringForm: 'عَلِمَتْ',
      },
    },
    {
      id: 'ann',
      arabic: 'أَنّ',
      english: 'that (with a noun clause)',
      turkish: '-diğini, ki (isim cümlesi)',
      example: {
        arabic: 'يَحْسَبُ أَنَّ مَالَهُۥٓ أَخْلَدَهُۥ',
        english: 'He thinks that his wealth will make him immortal.',
        turkish: 'Malının kendisini ebedi kılacağını sanır.',
        source: 'Qur\'an 104:3',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 362,
        occurringForm: 'أَنَّ',
      },
    },
    {
      id: 'kull',
      arabic: 'كُلّ',
      english: 'all, every',
      turkish: 'her, bütün',
      example: {
        arabic: 'وَٱلشَّيَٰطِينَ كُلَّ بَنَّآءٍۢ وَغَوَّاصٍۢ',
        english: 'and the devils, every builder and diver,',
        turkish: 've şeytanları da, her bina ustasını ve dalgıcı da.',
        source: 'Qur\'an 38:37',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'كلل',
        occurrences: 359,
        occurringForm: 'كُلَّ',
      },
    },
    {
      id: 'lam-2',
      arabic: 'لَم',
      english: 'not (with the jussive)',
      turkish: '-medi, -madı (cezm edatı)',
      example: {
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        english: 'He neither begets nor is born,',
        turkish: 'Doğurmamış ve doğmamıştır,',
        source: 'Qur\'an 112:3',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 348,
        occurringForm: 'لَمْ',
      },
    },
    {
      id: 'jaala',
      arabic: 'جَعَلَ',
      english: 'to make, to place',
      turkish: 'kılmak, yapmak',
      example: {
        arabic: 'أَلَمْ نَجْعَلِ ٱلْأَرْضَ مِهَٰدًۭا',
        english: 'Have We not made the earth a resting place,',
        turkish: 'Biz yeryüzünü bir döşek yapmadık mı?',
        source: 'Qur\'an 78:6',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'جعل',
        forms: [
          { label: 'mudari', arabic: 'يَجْعَلُ' },
        ],
        occurrences: 340,
        occurringForm: 'نَجْعَلِ',
      },
    },
    {
      id: 'thumm',
      arabic: 'ثُمّ',
      english: 'then, thereafter',
      turkish: 'sonra',
      example: {
        arabic: 'ثُمَّ نَظَرَ',
        english: 'Then he considered.',
        turkish: 'Sonra düşündü.',
        source: 'Qur\'an 74:21',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 338,
        occurringForm: 'ثُمَّ',
      },
    },
    {
      id: 'rasuwl',
      arabic: 'رَسُول',
      english: 'messenger',
      turkish: 'elçi, resul',
      example: {
        arabic: 'إِنَّهُۥ لَقَوْلُ رَسُولٍۢ كَرِيمٍۢ',
        english: 'Indeed, it is the word of a noble messenger.',
        turkish: 'Şüphesiz o, değerli bir elçinin sözüdür.',
        source: 'Qur\'an 81:19',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'رسل',
        forms: [
          { label: 'plural', arabic: 'رُسُل' },
        ],
        occurrences: 332,
        occurringForm: 'رَسُولٍ',
      },
    },
    {
      id: 'adhab',
      arabic: 'عَذاب',
      english: 'punishment, torment',
      turkish: 'azap',
      example: {
        arabic: 'دُحُورًۭا ۖ وَلَهُمْ عَذَابٌۭ وَاصِبٌ',
        english: 'repelled, and for them is a constant punishment,',
        turkish: 'Kovulurlar; onlara sürekli bir azap vardır,',
        source: 'Qur\'an 37:9',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'عذب',
        occurrences: 322,
        occurringForm: 'عَذَابٌ',
      },
    },
    {
      id: 'sama',
      arabic: 'سَماء',
      english: 'sky, heaven',
      turkish: 'gök, sema',
      example: {
        arabic: 'وَفُتِحَتِ ٱلسَّمَآءُ فَكَانَتْ أَبْوَٰبًۭا',
        english: 'And the sky is opened and will become gateways,',
        turkish: 'Gök açılmış, kapı kapı olmuştur,',
        source: 'Qur\'an 78:19',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'سمو',
        forms: [
          { label: 'plural', arabic: 'سَمَاوَات' },
        ],
        occurrences: 310,
        occurringForm: 'ٱلسَّمَآءُ',
      },
    },
    {
      id: 'idh',
      arabic: 'إِذ',
      english: 'when (of the past)',
      turkish: '-diği zaman, hani',
      example: {
        arabic: 'إِذِ ٱنۢبَعَثَ أَشْقَىٰهَا',
        english: 'when the most wretched of them was sent forth.',
        turkish: 'En bedbahtları ileri atıldığında.',
        source: 'Qur\'an 91:12',
      },
      vocab: {
        partOfSpeech: 'ism',
        occurrences: 309,
        occurringForm: 'إِذِ',
      },
    },
    {
      id: 'nafs',
      arabic: 'نَفْس',
      english: 'soul, self',
      turkish: 'nefis, can, kendi',
      example: {
        arabic: 'عَلِمَتْ نَفْسٌۭ مَّآ أَحْضَرَتْ',
        english: 'A soul will then know what it has brought.',
        turkish: 'Her nefis ne hazırladığını bilecektir.',
        source: 'Qur\'an 81:14',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'نفس',
        forms: [
          { label: 'plural', arabic: 'أَنْفُس' },
        ],
        occurrences: 295,
        occurringForm: 'نَفْسٌ',
      },
    },
    {
      id: 'kafara',
      arabic: 'كَفَرَ',
      english: 'to disbelieve, to reject',
      turkish: 'inkâr etmek, kâfir olmak',
      example: {
        arabic: 'بَلِ ٱلَّذِينَ كَفَرُوا۟ يُكَذِّبُونَ',
        english: 'But those who disbelieve deny,',
        turkish: 'Aksine, inkâr edenler yalanlıyorlar,',
        source: 'Qur\'an 84:22',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'كفر',
        forms: [
          { label: 'mudari', arabic: 'يَكْفُرُ' },
          { label: 'masdar', arabic: 'كُفْر' },
        ],
        occurrences: 289,
        occurringForm: 'كَفَرُوا۟',
      },
    },
    {
      id: 'shay',
      arabic: 'شَىْء',
      english: 'thing',
      turkish: 'şey',
      example: {
        arabic: 'وَكُلَّ شَىْءٍ أَحْصَيْنَٰهُ كِتَٰبًۭا',
        english: 'And all things We have enumerated in writing.',
        turkish: 'Her şeyi bir kitapta sayıp yazdık.',
        source: 'Qur\'an 78:29',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'شيأ',
        forms: [
          { label: 'plural', arabic: 'أَشْيَاء' },
        ],
        occurrences: 283,
        occurringForm: 'شَىْءٍ',
      },
    },
    {
      id: 'aw',
      arabic: 'أَو',
      english: 'or',
      turkish: 'veya, yahut',
      example: {
        arabic: 'أَوْ أَمَرَ بِٱلتَّقْوَىٰٓ',
        english: 'or enjoined righteousness?',
        turkish: 'yahut takvayı emrettiyse?',
        source: 'Qur\'an 96:12',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 280,
        occurringForm: 'أَوْ',
      },
    },
    {
      id: 'jaa',
      arabic: 'جاءَ',
      english: 'to come',
      turkish: 'gelmek',
      example: {
        arabic: 'فَإِذَا جَآءَتِ ٱلصَّآخَّةُ',
        english: 'But when there comes the Deafening Blast,',
        turkish: 'Kulakları sağır eden o ses geldiği zaman,',
        source: 'Qur\'an 80:33',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'جيأ',
        forms: [
          { label: 'mudari', arabic: 'يَجِيءُ' },
        ],
        occurrences: 278,
        occurringForm: 'جَآءَتِ',
      },
    },
    {
      id: 'amila',
      arabic: 'عَمِلَ',
      english: 'to do, to work',
      turkish: 'yapmak, amel etmek',
      example: {
        arabic: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًۭا يَرَهُۥ',
        english: 'So whoever does an atom’s weight of good will see it,',
        turkish: 'Kim zerre ağırlığınca hayır işlerse onu görür,',
        source: 'Qur\'an 99:7',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'عمل',
        forms: [
          { label: 'mudari', arabic: 'يَعْمَلُ' },
          { label: 'masdar', arabic: 'عَمَل' },
        ],
        occurrences: 276,
        occurringForm: 'يَعْمَلْ',
      },
    },
    {
      id: 'ataa',
      arabic: 'آتَى',
      english: 'to give',
      turkish: 'vermek',
      example: {
        arabic: 'ٱلَّذِى يُؤْتِى مَالَهُۥ يَتَزَكَّىٰ',
        english: 'who gives his wealth to purify himself,',
        turkish: 'O ki arınmak için malını verir,',
        source: 'Qur\'an 92:18',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'أتي',
        forms: [
          { label: 'mudari', arabic: 'يُؤْتِي' },
          { label: 'masdar', arabic: 'إِيتَاء' },
        ],
        occurrences: 271,
        occurringForm: 'يُؤْتِى',
      },
    },
    {
      id: 'raa',
      arabic: 'رَأَى',
      english: 'to see',
      turkish: 'görmek',
      example: {
        arabic: 'وَبُرِّزَتِ ٱلْجَحِيمُ لِمَن يَرَىٰ',
        english: 'And Hellfire will be brought forth for whoever sees,',
        turkish: 'Cehennem de gören kimseler için açığa çıkarılır,',
        source: 'Qur\'an 79:36',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'رأي',
        forms: [
          { label: 'mudari', arabic: 'يَرَى' },
          { label: 'masdar', arabic: 'رُؤْيَة' },
        ],
        occurrences: 271,
        occurringForm: 'يَرَىٰ',
      },
    },
    {
      id: 'bayn',
      arabic: 'بَيْن',
      english: 'between',
      turkish: 'arasında',
      example: {
        arabic: 'يَخْرُجُ مِنۢ بَيْنِ ٱلصُّلْبِ وَٱلتَّرَآئِبِ',
        english: 'It comes out from between the backbone and the ribs.',
        turkish: 'Bel ile kaburga kemikleri arasından çıkar.',
        source: 'Qur\'an 86:7',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'بين',
        occurrences: 266,
        occurringForm: 'بَيْنِ',
      },
    },
    {
      id: 'ata',
      arabic: 'أَتَى',
      english: 'to come',
      turkish: 'gelmek',
      example: {
        arabic: 'فَتَوَلَّىٰ فِرْعَوْنُ فَجَمَعَ كَيْدَهُۥ ثُمَّ أَتَىٰ',
        english: 'So Pharaoh turned away, gathered his plan, then came.',
        turkish: 'Firavun dönüp gitti, hilesini topladı, sonra geldi.',
        source: 'Qur\'an 20:60',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'أتي',
        forms: [
          { label: 'mudari', arabic: 'يَأْتِي' },
        ],
        occurrences: 264,
        occurringForm: 'أَتَىٰ',
      },
    },
    {
      id: 'kitab',
      arabic: 'كِتاب',
      english: 'book, writing',
      turkish: 'kitap, yazı',
      example: {
        arabic: 'كِتَٰبٌۭ مَّرْقُومٌۭ',
        english: 'a written record.',
        turkish: 'Yazılmış bir kitaptır.',
        source: 'Qur\'an 83:9',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'كتب',
        forms: [
          { label: 'plural', arabic: 'كُتُب' },
        ],
        occurrences: 260,
        occurringForm: 'كِتَٰبٌ',
      },
    },
    {
      id: 'haqq',
      arabic: 'حَقّ',
      english: 'truth, right, due',
      turkish: 'hak, gerçek',
      example: {
        arabic: 'وَفِىٓ أَمْوَٰلِهِمْ حَقٌّۭ لِّلسَّآئِلِ وَٱلْمَحْرُومِ',
        english: 'And in their wealth was a right for the beggar and the deprived.',
        turkish: 'Mallarında isteyen ve yoksun olan için bir hak vardı.',
        source: 'Qur\'an 51:19',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'حقق',
        forms: [
          { label: 'plural', arabic: 'حُقُوق' },
        ],
        occurrences: 247,
        occurringForm: 'حَقٌّ',
      },
    },
    {
      id: 'qabl',
      arabic: 'قَبْل',
      english: 'before',
      turkish: 'önce',
      example: {
        arabic: 'إِنَّهُمْ كَانُوا۟ قَبْلَ ذَٰلِكَ مُتْرَفِينَ',
        english: 'Indeed they were, before that, indulging in luxury,',
        turkish: 'Çünkü onlar bundan önce varlık içinde şımartılmışlardı,',
        source: 'Qur\'an 56:45',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'قبل',
        occurrences: 242,
        occurringForm: 'قَبْلَ',
      },
    },
    {
      id: 'nas',
      arabic: 'ناس',
      english: 'people, mankind',
      turkish: 'insanlar',
      example: {
        arabic: 'مَلِكِ ٱلنَّاسِ',
        english: 'the Sovereign of mankind,',
        turkish: 'İnsanların melikinin,',
        source: 'Qur\'an 114:2',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'أنس',
        occurrences: 241,
        occurringForm: 'ٱلنَّاسِ',
      },
    },
    {
      id: 'shaa',
      arabic: 'شاءَ',
      english: 'to will, to wish',
      turkish: 'dilemek, istemek',
      example: {
        arabic: 'فَمَن شَآءَ ذَكَرَهُۥ',
        english: 'So whoever wills may remember it.',
        turkish: 'Dileyen onu düşünüp öğüt alır.',
        source: 'Qur\'an 80:12',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'شيأ',
        forms: [
          { label: 'mudari', arabic: 'يَشَاءُ' },
          { label: 'masdar', arabic: 'مَشِيئَة' },
        ],
        occurrences: 236,
        occurringForm: 'شَآءَ',
      },
    },
    {
      id: 'ayy',
      arabic: 'أَيّ',
      english: 'which, what',
      turkish: 'hangi',
      example: {
        arabic: 'مِنْ أَىِّ شَىْءٍ خَلَقَهُۥ',
        english: 'From what thing did He create him?',
        turkish: 'Onu hangi şeyden yarattı?',
        source: 'Qur\'an 80:18',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'أيي',
        occurrences: 215,
        occurringForm: 'أَىِّ',
      },
    },
    {
      id: 'mumin',
      arabic: 'مُؤْمِن',
      english: 'believer',
      turkish: 'mümin, inanan',
      example: {
        arabic: 'قَالُوا۟ بَل لَّمْ تَكُونُوا۟ مُؤْمِنِينَ',
        english: 'They will say: But you were not believers,',
        turkish: 'Derler ki: Hayır, siz zaten inanmıyordunuz,',
        source: 'Qur\'an 37:29',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'أمن',
        forms: [
          { label: 'plural', arabic: 'مُؤْمِنُون' },
        ],
        occurrences: 202,
        occurringForm: 'مُؤْمِنِينَ',
      },
    },
    {
      id: 'law',
      arabic: 'لَو',
      english: 'if (counterfactual)',
      turkish: 'keşke, eğer (olmayanı varsayarak)',
      example: {
        arabic: 'وَدُّوا۟ لَوْ تُدْهِنُ فَيُدْهِنُونَ',
        english: 'They wish that you would soften, so they would soften.',
        turkish: 'İsterler ki sen yumuşak davranasın da onlar da yumuşasınlar.',
        source: 'Qur\'an 68:9',
      },
      vocab: {
        partOfSpeech: 'harf',
        occurrences: 201,
        occurringForm: 'لَوْ',
      },
    },
    {
      id: 'baad',
      arabic: 'بَعْد',
      english: 'after',
      turkish: 'sonra',
      example: {
        arabic: 'وَٱلْأَرْضَ بَعْدَ ذَٰلِكَ دَحَىٰهَآ',
        english: 'And after that He spread the earth.',
        turkish: 'Ardından yeri döşeyip yaydı.',
        source: 'Qur\'an 79:30',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'بعد',
        occurrences: 199,
        occurringForm: 'بَعْدَ',
      },
    },
    {
      id: 'ind',
      arabic: 'عِند',
      english: 'at, with, in the presence of',
      turkish: 'yanında, katında',
      example: {
        arabic: 'عِندَ سِدْرَةِ ٱلْمُنتَهَىٰ',
        english: 'at the Lote Tree of the Utmost Boundary,',
        turkish: 'Sidretü’l-Müntehâ’nın yanında,',
        source: 'Qur\'an 53:14',
      },
      vocab: {
        partOfSpeech: 'ism',
        root: 'عند',
        occurrences: 197,
        occurringForm: 'عِندَ',
      },
    },
    {
      id: 'khalaqa',
      arabic: 'خَلَقَ',
      english: 'to create',
      turkish: 'yaratmak',
      example: {
        arabic: 'خَلَقَ ٱلْإِنسَٰنَ',
        english: 'He created man,',
        turkish: 'İnsanı yarattı,',
        source: 'Qur\'an 55:3',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'خلق',
        forms: [
          { label: 'mudari', arabic: 'يَخْلُقُ' },
          { label: 'masdar', arabic: 'خَلْق' },
        ],
        occurrences: 184,
        occurringForm: 'خَلَقَ',
      },
    },
    {
      id: 'anzala',
      arabic: 'أَنزَلَ',
      english: 'to send down',
      turkish: 'indirmek',
      example: {
        arabic: 'إِنَّآ أَنزَلْنَٰهُ فِى لَيْلَةِ ٱلْقَدْرِ',
        english: 'Indeed, We sent it down during the Night of Decree.',
        turkish: 'Biz onu Kadir gecesinde indirdik.',
        source: 'Qur\'an 97:1',
      },
      vocab: {
        partOfSpeech: 'fil',
        root: 'نزل',
        forms: [
          { label: 'mudari', arabic: 'يُنْزِلُ' },
          { label: 'masdar', arabic: 'إِنْزَال' },
        ],
        occurrences: 183,
        occurringForm: 'أَنزَلْنَٰهُ',
      },
    },
  ],
}
