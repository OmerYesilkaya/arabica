// Content data model. Content lives in data files under src/content only.
// Progress (FSRS state, review log) lives in IndexedDB, never here.

export type Direction = 'ar-to-meaning' | 'meaning-to-ar'

/**
 * The English and Turkish rendering of an Arabic form. Both languages together
 * are one Meaning; neither alone is. Carried by everything the learner reads:
 * Notes, Examples, Harf senses, leeches.
 */
export interface Meaning {
  english: string
  turkish: string
}

export interface Example extends Meaning {
  arabic: string
  /**
   * Optional citation for the Arabic, e.g. "Qur'an 17:1" or "Bukhārī 1".
   * Rendered subtly on the card back and in Reference.
   */
  source?: string
  /**
   * The part of each translation that renders the highlighted Arabic word, as
   * a substring of `english` and of `turkish`. The card back marks it, so the
   * learner reads the Arabic highlight and its counterpart as one pair rather
   * than searching an eight-word sentence for the word the card is about.
   *
   * Authored, not derived: no rule takes a headword to its rendering here. The
   * English is inflected by the sentence (daraba is taught bare and read as
   * "struck"), and the Turkish counterpart is usually a suffix inside a word,
   * where the span is a reading of the sentence rather than a match on it.
   *
   * A Meaning, so both languages are marked or neither is: a highlight in one
   * language beside plain prose in the other reads as the other language
   * having no counterpart, which is a claim about the translation. Omit the
   * field where a counterpart is genuinely missing — the article of "al-kitab"
   * has none in Turkish, and marking "the" alone would teach that it does.
   */
  highlight?: Meaning
}

/**
 * Sense-card metadata: the grammatical sense a per-sense card teaches, named
 * by its term. Derived from HarfSense (declared below, in the Reference
 * section) because the reference entry is where a Sense is defined — the deck
 * only names one. Renaming a field on HarfSense now breaks here rather than
 * letting the two drift apart.
 */
export type NoteSense = Pick<HarfSense, 'term' | 'termArabic'>

/** The Ājurrūmiyya's three-way division of the word. */
export type PartOfSpeech = 'ism' | 'fil' | 'harf'

/**
 * A named principal part of a word: the plural of an ism, the muḍāriʿ or
 * maṣdar of a fiʿl. Neither is predictable from the headword, so a vocabulary
 * card that omitted them would teach a word the learner cannot use.
 */
export interface VocabForm {
  /** UI label, e.g. "plural", "muḍāriʿ", "maṣdar". */
  label: string
  arabic: string
}

/**
 * Word-intrinsic detail for a vocabulary Note: what a learner may want to know
 * *about the word*, as opposed to what the card tests. Shown in the detail
 * sheet on the card back and never on the front, where the root and the forms
 * would give the meaning away. Opening the sheet is a lookup, not a hint: it
 * must not affect grading.
 */
export interface VocabDetail {
  partOfSpeech: PartOfSpeech
  /** Triliteral root. Absent for words that have none (particles, some nouns). */
  root?: string
  forms?: VocabForm[]
  /**
   * Occurrences in the Qurʾān, counting every inflected form of the lemma.
   * Read by coverage (src/srs/coverage.ts), which is the whole of its use: a
   * count beside a word the learner is trying to recall says nothing about
   * that word, so the detail sheet does not show it.
   */
  occurrences: number
  /**
   * The inflected form as it occurs in `example`, which is the token
   * highlighted there. A vocabulary card quotes an ayah containing any form of
   * the headword, not necessarily the headword itself — yadribuna teaches
   * daraba — so the form to highlight cannot be derived from `arabic`.
   */
  occurringForm: string
}

