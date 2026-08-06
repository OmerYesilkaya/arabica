import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, bāb al-afʿāl: the nawāṣib of the muḍāriʿ.
// DRAFT: verify against your textbook before relying on it.
//
// Membership: the matn counts ten nawāṣib, in this order —
//   أَنْ، لَنْ، إِذَنْ، كَيْ، لَامُ كَيْ، لَامُ الْجُحُودِ، حَتَّى،
//   وَالْجَوَابُ بِالْفَاءِ، وَالْوَاوِ، وَأَوْ
// Edition notes for Omer:
//   * Some prints write إِذَنْ as إِذًا (with alif + tanwīn). Same particle.
//   * "الْجَوَابُ بِالْفَاءِ وَالْوَاوِ وَأَوْ" is one clause in the matn; the
//     count of ten only works if fāʾ, wāw, and aw are counted separately, which
//     is how the common commentaries (al-Kafrāwī, al-Ashmūnī) read it. A few
//     prints therefore print the list as nine or eleven items. Membership is
//     unchanged either way, so all ten rows are kept here.
//   * Later grammarians add أَنْ الْمَصْدَرِيَّةَ after حَتَّى / فَاءِ السَّبَبِيَّةِ
//     as the real operator (see the "How they operate" section). The matn does
//     not, so this entry follows the matn.
//
// Sourcing: Quran > Hadith > fusha. Quranic examples carry a surah:ayah
// citation. Three particles have no safe Quranic šāhid governing a manṣūb
// muḍāriʿ (إِذَنْ, wāw al-maʿiyyah, أَوْ); those keep the standard grammarians'
// fusha example and are flagged with a "DRAFT (fusha fallback)" comment.

