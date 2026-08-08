# Corpus is neither Content nor Progress

Everything in this codebase sat on one side of a single line: **Content** is
authored in the repo and verified against the matn; **Progress** is what one
device knows about one learner. Reading real text breaks that line. A reader
needs the word-by-word morphology of the Qurʾān — roughly 128,000 annotated
words — which is neither authored here nor knowledge about a learner. Filing it
under Content would be a lie with consequences: Content carries a promise that
every string in it has been checked by hand against the matn, and nobody is
going to check 128,000 rows. So we added a third class. **Corpus** is
third-party linguistic data, imported by a generator under `scripts/`, never
hand-edited, read but never scheduled.

## Considered options

**Import it as Content and mark it DRAFT.** Rejected: DRAFT means "written but
not yet verified", and it is a state that ends — the point of the marker is
that Omer eventually clears it. Corpus is *permanently* unverified, which is a
different thing, and reusing DRAFT for it would quietly redefine the marker on
the material it was invented for. It would also put unverified glosses one
field away from the deck generator, and from there into the scheduler.

**Keep the corpus out of the repo and fetch it at runtime.** Rejected: the app
is offline-first and shipped to family as a static build with no backend. It
would also make builds non-reproducible and corpus changes invisible — the
thing we most want is for a corpus fix to show up as a reviewable git diff.

**Don't build a reader; extend the Example type instead.** Rejected, but it was
close. Curated ayāt illustrating grammar points are exactly what `Example`
already does, and Reference already renders them well. The reader exists for
the one thing curation cannot give: *unselected* text, where the grammar
appears in an order nobody arranged for the learner. That is the whole value,
and it is not reachable by growing Content.

## Consequences

- **Corpus can never produce a Card.** This is the load-bearing consequence.
  FSRS is a machine for making things stick, so an unverified gloss that
  reaches the scheduler gets rehearsed to permanent retention by design, and
  the learner — who by then has stopped checking — will not notice. Unverified
  data is cheap in a reader and expensive in a deck. Vocabulary reaches the
  scheduler only through authored Content (see the Qurʾān vocabulary track),
  never from Corpus directly.
- **Verification is replaced, not dropped.** The Arabic is machine-verifiable
  and the English is not, and those are separate problems. Text is byte-matched
  against Tanzil by the existing citation test run; token offsets and lemma
  references are checked for integrity. What remains fallible is glosses and
  morphology, which carry visible Provenance and can be flagged from the app.
- **The `Meaning` invariant is scoped to Content.** "Both languages together
  are one Meaning" holds for everything authored. Corpus Turkish is generated,
  and stays that way.
- **One vendored copy, two generators.** The raw corpus lives under `scripts/`
  and never ships. One generator emits vocabulary deck files; another emits the
  per-surah JSON the reader lazy-loads. Neither is a build step — a repeatable
  generator would clobber hand-verified content on every run.
- **Reading is stateless.** It reads Content and Corpus, and writes nothing.
  Reading position and lookup history are deliberately not recorded: passive
  telemetry about what a learner looked at earns little and is not what this
  app is. Reading may *read* Progress — to show which words are already known —
  but never writes it.
