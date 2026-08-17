import { Link } from 'react-router-dom'
import { PROVENANCE, readingTexts } from '../content/corpus'
import { useStrings } from '../i18n/strings'

/**
 * The Texts the reader can open. Whole surahs in their own order, because the
 * one thing curated Examples cannot give is text nobody arranged for the
 * learner — grammar wherever it happens to fall.
 */
export function ReadingPage() {
  const s = useStrings()
  return (
    <main className="page">
      <h1 className="page-title">{s.reading.title}</h1>
      <p className="page-intro">{s.reading.intro}</p>

      <div className="ref-list">
        {readingTexts.map((text) => (
          <Link key={text.surah} className="card ref-row" to={`/reading/${text.surah}`}>
            <div>
              <h2>
                {text.surah}. {text.name}
              </h2>
              <p>
                {text.english} · {s.reading.ayat(text.ayat)}
              </p>
            </div>
            <span className="ref-arabic arabic">{text.nameArabic}</span>
          </Link>
        ))}
      </div>

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
