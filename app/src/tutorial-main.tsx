import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tutorial from './pages/Tutorial.tsx'
import { LangProvider } from './i18n.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <Tutorial />
    </LangProvider>
  </StrictMode>,
)
