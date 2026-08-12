import { Trans, useTranslation } from 'react-i18next'

import { useContactDrawer } from '@/hooks/useContactDrawer'
import { IMAGES } from '@/lib/images'

// Staggered entry, driven by CSS (see .enter-* in index.css) so the hero paints
// straight out of the prerendered HTML instead of waiting for hydration.
const HERO_DELAY = {
  image: '75ms',
  heading: '150ms',
  body: '225ms',
} as const

function HeroImage({ className }: { className: string }) {
  const { t } = useTranslation()
  return (
    <img
      {...IMAGES['hero-picture']}
      sizes="(min-width: 1024px) 500px, 288px"
      alt={t('hero.imageAlt')}
      // The LCP candidate: fetch it ahead of everything else, never lazily.
      fetchPriority="high"
      decoding="async"
      className={className}
    />
  )
}

function HeroSubtitle({ className }: { className: string }) {
  return (
    <p className={className}>
      <Trans
        i18nKey="hero.subtitle"
        components={{
          comfort: <strong className="text-orange-deep font-semibold" />,
          safety: <strong className="text-blue-deep font-semibold" />,
          joy: <strong className="text-green-deep font-semibold" />,
        }}
      />
    </p>
  )
}

function HeroCta() {
  const { t } = useTranslation()
  const contactDrawer = useContactDrawer()
  return (
    // Real anchor to the form as a no-JavaScript fallback; with JS it opens the drawer.
    <a
      href="#contact"
      onClick={e => {
        e.preventDefault()
        contactDrawer.open()
      }}
      className="bg-blue-deep hover:bg-blue-deep/90 inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-semibold text-white shadow-lg transition-[colors,transform] duration-200 hover:-translate-y-0.5 active:scale-[0.97] motion-reduce:transform-none"
    >
      {t('hero.cta')}
    </a>
  )
}

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="top"
      className="bg-cream relative flex items-center overflow-clip px-4 pt-24 pb-8 md:pt-40 md:pb-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Mobile layout: flex column — heading, image, subtext+button */}
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center lg:hidden">
          <h1
            style={{ animationDelay: HERO_DELAY.heading }}
            className="enter-fade-down text-3xl leading-tight font-extrabold text-balance whitespace-pre-line text-black"
          >
            {t('hero.title')}
          </h1>

          <div
            className="enter-fade-scale"
            style={{ animationDelay: HERO_DELAY.image }}
          >
            <HeroImage className="h-auto w-72 object-contain drop-shadow-2xl" />
          </div>

          <div
            className="enter-fade-up space-y-4"
            style={{ animationDelay: HERO_DELAY.body }}
          >
            <HeroSubtitle className="mx-auto max-w-md text-lg leading-relaxed text-black/70" />
            <HeroCta />
          </div>
        </div>

        {/* Desktop layout: 2-column grid */}
        <div className="hidden min-h-[80vh] grid-cols-2 items-center gap-16 lg:grid">
          <div
            className="enter-fade-left space-y-6 text-left"
            style={{ animationDelay: HERO_DELAY.heading }}
          >
            <h1 className="mb-4 text-6xl leading-tight font-extrabold text-balance whitespace-pre-line text-black">
              {t('hero.title')}
            </h1>
            <HeroSubtitle className="max-w-md text-xl leading-relaxed text-black/70" />
            <HeroCta />
          </div>

          <div
            className="enter-fade-scale flex items-center justify-center"
            style={{ animationDelay: HERO_DELAY.image }}
          >
            <HeroImage className="h-auto w-125 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
