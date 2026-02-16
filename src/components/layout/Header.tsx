import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useStickyHeader } from '@/hooks/useStickyHeader'
import { slideInDown } from '@/lib/animations'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
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
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
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
            className="flex h-full items-center"
          >
            <img
              src="/assets/images/logo/logo-no-description.png"
              alt="Titi Amanda Logo"
              className="hidden h-auto max-w-36 object-contain md:block"
            />
            <img
              src="/assets/images/logo/mini-logo.png"
              alt="Titi Amanda Logo"
              className="block h-auto max-w-20 object-contain md:hidden"
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

          {/* Mobile Menu Button */}
          <button
            className="text-gray-dark hover:text-pink z-30 p-2 transition-colors lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={22} className="text-pink" />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="shadow-medium absolute top-full left-0 w-full border-t border-gray-100 bg-white py-2 lg:hidden"
          >
            <ul>
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="hover:text-pink hover:bg-pink/5 block w-full border-b border-gray-100 px-6 py-3 text-center text-sm font-medium capitalize transition-colors last:border-b-0"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
