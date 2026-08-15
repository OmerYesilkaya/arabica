import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { referenceById } from '../content/reference'
import type { RefHarf, RefLabel, RefProse, RefTable, RefText } from '../content/types'
import {
  setMeaningLang,
  useMeaningLang,
  type MeaningLang,
} from '../settings/useMeaningLang'

/** A RefLabel in the reader's language. */
function label(value: RefLabel, lang: MeaningLang): string {
  return typeof value === 'string' ? value : value[lang]
}

function TextCell({ value, lang }: { value: RefText; lang: MeaningLang }) {
  if (typeof value === 'string' || !('ar' in value)) return <>{label(value, lang)}</>
  return (
    <>
      <span className="arabic">{value.ar}</span>
      {value.footnote && (
        <span className="cell-footnote">{label(value.footnote, lang)}</span>
      )}
      {value.source && <span className="cell-source">{value.source}</span>}
    </>
  )
}

function ProseSection({ section, lang }: { section: RefProse; lang: MeaningLang }) {
  return (
    <section className="ref-section">
      {section.title && <h2>{label(section.title, lang)}</h2>}
      {section.arabic && <div className="source-arabic arabic">{section.arabic}</div>}
      {section.paragraphs.map((p, i) => (
        <p key={i}>{p[lang]}</p>
      ))}
    </section>
  )
}

function TableSection({ section, lang }: { section: RefTable; lang: MeaningLang }) {
  return (
    <section className="ref-section">
      {section.title && <h2>{label(section.title, lang)}</h2>}
      <div className="table-scroll">
        <table className="ref-table">
          <thead>
            <tr>
              {section.columns.map((col, i) => (
                <th key={i}>
                  <TextCell value={col} lang={lang} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    <TextCell value={cell} lang={lang} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.caption && <p className="caption">{section.caption[lang]}</p>}
    </section>
  )
}

function HarfSection({ section, lang }: { section: RefHarf; lang: MeaningLang }) {
  return (
    <section className="ref-section harf-detail card" id={section.id}>
      <div className="harf-head">
        <span className="arabic">{section.arabic}</span>
        <span className="meaning">{section[lang]}</span>
      </div>
      {section.senses.map((sense, i) => (
        <div className="sense" key={i}>
          <div className="sense-term">
            {sense.term}
            <span className="arabic">{sense.termArabic}</span>
          </div>
          <p>{sense[lang]}</p>
          {/* Every example, not just the one a card happens to be showing:
              Reference is where the sense is defined, and a sense is easier to
              see across two sentences than inside one. */}
          {sense.examples.map((example, j) => (
            <div className="example" key={j}>
              <span className="arabic">{example.arabic}</span>
              {example[lang]}
              {example.source && <span className="source">{example.source}</span>}
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

const LANGS: { value: MeaningLang; label: string }[] = [
  { value: 'english', label: 'English' },
  { value: 'turkish', label: 'Türkçe' },
]

function LangSwitch({ lang }: { lang: MeaningLang }) {
  return (
    <div className="ref-toolbar">
      {LANGS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === lang ? 'toggle on' : 'toggle'}
          aria-pressed={option.value === lang}
          onClick={() => void setMeaningLang(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function ReferenceEntryPage() {
  const { entryId } = useParams()
  const [searchParams] = useSearchParams()
  const entry = entryId ? referenceById(entryId) : undefined
  const anchor = searchParams.get('h')
  const lang = useMeaningLang()

  useEffect(() => {
    if (!anchor) return
    // Wait one frame so the sections exist before scrolling.
    requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ block: 'start' })
    })
  }, [anchor, entryId])

  if (!entry || entry.locked) {
    return (
      <main className="page">
        <p>This entry is not available yet.</p>
        <p style={{ marginTop: 12 }}>
          <Link to="/reference">← Reference</Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page">
      <p style={{ marginBottom: 8 }}>
        <Link to="/reference" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          ← Reference
        </Link>
      </p>
      <h1 className="page-title">
        {entry.title} · <span className="arabic">{entry.titleArabic}</span>
      </h1>
      <LangSwitch lang={lang} />
      {entry.sections.map((section, i) => {
        switch (section.kind) {
          case 'prose':
            return <ProseSection key={i} section={section} lang={lang} />
          case 'table':
            return <TableSection key={i} section={section} lang={lang} />
          case 'harf':
            return <HarfSection key={section.id} section={section} lang={lang} />
        }
      })}
    </main>
  )
}
