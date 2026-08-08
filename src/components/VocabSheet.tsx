import { useEffect, useRef, useState } from 'react'
import type { Note } from '../content/types'

/** Drag further than this and the sheet closes on release. */
const DISMISS_PX = 80

const PART_OF_SPEECH: Record<string, string> = {
  ism: 'ism (noun)',
  fil: "fi'l (verb)",
  harf: 'harf (particle)',
}

/**
 * Word detail for a vocabulary card, as a bottom sheet.
 *
 * A sheet rather than an inline expander: an expander reflows the card in
 * place, which moves the grading buttons out from under the thumb mid-review.
 * The sheet leaves the card untouched underneath.
 *
 * Opening it is a lookup, not a hint — the caller must not let it affect
 * grading. Rendered only on the back of a card: on the front the root and the
 * principal parts would give the meaning away.
 */
export function VocabSheet({ note, onClose }: { note: Note; onClose: () => void }) {
  const vocab = note.vocab!
  const [dragY, setDragY] = useState(0)
  const startY = useRef<number | null>(null)

  // Escape closes, and the page behind must not scroll while the sheet is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div
      className="sheet-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`Word detail for ${note.english}`}
        style={dragY ? { transform: `translateY(${dragY}px)` } : undefined}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          startY.current = e.touches[0].clientY
        }}
        onTouchMove={(e) => {
          if (startY.current === null) return
          // Downward only: dragging up must not lift the sheet off its edge.
          setDragY(Math.max(0, e.touches[0].clientY - startY.current))
        }}
        onTouchEnd={() => {
          startY.current = null
          if (dragY > DISMISS_PX) onClose()
          else setDragY(0)
        }}
      >
        <div className="sheet-grip" aria-hidden="true" />

        <div className="sheet-head">
          <span className="arabic sheet-word">{note.arabic}</span>
          <span className="sheet-pos">
            {PART_OF_SPEECH[vocab.partOfSpeech] ?? vocab.partOfSpeech}
          </span>
        </div>

        <dl className="sheet-rows">
          {vocab.root && (
            <div className="sheet-row">
              <dt>Root</dt>
              <dd className="arabic">{vocab.root}</dd>
            </div>
          )}
          {vocab.forms?.map((form) => (
            <div className="sheet-row" key={form.label}>
              <dt>{form.label}</dt>
              <dd className="arabic">{form.arabic}</dd>
            </div>
          ))}
          <div className="sheet-row">
            <dt>In the Qur'an</dt>
            <dd>
              {vocab.occurrences} time{vocab.occurrences === 1 ? '' : 's'}
            </dd>
          </div>
          <div className="sheet-row">
            <dt>Here as</dt>
            <dd className="arabic">{vocab.occurringForm}</dd>
          </div>
        </dl>

        <button type="button" className="sheet-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
