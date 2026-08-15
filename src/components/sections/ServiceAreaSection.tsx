import { useTranslation } from 'react-i18next'

import { useLang } from '@/hooks/useRoute'
import { servicePath } from '@/routes'

export default function ServiceAreaSection() {
  const { t } = useTranslation()
  const lng = useLang()

  return (
    <section id="service-area" className="relative overflow-clip bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="reveal-up mx-auto max-w-3xl text-center">
          <p className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
            {t('serviceArea.label')}
          </p>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold text-balance text-black md:text-4xl">
            {t('serviceArea.heading')}
          </h2>
          <p className="text-gray-dark mb-6 text-base leading-relaxed md:text-lg">
            {t('serviceArea.body')}
          </p>
          <a
            href={servicePath(lng, 'at-home-care')}
            className="text-blue-deep hover:text-blue-deep/80 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 transition-colors"
          >
            {t('serviceArea.inHomeLink')}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
