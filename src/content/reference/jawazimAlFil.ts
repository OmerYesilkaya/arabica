import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, chapter on the verb (bāb al-afʿāl): al-jawāzim.
// DRAFT: verify against your textbook before relying on it.
//
// Membership follows the matn, in the matn's order, and is split as the matn
// splits it: the first six govern one verb, the rest are conditional particles
// that govern two.
//
// Edition note for Omer: the matn says "wal-jawāzimu thamāniyata ʿashara"
// (eighteen), then lists nineteen items. Commentaries explain the gap in two
// ways: either أَلَمْ and أَلَمَّا are counted as لَمْ and لَمَّا with the
// interrogative hamza (so the count drops), or the poetry-only إِذَا is not
// counted with the rest. Some printings drop one of the two accordingly, and
// some grammarians (mainly the Basrans) deny that كَيْفَمَا jazms at all. All
// nineteen items are listed below so nothing is silently dropped.
//
// Sourcing: examples follow Quran > Hadith > fusha. Quranic examples carry a
// surah:ayah citation. Seven particles (أَلَمَّا, إِذْمَا, مَتَى, أَيَّانَ,
// أَنَّى, كَيْفَمَا, and the poetry-only إِذَا) have no Quranic occurrence as a
// jāzim of two verbs, so they use a plain fusha example, each flagged with a
// "DRAFT (fusha fallback)" comment saying why.

