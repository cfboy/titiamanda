import { Menu, X, Instagram, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import logoPrimary from '@/assets/images/logo/full-logo.svg'
import logoIcon from '@/assets/images/logo/logo-icon.svg'
import { CONTACT_INFO } from '@/data/config'
import { useContactDrawer } from '@/hooks/useContactDrawer'
import { usePresence } from '@/hooks/usePresence'
import { useAnchorBase, useRoute } from '@/hooks/useRoute'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useStickyHeader } from '@/hooks/useStickyHeader'
import { SUPPORTED_LANGS, type SupportedLang } from '@/i18n'
import { cn } from '@/lib/utils'
import { SERVICE_PAGES, faqPath, servicePath, translateRoute } from '@/routes'

// 'services' renders separately as a dropdown, and 'contact' opens the drawer.
const NAV_LINKS = [
  { key: 'home', href: '#top' },
  { key: 'activities', href: '#features' },
  { key: 'about', href: '#about' },
] as const

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const emptySubscribe = () => () => {}

/** False during prerendering and hydration, true once running in the browser. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

/** Desktop Services dropdown: lists the 4 service pages. */
function ServicesMenu({
  isActive,
  anchorHref,
}: {
  isActive: boolean
  anchorHref: string
}) {
  const { t } = useTranslation()
  const route = useRoute()
  const [open, setOpen] = useState(false)
  const presence = usePresence(open, 160)
  const wrapRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(o => !o)}
        className={cn(
          'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium tracking-wider capitalize transition-colors duration-300',
          isActive || route.kind === 'service'
            ? 'text-pink-deep bg-pink/10'
            : 'text-gray-dark hover:text-pink-deep'
        )}
      >
        {t('nav.services')}
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={cn(
            'transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      {presence && (
        <ul
          className={cn(
            'shadow-light absolute top-full left-0 min-w-64 rounded-2xl border border-gray-100 bg-white p-2',
            presence === 'closing' ? 'menu-out' : 'menu-in'
          )}
        >
          {SERVICE_PAGES.map(s => (
            <li key={s.id}>
              <a
                href={servicePath(route.lng, s.id)}
                className={cn(
                  'block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                  route.serviceId === s.id
                    ? 'bg-pink/10 text-pink-deep'
                    : 'text-gray-dark hover:bg-pink/5 hover:text-pink-deep'
                )}
              >
                {t(`services.items.${s.id}.title`)}
              </a>
            </li>
          ))}
          <li className="mt-1 border-t border-gray-100 pt-1">
            <a
              href={anchorHref}
              className="text-gray-text hover:text-pink-deep block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            >
              {t('services.viewAll')}
            </a>
          </li>
        </ul>
      )}
    </li>
  )
}

