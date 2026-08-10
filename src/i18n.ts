import i18next, { type i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en.json'
import es from '@/locales/es.json'

export const SUPPORTED_LANGS = ['es', 'en'] as const
export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const DEFAULT_LANG: SupportedLang = 'es'

const resources = {
  es: { translation: es },
  en: { translation: en },
}

/**
 * The language always comes from the route (/ = es, /en/ = en), both in the
 * prerender and on the client: there is no detection. main.tsx stores the
 * language in localStorage as a cache for the root redirect script.
 */
export function initI18n(lng: SupportedLang): i18n {
  const instance = i18next.createInstance()
  instance.use(initReactI18next)

  instance.init({
    resources,
    lng,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: [...SUPPORTED_LANGS],
    initImmediate: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

  return instance
}
