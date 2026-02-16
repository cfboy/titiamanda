import { motion } from 'framer-motion'

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  return (
    <section
      id="top"
      className="bg-cream relative flex items-center overflow-hidden px-4 pt-4 md:pt-40 md:pb-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Mobile layout: flex column — heading, image, subtext+button */}
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center lg:hidden">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-3xl leading-tight font-extrabold text-black"
          >
            Quality Babysitter
            <br />
            Services
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <img
              src="/assets/images/hero-picture.png"
              alt="Happy children with Titi Amanda"
              className="h-auto w-72 object-contain drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="space-y-4"
          >
            <p className="mx-auto max-w-md text-lg leading-relaxed text-black/70">
              Personalized care in homes and hotels, bringing{' '}
              <strong className="text-orange font-semibold">comfort</strong>,{' '}
              <strong className="text-blue font-semibold">safety</strong>, and{' '}
              <strong className="text-green font-semibold">
                joyful learning
              </strong>{' '}
              to every child.
            </p>
            <motion.button
              onClick={scrollToContact}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-600"
            >
              Book a session
            </motion.button>
          </motion.div>
        </div>

        {/* Desktop layout: 2-column grid */}
        <div className="hidden min-h-[80vh] grid-cols-2 items-center gap-16 lg:grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="space-y-6 text-left"
          >
            <h1 className="mb-4 text-6xl leading-tight font-extrabold text-black">
              Quality Babysitter
              <br />
              Services
            </h1>
            <p className="max-w-md text-xl leading-relaxed text-black/70">
              Personalized care in homes and hotels, bringing{' '}
              <strong className="text-orange font-semibold">comfort</strong>,{' '}
              <strong className="text-blue font-semibold">safety</strong>, and{' '}
              <strong className="text-green font-semibold">
                joyful learning
              </strong>{' '}
              to every child.
            </p>
            <motion.button
              onClick={scrollToContact}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-600"
            >
              Book a session
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <img
              src="/assets/images/hero-picture.png"
              alt="Happy children with Titi Amanda"
              className="h-auto w-125 object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
