import { useTranslation } from 'react-i18next'

import logoPrimary from '@/assets/images/logo/full-logo.svg'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src={logoPrimary}
            alt={t('a11y.logoAlt')}
            className="h-auto max-w-44 object-contain opacity-80"
          />
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
