# Task: Typed-answer drills (ISSUES.md issue 2)

Self-contained brief for one agent session. Read HANDOFF.md and ISSUES.md
issue 2 in the repo root before you change anything.

## Setup

Work on a dedicated branch. If other tasks run in parallel, use a worktree:

```bash
git worktree add ../arabica-typed-drills -b feat/typed-drills
```

Otherwise: `git checkout -b feat/typed-drills`.

## Scope

Implement exactly ISSUES.md issue 2: a new Drills section with one drill
type: show the English + Turkish gloss, the user types the Arabic.

Key points (full criteria in ISSUES.md):

- Drills are unscheduled practice in v1. They must NOT write to
  `cardState` or `reviewLog` (src/db/db.ts).
- Drill pool: the existing deck notes (src/content/decks/). No new content.
- New page in src/pages/, added to the TabBar (src/components/TabBar.tsx)
  consistently with the existing pages. App uses HashRouter.
- Shared, unit-tested normalization utility:
  - strip tashkeel (U+064B–U+065F, U+0670) and tatweel (U+0640),
  - normalize hamza carriers: أ إ آ to ا, ؤ to و, ئ to ي,
  - decide ة vs ه and document the decision in a code comment,
  - trim and collapse whitespace.
- Required matches: typed "من" is correct for "مِنْ"; "الي" for "إِلَى".
- After submit: show correct/incorrect, the fully voweled correct answer,
  and a character-level diff on mismatch.
- iOS: the input must not zoom or lose focus on submit (16px+ font size on
  the input avoids iOS zoom). Manual on-iPhone check is Omer's step;
  list it as unverified in the report.

## Constraints (from HANDOFF.md)

- Static site, offline-capable, no external requests, no new dependencies.
- Content is data in src/content/ only; no course content in components.

## Verify, commit, report

```bash
pnpm exec vitest run
pnpm run lint
pnpm run build
```

All must pass. Commit on feat/typed-drills with a plain message.
Never add a Co-Authored-By or any Claude/Anthropic attribution line.
Do not push; Omer merges after review.

Report tersely: files changed, the ة decision, test/lint/build results,
any acceptance criterion not met and why. Plain English, no em dashes.
