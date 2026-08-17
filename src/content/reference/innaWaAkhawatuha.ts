import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, chapter on the agents that enter the mubtadaʾ and the khabar:
// the section on inna wa-akhawatuha.
// DRAFT: verify every Arabic line, meaning, and citation against your textbook
// and a muṣḥaf before relying on it.
//
// Membership: the matn lists six sisters, in this order: inna, anna, lakinna,
// ka-anna, layta, laalla. Printed editions agree on these six and on the
// meanings assigned to them (tawkīd, istidrāk, tashbīh, tamannī, tarajjī +
// tawaqquʿ). Editions differ only in wording around the list (some print
// "wa-taqulu" where others print "taqulu"). Later grammars often add
// la an-nafiya li-l-jins as a seventh "sister"; the Ājurrūmiyya does not
// list it here, so it is not included.
//
// Sourcing: every example follows Quran > Hadith > fusha. All six sister
// examples are Quranic and carry a surah:ayah citation in Example.source.
// The only unsourced Arabic is the matn's own teaching sentence
// ("inna zaydan qa'imun"), used in the worked example; it comes from the matn
// itself, not from an agent's invention.
//
// Note on the inna example: the closing phrase "inna llaha ghafurun rahim"
// recurs many times in the Qur'an; 2:173 is one occurrence.

