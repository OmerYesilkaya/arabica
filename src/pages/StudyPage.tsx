import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { decks } from '../content/decks'
import { db } from '../db/db'
import { deckCounts } from '../srs/queue'
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
        <Link className="button-primary" to={`/review/${deck.id}`}>
          Study
        </Link>
      ) : (
        <span className="muted">Done ✓</span>
      )}
    </div>
  )
}

export function StudyPage() {
  return (
    <main className="page">
      <h1 className="page-title">Study</h1>
      <ExportReminder />
      {decks.map((deck) =>
        deck.locked ? (
          <LockedDeckRow key={deck.id} deckId={deck.id} />
        ) : (
          <DeckRow key={deck.id} deckId={deck.id} />
        ),
      )}
    </main>
  )
}
