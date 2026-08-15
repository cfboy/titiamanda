import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { SERVICES } from '@/data/config'
import { useLang } from '@/hooks/useRoute'
import { IMAGES } from '@/lib/images'
import { cn } from '@/lib/utils'
import { servicePath } from '@/routes'

const BLOB_COLORS: Record<string, string> = {
  pink: 'from-pink/30 to-pink/10',
  blue: 'from-light-blue/50 to-blue/20',
  orange: 'from-orange/30 to-orange/10',
  green: 'from-green/30 to-green/10',
}

const DOT_COLORS: Record<string, string> = {
  pink: 'bg-pink',
  blue: 'bg-blue',
  orange: 'bg-orange',
  green: 'bg-green',
}

export default function ServicesSection() {
  const { t } = useTranslation()
  const lng = useLang()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<CarouselApi | undefined>(undefined)

  return (
    <section id="services" className="relative overflow-clip pt-8 pb-16">
      {/* Decorative cloud: background-image instead of <img> so it stays out
          of the accessibility tree and image audits */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-32 hidden h-64 w-64 bg-contain bg-no-repeat opacity-40 lg:block"
        style={{
          backgroundImage: "url('/assets/images/elements/cloud-element.webp')",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="reveal-up mb-14 text-center">
          <p className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
            {t('services.label')}
          </p>
          <h2 className="mx-auto mb-4 max-w-xl text-3xl leading-tight font-extrabold whitespace-pre-line text-black md:text-4xl">
            {t('services.heading')}
          </h2>
        </div>

        {/* Service Content Carousel */}
        <div className="relative px-4">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            setApi={api => {
              carouselRef.current = api
              if (api) {
                api.on('select', () => {
                  setActiveIndex(api.selectedScrollSnap())
                })
              }
            }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {SERVICES.map((service, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[92%] pl-0 sm:basis-full"
                >
                  {/* Service Content — 2-column layout */}
                  <div className="grid grid-cols-1 items-center gap-10 lg:min-h-105 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Service Image with blob */}
                    <div className="relative flex justify-center">
                      {/* Animated blob background */}
                      <div className="swap-in-scale pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div
                          className={cn(
                            'h-[88%] w-[88%] rounded-[60%_40%_55%_45%/45%_60%_40%_55%] bg-linear-to-br blur-sm transition-all duration-500',
                            BLOB_COLORS[service.color]
                          )}
                        />
                      </div>

                      <img
                        {...IMAGES[service.image]}
                        sizes="(min-width: 640px) 448px, 92vw"
                        alt={t(`services.items.${service.id}.title`)}
                        loading="lazy"
                        // Below the fold, and heavy: let it yield bandwidth to
                        // the hero rather than compete with the LCP image.
                        fetchPriority="low"
                        className="swap-in relative z-10 aspect-4/3 w-full max-w-md rounded-3xl object-cover shadow-xl"
                      />
                    </div>

                    {/* Right: Service Details */}
                    <div className="space-y-6">
                      <div className="swap-in space-y-5">
                        {/* Title */}
                        <h3 className="text-gray-dark text-2xl leading-tight font-extrabold md:text-3xl">
                          {t(`services.items.${service.id}.title`)}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                          {t(`services.items.${service.id}.description`)}
                        </p>

                        {/* Ideal For */}
                        <div className="space-y-2">
                          <p className="text-gray-dark text-sm font-bold">
                            {t('services.idealForLabel')}
                          </p>
                          <ul className="space-y-1.5">
                            {(
                              t(`services.items.${service.id}.idealFor`, {
                                returnObjects: true,
                              }) as string[]
                            ).map(item => (
                              <li
                                key={item}
                                className="text-gray-dark flex items-center gap-2.5 text-sm md:text-base"
                              >
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    'h-1.5 w-1.5 shrink-0 rounded-full',
                                    DOT_COLORS[service.color]
                                  )}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href={servicePath(lng, service.id)}
                          className="text-blue-deep hover:text-blue-deep/80 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 transition-colors"
                        >
                          {t(`services.items.${service.id}.linkText`, {
                            defaultValue: t('services.readMore'),
                          })}
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-gray-medium hover:text-gray-dark -left-4 hidden border-gray-200 bg-white/85 hover:bg-white sm:flex" />
            <CarouselNext className="text-gray-medium hover:text-gray-dark -right-4 hidden border-gray-200 bg-white/85 hover:bg-white sm:flex" />
          </Carousel>

          {/* Dot Indicators — position cue on every viewport */}
          <div className="mt-8 flex justify-center">
            {SERVICES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo(index)
                  }
                }}
                className="flex h-11 w-8 items-center justify-center"
                aria-label={t('a11y.goToSlide', { n: index + 1 })}
                aria-current={activeIndex === index ? 'true' : undefined}
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-300',
                    activeIndex === index
                      ? 'bg-pink-deep scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
