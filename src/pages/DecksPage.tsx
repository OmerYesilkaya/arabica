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
import { useStrings } from '../i18n/strings'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function ExportReminder() {
  const s = useStrings()
  const show = useLiveQuery(async () => {
    const total = await db.reviewLog.count()
    if (total === 0) return false
    const last = (await db.meta.get(LAST_EXPORT_KEY))?.value as number | undefined
    return last === undefined || Date.now() - last > THIRTY_DAYS_MS
  })

  if (!show) return null
  return (
    <div className="banner">
      <span>{s.decks.backupDue}</span>
      <Link to="/settings">{s.decks.exportNow}</Link>
    </div>
  )
}

function LockedDeckRow({ deckId }: { deckId: string }) {
  const s = useStrings()
  const deck = decks.find((d) => d.id === deckId)!
  return (
    <div className="card deck-row locked">
      <div className="deck-info">
        <h2>{deck.name}</h2>
        <div className="deck-arabic arabic">{deck.nameArabic}</div>
        <p className="deck-locked-note">{deck.description}</p>
      </div>
      <span className="lock">{s.decks.locked}</span>
    </div>
  )
}

function DeckRow({ deckId }: { deckId: string }) {
  const s = useStrings()
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
          <span className="new">{s.decks.countNew(counts?.newCount ?? 0)}</span>
          <span className="learn">{s.decks.countLearning(counts?.learningCount ?? 0)}</span>
          <span className="due">{s.decks.countDue(counts?.dueCount ?? 0)}</span>
        </div>
      </div>
      {total > 0 ? (
        <Link className="button-primary" to={`/study/${deck.id}`}>
          {s.decks.study}
        </Link>
      ) : (
        <span className="muted">{s.decks.done}</span>
      )}
    </div>
  )
}

/** Status dot: solid when finished, a ring while in progress, hollow when shut. */
function LevelDot({ done, current }: { done: boolean; current: boolean }) {
  const kind = done ? 'done' : current ? 'current' : 'shut'
  return <span className={`level-dot ${kind}`} aria-hidden="true" />
}

/**
 * The vocabulary track as one row. Twelve peer rows, ten of them repeating the
 * same "locked" sentence, would be noise: the track is a single thing being
 * progressed through.
 *
 * Each expanded row earns its place by saying something the others do not -
 * what is finished, where you are, how many words open the next level, and for
 * the rest, which slice of the frequency order they teach. The unlock rule is
 * stated once, on the only level it currently applies to.
 */
function VocabTrackRow() {
  const s = useStrings()
  const [expanded, setExpanded] = useState(false)
  const status = useLiveQuery(() => trackStatus(db, quranVocabTrack), [])

  if (!status) return null

  const percent = status.total ? Math.round((100 * status.graduated) / status.total) : 0
  const nextShut = status.levels.findIndex((level) => !level.unlocked)
  const previous = nextShut > 0 ? status.levels[nextShut - 1] : undefined
  const toUnlock = previous
    ? Math.max(0, Math.ceil(previous.total * GRADUATION_THRESHOLD) - previous.graduated)
    : 0

  return (
    <div className="card deck-track">
      <button
        type="button"
        className="track-summary"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="track-head">
          <span className="track-title">
            <h2>{s.decks.trackName}</h2>
            <span className="deck-arabic arabic">مُفْرَدَاتُ الْقُرْآنِ</span>
          </span>
          <span className="track-count">
            <strong>{status.graduated}</strong>
            <span className="muted">/{status.total}</span>
          </span>
        </span>

        {/* One segment per level, each filled by its own progress: the shape of
            the whole track, readable without expanding it. */}
        <span className="track-meter" aria-hidden="true">
          {status.levels.map((level) => (
            <span
              key={level.deck.id}
              className={`meter-cell ${level.unlocked ? 'open' : 'shut'}`}
            >
              <span
                className="meter-fill"
                style={{ width: `${level.total ? (100 * level.graduated) / level.total : 0}%` }}
              />
            </span>
          ))}
        </span>

        <span className="track-foot">
          <span className="muted">
            {s.decks.trackProgress(status.currentLevel, status.levels.length, percent)}
          </span>
          <span className="track-chevron">
            {expanded ? s.decks.hideLevels : s.decks.allLevels}
          </span>
        </span>
      </button>

      {expanded && (
        <ol className="track-levels">
          {status.levels.map((level, index) => {
            const done = level.total > 0 && level.graduated === level.total
            const current = level.unlocked && !done
            const isNext = index === nextShut
            return (
              <li key={level.deck.id} className={level.unlocked ? 'open' : 'shut'}>
                <LevelDot done={done} current={current} />
                <span className="level-name">
                  {s.decks.level(index + 1)}
                  <span className="level-band">
                    {s.decks.band(index * level.total + 1, (index + 1) * level.total)}
                  </span>
                </span>

                {done && <span className="muted">{s.decks.allKnown(level.total)}</span>}

                {current && (
                  <span className="level-progress">
                    <span className="level-bar">
                      <span
                        className="level-bar-fill"
                        style={{ width: `${(100 * level.graduated) / level.total}%` }}
                      />
                    </span>
                    <span className="muted">
                      {level.graduated}/{level.total}
                    </span>
                  </span>
                )}

                {isNext && <span className="muted">{s.decks.moreToOpen(toUnlock)}</span>}

                {level.unlocked ? (
                  <Link className="level-go" to={`/study/${level.deck.id}`}>
                    {s.decks.study}
                  </Link>
                ) : (
                  <span className="level-go placeholder" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}

export function DecksPage() {
  const s = useStrings()
  const standalone = decks.filter((deck) => !isVocabTrackDeck(deck.id))
  return (
    <main className="page">
      <h1 className="page-title">{s.decks.title}</h1>
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
