import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'

import App from './App'
import { initI18n } from './i18n'
import { allRoutes, resolveRoute, type Route } from './routes'

// scripts/prerender.mjs uses this to resolve title/description from the locale
// JSON files: a single key source shared with the client.
export { metaKeysFor } from './hooks/useDocumentMeta'

/** scripts/prerender.mjs iterates over this: a single source of routes. */
export function routes(): Route[] {
  return allRoutes()
}

/** Used by scripts/prerender.mjs to emit static HTML per route. */
export function render(pathname: string): string {
  const route = resolveRoute(pathname)
  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={initI18n(route.lng)}>
        <App route={route} />
      </I18nextProvider>
    </StrictMode>
  )
}
