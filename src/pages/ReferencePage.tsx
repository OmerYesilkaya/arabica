import { Link } from 'react-router-dom'
import { referenceEntries } from '../content/reference'
import type { ReferenceEntry } from '../content/types'

/**
 * A row's contents, shared by the linked and the locked row.
 *
 * The number shown is `order`, not the position in the list: order is the
 * lesson number, and if a locked entry ever leaves a gap the lesson number is
 * still the true one.
 */
function RowBody({ entry }: { entry: ReferenceEntry }) {
  return (
    <>
      <span className="ref-num">{String(entry.order).padStart(2, '0')}</span>
      <span className="ref-titles">
        <span className="ref-title">{entry.title}</span>
        <span className="ref-arabic arabic">{entry.titleArabic}</span>
      </span>
      {entry.locked && <span className="lock">🔒 coming soon</span>}
    </>
  )
}

/**
 * Reference as a syllabus: the entries in the order the course teaches them,
 * numbered, each with its Arabic title on the line below the English one.
 *
 * Two deliberate absences. The summary is not here but on the entry, because a
 * list of ten sentences is read rather than scanned, and the reader arriving
 * here already knows what they came for. And the Arabic title never sits beside
 * the English one: two scripts competing for one line is what made a long title
 * widen the page, and no length of title can do that to a stacked row.
 */
export function ReferencePage() {
  return (
    <main className="page">
      <h1 className="page-title">Reference</h1>
      <ol className="card ref-list">
        {referenceEntries.map((entry) => (
          <li key={entry.id} className={entry.locked ? 'ref-row locked' : 'ref-row'}>
            {entry.locked ? (
              <span className="ref-static">
                <RowBody entry={entry} />
              </span>
            ) : (
              <Link className="ref-link" to={`/reference/${entry.id}`}>
                <RowBody entry={entry} />
              </Link>
            )}
          </li>
        ))}
      </ol>
    </main>
  )
}
