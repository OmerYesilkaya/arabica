import type { ReferenceEntry } from '../types'

// Gender and number of the ism: mudhakkar / muannath, and mufrad / muthanna /
// jam'.
// DRAFT: verify against your textbook before relying on it.
//
// Not an Ajurrumiyya chapter. The matn has no bab on gender or number - it
// uses the five declension classes (mufrad, muthanna, the two sound plurals,
// jam' al-taksir) from bab al-i'rab onwards and expects them known. This entry
// supplies them, and sits at the position the course teaches them: second
// lesson, after huruf al-jarr. See docs/adr/0003-reference-order-is-course-order.md.
//
// Sourcing: Quran > Hadith > fusha. Every cited cell quotes a fragment of the
// ayah named in its `source`; the paradigm tables (muslim, jannah, kitab) are
// plain fusha models, not quotations, and carry no citation.
//
// Scope note for Omer: the dual's nun drops in idafa, and the plural patterns
// of jam' al-taksir have names (fu'ul, af'al, fu'ul). Neither is taught here -
// idafa has no entry yet, and the pattern names are worth nothing to a reader
// who cannot yet predict which one a word takes. What this entry claims about
// the broken plural is that it is unpredictable, which is true and useful.

export const genderAndNumber: ReferenceEntry = {
  id: 'gender-and-number',
  title: { english: 'Gender and Number', turkish: 'Cinsiyet ve Adet' },
  titleArabic: 'اَلْمُذَكَّرُ وَالْمُؤَنَّثُ وَالْمُفْرَدُ وَالْمُثَنَّى وَالْجَمْعُ',
  order: 4,
  summary: {
    english:
      'Masculine and feminine, and the singular, dual and plural of the ism — the categories the iʿrāb table already assumes.',
    turkish:
      'Müzekker ve müennes; ismin müfredi, tesniyesi ve cemisi — irab tablosunun zaten bildiğini varsaydığı kısımlar.',
  },
  sections: [
    {
      kind: 'prose',
      title: { english: 'Overview', turkish: 'Genel bakış' },
      paragraphs: [
        {
          english:
            'Every ism carries two things at once: a gender — masculine (mudhakkar) or feminine (muʾannath) — and a number — singular (mufrad), dual (muthannā) or plural (jamʿ). There is no neuter and no genderless noun. And number is a three-way choice, not the two-way one English makes: two of a thing has its own form, and putting it in the plural is an error, not a stylistic choice.',
          turkish:
            'Her isim aynı anda iki şey taşır: bir cinsiyet — eril (müzekker) veya dişil (müennes) — ve bir sayı — tekil (müfred), ikil (müsennâ / tesniye) veya çoğul (cemi). Nötr diye bir tür, cinsiyetsiz isim diye bir şey yoktur. Sayı da Türkçedeki gibi iki değil üç yönlüdür: bir şeyin ikisi için ayrı bir şekil vardır ve onu çoğul yapmak üslup tercihi değil, hatadır.',
        },
        {
          english:
            'These are not extra details on top of iʿrāb — they decide which ending a word takes. The signs table in Iʿrāb and its Signs is a list of consequences of this page: al-ism al-mufrad, al-muthannā, jamʿ al-mudhakkar al-sālim, jamʿ al-muʾannath al-sālim and jamʿ al-taksīr are five of its rows, and they are the categories named here.',
          turkish:
            'Bunlar iʿrâbın üzerine eklenen ayrıntılar değildir; kelimenin hangi sonu aldığına bunlar karar verir. “İʿrâb ve Alâmetleri”ndeki alâmet tablosu, bu sayfanın sonuçlarının listesidir: el-ismü’l-müfred, el-müsennâ, cem-i müzekker sâlim, cem-i müennes sâlim ve cem-i teksîr onun beş satırıdır ve burada tanıtılan kategorilerdir.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'The three feminine markers', turkish: 'Üç dişilik alâmeti' },
      caption: {
        english:
          'A word carrying one of these is feminine by its form (muʾannath lafẓī). The tāʾ marbūṭa is by far the commonest, and it is also what makes the feminine counterpart of a masculine word.',
        turkish:
          'Bu alâmetlerden birini taşıyan kelime, şekli itibariyle dişildir (müennes-i lafzî). Tâ-i merbûta en yaygın olanıdır ve eril bir kelimenin dişil karşılığını da o yapar.',
      },
      columns: [
        { english: 'Marker', turkish: 'Alâmet' },
        { english: 'Example', turkish: 'Örnek' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          { ar: 'ـَة', footnote: 'tāʾ marbūṭa' },
          { ar: 'مُسْلِمَةٌ' },
          {
            english: 'a Muslim woman — the feminine of muslim',
            turkish: 'müslüman kadın — muslim’in dişili',
          },
        ],
        [
          { ar: 'ـَة', footnote: 'tāʾ marbūṭa' },
          { ar: 'شَجَرَةٌ' },
          { english: 'a tree', turkish: 'ağaç' },
        ],
        [
          { ar: 'ـَى', footnote: 'alif maqṣūra' },
          { ar: 'كُبْرَى' },
          { english: 'greater, greatest (f.)', turkish: 'daha büyük, en büyük (dişil)' },
        ],
        [
          { ar: 'ـَى', footnote: 'alif maqṣūra' },
          { ar: 'بُشْرَى' },
          { english: 'good news', turkish: 'müjde' },
        ],
        [
          { ar: 'ـَاء', footnote: 'alif mamdūda' },
          {
            ar: 'صَحْرَاءُ',
            footnote: {
              english: 'also a diptote — see Iʿrāb and its Signs',
              turkish: 'aynı zamanda gayr-i munsarif — “İʿrâb ve Alâmetleri”ne bakınız',
            },
          },
          { english: 'a desert', turkish: 'çöl' },
        ],
        [
          { ar: 'ـَاء', footnote: 'alif mamdūda' },
          { ar: 'بَيْضَاءُ' },
          { english: 'white (f.)', turkish: 'beyaz (dişil)' },
        ],
      ],
    },
    {
      kind: 'table',
      title: { english: 'Feminine with no marker', turkish: 'Alâmetsiz dişiller' },
      caption: {
        english:
          'These carry no marker and no rule predicts them: they are feminine because Arabic heard them so (muʾannath samāʿī), and they must be learned word by word. The proof is always the agreement — a feminine verb or adjective beside the word. Feminine names, countries and cities behave the same way: Maryam, Miṣr, Makka.',
        turkish:
          'Bunlarda alâmet yoktur ve hiçbir kural onları öngörmez: Arapça’nın işitip böyle kullanması sebebiyle dişildirler (müennes-i semâî) ve kelime kelime öğrenilmeleri gerekir. Delil her zaman uyumdur: kelimenin yanındaki dişil fiil veya sıfat. Dişil özel isimler, ülke ve şehir adları da aynıdır: Meryem, Mısır, Mekke.',
      },
      columns: [
        { english: 'Word', turkish: 'Kelime' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'Shown by', turkish: 'Delili' },
      ],
      rows: [
        [
          { ar: 'شَمْسٌ' },
          { english: 'sun', turkish: 'güneş' },
          {
            ar: 'إِذَا الشَّمْسُ كُوِّرَتْ',
            source: 'Qur’an 81:1',
            footnote: {
              english: 'kuwwirat — feminine verb',
              turkish: 'küvviret — dişil fiil',
            },
          },
        ],
        [
          { ar: 'أَرْضٌ' },
          { english: 'earth, land', turkish: 'yer, toprak' },
          {
            ar: 'وَإِذَا الْأَرْضُ مُدَّتْ',
            source: 'Qur’an 84:3',
            footnote: {
              english: 'muddat — feminine verb',
              turkish: 'müddet — dişil fiil',
            },
          },
        ],
        [
          { ar: 'نَارٌ' },
          { english: 'fire', turkish: 'ateş' },
          {
            ar: 'لَنْ تَمَسَّنَا النَّارُ',
            source: 'Qur’an 2:80',
            footnote: {
              english: 'tamassa — feminine verb',
              turkish: 'temessü — dişil fiil',
            },
          },
        ],
        [
          { ar: 'نَفْسٌ' },
          { english: 'soul, self', turkish: 'nefis, kişi' },
          { english: 'heard feminine', turkish: 'semâî müennes' },
        ],
        [
          { ar: 'رِيحٌ' },
          { english: 'wind', turkish: 'rüzgâr' },
          { english: 'heard feminine', turkish: 'semâî müennes' },
        ],
        [
          { ar: 'دَارٌ' },
          { english: 'abode, dwelling', turkish: 'yurt, ev' },
          { english: 'heard feminine', turkish: 'semâî müennes' },
        ],
        [
          { ar: 'يَدٌ' },
          { english: 'hand', turkish: 'el' },
          {
            english: 'a paired body part — these are feminine as a group',
            turkish: 'çift olan organ — bunlar grup olarak dişildir',
          },
        ],
        [
          { ar: 'عَيْنٌ' },
          { english: 'eye; spring', turkish: 'göz; pınar' },
          {
            english: 'a paired body part',
            turkish: 'çift olan organ',
          },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'The three numbers', turkish: 'Üç sayı' },
      paragraphs: [
        {
          english:
            'The singular is the word as you learn it. The dual is regular: add -āni in rafʿ, -ayni in naṣb and khafḍ, and the ending itself is the iʿrāb sign — there is no vowel to read at the end of a dual, only the letter. The plural comes in three kinds, two of which are as regular as the dual, and one of which cannot be predicted at all.',
          turkish:
            'Tekil, kelimenin öğrendiğiniz hâlidir. İkil kurallıdır: ref hâlinde -âni, nasb ve hafd hâlinde -ayni eklenir ve bu sonun kendisi iʿrâb alâmetidir — ikilin sonunda okunacak bir hareke yoktur, yalnız harf vardır. Çoğulun üç türü vardır; ikisi ikil kadar kurallıdır, biri ise hiç öngörülemez.',
        },
        {
          english:
            'A masculine word makes its dual on the word itself; a feminine word in -a makes it on the opened tāʾ, so muslima becomes muslimatāni. The dual also drops its final nūn when the word is the first term of a possessive construction — that construction has no entry yet, so take the nūn as standard for now and expect the exception later.',
          turkish:
            'Eril kelime ikilini kendi üzerine kurar; -a ile biten dişil kelime ise açılan te üzerine kurar: muslima → muslimatâni. Ayrıca kelime bir izâfet terkibinin ilk öğesi olduğunda ikilin sonundaki nûn düşer — izâfetin henüz bir bölümü yok, o yüzden şimdilik nûnu kural sayın, istisnayı sonra bekleyin.',
        },
      ],
    },
    {
      kind: 'table',
      title: { english: 'The dual (al-muthannā)', turkish: 'İkil (el-müsennâ)' },
      caption: {
        english:
          'One ending for rafʿ and one for naṣb and khafḍ together, on masculine and feminine alike.',
        turkish:
          'Ref için bir son, nasb ve hafd için ortak bir son; eril ve dişilde aynıdır.',
      },
      columns: [
        { english: 'Singular', turkish: 'Tekil' },
        'Rafʿ',
        { english: 'Naṣb / Khafḍ', turkish: 'Nasb / Hafd' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          { ar: 'مُسْلِمٌ' },
          { ar: 'مُسْلِمَانِ' },
          { ar: 'مُسْلِمَيْنِ' },
          { english: 'two Muslim men', turkish: 'iki müslüman (erkek)' },
        ],
        [
          { ar: 'مُسْلِمَةٌ' },
          {
            ar: 'مُسْلِمَتَانِ',
            footnote: {
              english: 'the tāʾ marbūṭa opens',
              turkish: 'tâ-i merbûta açılır',
            },
          },
          { ar: 'مُسْلِمَتَيْنِ' },
          { english: 'two Muslim women', turkish: 'iki müslüman (kadın)' },
        ],
        [
          { ar: 'جَنَّةٌ' },
          { ar: 'جَنَّتَانِ', source: 'Qur’an 55:46' },
          { ar: 'جَنَّتَيْنِ', source: 'Qur’an 18:32' },
          { english: 'two gardens', turkish: 'iki cennet, iki bahçe' },
        ],
        [
          { ar: 'رَجُلٌ' },
          { ar: 'رَجُلَانِ' },
          { ar: 'رَجُلَيْنِ', source: 'Qur’an 18:32' },
          { english: 'two men', turkish: 'iki adam' },
        ],
      ],
    },
    {
      kind: 'table',
      title: { english: 'The sound plurals', turkish: 'Kurallı çoğullar' },
      caption: {
        english:
          'Sound (sālim) because the singular survives whole and the plural is an ending on it. The masculine one is for male humans and their attributes only — a handful of non-human words take it anyway (ʿālamīn, sinīn, arḍūn) and are learned as exceptions. The feminine one takes feminine words, and also pluralises a great many non-human things: āyāt, jannāt, sanawāt. Note its naṣb: kasra, not fatḥa.',
        turkish:
          'Sâlim (sağlam) denir, çünkü tekil bozulmadan kalır ve çoğul onun üzerine bir ek olur. Eril olanı yalnız erkek insanlar ve onların vasıfları içindir — birkaç insan-dışı kelime yine de bu çoğulu alır (âlemîn, sinîn, ardûn) ve istisna olarak öğrenilir. Dişil olanı dişil kelimeleri alır, ayrıca pek çok akılsız varlığı da çoğul yapar: âyât, cennât, senevât. Nasb hâline dikkat: fetha değil, kesra.',
      },
      columns: [
        { english: 'Type', turkish: 'Tür' },
        { english: 'Singular', turkish: 'Tekil' },
        'Rafʿ',
        { english: 'Naṣb / Khafḍ', turkish: 'Nasb / Hafd' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          {
            ar: 'جَمْعُ الْمُذَكَّرِ السَّالِمُ',
            footnote: { english: 'sound masc. plural', turkish: 'kurallı eril çoğul' },
          },
          { ar: 'مُؤْمِنٌ' },
          { ar: 'الْمُؤْمِنُونَ', source: 'Qur’an 23:1' },
          { ar: 'الْمُؤْمِنِينَ', source: 'Qur’an 33:35' },
          { english: 'believers', turkish: 'mü’minler' },
        ],
        [
          {
            ar: 'جَمْعُ الْمُذَكَّرِ السَّالِمُ',
            footnote: { english: 'sound masc. plural', turkish: 'kurallı eril çoğul' },
          },
          { ar: 'صَادِقٌ' },
          { ar: 'الصَّادِقُونَ' },
          { ar: 'الصَّادِقِينَ', source: 'Qur’an 33:35' },
          { english: 'the truthful', turkish: 'doğru olanlar, sâdıklar' },
        ],
        [
          {
            ar: 'جَمْعُ الْمُؤَنَّثِ السَّالِمُ',
            footnote: { english: 'sound fem. plural', turkish: 'kurallı dişil çoğul' },
          },
          { ar: 'مُسْلِمَةٌ' },
          { ar: 'الْمُسْلِمَاتُ' },
          {
            ar: 'الْمُسْلِمَاتِ',
            source: 'Qur’an 33:35',
            footnote: {
              english: 'kasra in naṣb, not fatḥa',
              turkish: 'nasbda fetha değil kesra',
            },
          },
          { english: 'Muslim women', turkish: 'müslüman kadınlar' },
        ],
        [
          {
            ar: 'جَمْعُ الْمُؤَنَّثِ السَّالِمُ',
            footnote: { english: 'sound fem. plural', turkish: 'kurallı dişil çoğul' },
          },
          { ar: 'مُؤْمِنَةٌ' },
          { ar: 'الْمُؤْمِنَاتُ' },
          { ar: 'الْمُؤْمِنَاتِ', source: 'Qur’an 33:35' },
          { english: 'believing women', turkish: 'mü’min kadınlar' },
        ],
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'The broken plural (jamʿ al-taksīr)',
        turkish: 'Kırık çoğul (cem-i teksîr)',
      },
      caption: {
        english:
          'Broken because the singular is taken apart and rebuilt: the letters stay, the vowels and often a letter or two do not. No rule takes you from the singular to it, which is why every vocabulary card in this app carries the plural beside the headword — the pair is the word to learn, not the singular. It declines like a singular noun: ḍamma, fatḥa, kasra.',
        turkish:
          'Kırık denir, çünkü tekil sökülüp yeniden kurulur: harfler kalır, harekeler ve çoğu zaman bir iki harf kalmaz. Tekilden ona götüren bir kural yoktur; bu yüzden bu uygulamadaki her kelime kartı, madde başının yanında çoğulunu da taşır — öğrenilecek olan tekil değil, çifttir. İʿrâbı tekil isim gibidir: damme, fetha, kesra.',
      },
      columns: [
        { english: 'Singular', turkish: 'Tekil' },
        { english: 'Plural', turkish: 'Çoğul' },
        { english: 'Meaning', turkish: 'Anlam' },
        { english: 'In the Qurʾān', turkish: 'Kur’an’da' },
      ],
      rows: [
        [
          { ar: 'كِتَابٌ' },
          { ar: 'كُتُبٌ' },
          { english: 'book', turkish: 'kitap' },
          { ar: 'وَكُتُبِهِ', source: 'Qur’an 2:285' },
        ],
        [
          { ar: 'رَسُولٌ' },
          { ar: 'رُسُلٌ' },
          { english: 'messenger', turkish: 'peygamber, elçi' },
          { ar: 'وَرُسُلِهِ', source: 'Qur’an 2:285' },
        ],
        [
          { ar: 'قَلْبٌ' },
          { ar: 'قُلُوبٌ' },
          { english: 'heart', turkish: 'kalp' },
          { ar: 'قُلُوبِهِمْ', source: 'Qur’an 2:7' },
        ],
        [
          { ar: 'عَيْنٌ' },
          { ar: 'عُيُونٌ' },
          { english: 'eye; spring', turkish: 'göz; pınar' },
          { ar: 'وَعُيُونٍ', source: 'Qur’an 15:45' },
        ],
        [
          { ar: 'نَهْرٌ' },
          { ar: 'أَنْهَارٌ' },
          { english: 'river', turkish: 'nehir, ırmak' },
          { ar: 'الْأَنْهَارُ', source: 'Qur’an 2:25' },
        ],
        [
          { ar: 'وَلَدٌ' },
          { ar: 'أَوْلَادٌ' },
          { english: 'child', turkish: 'çocuk, evlât' },
          { ar: 'أَوْلَادُكُمْ', source: 'Qur’an 63:9' },
        ],
        [
          { ar: 'نَبِيٌّ' },
          { ar: 'أَنْبِيَاءُ' },
          { english: 'prophet', turkish: 'peygamber, nebî' },
          { ar: 'الْأَنْبِيَاءَ', source: 'Qur’an 3:112' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: {
        english: 'A non-human plural is feminine singular',
        turkish: 'Akılsız varlıkların çoğulu dişil tekildir',
      },
      paragraphs: [
        {
          english:
            'This is the rule on this page that most changes how a page of Qurʾān reads. When a plural is of something non-human (ghayr al-ʿāqil) — books, gardens, rivers, signs — everything that agrees with it is feminine singular: the verb, the adjective, the pronoun, the demonstrative. A feminine singular verb standing beside a plural noun is therefore not an error and not a rare licence. It is the ordinary case, and reading it as a mistake is the mistake.',
          turkish:
            'Bu sayfada Kur’an okumayı en çok değiştiren kural budur. Çoğul, akıl sahibi olmayan bir şeye ait olduğunda (gayr-i âkil) — kitaplar, cennetler, nehirler, âyetler — onunla uyum sağlayan her şey dişil tekil olur: fiil, sıfat, zamir, işaret ismi. Dolayısıyla çoğul bir ismin yanındaki dişil tekil fiil ne hatadır ne de nadir bir ruhsattır. Asıl kullanım budur; onu hata sanmak hatadır.',
        },
        {
          english:
            'Human plurals keep the agreement you would expect: a masculine plural noun takes masculine plural everything. The line is human / non-human, not living / non-living — an animal plural takes the feminine singular just as a stone plural does.',
          turkish:
            'İnsan çoğulları beklediğiniz uyumu korur: eril çoğul bir isim, her şeyi eril çoğul alır. Ayrım insan / insan-dışı ayrımıdır, canlı / cansız ayrımı değil — hayvan çoğulu da taş çoğulu gibi dişil tekil alır.',
        },
      ],
    },
    {
      kind: 'table',
      title: {
        english: 'Agreement with a non-human plural',
        turkish: 'Akılsız çoğulla uyum',
      },
      columns: [
        { english: 'Qurʾān', turkish: 'Kur’an' },
        { english: 'What agrees', turkish: 'Uyum sağlayan' },
        { english: 'Meaning', turkish: 'Anlam' },
      ],
      rows: [
        [
          { ar: 'تِلْكَ آيَاتُ اللَّهِ', source: 'Qur’an 3:108' },
          {
            english: 'tilka — a feminine singular demonstrative for a plural',
            turkish: 'tilke — çoğul için dişil tekil işaret ismi',
          },
          {
            english: 'Those are the signs of Allah.',
            turkish: 'İşte bunlar Allah’ın âyetleridir.',
          },
        ],
        [
          { ar: 'تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ', source: 'Qur’an 2:25' },
          {
            english: 'tajrī — a feminine singular verb whose fāʿil is a plural',
            turkish: 'tecrî — fâili çoğul olan dişil tekil fiil',
          },
          {
            english: 'beneath which the rivers flow',
            turkish: 'altından ırmaklar akan',
          },
        ],
        [
          { ar: 'أَيَّامًا مَعْدُودَةً', source: 'Qur’an 2:80' },
          {
            english: 'maʿdūda — a feminine singular adjective on a plural noun',
            turkish: 'ma‘dûde — çoğul isme gelen dişil tekil sıfat',
          },
          { english: 'a few numbered days', turkish: 'sayılı günler' },
        ],
      ],
    },
    {
      kind: 'prose',
      title: { english: 'What to record for a new word', turkish: 'Yeni kelimede not edilecekler' },
      paragraphs: [
        {
          english:
            'Two things about an ism are not visible in the ism: its gender when no marker shows it, and its broken plural. Learn those two with the word and the rest follows — the dual and the sound plurals are endings you can apply, and the iʿrāb sign is then read off the class in Iʿrāb and its Signs.',
          turkish:
            'Bir isim hakkında ismin kendisinde görünmeyen iki şey vardır: alâmet yoksa cinsiyeti ve kırık çoğulu. Bu ikisini kelimeyle birlikte öğrenin, gerisi gelir — ikil ve kurallı çoğullar uygulayabileceğiniz eklerdir, iʿrâb alâmeti ise “İʿrâb ve Alâmetleri”ndeki türünden okunur.',
        },
        {
          english:
            'Gender and number are not only the ism’s. Verbs and pronouns carry the same categories, and the pronoun tables in Pronouns are these five categories crossed with person.',
          turkish:
            'Cinsiyet ve sayı yalnız ismin değildir. Fiiller ve zamirler de aynı kategorileri taşır; “Zamirler”deki tablolar, bu kategorilerin şahısla çarpımıdır.',
        },
      ],
    },
  ],
}
