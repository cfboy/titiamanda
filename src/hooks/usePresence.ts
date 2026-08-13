import { useEffect, useState } from 'react'

export type PresenceState = 'open' | 'closing' | null

/**
 * Keeps a node mounted while its closing animation plays.
 *
 * This is the one thing Framer's AnimatePresence did that CSS can't do alone —
 * CSS cannot animate an element React has already unmounted. Render while the
 * result is non-null and pick the class from the state:
 *
 *   const presence = usePresence(open, 350)
 *   {presence && (
 *     <div className={presence === 'closing' ? 'sheet-out' : 'sheet-in'} />
 *   )}
 *
 * `durationMs` has to match the CSS animation it pairs with; those rules live
 * in index.css next to each other for exactly that reason.
 */
export function usePresence(open: boolean, durationMs: number): PresenceState {
  const [state, setState] = useState<PresenceState>(open ? 'open' : null)
  const [wasOpen, setWasOpen] = useState(open)

  // Adjusting state while rendering rather than in an effect: React re-runs the
  // component before touching the DOM, so the node never shows a frame in the
  // wrong state. https://react.dev/learn/you-might-not-need-an-effect
  if (wasOpen !== open) {
    setWasOpen(open)
    // `null` means it has never been open, so there is nothing to animate out.
    setState(open ? 'open' : state === null ? null : 'closing')
  }

  useEffect(() => {
    if (state !== 'closing') return
    const id = window.setTimeout(() => setState(null), durationMs)
    return () => window.clearTimeout(id)
  }, [state, durationMs])

  return state
}
