import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ContactForm from '@/components/ContactForm'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ContactDrawerContext } from '@/hooks/useContactDrawer'

/**
 * Monta el drawer una sola vez en el árbol. El formulario vive dentro con
 * ids sufijados para no chocar con la instancia de la sección del home.
 */
export function ContactDrawerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ContactDrawerContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[92vh]">
          <div className="mx-auto flex w-full max-w-2xl flex-col overflow-y-auto px-4 pb-8">
            <DrawerHeader className="px-0 text-left">
              <DrawerTitle className="text-2xl font-extrabold text-black">
                {t('contact.heading')}
              </DrawerTitle>
              <DrawerDescription className="text-gray-dark leading-relaxed">
                {t('contact.intro')}
              </DrawerDescription>
            </DrawerHeader>
            <ContactForm idSuffix="-drawer" />
          </div>
        </DrawerContent>
      </Drawer>
    </ContactDrawerContext.Provider>
  )
}
