# arabica

A personal Arabic study app: a static PWA that teaches the grammar of the
Ājurrūmiyya through spaced repetition. Content is authored in the repo; a
learner's progress never leaves their device.

## Language

### The content/progress divide

The single most important distinction in this codebase. Every term below sits
on one side of it.

**Content**:
Everything to be learned, authored as TypeScript data under `src/content`.
Ships in the bundle, identical on every device, versioned in git.
_Avoid_: data, material

**Progress**:
Everything a device knows about one learner — scheduling state and the record
of past answers. Lives in IndexedDB, never in the repo, never synced.
_Avoid_: user data, state, history

### Content

**Note**:
One thing to be learned: an Arabic form paired with its Meaning. The unit an
author writes.
_Avoid_: word, item, entry, term

**Deck**:
An ordered collection of Notes studied together. Its order is the order new
Cards are introduced in.
_Avoid_: set, collection, course

**Direction**:
Which way a Note is asked — `ar-to-meaning` or `meaning-to-ar`.
_Avoid_: mode, orientation, side

**Card**:
One (Note, Direction) pair. The unit that gets scheduled — a Note with two
Directions produces two Cards.
_Avoid_: item, question

**Meaning**:
The English and Turkish rendering of an Arabic form. Both languages together
are one Meaning; neither alone is. A real type — everything the learner reads
extends it.
_Avoid_: gloss, translation, definition

**Example**:
A fully voweled Arabic sentence illustrating a Note, with its own Meaning and
Source.
_Avoid_: sentence, usage, sample

**Source**:
The citation an Arabic quotation came from — Qurʾān as `surah:ayah`, hadith as
collection and number. Absent only on constructed fuṣḥā. Always its own field,
on Examples and on Reference table cells alike, because the citation checker
reads it: a citation buried in prose or in a Footnote is one nobody verifies.
_Avoid_: citation, reference, attribution

**Footnote**:
A small annotation beside the Arabic in a Reference table cell — a grammatical
remark or a variant form. Never a Source.
_Avoid_: note, caption, aside

**Harf**:
A particle: the grammatical word class the decks currently teach. "Particle"
is the English rendering shown to the reader; `harf` is the term in code.
_Avoid_: particle, preposition

**Sense**:
One grammatical function of a Harf, named by its Arabic term. A single Harf
carries several Senses, each taught by its own Card. A Sense is defined in the
Reference Entry; a Deck only names one, and derives that name from it.
_Avoid_: usage, meaning, function

**Reference Entry**:
A grammar page — tables and prose — ordered by its position in the
Ājurrūmiyya. Reference is read, never scheduled.
_Avoid_: article, page, lesson, chapter

**Locked**:
Content that is written and shipped but not yet released to the learner. Shown
as "coming soon"; applies to Decks and Reference Entries alike.
_Avoid_: hidden, disabled, coming soon

**Tashkeel**:
The vowel marks. Content always stores full tashkeel; hiding it is a
render-time choice, never a change to the data.
_Avoid_: vowels, harakat, diacritics

**DRAFT**:
A file-top marker meaning the content has not yet been verified against the
matn. Draft content may still be studied, at the learner's risk.

### Progress

**Card State**:
The current FSRS scheduling state of one Card — due date, stability,
difficulty, lapse count.
_Avoid_: progress, schedule, srs data

**Review**:
One recorded answer to one Card, appended to a log that is never mutated. The
review log is the source of truth from which all Stats are derived.
_Avoid_: answer, attempt, log entry

**Rating**:
The learner's self-assessment on answering a Card: Again, Hard, Good, or Easy.
_Avoid_: grade, score, difficulty

**Lapse**:
A Rating of Again on a Card that had already graduated.
_Avoid_: fail, miss, forget

**Leech**:
A Card that has lapsed at least eight times. Surfaced for attention only —
arabica never auto-suspends.

**Bury**:
To hide a Card until tomorrow because one of its Siblings was just answered.
_Avoid_: skip, defer, postpone

**Sibling**:
Cards sharing a sibling group: a Note's own Directions by default, or every
Sense of one Harf in the per-sense deck.

### Activities

**Study**:
The act of answering scheduled Cards. This is the verb — the learner studies a
Deck, and each answer produces a Review.
_Avoid_: review (as a verb), practice, learn

**Study Session**:
One continuous pass through a Deck's Queue, ending when the Queue empties.
Sessions are not persisted; only the Reviews they produce are.
_Avoid_: review session, sitting

**Queue**:
Today's ordered list of Cards to Study in one Deck: learning first, then due,
then new up to the daily limit.
_Avoid_: stack, list, backlog

**Drill**:
Unscheduled typing practice: the learner is shown a Meaning and types the
Arabic. Drills read Content only — they never touch Progress and never produce
a Review.
_Avoid_: quiz, test, exercise, practice

**Drill Item**:
One prompt in a Drill. Deliberately not a Card: Drill Items are not scheduled
and have no state.
_Avoid_: drill card, question

**Verdict**:
The correct/incorrect outcome of one Drill Item. Distinct from a Rating, which
is a self-assessment the learner chooses.
_Avoid_: rating, grade, result

## Borrowed vocabulary

These come from ts-fsrs and are not ours to rename. They are the one place
where our terms collide with a dependency's, so use them only when the FSRS
type is genuinely what is meant:

- **`State.Review`** — an FSRS lifecycle state meaning a graduated Card, as
  opposed to `New`, `Learning`, or `Relearning`. Not the same as our **Review**
  (one recorded answer). When both could be meant, say "review state" for the
  FSRS one.
- **`Grade`** — the ts-fsrs type of our **Rating**.
- **`Card`** — the ts-fsrs scheduling record. Ours is a (Note, Direction) pair.
  `rowToFsrsCard` / `fsrsCardToRow` mark the boundary between the two.
