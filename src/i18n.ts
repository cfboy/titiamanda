import i18next, { type i18n } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en.json'
import es from '@/locales/es.json'

export const SUPPORTED_LANGS = ['es', 'en'] as const
export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const DEFAULT_LANG: SupportedLang = 'es'

/** Path of the page that serves a given language ('/' is Spanish). */
export function langPath(lang: SupportedLang): string {
  return lang === DEFAULT_LANG ? '/' : `/${lang}/`
}

const resources = {
  es: { translation: es },
  en: { translation: en },
}

/**
 * With `lng` (prerender): fixed language, no detection.
 * Without (client): the URL path decides the language — localStorage is only
 * written as a cache for the root redirect script, never read, so each URL
 * always renders its own language.
 */
export function initI18n(lng?: SupportedLang): i18n {
  const instance = i18next.createInstance()
  instance.use(initReactI18next)
  if (!lng) instance.use(LanguageDetector)

  instance.init({
    resources,
    lng,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: [...SUPPORTED_LANGS],
    nonExplicitSupportedLngs: true,
    initImmediate: false,
    detection: {
      order: ['querystring', 'path'],
      lookupQuerystring: 'lng',
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

  return instance
}
