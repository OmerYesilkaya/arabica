import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { decks } from '../content/decks'
import { db } from '../db/db'
import { deckCounts } from '../srs/queue'
import {
  GRADUATION_THRESHOLD,
  isVocabTrackDeck,
  quranVocabTrack,
} from '../content/decks/quranVocabTrack'
import { trackStatus } from '../srs/vocabTrack'
import { LAST_EXPORT_KEY } from '../db/exportImport'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function ExportReminder() {
  const show = useLiveQuery(async () => {
    const total = await db.reviewLog.count()
    if (total === 0) return false
    const last = (await db.meta.get(LAST_EXPORT_KEY))?.value as number | undefined
    return last === undefined || Date.now() - last > THIRTY_DAYS_MS
  })

  if (!show) return null
  return (
    <div className="banner">
      <span>Backup is due: your progress lives only on this device.</span>
      <Link to="/settings">Export now</Link>
    </div>
  )
}

function LockedDeckRow({ deckId }: { deckId: string }) {
  const deck = decks.find((d) => d.id === deckId)!
  return (
    <div className="card deck-row locked">
      <div className="deck-info">
        <h2>{deck.name}</h2>
        <div className="deck-arabic arabic">{deck.nameArabic}</div>
        <p className="deck-locked-note">{deck.description}</p>
      </div>
      <span className="lock">Locked</span>
    </div>
  )
}

function DeckRow({ deckId }: { deckId: string }) {
  const deck = decks.find((d) => d.id === deckId)!
  const counts = useLiveQuery(
    () => deckCounts(db, deck, new Date()),
    [deck.id],
  )

  const total =
    (counts?.newCount ?? 0) + (counts?.learningCount ?? 0) + (counts?.dueCount ?? 0)

  return (
    <div className="card deck-row">
      <div className="deck-info">
        <h2>{deck.name}</h2>
        <div className="deck-arabic arabic">{deck.nameArabic}</div>
        <div className="counts">
          <span className="new">{counts?.newCount ?? 0} new</span>
          <span className="learn">{counts?.learningCount ?? 0} learning</span>
          <span className="due">{counts?.dueCount ?? 0} due</span>
        </div>
      </div>
      {total > 0 ? (
        <Link className="button-primary" to={`/study/${deck.id}`}>
          Study
        </Link>
      ) : (
        <span className="muted">Done ✓</span>
      )}
    </div>
  )
}

/**
 * The vocabulary track as one row. Twelve peer rows, ten of them saying
 * "Locked", would be noise: the track is a single thing being progressed
 * through, so it shows where you are and expands to the levels on demand.
 */
function VocabTrackRow() {
  const [expanded, setExpanded] = useState(false)
  const status = useLiveQuery(() => trackStatus(db, quranVocabTrack), [])

  if (!status) return null
  const percent = status.total ? Math.round((100 * status.graduated) / status.total) : 0

  return (
    <div className="card deck-track">
      <button
        type="button"
        className="track-summary"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="deck-info">
          <h2>Quran Vocabulary</h2>
          <span className="deck-arabic arabic">مُفْرَدَاتُ الْقُرْآنِ</span>
          <span className="track-progress">
            Level {status.currentLevel} · {status.graduated}/{status.total} words known
          </span>
          <span className="track-bar" aria-hidden="true">
            <span className="track-bar-fill" style={{ width: `${percent}%` }} />
          </span>
        </span>
        <span className="track-chevron" aria-hidden="true">
          {expanded ? '▾' : '▸'}
        </span>
      </button>

      {expanded && (
        <ol className="track-levels">
          {status.levels.map((level) => (
            <li key={level.deck.id} className={level.unlocked ? undefined : 'locked'}>
              <span className="track-level-name">{level.deck.name}</span>
              {level.unlocked ? (
                <>
                  <span className="muted">
                    {level.graduated}/{level.total} known
                  </span>
                  <Link className="button-primary" to={`/study/${level.deck.id}`}>
                    Study
                  </Link>
                </>
              ) : (
                <span className="lock">
                  Opens at {Math.round(GRADUATION_THRESHOLD * 100)}% of the level before
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export function DecksPage() {
  const standalone = decks.filter((deck) => !isVocabTrackDeck(deck.id))
  return (
    <main className="page">
      <h1 className="page-title">Study</h1>
      <ExportReminder />
      {standalone.map((deck) =>
        deck.locked ? (
          <LockedDeckRow key={deck.id} deckId={deck.id} />
        ) : (
          <DeckRow key={deck.id} deckId={deck.id} />
        ),
      )}
      <VocabTrackRow />
    </main>
  )
}
