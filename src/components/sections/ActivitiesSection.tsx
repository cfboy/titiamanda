import { motion } from 'framer-motion'
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
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { cn } from '@/lib/utils'

export default function ActivitiesSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<CarouselApi | undefined>(undefined)

  return (
    <section
      id="features"
      className="bg-light-blue relative overflow-hidden py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.2}
          className="mb-14"
        >
          <p className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
            {t('activities.label')}
          </p>
          <h2 className="mb-4 max-w-lg text-3xl leading-tight font-extrabold text-black md:text-4xl">
            {t('activities.heading')}
          </h2>
        </motion.div>

        {/* Desktop: all 8 activities visible at once — the safety/supervision
            cards must never hide behind a carousel */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="hidden gap-4 lg:grid lg:grid-cols-4"
        >
          {FEATURES.map(feature => (
            <ActivityCard key={feature.id} feature={feature} />
          ))}
        </motion.div>

        {/* Mobile/tablet: carousel */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="px-4 lg:hidden"
        >
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
                  <div className="p-1">
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
        </motion.div>
      </div>
    </section>
  )
}
