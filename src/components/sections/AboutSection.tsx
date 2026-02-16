import { motion } from 'framer-motion'

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from '@/lib/animations'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white pt-20 pb-16"
    >
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
            About Me
          </h2>
          <h1 className="mx-auto mb-4 max-w-3xl text-3xl leading-tight font-extrabold text-black">
            Experienced babysitter
            <br />
            providing quality childcare.
          </h1>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Profile Photo */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.3}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <img
                src="/assets/images/titiamanda.png"
                alt="Titi Amanda — Professional Babysitter"
                className="relative z-10 h-auto w-60 rounded-lg object-contain md:w-80 lg:w-[350px]"
              />
            </div>
          </motion.div>

          {/* Right: Bio Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.4}
            className="space-y-6"
          >
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center">
                <p className="text-blue font-secondary text-5xl font-extrabold md:text-6xl">
                  8+
                </p>
                <p className="text-gray-dark mt-2 text-lg font-medium">
                  Years of
                  <br />
                  Experience
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-blue font-secondary text-5xl font-extrabold md:text-6xl">
                  100+
                </p>
                <p className="text-gray-dark mt-2 text-lg font-medium">
                  Happy
                  <br />
                  Families :)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                Hi! I&apos;m Amanda, with 8+ years of experience caring for
                children in homes and hotels across Puerto Rico.
              </p>
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                Bachelor&apos;s in Speech Therapy, Master&apos;s in Special
                Education &amp; Autism, and Master&apos;s in Psychological
                Counseling.
              </p>
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                I specialize in toddlers &amp; preschoolers with fun, creative
                approaches, always with love, patience &amp; structure!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
