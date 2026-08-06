import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, bāb al-afʿāl: the three tenses of the verb and their iʿrāb.
// DRAFT: verify against your textbook before relying on it. Every Arabic form,
// English gloss, Turkish gloss, and citation below needs Omer's check.
//
// MODEL VERB (decision for Omer). This entry conjugates فَعَلَ / يَفْعَلُ / اِفْعَلْ,
// the sound triliteral of the fataḥa-yaftaḥu pattern (a-a). Reasons:
//   1. It is the mīzān ṣarfī itself, so every cell doubles as the pattern the
//      learner maps other verbs onto.
//   2. Nothing in this repo's content yet names a model verb, so no course
//      choice was available to follow.
//   3. Real Quranic examples exist for the model verb in all three tenses and
//      in naṣb and jazm (see the examples table), so no invented Arabic is
//      needed to illustrate it.
// The Ājurrūmiyya's own example verb is ضَرَبَ / يَضْرِبُ / اِضْرِبْ (a-i pattern).
// If Omer's course drills ضَرَبَ or نَصَرَ instead, swap the forms here: the
// row labels, the prose, and the table shapes all stay as they are.
//
// Sourcing: the three conjugation tables hold bare forms, which need no
// citation. The examples table is Quran only, cited surah:ayah. RefTable has no
// Example field, so each citation rides in the cell `note` beside its Arabic.
// If Omer wants citations as first-class data, extend RefTable in its own commit.

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
        'EN: The model verb in every table below is faʿala ("he did"), the sound triliteral pattern itself. Read each cell as a pattern: put the three letters of any other sound triliteral verb of the same vowel type in place of the three pattern letters.',
        'TR: Aşağıdaki bütün tablolarda kullanılan örnek fiil, sahih üçlü kalıbın kendisi olan faale ("yaptı") fiilidir. Her hücreyi bir kalıp olarak okuyun: kalıbın üç harfinin yerine, aynı harekeli başka bir sahih üçlü fiilin üç harfini koyun.',
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
          { ar: 'فَعَلَ' },
          'always fatḥa-ended (mabnī)',
          'past: "he did"',
          'geçmiş zaman: "yaptı"',
        ],
        [
          'Muḍāriʿ',
          { ar: 'اَلْمُضَارِعُ' },
          { ar: 'يَفْعَلُ' },
          'marfūʿ unless a nāṣib or jāzim enters',
          'present or future: "he does, he will do"',
          'geniş/şimdiki/gelecek zaman: "yapar, yapıyor"',
        ],
        [
          'Amr',
          { ar: 'اَلْأَمْرُ' },
          { ar: 'اِفْعَلْ' },
          'always majzūm',
          'command: "do!"',
          'emir: "yap!"',
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
        ['3rd m. sg.', '3. tekil eril', { ar: 'هُوَ' }, { ar: 'فَعَلَ' }],
        ['3rd m. dual', '3. ikil eril', { ar: 'هُمَا' }, { ar: 'فَعَلَا' }],
        ['3rd m. pl.', '3. çoğul eril', { ar: 'هُمْ' }, { ar: 'فَعَلُوا' }],
        ['3rd f. sg.', '3. tekil dişil', { ar: 'هِيَ' }, { ar: 'فَعَلَتْ' }],
        ['3rd f. dual', '3. ikil dişil', { ar: 'هُمَا' }, { ar: 'فَعَلَتَا' }],
        ['3rd f. pl.', '3. çoğul dişil', { ar: 'هُنَّ' }, { ar: 'فَعَلْنَ' }],
        ['2nd m. sg.', '2. tekil eril', { ar: 'أَنْتَ' }, { ar: 'فَعَلْتَ' }],
        ['2nd m. dual', '2. ikil eril', { ar: 'أَنْتُمَا' }, { ar: 'فَعَلْتُمَا' }],
        ['2nd m. pl.', '2. çoğul eril', { ar: 'أَنْتُمْ' }, { ar: 'فَعَلْتُمْ' }],
        ['2nd f. sg.', '2. tekil dişil', { ar: 'أَنْتِ' }, { ar: 'فَعَلْتِ' }],
        ['2nd f. dual', '2. ikil dişil', { ar: 'أَنْتُمَا' }, { ar: 'فَعَلْتُمَا' }],
        ['2nd f. pl.', '2. çoğul dişil', { ar: 'أَنْتُنَّ' }, { ar: 'فَعَلْتُنَّ' }],
        ['1st sg.', '1. tekil', { ar: 'أَنَا' }, { ar: 'فَعَلْتُ' }],
        ['1st pl.', '1. çoğul', { ar: 'نَحْنُ' }, { ar: 'فَعَلْنَا' }],
      ],
    },
    {
      kind: 'table',
      title: 'Al-muḍāriʿ · اَلْمُضَارِعُ',
      caption:
        'EN: All 14 forms of the present tense in rafʿ, the state it carries by default. Five of these rows are the "five verbs"; see the section below. / TR: Şimdiki/geniş zamanın, aslî durumu olan ref hâlindeki 14 çekimi. Bu satırlardan beşi "beş fiil"dir; aşağıdaki bölüme bakın.',
      columns: ['Person', 'Kişi', 'Pronoun', 'Form'],
      rows: [
        ['3rd m. sg.', '3. tekil eril', { ar: 'هُوَ' }, { ar: 'يَفْعَلُ' }],
        ['3rd m. dual', '3. ikil eril', { ar: 'هُمَا' }, { ar: 'يَفْعَلَانِ' }],
        ['3rd m. pl.', '3. çoğul eril', { ar: 'هُمْ' }, { ar: 'يَفْعَلُونَ' }],
        ['3rd f. sg.', '3. tekil dişil', { ar: 'هِيَ' }, { ar: 'تَفْعَلُ' }],
        ['3rd f. dual', '3. ikil dişil', { ar: 'هُمَا' }, { ar: 'تَفْعَلَانِ' }],
        ['3rd f. pl.', '3. çoğul dişil', { ar: 'هُنَّ' }, { ar: 'يَفْعَلْنَ' }],
        ['2nd m. sg.', '2. tekil eril', { ar: 'أَنْتَ' }, { ar: 'تَفْعَلُ' }],
        ['2nd m. dual', '2. ikil eril', { ar: 'أَنْتُمَا' }, { ar: 'تَفْعَلَانِ' }],
        ['2nd m. pl.', '2. çoğul eril', { ar: 'أَنْتُمْ' }, { ar: 'تَفْعَلُونَ' }],
        ['2nd f. sg.', '2. tekil dişil', { ar: 'أَنْتِ' }, { ar: 'تَفْعَلِينَ' }],
        ['2nd f. dual', '2. ikil dişil', { ar: 'أَنْتُمَا' }, { ar: 'تَفْعَلَانِ' }],
        ['2nd f. pl.', '2. çoğul dişil', { ar: 'أَنْتُنَّ' }, { ar: 'تَفْعَلْنَ' }],
        ['1st sg.', '1. tekil', { ar: 'أَنَا' }, { ar: 'أَفْعَلُ' }],
        ['1st pl.', '1. çoğul', { ar: 'نَحْنُ' }, { ar: 'نَفْعَلُ' }],
      ],
    },
    {
      kind: 'table',
      title: 'Al-amr · اَلْأَمْرُ',
      caption:
        'EN: The command form exists for the addressee only, so 6 of the 14 forms. The other 8 persons express a command with lām al-amr, a jazm particle placed on the muḍāriʿ, which the jazm-particles entry (jawazim-al-fil) covers. / TR: Emir kipi yalnız muhatap için vardır, yani 14 çekimin 6\'sı. Diğer 8 şahısta emir, muzâri fiilin başına gelen cezm edatı lâm-ı emir ile kurulur; bu, cezm edatları girişinde (jawazim-al-fil) ele alınır.',
      columns: ['Person', 'Kişi', 'Pronoun', 'Form'],
      rows: [
        ['2nd m. sg.', '2. tekil eril', { ar: 'أَنْتَ' }, { ar: 'اِفْعَلْ' }],
        ['2nd m. dual', '2. ikil eril', { ar: 'أَنْتُمَا' }, { ar: 'اِفْعَلَا' }],
        ['2nd m. pl.', '2. çoğul eril', { ar: 'أَنْتُمْ' }, { ar: 'اِفْعَلُوا' }],
        ['2nd f. sg.', '2. tekil dişil', { ar: 'أَنْتِ' }, { ar: 'اِفْعَلِي' }],
        ['2nd f. dual', '2. ikil dişil', { ar: 'أَنْتُمَا' }, { ar: 'اِفْعَلَا' }],
        ['2nd f. pl.', '2. çoğul dişil', { ar: 'أَنْتُنَّ' }, { ar: 'اِفْعَلْنَ' }],
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
          { ar: 'أَفْعَلُ' },
        ],
        [
          { ar: 'اَلنُّونُ' },
          { ar: 'نَ' },
          'we (1st pl.)',
          'biz (1. çoğul)',
          { ar: 'نَفْعَلُ' },
        ],
        [
          { ar: 'اَلْيَاءُ' },
          { ar: 'يَ' },
          'he, they (3rd, not f. dual)',
          'o, onlar (3. şahıs, dişil ikil hariç)',
          { ar: 'يَفْعَلُ' },
        ],
        [
          { ar: 'اَلتَّاءُ' },
          { ar: 'تَ' },
          'you (all), she, they two (f.)',
          'sen/siz (hepsi), o (dişil), o ikisi (dişil)',
          { ar: 'تَفْعَلُ' },
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
          { ar: 'يَفْعَلَانِ', note: 'nūn stays' },
          { ar: 'يَفْعَلَا', note: 'nūn drops' },
          { ar: 'يَفْعَلَا', note: 'nūn drops' },
        ],
        [
          '2nd dual, 3rd f. dual',
          '2. ikil, 3. dişil ikil',
          { ar: 'تَفْعَلَانِ', note: 'nūn stays' },
          { ar: 'تَفْعَلَا', note: 'nūn drops' },
          { ar: 'تَفْعَلَا', note: 'nūn drops' },
        ],
        [
          '3rd m. pl.',
          '3. çoğul eril',
          { ar: 'يَفْعَلُونَ', note: 'nūn stays' },
          { ar: 'يَفْعَلُوا', note: 'nūn drops' },
          { ar: 'يَفْعَلُوا', note: 'nūn drops' },
        ],
        [
          '2nd m. pl.',
          '2. çoğul eril',
          { ar: 'تَفْعَلُونَ', note: 'nūn stays' },
          { ar: 'تَفْعَلُوا', note: 'nūn drops' },
          { ar: 'تَفْعَلُوا', note: 'nūn drops' },
        ],
        [
          '2nd f. sg.',
          '2. tekil dişil',
          { ar: 'تَفْعَلِينَ', note: 'nūn stays' },
          { ar: 'تَفْعَلِي', note: 'nūn drops' },
          { ar: 'تَفْعَلِي', note: 'nūn drops' },
        ],
      ],
    },
    {
      kind: 'table',
      title: 'The model verb in the Qur\'an',
      caption:
        'EN: The model verb in real Quranic context, one row per tense and state. Citations are surah:ayah. / TR: Örnek fiilin Kur\'an\'daki gerçek kullanımı; her zaman ve durum için bir satır. Atıflar sûre:âyet biçimindedir.',
      columns: ['Form', 'Example', 'Meaning'],
      rows: [
        [
          { ar: 'فَعَلَ', note: 'māḍī, 3rd m. sg.' },
          {
            ar: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ',
            note: "Qur'an 105:1",
          },
          'EN: Have you not seen how your Lord dealt with the people of the elephant? / TR: Rabbinin, fil sahiplerine ne yaptığını görmedin mi?',
        ],
        [
          { ar: 'يَفْعَلُ', note: 'muḍāriʿ, marfūʿ' },
          { ar: 'كَذَلِكَ اللَّهُ يَفْعَلُ مَا يَشَاءُ', note: "Qur'an 3:40" },
          'EN: So it is: Allah does what He wills. / TR: İşte böyle; Allah dilediğini yapar.',
        ],
        [
          { ar: 'تَفْعَلُوا', note: 'five verbs, jazm then naṣb' },
          {
            ar: 'فَإِنْ لَمْ تَفْعَلُوا وَلَنْ تَفْعَلُوا فَاتَّقُوا النَّارَ',
            note: "Qur'an 2:24",
          },
          'EN: If you do not do it, and you never will, then guard yourselves against the Fire. / TR: Bunu yapamazsanız, ki asla yapamayacaksınız, o ateşten sakının.',
        ],
        [
          { ar: 'اِفْعَلُوا', note: 'amr, 2nd m. pl.' },
          { ar: 'وَافْعَلُوا الْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ', note: "Qur'an 22:77" },
          'EN: And do good, so that you may succeed. / TR: Hayır işleyin ki kurtuluşa erersiniz.',
        ],
        [
          { ar: 'يُؤْمِنُونَ', note: 'five verbs, rafʿ' },
          { ar: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ', note: "Qur'an 2:3" },
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
