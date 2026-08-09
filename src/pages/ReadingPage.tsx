import { Link } from 'react-router-dom'
import { PROVENANCE, readingTexts } from '../content/corpus'

/**
 * The Texts the reader can open. Whole surahs in their own order, because the
 * one thing curated Examples cannot give is text nobody arranged for the
 * learner — grammar wherever it happens to fall.
 */
export function ReadingPage() {
  return (
    <main className="page">
      <h1 className="page-title">Reading</h1>
      <p className="page-intro">
        Real text, Arabic only. Tap a word for its meaning and its grammar. There is
        no translation of an ayah anywhere here: the English and the Turkish explain
        words, not texts.
      </p>

      <div className="ref-list">
        {readingTexts.map((text) => (
          <Link key={text.surah} className="card ref-row" to={`/reading/${text.surah}`}>
            <div>
              <h2>
                {text.surah}. {text.name}
              </h2>
              <p>
                {text.english} · {text.ayat} ayat
              </p>
            </div>
            <span className="ref-arabic arabic">{text.nameArabic}</span>
          </Link>
        ))}
      </div>

      <p className="corpus-credit">
        Text from{' '}
        <a href={PROVENANCE.text.url} target="_blank" rel="noreferrer">
          the Tanzil Project
        </a>{' '}
        ({PROVENANCE.text.detail}, CC BY 3.0). Word-by-word morphology from{' '}
        <a href={PROVENANCE.morphology.url} target="_blank" rel="noreferrer">
          the Quranic Arabic Corpus
        </a>{' '}
        ({PROVENANCE.morphology.detail}, GPL). Neither is verified by hand, and no
        word here can ever become a flashcard — report an error from the word detail
        and it rides in your next backup.
      </p>
    </main>
  )
}
