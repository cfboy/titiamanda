import { motion } from 'framer-motion'

import ActivityCard from '@/components/cards/ActivityCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { FEATURES } from '@/data/config'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

export default function ActivitiesSection() {
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
          <h2 className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
            Activities
          </h2>
          <h1 className="mb-4 max-w-lg text-3xl leading-tight font-extrabold text-black md:text-4xl">
            Here&apos;s What&apos;s Included During Babysitting Time:
          </h1>
        </motion.div>

        {/* Activities Carousel */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
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
            <CarouselPrevious className="text-gray-medium hover:text-gray-dark -left-6 border-gray-200 bg-white/85 hover:bg-white" />
            <CarouselNext className="text-gray-medium hover:text-gray-dark -right-6 border-gray-200 bg-white/85 hover:bg-white" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
