import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight } from 'lucide-react'

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from '@/lib/animations'

const STATS = [
  { value: '8+', label: 'Years of\nExperience', color: 'blue' },
  { value: '100+', label: 'Happy\nFamilies', color: 'pink' },
]

const CREDENTIALS = [
  "Bachelor's in Speech Therapy",
  "Master's in Special Education & Autism",
  "Master's in Psychological Counseling",
]

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

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
          <h6 className="text-pink mb-3 text-base font-bold tracking-wider uppercase">
            About Me
          </h6>
          <h2 className="text-gray-dark mx-auto max-w-3xl text-3xl leading-tight font-extrabold capitalize md:text-4xl">
            Experienced <em className="text-pink not-italic">babysitter</em>{' '}
            providing quality childcare.
          </h2>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Profile Photo with colorful decorations */}
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
              {STATS.map(stat => (
                <div key={stat.label}>
                  <p
                    className={`text-5xl font-extrabold text-${stat.color} md:text-6xl`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-dark mt-2 text-sm font-medium whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                Hi! I&apos;m Amanda, a professional babysitter with over{' '}
                <span className="text-blue font-bold">
                  8 years of experience
                </span>{' '}
                caring for children in homes and hotels across Puerto Rico.
              </p>
              <p className="text-gray-dark text-base leading-relaxed md:text-lg">
                I specialize in toddlers & preschoolers with fun, creative
                approaches — always with{' '}
                <span className="text-pink font-bold">love</span>,{' '}
                <span className="text-pink font-bold">patience</span> &{' '}
                <span className="text-pink font-bold">structure</span>!
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-3">
              <div className="mb-3 flex items-center gap-2">
                <GraduationCap size={18} className="text-blue" />
                <h5 className="text-gray-dark text-sm font-bold tracking-wider uppercase">
                  Education
                </h5>
              </div>
              <ul className="space-y-2">
                {CREDENTIALS.map(cred => (
                  <li
                    key={cred}
                    className="text-gray-dark flex items-start gap-2 text-sm"
                  >
                    <span className="bg-blue mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                    {cred}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="bg-blue border-blue hover:text-blue inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
            >
              Book a Session
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
