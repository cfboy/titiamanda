import { useForm } from '@tanstack/react-form'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Send,
  CheckCircle,
  Plus,
  Loader2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_INFO, SERVICE_OPTIONS } from '@/data/config'
import { fadeInLeft, fadeInRight, viewportConfig } from '@/lib/animations'
import { createContactSchema } from '@/lib/contactSchema'
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

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactSection() {
  const { t, i18n } = useTranslation()
  const [formState, setFormState] = useState<FormState>('idle')

  const contactSchema = useMemo(
    () => createContactSchema(t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  )

  const validateField = (
    value: string,
    fieldName: 'name' | 'phone' | 'email' | 'children'
  ) => {
    const result = contactSchema.shape[fieldName].safeParse(value)
    if (!result.success) {
      return result.error.issues[0]?.message ?? t('contact.validation.invalid')
    }
    return undefined
  }

  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      children: '',
      service: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      const result = contactSchema.safeParse(value)
      if (!result.success) return

      setFormState('submitting')
      try {
        const body = new URLSearchParams(value as Record<string, string>)
        const res = await fetch(CONTACT_INFO.webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        })
        if (!res.ok) throw new Error('Network error')
        setFormState('success')
      } catch {
        setFormState('error')
      }
    },
  })

  const handleReset = () => {
    form.reset()
    setFormState('idle')
  }

  return (
    <section id="contact" className="bg-light relative overflow-hidden py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">
          {/* Left: Section Header + Contact Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.2}
            className="order-1 space-y-8 lg:col-span-2"
          >
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
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.4}
            className="order-1 lg:order-2 lg:col-span-3"
          >
            <div className="rounded-3xl bg-white p-7 shadow-lg md:p-10">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-4 py-8 text-center"
                >
                  <div className="bg-green/10 flex h-16 w-16 items-center justify-center rounded-full">
                    <CheckCircle size={32} className="text-green" />
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {t('contact.form.success.title')}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/70">
                    {t('contact.form.success.body')}
                  </p>
                  <Button
                    onClick={handleReset}
                    className="bg-green hover:bg-green/90 mt-2 gap-2 rounded-full px-6 text-white"
                  >
                    <Plus size={15} />
                    {t('contact.form.success.again')}
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    form.handleSubmit()
                  }}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
                >
                  {/* Full Name */}
                  <form.Field
                    name="name"
                    validators={{
                      onBlur: ({ value }) => validateField(value, 'name'),
                    }}
                  >
                    {field => (
                      <div className="md:col-span-2">
                        <Label
                          htmlFor="name"
                          className="text-gray-dark mb-1.5 block text-sm font-semibold"
                        >
                          {t('contact.form.name')}
                        </Label>
                        <Input
                          id="name"
                          placeholder={t('contact.form.namePlaceholder')}
                          autoComplete="name"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          className="focus-visible:border-pink h-11 rounded-xl border border-gray-200 bg-gray-50 focus-visible:ring-0"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-red mt-1 text-xs">
                              {String(field.state.meta.errors[0])}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  {/* Email */}
                  <form.Field
                    name="email"
                    validators={{
                      onBlur: ({ value }) => validateField(value, 'email'),
                    }}
                  >
                    {field => (
                      <div className="md:col-span-1">
                        <Label
                          htmlFor="email"
                          className="text-gray-dark mb-1.5 block text-sm font-semibold"
                        >
                          {t('contact.form.email')}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('contact.form.emailPlaceholder')}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          className="focus-visible:border-pink h-11 rounded-xl border border-gray-200 bg-gray-50 focus-visible:ring-0"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-red mt-1 text-xs">
                              {String(field.state.meta.errors[0])}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  {/* Phone Number */}
                  <form.Field
                    name="phone"
                    validators={{
                      onBlur: ({ value }) => validateField(value, 'phone'),
                    }}
                  >
                    {field => (
                      <div className="md:col-span-1">
                        <Label
                          htmlFor="phone"
                          className="text-gray-dark mb-1.5 block text-sm font-semibold"
                        >
                          {t('contact.form.phone')}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t('contact.form.phonePlaceholder')}
                          autoComplete="tel"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          className="focus-visible:border-blue h-11 rounded-xl border border-gray-200 bg-gray-50 focus-visible:ring-0"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-red mt-1 text-xs">
                              {String(field.state.meta.errors[0])}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  {/* Children Info */}
                  <form.Field
                    name="children"
                    validators={{
                      onBlur: ({ value }) => validateField(value, 'children'),
                    }}
                  >
                    {field => (
                      <div className="md:col-span-2">
                        <Label
                          htmlFor="children"
                          className="text-gray-dark mb-1.5 block text-sm font-semibold"
                        >
                          {t('contact.form.children')}
                        </Label>
                        <Input
                          id="children"
                          placeholder={t('contact.form.childrenPlaceholder')}
                          autoComplete="off"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          className="focus-visible:border-blue h-11 rounded-xl border border-gray-200 bg-gray-50 focus-visible:ring-0"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-red mt-1 text-xs">
                              {String(field.state.meta.errors[0])}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  {/* Service Select */}
                  <form.Field name="service">
                    {field => (
                      <div className="md:col-span-2">
                        <Label
                          htmlFor="service"
                          className="text-gray-dark mb-1.5 block text-sm font-semibold"
                        >
                          {t('contact.form.serviceType')}
                        </Label>
                        <Select
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        >
                          <SelectTrigger
                            id="service"
                            className="focus:border-orange h-11 rounded-xl border border-gray-200 bg-gray-50 focus:ring-0"
                          >
                            <SelectValue
                              placeholder={t('contact.form.servicePlaceholder')}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {/* opt.value stays English — it's what the webhook receives */}
                            {SERVICE_OPTIONS.map(opt => (
                              <SelectItem key={opt.id} value={opt.value}>
                                {t(`contact.form.serviceOptions.${opt.id}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </form.Field>

                  {/* Message */}
                  <form.Field name="message">
                    {field => (
                      <div className="md:col-span-2">
                        <Label
                          htmlFor="message"
                          className="text-gray-dark mb-1.5 block text-sm font-semibold"
                        >
                          {t('contact.form.message')}
                        </Label>
                        <Textarea
                          id="message"
                          rows={4}
                          placeholder={t('contact.form.messagePlaceholder')}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          className="focus-visible:border-pink resize-none rounded-xl border border-gray-200 bg-gray-50 focus-visible:ring-0"
                        />
                      </div>
                    )}
                  </form.Field>

                  {/* Error state */}
                  {formState === 'error' && (
                    <div className="bg-red/10 border-red/20 rounded-xl border p-3 md:col-span-2">
                      <p className="text-red text-sm">
                        {t('contact.form.error')}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="mt-2 flex items-center justify-between md:col-span-2">
                    <p className="text-gray-medium text-xs">
                      {t('contact.form.requiredNote')}
                    </p>
                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="bg-blue hover:bg-blue/90 h-auto gap-2 rounded-full px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          {t('contact.form.submitting')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send size={15} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
