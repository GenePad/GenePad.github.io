import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TechSupport from './pages/TechSupport.tsx'
import { LangProvider } from './i18n.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <TechSupport />
    </LangProvider>
  </StrictMode>,
)
