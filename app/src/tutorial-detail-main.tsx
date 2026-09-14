import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TutorialDetail from './pages/TutorialDetail.tsx'
import { LangProvider } from './i18n.tsx'
import { TUTORIALS } from './tutorial-data.ts'

/* 每篇教程独立成页：壳页在 <body data-tutorial="..."> 上标明本页对应的教程，
   多个壳页共用本入口；未知取值时回落到第一篇。 */
const id = document.body.dataset.tutorial ?? ''
const tut = TUTORIALS.find((x) => x.id === id) ?? TUTORIALS[0]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <TutorialDetail tut={tut} />
    </LangProvider>
  </StrictMode>,
)
