# Task: Hide-tashkeel toggle (ISSUES.md issue 1)

Self-contained brief for one agent session. Read HANDOFF.md and ISSUES.md
issue 1 in the repo root before you change anything.

## Setup

Work on a dedicated branch. If other tasks run in parallel, use a worktree:

```bash
git worktree add ../arabica-hide-tashkeel -b feat/hide-tashkeel
```

Otherwise: `git checkout -b feat/hide-tashkeel`.

## Scope

Implement exactly ISSUES.md issue 1: a render-time hide-tashkeel toggle.

Key points (full criteria in ISSUES.md):

- Shared strip utility for U+064B–U+065F, U+0670, and tatweel U+0640,
  with vitest unit tests (marks, tatweel, mixed Arabic/English text).
- Persistent setting `hideTashkeel` in the Dexie `meta` table
  (src/db/db.ts has getMeta/setMeta), edited on the Settings page.
- Quick toggle on the review screen; takes effect on the current card
  without losing queue position.
- Applies to card Arabic in review and deck browse views only.
  Reference pages ALWAYS show full tashkeel.
- Strip at render time only. Never modify content files (invariant 2).

## Constraints (from HANDOFF.md)

- Static site, offline-capable, no external requests.
- No new dependencies.
- Progress stays on-device; nothing from IndexedDB enters the repo.

## Verify, commit, report

```bash
pnpm exec vitest run
pnpm run lint
pnpm run build
```

All must pass. Commit on feat/hide-tashkeel with a plain message.
Never add a Co-Authored-By or any Claude/Anthropic attribution line.
Do not push; Omer merges after review.

Report tersely: files changed, test/lint/build results, any acceptance
criterion not met and why. Plain English, no em dashes.
