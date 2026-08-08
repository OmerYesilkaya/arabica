import { useMemo, useRef, useState } from 'react'
import { buildDrillPool, type DrillItem } from '../content/drills'
import { arabicAnswersMatch, stripTashkeel } from '../text/arabic'
import { diffChars } from '../text/diff'

// Drills are unscheduled practice. This page never touches cardState or
// reviewLog; it only reads content data.

function shuffle<T>(source: readonly T[]): T[] {
  const out = source.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

interface Verdict {
  correct: boolean
  typed: string
}

function AnswerDiff({ expected, typed }: { expected: string; typed: string }) {
  // Diff on the bare (tashkeel-stripped) forms so missing vowels do not drown
  // out real letter differences. The voweled answer is shown separately.
  const parts = diffChars(stripTashkeel(expected), stripTashkeel(typed))
  return (
    <div className="drill-diff arabic" aria-label="Difference from your answer">
      {parts.map((p, idx) => (
        <span key={idx} className={`diff-${p.op}`}>
          {p.value}
        </span>
      ))}
    </div>
  )
}

export function DrillsPage() {
  const pool = useMemo(buildDrillPool, [])
  const [order, setOrder] = useState<DrillItem[]>(() => shuffle(pool))
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const inputRef = useRef<HTMLInputElement>(null)

  const current = order[index]

  const submit = () => {
    if (!current || verdict) return
    const typed = input.trim()
    if (!typed) return
    const correct = arabicAnswersMatch(typed, current.arabic)
    setVerdict({ correct, typed })
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
  }

  const next = () => {
    setVerdict(null)
    setInput('')
    setIndex((i) => i + 1)
    // Keep the input mounted and refocus it; on iOS this avoids the keyboard
    // dropping between questions.
    inputRef.current?.focus()
  }

  const restart = () => {
    setOrder(shuffle(pool))
    setIndex(0)
    setInput('')
    setVerdict(null)
    setScore({ correct: 0, total: 0 })
  }

  if (pool.length === 0) {
    return (
      <main className="page">
        <h1 className="page-title">Drills</h1>
        <p className="muted">No drill cards available yet.</p>
      </main>
    )
  }

  if (!current) {
    return (
      <main className="page">
        <div className="done-screen">
          <div className="big">🎉</div>
          <h1 className="page-title">Drill finished</h1>
          <p className="muted">
            {score.correct} / {score.total} correct.
          </p>
          <p style={{ marginTop: 16 }}>
            <button className="primary" onClick={restart}>
              Go again
            </button>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <h1 className="page-title">Drills</h1>
      <div className="review-top">
        <span>Type the Arabic</span>
        <span>
          {index + 1} / {order.length}
        </span>
      </div>

      <div className="review-card">
        <div className="meaning">
          <span className="lang">English</span>
          {current.english}
        </div>
        <div className="meaning">
          <span className="lang">Türkçe</span>
          {current.turkish}
        </div>

        <input
          ref={inputRef}
          className="drill-input arabic"
          type="text"
          dir="rtl"
          lang="ar"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="done"
          value={verdict ? verdict.typed : input}
          readOnly={verdict !== null}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            e.preventDefault()
            if (verdict) next()
            else submit()
          }}
          placeholder="اكتب هنا"
          aria-label="Your Arabic answer"
        />

        {verdict && (
          <>
            <hr />
            <div className={`drill-verdict ${verdict.correct ? 'ok' : 'no'}`}>
              {verdict.correct ? '✓ Correct' : '✗ Incorrect'}
            </div>
            <div className="answer-arabic arabic">{current.arabic}</div>
            {!verdict.correct && (
              <AnswerDiff expected={current.arabic} typed={verdict.typed} />
            )}
          </>
        )}
      </div>

      {verdict ? (
        <button className="primary show-answer" onClick={next}>
          Next
        </button>
      ) : (
        <button
          className="primary show-answer"
          onClick={submit}
          disabled={input.trim() === ''}
        >
          Check
        </button>
      )}
    </main>
  )
}
