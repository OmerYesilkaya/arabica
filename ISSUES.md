# arabica — Feature Issues

Issues 1–7 (hide-tashkeel, drills, per-sense cards, FSRS optimization,
forecast, leeches, heatmap) are implemented and merged; see git history.

**Content sourcing rule (applies to every issue that adds Arabic text):**
When an example or Arabic text is needed, use this priority:

1. Quran (cite surah:ayah)
2. Hadith (cite collection and number)
3. Plain fusha only when no suitable Quranic or Hadith example exists

Every example carries English and Turkish meanings. All drafted content stays
DRAFT until Omer verifies it (invariant 1).

## Carried over from issues 1–7 (Omer's manual steps)

- [ ] Verify the per-sense deck content (Quran citations, meanings) against
      the textbook and a muṣḥaf, then unlock the deck. Note: the cited ayah
      for the oath example occurs at 6:109, 16:38, 24:53, 35:42.
- [ ] On-iPhone PWA checks: drills typing (keyboard, zoom, focus) and the
      one-time cross-origin-isolation reload for the FSRS optimizer.

## Carried over from issues 8–13 (implemented; Omer's verification)

All six reference entries are unlocked and merged, all content DRAFT.
Every example carries its citation in the data; edition notes and fusha
fallback reasons are in code comments in each file. Verify against the
textbook and a muṣḥaf:

Done 2026-08-06: every Quranic quote in src/content (72 of them) was
machine-verified against the canonical text, wording and citation, with
`pnpm exec vitest run --config scripts/vitest.citations.config.ts`
(one error found and fixed: 48:2 was missing اللَّهُ). Re-run this after
any content change. Model verb set to ضَرَبَ per Omer (matn's own verb);
jazm list follows the matn as printed. Remaining for Omer:

- [ ] Compare each entry's word list and order against the matn (counts:
      naṣb 10, jazm 6 + 13, kāna 13, inna 6).
- [ ] The constructed fusha examples cannot be machine-verified: naṣb 3
      (إِذَنْ, wāw al-maʿiyyah, أَوْ), jazm 7, kāna 6. Decide: keep as
      marked placeholders or replace with commentary shawāhid.
- [ ] Tashkeel of the quoted fragments is eyeball-checked only for
      letters, not vowels, by the script. Spot-check vowels while
      studying; the wording and citations are verified.
- [ ] TR meanings: align with the matn's terminology lazily while
      studying; flag any clash.

---

# Reference entries: unlock the locked pages

One issue per locked entry in `src/content/reference/index.ts`. Shared
requirements for all six:

- Content is data only, in a new file under `src/content/reference/`,
  following the existing patterns (`hurufAlKhafd.ts`, `irabSigns.ts`,
  `partsOfSpeech.ts`) and the `RefSection` kinds in `src/content/types.ts`
  (prose, table, harf). Extend the section types only if a real need
  appears, in a separate commit.
- Replace the locked stub in `index.ts` with the full entry (drop
  `locked: true`, keep the same `id`, `order`, and Arabic title).
- Structure mirrors Ḥurūf al-Khafḍ: an Overview prose section carrying the
  relevant Ājurrūmiyya passage in Arabic, then a quick table, then detail
  sections as the topic needs.
- The word lists (which particles, which sisters, which forms) follow the
  Ājurrūmiyya. Do not improvise membership; if editions differ, note it in
  a code comment for Omer.
- Every meaning in English AND Turkish. Every example follows the sourcing
  rule above, citation in the `Example.source` field.
- All content marked DRAFT in a file-top comment.
- Reference only: no new decks in these issues. Decks for these topics are
  a later decision.
- Verify: `pnpm exec vitest run`, `pnpm run lint`, `pnpm run build` (the
  build type-checks the content shape). Open the entry in the browser and
  confirm it renders with no console errors.

## 8. Naṣb Particles of the Verb (nawasib-al-fil, order 4)

**Scope.** The particles that put the muḍāriʿ into naṣb, per the
Ājurrūmiyya's list.

**Acceptance criteria**

- [ ] Entry `nawasib-al-fil` is unlocked and opens from the Reference list.
- [ ] Overview prose includes the Ājurrūmiyya passage naming the particles.
- [ ] Quick table: particle, English, Türkçe, voweled example of a verb in
      naṣb after it, with source citation.
