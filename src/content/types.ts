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
 * A Sense named by its term, with nothing else about it. Derived from
 * HarfSense (declared below, in the Reference section) because the reference
 * entry is where a Sense is defined — the deck only names one. Renaming a
 * field on HarfSense now breaks here rather than letting the two drift apart.
 */
export type SenseRef = Pick<HarfSense, 'term' | 'termArabic'>

/** Sense-card metadata: the grammatical sense a per-sense card teaches. */
export interface NoteSense extends SenseRef {
  /**
   * The Harf this Sense belongs to, by its Reference Entry anchor id.
   *
   * A Sense is a function *of a word*, and things outside the deck need the
   * word: the reading corpus glosses a tapped harf from its entry rather than
   * from whichever sense card happens to teach it, because "Containment in
   * place or time" is a definition and a reader wants "in, inside".
   */
  harfId: string
  /**
   * The Harf's other Senses, shown on the card back beneath the answer.
   *
   * Sense boundaries are learned by contrast. "This one and not those" is the
   * judgement the card asks for, and a back that names only the answer never
   * shows the learner what the alternatives were — so a wrong answer teaches
   * that the right one exists, and nothing about why it beat the others.
   *
   * Empty for a Harf with a single Sense, where there is nothing to contrast.
   */
  contrast: SenseRef[]
}

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
   * The stimulus pool of a per-sense card: several sentences carrying the same
   * Sense, one shown per review.
   *
   * A single example turns a Sense card into an item card. After a few reps the
   * learner recognises the sentence and answers from that rather than from the
   * grammar — the card then teaches the sentence and not the Sense it names.
   * Rotating the stimulus is what makes it test the skill on its front.
   *
   * Separate from `example`, which is one sentence authored for one word: a
   * vocabulary card quotes the ayah its Note was written from, and rotating
   * that would mean rewriting the Note. Read both through `exampleOf`.
   */
  examples?: Example[]
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

/**
 * The Example to show for a Note on a card answered `reps` times: the pool
 * rotated by the review count, or the one authored example.
 *
 * Deterministic rather than random, for two reasons. The front and the back of
 * one card must show the same sentence, and they are rendered from separate
 * reads of the same state. And a learning card that comes back inside a
 * session should move on to the next sentence rather than repeat the one just
 * answered, which a review count gives for free.
 */
export function exampleOf(note: Note, reps: number): Example | undefined {
  const pool = note.examples
  if (pool && pool.length > 0) return pool[reps % pool.length]
  return note.example
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
  /**
   * Sentences carrying this Sense, best first. Never empty: a Sense with no
   * example cannot be shown in Reference and cannot be taught, so an author
   * who has not found one yet has not finished writing the Sense.
   *
   * A list rather than one sentence because the Sense card rotates through it
   * — see `Note.examples`. Reference shows them all.
   */
  examples: Example[]
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
  /**
   * Course order: the order the entries are taught in, which follows the
   * Ājurrūmiyya wherever the matn has a chapter and interleaves the entries it
   * has none for where they are needed. Not the matn's own sequence — see
   * docs/adr/0003-reference-order-is-course-order.md.
   */
  order: number
  summary: string
  /** Locked entries render as "coming soon" and cannot be opened. */
  locked?: boolean
  sections: RefSection[]
}
