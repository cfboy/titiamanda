import { createContext, useContext } from 'react'

export const ContactDrawerContext = createContext<{ open: () => void }>({
  open: () => {},
})

/** Abre el drawer de contacto desde cualquier parte (nav, CTAs, etc.). */
export function useContactDrawer() {
  return useContext(ContactDrawerContext)
}
