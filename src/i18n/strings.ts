import { useLang, type Lang } from '../settings/useLang'

/*
 * Every string the interface owns, in both Languages.
 *
 * Content is not here and never will be: deck names, ayat, sense terms,
 * meanings and citations are authored once under src/content and rendered
 * as-is. This file is the chrome around them.
 *
 * The Turkish prefers an Arabic root wherever a real, ordinary Turkish word
 * has one -- mana, misal, kelime, hareke, kiraat, sarf, tercume, seviye,
 * tahkik. It is not a style: the reader is learning Arabic, and a button that
 * shares a root with the thing it points at teaches while it labels. Where no
 * Arabic-rooted Turkish word survives in ordinary use -- good, easy, day,
 * export -- the ordinary Turkish word wins. Forcing a root there produces
 * something nobody says. See CLAUDE.md for the rule as it applies to Content.
 *
 * The English record is the source of truth for the shape: `Strings` is its
 * type, so the compiler holds the Turkish one to the same keys and the same
 * function signatures.
 */

const english = {
  tabs: {
    study: 'Study',
    reading: 'Reading',
    reference: 'Reference',
    stats: 'Stats',
    settings: 'Settings',
  },

  common: {
    /** BCP 47 tag, for `toLocaleString` and friends. Turkish groups with dots. */
    locale: 'en',
    close: 'Close',
    /** The label of the control that swaps the app Language. */
    langShort: 'EN',
    langSwitchTo: 'Show Türkçe',
    harakatOn: 'on',
    harakatOff: 'off',
  },

  decks: {
    title: 'Study',
    backupDue: 'Backup is due: your progress lives only on this device.',
    exportNow: 'Export now',
    locked: 'Locked',
    study: 'Study',
    done: 'Done ✓',
    countNew: (n: number) => `${n} new`,
    countLearning: (n: number) => `${n} learning`,
    countDue: (n: number) => `${n} due`,
    trackName: 'Quran Vocabulary',
    trackProgress: (level: number, total: number, percent: number) =>
      `Level ${level} of ${total} · ${percent}% known`,
    allLevels: 'All levels',
    hideLevels: 'Hide levels',
    level: (n: number) => `Level ${n}`,
    band: (from: number, to: number) => `words ${from}–${to}`,
    allKnown: (n: number) => `all ${n} known`,
    moreToOpen: (n: number) => `${n} more to open`,
  },

  study: {
    unknownDeck: 'Unknown deck.',
    deckLocked: 'This deck is locked.',
    backToDecks: 'Back to decks',
    finished: 'Session finished',
    answersToday: (n: number, deck: string) =>
      `${n} answer${n === 1 ? '' : 's'} today in ${deck}.`,
    askSense: '→ Sense',
    askMeaning: '→ Meaning',
    askArabic: '→ Arabic',
    paneMeaning: 'Meaning',
    paneExample: 'Example',
    paneSenses: 'Senses',
    paneWord: 'Word',
    fullEntry: 'ⓘ full entry',
    wordDetail: 'ⓘ word detail',
    showAnswer: 'Show answer',
    again: 'Again',
    hard: 'Hard',
    good: 'Good',
    easy: 'Easy',
    left: (n: number) => `${n} left`,
    /** Suffixes for the compact interval under a grading button. */
    units: { minute: 'm', hour: 'h', day: 'd', month: 'mo', year: 'y' },
  },

  reading: {
    title: 'Reading',
    intro:
      'Real text, Arabic only. Tap a word for its meaning and its grammar. There is no translation of an ayah anywhere here: the meanings explain words, not texts.',
    ayat: (n: number) => `${n} ayat`,
    back: '← Reading',
    hideTashkeel: 'Hide tashkeel',
    markKnown: 'Mark known words',
    notInReader: 'That surah is not in the reader yet.',
    loadFailed: 'That surah could not be loaded.',
    loading: 'Loading…',
    creditText: 'Text from',
    creditTanzil: 'the Tanzil Project',
    creditMorphology: 'Word-by-word morphology from',
    creditCorpus: 'the Quranic Arabic Corpus',
    creditTail:
      'Neither is verified by hand, and no word here can ever become a flashcard — report an error from the word detail and it rides in your next backup.',
  },

  reference: {
    title: 'Reference',
    comingSoon: '🔒 coming soon',
  },

  stats: {
    title: 'Stats',
    canRead: 'of the Qurʾan you can read',
    thisMonth: 'this month',
    coverageNote: (words: number, known: string, total: string) =>
      `${words} word${words === 1 ? '' : 's'} known, covering ${known} of ${total} word occurrences. Attached particles are excluded from both sides.`,
    reviewsToday: 'reviews today',
    newToday: 'new cards today',
    dayStreak: 'day streak',
    retention: 'retention (review cards)',
    reviewsPerDay: 'Reviews per day',
    forecast: 'Review forecast',
    activity: 'Activity',
    leeches: 'Leeches',
    leechNote: 'Cards that keep lapsing. Fix them in the deck.',
    lapses: (n: number) => `${n} lapses`,
    daysAgo30: '30 days ago',
    today: 'today',
    inDays30: 'in 30 days',
    weeksAgo26: '26 weeks ago',
    totalReviews: (n: number) => `${n} reviews all time.`,
    reviewsPerDayLabel: 'Reviews per day, last 30 days',
    forecastLabel: 'Cards due per day, next 30 days',
    activityLabel: 'Reviews per day, last 26 weeks',
  },

  settings: {
    title: 'Settings',
    language: 'Language',
    languageHint: 'Sets the interface and which meaning is shown on a card.',
    english: 'English',
    turkish: 'Türkçe',
    reading: 'Reading',
    hideTashkeel: 'Hide tashkeel',
    hideTashkeelHint: 'Vowel marks are hidden on flashcards. Reference always shows them.',
    fsrsTitle: 'FSRS parameters',
    fsrsPersonalized: 'Scheduling uses your personalized parameters.',
    fsrsDefault: 'Scheduling uses the default parameters.',
    fsrsExplain: 'Optimization learns parameters from your review history, on-device.',
    fsrsNeedsInstall:
      'Optimization runs only in the installed app (it needs a cross-origin-isolated context). Open arabica from your home screen, or reload once after install.',
    fsrsNeedsReviews: (need: number, have: number) =>
      `Needs at least ${need} reviews. You have ${have}.`,
    optimize: 'Optimize parameters',
    optimizing: 'Optimizing…',
    resetDefaults: 'Reset to defaults',
    training: (done: number, total: number) => `Training… ${done}/${total}`,
    trainingUnknown: 'Training… this can take a moment.',
    optimizeFailed: (message: string) => `Optimization failed: ${message}`,
    logLoss: 'Log-loss',
    rmse: 'RMSE',
    scoredOn: (predictions: number, reviews: number) =>
      `Scored on ${predictions} predictions from ${reviews} reviews. Lower is better.`,
    parameters: 'Parameters',
    current: 'Current',
    proposed: 'Proposed',
    applyProposed: 'Apply proposed',
    discard: 'Discard',
    confirmApply: 'Apply the proposed FSRS parameters? Future scheduling will use them.',
    confirmReset: 'Reset FSRS parameters to the defaults?',
    applied: 'Personalized parameters applied.',
    resetDone: 'Parameters reset to defaults.',
    backupTitle: 'Backup',
    backupExplain:
      'Progress lives only in this browser. Export a JSON backup regularly and keep it in iCloud Files.',
    lastExport: (date: string) => ` Last export: ${date}.`,
    neverExported: ' Never exported yet.',
    exportBackup: 'Export backup',
    exported: 'Backup exported. Save the file to iCloud Files.',
    restoreTitle: 'Restore',
    restoreExplain: 'Import a backup file. This replaces all progress on this device.',
    importBackup: 'Import backup…',
    confirmImport: (date: string, reviews: number) =>
      `Replace ALL progress on this device with the backup from ${date} (${reviews} reviews)?`,
    imported: 'Backup imported.',
    importFailed: (message: string) => `Import failed: ${message}`,
    aboutTitle: 'About',
    about: (reviews: number) =>
      `arabica · personal Arabic study. Scheduling by ts-fsrs (FSRS). ${reviews} review${reviews === 1 ? '' : 's'} recorded.`,
  },

  word: {
    detailFor: (word: string) => `Word detail for ${word}`,
    ism: 'ism (noun)',
    fil: "fi'l (verb)",
    harf: 'harf (particle)',
    root: 'Root',
    hereAs: 'Here as',
    dictionaryForm: 'Dictionary form',
    thisWord: 'This word',
    irab: 'Iʿrāb',
    known: 'known',
    occurrences: 'Occurrences',
    /** Principal-part labels, keyed by the `label` a Note's form carries. */
    forms: { mudari: 'Muḍāriʿ', masdar: 'Maṣdar', plural: 'Plural' } as Record<string, string>,
    rolePrefix: 'prefixed',
    roleStem: 'the word',
    roleSuffix: 'attached',
    grammarAndSource: 'Grammar and where it came from',
    readGrammar: 'Read the grammar that teaches this →',
    reportWrong: 'Report this word as wrong',
    reportedUndo: 'Reported as wrong — undo',
    provenanceText: 'Text from',
    provenanceMorphology: ', morphology from',
    glossFromDeck: 'The meaning is the one this app teaches on its cards.',
    glossGenerated: 'The meaning is machine-generated and unverified.',
    glossFromPerson: 'The meaning is read from the person and gender the corpus records.',
    glossNone: 'The corpus gives this word no meaning of its own.',
  },
}

