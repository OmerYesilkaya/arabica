import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { State } from 'ts-fsrs'
import { deckById, siblingCardsOf } from '../content/decks'
import type { Direction, Example, Meaning, Note } from '../content/types'
import { db, type CardStateRow } from '../db/db'
import {
  answerCard,
  intervalLabel,
  previewIntervals,
  Rating,
  type Grade,
} from '../srs/engine'
import { buildQueue, type QueueItem } from '../srs/queue'
import { VocabSheet } from '../components/VocabSheet'
import { locateHarf, stripTashkeel } from '../text/arabic'
import { referenceLink } from '../text/morphology'
import { setHideTashkeel, useHideTashkeel } from '../settings/useHideTashkeel'

/** Learning cards answered moments ago come back within this window. */
const LEARN_AHEAD_MS = 20 * 60 * 1000

/** Renders a Meaning as its two language lines. */
function MeaningLines({ meaning }: { meaning: Meaning }) {
  return (
    <>
      <div className="meaning">
        <span className="lang">English</span>
        {meaning.english}
      </div>
      <div className="meaning">
        <span className="lang">Türkçe</span>
        {meaning.turkish}
      </div>
    </>
  )
}

/**
 * What the front of the card asks you to produce. Two-direction decks show
 * the same note from both sides, and a bare meaning prompt is otherwise
 * indistinguishable from the back of an ar-to-meaning card.
 */
function askLabel(note: Note, direction: Direction): string {
  if (note.sense !== undefined) return '→ Sense'
  return direction === 'ar-to-meaning' ? '→ Meaning' : '→ Arabic'
}

/** The Arabic example text with `harf` highlighted inside it. */
function Highlighted({ text, harf }: { text: string; harf: string }) {
  const parts = locateHarf(text, harf)
  if (!parts) return <>{text}</>
  return (
    <>
      {parts.before}
      <mark className="harf-mark">{parts.match}</mark>
      {parts.after}
    </>
  )
}

/**
 * One translation line with the authored `span` marked inside it — the words
 * that render the Arabic `Highlighted` above marks.
 *
 * An exact substring, not a search: `span` is written to match the line it is
 * cut from, and a Turkish one is often a suffix rather than a whole word.
 * Content tests hold every span to occurring in its line, so a miss here is a
 * deck drifting from its highlights, and the line still reads plainly.
 */
function Marked({ text, span }: { text: string; span?: string }) {
  const at = span ? text.indexOf(span) : -1
  if (!span || at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="meaning-mark">{span}</mark>
      {text.slice(at + span.length)}
    </>
  )
}

/** Both translation lines of an Example, each with its highlight marked. */
function ExampleTranslation({ example }: { example: Example }) {
  return (
    <>
      <Marked text={example.english} span={example.highlight?.english} />
      {' · '}
      <Marked text={example.turkish} span={example.highlight?.turkish} />
      {example.source && <span className="source">{example.source}</span>}
    </>
  )
}

