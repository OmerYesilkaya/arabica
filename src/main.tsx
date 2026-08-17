import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './fonts.css'
import './index.css'
import App from './App.tsx'
import { db } from './db/db'
import { loadScheduler } from './srs/engine'
import { registerSw } from './registerSw'

// Load personalized FSRS weights before rendering so scheduling uses them.
await loadScheduler(db)

registerSw()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
