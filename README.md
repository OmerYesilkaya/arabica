# arabica

Personal Arabic study app. A static PWA: install it to the phone home screen,
it works offline, and each device keeps its own progress.

## Sections

- **Study** - Anki-style flashcards. One note gives one card per direction
  (Arabic → meaning, meaning → Arabic). Scheduling is real FSRS via
  [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs), with Anki
  defaults: retention 0.9, learning steps 1m/10m, 20 new cards per day,
  sibling burying.
- **Reference** - grammar tables and charts, ordered by the Ājurrūmiyya.
  Locked entries are planned and open as the course reaches them.
- **Stats** - reviews per day, streak, retention, built from the review log.
- **Settings** - JSON backup export/import.

## Content rules

- All content is hardcoded in `src/content/`. To add cards or entries:
  edit the data files, commit, push. GitHub Actions deploys to Pages.
- Content files are drafts until verified against a textbook.
  Verify every gloss before you memorize it.
- Progress (FSRS card state + append-only review log) lives in IndexedDB
  on the device, never in this repo.

## Development

```bash
pnpm install
pnpm run dev         # dev server
pnpm exec vitest run # tests
pnpm run build       # typecheck + production build
```

The app is served under `/arabica/` (GitHub Pages project path).
