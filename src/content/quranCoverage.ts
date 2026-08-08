// Figures behind the vocabulary coverage metric (GitHub issue #9).
//
// Corpus is never shipped to the app (see docs/adr/0002), so the numbers it
// yields are frozen here as content, with their provenance. They come from the
// vendored morphology under scripts/data via the coverage dump in
// scripts/generateVocab.test.ts.

/**
 * Every occurrence in the Qurʾan of a word that stands on its own: 74,685 of
 * the corpus's 104,602 lemma-tagged segments.
 *
 * The remaining 29,917 are clitics - the definite article, the conjunctions
 * wa- and fa-, the attached pronouns - which are never taught as words and so
 * are excluded from both sides of the fraction. Counting them in the
 * denominator would cap the metric at 71% no matter how much is learned.
 */
export const TOTAL_WORD_OCCURRENCES = 74685

/**
 * Occurrence counts for words taught outside the vocabulary track, whose notes
 * carry no `vocab` detail of their own. Only the Hurūf al-Khafd deck qualifies
 * today.
 *
 * Counted by exact lemma, not by skeleton: folding tashkeel away would merge
 * rubba with rabb (975 occurrences) and min with man, and silently inflate the
 * metric by thousands. rubba really does occur once, at 15:2.
 *
 * The prefixed particles of that deck (bi-, ka-, li-, and the oath particles)
 * are absent deliberately: they are clitics, so they sit outside the
 * denominator and can contribute nothing.
 */
export const OCCURRENCES_OUTSIDE_TRACK: Record<string, number> = {
  min: 3226,
  fi: 1701,
  ala: 1445,
  ila: 742,
  an: 465,
  rubba: 1,
}
