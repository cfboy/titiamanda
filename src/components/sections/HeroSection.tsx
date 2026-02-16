import { motion } from 'framer-motion'

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  return (
    <section
      id="top"
      className="bg-cream relative flex items-center overflow-hidden px-4 pt-30 md:pt-32 md:pb-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="order-2 space-y-6 text-center lg:order-1 lg:text-left"
          >
            <h1 className="mb-4 text-3xl leading-tight font-extrabold text-black md:text-6xl">
              Quality Babysitter
              <br />
              Services
            </h1>

            <p className="mx-auto max-w-md text-xl leading-relaxed text-black/70 lg:mx-0">
              Personalized care in homes and hotels, bringing{' '}
              <strong className="text-orange font-semibold">comfort</strong>,{' '}
              <strong className="text-blue font-semibold">safety</strong>, and{' '}
              <strong className="text-green font-semibold">
                joyful learning
              </strong>{' '}
              to every child.
            </p>

            <div className="flex justify-center lg:justify-start">
              <motion.button
                onClick={scrollToContact}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-600"
              >
                Book a session
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT — Photo collage with orange blob */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative order-2 flex items-center justify-center lg:order-2"
          >
            {/* Main collage image */}
            <img
              src="/assets/images/hero-picture.png"
              alt="Happy children with Titi Amanda"
              className="relative z-10 h-auto w-80 object-contain drop-shadow-2xl md:w-[380px] lg:w-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