export const jawazimAlFil: ReferenceEntry = {
  id: 'jawazim-al-fil',
  title: 'Jazm Particles of the Verb',
  titleArabic: 'جَوَازِمُ الْفِعْلِ',
  order: 5,
  summary:
    'The particles that put the present verb into jazm: the group that governs one verb and the conditionals that govern two.',
  sections: [
    {
      kind: 'prose',
      title: 'Overview',
      arabic:
        'وَالْمُضَارِعُ مَرْفُوعٌ أَبَدًا حَتَّى يَدْخُلَ عَلَيْهِ نَاصِبٌ أَوْ جَازِمٌ. وَالْجَوَازِمُ ثَمَانِيَةَ عَشَرَ، وَهِيَ: لَمْ، وَلَمَّا، وَأَلَمْ، وَأَلَمَّا، وَلَامُ الْأَمْرِ وَالدُّعَاءِ، وَلَا فِي النَّهْيِ وَالدُّعَاءِ، وَإِنْ، وَمَا، وَمَنْ، وَمَهْمَا، وَإِذْمَا، وَأَيٌّ، وَمَتَى، وَأَيَّانَ، وَأَيْنَ، وَأَنَّى، وَحَيْثُمَا، وَكَيْفَمَا، وَإِذَا فِي الشِّعْرِ',
      paragraphs: [
        'EN: The present verb (muḍāriʿ) stays in rafʿ until a naṣb agent or a jazm agent enters on it. A jazm particle puts it into jazm: its ending becomes sukūn, or the substitute sign of its form. The first six particles govern one verb only. The remaining thirteen are conditional particles (adawāt al-sharṭ): they govern two verbs, the condition verb (fiʿl al-sharṭ) and its answer (jawāb al-sharṭ).',
        'TR: Muzari fiil, başına bir nasb veya cezm edatı gelmedikçe daima merfûdur. Cezm edatı fiili cezm eder: sonu sükûn olur veya o kalıbın vekil alâmetini alır. İlk altı edat yalnız bir fiili cezm eder. Kalan on üçü şart edatlarıdır (edevât-ı şart): iki fiili cezm ederler, şart fiili (fiil-i şart) ve cevabı (cevâb-ı şart).',
        'EN: The matn gives the count as eighteen and its list has nineteen items. This entry follows the list exactly as the matn gives it. The usual reconciliation: alam and alammā are lam and lammā with the question hamza in front, so they are not counted separately.',
        'TR: Metin sayıyı "on sekiz" verir, listesinde ise on dokuz madde vardır. Bu giriş, listeyi metnin verdiği hâliyle aynen izler. Yaygın izah şudur: elem ve elemmâ, başına soru hemzesi gelmiş lem ve lemmâdır; bu yüzden ayrıca sayılmazlar.',
      ],
    },
    {
      kind: 'table',
      title: 'Particles that jazm one verb',
      caption:
        'EN: These six enter on a single present verb and put it into jazm. / TR: Bu altı edat tek bir muzari fiilin başına gelir ve onu cezm eder.',
      columns: ['Particle', 'English', 'Türkçe', 'Example', 'Meaning of the example', 'Source'],
      rows: [
        [
          { ar: 'لَمْ' },
          'did not (negates the past)',
          '-medi / -madı (geçmişi olumsuzlar)',
          { ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ' },
          'EN: He has not begotten, nor was He begotten · TR: O doğurmadı, doğurulmadı da',
          'Qur’an 112:3',
        ],
        [
          { ar: 'لَمَّا' },
          'has not yet (negation still open)',
          'henüz -memiş / -mamış',
          { ar: 'وَلَمَّا يَدْخُلِ الْإِيمَانُ فِي قُلُوبِكُمْ' },
          'EN: while faith has not yet entered your hearts · TR: hâlbuki iman henüz kalplerinize girmedi',
          'Qur’an 49:14',
        ],
        [
          { ar: 'أَلَمْ' },
          'did not ...? (lam with the interrogative hamza)',
          '-medi mi? (soru hemzesi + lem)',
          { ar: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ' },
          'EN: Did We not expand your breast for you? · TR: Senin göğsünü açıp genişletmedik mi?',
          'Qur’an 94:1',
        ],
        [
          { ar: 'أَلَمَّا' },
          'has not yet ...? (lammā with the interrogative hamza)',
          'henüz -memiş mi? (soru hemzesi + lemmâ)',
          // DRAFT (fusha fallback): أَلَمَّا has no Quranic or Hadith occurrence.
          { ar: 'أَلَمَّا يَرْجِعْ أَخُوكَ؟' },
          'EN: Has your brother not returned yet? · TR: Kardeşin henüz dönmedi mi?',
          'Fusha (no Quranic occurrence)',
        ],
        [
          { ar: 'لَامُ الْأَمْرِ وَالدُّعَاءِ', note: 'لِـ' },
          'let him / let it be (command, or supplication when said upward)',
          'emir lâmı: -sin, -meli; duada: -sin diye dilemek',
          { ar: 'فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ' },
          'EN: So let them worship the Lord of this House · TR: Öyleyse bu Ev’in Rabbine kulluk etsinler',
          'Qur’an 106:3',
        ],
        [
          { ar: 'لَا النَّاهِيَةُ', note: 'لَا' },
          'do not (prohibition, or supplication when said upward)',
          'yasaklama lâsı: -me / -ma; duada: -mesin',
          { ar: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا' },
          'EN: Do not grieve; indeed Allah is with us · TR: Üzülme, Allah bizimledir',
          'Qur’an 9:40',
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'How the conditional pair works',
      paragraphs: [
        'EN: A conditional particle governs two verbs. The first is the condition (fiʿl al-sharṭ), the second is its answer (jawāb al-sharṭ); both are majzūm. If the answer cannot take jazm (it is a māḍī with qad, an amr, a nominal sentence, and so on), it is joined with fāʾ and keeps its own form. A māḍī may stand in either slot: its jazm is then a position only (maḥall jazm), with no visible sign.',
        'TR: Şart edatı iki fiili cezm eder. Birincisi şart fiili, ikincisi cevabıdır; her ikisi de meczûmdur. Cevap cezm alamıyorsa (kad’lı mâzî, emir, isim cümlesi gibi) başına fâ gelir ve kendi kalıbını korur. Mâzî her iki yerde de gelebilir: o zaman cezm mahallendir (mahallen meczûm), görünen bir alâmet yoktur.',
      ],
    },
    {
      kind: 'table',
      title: 'Conditional particles that jazm two verbs',
      caption:
        'EN: Each governs the condition verb and the answer verb. Where the Qur’an uses the particle with an added mā (أَيْنَمَا for أَيْنَ), the added form is shown. / TR: Her biri şart fiilini ve cevap fiilini cezm eder. Kur’an edatı zâid mâ ile kullanıyorsa (أَيْنَ yerine أَيْنَمَا) o şekil verilmiştir.',
      columns: ['Particle', 'English', 'Türkçe', 'Example', 'Meaning of the example', 'Source'],
      rows: [
        [
          { ar: 'إِنْ' },
          'if (the plain conditional)',
          'eğer, şayet',
          { ar: 'إِنْ تَنْصُرُوا اللَّهَ يَنْصُرْكُمْ' },
          'EN: If you support Allah, He will support you · TR: Eğer Allah’a yardım ederseniz, O da size yardım eder',
          'Qur’an 47:7',
        ],
        [
          { ar: 'مَا' },
          'whatever',
          'ne / her ne (yaparsan)',
          { ar: 'وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ' },
          'EN: Whatever good you do, Allah knows it · TR: Hayır olarak ne yaparsanız Allah onu bilir',
          'Qur’an 2:197',
        ],
        [
          { ar: 'مَنْ' },
          'whoever',
          'kim, her kim',
          { ar: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ' },
          'EN: So whoever does an atom’s weight of good will see it · TR: Kim zerre kadar bir hayır işlerse onu görür',
          'Qur’an 99:7',
        ],
        [
          { ar: 'مَهْمَا' },
          'whatever, no matter what',
          'her ne (yaparsan), ne yaparsan yap',
          { ar: 'مَهْمَا تَأْتِنَا بِهِ مِنْ آيَةٍ' },
          'EN: Whatever sign you bring us · TR: Bize hangi âyeti getirirsen getir',
          'Qur’an 7:132',
        ],
        [
          { ar: 'إِذْمَا' },
          'whenever',
          'her ne zaman',
          // DRAFT (fusha fallback): إِذْمَا has no Quranic or Hadith occurrence.
          { ar: 'إِذْمَا تَجْتَهِدْ تَنْجَحْ' },
          'EN: Whenever you strive, you succeed · TR: Ne zaman gayret edersen başarırsın',
          'Fusha (no Quranic occurrence)',
        ],
        [
          { ar: 'أَيٌّ' },
          'whichever, whoever',
          'hangi(si), hangisini',
          { ar: 'أَيًّا مَا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَى' },
          'EN: Whichever you call upon, to Him belong the best names · TR: Hangisiyle dua ederseniz, en güzel isimler O’nundur',
          'Qur’an 17:110',
        ],
        [
          { ar: 'مَتَى' },
          'whenever, when',
          'ne zaman (olursa)',
          // DRAFT (fusha fallback): مَتَى occurs in the Quran only as a question
          // (e.g. مَتَى نَصْرُ اللَّهِ, 2:214), never as a jāzim of two verbs.
          { ar: 'مَتَى تَذْهَبْ أَذْهَبْ مَعَكَ' },
          'EN: Whenever you go, I go with you · TR: Ne zaman gidersen seninle giderim',
          'Fusha (Quranic uses are interrogative only)',
        ],
        [
          { ar: 'أَيَّانَ' },
          'whenever (emphatic)',
          'her ne zaman (tekitli)',
          // DRAFT (fusha fallback): أَيَّانَ occurs in the Quran only as a
          // question (e.g. أَيَّانَ يَوْمُ الدِّينِ, 51:12), never as a jāzim.
          { ar: 'أَيَّانَ تَرْحَلْ أَرْحَلْ مَعَكَ' },
          'EN: Whenever you set out, I set out with you · TR: Her ne zaman yola çıkarsan seninle çıkarım',
          'Fusha (Quranic uses are interrogative only)',
        ],
        [
          { ar: 'أَيْنَ', note: 'أَيْنَمَا' },
          'wherever',
          'nerede, nereye (olursa)',
          { ar: 'أَيْنَمَا تَكُونُوا يُدْرِكْكُمُ الْمَوْتُ' },
          'EN: Wherever you may be, death will overtake you · TR: Nerede olsanız ölüm size ulaşır',
          'Qur’an 4:78',
        ],
        [
          { ar: 'أَنَّى' },
          'wherever, however',
          'nerede, nasıl olursa',
          // DRAFT (fusha fallback): the Quranic أَنَّى (e.g. 2:223) is followed
          // by a māḍī or is interrogative, so no visible jazm is shown.
          { ar: 'أَنَّى تَجْلِسْ أَجْلِسْ' },
          'EN: Wherever you sit, I sit · TR: Nereye oturursan otururum',
          'Fusha (no Quranic jazm example)',
        ],
        [
          { ar: 'حَيْثُمَا' },
          'wherever',
          'her nerede',
          { ar: 'وَحَيْثُ مَا كُنْتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ' },
          'EN: And wherever you are, turn your faces towards it · TR: Nerede olursanız yüzlerinizi ona doğru çevirin',
          'Qur’an 2:150 (māḍī: jazm by position only)',
        ],
        [
          { ar: 'كَيْفَمَا' },
          'however, in whatever way',
          'nasıl olursa, nasıl yaparsan',
          // DRAFT (fusha fallback): كَيْفَمَا has no Quranic occurrence, and the
          // Basran grammarians deny that it jazms at all.
          { ar: 'كَيْفَمَا تَفْعَلْ أَفْعَلْ' },
          'EN: However you act, I act · TR: Nasıl davranırsan öyle davranırım',
          'Fusha (no Quranic occurrence; disputed particle)',
        ],
        [
          { ar: 'إِذَا', note: 'in poetry only' },
          'when (jazms only in poetry; in prose it takes the māḍī)',
          '-dığı zaman (yalnız şiirde cezm eder)',
          // DRAFT (fusha fallback): the matn allows إِذَا as a jāzim only in
          // poetry, and the commentaries' proof is a line of verse. That line is
          // not quoted here because its exact wording could not be confirmed;
          // a plain constructed example stands in its place.
          { ar: 'إِذَا تَقُمْ أَقُمْ' },
          'EN: When you stand, I stand · TR: Sen kalkınca ben de kalkarım',
          'Fusha (poetry-only usage)',
        ],
      ],
    },
    {
      kind: 'table',
      title: 'The signs of jazm',
      caption:
        'EN: The same three signs as in the iʿrāb-signs entry: sukūn for the sound present verb, dropping the nūn in the five verbs, dropping the weak final letter. / TR: İʿrâb alâmetleri sayfasındaki üç alâmetin aynısı: sahih muzaride sükûn, beş fiilde nûnun düşmesi, illetli sonda harf-i illetin düşmesi.',
      columns: ['Verb form', 'Sign of jazm', 'Example', 'Source'],
      rows: [
        [
          { ar: 'اَلْمُضَارِعُ الصَّحِيحُ الْآخِرِ', note: 'sound present verb / sahih muzari' },
          { ar: 'ـْ', note: 'sukūn / sükûn' },
          { ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', note: 'يَلِدُ → يَلِدْ' },
          'Qur’an 112:3',
        ],
        [
          { ar: 'اَلْأَفْعَالُ الْخَمْسَةُ', note: 'the five verbs / beş fiil' },
          { ar: 'حَذْفُ النُّونِ', note: 'the nūn drops / nûnun düşmesi' },
          { ar: 'فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ', note: 'يَعْبُدُونَ → يَعْبُدُوا' },
          'Qur’an 106:3',
        ],
        [
          { ar: 'اَلْمُعْتَلُّ بِالْأَلِفِ', note: 'weak in alif / elif ile illetli' },
          { ar: 'حَذْفُ الْأَلِفِ', note: 'the alif drops / elifin düşmesi' },
          { ar: 'وَلَا تَنْسَ نَصِيبَكَ مِنَ الدُّنْيَا', note: 'تَنْسَى → تَنْسَ' },
          'Qur’an 28:77',
        ],
        [
          { ar: 'اَلْمُعْتَلُّ بِالْوَاوِ', note: 'weak in wāw / vav ile illetli' },
          { ar: 'حَذْفُ الْوَاوِ', note: 'the wāw drops / vavın düşmesi' },
          { ar: 'فَلَا تَدْعُ مَعَ اللَّهِ إِلَهًا آخَرَ', note: 'تَدْعُو → تَدْعُ' },
          'Qur’an 26:213',
        ],
        [
          { ar: 'اَلْمُعْتَلُّ بِالْيَاءِ', note: 'weak in yāʾ / ya ile illetli' },
          { ar: 'حَذْفُ الْيَاءِ', note: 'the yāʾ drops / yanın düşmesi' },
          { ar: 'مَهْمَا تَأْتِنَا بِهِ مِنْ آيَةٍ', note: 'تَأْتِينَا → تَأْتِنَا' },
          'Qur’an 7:132',
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'Two notes on the signs',
      paragraphs: [
        'EN: When the sukūn of jazm meets a following sākin letter, it is voiced as kasra to break the meeting of two sākins: وَلَمَّا يَدْخُلِ الْإِيمَانُ (Qur’an 49:14), where يَدْخُلْ becomes يَدْخُلِ before the article. The verb is still majzūm; only the pronunciation moves.',
        'TR: Cezm sükûnu, kendisinden sonra gelen sâkin bir harfle karşılaşınca iki sâkinin buluşmasını önlemek için kesra okunur: وَلَمَّا يَدْخُلِ الْإِيمَانُ (Kur’an 49:14); burada يَدْخُلْ, harf-i tarif önünde يَدْخُلِ olur. Fiil hâlâ meczûmdur, yalnız okunuş değişir.',
        'EN: The matn also states that the imperative is majzūm always (wal-amru majzūmun abadan), so the same three signs describe the amr as well: اِضْرِبْ with sukūn, اِضْرِبُوا with the nūn dropped, اُدْعُ with the wāw dropped.',
        'TR: Metin ayrıca emir fiilin daima meczûm olduğunu söyler (ve’l-emru meczûmun ebeden); dolayısıyla aynı üç alâmet emir için de geçerlidir: اِضْرِبْ sükûnla, اِضْرِبُوا nûnu düşmüş olarak, اُدْعُ vavı düşmüş olarak.',
      ],
    },
    {
      kind: 'harf',
      id: 'lam',
      arabic: 'لَمْ',
      english: 'did not (negates the past)',
      turkish: '-medi / -madı (geçmişi olumsuzlar)',
      senses: [
        {
          term: 'Nafy al-māḍī',
          termArabic: 'نَفْيُ الْمَاضِي',
          english:
            'Turns the present verb into a negated past: the form stays muḍāriʿ, the meaning becomes past, and the verb is majzūm.',
          turkish:
            'Muzari fiili olumsuz geçmişe çevirir: kalıp muzari kalır, anlam geçmiş olur, fiil meczûm olur.',
          example: {
            arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
            english: 'He has not begotten, nor was He begotten',
            turkish: 'O doğurmadı, doğurulmadı da',
            source: 'Qur’an 112:3',
          },
        },
        {
          term: 'Istifhām (a-lam)',
          termArabic: 'اَلْاِسْتِفْهَامُ (أَلَمْ)',
          english:
            'With the interrogative hamza it asks "did ... not?", most often as a rhetorical reminder. The jazm is unchanged.',
          turkish:
            'Soru hemzesiyle "-medi mi?" anlamını verir; çoğunlukla hatırlatma amaçlı istifhâmdır. Cezm değişmez.',
          example: {
            arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',
            english: 'Did We not expand your breast for you?',
            turkish: 'Senin göğsünü açıp genişletmedik mi?',
            source: 'Qur’an 94:1',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'lamma',
      arabic: 'لَمَّا',
      english: 'has not yet',
      turkish: 'henüz -memiş / -mamış',
      senses: [
        {
          term: 'Nafy mustamirr',
          termArabic: 'اَلنَّفْيُ الْمُسْتَمِرُّ',
          english:
            'Negates the past up to the moment of speaking and leaves the act still expected: "not yet". This is what separates it from lam, which simply denies.',
          turkish:
            'Geçmişi konuşma anına kadar olumsuzlar ve fiilin hâlâ beklendiğini gösterir: "henüz değil". Lem’den ayrıldığı nokta budur; lem yalnızca olumsuzlar.',
          example: {
            arabic: 'وَلَمَّا يَدْخُلِ الْإِيمَانُ فِي قُلُوبِكُمْ',
            english: 'while faith has not yet entered your hearts',
            turkish: 'hâlbuki iman henüz kalplerinize girmedi',
            source: 'Qur’an 49:14',
          },
        },
      ],
    },
    {
      kind: 'harf',
      id: 'in-shartiyya',
      arabic: 'إِنْ',
      english: 'if (the model conditional)',
      turkish: 'eğer, şayet (şartın örnek edatı)',
      senses: [
        {
          term: 'Sharṭ with two present verbs',
          termArabic: 'اَلشَّرْطُ بِفِعْلَيْنِ مُضَارِعَيْنِ',
          english:
            'The regular case: both the condition verb and the answer verb are muḍāriʿ and both are majzūm.',
          turkish:
            'Kural durum: şart fiili de cevap fiili de muzaridir ve her ikisi meczûmdur.',
          example: {
            arabic: 'إِنْ تَنْصُرُوا اللَّهَ يَنْصُرْكُمْ',
            english: 'If you support Allah, He will support you',
            turkish: 'Eğer Allah’a yardım ederseniz, O da size yardım eder',
            source: 'Qur’an 47:7',
          },
        },
        {
          term: 'Answer joined with fāʾ',
          termArabic: 'جَوَابُ الشَّرْطِ بِالْفَاءِ',
          english:
            'When the answer cannot carry jazm, it is joined with fāʾ and keeps its own form. Here the answer is a māḍī with qad.',
          turkish:
            'Cevap cezm alamadığında başına fâ gelir ve kendi kalıbını korur. Burada cevap kad’lı mâzîdir.',
          example: {
            arabic: 'إِنْ يَسْرِقْ فَقَدْ سَرَقَ أَخٌ لَهُ مِنْ قَبْلُ',
            english: 'If he steals, a brother of his stole before',
            turkish: 'O çaldıysa, daha önce kardeşi de çalmıştı',
            source: 'Qur’an 12:77',
          },
        },
        {
          term: 'Māḍī in the condition',
          termArabic: 'اَلْمَاضِي فِي مَحَلِّ الشَّرْطِ',
          english:
            'A māḍī may fill either slot. It is majzūm by position only (maḥall jazm), so no sign appears on it.',
          turkish:
            'Mâzî her iki yeri de doldurabilir. Mahallen meczûmdur, bu yüzden üzerinde bir alâmet görünmez.',
          example: {
            arabic: 'وَإِنْ عُدْتُمْ عُدْنَا',
            english: 'And if you return ˹to sin˺, We will return ˹to punishment˺',
            turkish: 'Eğer siz dönerseniz biz de döneriz',
            source: 'Qur’an 17:8',
          },
        },
      ],
    },
  ],
}
