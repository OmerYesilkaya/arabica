# arabica

Personal Arabic study app. A static PWA: install it to the phone home screen,
it works offline, and each device keeps its own progress.

## Sections

- **Study** - Anki-style flashcards. One note gives one card per direction
  (Arabic → meaning, meaning → Arabic). Scheduling is real FSRS via
  [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs), with Anki
  defaults: retention 0.9, learning steps 1m/10m, 20 new cards per day,
  sibling burying.
- **Drills** - unscheduled typing practice: a meaning is shown, you type the
  Arabic. Reads content only; never touches progress.
- **Reading** - whole surahs of real Qurʾānic text, Arabic only, with no
  translation on the page. Tap a word for its meaning; tap again for its root,
  its morphology, its case or mood *with the sign named*, and a link into the
  Reference entry that teaches that feature. Words you have already learned are
  marked. Reading is stateless: it records nothing about what you read.
- **Reference** - grammar tables and charts, ordered by the Ājurrūmiyya.
  Locked entries are planned and open as the course reaches them.
- **Stats** - reviews per day, streak, retention, built from the review log.
- **Settings** - JSON backup export/import.

## Language

[CONTEXT.md](./CONTEXT.md) is the glossary: what a Note, Card, Meaning, Harf,
Review, and Study Session each mean here, and which near-synonyms to avoid.
Read it before naming anything new.

## Content rules

- All content is hardcoded in `src/content/`. To add cards or entries:
  edit the data files, commit, push. GitHub Actions deploys to Pages.
- **Sourcing priority.** When an example or any Arabic text is needed, take it
  from, in this order:
  1. the Qurʾān, cited as `surah:ayah`;
  2. hadith, cited by collection and number;
  3. plain fuṣḥā, only when no suitable Qurʾānic or hadith example exists.
  The citation goes in the `Source` field, never buried in prose.
- **Every meaning carries English and Turkish.** Both languages together are
  one Meaning; neither alone is one.
- **DRAFT until verified.** New content ships with a `DRAFT` marker in a
  file-top comment and stays DRAFT until Omer has verified it against the matn
  and a muṣḥaf. Verify every meaning before you memorize it.
- Quranic quotations are machine-checked for wording and citation:
  `pnpm exec vitest run --config scripts/vitest.citations.config.ts`.
  Re-run it after any content change.
- Progress (FSRS card state + append-only review log) lives in IndexedDB
  on the device, never in this repo.

## The reading corpus

The Reading tab is built from third-party linguistic data, not from authored
content. See
[docs/adr/0002](./docs/adr/0002-corpus-is-neither-content-nor-progress.md) for
why that is a third class rather than more Content.

- **Qurʾānic text** — the [Tanzil Project](https://tanzil.net) Uthmani text,
  used verbatim under CC BY 3.0. Its licence forbids modification, and every
  stored ayah is checked byte-for-byte against it.
- **Morphology, roots and part of speech** — the
  [Quranic Arabic Corpus](https://corpus.quran.com) v0.4 (© Kais Dukes, GPL).
- **Meanings** — taken from this repo's own vocabulary decks wherever a deck
  teaches the word, and machine-generated otherwise. Generated glosses are
  permanently unverified, marked as such in the app, and can be reported from
  the word detail; the reports ride in the JSON backup.
- **No word in the reader can ever become a flashcard.** Vocabulary reaches the
  scheduler only through the authored decks.

Both corpus files are vendored under `scripts/data` and never shipped. Two
generators read them, and neither is part of `pnpm build`:

```bash
# emits src/content/corpus/*.json for the reader; rerunning it on unchanged
# sources produces no diff
pnpm exec vitest run --config scripts/vitest.generate.config.ts

# checks that every stored ayah is verbatim Tanzil, and matches the canonical
# text independently (needs network)
pnpm exec vitest run --config scripts/vitest.citations.config.ts
```

## Planned work

Tracked in [GitHub issues](https://github.com/OmerYesilkaya/arabica/issues).

## Development

```bash
pnpm install
pnpm run dev         # dev server
pnpm exec vitest run # tests
pnpm run build       # typecheck + production build
```

The app is served under `/arabica/` (GitHub Pages project path).
