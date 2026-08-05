# arabica — Feature Issues

Agreed with Omer on 2026-08-05. Work them roughly in this order. Each issue
must obey the hard invariants in [HANDOFF.md](HANDOFF.md).

**Content sourcing rule (applies to every issue that adds Arabic text):**
When an example or Arabic text is needed, use this priority:

1. Quran (cite surah:ayah)
2. Hadith (cite collection and number)
3. Plain fusha only when no suitable Quranic or Hadith example exists

Every example carries English and Turkish glosses. All drafted content stays
DRAFT until Omer verifies it (invariant 1).

---

## 1. Hide-tashkeel toggle

**Motivation.** Real-world Arabic is unvoweled. Reading practice needs the
option to hide vowels while the source data keeps full tashkeel.

**Requirements**

- A persistent setting `hideTashkeel` in the `meta` table, edited on the
  Settings page, plus a quick toggle on the review screen.
- Stripping happens at render time only. Content files keep full tashkeel
  (invariant 2 untouched; no data migration).
- Strip the Arabic combining marks (U+064B–U+065F, U+0670, and tatweel
  U+0640) with a single shared utility, unit-tested.
- Scope: the Arabic text on card fronts and backs during review, and deck
  browse views. The Reference section always shows full tashkeel; it is the
  place the learner goes to check vowels.

**Acceptance criteria**

- [ ] Toggle on Settings persists across app restarts (stored in `meta`).
- [ ] Quick toggle on the review screen takes effect on the current card
      without losing queue position.
- [ ] With the toggle on, `مِنَ الْبَيْتِ` renders as `من البيت`; the
      underlying note data is unchanged.
- [ ] Reference pages are not affected by the toggle.
- [ ] Unit tests cover the strip utility (marks, tatweel, mixed AR/EN text).

---

## 2. Typed-answer drills

**Motivation.** Recognition (flashcards) is not production. Typing the Arabic
for a gloss is the first active-recall drill. Roadmap item 5.

**Requirements**

- A new "Drills" section, separate from flashcards. It does not touch
  `cardState` or `reviewLog`; drills are unscheduled practice in v1.
- Drill type 1: show the English + Turkish gloss, the user types the Arabic.
- Answer normalization before comparison, as a shared unit-tested utility:
  - strip tashkeel and tatweel from both sides,
  - normalize hamza carriers (أ إ آ → ا, ؤ → و, ئ → ي, ة → ه optional:
    decide during implementation and document it),
  - trim and collapse whitespace.
- After submit, show correct/incorrect, the fully voweled correct answer,
  and a character-level diff on mismatch.
- Drill pool: notes of the existing decks; no new content needed for v1.
- iOS note: verify the Arabic keyboard experience in the installed PWA;
  the input must not zoom or lose focus on submit.

**Acceptance criteria**

- [ ] Drills tab/section exists and works offline.
- [ ] `من` is accepted for `مِنْ`; `الي` is accepted for `إِلَى`.
- [ ] A wrong answer shows the voweled correct form and a visible diff.
- [ ] No rows are written to `cardState` or `reviewLog` by drills.
- [ ] Normalization utility has unit tests (hamza forms, tashkeel, mixed).
- [ ] Manually verified on iPhone (standalone PWA): typing Arabic, submit,
      next question.

---

## 3. Per-sense cards for Ḥurūf al-Khafḍ

**Motivation.** Once first meanings are solid, each harf's senses become the
unit of study. Prompt = context example, answer = sense. Roadmap item 2.

**Requirements**

- New deck `hurufAlKhafdSenses` generated from `RefHarf.senses` data (single
  source of truth; do not duplicate sense text in two files). Each sense
  needs an `example` for this to work.
- Card front: the example sentence in Arabic with the harf highlighted.
  Card back: the sense term (Arabic + transliteration), EN + TR gloss, and
  the example glosses. Direction: ar-to-meaning only.
- Every sense example follows the content sourcing rule above: Quran first,
  then Hadith, then fusha. Replace existing textbook-style examples with
  Quranic ones where a clear, short one exists; cite the source in the data
  (add an optional `source` field to `Example`).
- `(i)` button links to the harf's anchor in the reference entry.
- The deck ships disabled/locked until Omer confirms he moved past first
  meanings. Content is DRAFT until verified.

**Acceptance criteria**

- [ ] Cards are generated from reference sense data; no sense text is
      duplicated between deck and reference files.
- [ ] `Example` supports an optional `source` citation, rendered subtly on
      the card back and in Reference.
