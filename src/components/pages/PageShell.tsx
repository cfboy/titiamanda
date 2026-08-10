import { useTranslation } from 'react-i18next'

import { CONTACT_INFO } from '@/data/config'
import { useContactDrawer } from '@/hooks/useContactDrawer'

interface Crumb {
  label: string
  href?: string
}

interface PageShellProps {
  crumbs: Crumb[]
  h1: string
  children: React.ReactNode
}

/** Cabecera común de las páginas internas: migas de pan + H1. */
export default function PageShell({ crumbs, h1, children }: PageShellProps) {
  const { t } = useTranslation()
  const contactDrawer = useContactDrawer()

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 pt-28 pb-16 md:pt-36">
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="text-gray-text flex flex-wrap items-center gap-x-2 text-sm">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <a
                    href={c.href}
                    className="hover:text-pink-deep underline underline-offset-2 transition-colors"
                  >
                    {c.label}
                  </a>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="mb-8 text-3xl leading-tight font-extrabold text-balance text-black md:text-4xl">
          {h1}
        </h1>

        {children}

        {/* CTA de cierre */}
        <section className="mt-14 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-2 text-xl font-extrabold text-black">
            {t('pages.common.ctaTitle')}
          </h2>
          <p className="text-gray-dark mb-5 leading-relaxed">
            {t('pages.common.ctaText')}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={contactDrawer.open}
              className="bg-blue-deep hover:bg-blue-deep/90 inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition-colors"
            >
              {t('pages.common.ctaButton')}
            </button>
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-deep border-green-deep/30 hover:bg-green-deep/5 inline-flex items-center rounded-full border px-7 py-3 text-sm font-semibold transition-colors"
            >
              {t('pages.common.ctaWhatsapp')}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
