import { beforeEach, describe, expect, it } from 'vitest'
import { State } from 'ts-fsrs'
import { ArabicaDB } from '../db/db'
import { cardIdOf } from '../content/types'
import { decks } from '../content/decks'
import { loadLemmas, loadSurah } from '../content/corpus'
import { quranVocab1 } from '../content/decks/quranVocab1'
import { computeCoverage } from '../srs/coverage'
import { knownNoteIds } from '../srs/known'
import { knownLemmas } from './known'

let db: ArabicaDB
let counter = 0

beforeEach(() => {
  db = new ArabicaDB(`reading-known-test-${++counter}`)
})

async function graduate(noteId: string, deckId: string) {
  await db.cardState.put({
    cardId: cardIdOf(noteId, 'ar-to-meaning'),
    deckId,
    state: State.Review,
    due: 0,
    stability: 1,
    difficulty: 5,
    scheduled_days: 0,
    learning_steps: 0,
    reps: 1,
    lapses: 0,
  })
}

describe('knownLemmas', () => {
  it('marks nothing on a device that has started no vocabulary deck', async () => {
    const lemmas = await loadLemmas()
    expect(knownLemmas(lemmas, await knownNoteIds(db)).size).toBe(0)
  })

  it('marks a lemma once its note has graduated', async () => {
    const lemmas = await loadLemmas()
    const taught = Object.entries(lemmas).find(([, l]) => l.noteId)!
    const [lemma, entry] = taught
    await graduate(entry.noteId!, 'quran-vocab-1')

    const known = knownLemmas(lemmas, await knownNoteIds(db))
    expect(known.has(lemma)).toBe(true)
  })

  it('leaves a lemma unmarked while its card is still being learned', async () => {
    const lemmas = await loadLemmas()
    const [lemma, entry] = Object.entries(lemmas).find(([, l]) => l.noteId)!
    await db.cardState.put({
      cardId: cardIdOf(entry.noteId!, 'ar-to-meaning'),
      deckId: 'quran-vocab-1',
      state: State.Learning,
      due: 0,
      stability: 1,
      difficulty: 5,
      scheduled_days: 0,
      learning_steps: 0,
      reps: 1,
      lapses: 0,
    })
    expect(knownLemmas(lemmas, await knownNoteIds(db)).has(lemma)).toBe(false)
  })

  it('marks every inflection, because knowing hangs on the lemma', async () => {
    // al-Kafirun conjugates one verb six times: a'budu, ta'buduna, 'abadtum.
    // One lemma, one card, and every one of them lights up.
    const lemmas = await loadLemmas()
    const heads = (await loadSurah(109)).ayat
      .flatMap((ayah) => ayah.tokens)
      .map((token) => token.segments[token.head])

    const byLemma = new Map<string, typeof heads>()
    for (const head of heads) {
      if (!head.lemma) continue
      byLemma.set(head.lemma, [...(byLemma.get(head.lemma) ?? []), head])
    }
    const [lemma, worship] = [...byLemma].sort(
      (a, b) => new Set(b[1].map((h) => h.form)).size - new Set(a[1].map((h) => h.form)).size,
    )[0]
    expect(new Set(worship.map((h) => h.form)).size).toBeGreaterThan(1)
    expect(new Set(worship.map((h) => h.lemma))).toEqual(new Set([lemma]))

    await graduate(lemmas[lemma].noteId!, 'quran-vocab-1')
    const known = knownLemmas(lemmas, await knownNoteIds(db))
    for (const head of worship) expect(known.has(head.lemma!), head.form).toBe(true)
  })
})

describe('the reader and the coverage metric agree on what is known', () => {
  it('marks exactly the words the metric counts, for the whole vocabulary track', async () => {
    for (const deck of decks) {
      for (const note of deck.notes) await graduate(note.id, deck.id)
    }

    const lemmas = await loadLemmas()
    const notes = await knownNoteIds(db)
    const marked = knownLemmas(lemmas, notes)

    // Every lemma the reader marks is a note the metric has counted as known.
    for (const lemma of marked) {
      expect(notes.has(lemmas[lemma].noteId!), lemma).toBe(true)
    }

    // And the metric, reading the same set, reports the whole syllabus.
    const coverage = await computeCoverage(db, new Date())
    expect(coverage.words).toBe(606)
    expect(marked.size).toBeGreaterThan(50)
  })

  it('goes quiet again when nothing has graduated, on both sides', async () => {
    const lemmas = await loadLemmas()
    await graduate(quranVocab1.notes[0].id, quranVocab1.id)
    await db.cardState.clear()

    expect(knownLemmas(lemmas, await knownNoteIds(db)).size).toBe(0)
    expect((await computeCoverage(db, new Date())).words).toBe(0)
  })
})
