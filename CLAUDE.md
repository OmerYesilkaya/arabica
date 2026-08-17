# arabica

Personal Arabic study app. Read `CONTEXT.md` for the domain language — the
terms there are binding, and `docs/adr/` records why the load-bearing ones were
chosen.

## Never write Arabic script in code

Arabic belongs in content data and in the UI. It does not belong in prose about
the code.

**Use transliteration** in comments, commit messages, issue text, test names,
identifiers, and log output. Write "the definite article al-", not the Arabic
letters; "hurūf al-khafd", not the Arabic title; "yadribūna teaches daraba",
not the two forms in script.

Arabic script is only allowed where it *is* the data:

- content data files under `src/content` — the words, ayat and tables being taught
- the vendored corpus under `scripts/data`
- string literals a test asserts on, and character maps that transliterate

Why: comments are read in diffs, terminals, commit logs, and code review, where
bidirectional text reorders the line around it and mixed-direction punctuation
lands in the wrong place. A comment explaining a right-to-left string is not
worth making the left-to-right prose around it unreadable. Transliteration also
stays greppable — `grep khafd` finds the comment, the file and the deck id at
once.

When a comment needs to name an exact form and transliteration would be
ambiguous, name the note id or point at the data file instead of inlining the
script. A matn passage worth quoting belongs in a rendered `RefProse` section,
where the learner sees it, rather than in a comment where only you do.

`scripts/conventions.test.ts` enforces this over `src/` and `scripts/`. It checks
comments only, which is why the allowances above need no exception in it: data,
literals and character maps are code, not comments.

## Turkish prefers an Arabic root

When writing Turkish — the Turkish half of a Meaning, an Example, a Reference
paragraph, or a string in `src/i18n/strings.ts` — reach first for the ordinary
Turkish word that came from Arabic.

Write **mana**, not anlam. **Misal**, not örnek. **Tercüme**, not çeviri.
**Kelime**, not sözcük. **Sual**, **vecih**, **kaide**, **tafsil**, **malum**,
**tahkik**, **vuku**, **seviye**, **hareke**, **sarf**, **kıraat**.

Why: the reader is learning Arabic. A Turkish sentence built from Arabic roots
teaches vocabulary while it explains, and the root is often the very root the
card is about — a gloss that says "iman etmek" for *āmana* has already shown
the learner something a gloss saying "inanmak" hides.

The rule stops where the word stops being ordinary. Turkish has no everyday
Arabic-rooted word for good, easy, day or export; *hasen*, *sehil* and *yevm*
do not stand alone in the modern language, and forcing them produces something
nobody says. Where there is no natural choice, use the natural Turkish word.
Prefer a rewrite over a reach: recasting a sentence around **ihata etmek** is
usually worse than one that simply says kapsamak.

This is a preference, not a filter. Never choose a word a Turkish reader would
have to look up in order to satisfy it.
