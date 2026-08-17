# Reference order is course order, not the Ājurrūmiyya's

`ReferenceEntry.order` was documented as the entry's position in the
Ājurrūmiyya, and for the first nine entries the two orders were the same thing,
so nothing forced a choice. Gender and number forced it. The matn has no bāb on
mudhakkar / muʾannath or on mufrad / muthannā / jamʿ — it uses the five
declension classes from bāb al-iʿrāb onwards and expects them known — yet the
course teaches them as its second lesson, right after ḥurūf al-jarr, and a
learner meeting "sound feminine plural takes kasra in naṣb" before anything has
said what a sound feminine plural is has been failed by the ordering. So
`order` is the order the course teaches in. It follows the matn wherever the
matn has a chapter, and places everything else where it is needed.

## Considered options

**Keep Ājurrūmiyya order and append non-matn entries at the end.** Rejected:
`order` exists to decide reading order for a learner, and this makes it decide
something else. The Reference list would then open with an entry whose second
table cannot be read yet, and the entry that fixes that would be last.

**Keep Ājurrūmiyya order and fold gender and number into `irab-signs`.**
Rejected, and it was the close one — the matn does raise the categories there,
so the placement is defensible. But `irab-signs` is a parsing table, the one
page you come back to mid-sentence to read a sign off; growing it into a
morphology lesson costs it that. Two entries, each doing one thing, and the
signs table cross-references the categories.

**Add a second field: `matnOrder` beside `order`.** Rejected as a field with
one reader and no user. Nothing in the app sorts by the matn, and a field that
is only ever correct-looking is a field that goes stale. The matn's own
sequence is recoverable from the entries' header comments, which name the bāb.

## Consequences

- **Non-matn entries are first-class.** An entry no longer needs a chapter in
  the Ājurrūmiyya to exist or to sit early. Sarf topics the matn assumes —
  gender and number now, iḍāfa and the broken-plural patterns later — go where
  they are needed rather than at the end.
- **Inserting renumbers.** `order` is a dense integer sequence, so adding an
  entry mid-course rewrites the ones after it (adding gender-and-number at 4
  moved six entries). This is a one-line diff per file and is visible in review,
  which is the point: a reordering that touched nothing would be a reordering
  nobody noticed.
- **Each entry still names its place in the matn.** The header comment of every
  entry drawn from the Ājurrūmiyya says which bāb it comes from, and entries
  with no bāb say that instead. The scholarly ordering stays documented where
  it is checkable against the text.
- **This changes no data model and no rule about Content.** Reference is still
  read and never scheduled; Sources are still verified by the citation checker.
  Only the meaning of one integer changed.
