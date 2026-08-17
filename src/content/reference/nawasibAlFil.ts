import type { ReferenceEntry } from '../types'

// Ājurrūmiyya, bāb al-afʿāl: the nawāṣib of the muḍāriʿ.
// DRAFT: verify against your textbook before relying on it.
//
// Membership: the matn counts ten nawāṣib, in this order — an, lan, idhan,
// kay, lām kay, lām al-juḥūd, ḥattā, and the answer with fāʾ, wāw and aw. The
// matn's own wording is carried in the Overview section below, where it
// renders for the learner.
// Edition notes for Omer:
//   * Some prints write idhan with alif + tanwīn instead. Same particle.
//   * "the answer with fāʾ, wāw and aw" is one clause in the matn; the
//     count of ten only works if fāʾ, wāw, and aw are counted separately, which
//     is how the common commentaries (al-Kafrāwī, al-Ashmūnī) read it. A few
//     prints therefore print the list as nine or eleven items. Membership is
//     unchanged either way, so all ten rows are kept here.
//   * Later grammarians add an al-maṣdariyya after ḥattā / fāʾ al-sababiyya
//     as the real operator (see the "How they operate" section). The matn does
//     not, so this entry follows the matn.
//
// Sourcing: Quran > Hadith > fusha. Quranic examples carry a surah:ayah
// citation. Three particles have no safe Quranic šāhid governing a manṣūb
// muḍāriʿ (idhan, wāw al-maʿiyyah, aw); those keep the standard grammarians'
// fusha example and are flagged with a "DRAFT (fusha fallback)" comment.

