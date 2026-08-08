# Vendored corpus data

## `quran-morphology.txt`

Word-by-word morphological annotation of the Qurʾān: 130,030 segments, one per
line, tab-separated as `location`, `form`, `tag`, `features`.

- `location` is `surah:ayah:word:segment`, all 1-indexed.
- `form` is the voweled segment in muṣḥaf orthography (alef wasla `ٱ` and
  superscript alef `ٰ` appear as such).
- `features` is `|`-separated; the ones this repo uses are `LEM:` (lemma),
  `ROOT:` (triliteral root), `PREF` / `SUFF` (the segment is a clitic, not a
  standalone word), and the person/gender/number and case tags.

**Source.** The Quranic Arabic Corpus (Kais Dukes, University of Leeds),
version 0.4, via the `mustafa0x/quran-morphology` mirror. The upstream corpus
is GPL-licensed. Personal project, kept here so the vocabulary generator is
reproducible rather than having run once on someone's laptop.

**What is derived from it.** Lemma frequency, root, part of speech, inflected
forms, occurrence counts, and which ayah to quote for a given word. The
Qurʾānic text shown on cards is *not* taken from this file — it is fetched
from `api.alquran.cloud`, the same canonical source `checkCitations.test.ts`
verifies against, so generation and verification stay independent.

Used only by `scripts/generateVocab.ts`, which is a one-shot scaffold. It is
not part of the app bundle and not part of the normal test run.
