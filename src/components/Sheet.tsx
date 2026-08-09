import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Drag further than this and the sheet closes on release. */
const DISMISS_PX = 80

/**
 * A bottom sheet: the app's one way of showing detail about a word.
 *
 * A sheet rather than an inline expander. On a card an expander reflows the
 * card in place, which moves the grading buttons out from under the thumb
 * mid-review; in the reader it would reflow the line being read. The sheet
 * leaves what is underneath untouched.
 *
 * This is the chrome only — backdrop, drag-to-dismiss, escape, scroll lock.
 * What goes inside is the caller's: VocabSheet on a card back, TokenSheet in
 * the reader. Reading's detail is a superset of a card's, which is why the two
 * share the frame rather than one growing a second mode.
 */
export function Sheet({
  label,
  onClose,
  children,
}: {
  label: string
  onClose: () => void
  children: ReactNode
}) {
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
    <div className="sheet-backdrop" onClick={onClose} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={label}
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
        {children}
        <button type="button" className="sheet-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
