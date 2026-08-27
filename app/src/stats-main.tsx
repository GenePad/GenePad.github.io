import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Stats from './pages/Stats.tsx'
import { LangProvider } from './i18n.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <Stats />
    </LangProvider>
  </StrictMode>,
)
