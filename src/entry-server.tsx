import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'

import App from './App'
import { initI18n, type SupportedLang } from './i18n'

/** Used by scripts/prerender.mjs to emit static HTML per locale. */
export function render(lng: SupportedLang): string {
  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={initI18n(lng)}>
        <App />
      </I18nextProvider>
    </StrictMode>
  )
}
