import { useTranslation } from 'react-i18next'

import PageShell from '@/components/pages/PageShell'
import { SERVICES } from '@/data/config'
import { type SupportedLang } from '@/i18n'
import { ICONS } from '@/lib/icons'
import { IMAGES } from '@/lib/images'
import { cn } from '@/lib/utils'
import { SERVICE_PAGES, homePath, servicePath } from '@/routes'

const ACCENT: Record<string, string> = {
  pink: 'bg-pink',
  blue: 'bg-blue',
  orange: 'bg-orange',
  green: 'bg-green',
}

export default function ServicePage({
  lng,
  serviceId,
}: {
  lng: SupportedLang
  serviceId: string
}) {
  const { t } = useTranslation()
  const service = SERVICES.find(s => s.id === serviceId)
  const base = `pages.services.${serviceId}`
  const Icon = service ? ICONS[service.icon] : undefined

  const intro = t(`${base}.intro`, { returnObjects: true }) as string[]
  const includes = t(`${base}.includes`, { returnObjects: true }) as string[]
  const how = t(`${base}.how`, { returnObjects: true }) as string[]
  const faq = t(`${base}.faq`, { returnObjects: true }) as {
    q: string
    a: string
  }[]
  const idealFor = t(`services.items.${serviceId}.idealFor`, {
    returnObjects: true,
  }) as string[]

  return (
    <PageShell
      h1={t(`${base}.h1`)}
      crumbs={[
        { label: t('pages.common.breadcrumbHome'), href: homePath(lng) },
        {
          label: t('pages.common.breadcrumbServices'),
          href: `${homePath(lng)}#services`,
        },
        { label: t(`services.items.${serviceId}.title`) },
      ]}
    >
      {service && (
        <img
          {...IMAGES[service.image]}
          sizes="(min-width: 768px) 736px, 100vw"
          alt={t(`services.items.${serviceId}.title`)}
          loading="lazy"
          className="mb-8 aspect-16/7 w-full rounded-3xl object-cover shadow-xl"
        />
      )}

      <div className="space-y-4">
        {intro.map(p => (
          <p
            key={p}
            className="text-gray-dark text-base leading-relaxed md:text-lg"
          >
            {p}
          </p>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-extrabold text-black">
          {Icon && service && (
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                ACCENT[service.color]
              )}
            >
              <Icon size={19} className="text-white" strokeWidth={2} />
            </span>
          )}
          {t('pages.common.includesTitle')}
        </h2>
        <ul className="space-y-2.5">
          {includes.map(item => (
            <li
              key={item}
              className="text-gray-dark flex items-start gap-3 leading-relaxed"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'mt-2 h-1.5 w-1.5 shrink-0 rounded-full',
                  service ? ACCENT[service.color] : 'bg-pink'
                )}
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-extrabold text-black">
          {t('pages.common.idealForTitle')}
        </h2>
        <ul className="space-y-2.5">
          {idealFor.map(item => (
            <li
              key={item}
              className="text-gray-dark flex items-start gap-3 leading-relaxed"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'mt-2 h-1.5 w-1.5 shrink-0 rounded-full',
                  service ? ACCENT[service.color] : 'bg-pink'
                )}
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-extrabold text-black">
          {t('pages.common.howTitle')}
        </h2>
        <ol className="space-y-3">
          {how.map((step, i) => (
            <li
              key={step}
              className="text-gray-dark flex gap-3.5 leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="bg-blue-deep flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-extrabold text-black">
          {t('pages.common.faqTitle')}
        </h2>
        <div className="space-y-5">
          {faq.map(item => (
            <div key={item.q}>
              <h3 className="text-gray-dark mb-1.5 font-bold">{item.q}</h3>
              <p className="text-gray-dark leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links to the other services: spread authority and give
          Google more crawl paths */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-extrabold text-black">
          {t('pages.common.otherServices')}
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          {SERVICE_PAGES.filter(s => s.id !== serviceId).map(s => (
            <li key={s.id}>
              <a
                href={servicePath(lng, s.id)}
                className="text-gray-dark hover:border-pink-deep hover:text-pink-deep inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors"
              >
                {t(`services.items.${s.id}.title`)}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  )
}
