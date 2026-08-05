import { Link } from 'react-router-dom'
import { referenceEntries } from '../content/reference'

export function ReferencePage() {
  return (
    <main className="page">
      <h1 className="page-title">Reference</h1>
      <div className="ref-list">
        {referenceEntries.map((entry) =>
          entry.locked ? (
            <div key={entry.id} className="card ref-row locked">
              <div>
                <h2>{entry.title}</h2>
                <p>{entry.summary}</p>
              </div>
              <span className="lock">🔒 coming soon</span>
            </div>
          ) : (
            <Link key={entry.id} className="card ref-row" to={`/reference/${entry.id}`}>
              <div>
                <h2>{entry.title}</h2>
                <p>{entry.summary}</p>
              </div>
              <span className="ref-arabic arabic">{entry.titleArabic}</span>
            </Link>
          ),
        )}
      </div>
    </main>
  )
}
