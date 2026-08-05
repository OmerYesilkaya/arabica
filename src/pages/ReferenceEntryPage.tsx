import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { referenceById } from '../content/reference'
import type { RefHarf, RefProse, RefTable, RefText } from '../content/types'

function TextCell({ value }: { value: RefText }) {
  if (typeof value === 'string') return <>{value}</>
  return (
    <>
      <span className="arabic">{value.ar}</span>
      {value.note && <span className="cell-note">{value.note}</span>}
    </>
  )
}

function ProseSection({ section }: { section: RefProse }) {
  return (
    <section className="ref-section">
      {section.title && <h2>{section.title}</h2>}
      {section.arabic && <div className="source-arabic arabic">{section.arabic}</div>}
      {section.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  )
}

function TableSection({ section }: { section: RefTable }) {
  return (
    <section className="ref-section">
      {section.title && <h2>{section.title}</h2>}
      <div className="table-scroll">
        <table className="ref-table">
          <thead>
            <tr>
              {section.columns.map((col, i) => (
                <th key={i}>
                  <TextCell value={col} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    <TextCell value={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.caption && <p className="caption">{section.caption}</p>}
    </section>
  )
}

function HarfSection({ section }: { section: RefHarf }) {
  return (
    <section className="ref-section harf-detail card" id={section.id}>
      <div className="harf-head">
        <span className="arabic">{section.arabic}</span>
        <span className="gloss">
          {section.english} · {section.turkish}
        </span>
      </div>
      {section.senses.map((sense, i) => (
        <div className="sense" key={i}>
          <div className="sense-term">
            {sense.term}
            <span className="arabic">{sense.termArabic}</span>
          </div>
          <p>EN: {sense.english}</p>
          <p>TR: {sense.turkish}</p>
          {sense.example && (
            <div className="example">
              <span className="arabic">{sense.example.arabic}</span>
              {sense.example.english} · {sense.example.turkish}
              {sense.example.source && (
                <span className="source">{sense.example.source}</span>
              )}
            </div>
          )}
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
      {entry.sections.map((section, i) => {
        switch (section.kind) {
          case 'prose':
            return <ProseSection key={i} section={section} />
          case 'table':
            return <TableSection key={i} section={section} />
          case 'harf':
            return <HarfSection key={section.id} section={section} />
        }
      })}
    </main>
  )
}