export type Strings = typeof english

const turkish: Strings = {
  tabs: {
    study: 'Ders',
    reading: 'Kıraat',
    reference: 'Kavâid',
    stats: 'İstatistik',
    settings: 'Tercihler',
  },

  common: {
    locale: 'tr',
    close: 'Kapat',
    langShort: 'TR',
    langSwitchTo: 'English göster',
    harakatOn: 'açık',
    harakatOff: 'kapalı',
  },

  decks: {
    title: 'Ders',
    backupDue: 'Yedek vakti geldi: ilerlemeniz yalnız bu cihazda duruyor.',
    exportNow: 'Şimdi yedekle',
    locked: 'Kilitli',
    study: 'Çalış',
    done: 'Tamam ✓',
    countNew: (n: number) => `${n} yeni`,
    countLearning: (n: number) => `${n} talimde`,
    countDue: (n: number) => `${n} vakti geldi`,
    trackName: 'Kur’an Kelimeleri',
    trackProgress: (level: number, total: number, percent: number) =>
      `Seviye ${level} / ${total} · %${percent} malum`,
    allLevels: 'Bütün seviyeler',
    hideLevels: 'Seviyeleri gizle',
    level: (n: number) => `Seviye ${n}`,
    band: (from: number, to: number) => `${from}–${to}. kelimeler`,
    allKnown: (n: number) => `${n} kelimenin hepsi malum`,
    moreToOpen: (n: number) => `açılmasına ${n} kaldı`,
  },

  study: {
    unknownDeck: 'Bilinmeyen deste.',
    deckLocked: 'Bu deste kilitli.',
    backToDecks: 'Destelere dön',
    finished: 'Ders tamam',
    answersToday: (n: number, deck: string) => `${deck} destesinde bugün ${n} cevap.`,
    askSense: '→ Vecih',
    askMeaning: '→ Mana',
    askArabic: '→ Arapça',
    paneMeaning: 'Mana',
    paneExample: 'Misal',
    paneSenses: 'Vecihler',
    paneWord: 'Kelime',
    fullEntry: 'ⓘ tam madde',
    wordDetail: 'ⓘ kelime tafsili',
    showAnswer: 'Cevabı göster',
    again: 'Tekrar',
    hard: 'Zor',
    good: 'İyi',
    easy: 'Kolay',
    left: (n: number) => `${n} kaldı`,
    units: { minute: 'dk', hour: 'sa', day: 'g', month: 'ay', year: 'y' },
  },

  reading: {
    title: 'Kıraat',
    intro:
      'Hakiki metin, sadece Arapça. Manası ve sarfı için kelimeye dokunun. Burada hiçbir ayetin tercümesi yoktur: manalar kelimeyi izah eder, metni değil.',
    ayat: (n: number) => `${n} ayet`,
    back: '← Kıraat',
    hideTashkeel: 'Hareke gizle',
    markKnown: 'Malum kelimeleri işaretle',
    notInReader: 'Bu sûre henüz kıraatte yok.',
    loadFailed: 'Bu sûre yüklenemedi.',
    loading: 'Yükleniyor…',
    creditText: 'Metin',
    creditTanzil: 'Tanzil Project',
    creditMorphology: 'Kelime kelime sarf bilgisi',
    creditCorpus: 'Quranic Arabic Corpus',
    creditTail:
      'İkisi de elle tahkik edilmemiştir ve buradaki hiçbir kelime karta dönüşemez — hatayı kelime tafsilinden bildirin, ilk yedeğinizle beraber gelir.',
  },

  reference: {
    title: 'Kavâid',
    comingSoon: '🔒 yakında',
  },

  stats: {
    title: 'İstatistik',
    canRead: 'Kur’an’ın okuyabildiğiniz kısmı',
    thisMonth: 'bu ay',
    coverageNote: (words: number, known: string, total: string) =>
      `${words} kelime malum; ${total} kelime vukuatının ${known} tanesini kapsıyor. Bitişik harfler her iki taraftan da hariç tutulmuştur.`,
    reviewsToday: 'bugünkü tekrar',
    newToday: 'bugünkü yeni kart',
    dayStreak: 'günlük seri',
    retention: 'hıfz nispeti (tekrar kartları)',
    reviewsPerDay: 'Günlük tekrar',
    forecast: 'Tekrar tahmini',
    activity: 'Faaliyet',
    leeches: 'Sülükler',
    leechNote: 'Sürekli unutulan kartlar. Desteden düzeltin.',
    lapses: (n: number) => `${n} unutma`,
    daysAgo30: '30 gün önce',
    today: 'bugün',
    inDays30: '30 gün sonra',
    weeksAgo26: '26 hafta önce',
    totalReviews: (n: number) => `Toplam ${n} tekrar.`,
    reviewsPerDayLabel: 'Son 30 günün günlük tekrarı',
    forecastLabel: 'Önümüzdeki 30 günde vakti gelen kartlar',
    activityLabel: 'Son 26 haftanın günlük tekrarı',
  },

  settings: {
    title: 'Tercihler',
    language: 'Lisan',
    languageHint: 'Arayüzü ve kartta hangi mananın görüneceğini belirler.',
    english: 'English',
    turkish: 'Türkçe',
    reading: 'Kıraat',
    hideTashkeel: 'Hareke gizle',
    hideTashkeelHint: 'Kartlarda hareke gizlenir. Kavâid her zaman gösterir.',
    fsrsTitle: 'FSRS parametreleri',
    fsrsPersonalized: 'Planlama sizin şahsi parametrelerinizi kullanıyor.',
    fsrsDefault: 'Planlama varsayılan parametreleri kullanıyor.',
    fsrsExplain: 'Optimizasyon, parametreleri tekrar geçmişinizden cihaz üzerinde öğrenir.',
    fsrsNeedsInstall:
      'Optimizasyon yalnız kurulu uygulamada çalışır (cross-origin-isolated bir bağlam gerekir). arabica’yı ana ekranınızdan açın veya kurulumdan sonra bir kez yeniden yükleyin.',
    fsrsNeedsReviews: (need: number, have: number) =>
      `En az ${need} tekrar gerekir. Sizde ${have} var.`,
    optimize: 'Parametreleri optimize et',
    optimizing: 'Optimize ediliyor…',
    resetDefaults: 'Varsayılana döndür',
    training: (done: number, total: number) => `Talim ediliyor… ${done}/${total}`,
    trainingUnknown: 'Talim ediliyor… bu biraz sürebilir.',
    optimizeFailed: (message: string) => `Optimizasyon başarısız: ${message}`,
    logLoss: 'Log-loss',
    rmse: 'RMSE',
    scoredOn: (predictions: number, reviews: number) =>
      `${reviews} tekrardan ${predictions} tahmin üzerinde ölçüldü. Düşük olan daha iyidir.`,
    parameters: 'Parametreler',
    current: 'Mevcut',
    proposed: 'Teklif edilen',
    applyProposed: 'Teklifi uygula',
    discard: 'Vazgeç',
    confirmApply:
      'Teklif edilen FSRS parametreleri uygulansın mı? Bundan sonraki planlama bunları kullanır.',
    confirmReset: 'FSRS parametreleri varsayılana döndürülsün mü?',
    applied: 'Şahsi parametreler uygulandı.',
    resetDone: 'Parametreler varsayılana döndürüldü.',
    backupTitle: 'Yedek',
    backupExplain:
      'İlerleme yalnız bu tarayıcıda duruyor. Düzenli olarak JSON yedeği alın ve iCloud Files’ta saklayın.',
    lastExport: (date: string) => ` Son yedek: ${date}.`,
    neverExported: ' Henüz hiç yedeklenmedi.',
    exportBackup: 'Yedek al',
    exported: 'Yedek alındı. Dosyayı iCloud Files’a kaydedin.',
    restoreTitle: 'Geri yükleme',
    restoreExplain: 'Bir yedek dosyası yükleyin. Bu cihazdaki bütün ilerlemenin yerine geçer.',
    importBackup: 'Yedek yükle…',
    confirmImport: (date: string, reviews: number) =>
      `Bu cihazdaki BÜTÜN ilerleme ${date} tarihli yedekle (${reviews} tekrar) değiştirilsin mi?`,
    imported: 'Yedek yüklendi.',
    importFailed: (message: string) => `Yükleme başarısız: ${message}`,
    aboutTitle: 'Hakkında',
    about: (reviews: number) =>
      `arabica · şahsi Arapça çalışması. Planlama ts-fsrs (FSRS) ile. ${reviews} tekrar kaydedildi.`,
  },

  word: {
    detailFor: (word: string) => `${word} için kelime tafsili`,
    ism: 'isim',
    fil: 'fiil',
    harf: 'harf',
    root: 'Kök',
    hereAs: 'Burada',
    dictionaryForm: 'Sözlük şekli',
    thisWord: 'Bu kelime',
    irab: 'İrab',
    known: 'malum',
    occurrences: 'Vuku',
    forms: { mudari: 'Muzâri', masdar: 'Masdar', plural: 'Cemi' } as Record<string, string>,
    rolePrefix: 'başta',
    roleStem: 'kelime',
    roleSuffix: 'bitişik',
    grammarAndSource: 'Sarfı ve kaynağı',
    readGrammar: 'Bunu öğreten kaideyi oku →',
    reportWrong: 'Bu kelimeyi hatalı bildir',
    reportedUndo: 'Hatalı bildirildi — geri al',
    provenanceText: 'Metin',
    provenanceMorphology: ', sarf bilgisi',
    glossFromDeck: 'Mana, bu uygulamanın kartlarında öğrettiği manadır.',
    glossGenerated: 'Mana makine üretimidir ve tahkik edilmemiştir.',
    glossFromPerson: 'Mana, corpus’un kaydettiği şahıs ve cinsiyetten okunmuştur.',
    glossNone: 'Corpus bu kelimeye kendine ait bir mana vermiyor.',
  },
}

const STRINGS: Record<Lang, Strings> = { english, turkish }

/** The interface in the current Language. */
export function useStrings(): Strings {
  return STRINGS[useLang()]
}

/** The interface in a named Language, for a caller that already has one. */
export function stringsFor(lang: Lang): Strings {
  return STRINGS[lang]
}
