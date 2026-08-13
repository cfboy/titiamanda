import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import ActivityCard from '@/components/cards/ActivityCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { FEATURES } from '@/data/config'
import { cn } from '@/lib/utils'

export default function ActivitiesSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<CarouselApi | undefined>(undefined)

  return (
    <section
      id="features"
      className="bg-light-blue relative overflow-clip py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="reveal-up mb-14">
          <p className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
            {t('activities.label')}
          </p>
          <h2 className="mb-4 max-w-lg text-3xl leading-tight font-extrabold text-black md:text-4xl">
            {t('activities.heading')}
          </h2>
        </div>

        {/* Desktop: all 8 activities visible at once — the safety/supervision
            cards must never hide behind a carousel */}
        {/* Only this grid sits on the page's scroll timeline; the carousel
            below lives inside Embla's own scroll container, where a view()
            timeline would resolve against the carousel instead of the page.
            `delay` staggers the cards by shifting where each one starts in the
            scroll range — the scroll-driven equivalent of animation-delay. */}
        <div className="hidden gap-4 lg:grid lg:grid-cols-4">
          {FEATURES.map(feature => (
            <div
              key={feature.id}
              className="reveal-up h-full"
              style={
                {
                  '--reveal-start': `${feature.delay * 20}%`,
                } as React.CSSProperties
              }
            >
              <ActivityCard feature={feature} />
            </div>
          ))}
        </div>

        {/* Mobile/tablet: carousel */}
        <div className="px-4 lg:hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              // dragFree: true,
              containScroll: 'trimSnaps',
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
            <CarouselContent className="-ml-2 md:-ml-4">
              {FEATURES.map(feature => (
                <CarouselItem
                  key={feature.id}
                  className="basis-full pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="h-full p-1">
                    <ActivityCard feature={feature} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-gray-medium hover:text-gray-dark -left-6 hidden border-gray-200 bg-white/85 hover:bg-white sm:flex" />
            <CarouselNext className="text-gray-medium hover:text-gray-dark -right-6 hidden border-gray-200 bg-white/85 hover:bg-white sm:flex" />
          </Carousel>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center">
            {FEATURES.map((_, index) => (
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
