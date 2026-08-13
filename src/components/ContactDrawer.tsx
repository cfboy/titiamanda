import { Component, Suspense, lazy, useEffect, useMemo, useState } from 'react'

import { ContactDrawerContext } from '@/hooks/useContactDrawer'

const ContactDrawerDialog = lazy(
  () => import('@/components/ContactDrawerDialog')
)

/** Warms the drawer chunk once the browser is idle, so the first tap on a CTA
 *  doesn't wait on a download. Falls back to a timeout on Safari < 17. */
function prefetchDialog() {
  // Swallow the rejection: this is a warm-up, and a failure here is handled
  // properly by DialogBoundary when the drawer is actually opened.
  const load = () =>
    void import('@/components/ContactDrawerDialog').catch(() => {})
  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(load, { timeout: 3000 })
    return () => window.cancelIdleCallback(handle)
  }
  const handle = window.setTimeout(load, 2000)
  return () => window.clearTimeout(handle)
}

/**
 * Contains a failure to load the drawer chunk.
 *
 * Without this, a rejected dynamic import propagates to the root and unmounts
 * the whole site — and this import can genuinely fail: the site is served from
 * static hosting with hashed filenames, so a visitor with the page already open
 * when a deploy lands will 404 on the old chunk name. Losing the drawer is
 * acceptable; losing the page is not.
 */
class DialogBoundary extends Component<
  { onError: () => void; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Contact drawer failed to load', error)
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * Owns the contact drawer's open state for the whole tree.
 *
 * The drawer markup lives in a lazily imported module: it is never part of the
 * prerendered HTML (it starts closed), so loading it on demand keeps `vaul` and
 * a second copy of the form out of the entry chunk without costing any
 * server-rendered content.
 */
export function ContactDrawerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  // Stays true after the first open so the closing animation can play out and
  // the chunk isn't requested again.
  const [hasOpened, setHasOpened] = useState(false)
  const [failed, setFailed] = useState(false)

  const value = useMemo(
    () => ({
      open: () => {
        // The drawer is unavailable, so fall back to what the CTAs link to
        // anyway: the contact form on the home page.
        if (failed) {
          const section = document.getElementById('contact')
          if (section) section.scrollIntoView({ behavior: 'smooth' })
          else window.location.assign('/#contact')
          return
        }
        setHasOpened(true)
        setIsOpen(true)
      },
    }),
    [failed]
  )

  useEffect(prefetchDialog, [])

  return (
    <ContactDrawerContext.Provider value={value}>
      {children}

      {hasOpened && (
        <DialogBoundary onError={() => setFailed(true)}>
          <Suspense fallback={null}>
            <ContactDrawerDialog open={isOpen} onOpenChange={setIsOpen} />
          </Suspense>
        </DialogBoundary>
      )}
    </ContactDrawerContext.Provider>
  )
}