export const nawasibAlFil: ReferenceEntry = {
  id: 'nawasib-al-fil',
  title: 'Naṣb Particles of the Verb',
  titleArabic: 'نَوَاصِبُ الْفِعْلِ',
  order: 4,
  summary: 'The ten particles that put the present verb into naṣb, with their signs.',
  sections: [
    {
      kind: 'prose',
      title: 'Overview',
      arabic:
        'وَالْمُضَارِعُ مَرْفُوعٌ أَبَدًا حَتَّى يَدْخُلَ عَلَيْهِ نَاصِبٌ أَوْ جَازِمٌ. فَالنَّوَاصِبُ عَشَرَةٌ وَهِيَ: أَنْ، وَلَنْ، وَإِذَنْ، وَكَيْ، وَلَامُ كَيْ، وَلَامُ الْجُحُودِ، وَحَتَّى، وَالْجَوَابُ بِالْفَاءِ، وَالْوَاوِ، وَأَوْ',
      paragraphs: [
        'EN: The muḍāriʿ (present verb) is in rafʿ by default. It stays in rafʿ until a nāṣib or a jāzim enters on it. These ten particles are the nawāṣib: each one puts the verb after it into naṣb.',
        'TR: Muzâri fiil aslen merfûdur. Başına bir nâsib veya bir câzim gelmedikçe merfû kalır. Aşağıdaki on edat nevâsibdir: her biri kendisinden sonra gelen fiili nasb durumuna sokar.',
        'EN: Naṣb shows on the verb in one of two ways: a fatḥa on the ending, or the dropping of the final nūn in the five verbs (al-afʿāl al-khamsa). See the sign sections below.',
        'TR: Nasb, fiilde iki şekilde görünür: sonunda fetha ile veya beş fiilde (el-ef‘âlü’l-hamse) sondaki nûnun düşmesi ile. Aşağıdaki alâmet bölümlerine bakın.',
      ],
    },
    {
      kind: 'table',
      title: 'Quick table',
      caption:
        'EN: Every example is a verb in naṣb after the particle; the citation follows the Arabic. / TR: Her örnek, edattan sonra nasb durumundaki bir fiildir; kaynak Arapça metnin altındadır.',
      columns: ['Ḥarf', 'English', 'Türkçe', 'Verb in naṣb', 'Example meaning'],
      rows: [
        [
          { ar: 'أَنْ' },
          'that, to (makes the verb a verbal noun)',
          '-mesi, -mek (masdar edatı)',
          { ar: 'يُرِيدُ اللَّهُ أَنْ يُخَفِّفَ عَنْكُمْ', note: 'Qur’an 4:28' },
          'Allah wants to lighten [the burden] for you · Allah sizden [yükü] hafifletmek istiyor',
        ],
        [
          { ar: 'لَنْ' },
          'will never (negates the future)',
          'asla ...mayacak (geleceği olumsuzlar)',
          { ar: 'لَنْ نُؤْمِنَ لَكَ', note: 'Qur’an 2:55' },
          'We will never believe you · Sana asla inanmayacağız',
        ],
        [
          { ar: 'إِذَنْ' },
          'then, in that case (answers what was just said)',
          'öyleyse, o hâlde (söylenene cevap verir)',
          // DRAFT (fusha fallback): إِذَنْ does not occur in the Qur’an as an
          // operating nāṣib. The nearest form, وَإِذًا لَا يَلْبَثُونَ (17:76),
          // has the verb in rafʿ because لَا separates the particle from it.
          // This is the standard grammarians' example instead.
          { ar: 'إِذَنْ أُكْرِمَكَ' },
          'Then I will honour you · Öyleyse sana ikram ederim',
        ],
        [
          { ar: 'كَيْ' },
          'in order that, so that',
          'diye, ...mak için',
          { ar: 'كَيْ نُسَبِّحَكَ كَثِيرًا', note: 'Qur’an 20:33' },
          'so that we may glorify You much · Seni çokça tesbih etmemiz için',
        ],
        [
          { ar: 'لَامُ كَيْ (لِـ)' },
          'lām of purpose: in order to',
          'ta‘lîl (amaç) lâmı: ...mak için',
          { ar: 'لِيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِنْ ذَنْبِكَ', note: 'Qur’an 48:2' },
          'so that He may forgive you what came before of your sin · Geçmiş günahını bağışlaması için',
        ],
        [
          { ar: 'لَامُ الْجُحُودِ (لِـ)' },
          'lām of denial: was never going to (after mā kāna / lam yakun)',
          'cuhûd (inkâr) lâmı: asla ...acak değildi (mâ kâne / lem yekün sonrası)',
          { ar: 'وَمَا كَانَ اللَّهُ لِيُعَذِّبَهُمْ وَأَنْتَ فِيهِمْ', note: 'Qur’an 8:33' },
          'Allah was not going to punish them while you are among them · Sen onların içindeyken Allah onlara azap edecek değildi',
        ],
        [
          { ar: 'حَتَّى' },
          'until; so that (of a goal or an end point)',
          '...ıncaya kadar; ...mak için (gaye veya bitiş)',
          { ar: 'حَتَّى يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ', note: 'Qur’an 2:187' },
          'until the white thread becomes clear to you · Beyaz iplik sizin için belirinceye kadar',
        ],
        [
          { ar: 'اَلْجَوَابُ بِالْفَاءِ (فَـ)' },
          'fāʾ of result, after a command, request, or negation: "and so"',
          'cevap fâsı: emir, istek veya olumsuzluktan sonra "böylece, de"',
          { ar: 'لَا يُقْضَى عَلَيْهِمْ فَيَمُوتُوا', note: 'Qur’an 35:36' },
          'It is not decreed for them, so that they would die · Onların işi bitirilmez ki ölsünler',
        ],
        [
          { ar: 'اَلْجَوَابُ بِالْوَاوِ (وَ)' },
          'wāw of accompaniment: "and at the same time"',
          'ma‘iyyet (beraberlik) vavı: "aynı anda, bir yandan da"',
          // DRAFT (fusha fallback): no safe Qur’anic wāw al-maʿiyyah governing a
          // manṣūb muḍāriʿ is at hand; the near misses (2:214, 3:142) have the
          // verb in jazm after لَمَّا. This is the standard textbook example.
          { ar: 'لَا تَأْكُلِ السَّمَكَ وَتَشْرَبَ اللَّبَنَ' },
          'Do not eat fish and drink milk at the same time · Balığı yiyip aynı anda süt içme',
        ],
        [
          { ar: 'أَوْ' },
          'until, unless (meaning ilā an / illā an)',
          '...ıncaya kadar; ...madıkça (ilâ en / illâ en anlamında)',
          // DRAFT (fusha fallback): أَوْ meaning "until / unless" before a
          // manṣūb muḍāriʿ has no Qur’anic šāhid at hand; the Qur’anic أَوْ is
          // the coordinating one, which passes on the state of what precedes
          // it (e.g. أَنْ تَكُونَا ... أَوْ تَكُونَا, 7:20). Grammarians' example.
          { ar: 'لَأَلْزَمَنَّكَ أَوْ تَقْضِيَنِي حَقِّي' },
          'I will stay with you until you pay me my due · Hakkımı bana ödeyinceye kadar peşini bırakmam',
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'How they operate',
      paragraphs: [
        'EN: Only four of the ten put the verb into naṣb by themselves: أَنْ, لَنْ, إِذَنْ, and كَيْ. After the other six the naṣb is worked by a hidden أَنْ (an muqaddara) that the particle brings with it. The matn lists all ten together, so learn them as one set of ten and keep the distinction as a note.',
        'TR: On edattan yalnız dördü fiili kendi başına nasb eder: أَنْ, لَنْ, إِذَنْ ve كَيْ. Diğer altısından sonra nasb, edatın beraberinde getirdiği gizli (mukadder) bir أَنْ ile olur. Metin onu bir liste hâlinde saydığı için onunu birlikte öğrenin, bu ayrımı da not olarak tutun.',
        'EN: The fāʾ and the wāw take naṣb only in an "answer" position: after a command, a prohibition, a request, a question, a wish, or a negation. A fāʾ or wāw that merely joins two clauses is coordinating, and the verb after it keeps the state of the verb before it.',
        'TR: Fâ ve vav yalnız "cevap" konumunda nasb eder: emir, nehiy, istek, soru, temenni veya olumsuzluktan sonra. Sadece iki cümleyi bağlayan fâ veya vav atıf harfidir; ondan sonraki fiil, kendinden önceki fiilin durumunu alır.',
        'EN: إِذَنْ works only when it starts the answer, the verb refers to the future, and nothing separates the two (an oath or لَا does not count as a separator).',
        'TR: إِذَنْ yalnız cevabın başında bulunduğunda, fiil geleceğe delâlet ettiğinde ve araya bir ayırıcı girmediğinde amel eder (yemin veya لَا ayırıcı sayılmaz).',
      ],
    },
    {
      kind: 'table',
      title: 'Signs of naṣb on the verb',
      caption:
        'EN: Same rows as the iʿrāb-signs entry, read for naṣb only. / TR: İ‘râb alâmetleri sayfasındaki satırların aynısı, yalnız nasb için okunmuş hâli.',
      columns: ['Verb type', 'Rafʿ', 'Naṣb sign', 'Example in naṣb'],
      rows: [
        [
          { ar: 'اَلْفِعْلُ الْمُضَارِعُ الصَّحِيحُ', note: 'sound present verb / sahih muzari fiil' },
          { ar: 'ـُ', note: 'ḍamma' },
          { ar: 'ـَ', note: 'fatḥa' },
          { ar: 'أَنْ يُخَفِّفَ', note: 'Qur’an 4:28' },
        ],
        [
          { ar: 'اَلْمُعْتَلُّ الْآخِرِ بِالْوَاوِ أَوِ الْيَاءِ', note: 'ends in wāw or yāʾ / vav veya ya ile biten' },
          { ar: 'ـُ', note: 'implied ḍamma' },
          { ar: 'ـَ', note: 'fatḥa, visible' },
          { ar: 'أَنْ يَأْتِيَ يَوْمٌ', note: 'Qur’an 2:254' },
        ],
        [
          { ar: 'اَلْمُعْتَلُّ الْآخِرِ بِالْأَلِفِ', note: 'ends in alif / elif ile biten' },
          { ar: 'ـُ', note: 'implied ḍamma' },
          { ar: 'ـَ', note: 'fatḥa, not visible' },
          { ar: 'أَنْ يُقْضَى إِلَيْكَ وَحْيُهُ', note: 'Qur’an 20:114' },
        ],
        [
          { ar: 'اَلْأَفْعَالُ الْخَمْسَةُ', note: 'five verb forms / beş fiil' },
          { ar: 'ثُبُوتُ النُّونِ', note: 'nūn stays' },
          { ar: 'حَذْفُ النُّونِ', note: 'nūn drops' },
          { ar: 'أَنْ تَصُومُوا', note: 'Qur’an 2:184' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'Reading the signs',
      paragraphs: [
        'EN: The default sign of naṣb is the fatḥa. It is written on the last letter of the verb: يَذْهَبُ becomes لَنْ يَذْهَبَ. On a verb ending in wāw or yāʾ the fatḥa is light enough to be pronounced, so it appears: يَأْتِي becomes أَنْ يَأْتِيَ. On a verb ending in alif nothing can be written, so the fatḥa is only implied (muqaddara) and the verb looks unchanged: يَخْشَى stays أَنْ يَخْشَى.',
        'TR: Nasbın aslî alâmeti fethadır. Fiilin son harfine yazılır: يَذْهَبُ, لَنْ يَذْهَبَ olur. Sonu vav veya ya olan fiilde fetha telaffuz edilebildiği için görünür: يَأْتِي, أَنْ يَأْتِيَ olur. Sonu elif olan fiilde ise hiçbir şey yazılamaz; fetha yalnız takdir edilir (mukadder) ve fiil değişmemiş görünür: يَخْشَى, أَنْ يَخْشَى olarak kalır.',
        'EN: The five verbs are the muḍāriʿ forms that end in a nūn belonging to the iʿrāb (the dual nūn, the plural nūn, and the nūn of the second-person feminine singular). Their sign of naṣb is not a fatḥa but the dropping of that nūn. The same dropping is also their sign of jazm, so the naṣb form and the jazm form of a five-verb look identical; only the governing particle tells them apart.',
        'TR: Beş fiil, sonu i‘râb nûnu ile biten muzâri kalıplarıdır (ikil nûnu, çoğul nûnu ve müennes muhataba nûnu). Bunların nasb alâmeti fetha değil, o nûnun düşmesidir. Aynı düşme cezm alâmeti de olduğu için beş fiilin nasb hâli ile cezm hâli aynı görünür; ikisini yalnız başına gelen edat ayırır.',
        'EN: The nūn that belongs to the root pattern does not drop, and neither does the nūn of the feminine plural (نُونُ النِّسْوَةِ). تَفْعَلْنَ (you women do) is mabnī, not muʿrab: it never changes for naṣb or jazm.',
        'TR: Kalıba ait olan nûn düşmez; müennes cemi nûnu (nûnü’n-nisve) de düşmez. تَفْعَلْنَ (siz kadınlar yapıyorsunuz) mebnîdir, mu‘reb değildir: nasb veya cezm için asla değişmez.',
      ],
    },
    {
      kind: 'table',
      title: 'The five verbs in naṣb',
      caption:
        'EN: Model verb فَعَلَ / يَفْعَلُ. A dash means no short Qur’anic example of that person in naṣb is at hand. / TR: Örnek fiil فَعَلَ / يَفْعَلُ. Çizgi, o şahsın nasb hâli için elimizde kısa bir Kur’ân örneği olmadığını gösterir.',
      columns: ['Person', 'Rafʿ', 'Naṣb', 'Qur’anic example'],
      rows: [
        [
          { ar: 'هُمَا', note: 'they two (m) / o ikisi (eril)' },
          { ar: 'يَفْعَلَانِ' },
          { ar: 'يَفْعَلَا' },
          '—',
        ],
        [
          { ar: 'هُمَا', note: 'they two (f) / o ikisi (dişil)' },
          { ar: 'تَفْعَلَانِ' },
          { ar: 'تَفْعَلَا' },
          '—',
        ],
        [
          { ar: 'أَنْتُمَا', note: 'you two / siz ikiniz' },
          { ar: 'تَفْعَلَانِ' },
          { ar: 'تَفْعَلَا' },
          { ar: 'إِلَّا أَنْ تَكُونَا مَلَكَيْنِ', note: 'Qur’an 7:20' },
        ],
        [
          { ar: 'هُمْ', note: 'they (m pl) / onlar (eril çoğul)' },
          { ar: 'يَفْعَلُونَ' },
          { ar: 'يَفْعَلُوا' },
          { ar: 'فَيَمُوتُوا', note: 'Qur’an 35:36' },
        ],
        [
          { ar: 'أَنْتُمْ', note: 'you (m pl) / siz (eril çoğul)' },
          { ar: 'تَفْعَلُونَ' },
          { ar: 'تَفْعَلُوا' },
          { ar: 'وَأَنْ تَصُومُوا', note: 'Qur’an 2:184' },
        ],
        [
          { ar: 'أَنْتِ', note: 'you (f sg) / sen (dişil)' },
          { ar: 'تَفْعَلِينَ' },
          { ar: 'تَفْعَلِي' },
          '—',
        ],
      ],
    },
    {
      kind: 'prose',
      title: 'Worked example',
      paragraphs: [
        'EN: Start from the plain present: يَكْتُبُ الطَّالِبُ الدَّرْسَ, "the student writes the lesson". يَكْتُبُ is a sound muḍāriʿ with no nāṣib and no jāzim on it, so it is marfūʿ with a ḍamma.',
        'TR: Yalın muzâri ile başlayın: يَكْتُبُ الطَّالِبُ الدَّرْسَ, "öğrenci dersi yazıyor". يَكْتُبُ sahih bir muzâridir; başında ne nâsib ne câzim vardır, bu yüzden damme ile merfûdur.',
        'EN: Put لَنْ before it: لَنْ يَكْتُبَ الطَّالِبُ الدَّرْسَ, "the student will never write the lesson". لَنْ is a nāṣib, so the ending becomes a fatḥa: يَكْتُبَ.',
        'TR: Başına لَنْ getirin: لَنْ يَكْتُبَ الطَّالِبُ الدَّرْسَ, "öğrenci dersi asla yazmayacak". لَنْ nâsib olduğu için son harf fetha alır: يَكْتُبَ.',
        'EN: Now a five-verb: يَكْتُبُونَ الدَّرْسَ, "they write the lesson", marfūʿ because the nūn stays. Put لَنْ before it and the nūn drops: لَنْ يَكْتُبُوا الدَّرْسَ, "they will never write the lesson". The alif after the wāw is only spelling; it is not a sign.',
        'TR: Şimdi beş fiilden biri: يَكْتُبُونَ الدَّرْسَ, "onlar dersi yazıyorlar"; nûn sabit olduğu için merfûdur. Başına لَنْ getirin, nûn düşer: لَنْ يَكْتُبُوا الدَّرْسَ, "onlar dersi asla yazmayacaklar". Vavdan sonraki elif yalnız imlâdır, alâmet değildir.',
      ],
    },
  ],
}
