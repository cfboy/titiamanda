import { useState, useEffect } from 'react'

const SECTIONS = ['top', 'services', 'features', 'about', 'contact']

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120

      for (const sectionId of [...SECTIONS].reverse()) {
        const el = document.getElementById(sectionId)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}
