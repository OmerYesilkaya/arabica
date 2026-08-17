# Basalt: one hue, one ramp, one Language

The app had a look nobody chose. Warm parchment, an emerald accent, rounded
cards, Merriweather over Noto Naskh — the safest possible reading of "study
app", assembled a screen at a time rather than decided. Three things were
wrong with it, and only the first is about taste.

**The Latin face argued with the script.** Merriweather is a heavy,
wide-bodied screen serif. On a page whose largest and most important object is
always a line of naskh, it was the loudest thing present. Basalt sets Inter
against IBM Plex Sans Arabic: the Latin stands back, and the Arabic is what
the eye lands on.

**Colour carried too much.** Three count colours, four grade colours and an
accent all competed at the same volume, so none of them meant anything you
could scan for. Basalt has one hue. `--mark` verdigris means state — known,
due, highlighted — and nothing else on the screen is coloured at all. Urgency
in the count row is ranked by weight instead: new is ink, learning is grey,
due is the one green thing.

**Nine sizes with no relationship.** A card back used 0.7, 0.75, 0.85, 0.92,
1.05, 1.1, 1.25, 1.75 and 3rem, each chosen locally and none in proportion to
the others. There is now one ramp, and nothing off it.

Every token lives in one block at the top of `src/index.css`. Restyling the app
is editing that block.

## Two ramps, not one

Latin and Arabic are measured separately: seven Latin steps, five Arabic. This
looks like duplication and is not. IBM Plex Sans Arabic sets visibly smaller
than Inter at the same `font-size`, so a shared scale draws the script two
steps quieter than intended — the opposite of what an Arabic reader needs. The
two ramps are tuned against each other by eye, which is the only way to tune
them.

## No borders

Basalt separates by fill and by space. The single exception is a hairline
*inside* a surface — table rows, sheet rows, the Reference list — where the
line divides one thing from the next rather than boxing it in. This is what
makes the vocabulary track work: it is the one filled block on the deck list,
because it is the one thing the learner is progressing through, and a border
would have made it a peer of the tiles around it.

A highlight has to fill rather than recolour for the same reason the palette
is monochrome: against near-black ink on warm stone, a hue shift alone is a
whisper. The harf fills; the span inside a translation line tints its ground
and keeps ink text, because at 14px reversed-out text stops being readable.

## The back of a card is two zones and one pane

The old card was nine centred blocks in one flex column with one gap. The
sense term, the second gloss and the citation all looked equally important,
because nothing said otherwise, and centring ragged both edges of every line
while putting an RTL fragment in the middle of an LTR column.

It is now a prompt band on its own ground, and under it: one headline, one
open pane, one row of links. The evidence for the answer — the example, the
other senses, a word's principal parts — sits behind a tab rather than being
absent or being stacked. The pane has a `min-height` and not a height, so the
card does not resize between panes: the grading row sits under it, and a row
that moves under the thumb is a row you mis-tap.

Two smaller rules fell out of building it and are now used everywhere:

- **A headword is centred, a sentence is ranged right.** One is a specimen and
  the other is running text. A lone word pinned to the right edge of an empty
  band reads as having fallen off the card.
- **An Arabic value in a label/value pair shrink-wraps** (`align-items:
  flex-start`). Left to fill its cell it ranges right, away from the label it
  belongs to, and reads as belonging to the next column. `margin-left`, never
  `margin-inline-start`: on a `direction: rtl` span the logical property opens
  the gap on the wrong side of the word.

## Meaning language became app Language

`meaningLang` chose which half of a Meaning the Reference rendered. It now
chooses that *and* the interface, and is called **Language** (see CONTEXT.md).

The reason is the card, not the setting. Showing both glosses on every card
doubles the reading on all six hundred of them, and it was the single biggest
source of the stacking the layout was fighting. Once only one is shown, a
control to swap it is required — and a control that switches the gloss but
leaves the chrome in English would be two languages on one screen, which is
the thing it exists to avoid.

It lives in the session bar beside the hareke toggle. Both are render-time
choices that change nothing in the data, so they look alike and sit together.
It persists, because "which language do I study in" is a preference and not a
property of a card; checking the other language for one card is two taps, and
that is the right price for the common case being one tap cheaper.

The old key is read as a fallback so an existing choice survives the rename.

### Turkish prefers an Arabic root

Where an ordinary Turkish word has an Arabic root, the interface uses it:
mana, misal, kelime, hareke, kiraat, kavaid, sarf, tercume, seviye, tahkik,
malum, vuku, madde, tafsil. This is not ornament. The reader is learning
Arabic, and a tab labelled with a word that shares a root with the thing it
points at teaches while it labels.

The rule stops where the word stops being ordinary. Good, easy, day and export
have no Arabic-rooted Turkish that a reader would not stumble over — *hasen*,
*sehil* and *yevm* do not stand alone in modern Turkish — so the ordinary word
wins. Stats is *Istatistik*, from the French, because *ihsa* is obsolete. The
rule is a preference, and forcing it produces something nobody says.

`lang` on the document root follows the setting, which is load-bearing rather
than tidy: `text-transform: uppercase` is locale-sensitive, and only under
`lang="tr"` does a dotted i uppercase to a dotted capital. Without it the
uppercase labels read MISAL where Turkish spells it MISAL with the dot — a
different letter, and the giveaway that an interface was translated rather
than written.

## Considered options

**Keep the palette, fix only the type.** Rejected: the emerald-on-parchment
scheme was the half that read as generic, and a type-only pass would have left
the app looking the same from three feet away.

**A traditional treatment — manuscript rules, a calligraphic naskh.** It was
the most beautiful of the options prototyped and the most particular to what
the app teaches. Rejected because arabica is used daily, one-handed, for
minutes at a time: it is an instrument, and the manuscript reading made a
reference book. The vocabulary of it survives in one place — the Arabic is
always the largest thing on any screen it appears on.

**Keep both glosses and shrink the second.** Rejected. It was tried in the
layout round and it does not work: a second full sentence at 14px is still a
second full sentence to read past, and the card was still the longest of the
four candidates.

**A per-card language peek instead of a persisted setting.** Rejected as
solving the rarer problem. Most cards are read in one language; the peek is
two taps and costs nothing, where a per-card control that reset every card
would cost a tap on every card that needed the other language.

## Consequences

- **`src/index.css` is now the only place a colour or a size is decided.** A
  literal outside the token block is a bug, and an obvious one in review.
- **Two font packages changed.** Merriweather and Noto Naskh Arabic are gone;
  Inter and IBM Plex Sans Arabic replace them, declared by hand in
  `src/fonts.css` so the service worker precaches four subsets rather than the
  dozen an index import would pull in.
- **`VocabSheet` is gone.** Its four facts are the Word pane of the card, which
  is the same deliberate lookup one tap earlier. `Sheet` and `TokenSheet`
  remain; the reader still needs a sheet, because it must not reflow the line
  being read.
- **Adding a screen means adding strings in two languages.** `src/i18n/strings.ts`
  types the Turkish record against the English one, so a missing key does not
  compile. That is the intended friction.
- **The grammar vocabulary is still English.** `src/text/morphology.ts` names
  features in English — "definite article", "masculine singular" — and those
  strings surface in the reader's word sheet under a Turkish interface. They
  are their own lexicon (harf-i tarif, muzekker, mufred) and their own change,
  because making them Language-aware means threading it through pure functions
  the module's header promises are pure. Known gap, deliberately left.
