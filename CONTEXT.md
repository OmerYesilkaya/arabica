# arabica

A personal Arabic learning tool: a static PWA that teaches Arabic along one
opinionated path — the grammar of the Ājurrūmiyya, the vocabulary of the
Qurʾān, and the reading of real text — through spaced repetition. Content is
authored in the repo; a learner's progress never leaves their device.

It is not a grammar app. Grammar is where it starts, not what it is.

## Language

### The content / progress / corpus divide

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

**Corpus**:
Third-party linguistic data about real Arabic text — the text itself, and the
morphology of every word in it — imported by a generator under `scripts/` and
never hand-edited. Corpus is read, never scheduled: no Card is ever built from
it. It is not Content and does not inherit Content's rules — it is not verified
against the matn and carries no DRAFT marker, because there is far too much of
it to verify by hand. See `docs/adr/0002-corpus-is-neither-content-nor-progress.md`.
_Avoid_: data, dataset, source text

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

**Language**:
Which language the app is in — its own chrome, and which half of every Meaning
is on screen. One choice, English or Turkish, persisted per device and swapped
from the session bar or Settings. Like hiding Tashkeel it is a render-time
choice: a Meaning is still both languages together, and nothing here touches
Content or Progress. The interface strings live in `src/i18n/strings.ts`;
Content is never translated at render time, because both languages of it are
already authored. See `docs/adr/0004-basalt-one-ramp-one-language.md`.
_Avoid_: locale, i18n, translation, meaning language

**DRAFT**:
A file-top marker meaning the content has not yet been verified against the
matn. Draft content may still be studied, at the learner's risk.

### Corpus

**Text**:
One continuous piece of real Arabic that can be Read, kept whole and in its own
order — a surah, not a selection of ayāt. The unit the Reading tab opens.
_Avoid_: passage, document, reading

**Token**:
One word as it occurs in a Text, at one position in it. Carries the morphology
of that particular occurrence: its case or mood, and the sign that shows it.
_Avoid_: word, occurrence

**Lemma**:
The dictionary form a Token inflects from. The split that matters: **glosses
hang on the Lemma, grammar hangs on the Token.** One Lemma is glossed once;
what it means *here* is carried by its Token's morphology, not by a second
gloss.
_Avoid_: headword, root, dictionary form

**Provenance**:
Where a piece of Corpus came from, shown to the learner beside it. Corpus is
unverified by design, so an error must be attributable rather than anonymous.
_Avoid_: source (that is a citation on Content), attribution, credit

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

**Read**:
The act of moving through a Text with no translation on the page, tapping a
Token to check it. Reading is stateless: it produces nothing, records nothing,
and never touches Progress. Where Study tests recall of what was taught,
Reading tests recognition of what was not.
_Avoid_: browse, view, study (Reading is not Study)

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
