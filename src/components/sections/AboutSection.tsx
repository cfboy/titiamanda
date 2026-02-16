import { motion } from 'framer-motion'

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from '@/lib/animations'

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden pt-20 pb-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="animate-float-reverse absolute top-10 left-6 h-20 w-20 opacity-20 md:left-16 md:h-28 md:w-28">
          <img
            src="/assets/images/elements/heart-element.png"
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <div className="animate-float absolute top-80 right-8 h-20 w-20 opacity-20 md:right-24 md:h-28 md:w-28">
          <img
            src="/assets/images/elements/sun-element.png"
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <div className="animate-float-slow absolute bottom-20 left-8 h-24 w-24 opacity-20 md:left-36 md:h-32 md:w-32">
          <img
            src="/assets/images/elements/cloud-element.png"
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
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
          <p className="font-secondary text-gray-dark mb-3 text-base font-bold tracking-[0.2em]">
            About Me
          </p>
          <h2 className="text-gray-dark mx-auto max-w-3xl text-3xl leading-tight font-extrabold md:text-4xl">
            Experienced babysitter
            <br />
            providing quality childcare.
          </h2>
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
                src="/assets/images/titiamanda.jpeg"
                alt="Titi Amanda — Professional Babysitter"
                className="relative z-10 h-auto w-72 rounded-lg object-contain md:w-80 lg:w-[400px]"
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
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-dark text-5xl font-extrabold md:text-6xl">
                  8+
                </p>
                <p className="text-gray-dark mt-2 text-sm font-medium">
                  Years of
                  <br />
                  Experience
                </p>
              </div>
              <div>
                <p className="text-gray-dark text-5xl font-extrabold md:text-6xl">
                  100+
                </p>
                <p className="text-gray-dark mt-2 text-sm font-medium">
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
