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
// ṣāra, mā anfakka, mā fatiʾa); those rows carry the source "fusha" on the
// example cell. Quranic rows quote an exact fragment of the ayah, not a
// paraphrase.

export const kanaWaAkhawatuha: ReferenceEntry = {
  id: 'kana-wa-akhawatuha',
  title: 'Kāna and its Sisters',
  titleArabic: 'كَانَ وَأَخَوَاتُهَا',
  order: 8,
  summary: 'The verbs that raise the subject and put the predicate into naṣb.',
  sections: [
    {
      kind: 'prose',
      title: { english: 'Overview', turkish: 'Genel bakış' },
      arabic:
        'فَأَمَّا كَانَ وَأَخَوَاتُهَا فَإِنَّهَا تَرْفَعُ الِاسْمَ وَتَنْصِبُ الْخَبَرَ، وَهِيَ: كَانَ، وَأَمْسَى، وَأَصْبَحَ، وَأَضْحَى، وَظَلَّ، وَبَاتَ، وَصَارَ، وَلَيْسَ، وَمَا زَالَ، وَمَا انْفَكَّ، وَمَا فَتِئَ، وَمَا بَرِحَ، وَمَا دَامَ، وَمَا تَصَرَّفَ مِنْهَا نَحْوُ كَانَ وَيَكُونُ وَكُنْ، وَأَصْبَحَ وَيُصْبِحُ وَأَصْبِحْ. تَقُولُ: كَانَ زَيْدٌ قَائِمًا، وَلَيْسَ عَمْرٌو شَاخِصًا، وَمَا أَشْبَهَ ذَلِكَ.',
      paragraphs: [
        {
          english:
            'The matn opens the chapter of the agents that enter on the mubtadaʾ and the khabar (بَابُ الْعَوَامِلِ الدَّاخِلَةِ عَلَى الْمُبْتَدَأِ وَالْخَبَرِ) and says they are three things: kāna and its sisters, inna and its sisters, and ẓanantu and its sisters. This entry covers the first group.',
          turkish:
            'Metin, mübteda ve haberin başına gelen âmiller bâbını açar (بَابُ الْعَوَامِلِ الدَّاخِلَةِ عَلَى الْمُبْتَدَأِ وَالْخَبَرِ) ve bunların üç şey olduğunu söyler: kâne ve kardeşleri, inne ve kardeşleri, zanentü ve kardeşleri. Bu bölüm birinci grubu ele alır.',
        },
        {
          english:
            'The effect: kāna and its sisters raise the ism and put the khabar into naṣb. The first part of the nominal sentence keeps rafʿ (it is now called ism kāna, not mubtadaʾ), and the second part changes from rafʿ to naṣb (it is now called khabar kāna).',
          turkish:
            'Etkisi: kâne ve kardeşleri ismi merfû yapar, haberi mansûb yapar. İsim cümlesinin birinci öğesi ref hâlinde kalır (artık mübteda değil, kâne’nin ismi denir), ikinci öğesi ise reften nasba geçer (artık kâne’nin haberi denir).',
        },
        {
          english:
            'These verbs are called nāqiṣ (incomplete) because the raised ism alone does not complete the meaning: the manṣūb khabar is needed. The naṣb sign is fatḥa on a singular noun, and the substitute signs on the other word classes (yāʾ on the dual and the sound masculine plural, kasra on the sound feminine plural) exactly as in the iʿrāb-signs entry.',
          turkish:
            'Bu fiillere nâkıs (eksik) fiiller denir; çünkü merfû isim tek başına anlamı tamamlamaz, mansûb haber gerekir. Nasb alâmeti tekil isimde fethadır; diğer kelime türlerinde vekil alâmetler geçerlidir (ikil ve kurallı eril çoğulda yâ, kurallı dişil çoğulda kesra), iʿrâb alâmetleri bölümünde olduğu gibi.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'Quick table', turkish: 'Kısa tablo' },
      caption: {
        english:
          'One voweled example per sister; the ism is marfūʿ and the khabar manṣūb in each. The source "fusha" means no Quranic occurrence of that verb as a nāqiṣ verb with a khabar was available.',
        turkish:
          'Her kardeş için harekeli bir örnek; her örnekte isim merfû, haber mansûbdur. "fusha" kaynağı, o fiilin haber alan nâkıs kullanımı Kur’an’da bulunmadığı için kullanılan düz fasih örneği gösterir.',
      },
      columns: [
        { english: 'Sister', turkish: 'Kardeş' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Example', turkish: 'Örnek' },
      ],
      rows: [
        [
          { ar: 'كَانَ' },
          { english: 'was, used to be', turkish: 'idi, oldu' },
          { ar: 'وَكَانَ الْإِنْسَانُ عَجُولًا', source: 'Qur’an 17:11' },
        ],
        [
          { ar: 'أَمْسَى' },
          {
            english: 'became / grew (in the evening)',
            turkish: 'akşamleyin oldu',
          },
          { ar: 'أَمْسَى الْجَوُّ بَارِدًا', source: 'fusha' },
        ],
        [
          { ar: 'أَصْبَحَ' },
          { english: 'became (in the morning)', turkish: 'sabahleyin oldu' },
          { ar: 'وَأَصْبَحَ فُؤَادُ أُمِّ مُوسَى فَارِغًا', source: 'Qur’an 28:10' },
        ],
        [
          { ar: 'أَضْحَى' },
          { english: 'became (in the forenoon)', turkish: 'kuşluk vakti oldu' },
          { ar: 'أَضْحَى الطَّالِبُ مُجْتَهِدًا', source: 'fusha' },
        ],
        [
          { ar: 'ظَلَّ' },
          {
            english: 'remained, kept on (through the day)',
            turkish: 'gündüz boyunca öyle kaldı',
          },
          { ar: 'ظَلَّ وَجْهُهُ مُسْوَدًّا', source: 'Qur’an 16:58' },
        ],
        [
          { ar: 'بَاتَ' },
          { english: 'became, spent the night', turkish: 'geceyi ... geçirdi' },
          { ar: 'بَاتَ الْحَارِسُ سَاهِرًا', source: 'fusha' },
        ],
        [
          { ar: 'صَارَ' },
          { english: 'became, turned into', turkish: 'oldu, dönüştü' },
          { ar: 'صَارَ الطِّينُ خَزَفًا', source: 'fusha' },
        ],
        [
          { ar: 'لَيْسَ' },
          { english: 'is not', turkish: 'değil' },
          { ar: 'وَلَيْسَ الذَّكَرُ كَالْأُنْثَى', source: 'Qur’an 3:36' },
        ],
        [
          { ar: 'مَا زَالَ' },
          {
            english: 'has not ceased, is still',
            turkish: 'hâlâ ... olmaya devam etti',
          },
          { ar: 'وَلَا يَزَالُونَ مُخْتَلِفِينَ', source: 'Qur’an 11:118' },
        ],
        [
          { ar: 'مَا انْفَكَّ' },
          { english: 'has not ceased', turkish: 'olmaktan hiç ayrılmadı' },
          { ar: 'مَا انْفَكَّ زَيْدٌ صَائِمًا', source: 'fusha' },
        ],
        [
          { ar: 'مَا فَتِئَ' },
          { english: 'has not ceased', turkish: 'olmayı hiç bırakmadı' },
          { ar: 'مَا فَتِئَ الْمُؤْمِنُ ذَاكِرًا رَبَّهُ', source: 'fusha' },
        ],
        [
          { ar: 'مَا بَرِحَ' },
          {
            english: 'has not ceased, kept on',
            turkish: 'ayrılmadı, öyle kalmaya devam etti',
          },
          { ar: 'لَنْ نَبْرَحَ عَلَيْهِ عَاكِفِينَ', source: 'Qur’an 20:91' },
        ],
        [
          { ar: 'مَا دَامَ' },
          { english: 'as long as ... remains', turkish: 'olduğu sürece' },
          { ar: 'مَا دُمْتُ حَيًّا', source: 'Qur’an 19:31' },
        ],
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'The ism and the khabar in each example',
        turkish: 'Her örnekte isim ve haber',
      },
      caption: {
        english:
          'The same examples parsed. A pronoun ism is "in maḥall rafʿ" because a pronoun is indeclinable and cannot carry a ḍamma.',
        turkish:
          'Aynı örneklerin tahlili. Zamir olan isim "mahallen merfû" sayılır; çünkü zamir mebnîdir ve damme alamaz.',
      },
      columns: [
        { english: 'Sister', turkish: 'Kardeş' },
        'Ism (marfūʿ)',
        'Khabar (manṣūb)',
        { english: 'Naṣb sign', turkish: 'Nasb alâmeti' },
      ],
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
          {
            ar: 'فُؤَادُ',
            footnote: {
              english: 'ḍamma; muḍāf to أُمِّ',
              turkish: 'damme; أُمِّ’ye muzâf',
            },
          },
          { ar: 'فَارِغًا' },
          'fatḥa',
        ],
        [{ ar: 'أَضْحَى' }, { ar: 'الطَّالِبُ', footnote: 'ḍamma' }, { ar: 'مُجْتَهِدًا' }, 'fatḥa'],
        [
          { ar: 'ظَلَّ' },
          {
            ar: 'وَجْهُهُ',
            footnote: {
              english: 'ḍamma; هُ is muḍāf ilayhi',
              turkish: 'damme; هُ muzâf ileyhtir',
            },
          },
          { ar: 'مُسْوَدًّا' },
          'fatḥa',
        ],
        [{ ar: 'بَاتَ' }, { ar: 'الْحَارِسُ', footnote: 'ḍamma' }, { ar: 'سَاهِرًا' }, 'fatḥa'],
        [{ ar: 'صَارَ' }, { ar: 'الطِّينُ', footnote: 'ḍamma' }, { ar: 'خَزَفًا' }, 'fatḥa'],
        [
          { ar: 'لَيْسَ' },
          { ar: 'الذَّكَرُ', footnote: 'ḍamma' },
          { ar: 'كَالْأُنْثَى', footnote: 'shibh al-jumla' },
          {
            english: 'in maḥall naṣb (no visible ending)',
            turkish: 'mahallen mansûb (görünür alâmet yok)',
          },
        ],
        [
          { ar: 'مَا زَالَ' },
          {
            ar: 'ـُونَ',
            footnote: {
              english: 'wāw al-jamāʿa, in maḥall rafʿ',
              turkish: 'cemaat vâvı, mahallen merfû',
            },
          },
          { ar: 'مُخْتَلِفِينَ' },
          {
            english: 'yāʾ (sound masculine plural)',
            turkish: 'yâ (kurallı eril çoğul)',
          },
        ],
        [{ ar: 'مَا انْفَكَّ' }, { ar: 'زَيْدٌ', footnote: 'ḍamma' }, { ar: 'صَائِمًا' }, 'fatḥa'],
        [
          { ar: 'مَا فَتِئَ' },
          { ar: 'الْمُؤْمِنُ', footnote: 'ḍamma' },
          {
            ar: 'ذَاكِرًا',
            footnote: {
              english: 'رَبَّهُ is its mafʿūl',
              turkish: 'رَبَّهُ onun mef’ûlüdür',
            },
          },
          'fatḥa',
        ],
        [
          { ar: 'مَا بَرِحَ' },
          {
            ar: 'ـنَا',
            footnote: {
              english: 'the نَ of نَبْرَحُ, in maḥall rafʿ',
              turkish: 'نَبْرَحُ’nun نَ’si, mahallen merfû',
            },
          },
          { ar: 'عَاكِفِينَ' },
          {
            english: 'yāʾ (sound masculine plural)',
            turkish: 'yâ (kurallı eril çoğul)',
          },
        ],
        [
          { ar: 'مَا دَامَ' },
          {
            ar: 'ـتُ',
            footnote: {
              english: 'tāʾ al-fāʿil, in maḥall rafʿ',
              turkish: 'fâil tâsı, mahallen merfû',
            },
          },
          { ar: 'حَيًّا' },
          'fatḥa',
        ],
      ],
    },
    {
      kind: 'prose',
      title: {
        english: 'Worked example: before and after kāna',
        turkish: 'Çözümlü örnek: kâne’den önce ve sonra',
      },
      paragraphs: [
        {
          english:
            'Start with the plain nominal sentence زَيْدٌ قَائِمٌ, "Zayd is standing". It has two parts, both marfūʿ: the mubtadaʾ زَيْدٌ (ḍamma, shown by tanwīn ḍamm) and the khabar قَائِمٌ (ḍamma).',
          turkish:
            'Düz isim cümlesiyle başla: زَيْدٌ قَائِمٌ, "Zeyd ayaktadır". İki öğesi vardır ve ikisi de merfûdur: mübteda زَيْدٌ (damme, iki damme tenvîniyle) ve haber قَائِمٌ (damme).',
        },
        {
          english:
            'Now let kāna enter: كَانَ زَيْدٌ قَائِمًا, "Zayd was standing". زَيْدٌ keeps its ḍamma but changes name: it is now ism kāna, marfūʿ by kāna. قَائِمٌ changes its ending to قَائِمًا: it is khabar kāna, manṣūb by kāna, and its naṣb sign is fatḥa.',
          turkish:
            'Şimdi kâne gelsin: كَانَ زَيْدٌ قَائِمًا, "Zeyd ayakta idi". زَيْدٌ dammesini korur ama adı değişir: artık kâne’nin ismidir, kâne sebebiyle merfûdur. قَائِمٌ ise sonunu değiştirir ve قَائِمًا olur: kâne’nin haberidir, kâne sebebiyle mansûbdur ve nasb alâmeti fethadır.',
        },
        {
          english:
            'Only the second part moves. This is the mirror image of inna and its sisters, which put the ism into naṣb and raise the khabar.',
          turkish:
            'Yalnız ikinci öğe değişir. Bu, ismi mansûb yapıp haberi merfû yapan inne ve kardeşlerinin tam tersidir.',
        },
        {
          english:
            'The matn gives this very pair of examples: كَانَ زَيْدٌ قَائِمًا and لَيْسَ عَمْرٌو شَاخِصًا, "ʿAmr is not going away".',
          turkish:
            'Metin tam bu örnekleri verir: كَانَ زَيْدٌ قَائِمًا ve لَيْسَ عَمْرٌو شَاخِصًا, "Amr gidici değildir".',
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Before and after, side by side',
        turkish: 'Önce ve sonra, yan yana',
      },
      caption: {
        english:
          'The examples of the matn itself (Ājurrūmiyya, bāb al-ʿawāmil al-dākhila ʿalā al-mubtadaʾ wa-l-khabar).',
        turkish:
          'Metnin kendi örnekleri (Âcurrûmiyye, mübteda ve haberin başına gelen âmiller bâbı).',
      },
      columns: [
        { english: 'Sentence', turkish: 'Cümle' },
        { english: 'First part', turkish: 'Birinci öğe' },
        { english: 'Second part', turkish: 'İkinci öğe' },
        { english: 'What changed', turkish: 'Ne değişti' },
      ],
      rows: [
        [
          {
            ar: 'زَيْدٌ قَائِمٌ',
            footnote: { english: 'Zayd is standing', turkish: 'Zeyd ayaktadır' },
          },
          {
            ar: 'زَيْدٌ',
            footnote: {
              english: 'mubtadaʾ, marfūʿ: ḍamma',
              turkish: 'mübteda, merfû: damme',
            },
          },
          {
            ar: 'قَائِمٌ',
            footnote: {
              english: 'khabar, marfūʿ: ḍamma',
              turkish: 'haber, merfû: damme',
            },
          },
          {
            english: 'plain nominal sentence: both parts marfūʿ',
            turkish: 'düz isim cümlesi: iki öğe de merfû',
          },
        ],
        [
          {
            ar: 'كَانَ زَيْدٌ قَائِمًا',
            footnote: { english: 'Zayd was standing', turkish: 'Zeyd ayakta idi' },
          },
          {
            ar: 'زَيْدٌ',
            footnote: {
              english: 'ism kāna, marfūʿ: ḍamma',
              turkish: 'kâne’nin ismi, merfû: damme',
            },
          },
          {
            ar: 'قَائِمًا',
            footnote: {
              english: 'khabar kāna, manṣūb: fatḥa',
              turkish: 'kâne’nin haberi, mansûb: fetha',
            },
          },
          {
            english: 'kāna raises the ism, puts the khabar into naṣb',
            turkish: 'kâne ismi merfû, haberi mansûb yapar',
          },
        ],
        [
          {
            ar: 'لَيْسَ عَمْرٌو شَاخِصًا',
            footnote: {
              english: 'ʿAmr is not going away',
              turkish: 'Amr gidici değildir',
            },
          },
          {
            ar: 'عَمْرٌو',
            footnote: {
              english: 'ism laysa, marfūʿ: ḍamma',
              turkish: 'leyse’nin ismi, merfû: damme',
            },
          },
          {
            ar: 'شَاخِصًا',
            footnote: {
              english: 'khabar laysa, manṣūb: fatḥa',
              turkish: 'leyse’nin haberi, mansûb: fetha',
            },
          },
          {
            english: 'laysa works the same way, with negation',
            turkish: 'leyse aynı şekilde amel eder, olumsuzlukla',
          },
        ],
      ],
    },
    {
      kind: 'prose',
      title: {
        english: 'Conjugated forms (wa-mā taṣarrafa minhā)',
        turkish: 'Çekimli şekiller (ve mâ tasarrafe minhâ)',
      },
      paragraphs: [
        {
          english:
            'The matn adds "and whatever is conjugated from them": kāna, yakūnu, kun; aṣbaḥa, yuṣbiḥu, aṣbiḥ. Every form of these verbs governs the same way, in the past, the present, and the command. Only laysa has no conjugation: it is jāmid (frozen).',
          turkish:
            'Metin "ve bunlardan çekimlenenler" der: kâne, yekûnü, kün; asbaha, yusbihu, asbih. Bu fiillerin her çekimi aynı şekilde amel eder: geçmişte, şimdide ve emirde. Yalnız leyse çekimlenmez; câmiddir (donuk).',
        },
        {
          english:
            'Present (majzūm by lam): وَلَمْ أَكُنْ بِدُعَائِكَ رَبِّ شَقِيًّا, "and I have never been, in my supplication to You, my Lord, unblessed" (Qur’an 19:4). The ism is the hidden pronoun anā, in maḥall rafʿ; the khabar شَقِيًّا is manṣūb by fatḥa.',
          turkish:
            'Muzâri (lem ile meczûm): وَلَمْ أَكُنْ بِدُعَائِكَ رَبِّ شَقِيًّا, "Sana ettiğim duada, Rabbim, hiç bedbaht olmadım" (Kur’an 19:4). İsim, mahallen merfû gizli "ene" zamiridir; haber شَقِيًّا fetha ile mansûbdur.',
        },
        {
          english:
            'Command: كُونُوا عِبَادًا لِي, "be servants of mine" (Qur’an 3:79). The ism is wāw al-jamāʿa, in maḥall rafʿ; the khabar عِبَادًا is manṣūb by fatḥa.',
          turkish:
            'Emir: كُونُوا عِبَادًا لِي, "bana kul olun" (Kur’an 3:79). İsim, mahallen merfû cemaat vâvıdır; haber عِبَادًا fetha ile mansûbdur.',
        },
        {
          english:
            'Note on the mā-group: the matn lists them with the negating mā (mā zāla, mā bariḥa …), because these four only govern this way when they are negated. The Quranic examples above negate them with lā and lan on a conjugated form (لَا يَزَالُونَ, لَنْ نَبْرَحَ); the governance is the same. مَا دَامَ is different: its mā is maṣdariyya zamāniyya, "for as long as", not a negation.',
          turkish:
            'Mâ grubu hakkında not: metin bunları olumsuzluk mâsı ile sayar (mâ zâle, mâ beriha …); çünkü bu dört fiil ancak olumsuz olduklarında böyle amel eder. Yukarıdaki Kur’an örnekleri onları çekimli hâlde lâ ve len ile olumsuz yapar (لَا يَزَالُونَ, لَنْ نَبْرَحَ); amel aynıdır. مَا دَامَ farklıdır: onun mâsı olumsuzluk değil, "... olduğu sürece" anlamı veren masdariyye zamâniyyedir.',
        },
      ],
    },
  ],
}
