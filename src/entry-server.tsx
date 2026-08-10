import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'

import App from './App'
import { initI18n } from './i18n'
import { allRoutes, resolveRoute, type Route } from './routes'

/** scripts/prerender.mjs itera sobre esto: una fuente única de rutas. */
export function routes(): Route[] {
  return allRoutes()
}

/** Usado por scripts/prerender.mjs para emitir HTML estático por ruta. */
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
