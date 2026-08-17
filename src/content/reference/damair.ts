import type { ReferenceEntry } from '../types'

// Ājurrūmiyya: the muḍmar (pronoun) passages of bāb al-fāʿil and bāb al-mafʿūl bihi.
// DRAFT: verify against your textbook and a muṣḥaf before relying on it.
//
// Sourcing: every example follows Quran > Hadith > fusha, citation in
// `Example.source`. All examples in this entry are Quranic; no fusha fallback
// was needed. The paradigm tables (daraba, kitab, bi-) are not examples: the
// verb paradigms are the matn's own word lists, and the kitab / bi- paradigm is
// a plain fusha model built to show the suffixes on a noun and on a ḥarf jarr.
//
// EDITION NOTE for Omer: the matn counts the pronouns as twelve (ithna ashar)
// in both chapters, because the dual has one form for masculine and feminine
// (antuma / huma). The detached table below lists the fourteen ṣarf slots
// (the grid used for verb conjugation), so huma and antuma each appear twice.
// The matn also gives no list of the detached rafʿ pronouns (ana, nahnu, ...);
// that list comes from the ṣarf tables, not from the Ājurrūmiyya.

export const damair: ReferenceEntry = {
  id: 'damair',
  title: { english: 'Pronouns', turkish: 'Zamirler' },
  titleArabic: 'اَلضَّمَائِرُ',
  order: 7,
  summary: {
    english: 'Attached and detached pronoun tables.',
    turkish: 'Muttasıl ve munfasıl zamir tabloları.',
  },
  sections: [
    {
      kind: 'prose',
      title: { english: 'Overview', turkish: 'Genel bakış' },
      arabic:
        'وَهُوَ عَلَى قِسْمَيْنِ: ظَاهِرٌ وَمُضْمَرٌ. وَالْمُضْمَرُ اثْنَا عَشَرَ، نَحْوَ قَوْلِكَ: ضَرَبْتُ، وَضَرَبْنَا، وَضَرَبْتَ، وَضَرَبْتِ، وَضَرَبْتُمَا، وَضَرَبْتُمْ، وَضَرَبْتُنَّ، وَضَرَبَ، وَضَرَبَتْ، وَضَرَبَا، وَضَرَبُوا، وَضَرَبْنَ',
      paragraphs: [
        {
          english:
            'A pronoun (ḍamīr, also called muḍmar) stands in place of a named noun. The passage above is from the chapter on the fāʿil: the fāʿil is either visible (ẓāhir) or a pronoun (muḍmar), and the matn lists the twelve pronoun forms on the verb ḍaraba. Pronouns are of two kinds: attached (muttaṣil), which cannot stand alone and are written joined to a verb, a noun, or a particle, and detached (munfaṣil), which stand as their own word.',
          turkish:
            'Zamir (ismin yerini tutan kelime, matn’de muzmar) açık ismin yerine geçer. Yukarıdaki metin fâil bâbındandır: fâil ya açıktır (zâhir) ya da zamirdir (muzmar); matn, ضَرَبَ fiili üzerinde on iki zamir şeklini sayar. Zamirler iki kısımdır: muttasıl (bitişik), tek başına kullanılamaz ve fiile, isme veya harfe bitişik yazılır; munfasıl (ayrı), kendi başına bir kelimedir.',
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Detached pronouns (munfaṣil)',
        turkish: 'Munfasıl zamirler',
      },
      caption: {
        english:
          'The fourteen ṣarf slots. The dual has one form for masculine and feminine, so هُمَا and أَنْتُمَا each appear twice; the matn therefore counts twelve.',
        turkish:
          'On dört sarf hânesi. İkil, eril ve dişil için tek şekildir; bu yüzden هُمَا ve أَنْتُمَا ikişer kez geçer ve matn on iki sayar.',
      },
      columns: ['Rafʿ', 'Naṣb (iyyā)', { english: 'Meaning', turkish: 'Anlam' }],
      rows: [
        [
          { ar: 'هُوَ' },
          { ar: 'إِيَّاهُ' },
          { english: 'he, him (3rd m. sg.)', turkish: 'o, onu (3. tekil eril)' },
        ],
        [
          {
            ar: 'هُمَا',
            footnote: {
              english: 'same form for m. and f.',
              turkish: 'eril ve dişil için aynı şekil',
            },
          },
          { ar: 'إِيَّاهُمَا' },
          {
            english: 'they two, them two (3rd m. dual)',
            turkish: 'o ikisi, o ikisini (3. ikil eril)',
          },
        ],
        [
          { ar: 'هُمْ' },
          { ar: 'إِيَّاهُمْ' },
          { english: 'they, them (3rd m. pl.)', turkish: 'onlar, onları (3. çoğul eril)' },
        ],
        [
          { ar: 'هِيَ' },
          { ar: 'إِيَّاهَا' },
          { english: 'she, her (3rd f. sg.)', turkish: 'o, onu (3. tekil dişil)' },
        ],
        [
          {
            ar: 'هُمَا',
            footnote: {
              english: 'same form for m. and f.',
              turkish: 'eril ve dişil için aynı şekil',
            },
          },
          { ar: 'إِيَّاهُمَا' },
          {
            english: 'they two, them two (3rd f. dual)',
            turkish: 'o ikisi, o ikisini (3. ikil dişil)',
          },
        ],
        [
          { ar: 'هُنَّ' },
          { ar: 'إِيَّاهُنَّ' },
          { english: 'they, them (3rd f. pl.)', turkish: 'onlar, onları (3. çoğul dişil)' },
        ],
        [
          { ar: 'أَنْتَ' },
          { ar: 'إِيَّاكَ' },
          { english: 'you (2nd m. sg.)', turkish: 'sen, seni (2. tekil eril)' },
        ],
        [
          {
            ar: 'أَنْتُمَا',
            footnote: {
              english: 'same form for m. and f.',
              turkish: 'eril ve dişil için aynı şekil',
            },
          },
          { ar: 'إِيَّاكُمَا' },
          {
            english: 'you two (2nd m. dual)',
            turkish: 'siz ikiniz, ikinizi (2. ikil eril)',
          },
        ],
        [
          { ar: 'أَنْتُمْ' },
          { ar: 'إِيَّاكُمْ' },
          { english: 'you (2nd m. pl.)', turkish: 'siz, sizi (2. çoğul eril)' },
        ],
        [
          { ar: 'أَنْتِ' },
          { ar: 'إِيَّاكِ' },
          { english: 'you (2nd f. sg.)', turkish: 'sen, seni (2. tekil dişil)' },
        ],
        [
          {
            ar: 'أَنْتُمَا',
            footnote: {
              english: 'same form for m. and f.',
              turkish: 'eril ve dişil için aynı şekil',
            },
          },
          { ar: 'إِيَّاكُمَا' },
          {
            english: 'you two (2nd f. dual)',
            turkish: 'siz ikiniz, ikinizi (2. ikil dişil)',
          },
        ],
        [
          { ar: 'أَنْتُنَّ' },
          { ar: 'إِيَّاكُنَّ' },
          { english: 'you (2nd f. pl.)', turkish: 'siz, sizi (2. çoğul dişil)' },
        ],
        [
          { ar: 'أَنَا' },
          { ar: 'إِيَّايَ' },
          { english: 'I, me (1st sg.)', turkish: 'ben, beni (1. tekil)' },
        ],
        [
          { ar: 'نَحْنُ' },
          { ar: 'إِيَّانَا' },
          { english: 'we, us (1st pl.)', turkish: 'biz, bizi (1. çoğul)' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'Where each kind appears', turkish: 'Her kısım nerede geçer' },
      paragraphs: [
        {
          english:
            'Rafʿ: A pronoun in a rafʿ position is the doer. Attached, it is the fāʿil written inside the verb (ضَرَبْتُ, ضَرَبُوا) or the ism of kāna (كُنْتُ). In ضَرَبَ and ضَرَبَتْ the fāʿil is a hidden pronoun (ḍamīr mustatir, "he" and "she"); the tāʾ of ضَرَبَتْ is the feminine marker, not the pronoun. Detached, it is the mubtadaʾ of a nominal sentence (هُوَ اللَّهُ أَحَدٌ) or the separating pronoun (ḍamīr al-faṣl) before a definite khabar.',
          turkish:
            'Ref hâli: Ref mahallindeki zamir işi yapandır. Muttasıl olarak fiilin içine yazılan fâildir (ضَرَبْتُ, ضَرَبُوا) veya kâne’nin ismidir (كُنْتُ). ضَرَبَ ve ضَرَبَتْ fiillerinde fâil gizli zamirdir (zamir-i müstetir: “o”); ضَرَبَتْ’teki tâ zamir değil, dişillik alâmetidir. Munfasıl olarak isim cümlesinin mübtedâsıdır (هُوَ اللَّهُ أَحَدٌ) veya belirli haberden önce gelen fasıl zamiridir.',
        },
        {
          english:
            'Naṣb: A pronoun in a naṣb position is the one acted upon. Attached, it is the mafʿūl bihi suffixed to the verb (ضَرَبَهُ) or the ism of inna and its sisters (إِنَّهُ). For the first person singular the suffix is ـنِي, because a protective nūn (nūn al-wiqāyah) keeps the verb ending from taking a kasra. Detached, the iyyā series is used when the object comes before its verb or cannot be joined to it (إِيَّاكَ نَعْبُدُ).',
          turkish:
            'Nasb hâli: Nasb mahallindeki zamir, fiilden etkilenendir. Muttasıl olarak fiile eklenen mef’ûlün bihtir (ضَرَبَهُ) veya inne ve kardeşlerinin ismidir (إِنَّهُ). Birinci tekil şahısta ek ـنِي şeklindedir; araya giren nûn-u vikâye fiil sonunu kesreden korur. Munfasıl olarak, mef’ûl fiilinden önce geldiğinde veya fiile bitişemediğinde إِيَّا serisi kullanılır (إِيَّاكَ نَعْبُدُ).',
        },
        {
          english:
            'Jarr: A pronoun in a jarr position follows a ḥarf jarr (بِهِ, إِلَيْهِ) or a noun, where it is the muḍāf ilayh and reads as a possessive (كِتَابُهُ, "his book"). There is no detached jarr pronoun: the iyyā series never follows a ḥarf jarr. The jarr suffixes are the same as the naṣb suffixes except in the first person singular, which is ـِي without the protective nūn (كِتَابِي, بِي).',
          turkish:
            'Cer hâli: Cer mahallindeki zamir, ya bir cer harfinden sonra gelir (بِهِ, إِلَيْهِ) ya da bir isimden sonra gelir; orada muzâf ileyh olur ve iyelik anlamı verir (كِتَابُهُ, “onun kitabı”). Munfasıl cer zamiri yoktur: إِيَّا serisi cer harfinden sonra gelmez. Cer ekleri nasb ekleriyle aynıdır; yalnız birinci tekil şahısta nûn-u vikâye olmadan ـِي gelir (كِتَابِي, بِي).',
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Attached rafʿ pronouns (on the verb)',
        turkish: 'Muttasıl ref zamirleri (fiilde)',
      },
      caption: {
        english:
          'The matn’s twelve forms on ḍaraba (he struck). The pronoun column isolates the attached fāʿil.',
        turkish:
          'Matn’in ضَرَبَ (vurdu) fiili üzerindeki on iki şekli. Zamir sütunu bitişik fâili ayırır.',
      },
      columns: [
        { english: 'Verb form', turkish: 'Fiil şekli' },
        { english: 'Pronoun', turkish: 'Zamir' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          { ar: 'ضَرَبْتُ' },
          { ar: 'ـتُ' },
          { english: 'I struck (1st sg.)', turkish: 'vurdum (1. tekil)' },
        ],
        [
          { ar: 'ضَرَبْنَا' },
          { ar: 'ـنَا' },
          { english: 'we struck (1st pl.)', turkish: 'vurduk (1. çoğul)' },
        ],
        [
          { ar: 'ضَرَبْتَ' },
          { ar: 'ـتَ' },
          { english: 'you struck (2nd m. sg.)', turkish: 'vurdun (2. tekil eril)' },
        ],
        [
          { ar: 'ضَرَبْتِ' },
          { ar: 'ـتِ' },
          { english: 'you struck (2nd f. sg.)', turkish: 'vurdun (2. tekil dişil)' },
        ],
        [
          { ar: 'ضَرَبْتُمَا' },
          { ar: 'ـتُمَا' },
          { english: 'you two struck (2nd dual)', turkish: 'ikiniz vurdunuz (2. ikil)' },
        ],
        [
          { ar: 'ضَرَبْتُمْ' },
          { ar: 'ـتُمْ' },
          { english: 'you struck (2nd m. pl.)', turkish: 'vurdunuz (2. çoğul eril)' },
        ],
        [
          { ar: 'ضَرَبْتُنَّ' },
          { ar: 'ـتُنَّ' },
          { english: 'you struck (2nd f. pl.)', turkish: 'vurdunuz (2. çoğul dişil)' },
        ],
        [
          { ar: 'ضَرَبَ' },
          { ar: 'هُوَ', footnote: { english: 'hidden (mustatir)', turkish: 'gizli (müstetir)' } },
          { english: 'he struck (3rd m. sg.)', turkish: 'vurdu (3. tekil eril)' },
        ],
        [
          { ar: 'ضَرَبَتْ' },
          {
            ar: 'هِيَ',
            footnote: {
              english: 'hidden; the tāʾ is the fem. marker',
              turkish: 'gizli; tâ dişillik alâmetidir',
            },
          },
          { english: 'she struck (3rd f. sg.)', turkish: 'vurdu (3. tekil dişil)' },
        ],
        [
          { ar: 'ضَرَبَا' },
          { ar: 'ـَا', footnote: { english: 'alif of the dual', turkish: 'ikil elifi' } },
          {
            english: 'they two struck (3rd m. dual)',
            turkish: 'o ikisi vurdu (3. ikil eril)',
          },
        ],
        [
          { ar: 'ضَرَبُوا' },
          { ar: 'ـُوا', footnote: { english: 'wāw of the group', turkish: 'cemaat vâvı' } },
          { english: 'they struck (3rd m. pl.)', turkish: 'vurdular (3. çoğul eril)' },
        ],
        [
          { ar: 'ضَرَبْنَ' },
          { ar: 'ـنَ', footnote: { english: 'nūn of the feminine', turkish: 'nisve nûnu' } },
          { english: 'they struck (3rd f. pl.)', turkish: 'vurdular (3. çoğul dişil)' },
        ],
      ],
    },
    {
      kind: 'harf',
      id: 'muttasil-raf',
      arabic: 'ضَمَائِرُ الرَّفْعِ الْمُتَّصِلَةُ',
      english: 'attached rafʿ pronouns: the subject inside the verb',
      turkish: 'muttasıl ref zamirleri: fiilin içindeki fâil',
      senses: [
        {
          term: 'Nā of the speakers',
          termArabic: 'نَا الْفَاعِلِينَ',
          english: 'The suffix ـنَا is the fāʿil "we" on a past-tense verb.',
          turkish: 'ـنَا eki, mâzî fiilde “biz” fâilidir.',
          examples: [
            {
              arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا',
              english: 'Our Lord, we have wronged ourselves',
              turkish: 'Rabbimiz, kendimize zulmettik',
              source: 'Qur’an 7:23',
            },
          ],
        },
        {
          term: 'Tāʾ of the doer',
          termArabic: 'تَاءُ الْفَاعِلِ',
          english: 'The suffix ـتَ is the fāʿil "you" (m. sg.) on a past-tense verb.',
          turkish: 'ـتَ eki, mâzî fiilde “sen” (eril tekil) fâilidir.',
          examples: [
            {
              arabic: 'لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا',
              english: 'We have no knowledge except what You have taught us',
              turkish: 'Bize öğrettiğinden başka bir bilgimiz yok',
              source: 'Qur’an 2:32',
            },
          ],
        },
        {
          term: 'Wāw of the group',
          termArabic: 'وَاوُ الْجَمَاعَةِ',
          english: 'The suffix ـُوا is the fāʿil "they" (m. pl.).',
          turkish: 'ـُوا eki, “onlar” (eril çoğul) fâilidir.',
          examples: [
            {
              arabic: 'الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',
              english: 'those who believed and did righteous deeds',
              turkish: 'iman edip salih ameller işleyenler',
              source: 'Qur’an 103:3',
            },
          ],
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Attached naṣb pronouns (object on the verb)',
        turkish: 'Muttasıl nasb zamirleri (fiildeki mef’ûl)',
      },
      caption: {
        english:
          'The matn’s twelve object forms on ḍaraba. Note the protective nūn in ضَرَبَنِي.',
        turkish:
          'Matn’in ضَرَبَ üzerindeki on iki mef’ûl şekli. ضَرَبَنِي’deki nûn-u vikâyeye dikkat.',
      },
      columns: [
        { english: 'Verb + pronoun', turkish: 'Fiil + zamir' },
        { english: 'Pronoun', turkish: 'Zamir' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          { ar: 'ضَرَبَنِي' },
          {
            ar: 'ـنِي',
            footnote: { english: 'nūn al-wiqāyah + yāʾ', turkish: 'nûn-u vikâye + yâ' },
          },
          { english: 'he struck me (1st sg.)', turkish: 'bana vurdu (1. tekil)' },
        ],
        [
          { ar: 'ضَرَبَنَا' },
          { ar: 'ـنَا' },
          { english: 'he struck us (1st pl.)', turkish: 'bize vurdu (1. çoğul)' },
        ],
        [
          { ar: 'ضَرَبَكَ' },
          { ar: 'ـكَ' },
          { english: 'he struck you (2nd m. sg.)', turkish: 'sana vurdu (2. tekil eril)' },
        ],
        [
          { ar: 'ضَرَبَكِ' },
          { ar: 'ـكِ' },
          { english: 'he struck you (2nd f. sg.)', turkish: 'sana vurdu (2. tekil dişil)' },
        ],
        [
          { ar: 'ضَرَبَكُمَا' },
          { ar: 'ـكُمَا' },
          { english: 'he struck you two (2nd dual)', turkish: 'ikinize vurdu (2. ikil)' },
        ],
        [
          { ar: 'ضَرَبَكُمْ' },
          { ar: 'ـكُمْ' },
          { english: 'he struck you (2nd m. pl.)', turkish: 'size vurdu (2. çoğul eril)' },
        ],
        [
          { ar: 'ضَرَبَكُنَّ' },
          { ar: 'ـكُنَّ' },
          { english: 'he struck you (2nd f. pl.)', turkish: 'size vurdu (2. çoğul dişil)' },
        ],
        [
          { ar: 'ضَرَبَهُ' },
          { ar: 'ـهُ' },
          { english: 'he struck him (3rd m. sg.)', turkish: 'ona vurdu (3. tekil eril)' },
        ],
        [
          { ar: 'ضَرَبَهَا' },
          { ar: 'ـهَا' },
          { english: 'he struck her (3rd f. sg.)', turkish: 'ona vurdu (3. tekil dişil)' },
        ],
        [
          { ar: 'ضَرَبَهُمَا' },
          { ar: 'ـهُمَا' },
          { english: 'he struck them two (3rd dual)', turkish: 'o ikisine vurdu (3. ikil)' },
        ],
        [
          { ar: 'ضَرَبَهُمْ' },
          { ar: 'ـهُمْ' },
          { english: 'he struck them (3rd m. pl.)', turkish: 'onlara vurdu (3. çoğul eril)' },
        ],
        [
          { ar: 'ضَرَبَهُنَّ' },
          { ar: 'ـهُنَّ' },
          { english: 'he struck them (3rd f. pl.)', turkish: 'onlara vurdu (3. çoğul dişil)' },
        ],
      ],
    },
    {
      kind: 'harf',
      id: 'muttasil-nasb',
      arabic: 'ضَمَائِرُ النَّصْبِ الْمُتَّصِلَةُ',
      english: 'attached naṣb pronouns: the object on the verb',
      turkish: 'muttasıl nasb zamirleri: fiildeki mef’ûl',
      senses: [
        {
          term: 'Object: first person',
          termArabic: 'اَلْمَفْعُولُ بِهِ لِلْمُتَكَلِّمِ',
          english:
            'The object "me" is ـنِي on a verb: the protective nūn (nūn al-wiqāyah) comes before the yāʾ. Compare the object "you" (pl.) ـكُمْ in the same āyah.',
          turkish:
            'Fiilde “beni” mef’ûlü ـنِي şeklindedir: yâdan önce nûn-u vikâye gelir. Aynı âyetteki “sizi” mef’ûlü ـكُمْ ile karşılaştır.',
          examples: [
            {
              arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ',
              english: 'So remember Me, and I will remember you',
              turkish: 'Beni anın, ben de sizi anayım',
              source: 'Qur’an 2:152',
            },
          ],
        },
        {
          term: 'Object: second person',
          termArabic: 'اَلْمَفْعُولُ بِهِ لِلْمُخَاطَبِ',
          english:
            'The suffix ـكَ is the object "you" (m. sg.). Here it follows the attached fāʿil ـنَا, so one verb carries a rafʿ pronoun and a naṣb pronoun.',
          turkish:
            'ـكَ eki “seni” mef’ûlüdür. Burada bitişik fâil ـنَا’dan sonra gelir; böylece bir fiil hem ref hem nasb zamiri taşır.',
          examples: [
            {
              arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
              english: 'Indeed We have given you al-Kawthar',
              turkish: 'Şüphesiz biz sana Kevser’i verdik',
              source: 'Qur’an 108:1',
            },
          ],
        },
        {
          term: 'Object versus possessive',
          termArabic: 'اَلْمَفْعُولُ بِهِ وَالْمُضَافُ إِلَيْهِ',
          english:
            'The same kāf is a naṣb pronoun on the verb (waddaʿaka, "forsaken you") and a jarr pronoun on the noun (rabbuka, "your Lord").',
          turkish:
            'Aynı kâf, fiilde nasb zamiridir (وَدَّعَكَ, “seni bıraktı”) ve isimde cer zamiridir (رَبُّكَ, “senin Rabbin”).',
          examples: [
            {
              arabic: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَى',
              english: 'Your Lord has not forsaken you, nor has He become displeased',
              turkish: 'Rabbin seni bırakmadı ve sana darılmadı',
              source: 'Qur’an 93:3',
            },
          ],
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Attached jarr pronouns (on a noun and on a ḥarf jarr)',
        turkish: 'Muttasıl cer zamirleri (isimde ve cer harfinde)',
      },
      caption: {
        english:
          'Fusha paradigm on كِتَاب (book) and بِـ (with), so the noun column reads "my book, our book, ..." and the ḥarf column "with me, with us, ...". كِتَابُ is shown in rafʿ; its own ending changes with its case, while the suffix does not. After a kasra the هُ series shifts to هِ (بِهِ, بِهِمْ).',
        turkish:
          'كِتَاب (kitap) ve بِـ (ile) üzerine kurulu fusha örnekliği; isim sütunu “kitabım, kitabımız...”, harf sütunu “benimle, bizimle...” okunur. كِتَابُ ref hâlinde gösterilmiştir; kelimenin kendi sonu duruma göre değişir, ek değişmez. Kesreden sonra هُ serisi هِ olur (بِهِ, بِهِمْ).',
      },
      columns: [
        { english: 'Pronoun', turkish: 'Zamir' },
        { english: 'On a noun', turkish: 'İsimde' },
        { english: 'On a ḥarf jarr', turkish: 'Cer harfinde' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          {
            ar: 'ـِي',
            footnote: { english: 'no protective nūn', turkish: 'nûn-u vikâye yok' },
          },
          { ar: 'كِتَابِي' },
          { ar: 'بِي' },
          { english: 'my (1st sg.)', turkish: 'benim (1. tekil)' },
        ],
        [
          { ar: 'ـنَا' },
          { ar: 'كِتَابُنَا' },
          { ar: 'بِنَا' },
          { english: 'our (1st pl.)', turkish: 'bizim (1. çoğul)' },
        ],
        [
          { ar: 'ـكَ' },
          { ar: 'كِتَابُكَ' },
          { ar: 'بِكَ' },
          { english: 'your (2nd m. sg.)', turkish: 'senin (2. tekil eril)' },
        ],
        [
          { ar: 'ـكِ' },
          { ar: 'كِتَابُكِ' },
          { ar: 'بِكِ' },
          { english: 'your (2nd f. sg.)', turkish: 'senin (2. tekil dişil)' },
        ],
        [
          { ar: 'ـكُمَا' },
          { ar: 'كِتَابُكُمَا' },
          { ar: 'بِكُمَا' },
          { english: 'your (2nd dual)', turkish: 'sizin (2. ikil)' },
        ],
        [
          { ar: 'ـكُمْ' },
          { ar: 'كِتَابُكُمْ' },
          { ar: 'بِكُمْ' },
          { english: 'your (2nd m. pl.)', turkish: 'sizin (2. çoğul eril)' },
        ],
        [
          { ar: 'ـكُنَّ' },
          { ar: 'كِتَابُكُنَّ' },
          { ar: 'بِكُنَّ' },
          { english: 'your (2nd f. pl.)', turkish: 'sizin (2. çoğul dişil)' },
        ],
        [
          { ar: 'ـهُ' },
          { ar: 'كِتَابُهُ' },
          {
            ar: 'بِهِ',
            footnote: { english: 'kasra after بِ', turkish: 'بِ’den sonra kesre' },
          },
          { english: 'his (3rd m. sg.)', turkish: 'onun (3. tekil eril)' },
        ],
        [
          { ar: 'ـهَا' },
          { ar: 'كِتَابُهَا' },
          { ar: 'بِهَا' },
          { english: 'her (3rd f. sg.)', turkish: 'onun (3. tekil dişil)' },
        ],
        [
          { ar: 'ـهُمَا' },
          { ar: 'كِتَابُهُمَا' },
          {
            ar: 'بِهِمَا',
            footnote: { english: 'kasra after بِ', turkish: 'بِ’den sonra kesre' },
          },
          { english: 'their (3rd dual)', turkish: 'o ikisinin (3. ikil)' },
        ],
        [
          { ar: 'ـهُمْ' },
          { ar: 'كِتَابُهُمْ' },
          {
            ar: 'بِهِمْ',
            footnote: { english: 'kasra after بِ', turkish: 'بِ’den sonra kesre' },
          },
          { english: 'their (3rd m. pl.)', turkish: 'onların (3. çoğul eril)' },
        ],
        [
          { ar: 'ـهُنَّ' },
          { ar: 'كِتَابُهُنَّ' },
          {
            ar: 'بِهِنَّ',
            footnote: { english: 'kasra after بِ', turkish: 'بِ’den sonra kesre' },
          },
          { english: 'their (3rd f. pl.)', turkish: 'onların (3. çoğul dişil)' },
        ],
      ],
    },
    {
      kind: 'harf',
      id: 'muttasil-jarr',
      arabic: 'ضَمَائِرُ الْجَرِّ الْمُتَّصِلَةُ',
      english: 'attached jarr pronouns: after a ḥarf jarr and after a noun',
      turkish: 'muttasıl cer zamirleri: cer harfinden ve isimden sonra',
      senses: [
        {
          term: 'After a ḥarf jarr',
          termArabic: 'بَعْدَ حَرْفِ الْجَرِّ',
          english:
            'The pronoun after a ḥarf jarr is in jarr. In إِلَيْهِ the هُ takes a kasra because the yāʾ before it carries one.',
          turkish:
            'Cer harfinden sonraki zamir cer hâlindedir. إِلَيْهِ’de هُ kesre alır, çünkü önündeki yâ kesrelidir.',
          examples: [
            {
              arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
              english: 'Indeed we belong to Allah, and indeed to Him we return',
              turkish: 'Şüphesiz biz Allah’a aitiz ve şüphesiz O’na döneceğiz',
              source: 'Qur’an 2:156',
            },
          ],
        },
        {
          term: 'On a ḥarf jarr and on a noun together',
          termArabic: 'عَلَى الْحَرْفِ وَعَلَى الِاسْمِ',
          english:
            'One āyah shows both places: لَكَ is the kāf after the ḥarf jarr lām, and صَدْرَكَ is the same kāf as muḍāf ilayh on a noun ("your breast").',
          turkish:
            'Bir âyet her iki yeri gösterir: لَكَ, lâm cer harfinden sonraki kâftır; صَدْرَكَ ise aynı kâfın isimde muzâf ileyh olmasıdır (“senin göğsün”).',
          examples: [
            {
              arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',
              english: 'Did We not expand your breast for you?',
              turkish: 'Senin göğsünü açıp genişletmedik mi?',
              source: 'Qur’an 94:1',
            },
          ],
        },
        {
          term: 'The yāʾ of the speaker on a noun',
          termArabic: 'يَاءُ الْمُتَكَلِّمِ',
          english:
            'On a noun the first person is ـِي, not ـنِي, and it holds a kasra before the yāʾ whatever the case of the noun.',
          turkish:
            'İsimde birinci şahıs eki ـنِي değil ـِي’dir ve ismin durumu ne olursa olsun yâdan önce kesre bulunur.',
          examples: [
            {
              arabic: 'إِنَّ رَبِّي غَفُورٌ رَحِيمٌ',
              english: 'Indeed my Lord is Forgiving and Merciful',
              turkish: 'Şüphesiz Rabbim çok bağışlayandır, çok merhametlidir',
              source: 'Qur’an 12:53',
            },
          ],
        },
      ],
    },
    {
      kind: 'harf',
      id: 'munfasil',
      arabic: 'اَلضَّمَائِرُ الْمُنْفَصِلَةُ',
      english: 'detached pronouns: standing as their own word',
      turkish: 'munfasıl zamirler: kendi başına duran kelime',
      senses: [
        {
          term: 'Detached rafʿ as mubtadaʾ',
          termArabic: 'اَلْمُنْفَصِلُ مُبْتَدَأً',
          english: 'A detached rafʿ pronoun opens a nominal sentence as its mubtadaʾ.',
          turkish: 'Munfasıl ref zamiri, isim cümlesini mübtedâ olarak başlatır.',
          examples: [
            {
              arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
              english: 'Say: He is Allah, the One',
              turkish: 'De ki: O, Allah’tır, birdir',
              source: 'Qur’an 112:1',
            },
          ],
        },
        {
          term: 'Separating pronoun',
          termArabic: 'ضَمِيرُ الْفَصْلِ',
          english:
            'A detached rafʿ pronoun stands between mubtadaʾ and a definite khabar to mark which is which. Here هُمْ reads هُمُ before the definite article.',
          turkish:
            'Munfasıl ref zamiri, mübtedâ ile belirli haber arasında hangisinin hangisi olduğunu göstermek için gelir. Burada هُمْ, harf-i tarîften önce هُمُ okunur.',
          examples: [
            {
              arabic: 'وَأُولَئِكَ هُمُ الْمُفْلِحُونَ',
              english: 'and it is they who are the successful',
              turkish: 've işte kurtuluşa erenler onlardır',
              source: 'Qur’an 2:5',
            },
          ],
        },
        {
          term: 'Detached naṣb before the verb',
          termArabic: 'اَلْمُنْفَصِلُ مَفْعُولًا مُقَدَّمًا',
          english:
            'The iyyā series carries the object when it is put before its verb, which also gives the sense "You alone".',
          turkish:
            'إِيَّا serisi, mef’ûl fiilinden önce getirildiğinde onu taşır; bu takdim “yalnız sana” anlamını da verir.',
          examples: [
            {
              arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
              english: 'You alone we worship, and You alone we ask for help',
              turkish: 'Yalnız sana kulluk ederiz ve yalnız senden yardım isteriz',
              source: 'Qur’an 1:5',
            },
          ],
        },
      ],
    },
    {
      kind: 'prose',
      title: {
        english: 'The matn on the object pronouns',
        turkish: 'Matn’in mef’ûl zamirleri hakkında söyledikleri',
      },
      arabic:
        'وَالْمُضْمَرُ قِسْمَانِ: مُتَّصِلٌ وَمُنْفَصِلٌ. فَالْمُتَّصِلُ اثْنَا عَشَرَ، وَهِيَ: ضَرَبَنِي، وَضَرَبَنَا، وَضَرَبَكَ، وَضَرَبَكِ، وَضَرَبَكُمَا، وَضَرَبَكُمْ، وَضَرَبَكُنَّ، وَضَرَبَهُ، وَضَرَبَهَا، وَضَرَبَهُمَا، وَضَرَبَهُمْ، وَضَرَبَهُنَّ. وَالْمُنْفَصِلُ اثْنَا عَشَرَ، وَهِيَ: إِيَّايَ، وَإِيَّانَا، وَإِيَّاكَ، وَإِيَّاكِ، وَإِيَّاكُمَا، وَإِيَّاكُمْ، وَإِيَّاكُنَّ، وَإِيَّاهُ، وَإِيَّاهَا، وَإِيَّاهُمَا، وَإِيَّاهُمْ، وَإِيَّاهُنَّ',
      paragraphs: [
        {
          english:
            'This passage is from the chapter on the mafʿūl bihi. It is where the matn names the two kinds by name, muttaṣil and munfaṣil, and gives both lists for the object. The attached list is the naṣb suffix table above; the detached list is the iyyā column of the first table.',
          turkish:
            'Bu metin mef’ûlün bih bâbındandır. Matn iki kısmı burada muttasıl ve munfasıl adlarıyla anar ve mef’ûl için iki listeyi verir. Bitişik liste yukarıdaki nasb ek tablosudur; ayrı liste ise ilk tablonun إِيَّا sütunudur.',
        },
      ],
    },
  ],
}
