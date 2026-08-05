# arabica — Agent Handoff

Read this before you change anything. It records the decisions Omer made,
the invariants that protect them, and where the project goes next.

## What this is

A personal Arabic study app for Omer (and, casually, his family). One goal:
useful, simple, fast. It is a static PWA installed on an iPhone home screen.
There is no backend, no accounts, no analytics, and there never will be
unless Omer decides otherwise.

## Decision log (agreed 2026-08-05, do not relitigate without Omer)

| Decision | Choice | Why |
|---|---|---|
| Platform | PWA, not native | Omer uses an iPhone daily, has no Apple Developer account, and will not pay 99 USD/yr. Sideloading expires weekly. |
| Anki scope | "Level 1": Anki review experience only | No .apkg import, no AnkiWeb sync. Cards live in our own format. |
| Scheduler | ts-fsrs, Anki-compatible defaults | Never reimplement scheduling. Retention 0.9, fuzz on, learning steps 1m/10m, 20 new/day, bury siblings. |
| Content | Hardcoded in `src/content/`, repo-only | No in-app editor, no capture inbox. New cards enter by commit + push. Curation before memorization is a feature. |
| Card design | Minimum information principle | One card per (note, direction). Extensive senses live in Reference, reached from the card back via the (i) button. |
| Languages | Every gloss in English AND Turkish | Omer studies through both. |
| Arabic text | Full tashkeel, bundled Noto Naskh Arabic, no transliteration | Learner needs vowels; transliteration is a crutch. A hide-tashkeel toggle and more fonts are planned, not built. |
| Storage | Dexie/IndexedDB, 3 tables | `cardState`, `reviewLog` (append-only), `meta`. Progress never enters git. |
| Backup | Manual JSON export, monthly reminder banner | No sync backend, by explicit choice. |
| Hosting | Public repo, GitHub Pages, HashRouter | Free, zero infrastructure. Base path `/arabica/`. |
| Sharing | Send the URL | Content identical for everyone; progress fresh per device. |
| Curriculum | Ājurrūmiyya | Reference entries are ordered by it; locked "coming soon" rows mark the roadmap. |
| Stack | Vite + React + TypeScript + pnpm | Zustand allowed only when a real need appears (none yet). |

## Hard invariants

1. **Draft-then-verify.** Any Arabic/English/Turkish content an agent writes
   is a DRAFT until Omer verifies it against his textbook. Say so when you
   add content. A wrong gloss in an SRS teaches the error permanently.
2. **Content is data, never UI.** All study/reference content lives in
   `src/content/` data files. No strings of course content inside components.
3. **The review log is append-only.** It is the raw material for future
   personal FSRS parameter optimization. Never rewrite or compact it.
4. **Never reimplement scheduling.** All scheduling math goes through ts-fsrs.
5. **Stay a static site.** No backend, no external requests at runtime
   (fonts are bundled). Offline must keep working.
6. **Progress stays on-device.** Nothing from IndexedDB ever enters the repo.

## Architecture

```
src/
  content/            # DATA ONLY (decks + reference entries)
    types.ts          # Note, DeckDef, ContentCard, ReferenceEntry, sections
    decks/            # hurufAlKhafd.ts + index.ts (cardsOfDeck: note×direction)
    reference/        # partsOfSpeech, irabSigns, hurufAlKhafd, locked stubs
  db/
    db.ts             # Dexie schema: cardState, reviewLog, meta
    exportImport.ts   # JSON backup build/parse/import (schemaVersion 1)
  srs/
    engine.ts         # ts-fsrs wrapper: answerCard, burySiblings, previews
    queue.ts          # buildQueue: learning due → review due → new (capped)
    stats.ts          # computeStats from the review log
  pages/              # Study, Review, Reference, ReferenceEntry, Stats, Settings
  components/TabBar.tsx
```

Key model: a "card" is a `(noteId, direction)` pair, id `noteId|direction`.
Notes may override deck directions (`directions:` field). The three oath
particles are ar-to-meaning only because their meanings are identical.

Cards not yet in `cardState` are New. Burying a not-yet-introduced sibling
creates a New-state row carrying `buriedUntil`.

## Commands

```bash
pnpm install
pnpm run dev          # dev server (browser preview via .claude/launch.json)
pnpm exec vitest run  # 10 tests: queue order, limits, burying, backup roundtrip
pnpm run build        # tsc -b + vite build + PWA
pnpm run lint         # oxlint
```

Deploy: push to `main` → `.github/workflows/deploy.yml` → GitHub Pages.

## Roadmap (locked reference entries mark the order)

Agreed as future work, in rough curriculum order:

1. Unlock reference entries as Omer's course reaches them: naṣb particles,
   jazm particles, pronouns, kāna sisters, inna sisters, verb conjugation.
2. Per-sense cards for Ḥurūf al-Khafḍ (prompt = context example, answer =
   sense) once Omer moves past first meanings.
3. Vocabulary decks (repo-edited, same note format).
4. Hide-tashkeel toggle; alternative Arabic fonts.
5. Interactive drills (typed answers with hamza/tashkeel normalization,
   iʿrāb parsing drills) — a new section, separate from flashcards.
6. Personal FSRS parameter optimization from the review log.

When suggesting features, prefer depth in these over breadth elsewhere,
and always put real decisions to Omer instead of assuming.

## Style notes for agents

- Report to Omer tersely, ASD-STE100-plain, no em dashes.
- Never add Claude/Anthropic co-author lines to commits.
- Weigh quality, simplicity, robustness, and maintainability over dev cost.
- Flag unrelated problems; do not bundle unrelated fixes into one change.
