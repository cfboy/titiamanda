import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import logoPrimary from '@/assets/images/logo/full-logo.svg'
import logoIcon from '@/assets/images/logo/logo-icon.svg'
import { CONTACT_INFO } from '@/data/config'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useStickyHeader } from '@/hooks/useStickyHeader'
import { slideInDown } from '@/lib/animations'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Activities', href: '#features' },
  { label: 'About me', href: '#about' },
  { label: 'Contact me', href: '#contact' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isSticky = useStickyHeader()
  const activeSection = useScrollSpy()

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    scrollTo(href.replace('#', ''))
  }

  return (
    <motion.header
      variants={slideInDown}
      initial="hidden"
      animate="visible"
      className={cn(
        'fixed top-0 right-0 left-0 z-60 transition-all duration-300',
        isSticky
          ? 'shadow-light h-16 bg-white/95 backdrop-blur-sm'
          : 'h-20 bg-transparent'
      )}
    >
      <div className="mx-auto h-full max-w-7xl px-4">
        <nav className="flex h-full items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            onClick={e => {
              e.preventDefault()
              handleNavClick('#top')
            }}
            className="flex h-full items-center px-3 py-2"
          >
            <img
              src={logoPrimary}
              alt="Titi Amanda Logo"
              className={cn(
                'hidden w-auto object-contain transition-all duration-300 md:block',
                isSticky ? 'h-12' : 'h-16'
              )}
            />
            <img
              src={logoIcon}
              alt="Titi Amanda Logo"
              className={cn(
                'block w-auto object-contain transition-all duration-300 md:hidden',
                isSticky ? 'h-8' : 'h-10'
              )}
            />
          </a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium tracking-wider capitalize transition-colors duration-300',
                      isActive
                        ? 'text-pink bg-pink/10'
                        : 'text-gray-dark hover:text-pink'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Instagram — mobile only, left of hamburger */}
          <a
            href={CONTACT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-dark hover:text-pink p-2 transition-colors lg:hidden"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>

          {/* Mobile Menu Button */}
          <motion.button
            className="text-gray-dark hover:text-pink relative z-60 p-2 transition-colors lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} className="text-pink" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu — full screen overlay via portal */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
            >
              {/* Top bar spacer */}
              <div className="h-16 shrink-0" />

              {/* Nav links */}
              <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                      className="w-full max-w-xs"
                    >
                      <a
                        href={link.href}
                        onClick={e => {
                          e.preventDefault()
                          handleNavClick(link.href)
                        }}
                        className={cn(
                          'block w-full rounded-2xl px-6 py-4 text-center text-lg font-semibold capitalize transition-colors duration-200',
                          isActive
                            ? 'bg-pink/10 text-pink'
                            : 'text-gray-dark hover:bg-pink/5 hover:text-pink'
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Bottom decoration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="shrink-0 pb-10 text-center"
              >
                <img
                  src={logoIcon}
                  alt="Titi Amanda"
                  className="mx-auto h-10 w-auto opacity-20"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  )
}
