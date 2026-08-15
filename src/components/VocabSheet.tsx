import type { Note } from '../content/types'
import { Sheet } from './Sheet'

const PART_OF_SPEECH: Record<string, string> = {
  ism: 'ism (noun)',
  fil: "fi'l (verb)",
  harf: 'harf (particle)',
}

/**
 * Word detail for a vocabulary card, inside the shared bottom sheet.
 *
 * Opening it is a lookup, not a hint — the caller must not let it affect
 * grading. Rendered only on the back of a card: on the front the root and the
 * principal parts would give the meaning away.
 */
export function VocabSheet({ note, onClose }: { note: Note; onClose: () => void }) {
  const vocab = note.vocab!

  return (
    <Sheet label={`Word detail for ${note.english}`} onClose={onClose}>
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
          <dt>Here as</dt>
          <dd className="arabic">{vocab.occurringForm}</dd>
        </div>
      </dl>
    </Sheet>
  )
}
