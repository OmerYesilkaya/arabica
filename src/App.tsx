import { Route, Routes, useLocation } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import { StudyPage } from './pages/StudyPage'
import { ReviewPage } from './pages/ReviewPage'
import { DrillsPage } from './pages/DrillsPage'
import { ReferencePage } from './pages/ReferencePage'
import { ReferenceEntryPage } from './pages/ReferenceEntryPage'
import { StatsPage } from './pages/StatsPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  const location = useLocation()
  const inReview = location.pathname.startsWith('/review/')

  return (
    <>
      <Routes>
        <Route path="/" element={<StudyPage />} />
        <Route path="/review/:deckId" element={<ReviewPage />} />
        <Route path="/drills" element={<DrillsPage />} />
        <Route path="/reference" element={<ReferencePage />} />
        <Route path="/reference/:entryId" element={<ReferenceEntryPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      {!inReview && <TabBar />}
    </>
  )
}
