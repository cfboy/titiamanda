import { useTranslation } from 'react-i18next'

import ContactForm from '@/components/ContactForm'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

/**
 * The drawer itself, in its own module so `vaul` and this second form instance
 * load as a separate chunk. Nothing here is ever prerendered — the drawer is
 * closed on first paint — so keeping it out of the entry chunk costs no HTML.
 *
 * ContactDrawer.tsx owns the open state and imports this lazily.
 */
export default function ContactDrawerDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useTranslation()

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
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
          {/* Suffixed ids so this instance doesn't clash with the home section's */}
          <ContactForm idSuffix="-drawer" />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
