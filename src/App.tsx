import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useLang } from './settings/useLang'
import { TabBar } from './components/TabBar'
import { DecksPage } from './pages/DecksPage'
import { StudySessionPage } from './pages/StudySessionPage'
import { ReadingPage } from './pages/ReadingPage'
import { ReadingSurahPage } from './pages/ReadingSurahPage'
import { ReferencePage } from './pages/ReferencePage'
import { ReferenceEntryPage } from './pages/ReferenceEntryPage'
import { StatsPage } from './pages/StatsPage'
import { SettingsPage } from './pages/SettingsPage'

/** BCP 47 tags for the two Languages, for the `lang` attribute. */
const HTML_LANG = { english: 'en', turkish: 'tr' } as const

export default function App() {
  const location = useLocation()
  const lang = useLang()
  const inStudySession = location.pathname.startsWith('/study/')

  /*
   * The document's language, not just the interface's.
   *
   * Load-bearing for Turkish specifically: `text-transform: uppercase` is
   * locale-sensitive, and only under `lang="tr"` does a dotted i uppercase to
   * a dotted capital. Without this the uppercase micro-labels read MISAL where
   * Turkish spells it MİSAL — a different letter, and the giveaway that an
   * interface was translated rather than written.
   */
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])

  return (
    <>
      <Routes>
        <Route path="/" element={<DecksPage />} />
        <Route path="/study/:deckId" element={<StudySessionPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/reading/:surah" element={<ReadingSurahPage />} />
        <Route path="/reference" element={<ReferencePage />} />
        <Route path="/reference/:entryId" element={<ReferenceEntryPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      {!inStudySession && <TabBar />}
    </>
  )
}
