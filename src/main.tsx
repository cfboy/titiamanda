import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import './index.css'
import App from './App.tsx'
import { initI18n } from './i18n'
import { resolveRoute } from './routes'

// The route derives from the pathname and must match what the prerender used,
// or hydration fails.
const route = resolveRoute(window.location.pathname)

// Cache for the root redirect script: remembers the visited language so later
// visits are not redirected by browser language.
try {
  localStorage.setItem('i18nextLng', route.lng)
} catch {
  // localStorage may be unavailable (e.g. cookies blocked)
}

const rootEl = document.getElementById('root')!
const app = (
  <StrictMode>
    <I18nextProvider i18n={initI18n(route.lng)}>
      <App route={route} />
    </I18nextProvider>
  </StrictMode>
)

// Built pages ship prerendered HTML (hydrate). The dev server serves the raw
// template whose root holds only the <!--app-html--> comment placeholder, so
// check for an element child — a comment node would fool hasChildNodes().
if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
