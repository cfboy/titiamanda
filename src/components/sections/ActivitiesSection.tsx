import { motion } from 'framer-motion'

import ActivityCard from '@/components/cards/ActivityCard'
import { FEATURES } from '@/data/config'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

export default function ActivitiesSection() {
  return (
    <section id="features" className="relative overflow-hidden py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.2}
          className="mb-14"
        >
          <p className="font-secondary text-gray-dark mb-3 text-base font-bold tracking-[0.2em]">
            Activities
          </p>
          <h2 className="text-gray-dark max-w-lg text-3xl leading-tight font-extrabold md:text-4xl">
            Here&apos;s What&apos;s <span className="text-blue">Included</span>{' '}
            During Babysitting Time:
          </h2>
        </motion.div>

        {/* Activities Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {FEATURES.slice(0, 4).map(feature => (
            <ActivityCard key={feature.id} feature={feature} />
          ))}
        </motion.div>

        {/* Pagination dots */}
        <div className="mt-10 flex justify-center gap-2">
          <span className="bg-dark h-3 w-3 rounded-full" />
          <span className="bg-dark/20 h-3 w-3 rounded-full" />
        </div>
      </div>
    </section>
  )
}
