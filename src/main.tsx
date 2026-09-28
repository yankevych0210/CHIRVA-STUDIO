import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is pre-rendered at build time (scripts/prerender.mjs) — hydrate it.
// In dev the root is empty, so render from scratch.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}

// Tells the inline failsafe in index.html that animations can stay enabled
;(window as Window & { __appReady?: boolean }).__appReady = true
