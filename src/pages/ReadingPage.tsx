import { Link } from 'react-router-dom'
import { PROVENANCE, readingTexts } from '../content/corpus'
import { useStrings } from '../i18n/strings'

/**
 * The Texts the reader can open. Whole surahs in their own order, because the
 * one thing curated Examples cannot give is text nobody arranged for the
 * learner — grammar wherever it happens to fall.
 *
 * The same row as a Reference entry, and deliberately so: both are a numbered
 * sequence the course walks in order, and drawing them alike says that.
 */
export function ReadingPage() {
  const s = useStrings()
  return (
    <main className="page">
      <h1 className="page-title">{s.reading.title}</h1>
      <p className="page-intro">{s.reading.intro}</p>

      <ol className="card ref-list">
        {readingTexts.map((text) => (
          <li key={text.surah} className="ref-row">
            <Link className="ref-link" to={`/reading/${text.surah}`}>
              <span className="ref-num">{text.surah}</span>
              <span className="ref-titles">
                <span className="ref-title">{text.name}</span>
                <span className="ref-arabic arabic">{text.nameArabic}</span>
                <span className="ref-gloss">
                  {text.english} · {s.reading.ayat(text.ayat)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="corpus-credit">
        {s.reading.creditText}{' '}
        <a href={PROVENANCE.text.url} target="_blank" rel="noreferrer">
          {s.reading.creditTanzil}
        </a>{' '}
        ({PROVENANCE.text.detail}, CC BY 3.0). {s.reading.creditMorphology}{' '}
        <a href={PROVENANCE.morphology.url} target="_blank" rel="noreferrer">
          {s.reading.creditCorpus}
        </a>{' '}
        ({PROVENANCE.morphology.detail}, GPL). {s.reading.creditTail}
      </p>
    </main>
  )
}
