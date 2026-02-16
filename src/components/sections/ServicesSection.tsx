import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { SERVICES } from '@/data/config'
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  serviceContentVariants,
  viewportConfig,
} from '@/lib/animations'
import { cn } from '@/lib/utils'

const BLOB_COLORS: Record<string, string> = {
  pink: 'from-pink/30 to-pink/10',
  blue: 'from-light-blue/50 to-blue/20',
  orange: 'from-orange/30 to-orange/10',
  green: 'from-green/30 to-green/10',
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<CarouselApi | undefined>(undefined)

  return (
    <section id="services" className="relative overflow-hidden pt-8 pb-16">
      {/* Decorative cloud */}
      <div className="pointer-events-none absolute top-12 right-32 hidden h-64 w-64 opacity-40 lg:block">
        <img
          src="/assets/images/elements/cloud-element.png"
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.2}
          className="mb-14 text-center"
        >
          <h2 className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
            Our Services
          </h2>
          <h1 className="mx-auto mb-4 max-w-xl text-3xl leading-tight font-extrabold text-black md:text-4xl">
            Discover What I Offer
            <br />
            For Your Children
          </h1>
        </motion.div>

        {/* Service Content Carousel */}
        <div className="relative">
          {/* Counter badge - positioned outside carousel */}
          <div className="mb-4 flex items-center justify-end">
            <div className="text-gray-medium text-sm font-semibold">
              {activeIndex + 1}/{SERVICES.length}
            </div>
          </div>

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
            <CarouselContent className="-ml-0">
              {SERVICES.map((service, index) => (
                <CarouselItem key={index} className="pl-0">
                  {/* Service Content — 2-column layout */}
                  <div className="grid min-h-[420px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Service Image with blob */}
                    <motion.div
                      variants={fadeInLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportConfig}
                      custom={0.4}
                      className="relative flex justify-center"
                    >
                      {/* Animated blob background */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`blob-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        >
                          <div
                            className={cn(
                              'h-[88%] w-[88%] rounded-[60%_40%_55%_45%/45%_60%_40%_55%] bg-gradient-to-br blur-sm transition-all duration-500',
                              BLOB_COLORS[service.color]
                            )}
                          />
                        </motion.div>
                      </AnimatePresence>

                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`img-${index}`}
                          src={service.image}
                          alt={service.title}
                          variants={serviceContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="relative z-10 aspect-[4/3] w-full max-w-md rounded-3xl object-cover shadow-xl"
                        />
                      </AnimatePresence>
                    </motion.div>

                    {/* Right: Service Details */}
                    <motion.div
                      variants={fadeInRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportConfig}
                      custom={0.5}
                      className="space-y-6"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`content-${index}`}
                          variants={serviceContentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="space-y-5"
                        >
                          {/* Title */}
                          <h3 className="text-gray-dark text-2xl leading-tight font-extrabold md:text-3xl">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                            {service.description}
                          </p>

                          {/* Ideal For */}
                          <div className="space-y-2">
                            <h5 className="text-gray-dark text-sm font-bold">
                              Ideal for:
                            </h5>
                            <ul className="space-y-1.5">
                              {service.idealFor.map(item => (
                                <li
                                  key={item}
                                  className="text-gray-dark text-sm md:text-base"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-gray-medium hover:text-gray-dark -left-4 border-gray-200 bg-white/85 hover:bg-white" />
            <CarouselNext className="text-gray-medium hover:text-gray-dark -right-4 border-gray-200 bg-white/85 hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
