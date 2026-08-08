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
