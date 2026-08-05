import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { State } from 'ts-fsrs'
import { deckById } from '../content/decks'
import { noteIdOf } from '../content/types'
import { db, type CardStateRow } from '../db/db'
import {
  answerCard,
  intervalLabel,
  previewIntervals,
  Rating,
  type Grade,
} from '../srs/engine'
import { buildQueue, type QueueItem } from '../srs/queue'

/** Learning cards answered moments ago come back within this window. */
const LEARN_AHEAD_MS = 20 * 60 * 1000

function referenceLink(referenceId: string): string {
  const [entry, anchor] = referenceId.split('#')
  return anchor ? `/reference/${entry}?h=${anchor}` : `/reference/${entry}`
}

function Meaning({ english, turkish }: { english: string; turkish: string }) {
  return (
    <>
      <div className="meaning">
        <span className="lang">English</span>
        {english}
      </div>
      <div className="meaning">
        <span className="lang">Türkçe</span>
        {turkish}
      </div>
    </>
  )
}

export function ReviewPage() {
  const { deckId } = useParams()
  const deck = deckId ? deckById(deckId) : undefined

  const [queue, setQueue] = useState<QueueItem[] | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [doneCount, setDoneCount] = useState(0)

  useEffect(() => {
    if (!deck) return
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
      if (!current || !queue) return
      const now = new Date()
      await answerCard(db, current.content, current.state, rating, now)

      const updated: CardStateRow | undefined = await db.cardState.get(
        current.content.cardId,
      )
      const answeredNoteId = noteIdOf(current.content.cardId)

      // Drop the answered card and, when burying, its siblings from the session.
      let next = queue
        .slice(1)
        .filter(
          (item) =>
            !deck?.burySiblings ||
            noteIdOf(item.content.cardId) !== answeredNoteId,
        )

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

  return (
    <main className="page">
      <div className="review-top">
        <Link to="/" style={{ color: 'inherit' }}>
          ← {deck.name}
        </Link>
        <span>{queue.length} left</span>
      </div>

      <div className="review-card">
        {arabicFirst ? (
          <div className="prompt-arabic arabic">{note.arabic}</div>
        ) : (
          <Meaning english={note.english} turkish={note.turkish} />
        )}

        {revealed && (
          <>
            <hr />
            {arabicFirst ? (
              <Meaning english={note.english} turkish={note.turkish} />
            ) : (
              <div className="answer-arabic arabic">{note.arabic}</div>
            )}
            {note.example && (
              <div className="example">
                <span className="arabic">{note.example.arabic}</span>
                {note.example.english} · {note.example.turkish}
              </div>
            )}
            {note.referenceId && (
              <Link className="info-link" to={referenceLink(note.referenceId)}>
                ⓘ full entry
              </Link>
            )}
          </>
        )}
      </div>

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
