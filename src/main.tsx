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

// Built pages ship prerendered HTML (hydrate); the dev server has an empty root.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
