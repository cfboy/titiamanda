import { Suspense, lazy, useEffect, useMemo, useState } from 'react'

import { ContactDrawerContext } from '@/hooks/useContactDrawer'

const ContactDrawerDialog = lazy(
  () => import('@/components/ContactDrawerDialog')
)

/** Warms the drawer chunk once the browser is idle, so the first tap on a CTA
 *  doesn't wait on a download. Falls back to a timeout on Safari < 17. */
function prefetchDialog() {
  const load = () => void import('@/components/ContactDrawerDialog')
  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(load, { timeout: 3000 })
    return () => window.cancelIdleCallback(handle)
  }
  const handle = window.setTimeout(load, 2000)
  return () => window.clearTimeout(handle)
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
  // Stable value: opening/closing the drawer must not re-render consumers
  const value = useMemo(
    () => ({
      open: () => {
        setHasOpened(true)
        setIsOpen(true)
      },
    }),
    []
  )

  useEffect(prefetchDialog, [])

  return (
    <ContactDrawerContext.Provider value={value}>
      {children}

      {hasOpened && (
        <Suspense fallback={null}>
          <ContactDrawerDialog open={isOpen} onOpenChange={setIsOpen} />
        </Suspense>
      )}
    </ContactDrawerContext.Provider>
  )
}