export function StudySessionPage() {
  const { deckId } = useParams()
  const deck = deckId ? deckById(deckId) : undefined

  const [queue, setQueue] = useState<QueueItem[] | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [doneCount, setDoneCount] = useState(0)
  const hideTashkeel = useHideTashkeel()
  const showArabic = (text: string) =>
    hideTashkeel ? stripTashkeel(text) : text

  useEffect(() => {
    if (!deck || deck.locked) return
    let cancelled = false
    buildQueue(db, deck, new Date()).then((q) => {
      if (!cancelled) setQueue(q)
    })
    return () => {
      cancelled = true
    }
  }, [deck])

  const current = queue?.[0]

  const previews = useMemo(() => {
    if (!current) return null
    const now = new Date()
    const due = previewIntervals(current.state, now)
    return {
      [Rating.Again]: intervalLabel(now, due[Rating.Again]),
      [Rating.Hard]: intervalLabel(now, due[Rating.Hard]),
      [Rating.Good]: intervalLabel(now, due[Rating.Good]),
      [Rating.Easy]: intervalLabel(now, due[Rating.Easy]),
    }
  }, [current])

  const grade = useCallback(
    async (rating: Grade) => {
      if (!current || !queue || !deck) return
      const now = new Date()
      await answerCard(db, current.content, current.state, rating, now)

      const updated: CardStateRow | undefined = await db.cardState.get(
        current.content.cardId,
      )

      // Drop the answered card and, when burying, its siblings from the session.
      const buried = deck.burySiblings
        ? new Set(siblingCardsOf(deck, current.content.cardId).map((c) => c.cardId))
        : new Set<string>()
      let next = queue
        .slice(1)
        .filter((item) => !buried.has(item.content.cardId))

      // Requeue a learning card that comes back within the learn-ahead window.
      if (
        updated &&
        (updated.state === State.Learning || updated.state === State.Relearning) &&
        updated.due <= now.getTime() + LEARN_AHEAD_MS
      ) {
        next = [...next, { content: current.content, state: updated }]
      }

      setQueue(next)
      setDoneCount((n) => n + 1)
      setRevealed(false)
      setSheetOpen(false)
    },
    [current, queue, deck],
  )

  if (!deck) {
    return (
      <main className="page">
        <p>Unknown deck.</p>
      </main>
    )
  }

  if (deck.locked) {
    return (
      <main className="page">
        <p>This deck is locked.</p>
        <p style={{ marginTop: 12 }}>
          <Link to="/">← Back to decks</Link>
        </p>
      </main>
    )
  }

  if (queue === null) {
    return <main className="page" />
  }

  if (!current) {
    return (
      <main className="page">
        <div className="done-screen">
          <div className="big">🎉</div>
          <h1 className="page-title">Session finished</h1>
          <p className="muted">
            {doneCount} answer{doneCount === 1 ? '' : 's'} today in {deck.name}.
          </p>
          <p style={{ marginTop: 16 }}>
            <Link className="button-primary" to="/">
              Back to decks
            </Link>
          </p>
        </div>
      </main>
    )
  }

  const { note, direction } = current.content
  const arabicFirst = direction === 'ar-to-meaning'
  const isSense = note.sense !== undefined
  const isVocab = note.vocab !== undefined

  return (
    <main className="page">
      <div className="session-top">
        <Link to="/" style={{ color: 'inherit' }}>
          ← {deck.name}
        </Link>
        <button
          type="button"
          className="tashkeel-toggle"
          aria-pressed={hideTashkeel}
          onClick={() => setHideTashkeel(!hideTashkeel)}
          title={hideTashkeel ? 'Show tashkeel' : 'Hide tashkeel'}
        >
          {hideTashkeel ? 'ـَـ off' : 'ـَـ on'}
        </button>
        <span>{queue.length} left</span>
      </div>

      <div className="session-card">
        <div className="prompt-ask">{askLabel(note, direction)}</div>

        {isSense ? (
          <div className="prompt-arabic arabic sense-prompt">
            <Highlighted
              text={showArabic(note.example!.arabic)}
              harf={note.arabic}
            />
          </div>
        ) : arabicFirst ? (
          <div className="prompt-arabic arabic">{showArabic(note.arabic)}</div>
        ) : (
          <MeaningLines meaning={note} />
        )}

        {revealed && isSense && (
          <>
            <hr />
            <div className="sense-term">
              {note.sense!.term}
              <span className="arabic">{note.sense!.termArabic}</span>
            </div>
            <MeaningLines meaning={note} />
            {note.example && (
              <div className="example example-translation">
                <ExampleTranslation example={note.example} />
              </div>
            )}
            {note.referenceId && (
              <Link className="info-link" to={referenceLink(note.referenceId)}>
                ⓘ full entry
              </Link>
            )}
          </>
        )}

        {revealed && !isSense && (
          <>
            <hr />
            {arabicFirst ? (
              <MeaningLines meaning={note} />
            ) : (
              <div className="answer-arabic arabic">{showArabic(note.arabic)}</div>
            )}
            {note.example && (
              <div className="example">
                <span className="arabic">
                  {isVocab ? (
                    <Highlighted
                      text={showArabic(note.example.arabic)}
                      harf={note.vocab!.occurringForm}
                    />
                  ) : (
                    showArabic(note.example.arabic)
                  )}
                </span>
                <ExampleTranslation example={note.example} />
              </div>
            )}
            {isVocab && (
              <button
                type="button"
                className="info-link detail-button"
                onClick={() => setSheetOpen(true)}
              >
                ⓘ word detail
              </button>
            )}
            {note.referenceId && (
              <Link className="info-link" to={referenceLink(note.referenceId)}>
                ⓘ full entry
              </Link>
            )}
          </>
        )}
      </div>

      {sheetOpen && isVocab && (
        <VocabSheet note={note} onClose={() => setSheetOpen(false)} />
      )}

      {revealed ? (
        <div className="answer-buttons">
          <button className="again" onClick={() => grade(Rating.Again)}>
            <span className="grade">Again</span>
            <span className="ivl">{previews?.[Rating.Again]}</span>
          </button>
          <button className="hard" onClick={() => grade(Rating.Hard)}>
            <span className="grade">Hard</span>
            <span className="ivl">{previews?.[Rating.Hard]}</span>
          </button>
          <button className="good" onClick={() => grade(Rating.Good)}>
            <span className="grade">Good</span>
            <span className="ivl">{previews?.[Rating.Good]}</span>
          </button>
          <button className="easy" onClick={() => grade(Rating.Easy)}>
            <span className="grade">Easy</span>
            <span className="ivl">{previews?.[Rating.Easy]}</span>
          </button>
        </div>
      ) : (
        <button className="primary show-answer" onClick={() => setRevealed(true)}>
          Show answer
        </button>
      )}
    </main>
  )
}
