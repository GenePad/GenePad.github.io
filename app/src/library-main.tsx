import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Library from './pages/Library.tsx'
import { LangProvider } from './i18n.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <Library />
    </LangProvider>
  </StrictMode>,
)
