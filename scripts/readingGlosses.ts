// Lemma glosses for the reading corpus, keyed by the Quranic Arabic Corpus
// lemma. An input to scripts/generateReadingText.ts, not part of the app.
//
// GENERATED CONVENIENCE TEXT, PERMANENTLY UNVERIFIED. These are not Content:
// they are never verified against a dictionary the way a deck's meanings are,
// and they can never produce a Card (see docs/adr/0002). The reader shows them
// with their provenance marked so an error is attributable, and a wrong gloss
// is corrected here and the corpus regenerated.
//
// Only lemmas that no deck teaches belong here. A lemma the vocabulary track
// or the Huruf al-Khafd deck already carries takes its meaning from that Note
// instead, which is authored and verified — the generator fails if a lemma has
// neither, and warns if a lemma has both.

export interface LemmaGloss {
  english: string
  turkish: string
}

export const READING_GLOSSES: Record<string, LemmaGloss> = {
  // ---- clitics: prefixes and attached pronouns ----
  ال: { english: 'the', turkish: 'belirli tanımlık' },
  و: { english: 'and', turkish: 've' },
  ف: { english: 'so, then', turkish: 'böylece, sonra' },
  س: { english: 'will (future)', turkish: '-ecek (gelecek)' },
  أ: { english: '(question particle)', turkish: '(soru edatı)' },
  ي: { english: 'O (vocative)', turkish: 'ey (nida)' },
  // The ha of tanbih, which fronts a demonstrative and closes a vocative.
  // Not the attached pronoun, which the corpus leaves lemma-less.
  ه: { english: '(attention particle)', turkish: '(tenbih edatı)' },

  // ---- al-Fil (105) ----
  رَبّ: { english: 'lord, master', turkish: 'rab, sahip' },
  فِيل: { english: 'elephant', turkish: 'fil' },
  تَضْلِيل: { english: 'ruin, going astray', turkish: 'boşa çıkarma, sapıtma' },
  أَبابِيل: { english: 'in flocks, in successive droves', turkish: 'sürü sürü' },
  رَمَى: { english: 'to throw, to pelt', turkish: 'atmak, fırlatmak' },
  حِجارَة: { english: 'stones', turkish: 'taşlar' },
  سِجِّيل: { english: 'baked clay', turkish: 'pişmiş çamur' },
  عَصْف: { english: 'straw, chewed stubble', turkish: 'ekin yaprağı, saman' },
  مَأْكُول: { english: 'eaten', turkish: 'yenmiş' },

  // ---- Quraysh (106) ----
  إِلاف: { english: 'accustoming, covenant of security', turkish: 'alıştırma, ülfet' },
  قُرَيْش: { english: 'Quraysh', turkish: 'Kureyş' },
  رِحْلَة: { english: 'journey, caravan', turkish: 'yolculuk, kervan' },
  شِتاء: { english: 'winter', turkish: 'kış' },
  صَيْف: { english: 'summer', turkish: 'yaz' },
  أَطْعَمَ: { english: 'to feed', turkish: 'doyurmak, yedirmek' },
  جُوع: { english: 'hunger', turkish: 'açlık' },

  // ---- al-Maun (107) ----
  يَدُعُّ: { english: 'to drive away harshly', turkish: 'itip kakmak' },
  يَحُضُّ: { english: 'to urge, to encourage', turkish: 'teşvik etmek' },
  مُصَلّي: { english: 'one who prays', turkish: 'namaz kılan' },
  ساهي: { english: 'heedless, neglectful', turkish: 'gafil, yanılan' },
  يُراءُ: { english: 'to show off, to be seen doing', turkish: 'gösteriş yapmak' },
  مَنَعَ: { english: 'to withhold, to refuse', turkish: 'esirgemek, engellemek' },
  ماعُون: { english: 'small kindnesses, common necessities', turkish: 'ufak yardım, mâûn' },

  // ---- al-Kawthar (108) ----
  أَعْطَى: { english: 'to give, to grant', turkish: 'vermek, bahşetmek' },
  كَوْثَر: { english: 'al-Kawthar, abundance', turkish: 'Kevser, bolluk' },
  صَلَّى: { english: 'to pray', turkish: 'namaz kılmak' },
  انْحَرْ: { english: 'to sacrifice', turkish: 'kurban kesmek' },
  شانِئ: { english: 'hater, enemy', turkish: 'düşman, buğzeden' },
  أَبْتَر: { english: 'cut off, without offspring', turkish: 'soyu kesik, ebter' },

  // ---- al-Kafirun (109) ----
  عابِد: { english: 'worshipper', turkish: 'kulluk eden, ibadet eden' },

  // ---- an-Nasr (110) ----
  فَتْح: { english: 'conquest, opening', turkish: 'fetih, açılış' },
  فَوْج: { english: 'crowd, throng', turkish: 'bölük, grup' },
  تَوّاب: { english: 'ever-accepting of repentance', turkish: 'tövbeleri çokça kabul eden' },

  // ---- al-Masad (111) ----
  تَبَّ: { english: 'to perish, to be ruined', turkish: 'kurumak, helak olmak' },
  لَهَب: { english: 'flame', turkish: 'alev' },
  يَصْلَى: { english: 'to burn in, to be roasted in', turkish: 'yaslanmak, yanmak' },
  حَمّالَة: { english: 'carrier, bearer', turkish: 'taşıyıcı' },
  حَطَب: { english: 'firewood', turkish: 'odun' },
  جِيد: { english: 'neck', turkish: 'boyun' },
  حَبْل: { english: 'rope', turkish: 'ip' },
  مَسَد: { english: 'twisted palm fibre', turkish: 'bükülmüş lif, hurma ipi' },

  // ---- al-Ikhlas (112) ----
  صَمَد: { english: 'the Eternal Refuge, the Self-Sufficient', turkish: 'Samed, hiçbir şeye muhtaç olmayan' },
  وَلَدَ: { english: 'to beget, to give birth', turkish: 'doğurmak' },
  كُفُو: { english: 'equal, comparable', turkish: 'denk, eş' },

  // ---- al-Falaq (113) ----
  عُذْ: { english: 'to seek refuge', turkish: 'sığınmak' },
  فَلَق: { english: 'daybreak', turkish: 'şafak, tan' },
  غاسِق: { english: 'darkness, night as it settles', turkish: 'karanlık, çöken gece' },
  وَقَبَ: { english: 'to settle in, to grow dark', turkish: 'çökmek, bastırmak' },
  نَفّاثَة: { english: 'those who blow on knots', turkish: 'düğümlere üfleyenler' },
  عُقْدَة: { english: 'knot', turkish: 'düğüm' },
  حاسِد: { english: 'envier', turkish: 'hasetçi, kıskanan' },
  حَسَدَ: { english: 'to envy', turkish: 'haset etmek, kıskanmak' },

  // ---- an-Nas (114) ----
  مَلِك: { english: 'king, sovereign', turkish: 'melik, hükümdar' },
  وَسْواس: { english: 'the whisperer', turkish: 'vesvese veren' },
  خَنّاس: { english: 'the one who withdraws', turkish: 'sinsice geri çekilen' },
  وَسْوَسَ: { english: 'to whisper', turkish: 'vesvese vermek' },
  جِنَّة: { english: 'jinn', turkish: 'cinler' },
}
