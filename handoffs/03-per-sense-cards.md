# Task: Per-sense cards for Ḥurūf al-Khafḍ (ISSUES.md issue 3)

Self-contained brief for one agent session. Read HANDOFF.md and ISSUES.md
issue 3 in the repo root before you change anything. This task writes
Arabic content; the content rules below are hard requirements.

## Setup

Work on a dedicated branch. If other tasks run in parallel, use a worktree:

```bash
git worktree add ../arabica-per-sense-cards -b feat/per-sense-cards
```

Otherwise: `git checkout -b feat/per-sense-cards`.

## Content rules (hard)

- SOURCING PRIORITY for every Arabic example: 1) Quran (cite surah:ayah),
  2) Hadith (cite collection and number), 3) plain fusha only as fallback.
- DRAFT-THEN-VERIFY: all Arabic/English/Turkish content you write is a
  DRAFT until Omer verifies it against his textbook. Mark drafts in code
  comments and say so in your report. A wrong gloss in an SRS teaches the
  error permanently.
- Be extremely careful with Quranic text: full tashkeel, exact wording.
  If you are not certain of the exact text of an ayah, use a shorter
  well-known one or fall back to fusha. Never guess.
- Every example carries English and Turkish glosses.

## Scope

Implement exactly ISSUES.md issue 3.

Key points (full criteria in ISSUES.md):

- New deck generated from `RefHarf.senses` in
  src/content/reference/hurufAlKhafd.ts. Single source of truth: do not
  duplicate sense text in the deck file.
- Add an optional `source` field to `Example` in src/content/types.ts;
  render it subtly on the card back and in Reference.
- Card front: the example sentence in Arabic with the harf highlighted.
  Card back: sense term (Arabic + transliteration), EN + TR gloss, and the
  example glosses. Direction: ar-to-meaning only.
- (i) button links to the harf's anchor in the reference entry.
- Every sense of at least مِنْ، إِلَى، عَنْ، عَلَى، فِي gets an example,
  sourced per the priority above, citation in the data.
- The deck ships locked/disabled until Omer confirms he moved past first
  meanings. The existing deck and its scheduling state must be unaffected.
- Sibling burying groups the senses of one harf (one new sense per harf
  per day). See cardsOfDeck in src/content/decks/index.ts and burySiblings
  in src/srs/engine.ts.

## Verify, commit, report

```bash
pnpm exec vitest run
pnpm run lint
pnpm run build
```

All must pass. Add tests for deck generation and sibling grouping.
Commit on feat/per-sense-cards with a plain message. Never add a
Co-Authored-By or any Claude/Anthropic attribution line. Do not push;
Omer merges after review.

Report tersely: files changed, test/lint/build results, and a list of
EVERY example added or replaced with its source citation so Omer can
verify, plus any sense where you fell back to fusha and why.
Plain English, no em dashes.