- [ ] Each sense of at least مِنْ, إِلَى, عَنْ, عَلَى, فِي has an example;
      Quran/Hadith prioritized, sources cited, marked DRAFT for Omer.
- [ ] Sibling burying works across the senses of one harf (one sense per
      day per harf at introduction).
- [ ] Existing deck and its scheduling state are unaffected.

---

## 4. On-device FSRS parameter optimization

**Motivation.** The append-only review log exists to personalize FSRS
parameters. Roadmap item 6.

**Requirements**

- Use `fsrs-browser` (Rust FSRS compiled to WASM) bundled with the app.
  No runtime network requests (invariant 5). Never reimplement the math
  (invariant 4).
- Settings page gets an "Optimize parameters" action:
  - disabled with an explanatory note below a minimum review count
    (use the FSRS project's recommendation, ~1000 reviews),
  - runs in a web worker so the UI stays responsive,
  - shows current vs proposed parameters and predicted log-loss/RMSE,
  - applies only on explicit confirm; stores parameters in `meta`.
- `srs/engine.ts` reads parameters from `meta` at generator creation,
  falling back to ts-fsrs defaults.
- JSON backup includes the custom parameters; import restores them.
- The review log remains untouched (invariant 3).

**Acceptance criteria**

- [ ] Optimization runs fully offline on-device and does not freeze the UI.
- [ ] Below the review threshold the action is disabled with a clear note.
- [ ] Proposed parameters are shown and applied only after confirm.
- [ ] After apply, scheduling uses the stored parameters (test: engine
      created with custom weights schedules differently from defaults).
- [ ] Export/import round-trips the parameters (extend the backup schema;
      bump `schemaVersion` and keep import of version 1 working).
- [ ] A "Reset to defaults" action exists.

---

## 5. Review forecast

**Motivation.** Makes the future daily load visible; shows the effect of
the 20-new-per-day setting before it hurts.

**Requirements**

- Stats page: a 30-day forecast bar chart of due review counts, computed
  from `cardState.due`. Reuse the existing `BarChart` style on StatsPage.
- Overdue cards (due before today) count in today's bar.
- Cards in Learning due today count in today; New (unintroduced) cards are
  excluded, since their due date does not exist yet.
- Pure computation in `src/srs/` (for example `forecast.ts`) with unit
  tests; the page only renders.

**Acceptance criteria**

- [ ] Chart shows the next 30 days, today first, axis-labeled like the
      existing 30-day history chart.
- [ ] Overdue cards appear in today's bar.
- [ ] Unit tests cover: overdue folding, day bucketing across midnight,
      empty state (no scheduled cards).
- [ ] Works offline; no schema change.

---

## 6. Leech flagging

**Motivation.** Cards that keep lapsing waste time and usually indicate a
bad card. Surface them; fix them in the repo (curation before memorization).

**Requirements**

- A card is a leech when `lapses >= 8` (Anki default). Threshold is a
  constant, not a setting, for now.
- Stats page: a "Leeches" section listing leech cards with their Arabic,
  gloss, and lapse count. Hidden when empty.
- Visibility only: no auto-suspend, no scheduling change (invariant 4).
- Each row links to the note's reference entry when `referenceId` exists.

**Acceptance criteria**

- [ ] A card whose `lapses` reaches 8 appears in the list; others do not.
- [ ] The section is absent when there are no leeches.
- [ ] No writes to `cardState` or `reviewLog` result from this feature.
- [ ] Unit test for the leech selection query.

---

## 7. Calendar heatmap

**Motivation.** Streak and consistency at a glance. The streak tile already
exists; this adds the year-view habit signal.

**Requirements**

- Stats page: a GitHub-style heatmap of review counts per day, computed
  from the review log. Last 26 weeks (fits an iPhone screen width; decide
  final span by look, not more than 52 weeks).
- 5 intensity levels from 0 to the period maximum; today highlighted.
- Reuse `computeStats`-style day bucketing; extract shared day-bucket
  helpers instead of duplicating `startOfDayOf`.
- Static SVG, no dependency added.

**Acceptance criteria**

- [ ] Heatmap renders review activity per day with weekday rows and week
      columns, today in the last column.
- [ ] Zero-activity days are visibly distinct from low-activity days.
- [ ] Day bucketing is shared with `computeStats` (one implementation).
- [ ] Renders correctly on iPhone width (no horizontal page scroll).
- [ ] Unit test for the bucketing/level computation.
