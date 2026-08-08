import type { ReferenceEntry } from '../types'

// Ājurrūmiyya: bāb al-ʿawāmil al-dākhila ʿalā al-mubtadaʾ wa-l-khabar,
// first of the three groups: kāna wa-akhawātuhā.
// DRAFT: verify against your textbook and a muṣḥaf before relying on it.
//
// Membership: the thirteen verbs below are the list the matn names, in the
// order the common printed matn gives them (kāna, amsā, aṣbaḥa, aḍḥā, ẓalla,
// bāta, ṣāra, laysa, mā zāla, mā anfakka, mā fatiʾa, mā bariḥa, mā dāma),
// followed by "wa-mā taṣarrafa minhā". Printed editions and commentaries vary
// the order inside the mā-group; check the order against your own copy. No
// verb was added to or dropped from the matn's list here.
//
// Sourcing: Quran first, then Hadith, then plain fusha. Six sisters have no
// Quranic occurrence as a nāqiṣ verb carrying a khabar (amsā, aḍḥā, bāta,
// ṣāra, mā anfakka, mā fatiʾa); those rows use a plain fusha sentence and are
// marked "fusha" in the Source column. Quranic rows quote an exact fragment of
// the ayah, not a paraphrase.

export const kanaWaAkhawatuha: ReferenceEntry = {
  id: 'kana-wa-akhawatuha',
  title: 'Kāna and its Sisters',
  titleArabic: 'كَانَ وَأَخَوَاتُهَا',
  order: 7,
  summary: 'The verbs that raise the subject and put the predicate into naṣb.',
  sections: [
    {
      kind: 'prose',
      title: 'Overview',
      arabic:
        'فَأَمَّا كَانَ وَأَخَوَاتُهَا فَإِنَّهَا تَرْفَعُ الِاسْمَ وَتَنْصِبُ الْخَبَرَ، وَهِيَ: كَانَ، وَأَمْسَى، وَأَصْبَحَ، وَأَضْحَى، وَظَلَّ، وَبَاتَ، وَصَارَ، وَلَيْسَ، وَمَا زَالَ، وَمَا انْفَكَّ، وَمَا فَتِئَ، وَمَا بَرِحَ، وَمَا دَامَ، وَمَا تَصَرَّفَ مِنْهَا نَحْوُ كَانَ وَيَكُونُ وَكُنْ، وَأَصْبَحَ وَيُصْبِحُ وَأَصْبِحْ. تَقُولُ: كَانَ زَيْدٌ قَائِمًا، وَلَيْسَ عَمْرٌو شَاخِصًا، وَمَا أَشْبَهَ ذَلِكَ.',
      paragraphs: [
        'EN: The matn opens the chapter of the agents that enter on the mubtadaʾ and the khabar (بَابُ الْعَوَامِلِ الدَّاخِلَةِ عَلَى الْمُبْتَدَأِ وَالْخَبَرِ) and says they are three things: kāna and its sisters, inna and its sisters, and ẓanantu and its sisters. This entry covers the first group.',
        'TR: Metin, mübteda ve haberin başına gelen âmiller bâbını açar (بَابُ الْعَوَامِلِ الدَّاخِلَةِ عَلَى الْمُبْتَدَأِ وَالْخَبَرِ) ve bunların üç şey olduğunu söyler: kâne ve kardeşleri, inne ve kardeşleri, zanentü ve kardeşleri. Bu bölüm birinci grubu ele alır.',
        'EN: The effect: kāna and its sisters raise the ism and put the khabar into naṣb. The first part of the nominal sentence keeps rafʿ (it is now called ism kāna, not mubtadaʾ), and the second part changes from rafʿ to naṣb (it is now called khabar kāna).',
        'TR: Etkisi: kâne ve kardeşleri ismi merfû yapar, haberi mansûb yapar. İsim cümlesinin birinci öğesi ref hâlinde kalır (artık mübteda değil, kâne’nin ismi denir), ikinci öğesi ise reften nasba geçer (artık kâne’nin haberi denir).',
        'EN: These verbs are called nāqiṣ (incomplete) because the raised ism alone does not complete the meaning: the manṣūb khabar is needed. The naṣb sign is fatḥa on a singular noun, and the substitute signs on the other word classes (yāʾ on the dual and the sound masculine plural, kasra on the sound feminine plural) exactly as in the iʿrāb-signs entry.',
        'TR: Bu fiillere nâkıs (eksik) fiiller denir; çünkü merfû isim tek başına anlamı tamamlamaz, mansûb haber gerekir. Nasb alâmeti tekil isimde fethadır; diğer kelime türlerinde vekil alâmetler geçerlidir (ikil ve kurallı eril çoğulda yâ, kurallı dişil çoğulda kesra), iʿrâb alâmetleri bölümünde olduğu gibi.',
      ],
    },
    {
      kind: 'table',
      title: 'Quick table',
      caption:
        'EN: One voweled example per sister; the ism is marfūʿ and the khabar manṣūb in each. Source "fusha" means no Quranic occurrence of that verb as a nāqiṣ verb with a khabar was available. / TR: Her kardeş için harekeli bir örnek; her örnekte isim merfû, haber mansûbdur. Kaynak sütunundaki "fusha", o fiilin haber alan nâkıs kullanımı Kur’an’da bulunmadığı için kullanılan düz fasih örneği gösterir.',
      columns: ['Sister', 'English', 'Türkçe', 'Example', 'Source'],
      rows: [
        [
          { ar: 'كَانَ' },
          'was, used to be',
          'idi, oldu',
          { ar: 'وَكَانَ الْإِنْسَانُ عَجُولًا' },
          'Qur’an 17:11',
        ],
        [
          { ar: 'أَمْسَى' },
          'became / grew (in the evening)',
          'akşamleyin oldu',
          { ar: 'أَمْسَى الْجَوُّ بَارِدًا' },
          'fusha',
        ],
        [
          { ar: 'أَصْبَحَ' },
          'became (in the morning)',
          'sabahleyin oldu',
          { ar: 'وَأَصْبَحَ فُؤَادُ أُمِّ مُوسَى فَارِغًا' },
          'Qur’an 28:10',
        ],
        [
          { ar: 'أَضْحَى' },
          'became (in the forenoon)',
          'kuşluk vakti oldu',
          { ar: 'أَضْحَى الطَّالِبُ مُجْتَهِدًا' },
          'fusha',
        ],
        [
          { ar: 'ظَلَّ' },
          'remained, kept on (through the day)',
          'gündüz boyunca öyle kaldı',
          { ar: 'ظَلَّ وَجْهُهُ مُسْوَدًّا' },
          'Qur’an 16:58',
        ],
        [
          { ar: 'بَاتَ' },
          'became, spent the night',
          'geceyi ... geçirdi',
          { ar: 'بَاتَ الْحَارِسُ سَاهِرًا' },
          'fusha',
        ],
        [
          { ar: 'صَارَ' },
          'became, turned into',
          'oldu, dönüştü',
          { ar: 'صَارَ الطِّينُ خَزَفًا' },
          'fusha',
        ],
        [
          { ar: 'لَيْسَ' },
          'is not',
          'değil',
          { ar: 'وَلَيْسَ الذَّكَرُ كَالْأُنْثَى' },
          'Qur’an 3:36',
        ],
        [
          { ar: 'مَا زَالَ' },
          'has not ceased, is still',
          'hâlâ ... olmaya devam etti',
          { ar: 'وَلَا يَزَالُونَ مُخْتَلِفِينَ' },
          'Qur’an 11:118',
        ],
        [
          { ar: 'مَا انْفَكَّ' },
          'has not ceased',
          'olmaktan hiç ayrılmadı',
          { ar: 'مَا انْفَكَّ زَيْدٌ صَائِمًا' },
          'fusha',
        ],
        [
          { ar: 'مَا فَتِئَ' },
          'has not ceased',
          'olmayı hiç bırakmadı',
          { ar: 'مَا فَتِئَ الْمُؤْمِنُ ذَاكِرًا رَبَّهُ' },
          'fusha',
        ],
        [
          { ar: 'مَا بَرِحَ' },
          'has not ceased, kept on',
          'ayrılmadı, öyle kalmaya devam etti',
          { ar: 'لَنْ نَبْرَحَ عَلَيْهِ عَاكِفِينَ' },
          'Qur’an 20:91',
        ],
        [
          { ar: 'مَا دَامَ' },
          'as long as ... remains',
          'olduğu sürece',
          { ar: 'مَا دُمْتُ حَيًّا' },
          'Qur’an 19:31',
        ],
      ],
    },
    {
      kind: 'table',
      title: 'The ism and the khabar in each example',
      caption:
        'EN: The same examples parsed. A pronoun ism is "in maḥall rafʿ" because a pronoun is indeclinable and cannot carry a ḍamma. / TR: Aynı örneklerin tahlili. Zamir olan isim "mahallen merfû" sayılır; çünkü zamir mebnîdir ve damme alamaz.',
      columns: ['Sister', 'Ism (marfūʿ)', 'Khabar (manṣūb)', 'Naṣb sign'],
      rows: [
        [
          { ar: 'كَانَ' },
          { ar: 'الْإِنْسَانُ', footnote: 'ḍamma' },
          { ar: 'عَجُولًا' },
          'fatḥa (tanwīn fatḥ)',
        ],
        [{ ar: 'أَمْسَى' }, { ar: 'الْجَوُّ', footnote: 'ḍamma' }, { ar: 'بَارِدًا' }, 'fatḥa'],
        [
          { ar: 'أَصْبَحَ' },
          { ar: 'فُؤَادُ', footnote: 'ḍamma; muḍāf to أُمِّ' },
          { ar: 'فَارِغًا' },
          'fatḥa',
        ],
        [{ ar: 'أَضْحَى' }, { ar: 'الطَّالِبُ', footnote: 'ḍamma' }, { ar: 'مُجْتَهِدًا' }, 'fatḥa'],
        [
          { ar: 'ظَلَّ' },
          { ar: 'وَجْهُهُ', footnote: 'ḍamma; هُ is muḍāf ilayhi' },
          { ar: 'مُسْوَدًّا' },
          'fatḥa',
        ],
        [{ ar: 'بَاتَ' }, { ar: 'الْحَارِسُ', footnote: 'ḍamma' }, { ar: 'سَاهِرًا' }, 'fatḥa'],
        [{ ar: 'صَارَ' }, { ar: 'الطِّينُ', footnote: 'ḍamma' }, { ar: 'خَزَفًا' }, 'fatḥa'],
        [
          { ar: 'لَيْسَ' },
          { ar: 'الذَّكَرُ', footnote: 'ḍamma' },
          { ar: 'كَالْأُنْثَى', footnote: 'shibh al-jumla' },
          'in maḥall naṣb (no visible ending)',
        ],
        [
          { ar: 'مَا زَالَ' },
          { ar: 'ـُونَ', footnote: 'wāw al-jamāʿa, in maḥall rafʿ' },
          { ar: 'مُخْتَلِفِينَ' },
          'yāʾ (sound masculine plural)',
        ],
        [{ ar: 'مَا انْفَكَّ' }, { ar: 'زَيْدٌ', footnote: 'ḍamma' }, { ar: 'صَائِمًا' }, 'fatḥa'],
        [
          { ar: 'مَا فَتِئَ' },
          { ar: 'الْمُؤْمِنُ', footnote: 'ḍamma' },
          { ar: 'ذَاكِرًا', footnote: 'رَبَّهُ is its mafʿūl' },
          'fatḥa',
        ],
        [
          { ar: 'مَا بَرِحَ' },
          { ar: 'ـنَا', footnote: 'the نَ of نَبْرَحُ, in maḥall rafʿ' },
          { ar: 'عَاكِفِينَ' },
          'yāʾ (sound masculine plural)',
        ],
        [
          { ar: 'مَا دَامَ' },
          { ar: 'ـتُ', footnote: 'tāʾ al-fāʿil, in maḥall rafʿ' },
          { ar: 'حَيًّا' },
          'fatḥa',
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'Worked example: before and after kāna',
      paragraphs: [
        'EN: Start with the plain nominal sentence زَيْدٌ قَائِمٌ, "Zayd is standing". It has two parts, both marfūʿ: the mubtadaʾ زَيْدٌ (ḍamma, shown by tanwīn ḍamm) and the khabar قَائِمٌ (ḍamma).',
        'TR: Düz isim cümlesiyle başla: زَيْدٌ قَائِمٌ, "Zeyd ayaktadır". İki öğesi vardır ve ikisi de merfûdur: mübteda زَيْدٌ (damme, iki damme tenvîniyle) ve haber قَائِمٌ (damme).',
        'EN: Now let kāna enter: كَانَ زَيْدٌ قَائِمًا, "Zayd was standing". زَيْدٌ keeps its ḍamma but changes name: it is now ism kāna, marfūʿ by kāna. قَائِمٌ changes its ending to قَائِمًا: it is khabar kāna, manṣūb by kāna, and its naṣb sign is fatḥa.',
        'TR: Şimdi kâne gelsin: كَانَ زَيْدٌ قَائِمًا, "Zeyd ayakta idi". زَيْدٌ dammesini korur ama adı değişir: artık kâne’nin ismidir, kâne sebebiyle merfûdur. قَائِمٌ ise sonunu değiştirir ve قَائِمًا olur: kâne’nin haberidir, kâne sebebiyle mansûbdur ve nasb alâmeti fethadır.',
        'EN: Only the second part moves. This is the mirror image of inna and its sisters, which put the ism into naṣb and raise the khabar.',
        'TR: Yalnız ikinci öğe değişir. Bu, ismi mansûb yapıp haberi merfû yapan inne ve kardeşlerinin tam tersidir.',
        'EN: The matn gives this very pair of examples: كَانَ زَيْدٌ قَائِمًا and لَيْسَ عَمْرٌو شَاخِصًا, "ʿAmr is not going away".',
        'TR: Metin tam bu örnekleri verir: كَانَ زَيْدٌ قَائِمًا ve لَيْسَ عَمْرٌو شَاخِصًا, "Amr gidici değildir".',
      ],
    },
    {
      kind: 'table',
      title: 'Before and after, side by side',
      caption:
        'EN: The examples of the matn itself (Ājurrūmiyya, bāb al-ʿawāmil al-dākhila ʿalā al-mubtadaʾ wa-l-khabar). / TR: Metnin kendi örnekleri (Âcurrûmiyye, mübteda ve haberin başına gelen âmiller bâbı).',
      columns: ['Sentence', 'First part', 'Second part', 'What changed'],
      rows: [
        [
          { ar: 'زَيْدٌ قَائِمٌ', footnote: 'Zayd is standing / Zeyd ayaktadır' },
          { ar: 'زَيْدٌ', footnote: 'mubtadaʾ, marfūʿ: ḍamma' },
          { ar: 'قَائِمٌ', footnote: 'khabar, marfūʿ: ḍamma' },
          'plain nominal sentence: both parts marfūʿ',
        ],
        [
          { ar: 'كَانَ زَيْدٌ قَائِمًا', footnote: 'Zayd was standing / Zeyd ayakta idi' },
          { ar: 'زَيْدٌ', footnote: 'ism kāna, marfūʿ: ḍamma' },
          { ar: 'قَائِمًا', footnote: 'khabar kāna, manṣūb: fatḥa' },
          'kāna raises the ism, puts the khabar into naṣb',
        ],
        [
          { ar: 'لَيْسَ عَمْرٌو شَاخِصًا', footnote: 'ʿAmr is not going away / Amr gidici değildir' },
          { ar: 'عَمْرٌو', footnote: 'ism laysa, marfūʿ: ḍamma' },
          { ar: 'شَاخِصًا', footnote: 'khabar laysa, manṣūb: fatḥa' },
          'laysa works the same way, with negation',
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'Conjugated forms (wa-mā taṣarrafa minhā)',
      paragraphs: [
        'EN: The matn adds "and whatever is conjugated from them": kāna, yakūnu, kun; aṣbaḥa, yuṣbiḥu, aṣbiḥ. Every form of these verbs governs the same way, in the past, the present, and the command. Only laysa has no conjugation: it is jāmid (frozen).',
        'TR: Metin "ve bunlardan çekimlenenler" der: kâne, yekûnü, kün; asbaha, yusbihu, asbih. Bu fiillerin her çekimi aynı şekilde amel eder: geçmişte, şimdide ve emirde. Yalnız leyse çekimlenmez; câmiddir (donuk).',
        'EN: Present (majzūm by lam): وَلَمْ أَكُنْ بِدُعَائِكَ رَبِّ شَقِيًّا, "and I have never been, in my supplication to You, my Lord, unblessed" (Qur’an 19:4). The ism is the hidden pronoun anā, in maḥall rafʿ; the khabar شَقِيًّا is manṣūb by fatḥa.',
        'TR: Muzâri (lem ile meczûm): وَلَمْ أَكُنْ بِدُعَائِكَ رَبِّ شَقِيًّا, "Sana ettiğim duada, Rabbim, hiç bedbaht olmadım" (Kur’an 19:4). İsim, mahallen merfû gizli "ene" zamiridir; haber شَقِيًّا fetha ile mansûbdur.',
        'EN: Command: كُونُوا عِبَادًا لِي, "be servants of mine" (Qur’an 3:79). The ism is wāw al-jamāʿa, in maḥall rafʿ; the khabar عِبَادًا is manṣūb by fatḥa.',
        'TR: Emir: كُونُوا عِبَادًا لِي, "bana kul olun" (Kur’an 3:79). İsim, mahallen merfû cemaat vâvıdır; haber عِبَادًا fetha ile mansûbdur.',
        'EN: Note on the mā-group: the matn lists them with the negating mā (mā zāla, mā bariḥa …), because these four only govern this way when they are negated. The Quranic examples above negate them with lā and lan on a conjugated form (لَا يَزَالُونَ, لَنْ نَبْرَحَ); the governance is the same. مَا دَامَ is different: its mā is maṣdariyya zamāniyya, "for as long as", not a negation.',
        'TR: Mâ grubu hakkında not: metin bunları olumsuzluk mâsı ile sayar (mâ zâle, mâ beriha …); çünkü bu dört fiil ancak olumsuz olduklarında böyle amel eder. Yukarıdaki Kur’an örnekleri onları çekimli hâlde lâ ve len ile olumsuz yapar (لَا يَزَالُونَ, لَنْ نَبْرَحَ); amel aynıdır. مَا دَامَ farklıdır: onun mâsı olumsuzluk değil, "... olduğu sürece" anlamı veren masdariyye zamâniyyedir.',
      ],
    },
  ],
}
