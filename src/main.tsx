import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GrslApp from './GrslApp.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GrslApp />
  </StrictMode>,
)
