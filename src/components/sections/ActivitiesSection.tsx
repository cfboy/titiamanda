import { motion } from 'framer-motion'

import ActivityCard from '@/components/cards/ActivityCard'
import { FEATURES } from '@/data/config'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

export default function ActivitiesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#d0e8f5] py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.2}
          className="mb-14 text-center text-start"
        >
          <h2 className="text-gray-dark font-secondary mb-3 text-base font-bold">
            Activities
          </h2>
          <h2 className="text-gray-dark mx-auto max-w-3xl text-3xl leading-tight font-extrabold capitalize md:text-4xl">
            Here&apos;s What&apos;s <span className="text-blue"> Included</span>{' '}
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
          <span className="bg-blue h-3 w-3 rounded-full" />
          <span className="h-3 w-3 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
