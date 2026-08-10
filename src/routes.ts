import { DEFAULT_LANG, SUPPORTED_LANGS, type SupportedLang } from '@/i18n'

/**
 * Fuente única de rutas: la usan el cliente (resolveRoute), entry-server y
 * scripts/prerender.mjs (vía allRoutes) para no desincronizarse.
 *
 * Sin router: cada ruta se prerenderiza a su propio index.html, así que un
 * <a href> normal sirve el HTML correcto sin JavaScript de por medio.
 */

export type RouteKind = 'home' | 'service' | 'faq'

export interface Route {
  kind: RouteKind
  lng: SupportedLang
  /** Solo en kind === 'service'; coincide con el id en SERVICES de config.ts */
  serviceId?: string
  /** Ruta absoluta con barra final, p. ej. /servicios/cuido-en-hoteles/ */
  path: string
}

/** Slugs por idioma. El id enlaza con SERVICES y con las claves de traducción. */
export const SERVICE_PAGES = [
  { id: 'at-home-care', es: 'cuido-en-el-hogar', en: 'in-home-childcare' },
  { id: 'hotel-vacation', es: 'cuido-en-hoteles', en: 'hotel-babysitting' },
  {
    id: 'special-needs',
    es: 'necesidades-especiales',
    en: 'special-needs-care',
  },
  { id: 'family-outing', es: 'salidas-familiares', en: 'family-outings' },
] as const

const SEGMENTS = {
  es: { services: 'servicios', faq: 'preguntas-frecuentes' },
  en: { services: 'services', faq: 'faq' },
} as const

/** Prefijo del idioma: '' para español (raíz), '/en' para inglés. */
function langPrefix(lng: SupportedLang): string {
  return lng === DEFAULT_LANG ? '' : `/${lng}`
}

export function homePath(lng: SupportedLang): string {
  return `${langPrefix(lng)}/`
}

export function servicePath(lng: SupportedLang, serviceId: string): string {
  const entry = SERVICE_PAGES.find(s => s.id === serviceId)
  if (!entry) throw new Error(`Servicio desconocido: ${serviceId}`)
  return `${langPrefix(lng)}/${SEGMENTS[lng].services}/${entry[lng]}/`
}

export function faqPath(lng: SupportedLang): string {
  return `${langPrefix(lng)}/${SEGMENTS[lng].faq}/`
}

/** La misma página en el otro idioma — para el selector y para hreflang. */
export function translateRoute(route: Route, lng: SupportedLang): string {
  if (route.kind === 'service' && route.serviceId)
    return servicePath(lng, route.serviceId)
  if (route.kind === 'faq') return faqPath(lng)
  return homePath(lng)
}

/** Todas las rutas de todos los idiomas: prerender y sitemap iteran sobre esto. */
export function allRoutes(): Route[] {
  return SUPPORTED_LANGS.flatMap(lng => [
    { kind: 'home' as const, lng, path: homePath(lng) },
    ...SERVICE_PAGES.map(s => ({
      kind: 'service' as const,
      lng,
      serviceId: s.id,
      path: servicePath(lng, s.id),
    })),
    { kind: 'faq' as const, lng, path: faqPath(lng) },
  ])
}

/**
 * Ruta a partir de la URL del navegador. Debe coincidir exactamente con lo que
 * usó el prerender o React fallaría al hidratar.
 */
export function resolveRoute(pathname: string): Route {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`
  const match = allRoutes().find(r => r.path === withSlash)
  if (match) return match
  // Ruta desconocida (404.html sirve el home en español)
  const lng = withSlash.startsWith('/en/') ? 'en' : DEFAULT_LANG
  return { kind: 'home', lng, path: homePath(lng) }
}