// Each language lives at its own URL (/ = es, /en/ = en), so switching
// navigates instead of swapping resources in place. Storing the choice first
// keeps the root's auto-redirect from overriding an explicit selection.
function LanguageSwitcher({ className }: { className?: string }) {
  const { t } = useTranslation()
  const route = useRoute()
  const current: SupportedLang = route.lng

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-full bg-black/5 p-1',
        className
      )}
    >
      {SUPPORTED_LANGS.map(lang => (
        <a
          key={lang}
          // Goes to the same page in the other language, not always the home
          href={
            translateRoute(route, lang) +
            (typeof window !== 'undefined' ? window.location.hash : '')
          }
          onClick={() => localStorage.setItem('i18nextLng', lang)}
          aria-current={lang === current ? 'true' : undefined}
          aria-label={t(
            lang === 'es' ? 'a11y.switchToSpanish' : 'a11y.switchToEnglish'
          )}
          className={cn(
            'focus-visible:outline-pink rounded-full px-2.5 py-1 text-xs font-bold tracking-wider uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
            lang === current
              ? 'text-gray-dark bg-white shadow-sm'
              : 'text-gray-dark/70 hover:text-pink-deep'
          )}
        >
          {lang}
        </a>
      ))}
    </div>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const sheet = usePresence(mobileOpen, 350)
  // Portal targets document.body, which doesn't exist during prerendering.
  const mounted = useMounted()
  const isSticky = useStickyHeader()
  const activeSection = useScrollSpy()
  const { t } = useTranslation()
  const route = useRoute()
  const contactDrawer = useContactDrawer()
  const isHome = route.kind === 'home'
  const anchorBase = useAnchorBase()

  // Contact opens the drawer on any page instead of sending to the home.
  // The link keeps its real href as a no-JavaScript fallback.
  const openContact = (e: React.MouseEvent) => {
    e.preventDefault()
    setMobileOpen(false)
    contactDrawer.open()
  }

  // On the home page the anchors exist and we smooth-scroll; on internal
  // pages the link must navigate to the home first.
  const navHref = (hash: string) => `${anchorBase}${hash}`

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    if (!isHome) return // let the link navigate
    e.preventDefault()
    setMobileOpen(false)
    // Keep the hash current so the language switcher can preserve position
    history.replaceState(null, '', hash)
    scrollTo(hash.replace('#', ''))
  }

  return (
    // CSS entry animation, not Framer: a Framer `initial` would be serialized
    // into the prerendered HTML as opacity:0 and keep the header hidden until
    // hydration.
    <header
      className={cn(
        'enter-slide-down fixed top-0 right-0 left-0 z-60 transition-all duration-300',
        isSticky
          ? 'shadow-light h-16 bg-white/95 backdrop-blur-sm'
          : 'h-20 bg-transparent'
      )}
    >
      <div className="mx-auto h-full max-w-7xl px-4">
        <nav className="flex h-full items-center justify-between">
          {/* Logo */}
          <a
            href={navHref('#top')}
            onClick={e => handleNavClick(e, '#top')}
            className="flex h-full items-center px-3 py-2"
          >
            <img
              src={logoPrimary}
              alt={t('a11y.logoAlt')}
              width={820}
              height={480}
              className={cn(
                'hidden w-auto object-contain transition-all duration-300 md:block',
                isSticky ? 'h-12' : 'h-16'
              )}
            />
            <img
              src={logoIcon}
              alt={t('a11y.logoAlt')}
              width={260}
              height={490}
              className={cn(
                'block w-auto object-contain transition-all duration-300 md:hidden',
                isSticky ? 'h-8' : 'h-10'
              )}
            />
          </a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(link => {
              const isActive =
                isHome && activeSection === link.href.replace('#', '')
              const item = (
                <li key={link.href}>
                  <a
                    href={navHref(link.href)}
                    onClick={e => handleNavClick(e, link.href)}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium tracking-wider capitalize transition-colors duration-300',
                      isActive
                        ? 'text-pink-deep bg-pink/10'
                        : 'text-gray-dark hover:text-pink-deep'
                    )}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              )
              // The services dropdown goes right after Home
              return link.key === 'home'
                ? [
                    item,
                    <ServicesMenu
                      key="services-menu"
                      isActive={isHome && activeSection === 'services'}
                      anchorHref={navHref('#services')}
                    />,
                  ]
                : item
            })}
            <li>
              <a
                href={faqPath(route.lng)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium tracking-wider capitalize transition-colors duration-300',
                  route.kind === 'faq'
                    ? 'text-pink-deep bg-pink/10'
                    : 'text-gray-dark hover:text-pink-deep'
                )}
              >
                {t('nav.faq')}
              </a>
            </li>
            <li>
              <a
                href={navHref('#contact')}
                onClick={openContact}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium tracking-wider capitalize transition-colors duration-300',
                  isHome && activeSection === 'contact'
                    ? 'text-pink-deep bg-pink/10'
                    : 'text-gray-dark hover:text-pink-deep'
                )}
              >
                {t('nav.contact')}
              </a>
            </li>
            <li>
              <LanguageSwitcher className="ml-2" />
            </li>
          </ul>

          {/* Mobile: language switcher + Instagram, left of hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSwitcher />
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-dark hover:text-pink p-2 transition-colors"
              aria-label={t('a11y.instagram')}
            >
              <Instagram size={20} />
            </a>

            {/* Mobile Menu Button */}
            {/* Both icons stay mounted and cross-fade, which needs no
                presence tracking — only a transform and an opacity. */}
            <button
              type="button"
              className="text-gray-dark hover:text-pink relative z-60 grid h-9 w-9 place-items-center transition-colors active:scale-90 motion-reduce:transform-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t('a11y.toggleMenu')}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  'col-start-1 row-start-1 transition-all duration-150',
                  mobileOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                )}
              >
                <X size={22} className="text-pink" />
              </span>
              <span
                className={cn(
                  'col-start-1 row-start-1 transition-all duration-150',
                  mobileOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                )}
              >
                <Menu size={22} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu — full screen overlay via portal */}
      {mounted &&
        sheet &&
        createPortal(
          <div
            className={cn(
              'fixed inset-0 z-50 flex flex-col bg-white lg:hidden',
              sheet === 'closing' ? 'sheet-out' : 'sheet-in'
            )}
          >
            {/* Top bar spacer */}
            <div className="h-20 shrink-0" />

            {/* Nav links — justify-center-safe: centrado cuando cabe,
                    alineado arriba (y con scroll completo) cuando no cabe */}
            <nav className="flex flex-1 flex-col items-center justify-center-safe gap-1 overflow-y-auto px-6 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {/* Same order as desktop: Home first with the services
                      right below, as an expanded list — on mobile, hiding
                      them behind a toggle only adds friction */}
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  isHome && activeSection === link.href.replace('#', '')
                const item = (
                  <div
                    key={link.href}
                    style={{ animationDelay: `${100 + i * 60}ms` }}
                    className="menu-item-in w-full max-w-xs"
                  >
                    <a
                      href={navHref(link.href)}
                      onClick={e => handleNavClick(e, link.href)}
                      className={cn(
                        'block w-full rounded-2xl px-6 py-3 text-center font-semibold capitalize transition-colors duration-200',
                        isActive
                          ? 'bg-pink/10 text-pink-deep'
                          : 'text-gray-dark hover:bg-pink/5 hover:text-pink-deep'
                      )}
                    >
                      {t(`nav.${link.key}`)}
                    </a>
                  </div>
                )
                if (link.key !== 'home') return item
                return [
                  item,
                  <div
                    key="services-mobile"
                    style={{ animationDelay: '160ms' }}
                    className="menu-item-in w-full max-w-xs"
                  >
                    <a
                      href={navHref('#services')}
                      onClick={e => handleNavClick(e, '#services')}
                      className="text-gray-text block w-full px-6 pt-2 pb-1 text-center text-xs font-bold tracking-widest uppercase"
                    >
                      {t('nav.services')}
                    </a>
                    <ul className="space-y-1">
                      {SERVICE_PAGES.map(s => (
                        <li key={s.id}>
                          <a
                            href={servicePath(route.lng, s.id)}
                            className={cn(
                              'block w-full rounded-2xl px-6 py-3 text-center font-semibold transition-colors duration-200',
                              route.serviceId === s.id
                                ? 'bg-pink/10 text-pink-deep'
                                : 'text-gray-dark hover:bg-pink/5 hover:text-pink-deep'
                            )}
                          >
                            {t(`services.items.${s.id}.title`)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>,
                ]
              })}
              <div
                style={{
                  animationDelay: `${100 + NAV_LINKS.length * 60}ms`,
                }}
                className="menu-item-in w-full max-w-xs"
              >
                <a
                  href={faqPath(route.lng)}
                  className={cn(
                    'block w-full rounded-2xl px-6 py-3 text-center font-semibold capitalize transition-colors duration-200',
                    route.kind === 'faq'
                      ? 'bg-pink/10 text-pink-deep'
                      : 'text-gray-dark hover:bg-pink/5 hover:text-pink-deep'
                  )}
                >
                  {t('nav.faq')}
                </a>
              </div>
              <div
                style={{
                  animationDelay: `${160 + (NAV_LINKS.length + 1) * 60}ms`,
                }}
                className="menu-item-in w-full max-w-xs pt-2"
              >
                <a
                  href={navHref('#contact')}
                  onClick={openContact}
                  className="bg-blue-deep hover:bg-blue-deep/90 block w-full rounded-full px-6 py-3.5 text-center font-semibold text-white shadow-md transition-colors"
                >
                  {t('nav.contact')}
                </a>
              </div>
            </nav>
          </div>,
          document.body
        )}
    </header>
  )
}
