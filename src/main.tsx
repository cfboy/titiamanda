import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import './index.css'
import App from './App.tsx'
import { initI18n } from './i18n'

const rootEl = document.getElementById('root')!
const app = (
  <StrictMode>
    <I18nextProvider i18n={initI18n()}>
      <App />
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
