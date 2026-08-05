# Task: On-device FSRS parameter optimization (ISSUES.md issue 4)

Self-contained brief for one agent session. Read HANDOFF.md and ISSUES.md
issue 4 in the repo root before you change anything.

## Setup

Work on a dedicated branch. If other tasks run in parallel, use a worktree:

```bash
git worktree add ../arabica-fsrs-optimize -b feat/fsrs-optimize
```

Otherwise: `git checkout -b feat/fsrs-optimize`.

## Scope

Implement exactly ISSUES.md issue 4: personalized FSRS parameters computed
on-device from the review log.

Key points (full criteria in ISSUES.md):

- Use the `fsrs-browser` package (Rust FSRS compiled to WASM), added via
  pnpm and bundled. Never reimplement the math (invariant 4). Scheduling
  still goes through ts-fsrs (src/srs/engine.ts).
- Settings page action "Optimize parameters":
  - disabled with an explanatory note below ~1000 reviews,
  - runs in a web worker so the UI stays responsive,
  - shows current vs proposed parameters and the evaluation metric,
  - applies only on explicit confirm; stores parameters in the `meta`
    table (src/db/db.ts),
  - a separate "Reset to defaults" action.
- engine.ts reads parameters from `meta` at generator creation and falls
  back to ts-fsrs defaults.
- Backup: src/db/exportImport.ts is schemaVersion 1. Include the
  parameters, bump schemaVersion, keep version-1 import working.
- The review log is append-only raw material. Never modify it
  (invariant 3).
- Offline: the WASM must be bundled and precached. Check the Vite worker
  and WASM handling plus the PWA precache config in vite.config.ts, and
  state in the report how you verified offline operation.

## Verify, commit, report

```bash
pnpm exec vitest run
pnpm run lint
pnpm run build
```

All must pass. Required tests: engine with custom weights schedules
differently from defaults; backup round-trip including parameters;
version-1 import still works. Commit on feat/fsrs-optimize with a plain
message. Never add a Co-Authored-By or any Claude/Anthropic attribution
line. Do not push; Omer merges after review.

Report tersely: files changed, fsrs-browser version, test/lint/build
results, offline verification method, any acceptance criterion not met
and why. Plain English, no em dashes.
