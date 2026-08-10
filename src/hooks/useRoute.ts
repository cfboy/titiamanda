import { createContext, useContext } from 'react'

import { DEFAULT_LANG, type SupportedLang } from '@/i18n'
import { homePath, type Route } from '@/routes'

const RouteContext = createContext<Route>({
  kind: 'home',
  lng: DEFAULT_LANG,
  path: homePath(DEFAULT_LANG),
})

export const RouteProvider = RouteContext.Provider

/** The route currently being rendered. Header and PageShell use it to decide
 *  whether anchor links should point to the home page or to this page. */
export function useRoute(): Route {
  return useContext(RouteContext)
}

/**
 * Prefix for anchor links: '' on the home page (the anchor exists there),
 * the home path on internal pages (they must navigate first).
 */
export function useAnchorBase(): string {
  const route = useRoute()
  return route.kind === 'home' ? '' : homePath(route.lng)
}

export function useLang(): SupportedLang {
  return useRoute().lng
}
