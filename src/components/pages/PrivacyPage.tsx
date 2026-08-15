import { useTranslation } from 'react-i18next'

import PageShell from '@/components/pages/PageShell'
import { type SupportedLang } from '@/i18n'
import { homePath } from '@/routes'

export default function PrivacyPage({ lng }: { lng: SupportedLang }) {
  const { t } = useTranslation()
  const sections = t('pages.privacy.sections', {
    returnObjects: true,
  }) as { title: string; body: string }[]

  return (
    <PageShell
      h1={t('pages.privacy.h1')}
      crumbs={[
        { label: t('pages.common.breadcrumbHome'), href: homePath(lng) },
        { label: t('pages.privacy.h1') },
      ]}
    >
      <p className="text-gray-dark mb-8 text-base leading-relaxed md:text-lg">
        {t('pages.privacy.intro')}
      </p>

      <div className="space-y-8">
        {sections.map(section => (
          <section key={section.title}>
            <h2 className="mb-2 text-xl font-extrabold text-black">
              {section.title}
            </h2>
            <p className="text-gray-dark leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      <p className="text-gray-dark mt-8 text-sm leading-relaxed">
        {t('pages.privacy.updated')}
      </p>
    </PageShell>
  )
}