export const nawasibAlFil: ReferenceEntry = {
  id: 'nawasib-al-fil',
  title: { english: 'Naṣb Particles of the Verb', turkish: 'Nasb Edatları' },
  titleArabic: 'نَوَاصِبُ الْفِعْلِ',
  order: 5,
  summary: {
    english: 'The ten particles that put the present verb into naṣb, with their signs.',
    turkish: 'Muzâri fiili nasb eden on edat ve alâmetleri.',
  },
  sections: [
    {
      kind: 'prose',
      title: { english: 'Overview', turkish: 'Genel bakış' },
      arabic:
        'وَالْمُضَارِعُ مَرْفُوعٌ أَبَدًا حَتَّى يَدْخُلَ عَلَيْهِ نَاصِبٌ أَوْ جَازِمٌ. فَالنَّوَاصِبُ عَشَرَةٌ وَهِيَ: أَنْ، وَلَنْ، وَإِذَنْ، وَكَيْ، وَلَامُ كَيْ، وَلَامُ الْجُحُودِ، وَحَتَّى، وَالْجَوَابُ بِالْفَاءِ، وَالْوَاوِ، وَأَوْ',
      paragraphs: [
        {
          english:
            'The muḍāriʿ (present verb) is in rafʿ by default. It stays in rafʿ until a nāṣib or a jāzim enters on it. These ten particles are the nawāṣib: each one puts the verb after it into naṣb.',
          turkish:
            'Muzâri fiil aslen merfûdur. Başına bir nâsib veya bir câzim gelmedikçe merfû kalır. Aşağıdaki on edat nevâsibdir: her biri kendisinden sonra gelen fiili nasb durumuna sokar.',
        },
        {
          english:
            'Naṣb shows on the verb in one of two ways: a fatḥa on the ending, or the dropping of the final nūn in the five verbs (al-afʿāl al-khamsa). See the sign sections below.',
          turkish:
            'Nasb, fiilde iki şekilde görünür: sonunda fetha ile veya beş fiilde (el-ef‘âlü’l-hamse) sondaki nûnun düşmesi ile. Aşağıdaki alâmet bölümlerine bakın.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'Quick table', turkish: 'Kısa tablo' },
      caption: {
        english:
          'Every example is a verb in naṣb after the particle; the citation follows the Arabic.',
        turkish:
          'Her örnek, edattan sonra nasb durumundaki bir fiildir; kaynak Arapça metnin altındadır.',
      },
      columns: [
        'Ḥarf',
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Verb in naṣb', turkish: 'Nasb hâlinde fiil' },
        { english: 'Meaning of the example', turkish: 'Örneğin anlamı' },
      ],
      rows: [
        [
          { ar: 'أَنْ' },
          {
            english: 'that, to (makes the verb a verbal noun)',
            turkish: '-mesi, -mek (masdar edatı)',
          },
          { ar: 'يُرِيدُ اللَّهُ أَنْ يُخَفِّفَ عَنْكُمْ', source: 'Qur’an 4:28' },
          {
            english: 'Allah wants to lighten [the burden] for you',
            turkish: 'Allah sizden [yükü] hafifletmek istiyor',
          },
        ],
        [
          { ar: 'لَنْ' },
          {
            english: 'will never (negates the future)',
            turkish: 'asla ...mayacak (geleceği olumsuzlar)',
          },
          { ar: 'لَنْ نُؤْمِنَ لَكَ', source: 'Qur’an 2:55' },
          { english: 'We will never believe you', turkish: 'Sana asla inanmayacağız' },
        ],
        [
          { ar: 'إِذَنْ' },
          {
            english: 'then, in that case (answers what was just said)',
            turkish: 'öyleyse, o hâlde (söylenene cevap verir)',
          },
          // DRAFT (fusha fallback): idhan does not occur in the Qur’an as an
          // operating nāṣib. The nearest form, "wa-idhan la yalbathuna" (17:76),
          // has the verb in rafʿ because la separates the particle from it.
          // This is the standard grammarians' example instead.
          { ar: 'إِذَنْ أُكْرِمَكَ' },
          { english: 'Then I will honour you', turkish: 'Öyleyse sana ikram ederim' },
        ],
        [
          { ar: 'كَيْ' },
          { english: 'in order that, so that', turkish: 'diye, ...mak için' },
          { ar: 'كَيْ نُسَبِّحَكَ كَثِيرًا', source: 'Qur’an 20:33' },
          {
            english: 'so that we may glorify You much',
            turkish: 'Seni çokça tesbih etmemiz için',
          },
        ],
        [
          { ar: 'لَامُ كَيْ (لِـ)' },
          {
            english: 'lām of purpose: in order to',
            turkish: 'ta‘lîl (amaç) lâmı: ...mak için',
          },
          { ar: 'لِيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِنْ ذَنْبِكَ', source: 'Qur’an 48:2' },
          {
            english: 'so that He may forgive you what came before of your sin',
            turkish: 'Geçmiş günahını bağışlaması için',
          },
        ],
        [
          { ar: 'لَامُ الْجُحُودِ (لِـ)' },
          {
            english: 'lām of denial: was never going to (after mā kāna / lam yakun)',
            turkish:
              'cuhûd (inkâr) lâmı: asla ...acak değildi (mâ kâne / lem yekün sonrası)',
          },
          { ar: 'وَمَا كَانَ اللَّهُ لِيُعَذِّبَهُمْ وَأَنْتَ فِيهِمْ', source: 'Qur’an 8:33' },
          {
            english: 'Allah was not going to punish them while you are among them',
            turkish: 'Sen onların içindeyken Allah onlara azap edecek değildi',
          },
        ],
        [
          { ar: 'حَتَّى' },
          {
            english: 'until; so that (of a goal or an end point)',
            turkish: '...ıncaya kadar; ...mak için (gaye veya bitiş)',
          },
          { ar: 'حَتَّى يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ', source: 'Qur’an 2:187' },
          {
            english: 'until the white thread becomes clear to you',
            turkish: 'Beyaz iplik sizin için belirinceye kadar',
          },
        ],
        [
          { ar: 'اَلْجَوَابُ بِالْفَاءِ (فَـ)' },
          {
            english: 'fāʾ of result, after a command, request, or negation: "and so"',
            turkish: 'cevap fâsı: emir, istek veya olumsuzluktan sonra "böylece, de"',
          },
          { ar: 'لَا يُقْضَى عَلَيْهِمْ فَيَمُوتُوا', source: 'Qur’an 35:36' },
          {
            english: 'It is not decreed for them, so that they would die',
            turkish: 'Onların işi bitirilmez ki ölsünler',
          },
        ],
        [
          { ar: 'اَلْجَوَابُ بِالْوَاوِ (وَ)' },
          {
            english: 'wāw of accompaniment: "and at the same time"',
            turkish: 'ma‘iyyet (beraberlik) vavı: "aynı anda, bir yandan da"',
          },
          // DRAFT (fusha fallback): no safe Qur’anic wāw al-maʿiyyah governing a
          // manṣūb muḍāriʿ is at hand; the near misses (2:214, 3:142) have the
          // verb in jazm after lamma. This is the standard textbook example.
          { ar: 'لَا تَأْكُلِ السَّمَكَ وَتَشْرَبَ اللَّبَنَ' },
          {
            english: 'Do not eat fish and drink milk at the same time',
            turkish: 'Balığı yiyip aynı anda süt içme',
          },
        ],
        [
          { ar: 'أَوْ' },
          {
            english: 'until, unless (meaning ilā an / illā an)',
            turkish: '...ıncaya kadar; ...madıkça (ilâ en / illâ en anlamında)',
          },
          // DRAFT (fusha fallback): aw meaning "until / unless" before a
          // manṣūb muḍāriʿ has no Qur’anic šāhid at hand; the Qur’anic aw is
          // the coordinating one, which passes on the state of what precedes
          // it (e.g. "an takuna ... aw takuna", 7:20). Grammarians' example.
          { ar: 'لَأَلْزَمَنَّكَ أَوْ تَقْضِيَنِي حَقِّي' },
          {
            english: 'I will stay with you until you pay me my due',
            turkish: 'Hakkımı bana ödeyinceye kadar peşini bırakmam',
          },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'How they operate', turkish: 'Nasıl amel ederler' },
      paragraphs: [
        {
          english:
            'Only four of the ten put the verb into naṣb by themselves: أَنْ, لَنْ, إِذَنْ, and كَيْ. After the other six the naṣb is worked by a hidden أَنْ (an muqaddara) that the particle brings with it. The matn lists all ten together, so learn them as one set of ten and keep the distinction as a note.',
          turkish:
            'On edattan yalnız dördü fiili kendi başına nasb eder: أَنْ, لَنْ, إِذَنْ ve كَيْ. Diğer altısından sonra nasb, edatın beraberinde getirdiği gizli (mukadder) bir أَنْ ile olur. Metin onu bir liste hâlinde saydığı için onunu birlikte öğrenin, bu ayrımı da not olarak tutun.',
        },
        {
          english:
            'The fāʾ and the wāw take naṣb only in an "answer" position: after a command, a prohibition, a request, a question, a wish, or a negation. A fāʾ or wāw that merely joins two clauses is coordinating, and the verb after it keeps the state of the verb before it.',
          turkish:
            'Fâ ve vav yalnız "cevap" konumunda nasb eder: emir, nehiy, istek, soru, temenni veya olumsuzluktan sonra. Sadece iki cümleyi bağlayan fâ veya vav atıf harfidir; ondan sonraki fiil, kendinden önceki fiilin durumunu alır.',
        },
        {
          english:
            'إِذَنْ works only when it starts the answer, the verb refers to the future, and nothing separates the two (an oath or لَا does not count as a separator).',
          turkish:
            'إِذَنْ yalnız cevabın başında bulunduğunda, fiil geleceğe delâlet ettiğinde ve araya bir ayırıcı girmediğinde amel eder (yemin veya لَا ayırıcı sayılmaz).',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'Signs of naṣb on the verb', turkish: 'Fiilde nasb alâmetleri' },
      caption: {
        english: 'Same rows as the iʿrāb-signs entry, read for naṣb only.',
        turkish:
          'İ‘râb alâmetleri sayfasındaki satırların aynısı, yalnız nasb için okunmuş hâli.',
      },
      columns: [
        { english: 'Verb type', turkish: 'Fiil türü' },
        'Rafʿ',
        { english: 'Naṣb sign', turkish: 'Nasb alâmeti' },
        { english: 'Example in naṣb', turkish: 'Nasb hâlinde örnek' },
      ],
      rows: [
        [
          {
            ar: 'اَلْفِعْلُ الْمُضَارِعُ الصَّحِيحُ',
            footnote: { english: 'sound present verb', turkish: 'sahih muzari fiil' },
          },
          { ar: 'ـُ', footnote: 'ḍamma' },
          { ar: 'ـَ', footnote: 'fatḥa' },
          { ar: 'أَنْ يُخَفِّفَ', source: 'Qur’an 4:28' },
        ],
        [
          {
            ar: 'اَلْمُعْتَلُّ الْآخِرِ بِالْوَاوِ أَوِ الْيَاءِ',
            footnote: {
              english: 'ends in wāw or yāʾ',
              turkish: 'vav veya ya ile biten',
            },
          },
          { ar: 'ـُ', footnote: { english: 'implied ḍamma', turkish: 'takdirî damme' } },
          { ar: 'ـَ', footnote: { english: 'fatḥa, visible', turkish: 'fetha, görünür' } },
          { ar: 'أَنْ يَأْتِيَ يَوْمٌ', source: 'Qur’an 2:254' },
        ],
        [
          {
            ar: 'اَلْمُعْتَلُّ الْآخِرِ بِالْأَلِفِ',
            footnote: { english: 'ends in alif', turkish: 'elif ile biten' },
          },
          { ar: 'ـُ', footnote: { english: 'implied ḍamma', turkish: 'takdirî damme' } },
          {
            ar: 'ـَ',
            footnote: { english: 'fatḥa, not visible', turkish: 'fetha, görünmez' },
          },
          { ar: 'أَنْ يُقْضَى إِلَيْكَ وَحْيُهُ', source: 'Qur’an 20:114' },
        ],
        [
          {
            ar: 'اَلْأَفْعَالُ الْخَمْسَةُ',
            footnote: { english: 'five verb forms', turkish: 'beş fiil' },
          },
          { ar: 'ثُبُوتُ النُّونِ', footnote: { english: 'nūn stays', turkish: 'nûn sabit' } },
          { ar: 'حَذْفُ النُّونِ', footnote: { english: 'nūn drops', turkish: 'nûn düşer' } },
          { ar: 'أَنْ تَصُومُوا', source: 'Qur’an 2:184' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'Reading the signs', turkish: 'Alâmetleri okumak' },
      paragraphs: [
        {
          english:
            'The default sign of naṣb is the fatḥa. It is written on the last letter of the verb: يَذْهَبُ becomes لَنْ يَذْهَبَ. On a verb ending in wāw or yāʾ the fatḥa is light enough to be pronounced, so it appears: يَأْتِي becomes أَنْ يَأْتِيَ. On a verb ending in alif nothing can be written, so the fatḥa is only implied (muqaddara) and the verb looks unchanged: يَخْشَى stays أَنْ يَخْشَى.',
          turkish:
            'Nasbın aslî alâmeti fethadır. Fiilin son harfine yazılır: يَذْهَبُ, لَنْ يَذْهَبَ olur. Sonu vav veya ya olan fiilde fetha telaffuz edilebildiği için görünür: يَأْتِي, أَنْ يَأْتِيَ olur. Sonu elif olan fiilde ise hiçbir şey yazılamaz; fetha yalnız takdir edilir (mukadder) ve fiil değişmemiş görünür: يَخْشَى, أَنْ يَخْشَى olarak kalır.',
        },
        {
          english:
            'The five verbs are the muḍāriʿ forms that end in a nūn belonging to the iʿrāb (the dual nūn, the plural nūn, and the nūn of the second-person feminine singular). Their sign of naṣb is not a fatḥa but the dropping of that nūn. The same dropping is also their sign of jazm, so the naṣb form and the jazm form of a five-verb look identical; only the governing particle tells them apart.',
          turkish:
            'Beş fiil, sonu i‘râb nûnu ile biten muzâri kalıplarıdır (ikil nûnu, çoğul nûnu ve müennes muhataba nûnu). Bunların nasb alâmeti fetha değil, o nûnun düşmesidir. Aynı düşme cezm alâmeti de olduğu için beş fiilin nasb hâli ile cezm hâli aynı görünür; ikisini yalnız başına gelen edat ayırır.',
        },
        {
          english:
            'The nūn that belongs to the root pattern does not drop, and neither does the nūn of the feminine plural (نُونُ النِّسْوَةِ). تَفْعَلْنَ (you women do) is mabnī, not muʿrab: it never changes for naṣb or jazm.',
          turkish:
            'Kalıba ait olan nûn düşmez; müennes cemi nûnu (nûnü’n-nisve) de düşmez. تَفْعَلْنَ (siz kadınlar yapıyorsunuz) mebnîdir, mu‘reb değildir: nasb veya cezm için asla değişmez.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'The five verbs in naṣb', turkish: 'Nasb hâlinde beş fiil' },
      caption: {
        english:
          'Model verb فَعَلَ / يَفْعَلُ. A dash means no short Qur’anic example of that person in naṣb is at hand.',
        turkish:
          'Örnek fiil فَعَلَ / يَفْعَلُ. Çizgi, o şahsın nasb hâli için elimizde kısa bir Kur’ân örneği olmadığını gösterir.',
      },
      columns: [
        { english: 'Person', turkish: 'Kişi' },
        'Rafʿ',
        'Naṣb',
        { english: 'Qur’anic example', turkish: 'Kur’ân’dan örnek' },
      ],
      rows: [
        [
          {
            ar: 'هُمَا',
            footnote: { english: 'they two (m)', turkish: 'o ikisi (eril)' },
          },
          { ar: 'يَفْعَلَانِ' },
          { ar: 'يَفْعَلَا' },
          '—',
        ],
        [
          {
            ar: 'هُمَا',
            footnote: { english: 'they two (f)', turkish: 'o ikisi (dişil)' },
          },
          { ar: 'تَفْعَلَانِ' },
          { ar: 'تَفْعَلَا' },
          '—',
        ],
        [
          { ar: 'أَنْتُمَا', footnote: { english: 'you two', turkish: 'siz ikiniz' } },
          { ar: 'تَفْعَلَانِ' },
          { ar: 'تَفْعَلَا' },
          { ar: 'إِلَّا أَنْ تَكُونَا مَلَكَيْنِ', source: 'Qur’an 7:20' },
        ],
        [
          {
            ar: 'هُمْ',
            footnote: { english: 'they (m pl)', turkish: 'onlar (eril çoğul)' },
          },
          { ar: 'يَفْعَلُونَ' },
          { ar: 'يَفْعَلُوا' },
          { ar: 'فَيَمُوتُوا', source: 'Qur’an 35:36' },
        ],
        [
          {
            ar: 'أَنْتُمْ',
            footnote: { english: 'you (m pl)', turkish: 'siz (eril çoğul)' },
          },
          { ar: 'تَفْعَلُونَ' },
          { ar: 'تَفْعَلُوا' },
          { ar: 'وَأَنْ تَصُومُوا', source: 'Qur’an 2:184' },
        ],
        [
          { ar: 'أَنْتِ', footnote: { english: 'you (f sg)', turkish: 'sen (dişil)' } },
          { ar: 'تَفْعَلِينَ' },
          { ar: 'تَفْعَلِي' },
          '—',
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'Worked example', turkish: 'Çözümlü örnek' },
      paragraphs: [
        {
          english:
            'Start from the plain present: يَكْتُبُ الطَّالِبُ الدَّرْسَ, "the student writes the lesson". يَكْتُبُ is a sound muḍāriʿ with no nāṣib and no jāzim on it, so it is marfūʿ with a ḍamma.',
          turkish:
            'Yalın muzâri ile başlayın: يَكْتُبُ الطَّالِبُ الدَّرْسَ, "öğrenci dersi yazıyor". يَكْتُبُ sahih bir muzâridir; başında ne nâsib ne câzim vardır, bu yüzden damme ile merfûdur.',
        },
        {
          english:
            'Put لَنْ before it: لَنْ يَكْتُبَ الطَّالِبُ الدَّرْسَ, "the student will never write the lesson". لَنْ is a nāṣib, so the ending becomes a fatḥa: يَكْتُبَ.',
          turkish:
            'Başına لَنْ getirin: لَنْ يَكْتُبَ الطَّالِبُ الدَّرْسَ, "öğrenci dersi asla yazmayacak". لَنْ nâsib olduğu için son harf fetha alır: يَكْتُبَ.',
        },
        {
          english:
            'Now a five-verb: يَكْتُبُونَ الدَّرْسَ, "they write the lesson", marfūʿ because the nūn stays. Put لَنْ before it and the nūn drops: لَنْ يَكْتُبُوا الدَّرْسَ, "they will never write the lesson". The alif after the wāw is only spelling; it is not a sign.',
          turkish:
            'Şimdi beş fiilden biri: يَكْتُبُونَ الدَّرْسَ, "onlar dersi yazıyorlar"; nûn sabit olduğu için merfûdur. Başına لَنْ getirin, nûn düşer: لَنْ يَكْتُبُوا الدَّرْسَ, "onlar dersi asla yazmayacaklar". Vavdan sonraki elif yalnız imlâdır, alâmet değildir.',
        },
      ],
    },
  ],
}
