import { useTranslation } from 'react-i18next'

import PageShell from '@/components/pages/PageShell'
import { type SupportedLang } from '@/i18n'
import { homePath, servicePath } from '@/routes'

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

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-extrabold text-black">
          {t('pages.faq.related.title')}
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          <li>
            <a
              href={servicePath(lng, 'at-home-care')}
              className="text-gray-dark hover:border-pink-deep hover:text-pink-deep inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors"
            >
              {t('pages.faq.related.atHome')}
            </a>
          </li>
          <li>
            <a
              href={servicePath(lng, 'hotel-vacation')}
              className="text-gray-dark hover:border-pink-deep hover:text-pink-deep inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors"
            >
              {t('pages.faq.related.hotel')}
            </a>
          </li>
        </ul>
      </section>
    </PageShell>
  )
}
