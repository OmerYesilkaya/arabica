import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { referenceById } from '../content/reference'
import type { RefHarf, RefLabel, RefProse, RefTable, RefText } from '../content/types'
import { useLang, type Lang } from '../settings/useLang'
import { useStrings } from '../i18n/strings'

/** A RefLabel in the reader's language. */
function label(value: RefLabel, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang]
}

function TextCell({ value, lang }: { value: RefText; lang: Lang }) {
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

function ProseSection({ section, lang }: { section: RefProse; lang: Lang }) {
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

function TableSection({ section, lang }: { section: RefTable; lang: Lang }) {
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

function HarfSection({ section, lang }: { section: RefHarf; lang: Lang }) {
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

export function ReferenceEntryPage() {
  const { entryId } = useParams()
  const [searchParams] = useSearchParams()
  const entry = entryId ? referenceById(entryId) : undefined
  const anchor = searchParams.get('h')
  const lang = useLang()
  const s = useStrings()

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
        <p>{s.reference.comingSoon}</p>
        <p>
          <Link className="back" to="/reference">
            ← {s.reference.title}
          </Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page">
      <p>
        <Link className="back" to="/reference">
          ← {s.reference.title}
        </Link>
      </p>
      <h1 className="page-title">
        {entry.title[lang]} · <span className="arabic">{entry.titleArabic}</span>
      </h1>
      {/* The list is a syllabus and carries titles only, so the entry is where
          the summary is read. */}
      <p className="ref-summary">{entry.summary[lang]}</p>
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
