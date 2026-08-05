# Task: Stats suite: forecast, leeches, heatmap (ISSUES.md issues 5, 6, 7)

Self-contained brief for one agent session. Read HANDOFF.md and ISSUES.md
issues 5, 6, and 7 in the repo root before you change anything. The three
issues are grouped because all touch src/pages/StatsPage.tsx and
src/srs/stats.ts; doing them in one session avoids merge conflicts.

## Setup

Work on a dedicated branch. If other tasks run in parallel, use a worktree:

```bash
git worktree add ../arabica-stats-suite -b feat/stats-suite
```

Otherwise: `git checkout -b feat/stats-suite`.

## Scope

Implement ISSUES.md issues 5, 6, 7 exactly. One commit per issue
(three commits) so they can be reviewed separately.

Shared rules:

- Read-only features: no writes to `cardState` or `reviewLog`, no
  scheduling changes.
- Pure computation in src/srs/ with vitest unit tests; pages only render.
  Follow the existing pattern (computeStats in src/srs/stats.ts, BarChart
  in StatsPage.tsx).
- Static SVG, no new dependencies. Must render on iPhone width with no
  horizontal page scroll.

Issue 5, review forecast:

- 30-day bar chart of due review counts from `cardState.due`, today first.
- Overdue cards fold into today's bar. New (unintroduced) cards excluded.
- Tests: overdue folding, day bucketing across midnight, empty state.

Issue 6, leech flagging:

- Leech = `lapses >= 8` (constant, not a setting).
- Stats section listing leech cards with Arabic, gloss, lapse count;
  hidden when empty; row links to the note's reference entry when
  `referenceId` exists (see src/content/types.ts).
- Test the selection query.

Issue 7, calendar heatmap:

- GitHub-style weeks x weekdays grid of reviews per day from the review
  log, about 26 weeks, 5 intensity levels (zero visibly distinct), today
  in the last column.
- Extract shared day-bucketing helpers so computeStats and the heatmap
  use one implementation.
- Test bucketing and level computation.

## Verify, commit, report

```bash
pnpm exec vitest run
pnpm run lint
pnpm run build
```

All must pass. Three plain commit messages, one per issue. Never add a
Co-Authored-By or any Claude/Anthropic attribution line. Do not push;
Omer merges after review.

Report tersely: files changed per commit, test/lint/build results, any
acceptance criterion not met and why. Plain English, no em dashes.
