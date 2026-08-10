import { useTranslation } from 'react-i18next'

import PageShell from '@/components/pages/PageShell'
import { type SupportedLang } from '@/i18n'
import { homePath } from '@/routes'

export default function FaqPage({ lng }: { lng: SupportedLang }) {
  const { t } = useTranslation()
  const items = t('pages.faq.items', { returnObjects: true }) as {
    q: string
    a: string
  }[]

  return (
    <PageShell
      h1={t('pages.faq.h1')}
      crumbs={[
        { label: t('pages.common.breadcrumbHome'), href: homePath(lng) },
        { label: t('pages.faq.h1') },
      ]}
    >
      <p className="text-gray-dark mb-10 text-base leading-relaxed md:text-lg">
        {t('pages.faq.intro')}
      </p>

      <div className="space-y-7">
        {items.map(item => (
          <div key={item.q}>
            <h2 className="text-gray-dark mb-2 text-lg font-extrabold">
              {item.q}
            </h2>
            <p className="text-gray-dark leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
