import { createContext, useContext } from 'react'

export const ContactDrawerContext = createContext<{ open: () => void }>({
  open: () => {},
})

/** Opens the contact drawer from anywhere (nav, CTAs, etc.). */
export function useContactDrawer() {
  return useContext(ContactDrawerContext)
}
