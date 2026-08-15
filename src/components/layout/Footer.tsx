import { useTranslation } from 'react-i18next'

import logoPrimary from '@/assets/images/logo/full-logo.svg'
import { useLang } from '@/hooks/useRoute'
import { faqPath, privacyPath, servicePath } from '@/routes'

const FOOTER_SERVICES = [
  'at-home-care',
  'hotel-vacation',
] as const

export default function Footer() {
  const { t } = useTranslation()
  const lng = useLang()

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <img
            src={logoPrimary}
            alt={t('a11y.logoAlt')}
            width={820}
            height={480}
            className="h-auto max-w-44 object-contain opacity-80"
          />

          <nav aria-label={t('footer.navLabel')}>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {FOOTER_SERVICES.map(id => (
                <li key={id}>
                  <a
                    href={servicePath(lng, id)}
                    className="text-gray-dark hover:text-pink-deep text-sm font-medium transition-colors"
                  >
                    {t(`services.items.${id}.title`)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={faqPath(lng)}
                  className="text-gray-dark hover:text-pink-deep text-sm font-medium transition-colors"
                >
                  {t('nav.faq')}
                </a>
              </li>
              <li>
                <a
                  href={privacyPath(lng)}
                  className="text-gray-dark hover:text-pink-deep text-sm font-medium transition-colors"
                >
                  {t('footer.privacy')}
                </a>
              </li>
            </ul>
          </nav>

          <p className="text-gray-text text-center text-sm leading-relaxed">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-gray-dark text-center text-sm font-bold">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
