# Study is the verb; Review is the record

Anki — which this app otherwise follows closely — uses "review" for both the act
of answering a card and the record of having answered it, and ts-fsrs adds a
third meaning with `State.Review` (a graduated card, as opposed to New,
Learning, or Relearning). We had inherited all three: the tab said "Study", its
button routed to `/review/:deckId`, and `reviewLog` recorded answers to cards
that were mostly not in the review state. We split the word: **Study** is the
act (the learner studies a Deck; `StudySessionPage`, `/study/:deckId`), and
**Review** is the record (one row in the review log). `State.Review` stays as
ts-fsrs named it, and is referred to as "review state" whenever both could be
meant.

## Considered options

**Follow Anki and use "review" as the verb.** Rejected: it would leave the same
word meaning the act, the record, and the FSRS lifecycle state, which is the
ambiguity we set out to remove. Anki can carry the overload because its users
already share the jargon; a codebase cannot, because the three meanings appear
within a few lines of each other in `srs/`.

**Leave it alone.** Rejected: the mismatch was already producing wrong guesses
about where code lives — the file named `StudyPage` was the deck list, and the
one named `ReviewPage` was where studying happened.

## Consequences

- The route changed from `/review/:deckId` to `/study/:deckId`. Any bookmark or
  iOS home-screen shortcut pointing at the old path breaks. There is no redirect;
  this is a single-user personal app and the cost of a stale bookmark is one tap.
- `reviewLog`, `ReviewLogRow`, and `State.Review` keep their names. They are the
  record and the vendor's lifecycle state respectively, so they are consistent
  with the split rather than exceptions to it.
- "Study" now names both a section of the app and the act, which is why the deck
  list is `DecksPage` rather than `StudyPage` even though its tab reads "Study".
