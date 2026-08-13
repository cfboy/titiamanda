import { Mail, Phone, MessageCircle, Instagram, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import ContactForm from '@/components/ContactForm'
import { CONTACT_INFO } from '@/data/config'
import { cn } from '@/lib/utils'

interface ContactItem {
  icon: React.ComponentType<{ size?: number; className?: string }>
  labelKey: string
  display: string
  href: string | null
  bgColor: string
  target?: string
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Mail,
    labelKey: 'contact.items.email',
    display: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    bgColor: 'bg-pink',
  },
  {
    icon: Phone,
    labelKey: 'contact.items.phone',
    display: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phoneRaw}`,
    bgColor: 'bg-blue',
  },
  {
    icon: MessageCircle,
    labelKey: 'contact.items.whatsapp',
    display: CONTACT_INFO.phone,
    href: CONTACT_INFO.whatsapp,
    bgColor: 'bg-green',
    target: '_blank',
  },
  {
    icon: Instagram,
    labelKey: 'contact.items.instagram',
    display: CONTACT_INFO.instagramHandle,
    href: CONTACT_INFO.instagram,
    bgColor: 'bg-pink',
    target: '_blank',
  },
  {
    icon: MapPin,
    labelKey: 'contact.items.location',
    display: CONTACT_INFO.location,
    href: null,
    bgColor: 'bg-coral',
  },
]

export default function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="bg-light relative overflow-clip py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">
          {/* Left: Section Header + Contact Info */}
          <div className="reveal-left order-1 space-y-8 lg:col-span-2">
            {/* Section label + heading */}
            <div>
              <p className="font-secondary mb-3 font-bold tracking-[0.2em] text-black/70">
                {t('contact.label')}
              </p>
              <h2 className="mb-4 text-3xl leading-tight font-extrabold text-black">
                {t('contact.heading')}
              </h2>
              <p className="text-sm leading-relaxed text-black/70">
                {t('contact.intro')}
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-4">
              {CONTACT_ITEMS.map(item => (
                <div
                  key={item.labelKey}
                  className="group flex items-center gap-3"
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                      item.bgColor
                    )}
                  >
                    <item.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wide text-black/50 uppercase">
                      {t(item.labelKey)}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.target}
                        rel={item.target ? 'noopener noreferrer' : undefined}
                        className="text-sm text-black transition-colors duration-300 hover:text-black/70"
                      >
                        {item.display}
                      </a>
                    ) : (
                      <p className="text-sm text-black">{item.display}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="reveal-right order-1 lg:order-2 lg:col-span-3">
            <div className="rounded-3xl bg-white p-7 shadow-lg md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