export interface Note extends Meaning {
  id: string
  arabic: string
  example?: Example
  /**
   * The bare word, set when `arabic` is a display label rather than the word
   * itself (the prefix particles, whose `arabic` names the letter, as
   * "al-ba'u" does). Named as on RefHarf, which draws the same distinction.
   * Read where a Note has to be matched against a plain occurrence of its
   * word, as the vocabulary generator does against the corpus lemmas.
   * Defaults to `arabic` when omitted.
   */
  bareForm?: string
  /** Overrides the deck-level directions for this note. */
  directions?: Direction[]
  /** Reference entry id (+ optional #anchor) opened by the (i) button. */
  referenceId?: string
  /**
   * Present on per-sense cards. The card front is the example sentence with
   * `arabic` (the harf) highlighted; the back shows the sense term and meanings.
   */
  sense?: NoteSense
  /**
   * Present on vocabulary cards. The card front is the bare headword and the
   * back carries the ayah; this is the word detail behind the sheet.
   */
  vocab?: VocabDetail
  /**
   * Cards whose notes share a sibling group bury each other for the day.
   * Defaults to the note id, so a note's own directions are always siblings.
   * Per-sense cards set this to the harf id so one sense per harf appears per day.
   */
  siblingGroup?: string
}

export interface DeckDef {
  id: string
  name: string
  nameArabic: string
  description: string
  directions: Direction[]
  newPerDay: number
  burySiblings: boolean
  notes: Note[]
  /** Locked decks are listed but cannot be studied yet ("coming soon"). */
  locked?: boolean
}

// A scheduled card is one (note, direction) pair, Anki-style.
export interface ContentCard {
  cardId: string // `${noteId}|${direction}`
  deckId: string
  note: Note
  direction: Direction
  /** Position in content order; new cards are introduced in this order. */
  ordinal: number
}

export function cardIdOf(noteId: string, direction: Direction): string {
  return `${noteId}|${direction}`
}

export function noteIdOf(cardId: string): string {
  return cardId.slice(0, cardId.lastIndexOf('|'))
}

// ---------- Reference section ----------

/**
 * A heading, column header or footnote in Reference. A bare string reads the
 * same to both readers, which is what a transliterated grammar term wants —
 * "Rafʿ" is "Rafʿ" either way. Anything said in prose is a Meaning, and the
 * reader sees the half they chose.
 */
export type RefLabel = string | Meaning

/**
 * Table cell text: a RefLabel, or Arabic.
 *
 * A prose column is one column of Meanings rather than an English column
 * beside a Turkish one. That is not only narrower — it is what CONTEXT.md
 * already says a Meaning is, so a table that split the two was describing one
 * thing as two.
 *
 * `footnote` is the small annotation beside the Arabic — a grammatical remark
 * or a variant form. Deliberately not `note`, which is the flashcard unit.
 *
 * `source` is a citation, in the same form as `Example.source`. It is kept
 * apart from `footnote` because the citation checker in `scripts/` reads it:
 * a citation hidden inside a footnote is a citation nobody verifies. It is a
 * string, not a RefLabel: a citation is the same in every language.
 */
export type RefText = RefLabel | { ar: string; footnote?: RefLabel; source?: string }

export interface RefProse {
  kind: 'prose'
  title?: RefLabel
  /** Optional Arabic source text shown above the paragraphs. */
  arabic?: string
  /** One Meaning per paragraph: the same paragraph said in either language. */
  paragraphs: Meaning[]
}

export interface RefTable {
  kind: 'table'
  title?: RefLabel
  caption?: Meaning
  columns: RefText[]
  rows: RefText[][]
}

/**
 * One grammatical function of a Harf. The origin of a Sense's identity:
 * NoteSense picks `term` and `termArabic` from here.
 */
export interface HarfSense extends Meaning {
  /** Transliterated grammar term, e.g. "Ibtidāʾ al-ghāyah". */
  term: string
  termArabic: string
  example?: Example
}

export interface RefHarf extends Meaning {
  kind: 'harf'
  /** Anchor id, matches Note.id of the deck card. */
  id: string
  arabic: string
  /**
   * The bare harf token used to highlight it inside a sense example, the
   * particle alone without the name it is listed under.
   * Falls back to `arabic` when the display form is already the bare token.
   */
  bareForm?: string
  senses: HarfSense[]
}

export type RefSection = RefProse | RefTable | RefHarf

export interface ReferenceEntry {
  id: string
  title: string
  titleArabic: string
  /** Ājurrūmiyya order. */
  order: number
  summary: string
  /** Locked entries render as "coming soon" and cannot be opened. */
  locked?: boolean
  sections: RefSection[]
}
