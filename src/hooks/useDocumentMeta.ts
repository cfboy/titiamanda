import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import type { Route } from '@/routes'

/** Translation keys for title/description per page type. */
export function metaKeysFor(route: Route): {
  title: string
  description: string
} {
  if (route.kind === 'service' && route.serviceId)
    return {
      title: `pages.services.${route.serviceId}.title`,
      description: `pages.services.${route.serviceId}.description`,
    }
  if (route.kind === 'faq')
    return { title: 'pages.faq.title', description: 'pages.faq.description' }
  if (route.kind === 'privacy')
    return {
      title: 'pages.privacy.title',
      description: 'pages.privacy.description',
    }
  return { title: 'meta.title', description: 'meta.description' }
}

/** Keeps <html lang>, title, and meta description in sync with language and route. */
export function useDocumentMeta(route: Route) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const keys = metaKeysFor(route)
    document.documentElement.lang = i18n.language
    document.title = t(keys.title)
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t(keys.description))
  }, [t, i18n.language, route])
}
