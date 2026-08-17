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

  // ---- al-Balad (90) ----
  بَلَد: { english: 'city, land', turkish: 'belde, şehir' },
  حِلّ: { english: 'free, lawful to dwell in', turkish: 'helâl, serbest' },
  والِد: { english: 'a father, one who begets', turkish: 'baba, vâlid' },
  كَبَد: { english: 'hardship, toil', turkish: 'zorluk, meşakkat' },
  لُبَد: { english: 'abundant, heaped up', turkish: 'çok, yığın yığın' },
  شَفَتَيْن: { english: 'the two lips', turkish: 'iki dudak' },
  نَجْدَيْن: { english: 'the two highways', turkish: 'iki yol, iki tepe' },
  اقْتَحَمَ: { english: 'to storm, to rush into', turkish: 'atılmak, göze almak' },
  عَقَبَة: { english: 'steep path, mountain pass', turkish: 'sarp yokuş, geçit' },
  فَكّ: { english: 'freeing, setting loose', turkish: 'çözme, azat etme' },
  رَقَبَة: { english: 'a neck; a slave to be freed', turkish: 'boyun; köle' },
  إِطْعام: { english: 'feeding, giving food', turkish: 'doyurma, yemek verme' },
  مَسْغَبَة: { english: 'hunger, famine', turkish: 'kıtlık, açlık' },
  مَقْرَبَة: { english: 'kinship, near relation', turkish: 'yakınlık, akrabalık' },
  مَتْرَبَة: { english: 'destitution, dust of poverty', turkish: 'sefalet, yoksulluk' },
  تَواصَ: { english: 'to enjoin one another', turkish: 'birbirine tavsiye etmek' },
  مَرْحَمَة: { english: 'mercy, compassion', turkish: 'merhamet, acıma' },
  مَيْمَنَة: { english: 'the right hand, blessedness', turkish: 'sağ yan, meymenet' },
  مَشْأَمَة: { english: 'the left hand, ill fortune', turkish: 'sol yan, uğursuzluk' },
  مُؤْصَدَة: { english: 'closed over, shut in', turkish: 'üzerine kapatılmış' },

  // ---- ash-Shams (91) ----
  ضُحًى: { english: 'morning brightness', turkish: 'kuşluk vakti' },
  جَلَّى: { english: 'to make clear, to display', turkish: 'ortaya çıkarmak, aydınlatmak' },
  غَشِيَ: { english: 'to cover, to envelop', turkish: 'bürümek, örtmek' },
  بَنَى: { english: 'to build', turkish: 'bina etmek, kurmak' },
  طَحَى: { english: 'to spread out', turkish: 'yayıp döşemek' },
  سَوَّى: { english: 'to fashion evenly, to proportion', turkish: 'düzgün yaratmak, biçim vermek' },
  أَلْهَمَ: { english: 'to inspire', turkish: 'ilham etmek' },
  فُجُور: { english: 'wickedness, transgression', turkish: 'kötülük, azgınlık' },
  مَن: { english: 'who, whoever', turkish: 'kim, her kim' },
  زَكَّى: { english: 'to purify', turkish: 'arındırmak, temizlemek' },
  خابَ: { english: 'to fail, to be ruined', turkish: 'hüsrana uğramak, kaybetmek' },
  دَسَّى: { english: 'to corrupt, to stunt', turkish: 'kötülüğe gömmek, alçaltmak' },
  طَغْوَى: { english: 'transgression, insolence', turkish: 'azgınlık, taşkınlık' },
  انۢبَعَثَ: { english: 'to be roused, to set out', turkish: 'harekete geçmek, kalkışmak' },
  أَشْقَى: { english: 'most wicked', turkish: 'en azgın, en bedbaht' },
  ناقَة: { english: 'she-camel', turkish: 'dişi deve' },
  سُقْيا: { english: 'her drink, watering turn', turkish: 'su içme sırası, sulama' },
  عَقَرَ: { english: 'to hamstring, to slaughter', turkish: 'boğazlamak, kesmek' },
  دَمْدَمَ: { english: 'to crush utterly', turkish: 'başlarına yıkmak, helâk etmek' },
  عُقْبَى: { english: 'outcome, consequence', turkish: 'akıbet, son' },

  // ---- al-Layl (92) ----
  تَجَلَّى: { english: 'to appear, to shine forth', turkish: 'tecelli etmek, ortaya çıkmak' },
  سَعْي: { english: 'striving, endeavour', turkish: 'gayret, çabalama' },
  شَتَّى: { english: 'diverse, various', turkish: 'çeşitli, muhtelif' },
  صَدَّقَ: { english: 'to affirm as true', turkish: 'tasdik etmek, doğrulamak' },
  يَسَّرَ: { english: 'to make easy', turkish: 'kolaylaştırmak' },
  يُسْرَى: { english: 'the easy path, ease', turkish: 'kolaylık yolu' },
  بَخِلَ: { english: 'to be stingy, to withhold', turkish: 'cimrilik etmek, esirgemek' },
  اسْتَغْنَى: { english: 'to think oneself self-sufficient', turkish: 'kendini muhtaç saymamak' },
  عُسْرَى: { english: 'the hard path, hardship', turkish: 'zorluk yolu' },
  تَرَدَّى: { english: 'to fall to ruin', turkish: 'yıkıma düşmek, tepetaklak gitmek' },
  تَلَظَّى: { english: 'to blaze', turkish: 'alevlenmek, kızgın yanmak' },
  يُجَنَّبُ: { english: 'to be kept away from', turkish: 'uzak tutulmak' },
  أَتْقَى: { english: 'most God-fearing', turkish: 'en müttaki, en çok sakınan' },
  تَزَكَّى: { english: 'to purify oneself', turkish: 'arınmak, temizlenmek' },
  ابْتِغاء: { english: 'seeking, pursuit', turkish: 'arama, talep etme' },
  أَعْلَى: { english: 'highest, most exalted', turkish: 'en yüce, âlâ' },

  // ---- ad-Duha (93) ----
  سَجَى: { english: 'to grow still, to fall quiet', turkish: 'sükûna ermek, dinmek' },
  وَدَّعَ: { english: 'to forsake, to take leave of', turkish: 'terk etmek, bırakmak' },
  قَلَى: { english: 'to detest, to abandon in anger', turkish: 'darılmak, terk etmek' },
  آوَى: { english: 'to give shelter', turkish: 'barındırmak, sığındırmak' },
  ضالّ: { english: 'astray, not knowing the way', turkish: 'şaşırmış, yolunu bilmez' },
  عائِل: { english: 'poor, in need', turkish: 'yoksul, muhtaç' },
  تَقْهَرْ: { english: 'to oppress, to treat harshly', turkish: 'ezmek, hor görmek' },
  سائِل: { english: 'one who asks, a beggar', turkish: 'isteyen, dilenen' },
  تَنْهَرْ: { english: 'to rebuff, to scold away', turkish: 'azarlamak, kovmak' },
  تُحَدِّثُ: { english: 'to speak of, to recount', turkish: 'bahsetmek, anlatmak' },

  // ---- ash-Sharh (94) ----
  شَرَحَ: { english: 'to open wide, to expand', turkish: 'açmak, ferahlatmak' },
  وِزْر: { english: 'burden, load', turkish: 'yük, ağırlık' },
  أَنقَضَ: { english: 'to weigh down, to burden heavily', turkish: 'belini bükmek, ağır gelmek' },
  ظَهْر: { english: 'back', turkish: 'sırt, arka' },
  عُسْر: { english: 'hardship', turkish: 'zorluk, güçlük' },
  يُسْر: { english: 'ease', turkish: 'kolaylık' },
  فَرَغْ: { english: 'to be free of a task, to finish', turkish: 'işini bitirmek, boşalmak' },
  نُصِبَتْ: { english: 'to strive hard, to toil', turkish: 'gayretle çalışmak, yorulmak' },
  يَرْغَبُ: { english: 'to turn with longing, to desire', turkish: 'rağbet etmek, yönelmek' },

  // ---- at-Tin (95) ----
  تِين: { english: 'fig', turkish: 'incir' },
  زَيْتُون: { english: 'olive', turkish: 'zeytin' },
  طُور: { english: 'mount', turkish: 'dağ, Tûr' },
  سِينِين: { english: 'Sinai', turkish: 'Sînâ' },
  أَمِين: { english: 'secure, safe', turkish: 'emin, güvenli' },
  تَقْوِيم: { english: 'form, proportioning', turkish: 'suret, düzgün biçim' },
  أَسْفَل: { english: 'lowest', turkish: 'en aşağı, esfel' },
  سافِل: { english: 'low, base', turkish: 'aşağı, alçak' },
  مَمْنُون: { english: 'cut off, withheld', turkish: 'kesilen, eksiltilen' },
  أَحْكَم: { english: 'most just in judgement', turkish: 'en iyi hüküm veren, hakîm' },
  حاكِم: { english: 'judge', turkish: 'hâkim, hüküm veren' },

  // ---- al-Alaq (96) ----
  عَلَق: { english: 'a clinging form, clot', turkish: 'asılıp tutunan, kan pıhtısı' },
  أَكْرَم: { english: 'most generous', turkish: 'en kerîm, en cömert' },
  قَلَم: { english: 'pen', turkish: 'kalem' },
  طَغَى: { english: 'to transgress, to overstep', turkish: 'azmak, taşkınlık etmek' },
  رُجْعَى: { english: 'the return', turkish: 'dönüş' },
  نَسْفَعًۢ: { english: 'to seize and drag', turkish: 'alnından tutup sürüklemek' },
  ن: { english: '(emphatic nun)', turkish: '(tekit nûnu)' },
  ناصِيَة: { english: 'forelock', turkish: 'perçem, alın' },
  خاطِئَة: { english: 'sinful, lying', turkish: 'hatalı, günahkâr' },
  نادِي: { english: 'assembly, council', turkish: 'meclis, topluluk' },
  زَبانِيَة: { english: 'the guards of hell', turkish: 'zebaniler' },
  اقْتَرَبَ: { english: 'to draw near', turkish: 'yaklaşmak, yakın olmak' },

  // ---- al-Qadr (97) ----
  لَيْلَة: { english: 'night', turkish: 'gece' },
  قَدْر: { english: 'decree, measure, worth', turkish: 'kadir, takdir, değer' },
  أَلْف: { english: 'a thousand', turkish: 'bin' },
  تَنَزَّلَتْ: { english: 'to descend', turkish: 'inmek, nazil olmak' },
  مَطْلَع: { english: 'the rising, the break of dawn', turkish: 'doğuş vakti' },
  فَجْر: { english: 'dawn', turkish: 'fecir, tan vakti' },

  // ---- al-Bayyina (98) ----
  مُنفَكّ: { english: 'parting, giving up', turkish: 'ayrılan, vazgeçen' },
  صُحُف: { english: 'scriptures, written leaves', turkish: 'sahifeler, yazılı sayfalar' },
  مُطَهَّرَة: { english: 'purified', turkish: 'tertemiz kılınmış' },
  قَيِّمَة: { english: 'upright, true', turkish: 'dosdoğru, sağlam' },
  تَفَرَّقَ: { english: 'to split into factions', turkish: 'ayrılığa düşmek, bölünmek' },
  مُخْلِص: { english: 'sincere, devoting worship purely', turkish: 'ihlâslı, samimi' },
  حَنِيف: { english: 'upright in faith, hanif', turkish: 'hanîf, dosdoğru inanan' },
  بَرِيَّة: { english: 'creation, created beings', turkish: 'mahlûkat, yaratılmışlar' },
  عَدْن: { english: 'Eden', turkish: 'Adn' },

  // ---- az-Zalzala (99) ----
  زُلْزِلُ: { english: 'to be shaken', turkish: 'sarsılmak, zelzeleye tutulmak' },
  زِلْزال: { english: 'earthquake, shaking', turkish: 'zelzele, sarsıntı' },
  ثَقَل: { english: 'burden, weight', turkish: 'ağırlık, yük' },
  أَخْبار: { english: 'news, tidings', turkish: 'haberler' },
  يَصْدُرُ: { english: 'to come forth, to issue', turkish: 'çıkmak, ortaya çıkmak' },
  أَشْتات: { english: 'in scattered groups', turkish: 'bölük bölük, dağınık' },
  مِثْقال: { english: 'the weight of', turkish: 'ağırlığınca, tartısı' },
  ذَرَّة: { english: 'a speck, a mote', turkish: 'zerre' },

  // ---- al-Adiyat (100) ----
  عادِيَة: { english: 'charging steed', turkish: 'koşan at' },
  ضَبْح: { english: 'panting', turkish: 'soluyarak, nefes nefese' },
  مُورِيَة: { english: 'striking sparks', turkish: 'kıvılcım çıkaran' },
  قَدْح: { english: 'striking of hooves', turkish: 'çakma, vuruş' },
  مُغِيرَة: { english: 'raiding at dawn', turkish: 'akın eden, saldıran' },
  صُبْح: { english: 'morning', turkish: 'sabah' },
  أَثارُ: { english: 'to stir up', turkish: 'kaldırmak, savurmak' },
  نَقْع: { english: 'dust', turkish: 'toz' },
  وَسَطْ: { english: 'to plunge into the middle', turkish: 'ortasına dalmak' },
  جَمْع: { english: 'a host, a gathering', turkish: 'topluluk, cemaat' },
  كَنُود: { english: 'ungrateful', turkish: 'nankör, iyilik bilmez' },
  حُبّ: { english: 'love', turkish: 'sevgi, muhabbet' },
  بُعْثِرَ: { english: 'to be turned out, to be scattered', turkish: 'deşilip çıkarılmak' },
  قَبْر: { english: 'grave', turkish: 'kabir, mezar' },
  حُصِّلَ: { english: 'to be brought out, to be laid bare', turkish: 'ortaya çıkarılmak, derlenmek' },

  // ---- al-Qaria (101) ----
  قارِعَة: { english: 'the striking calamity', turkish: 'çarpan âfet, kâria' },
  فَراش: { english: 'moths', turkish: 'kelebekler, pervaneler' },
  مَبْثُوث: { english: 'scattered', turkish: 'dağılmış, savrulmuş' },
  عِهْن: { english: 'wool', turkish: 'yün' },
  مَنفُوش: { english: 'carded, fluffed', turkish: 'atılmış, didiklenmiş' },
  ثَقُلَتْ: { english: 'to be heavy', turkish: 'ağır gelmek, ağırlaşmak' },
  عِيشَة: { english: 'life, living', turkish: 'yaşayış, hayat' },
  راضِيَة: { english: 'pleasing, contenting', turkish: 'hoşnut, razı olunan' },
  خَفَّتْ: { english: 'to be light', turkish: 'hafif gelmek' },
  هاوِيَة: { english: 'the abyss', turkish: 'uçurum, cehennem çukuru' },
  حامِيَة: { english: 'blazing hot', turkish: 'kızgın, harlı ateş' },

  // ---- at-Takathur (102) ----
  أَلْهَى: { english: 'to distract, to divert', turkish: 'oyalamak, meşgul etmek' },
  تَكاثُر: { english: 'rivalry in amassing more', turkish: 'çoğaltma yarışı, tekâsür' },
  زُرْ: { english: 'to visit', turkish: 'ziyaret etmek' },
  مَقابِر: { english: 'graves', turkish: 'kabirler, mezarlar' },
  يَقِين: { english: 'certainty', turkish: 'yakîn, kesin bilgi' },

  // ---- al-Asr (103) ----
  عَصْر: { english: 'the passing time, late afternoon', turkish: 'asır, ikindi vakti' },
  خُسْر: { english: 'loss', turkish: 'hüsran, ziyan' },

  // ---- al-Humaza (104) ----
  هُمَزَة: { english: 'a slanderer, a backbiter', turkish: 'çekiştiren, gıybetçi' },
  لُمَزَة: { english: 'a fault-finder, a mocker', turkish: 'ayıplayan, alay eden' },
  عَدَّدَ: { english: 'to count over, to tally up', turkish: 'sayıp durmak, biriktirmek' },
  أَخْلَدَ: { english: 'to make everlasting', turkish: 'ebedî kılmak, kalıcı yapmak' },
  نَبَذَ: { english: 'to cast, to hurl', turkish: 'atmak, fırlatmak' },
  حُطَمَة: { english: 'the crusher', turkish: 'hutame, kırıp döken ateş' },
  مُوقَدَة: { english: 'kindled', turkish: 'tutuşturulmuş, yakılmış' },
  طَلَعَ: { english: 'to rise over, to reach up to', turkish: 'yükselip sarmak, çıkmak' },
  عَمَد: { english: 'columns, pillars', turkish: 'direkler, sütunlar' },
  مُمَدَّدَة: { english: 'extended, outstretched', turkish: 'uzatılmış' },
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
