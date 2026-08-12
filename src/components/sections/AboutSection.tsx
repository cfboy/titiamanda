import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from '@/lib/animations'

export default function AboutSection() {
  const { t } = useTranslation()

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
          <p className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
            {t('about.label')}
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl text-3xl leading-tight font-extrabold whitespace-pre-line text-black">
            {t('about.heading')}
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
              {/* Brand blob behind the transparent cutout — same motif as the
                  services slides; bottom fade melts the torso edge away */}
              <div className="pointer-events-none absolute inset-x-[-8%] top-[14%] bottom-[4%]">
                <div className="from-pink/40 to-light-blue/30 h-full w-full rounded-[60%_40%_55%_45%/45%_60%_40%_55%] bg-linear-to-br blur-sm" />
              </div>
              <img
                src="/assets/images/titiamanda-profile.webp"
                alt={t('about.photoAlt')}
                width={700}
                height={1052}
                loading="lazy"
                className="relative z-10 h-auto w-56 mask-[linear-gradient(to_bottom,black_88%,transparent)] object-contain md:w-72 lg:w-80"
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
                <p className="text-gray-dark mt-2 text-center text-lg font-medium whitespace-pre-line">
                  {t('about.stats.years')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-blue font-secondary text-5xl font-extrabold md:text-6xl">
                  100+
                </p>
                <p className="text-gray-dark mt-2 text-center text-lg font-medium whitespace-pre-line">
                  {t('about.stats.families')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                {t('about.bio1')}
              </p>
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                {t('about.bio2')}
              </p>
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                {t('about.bio3')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