- [ ] A prose or table section covers the visible naṣb sign on the verb
      (fatḥa; dropping of nūn in the five verbs), cross-consistent with the
      existing iʿrāb-signs entry.
- [ ] Shared requirements above all met.

## 9. Jazm Particles of the Verb (jawazim-al-fil, order 5)

**Scope.** The particles that put the muḍāriʿ into jazm, per the
Ājurrūmiyya: the group that jazms one verb and the group (conditional
particles) that jazms two.

**Acceptance criteria**

- [ ] Entry `jawazim-al-fil` is unlocked and opens.
- [ ] Overview prose includes the Ājurrūmiyya passage.
- [ ] Two tables: one-verb jazm particles and two-verb (conditional)
      particles, each with EN + TR and a sourced, voweled example.
- [ ] A section covers the jazm signs (sukūn; dropping of nūn; dropping of
      the weak final letter), cross-consistent with the iʿrāb-signs entry.
- [ ] Shared requirements above all met.

## 10. Pronouns (damair, order 6)

**Scope.** Attached and detached personal pronouns.

**Acceptance criteria**

- [ ] Entry `damair` is unlocked and opens.
- [ ] Detached pronoun table (munfaṣil): all 14 persons with EN + TR.
- [ ] Attached pronoun tables (muttaṣil): the suffix forms with a voweled,
      sourced example for each series (attached to a verb, to a noun, to a
      ḥarf jarr), not necessarily one example per person.
- [ ] Prose section explains where each kind appears (raf / naṣb / jarr
      positions) in one short paragraph each, EN + TR.
- [ ] Tables stay readable on iPhone width (wide tables scroll inside
      their own container; see how existing RefTable renders and verify).
- [ ] Shared requirements above all met.

## 11. Kāna and its Sisters (kana-wa-akhawatuha, order 7)

**Scope.** The verbs that raise the ism and put the khabar into naṣb, per
the Ājurrūmiyya's list.

**Acceptance criteria**

- [ ] Entry `kana-wa-akhawatuha` is unlocked and opens.
- [ ] Overview prose includes the Ājurrūmiyya passage and states the
      effect (ism marfūʿ, khabar manṣūb), EN + TR.
- [ ] Quick table: each sister, its meaning EN + TR, one voweled, sourced
      example showing ism and khabar.
- [ ] One worked example section: a sentence before and after kāna enters
      it, with the case endings explained, EN + TR.
- [ ] Shared requirements above all met.

## 12. Inna and its Sisters (inna-wa-akhawatuha, order 8)

**Scope.** The particles that put the ism into naṣb and raise the khabar,
per the Ājurrūmiyya's list (with the meanings the matn assigns them).

**Acceptance criteria**

- [ ] Entry `inna-wa-akhawatuha` is unlocked and opens.
- [ ] Overview prose includes the Ājurrūmiyya passage and states the
      effect (ism manṣūb, khabar marfūʿ), EN + TR.
- [ ] Quick table: each sister, its meaning EN + TR, one voweled, sourced
      example showing ism and khabar. Quranic examples exist for all of
      these particles; fusha fallback should be rare here.
- [ ] One worked example section mirroring the kāna entry, so the two can
      be compared side by side.
- [ ] Shared requirements above all met.

## 13. Verb Conjugation Tables (verb-conjugation, order 9)

**Scope.** Full conjugation of the sound triliteral verb: māḍī, muḍāriʿ,
and amr across the 14 person/gender/number forms.

**Acceptance criteria**

- [ ] Entry `verb-conjugation` is unlocked and opens.
- [ ] Three tables (māḍī, muḍāriʿ, amr where applicable), fully voweled,
      using one common model verb (فَعَلَ or a verb Omer's course uses;
      put the choice to Omer in the PR description).
- [ ] Row labels give person/gender/number in English and Turkish.
- [ ] A short prose section notes the muḍāriʿ prefix letters and the five
      verbs (al-afʿāl al-khamsa), cross-linking the naṣb/jazm entries.
- [ ] Tables stay readable on iPhone width (scroll inside container).
- [ ] Shared requirements above all met.
