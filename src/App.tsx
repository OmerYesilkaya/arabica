import { Route, Routes, useLocation } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import { DecksPage } from './pages/DecksPage'
import { StudySessionPage } from './pages/StudySessionPage'
import { DrillsPage } from './pages/DrillsPage'
import { ReadingPage } from './pages/ReadingPage'
import { ReadingSurahPage } from './pages/ReadingSurahPage'
import { ReferencePage } from './pages/ReferencePage'
import { ReferenceEntryPage } from './pages/ReferenceEntryPage'
import { StatsPage } from './pages/StatsPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  const location = useLocation()
  const inStudySession = location.pathname.startsWith('/study/')

  return (
    <>
      <Routes>
        <Route path="/" element={<DecksPage />} />
        <Route path="/study/:deckId" element={<StudySessionPage />} />
        <Route path="/drills" element={<DrillsPage />} />
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
