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

`src/conventions.test.ts` enforces this over `src/` and `scripts/`. It checks
comments only, which is why the allowances above need no exception in it: data,
literals and character maps are code, not comments.
