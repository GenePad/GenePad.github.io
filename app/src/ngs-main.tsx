import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Ngs from './pages/Ngs.tsx'
import { LangProvider } from './i18n.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <Ngs />
    </LangProvider>
  </StrictMode>,
)
