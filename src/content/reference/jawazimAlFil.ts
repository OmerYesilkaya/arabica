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
// ways: either alam and alamma are counted as lam and lamma carrying the
// interrogative hamza (so the count drops), or the poetry-only idha is not
// counted with the rest. Some printings drop one of the two accordingly, and
// some grammarians (mainly the Basrans) deny that kayfama jazms at all. All
// nineteen items are listed below so nothing is silently dropped.
//
// Sourcing: examples follow Quran > Hadith > fusha. Quranic examples carry a
// surah:ayah citation. Seven particles (alamma, idhma, mata, ayyana, anna,
// kayfama, and the poetry-only idha) have no Quranic occurrence as a
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
      title: { english: 'Overview', turkish: 'Genel bakış' },
      arabic:
        'وَالْمُضَارِعُ مَرْفُوعٌ أَبَدًا حَتَّى يَدْخُلَ عَلَيْهِ نَاصِبٌ أَوْ جَازِمٌ. وَالْجَوَازِمُ ثَمَانِيَةَ عَشَرَ، وَهِيَ: لَمْ، وَلَمَّا، وَأَلَمْ، وَأَلَمَّا، وَلَامُ الْأَمْرِ وَالدُّعَاءِ، وَلَا فِي النَّهْيِ وَالدُّعَاءِ، وَإِنْ، وَمَا، وَمَنْ، وَمَهْمَا، وَإِذْمَا، وَأَيٌّ، وَمَتَى، وَأَيَّانَ، وَأَيْنَ، وَأَنَّى، وَحَيْثُمَا، وَكَيْفَمَا، وَإِذَا فِي الشِّعْرِ',
      paragraphs: [
        {
          english:
            'The present verb (muḍāriʿ) stays in rafʿ until a naṣb agent or a jazm agent enters on it. A jazm particle puts it into jazm: its ending becomes sukūn, or the substitute sign of its form. The first six particles govern one verb only. The remaining thirteen are conditional particles (adawāt al-sharṭ): they govern two verbs, the condition verb (fiʿl al-sharṭ) and its answer (jawāb al-sharṭ).',
          turkish:
            'Muzari fiil, başına bir nasb veya cezm edatı gelmedikçe daima merfûdur. Cezm edatı fiili cezm eder: sonu sükûn olur veya o kalıbın vekil alâmetini alır. İlk altı edat yalnız bir fiili cezm eder. Kalan on üçü şart edatlarıdır (edevât-ı şart): iki fiili cezm ederler, şart fiili (fiil-i şart) ve cevabı (cevâb-ı şart).',
        },
        {
          english:
            'The matn gives the count as eighteen and its list has nineteen items. This entry follows the list exactly as the matn gives it. The usual reconciliation: alam and alammā are lam and lammā with the question hamza in front, so they are not counted separately.',
          turkish:
            'Metin sayıyı "on sekiz" verir, listesinde ise on dokuz madde vardır. Bu giriş, listeyi metnin verdiği hâliyle aynen izler. Yaygın izah şudur: elem ve elemmâ, başına soru hemzesi gelmiş lem ve lemmâdır; bu yüzden ayrıca sayılmazlar.',
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Particles that jazm one verb',
        turkish: 'Tek fiili cezm eden edatlar',
      },
      caption: {
        english: 'These six enter on a single present verb and put it into jazm.',
        turkish: 'Bu altı edat tek bir muzari fiilin başına gelir ve onu cezm eder.',
      },
      columns: [
        { english: 'Particle', turkish: 'Edat' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Example', turkish: 'Örnek' },
        { english: 'Meaning of the example', turkish: 'Örneğin anlamı' },
      ],
      rows: [
        [
          { ar: 'لَمْ' },
          {
            english: 'did not (negates the past)',
            turkish: '-medi / -madı (geçmişi olumsuzlar)',
          },
          { ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', source: 'Qur’an 112:3' },
          {
            english: 'He has not begotten, nor was He begotten',
            turkish: 'O doğurmadı, doğurulmadı da',
          },
        ],
        [
          { ar: 'لَمَّا' },
          {
            english: 'has not yet (negation still open)',
            turkish: 'henüz -memiş / -mamış',
          },
          { ar: 'وَلَمَّا يَدْخُلِ الْإِيمَانُ فِي قُلُوبِكُمْ', source: 'Qur’an 49:14' },
          {
            english: 'while faith has not yet entered your hearts',
            turkish: 'hâlbuki iman henüz kalplerinize girmedi',
          },
        ],
        [
          { ar: 'أَلَمْ' },
          {
            english: 'did not ...? (lam with the interrogative hamza)',
            turkish: '-medi mi? (soru hemzesi + lem)',
          },
          { ar: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ', source: 'Qur’an 94:1' },
          {
            english: 'Did We not expand your breast for you?',
            turkish: 'Senin göğsünü açıp genişletmedik mi?',
          },
        ],
        [
          { ar: 'أَلَمَّا' },
          {
            english: 'has not yet ...? (lammā with the interrogative hamza)',
            turkish: 'henüz -memiş mi? (soru hemzesi + lemmâ)',
          },
          // DRAFT (fusha fallback): alamma has no Quranic or Hadith occurrence.
          { ar: 'أَلَمَّا يَرْجِعْ أَخُوكَ؟', source: 'Fusha (no Quranic occurrence)' },
          {
            english: 'Has your brother not returned yet?',
            turkish: 'Kardeşin henüz dönmedi mi?',
          },
        ],
        [
          { ar: 'لَامُ الْأَمْرِ وَالدُّعَاءِ', footnote: 'لِـ' },
          {
            english: 'let him / let it be (command, or supplication when said upward)',
            turkish: 'emir lâmı: -sin, -meli; duada: -sin diye dilemek',
          },
          { ar: 'فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ', source: 'Qur’an 106:3' },
          {
            english: 'So let them worship the Lord of this House',
            turkish: 'Öyleyse bu Ev’in Rabbine kulluk etsinler',
          },
        ],
        [
          { ar: 'لَا النَّاهِيَةُ', footnote: 'لَا' },
          {
            english: 'do not (prohibition, or supplication when said upward)',
            turkish: 'yasaklama lâsı: -me / -ma; duada: -mesin',
          },
          { ar: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', source: 'Qur’an 9:40' },
          {
            english: 'Do not grieve; indeed Allah is with us',
            turkish: 'Üzülme, Allah bizimledir',
          },
        ],
      ],
    },
    {
      kind: 'prose',
      title: {
        english: 'How the conditional pair works',
        turkish: 'Şart ikilisi nasıl çalışır',
      },
      paragraphs: [
        {
          english:
            'A conditional particle governs two verbs. The first is the condition (fiʿl al-sharṭ), the second is its answer (jawāb al-sharṭ); both are majzūm. If the answer cannot take jazm (it is a māḍī with qad, an amr, a nominal sentence, and so on), it is joined with fāʾ and keeps its own form. A māḍī may stand in either slot: its jazm is then a position only (maḥall jazm), with no visible sign.',
          turkish:
            'Şart edatı iki fiili cezm eder. Birincisi şart fiili, ikincisi cevabıdır; her ikisi de meczûmdur. Cevap cezm alamıyorsa (kad’lı mâzî, emir, isim cümlesi gibi) başına fâ gelir ve kendi kalıbını korur. Mâzî her iki yerde de gelebilir: o zaman cezm mahallendir (mahallen meczûm), görünen bir alâmet yoktur.',
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Conditional particles that jazm two verbs',
        turkish: 'İki fiili cezm eden şart edatları',
      },
      caption: {
        english:
          'Each governs the condition verb and the answer verb. Where the Qur’an uses the particle with an added mā (أَيْنَمَا for أَيْنَ), the added form is shown.',
        turkish:
          'Her biri şart fiilini ve cevap fiilini cezm eder. Kur’an edatı zâid mâ ile kullanıyorsa (أَيْنَ yerine أَيْنَمَا) o şekil verilmiştir.',
      },
      columns: [
        { english: 'Particle', turkish: 'Edat' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Example', turkish: 'Örnek' },
        { english: 'Meaning of the example', turkish: 'Örneğin anlamı' },
      ],
      rows: [
        [
          { ar: 'إِنْ' },
          { english: 'if (the plain conditional)', turkish: 'eğer, şayet' },
          { ar: 'إِنْ تَنْصُرُوا اللَّهَ يَنْصُرْكُمْ', source: 'Qur’an 47:7' },
          {
            english: 'If you support Allah, He will support you',
            turkish: 'Eğer Allah’a yardım ederseniz, O da size yardım eder',
          },
        ],
        [
          { ar: 'مَا' },
          { english: 'whatever', turkish: 'ne / her ne (yaparsan)' },
          { ar: 'وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ', source: 'Qur’an 2:197' },
          {
            english: 'Whatever good you do, Allah knows it',
            turkish: 'Hayır olarak ne yaparsanız Allah onu bilir',
          },
        ],
        [
          { ar: 'مَنْ' },
          { english: 'whoever', turkish: 'kim, her kim' },
          { ar: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ', source: 'Qur’an 99:7' },
          {
            english: 'So whoever does an atom’s weight of good will see it',
            turkish: 'Kim zerre kadar bir hayır işlerse onu görür',
          },
        ],
        [
          { ar: 'مَهْمَا' },
          {
            english: 'whatever, no matter what',
            turkish: 'her ne (yaparsan), ne yaparsan yap',
          },
          { ar: 'مَهْمَا تَأْتِنَا بِهِ مِنْ آيَةٍ', source: 'Qur’an 7:132' },
          {
            english: 'Whatever sign you bring us',
            turkish: 'Bize hangi âyeti getirirsen getir',
          },
        ],
        [
          { ar: 'إِذْمَا' },
          { english: 'whenever', turkish: 'her ne zaman' },
          // DRAFT (fusha fallback): idhma has no Quranic or Hadith occurrence.
          { ar: 'إِذْمَا تَجْتَهِدْ تَنْجَحْ', source: 'Fusha (no Quranic occurrence)' },
          {
            english: 'Whenever you strive, you succeed',
            turkish: 'Ne zaman gayret edersen başarırsın',
          },
        ],
        [
          { ar: 'أَيٌّ' },
          { english: 'whichever, whoever', turkish: 'hangi(si), hangisini' },
          { ar: 'أَيًّا مَا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَى', source: 'Qur’an 17:110' },
          {
            english: 'Whichever you call upon, to Him belong the best names',
            turkish: 'Hangisiyle dua ederseniz, en güzel isimler O’nundur',
          },
        ],
        [
          { ar: 'مَتَى' },
          { english: 'whenever, when', turkish: 'ne zaman (olursa)' },
          // DRAFT (fusha fallback): mata occurs in the Quran only as a question
          // (e.g. "mata nasru llah", 2:214), never as a jāzim of two verbs.
          {
            ar: 'مَتَى تَذْهَبْ أَذْهَبْ مَعَكَ',
            source: 'Fusha (Quranic uses are interrogative only)',
          },
          {
            english: 'Whenever you go, I go with you',
            turkish: 'Ne zaman gidersen seninle giderim',
          },
        ],
        [
          { ar: 'أَيَّانَ' },
          { english: 'whenever (emphatic)', turkish: 'her ne zaman (tekitli)' },
          // DRAFT (fusha fallback): ayyana occurs in the Quran only as a
          // question (e.g. "ayyana yawmu d-din", 51:12), never as a jāzim.
          {
            ar: 'أَيَّانَ تَرْحَلْ أَرْحَلْ مَعَكَ',
            source: 'Fusha (Quranic uses are interrogative only)',
          },
          {
            english: 'Whenever you set out, I set out with you',
            turkish: 'Her ne zaman yola çıkarsan seninle çıkarım',
          },
        ],
        [
          { ar: 'أَيْنَ', footnote: 'أَيْنَمَا' },
          { english: 'wherever', turkish: 'nerede, nereye (olursa)' },
          { ar: 'أَيْنَمَا تَكُونُوا يُدْرِكْكُمُ الْمَوْتُ', source: 'Qur’an 4:78' },
          {
            english: 'Wherever you may be, death will overtake you',
            turkish: 'Nerede olsanız ölüm size ulaşır',
          },
        ],
        [
          { ar: 'أَنَّى' },
          { english: 'wherever, however', turkish: 'nerede, nasıl olursa' },
          // DRAFT (fusha fallback): the Quranic anna (e.g. 2:223) is followed
          // by a māḍī or is interrogative, so no visible jazm is shown.
          { ar: 'أَنَّى تَجْلِسْ أَجْلِسْ', source: 'Fusha (no Quranic jazm example)' },
          { english: 'Wherever you sit, I sit', turkish: 'Nereye oturursan otururum' },
        ],
        [
          { ar: 'حَيْثُمَا' },
          { english: 'wherever', turkish: 'her nerede' },
          {
            ar: 'وَحَيْثُ مَا كُنْتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ',
            footnote: {
              english: 'māḍī: jazm by position only',
              turkish: 'mâzî: yalnız mahallen cezm',
            },
            source: 'Qur’an 2:150',
          },
          {
            english: 'And wherever you are, turn your faces towards it',
            turkish: 'Nerede olursanız yüzlerinizi ona doğru çevirin',
          },
        ],
        [
          { ar: 'كَيْفَمَا' },
          {
            english: 'however, in whatever way',
            turkish: 'nasıl olursa, nasıl yaparsan',
          },
          // DRAFT (fusha fallback): kayfama has no Quranic occurrence, and the
          // Basran grammarians deny that it jazms at all.
          {
            ar: 'كَيْفَمَا تَفْعَلْ أَفْعَلْ',
            source: 'Fusha (no Quranic occurrence; disputed particle)',
          },
          {
            english: 'However you act, I act',
            turkish: 'Nasıl davranırsan öyle davranırım',
          },
        ],
        [
          {
            ar: 'إِذَا',
            footnote: { english: 'in poetry only', turkish: 'yalnız şiirde' },
          },
          {
            english: 'when (jazms only in poetry; in prose it takes the māḍī)',
            turkish: '-dığı zaman (yalnız şiirde cezm eder)',
          },
          // DRAFT (fusha fallback): the matn allows idha as a jāzim only in
          // poetry, and the commentaries' proof is a line of verse. That line is
          // not quoted here because its exact wording could not be confirmed;
          // a plain constructed example stands in its place.
          { ar: 'إِذَا تَقُمْ أَقُمْ', source: 'Fusha (poetry-only usage)' },
          {
            english: 'When you stand, I stand',
            turkish: 'Sen kalkınca ben de kalkarım',
          },
        ],
      ],
    },
    {
      kind: 'table',
      title: { english: 'The signs of jazm', turkish: 'Cezm alâmetleri' },
      caption: {
        english:
          'The same three signs as in the iʿrāb-signs entry: sukūn for the sound present verb, dropping the nūn in the five verbs, dropping the weak final letter.',
        turkish:
          'İʿrâb alâmetleri sayfasındaki üç alâmetin aynısı: sahih muzaride sükûn, beş fiilde nûnun düşmesi, illetli sonda harf-i illetin düşmesi.',
      },
      columns: [
        { english: 'Verb form', turkish: 'Fiil şekli' },
        { english: 'Sign of jazm', turkish: 'Cezm alâmeti' },
        { english: 'Example', turkish: 'Örnek' },
      ],
      rows: [
        [
          {
            ar: 'اَلْمُضَارِعُ الصَّحِيحُ الْآخِرِ',
            footnote: { english: 'sound present verb', turkish: 'sahih muzari' },
          },
          { ar: 'ـْ', footnote: { english: 'sukūn', turkish: 'sükûn' } },
          { ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', footnote: 'يَلِدُ → يَلِدْ', source: 'Qur’an 112:3' },
        ],
        [
          {
            ar: 'اَلْأَفْعَالُ الْخَمْسَةُ',
            footnote: { english: 'the five verbs', turkish: 'beş fiil' },
          },
          {
            ar: 'حَذْفُ النُّونِ',
            footnote: { english: 'the nūn drops', turkish: 'nûnun düşmesi' },
          },
          {
            ar: 'فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ',
            footnote: 'يَعْبُدُونَ → يَعْبُدُوا',
            source: 'Qur’an 106:3',
          },
        ],
        [
          {
            ar: 'اَلْمُعْتَلُّ بِالْأَلِفِ',
            footnote: { english: 'weak in alif', turkish: 'elif ile illetli' },
          },
          {
            ar: 'حَذْفُ الْأَلِفِ',
            footnote: { english: 'the alif drops', turkish: 'elifin düşmesi' },
          },
          {
            ar: 'وَلَا تَنْسَ نَصِيبَكَ مِنَ الدُّنْيَا',
            footnote: 'تَنْسَى → تَنْسَ',
            source: 'Qur’an 28:77',
          },
        ],
        [
          {
            ar: 'اَلْمُعْتَلُّ بِالْوَاوِ',
            footnote: { english: 'weak in wāw', turkish: 'vav ile illetli' },
          },
          {
            ar: 'حَذْفُ الْوَاوِ',
            footnote: { english: 'the wāw drops', turkish: 'vavın düşmesi' },
          },
          {
            ar: 'فَلَا تَدْعُ مَعَ اللَّهِ إِلَهًا آخَرَ',
            footnote: 'تَدْعُو → تَدْعُ',
            source: 'Qur’an 26:213',
          },
        ],
        [
          {
            ar: 'اَلْمُعْتَلُّ بِالْيَاءِ',
            footnote: { english: 'weak in yāʾ', turkish: 'ya ile illetli' },
          },
          {
            ar: 'حَذْفُ الْيَاءِ',
            footnote: { english: 'the yāʾ drops', turkish: 'yanın düşmesi' },
          },
          {
            ar: 'مَهْمَا تَأْتِنَا بِهِ مِنْ آيَةٍ',
            footnote: 'تَأْتِينَا → تَأْتِنَا',
            source: 'Qur’an 7:132',
          },
        ],
      ],
    },
    {
      kind: 'prose',
      title: {
        english: 'Two notes on the signs',
        turkish: 'Alâmetler üzerine iki not',
      },
      paragraphs: [
        {
          english:
            'When the sukūn of jazm meets a following sākin letter, it is voiced as kasra to break the meeting of two sākins: وَلَمَّا يَدْخُلِ الْإِيمَانُ (Qur’an 49:14), where يَدْخُلْ becomes يَدْخُلِ before the article. The verb is still majzūm; only the pronunciation moves.',
          turkish:
            'Cezm sükûnu, kendisinden sonra gelen sâkin bir harfle karşılaşınca iki sâkinin buluşmasını önlemek için kesra okunur: وَلَمَّا يَدْخُلِ الْإِيمَانُ (Kur’an 49:14); burada يَدْخُلْ, harf-i tarif önünde يَدْخُلِ olur. Fiil hâlâ meczûmdur, yalnız okunuş değişir.',
        },
        {
          english:
            'The matn also states that the imperative is majzūm always (wal-amru majzūmun abadan), so the same three signs describe the amr as well: اِضْرِبْ with sukūn, اِضْرِبُوا with the nūn dropped, اُدْعُ with the wāw dropped.',
          turkish:
            'Metin ayrıca emir fiilin daima meczûm olduğunu söyler (ve’l-emru meczûmun ebeden); dolayısıyla aynı üç alâmet emir için de geçerlidir: اِضْرِبْ sükûnla, اِضْرِبُوا nûnu düşmüş olarak, اُدْعُ vavı düşmüş olarak.',
        },
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
