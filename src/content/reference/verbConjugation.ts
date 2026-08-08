import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, bāb al-afʿāl: the three tenses of the verb and their iʿrāb.
// DRAFT: verify against your textbook before relying on it. Every Arabic form,
// meaning (English and Turkish), and citation below needs Omer's check.
//
// MODEL VERB: ضَرَبَ / يَضْرِبُ / اِضْرِبْ (a-i pattern), the Ājurrūmiyya's own
// example verb. Decided by Omer 2026-08-06; he studies the matn itself.
// The muḍāriʿ middle vowel varies by verb (yaḍribu, yaftaḥu, yanṣuru), which
// the overview prose points out.
//
// Sourcing: the three conjugation tables hold bare forms, which need no
// citation. The examples table is Quran only, cited surah:ayah in the cell's
// `source` field, which the citation checker in scripts/ reads.

export const verbConjugation: ReferenceEntry = {
  id: 'verb-conjugation',
  title: 'Verb Conjugation Tables',
  titleArabic: 'تَصْرِيفُ الْأَفْعَالِ',
  order: 9,
  summary: 'Māḍī, muḍāriʿ, and amr tables for the sound triliteral verb.',
  sections: [
    {
      kind: 'prose',
      title: 'Overview',
      arabic:
        'اَلْأَفْعَالُ ثَلَاثَةٌ: مَاضٍ، وَمُضَارِعٌ، وَأَمْرٌ، نَحْوُ ضَرَبَ وَيَضْرِبُ وَاضْرِبْ. فَالْمَاضِي مَفْتُوحُ الْآخِرِ أَبَدًا، وَالْأَمْرُ مَجْزُومٌ أَبَدًا، وَالْمُضَارِعُ مَا كَانَ فِي أَوَّلِهِ إِحْدَى الزَّوَائِدِ الْأَرْبَعِ الَّتِي يَجْمَعُهَا قَوْلُكَ أَنَيْتُ، وَهُوَ مَرْفُوعٌ أَبَدًا حَتَّى يَدْخُلَ عَلَيْهِ نَاصِبٌ أَوْ جَازِمٌ',
      paragraphs: [
        'EN: The verb has three tenses: māḍī (past), muḍāriʿ (present), and amr (command). The māḍī always ends in fatḥa. The amr is always majzūm. The muḍāriʿ starts with one of the four prefix letters collected in the mnemonic word anaytu, and it stays marfūʿ until a naṣb particle or a jazm particle enters upon it.',
        'TR: Fiil üç kısımdır: mâzî (geçmiş), muzâri (şimdiki/geniş) ve emir. Mâzînin sonu daima fetha alır. Emir daima meczûmdur. Muzâri, eneytü hatırlatma kelimesinde toplanan dört harften biriyle başlar ve başına bir nasb veya cezm edatı gelmedikçe daima merfûdur.',
        'EN: The model verb in every table below is ḍaraba ("he struck"), the same verb the Ājurrūmiyya itself uses. Read each cell as a pattern: keep the prefix and the ending, and put the three letters of another sound triliteral verb in place of the root letters. One caution: the middle vowel of the muḍāriʿ is not fixed by the pattern; each verb brings its own (yaḍribu, yaftaḥu, yanṣuru).',
        'TR: Aşağıdaki bütün tablolarda kullanılan örnek fiil, Âcurrûmiyye\'nin kendi kullandığı darabe ("vurdu") fiilidir. Her hücreyi bir kalıp olarak okuyun: ön eki ve son eki koruyun, kök harflerinin yerine başka bir sahih üçlü fiilin üç harfini koyun. Bir uyarı: muzârinin orta harekesi kalıba bağlı değildir; her fiil kendi harekesini getirir (yadribu, yeftehu, yensuru).',
      ],
    },
    {
      kind: 'table',
      title: 'The three tenses',
      caption:
        'EN: The three tenses, the model form of each, and the iʿrāb the Ājurrūmiyya assigns it. / TR: Üç zaman, her birinin örnek kalıbı ve Âcurrûmiyye\'nin verdiği iʿrâb durumu.',
      columns: ['Tense', 'Arabic', 'Model form', 'Iʿrāb', 'English', 'Türkçe'],
      rows: [
        [
          'Māḍī',
          { ar: 'اَلْمَاضِي' },
          { ar: 'ضَرَبَ' },
          'always fatḥa-ended (mabnī)',
          'past: "he struck"',
          'geçmiş zaman: "vurdu"',
        ],
        [
          'Muḍāriʿ',
          { ar: 'اَلْمُضَارِعُ' },
          { ar: 'يَضْرِبُ' },
          'marfūʿ unless a nāṣib or jāzim enters',
          'present or future: "he strikes, he will strike"',
          'geniş/şimdiki/gelecek zaman: "vurur, vuruyor"',
        ],
        [
          'Amr',
          { ar: 'اَلْأَمْرُ' },
          { ar: 'اِضْرِبْ' },
          'always majzūm',
          'command: "strike!"',
          'emir: "vur!"',
        ],
      ],
    },
    {
      kind: 'table',
      title: 'Al-māḍī · اَلْمَاضِي',
      caption:
        'EN: All 14 person/gender/number forms of the past tense. The second-person dual is one form for both genders, which is why it appears twice. / TR: Geçmiş zamanın 14 şahıs/cinsiyet/sayı çekimi. İkinci şahıs ikil, her iki cinsiyet için tek şekildir; bu yüzden iki kez geçer.',
      columns: ['Person', 'Kişi', 'Pronoun', 'Form'],
      rows: [
        ['3rd m. sg.', '3. tekil eril', { ar: 'هُوَ' }, { ar: 'ضَرَبَ' }],
        ['3rd m. dual', '3. ikil eril', { ar: 'هُمَا' }, { ar: 'ضَرَبَا' }],
        ['3rd m. pl.', '3. çoğul eril', { ar: 'هُمْ' }, { ar: 'ضَرَبُوا' }],
        ['3rd f. sg.', '3. tekil dişil', { ar: 'هِيَ' }, { ar: 'ضَرَبَتْ' }],
        ['3rd f. dual', '3. ikil dişil', { ar: 'هُمَا' }, { ar: 'ضَرَبَتَا' }],
        ['3rd f. pl.', '3. çoğul dişil', { ar: 'هُنَّ' }, { ar: 'ضَرَبْنَ' }],
        ['2nd m. sg.', '2. tekil eril', { ar: 'أَنْتَ' }, { ar: 'ضَرَبْتَ' }],
        ['2nd m. dual', '2. ikil eril', { ar: 'أَنْتُمَا' }, { ar: 'ضَرَبْتُمَا' }],
        ['2nd m. pl.', '2. çoğul eril', { ar: 'أَنْتُمْ' }, { ar: 'ضَرَبْتُمْ' }],
        ['2nd f. sg.', '2. tekil dişil', { ar: 'أَنْتِ' }, { ar: 'ضَرَبْتِ' }],
        ['2nd f. dual', '2. ikil dişil', { ar: 'أَنْتُمَا' }, { ar: 'ضَرَبْتُمَا' }],
        ['2nd f. pl.', '2. çoğul dişil', { ar: 'أَنْتُنَّ' }, { ar: 'ضَرَبْتُنَّ' }],
        ['1st sg.', '1. tekil', { ar: 'أَنَا' }, { ar: 'ضَرَبْتُ' }],
        ['1st pl.', '1. çoğul', { ar: 'نَحْنُ' }, { ar: 'ضَرَبْنَا' }],
      ],
    },
    {
      kind: 'table',
      title: 'Al-muḍāriʿ · اَلْمُضَارِعُ',
      caption:
        'EN: All 14 forms of the present tense in rafʿ, the state it carries by default. Five of these rows are the "five verbs"; see the section below. / TR: Şimdiki/geniş zamanın, aslî durumu olan ref hâlindeki 14 çekimi. Bu satırlardan beşi "beş fiil"dir; aşağıdaki bölüme bakın.',
      columns: ['Person', 'Kişi', 'Pronoun', 'Form'],
      rows: [
        ['3rd m. sg.', '3. tekil eril', { ar: 'هُوَ' }, { ar: 'يَضْرِبُ' }],
        ['3rd m. dual', '3. ikil eril', { ar: 'هُمَا' }, { ar: 'يَضْرِبَانِ' }],
        ['3rd m. pl.', '3. çoğul eril', { ar: 'هُمْ' }, { ar: 'يَضْرِبُونَ' }],
        ['3rd f. sg.', '3. tekil dişil', { ar: 'هِيَ' }, { ar: 'تَضْرِبُ' }],
        ['3rd f. dual', '3. ikil dişil', { ar: 'هُمَا' }, { ar: 'تَضْرِبَانِ' }],
        ['3rd f. pl.', '3. çoğul dişil', { ar: 'هُنَّ' }, { ar: 'يَضْرِبْنَ' }],
        ['2nd m. sg.', '2. tekil eril', { ar: 'أَنْتَ' }, { ar: 'تَضْرِبُ' }],
        ['2nd m. dual', '2. ikil eril', { ar: 'أَنْتُمَا' }, { ar: 'تَضْرِبَانِ' }],
        ['2nd m. pl.', '2. çoğul eril', { ar: 'أَنْتُمْ' }, { ar: 'تَضْرِبُونَ' }],
        ['2nd f. sg.', '2. tekil dişil', { ar: 'أَنْتِ' }, { ar: 'تَضْرِبِينَ' }],
        ['2nd f. dual', '2. ikil dişil', { ar: 'أَنْتُمَا' }, { ar: 'تَضْرِبَانِ' }],
        ['2nd f. pl.', '2. çoğul dişil', { ar: 'أَنْتُنَّ' }, { ar: 'تَضْرِبْنَ' }],
        ['1st sg.', '1. tekil', { ar: 'أَنَا' }, { ar: 'أَضْرِبُ' }],
        ['1st pl.', '1. çoğul', { ar: 'نَحْنُ' }, { ar: 'نَضْرِبُ' }],
      ],
    },
    {
      kind: 'table',
      title: 'Al-amr · اَلْأَمْرُ',
      caption:
        'EN: The command form exists for the addressee only, so 6 of the 14 forms. The other 8 persons express a command with lām al-amr, a jazm particle placed on the muḍāriʿ, which the jazm-particles entry (jawazim-al-fil) covers. / TR: Emir kipi yalnız muhatap için vardır, yani 14 çekimin 6\'sı. Diğer 8 şahısta emir, muzâri fiilin başına gelen cezm edatı lâm-ı emir ile kurulur; bu, cezm edatları girişinde (jawazim-al-fil) ele alınır.',
      columns: ['Person', 'Kişi', 'Pronoun', 'Form'],
      rows: [
        ['2nd m. sg.', '2. tekil eril', { ar: 'أَنْتَ' }, { ar: 'اِضْرِبْ' }],
        ['2nd m. dual', '2. ikil eril', { ar: 'أَنْتُمَا' }, { ar: 'اِضْرِبَا' }],
        ['2nd m. pl.', '2. çoğul eril', { ar: 'أَنْتُمْ' }, { ar: 'اِضْرِبُوا' }],
        ['2nd f. sg.', '2. tekil dişil', { ar: 'أَنْتِ' }, { ar: 'اِضْرِبِي' }],
        ['2nd f. dual', '2. ikil dişil', { ar: 'أَنْتُمَا' }, { ar: 'اِضْرِبَا' }],
        ['2nd f. pl.', '2. çoğul dişil', { ar: 'أَنْتُنَّ' }, { ar: 'اِضْرِبْنَ' }],
      ],
    },
    {
      kind: 'prose',
      title: 'The prefix letters of the muḍāriʿ',
      arabic: 'أَنَيْتُ',
      paragraphs: [
        'EN: A verb is muḍāriʿ because of the letter added at its front. There are four such letters, and the mnemonic word shown above ("anaytu") collects them: hamza, nūn, yāʾ, tāʾ. Strip the prefix and the māḍī stem is left, so the prefix alone tells you the person before you reach the ending.',
        'TR: Bir fiil, başına eklenen harf sebebiyle muzâri olur. Bu harfler dörttür ve yukarıda görülen hatırlatma kelimesi ("eneytü") onları toplar: hemze, nûn, yâ, tâ. Ön eki kaldırdığınızda mâzî kökü kalır; bu yüzden sona varmadan, yalnız ön ekten şahsı anlayabilirsiniz.',
        'EN: The tāʾ is the busy one: it serves "she", "you" (all six addressee forms), and the third feminine dual. When the prefix is tāʾ, the ending decides which of those is meant.',
        'TR: En çok iş gören harf tâ\'dır: "o (dişil)", "sen/siz" (altı muhatap çekiminin tamamı) ve üçüncü şahıs dişil ikil için kullanılır. Ön ek tâ ise, hangisinin kastedildiğini son ek belirler.',
      ],
    },
    {
      kind: 'table',
      title: 'Prefix letter to person',
      columns: ['Letter', 'Prefix', 'Person', 'Kişi', 'Form'],
      rows: [
        [
          { ar: 'اَلْهَمْزَةُ' },
          { ar: 'أَ' },
          'I (1st sg.)',
          'ben (1. tekil)',
          { ar: 'أَضْرِبُ' },
        ],
        [
          { ar: 'اَلنُّونُ' },
          { ar: 'نَ' },
          'we (1st pl.)',
          'biz (1. çoğul)',
          { ar: 'نَضْرِبُ' },
        ],
        [
          { ar: 'اَلْيَاءُ' },
          { ar: 'يَ' },
          'he, they (3rd, not f. dual)',
          'o, onlar (3. şahıs, dişil ikil hariç)',
          { ar: 'يَضْرِبُ' },
        ],
        [
          { ar: 'اَلتَّاءُ' },
          { ar: 'تَ' },
          'you (all), she, they two (f.)',
          'sen/siz (hepsi), o (dişil), o ikisi (dişil)',
          { ar: 'تَضْرِبُ' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'Al-afʿāl al-khamsa (the five verbs)',
      arabic: 'اَلْأَفْعَالُ الْخَمْسَةُ',
      paragraphs: [
        'EN: Five of the fourteen muḍāriʿ forms end in a nūn that is an iʿrāb sign rather than part of the stem. They are called the five verbs, and the table below lists all five. Their sign of rafʿ is that the nūn stays; their sign of naṣb and of jazm is that the nūn drops. The iʿrāb-signs entry (irab-signs) gives the same rule in its last row.',
        'TR: Muzârinin on dört çekiminden beşi, kök harfi olmayıp iʿrâb alâmeti olan bir nûn ile biter. Bunlara beş fiil denir ve aşağıdaki tablo beşinin tamamını verir. Ref alâmetleri nûnun sabit kalması, nasb ve cezm alâmetleri ise nûnun düşmesidir. Bu kural, iʿrâb alâmetleri girişinin (irab-signs) son satırında da verilmiştir.',
        'EN: What makes the nūn drop is a governing particle. For naṣb see the reference entry "Naṣb Particles of the Verb" (nawasib-al-fil); for jazm see "Jazm Particles of the Verb" (jawazim-al-fil). The other nine muḍāriʿ forms show naṣb with fatḥa and jazm with sukūn instead.',
        'TR: Nûnu düşüren şey, başa gelen âmil edattır. Nasb için "Fiilin Nasb Edatları" (nawasib-al-fil) girişine, cezm için "Fiilin Cezm Edatları" (jawazim-al-fil) girişine bakın. Diğer dokuz muzâri çekimi ise nasbı fetha ile, cezmi sükûn ile gösterir.',
        'EN: Careful: the two feminine plural forms in the muḍāriʿ table (third feminine plural and second feminine plural) also end in nūn, but they are not among the five verbs. Their nūn is nūn al-niswa, an attached pronoun, not a sign. Both forms are mabnī, so no naṣb or jazm particle changes their ending.',
        'TR: Dikkat: muzâri tablosundaki iki dişil çoğul çekim (3. çoğul dişil ve 2. çoğul dişil) de nûn ile biter, fakat beş fiilden değildir. Onların nûnu, alâmet değil, muttasıl zamir olan nûnu\'n-nisvedir. Bu iki çekim de mebnîdir; bu yüzden hiçbir nasb veya cezm edatı sonlarını değiştirmez.',
      ],
    },
    {
      kind: 'table',
      title: 'The five verbs in all three states',
      caption:
        'EN: The tāʾ-prefixed dual form covers two persons (2nd dual and 3rd f. dual), which is why fourteen forms yield only five patterns. / TR: Tâ ön ekli ikil çekim, iki şahsı birden karşılar (2. ikil ve 3. dişil ikil); on dört çekimin yalnız beş kalıp vermesinin sebebi budur.',
      columns: ['Person', 'Kişi', 'Rafʿ', 'Naṣb', 'Jazm'],
      rows: [
        [
          '3rd m. dual',
          '3. ikil eril',
          { ar: 'يَضْرِبَانِ', footnote: 'nūn stays' },
          { ar: 'يَضْرِبَا', footnote: 'nūn drops' },
          { ar: 'يَضْرِبَا', footnote: 'nūn drops' },
        ],
        [
          '2nd dual, 3rd f. dual',
          '2. ikil, 3. dişil ikil',
          { ar: 'تَضْرِبَانِ', footnote: 'nūn stays' },
          { ar: 'تَضْرِبَا', footnote: 'nūn drops' },
          { ar: 'تَضْرِبَا', footnote: 'nūn drops' },
        ],
        [
          '3rd m. pl.',
          '3. çoğul eril',
          { ar: 'يَضْرِبُونَ', footnote: 'nūn stays' },
          { ar: 'يَضْرِبُوا', footnote: 'nūn drops' },
          { ar: 'يَضْرِبُوا', footnote: 'nūn drops' },
        ],
        [
          '2nd m. pl.',
          '2. çoğul eril',
          { ar: 'تَضْرِبُونَ', footnote: 'nūn stays' },
          { ar: 'تَضْرِبُوا', footnote: 'nūn drops' },
          { ar: 'تَضْرِبُوا', footnote: 'nūn drops' },
        ],
        [
          '2nd f. sg.',
          '2. tekil dişil',
          { ar: 'تَضْرِبِينَ', footnote: 'nūn stays' },
          { ar: 'تَضْرِبِي', footnote: 'nūn drops' },
          { ar: 'تَضْرِبِي', footnote: 'nūn drops' },
        ],
      ],
    },
    {
      kind: 'table',
      title: 'The verb in the Qur\'an',
      caption:
        'EN: Real Quranic context, one row per tense and state; the model verb where the Quran supplies it. Citations are surah:ayah. / TR: Kur\'an\'dan gerçek kullanım; her zaman ve durum için bir satır, Kur\'an\'da geçtiği yerde örnek fiil. Atıflar sûre:âyet biçimindedir.',
      columns: ['Form', 'Example', 'Meaning'],
      rows: [
        [
          { ar: 'ضَرَبَ', footnote: 'māḍī, 3rd m. sg.' },
          {
            ar: 'أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً',
            source: "Qur'an 14:24",
          },
          'EN: Have you not seen how Allah sets forth a parable: a good word... / TR: Allah\'ın nasıl bir misal verdiğini görmedin mi: güzel bir söz...',
        ],
        [
          { ar: 'يَضْرِبُ', footnote: 'muḍāriʿ, marfūʿ' },
          { ar: 'وَيَضْرِبُ اللَّهُ الْأَمْثَالَ لِلنَّاسِ', source: "Qur'an 14:25" },
          'EN: And Allah sets forth parables for mankind. / TR: Allah insanlara misaller verir.',
        ],
        [
          { ar: 'تَفْعَلُوا', footnote: 'five verbs, jazm then naṣb' },
          {
            ar: 'فَإِنْ لَمْ تَفْعَلُوا وَلَنْ تَفْعَلُوا فَاتَّقُوا النَّارَ',
            source: "Qur'an 2:24",
          },
          'EN: If you do not do it, and you never will, then guard yourselves against the Fire. / TR: Bunu yapamazsanız, ki asla yapamayacaksınız, o ateşten sakının.',
        ],
        [
          { ar: 'اِضْرِبْ', footnote: 'amr, 2nd m. sg.' },
          { ar: 'فَقُلْنَا اضْرِبْ بِعَصَاكَ الْحَجَرَ', source: "Qur'an 2:60" },
          'EN: We said: strike the rock with your staff. / TR: "Asânla taşa vur" dedik.',
        ],
        [
          { ar: 'يُؤْمِنُونَ', footnote: 'five verbs, rafʿ' },
          { ar: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ', source: "Qur'an 2:3" },
          'EN: Those who believe in the unseen and establish the prayer. / TR: Onlar, gayba inanır ve namazı dosdoğru kılarlar.',
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'How to use these tables',
      paragraphs: [
        'EN: Read down the Person column, not across the tables. The three tenses share one row order, so the same row number gives you the māḍī, muḍāriʿ, and amr of one person. Learn the māḍī endings first: they are suffixes only. The muḍāriʿ then adds a prefix in front of the same stem.',
        'TR: Tabloları yatay değil, Kişi sütunu boyunca aşağı doğru okuyun. Üç zaman aynı satır sırasını paylaşır; bu yüzden aynı satır numarası, bir şahsın mâzî, muzâri ve emir çekimini verir. Önce mâzî sonlarını öğrenin: onlar yalnız son ektir. Muzâri ise aynı kökün başına bir ön ek ekler.',
        'EN: Nothing in the māḍī table changes with iʿrāb, because the māḍī is mabnī. Only the muḍāriʿ declines, and only the amr is fixed in jazm. That division is the whole point of the Ājurrūmiyya passage above.',
        'TR: Mâzî tablosunda iʿrâb ile değişen hiçbir şey yoktur, çünkü mâzî mebnîdir. Yalnız muzâri iʿrâb alır; emir ise daima cezm üzeredir. Yukarıdaki Âcurrûmiyye pasajının bütün maksadı bu ayrımdır.',
      ],
    },
  ],
}
