import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** Keeps <html lang>, title, and meta description in sync with the active language. */
export function useDocumentMeta() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.title = t('meta.title')
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t('meta.description'))
  }, [t, i18n.language])
}
