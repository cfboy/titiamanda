import { motion, AnimatePresence } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

import type { LucideIcon } from 'lucide-react'

import { SERVICES } from '@/data/config'
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  serviceContentVariants,
  viewportConfig,
} from '@/lib/animations'
import { cn, ICON_COLOR_MAP } from '@/lib/utils'

const BLOB_COLORS: Record<string, string> = {
  pink: 'from-pink/30 to-pink/10',
  blue: 'from-light-blue/50 to-blue/20',
  orange: 'from-orange/30 to-orange/10',
  green: 'from-green/30 to-green/10',
}

const TAB_ACTIVE: Record<string, string> = {
  pink: 'bg-pink text-white border-pink shadow-md',
  blue: 'bg-blue text-white border-blue shadow-md',
  orange: 'bg-orange text-white border-orange shadow-md',
  green: 'bg-green text-white border-green shadow-md',
}

const TAB_INACTIVE: Record<string, string> = {
  pink: 'border-pink/30 text-pink hover:bg-pink/10',
  blue: 'border-blue/30 text-blue hover:bg-blue/10',
  orange: 'border-orange/30 text-orange hover:bg-orange/10',
  green: 'border-green/30 text-green hover:bg-green/10',
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const service = SERVICES[activeIndex]

  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[
    service.icon
  ]

  return (
    <section id="services" className="relative overflow-hidden pt-20 pb-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.2}
          className="mb-14 text-center"
        >
          <h2 className="font-secondary mb-3 font-bold tracking-wider text-gray-500">
            Our Services
          </h2>
          <h2 className="text-gray-dark mx-auto max-w-xl text-3xl leading-tight font-extrabold capitalize md:text-4xl">
            Discover What I Offer For Your Children
          </h2>
        </motion.div>

        {/* Service Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.3}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {SERVICES.map((s, i) => {
            const TabIcon = (
              LucideIcons as unknown as Record<string, LucideIcon>
            )[s.icon]
            const isActive = i === activeIndex
            return (
              <button
                key={s.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                  isActive ? TAB_ACTIVE[s.color] : TAB_INACTIVE[s.color]
                )}
              >
                {TabIcon && <TabIcon size={15} />}
                {s.title}
              </button>
            )
          })}
        </motion.div>

        {/* Service Content — 2-column layout */}
        <div className="relative grid min-h-[420px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Counter badge */}
          <div className="text-gray-medium absolute -top-6 right-0 text-sm font-semibold">
            {activeIndex + 1}/{SERVICES.length}
          </div>
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
                key={`blob-${activeIndex}`}
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
                key={`img-${activeIndex}`}
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
                key={`content-${activeIndex}`}
                variants={serviceContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl',
                      `bg-${service.color}/10`
                    )}
                  >
                    {IconComponent && (
                      <IconComponent
                        size={26}
                        className={cn(ICON_COLOR_MAP[service.color])}
                      />
                    )}
                  </div>
                  <h3 className="text-gray-dark text-2xl leading-tight font-extrabold md:text-3xl">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                  {service.description}
                </p>

                {/* Ideal For */}
                <div className="space-y-2">
                  <h5 className="text-gray-dark text-sm font-bold tracking-wider uppercase">
                    Ideal for:
                  </h5>
                  <ul className="space-y-2">
                    {service.idealFor.map(item => (
                      <li
                        key={item}
                        className="text-gray-dark flex items-start gap-2"
                      >
                        <CheckCircle
                          size={16}
                          className={cn(
                            'mt-0.5 flex-shrink-0',
                            ICON_COLOR_MAP[service.color]
                          )}
                        />
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
                    `bg-${service.color} hover:opacity-90`
                  )}
                >
                  Book This Service
                  <LucideIcons.ArrowRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
