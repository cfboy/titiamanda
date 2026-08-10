import { createContext, useContext } from 'react'

import { DEFAULT_LANG, type SupportedLang } from '@/i18n'
import { homePath, type Route } from '@/routes'

const RouteContext = createContext<Route>({
  kind: 'home',
  lng: DEFAULT_LANG,
  path: homePath(DEFAULT_LANG),
})

export const RouteProvider = RouteContext.Provider

/** La ruta que se está renderizando. Header y Footer la usan para saber si
 *  los enlaces de ancla deben apuntar al home o a la sección de esta página. */
export function useRoute(): Route {
  return useContext(RouteContext)
}

/**
 * Prefijo para enlaces de ancla: '' en el home (el ancla existe en la página),
 * la ruta del home en páginas internas (hay que navegar primero).
 */
export function useAnchorBase(): string {
  const route = useRoute()
  return route.kind === 'home' ? '' : homePath(route.lng)
}

export function useLang(): SupportedLang {
  return useRoute().lng
}
