import { DEFAULT_LANG, SUPPORTED_LANGS, type SupportedLang } from '@/i18n'

/**
 * Single source of routes: the client (resolveRoute), entry-server, and
 * scripts/prerender.mjs (via allRoutes) all use it so they never drift apart.
 *
 * No router: every route is prerendered to its own index.html, so a plain
 * <a href> serves the right HTML with no JavaScript involved.
 */

export type RouteKind = 'home' | 'service' | 'faq' | 'privacy'

export interface Route {
  kind: RouteKind
  lng: SupportedLang
  /** Only when kind === 'service'; matches the id in SERVICES from config.ts */
  serviceId?: string
  /** Absolute path with trailing slash, e.g. /servicios/cuido-en-hoteles/ */
  path: string
}

/** Per-language slugs. The id links to SERVICES and to the translation keys. */
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
  es: { services: 'servicios', faq: 'preguntas-frecuentes', privacy: 'privacidad' },
  en: { services: 'services', faq: 'faq', privacy: 'privacy' },
} as const

/** Language prefix: '' for Spanish (root), '/en' for English. */
function langPrefix(lng: SupportedLang): string {
  return lng === DEFAULT_LANG ? '' : `/${lng}`
}

export function homePath(lng: SupportedLang): string {
  return `${langPrefix(lng)}/`
}

export function servicePath(lng: SupportedLang, serviceId: string): string {
  const entry = SERVICE_PAGES.find(s => s.id === serviceId)
  if (!entry) throw new Error(`Unknown service: ${serviceId}`)
  return `${langPrefix(lng)}/${SEGMENTS[lng].services}/${entry[lng]}/`
}

export function faqPath(lng: SupportedLang): string {
  return `${langPrefix(lng)}/${SEGMENTS[lng].faq}/`
}

export function privacyPath(lng: SupportedLang): string {
  return `${langPrefix(lng)}/${SEGMENTS[lng].privacy}/`
}

/** The same page in the other language — for the switcher and for hreflang. */
export function translateRoute(route: Route, lng: SupportedLang): string {
  if (route.kind === 'service' && route.serviceId)
    return servicePath(lng, route.serviceId)
  if (route.kind === 'faq') return faqPath(lng)
  if (route.kind === 'privacy') return privacyPath(lng)
  return homePath(lng)
}

/** Every route in every language: prerender and sitemap iterate over this. */
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
    { kind: 'privacy' as const, lng, path: privacyPath(lng) },
  ])
}

/**
 * Route derived from the browser URL. Must match exactly what the prerender
 * used or React would fail to hydrate.
 */
export function resolveRoute(pathname: string): Route {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`
  const match = allRoutes().find(r => r.path === withSlash)
  if (match) return match
  // Unknown route (404.html serves the Spanish home)
  const lng = withSlash.startsWith('/en/') ? 'en' : DEFAULT_LANG
  return { kind: 'home', lng, path: homePath(lng) }
}