export const innaWaAkhawatuha: ReferenceEntry = {
  id: 'inna-wa-akhawatuha',
  title: 'Inna and its Sisters',
  titleArabic: 'إِنَّ وَأَخَوَاتُهَا',
  order: 9,
  summary: 'The particles that put the subject into naṣb and raise the predicate.',
  sections: [
    {
      kind: 'prose',
      title: { english: 'Overview', turkish: 'Genel bakış' },
      arabic:
        'وَأَمَّا إِنَّ وَأَخَوَاتُهَا فَإِنَّهَا تَنْصِبُ الْاِسْمَ وَتَرْفَعُ الْخَبَرَ، وَهِيَ: إِنَّ، وَأَنَّ، وَلَكِنَّ، وَكَأَنَّ، وَلَيْتَ، وَلَعَلَّ',
      paragraphs: [
        {
          english:
            'These six particles enter a nominal sentence and reverse its two endings: the subject after them (called the ism of inna) goes into naṣb, and the predicate (the khabar of inna) stays or goes into rafʿ. So the order is: particle, then ism manṣūb, then khabar marfūʿ.',
          turkish:
            'Bu altı harf isim cümlesinin başına gelir ve iki tarafın harekesini değiştirir: kendilerinden sonraki özne (inne’nin ismi) nasb olur, yüklem (inne’nin haberi) ref halinde kalır. Sıralama şöyledir: harf, sonra mansub isim, sonra merfû haber.',
        },
        {
          english:
            'They are called ḥurūf mushabbaha bil-fiʿl (particles resembling the verb) because, like a verb, each one governs what follows it. The ism may also be an attached pronoun; then the pronoun sits in the place of naṣb (maḥall naṣb) and shows no fatḥa.',
          turkish:
            'Fiile benzedikleri için "hurûf-i müşebbehe bi’l-fiil" denir; çünkü fiil gibi kendilerinden sonrasını amel ederler. İsim, muttasıl zamir de olabilir; o zaman zamir mahallen mansubdur ve fetha görünmez.',
        },
      ],
    },
    {
      kind: 'prose',
      title: {
        english: 'The meanings the matn assigns',
        turkish: 'Metnin verdiği anlamlar',
      },
      arabic:
        'وَمَعْنَى إِنَّ وَأَنَّ لِلتَّوْكِيدِ، وَلَكِنَّ لِلاِسْتِدْرَاكِ، وَكَأَنَّ لِلتَّشْبِيهِ، وَلَيْتَ لِلتَّمَنِّي، وَلَعَلَّ لِلتَّرَجِّي وَالتَّوَقُّعِ',
      paragraphs: [
        {
          english:
            'Inna and anna are for emphasis (tawkīd), lākinna for rectification (istidrāk), kaʾanna for comparison (tashbīh), layta for wishing (tamannī), and laʿalla for hope and expectation (tarajjī and tawaqquʿ).',
          turkish:
            'İnne ve enne tekid, lâkinne istidrâk, keenne teşbih, leyte temenni, lealle ise terecci ve tevakku (umut ve beklenti) içindir.',
        },
        {
          english:
            'Inna and anna carry the same emphasis; the difference is position. Inna opens an independent sentence ("Indeed ..."), while anna and its two words are read as one noun phrase inside a bigger sentence ("that ...", after verbs like "know", "witness", "reach").',
          turkish:
            'İnne ile enne aynı tekid anlamını taşır; fark yerindedir. İnne bağımsız cümlenin başında gelir ("şüphesiz ..."), enne ise kendisinden sonraki iki kelimeyle birlikte daha büyük bir cümlenin içinde tek bir isim gibi okunur ("... olduğunu"; bilmek, şahit olmak gibi fiillerden sonra).',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'Quick table', turkish: 'Kısa tablo' },
      caption: {
        english:
          'One Quranic example per sister; the ism and the khabar of each are named in the detail sections below.',
        turkish:
          'Her kardeş için bir Kur’an örneği; her birinin ismi ve haberi aşağıdaki bölümlerde adlandırılmıştır.',
      },
      columns: [
        { english: 'Sister', turkish: 'Kardeş' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Example', turkish: 'Örnek' },
      ],
      rows: [
        [
          { ar: 'إِنَّ' },
          {
            english: 'indeed, truly (emphasis)',
            turkish: 'şüphesiz, muhakkak (tekid)',
          },
          { ar: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ', source: 'Qur’an 2:173' },
        ],
        [
          { ar: 'أَنَّ' },
          {
            english: 'that ... (emphasis inside a clause)',
            turkish: '... olduğunu (cümle içinde tekid)',
          },
          { ar: 'أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', source: 'Qur’an 2:106' },
        ],
        [
          { ar: 'لَكِنَّ' },
          {
            english: 'but, however (rectification)',
            turkish: 'fakat, lâkin (istidrâk)',
          },
          { ar: 'وَلَكِنَّ اللَّهَ ذُو فَضْلٍ', source: 'Qur’an 2:251' },
        ],
        [
          { ar: 'كَأَنَّ' },
          { english: 'as if, as though (comparison)', turkish: 'sanki, gibi (teşbih)' },
          { ar: 'كَأَنَّهُنَّ الْيَاقُوتُ', source: 'Qur’an 55:58' },
        ],
        [
          { ar: 'لَيْتَ' },
          { english: 'would that, if only (wishing)', turkish: 'keşke (temenni)' },
          { ar: 'يَا لَيْتَ قَوْمِي يَعْلَمُونَ', source: 'Qur’an 36:26' },
        ],
        [
          { ar: 'لَعَلَّ' },
          {
            english: 'perhaps, it may be that (hope)',
            turkish: 'belki, umulur ki (terecci)',
          },
          { ar: 'لَعَلَّ السَّاعَةَ قَرِيبٌ', source: 'Qur’an 42:17' },
        ],
      ],
    },
    {
      kind: 'harf',
      id: 'inna',
      arabic: 'إِنَّ',
      english: 'indeed, truly',
      turkish: 'şüphesiz, muhakkak',
      senses: [
        {
          term: 'Tawkīd',
          termArabic: 'اَلتَّوْكِيدُ',
          english:
            'Emphasis at the head of an independent sentence. Here the ism is اللَّهَ in naṣb (fatḥa) and the khabar is غَفُورٌ in rafʿ (ḍamma), with رَحِيمٌ a second khabar.',
          turkish:
            'Bağımsız cümlenin başında tekid. Burada isim, nasb halinde (fetha) اللَّهَ; haber ise ref halinde (ötre) غَفُورٌ’dur; رَحِيمٌ ikinci haberdir.',
          examples: [
            {
              arabic: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ',
              english: 'Indeed Allah is Forgiving and Merciful',
              turkish: 'Şüphesiz Allah çok bağışlayandır, çok merhametlidir',
              source: 'Qur’an 2:173',
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'anna',
      arabic: 'أَنَّ',
      english: 'that ...',
      turkish: '... olduğunu',
      senses: [
        {
          term: 'Tawkīd',
          termArabic: 'اَلتَّوْكِيدُ',
          english:
            'The same emphasis, but inside a larger sentence, usually after a verb of knowing or saying. In the full ayah (أَلَمْ تَعْلَمْ ...) the ism is اللَّهَ in naṣb and the khabar is قَدِيرٌ in rafʿ, after the phrase عَلَى كُلِّ شَيْءٍ.',
          turkish:
            'Aynı tekid, fakat daha büyük bir cümlenin içinde; çoğunlukla bilme veya söyleme fiilinden sonra gelir. Tam ayette (أَلَمْ تَعْلَمْ ...) isim nasb halinde اللَّهَ, haber ise عَلَى كُلِّ شَيْءٍ ifadesinden sonra ref halinde قَدِيرٌ’dur.',
          examples: [
            {
              arabic: 'أَلَمْ تَعْلَمْ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
              english: 'Do you not know that Allah is able to do all things?',
              turkish: 'Allah’ın her şeye gücünün yettiğini bilmez misin?',
              source: 'Qur’an 2:106',
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'lakinna',
      arabic: 'لَكِنَّ',
      english: 'but, however',
      turkish: 'fakat, lâkin',
      senses: [
        {
          term: 'Istidrāk',
          termArabic: 'اَلْاِسْتِدْرَاكُ',
          english:
            'Corrects or limits what was said before it, so it always follows another statement. The ism is اللَّهَ in naṣb; the khabar is ذُو in rafʿ, one of the five nouns, so its rafʿ sign is the wāw and not a ḍamma (see the iʿrāb-signs entry).',
          turkish:
            'Kendinden önce söyleneni düzeltir veya sınırlar; bu yüzden her zaman başka bir cümleden sonra gelir. İsim nasb halinde اللَّهَ; haber ise ref halinde ذُو’dur. ذُو beş isimden biridir, bu yüzden ref alâmeti ötre değil vavdır (bkz. iʿrâb alâmetleri girişi).',
          examples: [
            {
              arabic: 'وَلَكِنَّ اللَّهَ ذُو فَضْلٍ عَلَى الْعَالَمِينَ',
              english: 'but Allah is the possessor of bounty for the worlds',
              turkish: 'fakat Allah âlemlere karşı lütuf sahibidir',
              source: 'Qur’an 2:251',
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'kaanna',
      arabic: 'كَأَنَّ',
      english: 'as if, as though',
      turkish: 'sanki, gibi',
      senses: [
        {
          term: 'Tashbīh',
          termArabic: 'اَلتَّشْبِيهُ',
          english:
            'Likens the ism to the khabar. Here the ism is the attached pronoun هُنَّ, which sits in the place of naṣb, and the khabar is الْيَاقُوتُ in rafʿ (ḍamma), with وَالْمَرْجَانُ joined to it.',
          turkish:
            'İsmi habere benzetir. Burada isim, mahallen mansub olan muttasıl zamir هُنَّ; haber ise ref halinde (ötre) الْيَاقُوتُ’tur; وَالْمَرْجَانُ ona atfedilmiştir.',
          examples: [
            {
              arabic: 'كَأَنَّهُنَّ الْيَاقُوتُ وَالْمَرْجَانُ',
              english: 'as if they were rubies and coral',
              turkish: 'sanki onlar yakut ve mercandır',
              source: 'Qur’an 55:58',
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'layta',
      arabic: 'لَيْتَ',
      english: 'would that, if only',
      turkish: 'keşke',
      senses: [
        {
          term: 'Tamannī',
          termArabic: 'اَلتَّمَنِّي',
          english:
            'Wishes for something, usually something out of reach. The ism is قَوْمِي in naṣb (its fatḥa is hidden by the attached pronoun ي), and the khabar is the verbal sentence يَعْلَمُونَ, which holds the place of rafʿ.',
          turkish:
            'Genellikle ulaşılamayan bir şeyi dilemek için gelir. İsim nasb halinde قَوْمِي’dir (fethası, muttasıl ي zamiri sebebiyle görünmez); haber ise mahallen merfû olan يَعْلَمُونَ fiil cümlesidir.',
          examples: [
            {
              arabic: 'يَا لَيْتَ قَوْمِي يَعْلَمُونَ',
              english: 'Would that my people knew',
              turkish: 'Ah, kavmim bir bilseydi',
              source: 'Qur’an 36:26',
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'laalla',
      arabic: 'لَعَلَّ',
      english: 'perhaps, it may be that',
      turkish: 'belki, umulur ki',
      senses: [
        {
          term: 'Tarajjī and Tawaqquʿ',
          termArabic: 'اَلتَّرَجِّي وَالتَّوَقُّعُ',
          english:
            'Hope for something liked (tarajjī) or expectation of something feared (tawaqquʿ). The ism is السَّاعَةَ in naṣb (fatḥa) and the khabar is قَرِيبٌ in rafʿ (ḍamma).',
          turkish:
            'Sevilen bir şeyi ummak (terecci) veya korkulan bir şeyi beklemek (tevakku). İsim nasb halinde (fetha) السَّاعَةَ; haber ise ref halinde (ötre) قَرِيبٌ’tur.',
          examples: [
            {
              arabic: 'لَعَلَّ السَّاعَةَ قَرِيبٌ',
              english: 'perhaps the Hour is near',
              turkish: 'belki o saat yakındır',
              source: 'Qur’an 42:17',
            },
          ],
        },
      ],
    },
    {
      kind: 'prose',
      title: { english: 'Worked example', turkish: 'Çözümlü örnek' },
      arabic: 'تَقُولُ: إِنَّ زَيْدًا قَائِمٌ، وَلَيْتَ عَمْرًا شَاخِصٌ، وَمَا أَشْبَهَ ذَلِكَ',
      paragraphs: [
        {
          english:
            'Start from the plain nominal sentence in the matn: Zayd is standing. Both words are in rafʿ with a ḍamma, because the first is the mubtadaʾ and the second is its khabar.',
          turkish:
            'Metnin sade isim cümlesinden başla: Zeyd ayaktadır. Her iki kelime de ötre ile ref halindedir; çünkü birincisi mübteda, ikincisi onun haberidir.',
        },
        {
          english:
            'Now inna enters. The first word becomes the ism of inna and takes naṣb, so its ending changes from ḍamma to fatḥa. The second word is the khabar of inna and keeps its rafʿ, so nothing changes on it. Only one ending moves.',
          turkish:
            'Şimdi inne gelir. Birinci kelime inne’nin ismi olur ve nasb alır; sonu ötreden fethaya döner. İkinci kelime inne’nin haberidir ve refini korur, yani hiç değişmez. Sadece bir hareke değişir.',
        },
        {
          english:
            'Kāna does the mirror image: it leaves the first word in rafʿ and puts the second into naṣb. The table below sets the three sentences side by side, so the two chapters can be compared in one look.',
          turkish:
            'Kâne bunun aynadaki görüntüsünü yapar: birinci kelimeyi ref halinde bırakır, ikinciyi nasba çevirir. Aşağıdaki tablo üç cümleyi yan yana koyar; böylece iki bab tek bakışta karşılaştırılabilir.',
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Worked example: the endings side by side',
        turkish: 'Çözümlü örnek: harekeler yan yana',
      },
      caption: {
        english:
          'The sentence is the matn’s own teaching example, not a quotation from a source.',
        turkish: 'Cümle, metnin kendi öğretici örneğidir; bir kaynaktan alıntı değildir.',
      },
      columns: [
        { english: 'Stage', turkish: 'Aşama' },
        { english: 'Sentence', turkish: 'Cümle' },
        { english: 'Subject (ism)', turkish: 'Özne (isim)' },
        { english: 'Predicate (khabar)', turkish: 'Yüklem (haber)' },
      ],
      rows: [
        [
          { english: 'Plain nominal sentence', turkish: 'Düz isim cümlesi' },
          {
            ar: 'زَيْدٌ قَائِمٌ',
            footnote: { english: 'Zayd is standing', turkish: 'Zeyd ayaktadır' },
          },
          {
            ar: 'زَيْدٌ',
            footnote: {
              english: 'mubtadaʾ · rafʿ, ḍamma',
              turkish: 'mübteda · ref, damme',
            },
          },
          {
            ar: 'قَائِمٌ',
            footnote: { english: 'khabar · rafʿ, ḍamma', turkish: 'haber · ref, damme' },
          },
        ],
        [
          { english: 'After inna', turkish: 'İnne’den sonra' },
          {
            ar: 'إِنَّ زَيْدًا قَائِمٌ',
            footnote: {
              english: 'Indeed Zayd is standing',
              turkish: 'Şüphesiz Zeyd ayaktadır',
            },
          },
          {
            ar: 'زَيْدًا',
            footnote: {
              english: 'ism inna · naṣb, fatḥa',
              turkish: 'inne’nin ismi · nasb, fetha',
            },
          },
          {
            ar: 'قَائِمٌ',
            footnote: {
              english: 'khabar inna · rafʿ, ḍamma',
              turkish: 'inne’nin haberi · ref, damme',
            },
          },
        ],
        [
          { english: 'Compare: after kāna', turkish: 'Karşılaştır: kâne’den sonra' },
          {
            ar: 'كَانَ زَيْدٌ قَائِمًا',
            footnote: { english: 'Zayd was standing', turkish: 'Zeyd ayakta idi' },
          },
          {
            ar: 'زَيْدٌ',
            footnote: {
              english: 'ism kāna · rafʿ, ḍamma',
              turkish: 'kâne’nin ismi · ref, damme',
            },
          },
          {
            ar: 'قَائِمًا',
            footnote: {
              english: 'khabar kāna · naṣb, fatḥa',
              turkish: 'kâne’nin haberi · nasb, fetha',
            },
          },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'Points to watch', turkish: 'Dikkat edilecek noktalar' },
      paragraphs: [
        {
          english:
            'The khabar is not always a single word in rafʿ. It may be a whole verbal sentence (as with layta above) or a prepositional phrase; then it holds the place of rafʿ without showing a ḍamma. The rule "khabar marfūʿ" describes the position first, the ending second.',
          turkish:
            'Haber her zaman tek bir merfû kelime değildir. Bir fiil cümlesi (yukarıdaki leyte örneğinde olduğu gibi) veya bir câr-mecrûr da olabilir; o zaman mahallen merfûdur, ötre görünmez. "Haber merfûdur" kuralı önce yeri, sonra hareke ile ilgilidir.',
        },
        {
          english:
            'When the khabar of inna comes first as a prepositional phrase, the ism follows it and still takes naṣb, as in "Indeed, with hardship comes ease" (Qur’an 94:6), where the ism carries a fatḥa at the end of the ayah. Word order moves, the endings do not.',
          turkish:
            'İnne’nin haberi câr-mecrûr olarak öne geçtiğinde, isim ondan sonra gelir ve yine nasb alır; "muhakkak zorlukla birlikte bir kolaylık vardır" (Kur’an 94:6) ayetinde olduğu gibi; orada isim, ayetin sonunda fetha taşır. Kelime sırası değişir, harekeler değişmez.',
        },
        {
          english:
            'The lightened forms (inna and anna written without the shadda, and kaʾan) belong to a later chapter; the matn deals here with the six heavy particles only.',
          turkish:
            'Şeddesiz yazılan hafifletilmiş biçimler (in, en, keen) daha sonraki bir babın konusudur; metin burada yalnız şeddeli altı harfi işler.',
        },
      ],
    },
  ],
}
