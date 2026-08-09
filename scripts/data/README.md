# Vendored corpus data

One vendored copy of the corpus, read by two generators. Two copies in one repo
would drift, and a drifted corpus is one where the vocabulary a deck teaches
and the morphology the reader shows disagree about the same word.

Neither file ships in the app bundle, and neither generator runs in the normal
test run or in `pnpm build`.

## `quran-morphology.txt`

Word-by-word morphological annotation of the Qurʾān: 130,030 segments, one per
line, tab-separated as `location`, `form`, `tag`, `features`.

- `location` is `surah:ayah:word:segment`, all 1-indexed.
- `form` is the voweled segment in muṣḥaf orthography (alef wasla and the
  superscript alef appear as such).
- `features` is `|`-separated; the ones this repo uses are `LEM:` (lemma),
  `ROOT:` (triliteral root), `PREF` / `SUFF` (the segment is a clitic, not a
  standalone word), `MOOD:`, `VF:` (verb form), `FAM:` (the kāna or inna
  family), and the person/gender/number and case tags.

**Source.** The Quranic Arabic Corpus (Kais Dukes, University of Leeds),
version 0.4, via the `mustafa0x/quran-morphology` mirror. The upstream corpus
is GPL-licensed. Personal project, kept here so the generators are reproducible
rather than having run once on someone's laptop.

Note that the corpus writes a shadda *before* the vowel it doubles, which is
not Unicode's canonical order. A lemma typed by hand looks identical and is
byte-different; anything matching against these strings normalizes both sides
first. What gets stored keeps the corpus's own bytes.

## `quran-uthmani.txt`

The Qurʾānic text itself: 6,236 lines of `surah|ayah|text`, followed by the
copyright block, which must stay.

**Source.** The [Tanzil Project](https://tanzil.net), Uthmani text with
pause marks, under CC BY 3.0. The licence permits verbatim copies only —
changing the text is not allowed, and is not wanted: the reader stores each
ayah exactly as it appears here, and `scripts/checkCorpus.test.ts` byte-matches
every stored ayah against this file.

Tanzil prefixes the basmala to ayah 1 of every surah but al-Fātiḥa, where it is
ayah 1 in its own right, and at-Tawba, which has none.

## What reads what

| Generator | Reads | Emits |
| --- | --- | --- |
| `scripts/generateVocab.ts` | morphology | `src/content/decks/quranVocab*.ts` |
| `scripts/generateReadingText.ts` | morphology + text | `src/content/corpus/*.json` |

`generateVocab.ts` is a one-shot scaffold: its output is hand-authored
afterwards and it is never rerun over those files. It takes the ayah shown on a
card from `api.alquran.cloud` rather than from the text here, so generation and
citation checking stay independent.

`generateReadingText.ts` is meant to be rerun. Its output is not hand-edited,
and rerunning it on unchanged sources produces no diff.
