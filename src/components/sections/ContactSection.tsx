import { useForm } from '@tanstack/react-form'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Plus,
  Loader2,
} from 'lucide-react'
import { useState } from 'react'

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
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportConfig,
} from '@/lib/animations'
import { contactSchema } from '@/lib/contactSchema'
import {
  cn,
  CONTACT_ICON_BG,
  CONTACT_ICON_TEXT,
  CONTACT_LINK_HOVER,
} from '@/lib/utils'

interface ContactItem {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  display: string
  href: string | null
  color: string
  target?: string
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Mail,
    label: 'Email',
    display: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    color: 'pink',
  },
  {
    icon: Phone,
    label: 'Phone',
    display: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phoneRaw}`,
    color: 'blue',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    display: CONTACT_INFO.phone,
    href: CONTACT_INFO.whatsapp,
    color: 'green',
    target: '_blank',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    display: CONTACT_INFO.instagramHandle,
    href: CONTACT_INFO.instagram,
    color: 'pink',
    target: '_blank',
  },
  {
    icon: MapPin,
    label: 'Location',
    display: CONTACT_INFO.location,
    href: null,
    color: 'orange',
  },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function validateField(
  value: string,
  fieldName: 'name' | 'phone' | 'email' | 'children'
) {
  const shape = contactSchema.shape[fieldName]
  const result = shape.safeParse(value)
  if (!result.success) {
    return result.error.issues[0]?.message ?? 'Invalid value'
  }
  return undefined
}

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>('idle')

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
      // Validate entire form with Zod before submitting
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
    <section id="contact" className="bg-pink/20 relative overflow-hidden py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.2}
          className="mb-14 text-center"
        >
          <h6 className="text-pink mb-3 text-base font-bold tracking-wider uppercase">
            Contact Me
          </h6>
          <h2 className="text-gray-dark mx-auto max-w-3xl text-3xl leading-tight font-extrabold capitalize md:text-4xl">
            Ready to <span className="text-blue">Book</span> Your{' '}
            <em className="text-pink not-italic">Babysitting</em> Session?
          </h2>
          <p className="text-gray-dark mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            Fill out the form below and I&apos;ll get back to you within 24
            hours to discuss your childcare needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
          {/* Left: Contact Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.3}
            className="order-2 space-y-6 lg:order-1 lg:col-span-1"
          >
            <h3 className="text-gray-dark text-xl font-bold">Get In Touch</h3>
            <div className="space-y-4">
              {CONTACT_ITEMS.map(item => (
                <div key={item.label} className="group flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                      CONTACT_ICON_BG[item.color]
                    )}
                  >
                    <item.icon
                      size={16}
                      className={cn(
                        'transition-colors duration-300',
                        CONTACT_ICON_TEXT[item.color]
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-gray-dark text-xs font-bold tracking-wide uppercase">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.target}
                        rel={item.target ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'text-gray-dark text-sm transition-colors duration-300',
                          CONTACT_LINK_HOVER[item.color]
                        )}
                      >
                        {item.display}
                      </a>
                    ) : (
                      <p className="text-gray-dark text-sm">{item.display}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response Time Badge */}
            <div className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-green/15 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                  <Clock size={14} className="text-green" />
                </div>
                <div>
                  <p className="text-gray-dark text-sm font-semibold">
                    Quick Response
                  </p>
                  <p className="text-gray-medium text-xs">
                    I typically respond within 2-4 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.4}
            className="order-1 lg:order-2 lg:col-span-2"
          >
            <div className="shadow-medium rounded-3xl border border-gray-100 bg-white p-7 md:p-10">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-4 py-8 text-center"
                >
                  <div className="bg-green/10 flex h-16 w-16 items-center justify-center rounded-full">
                    <CheckCircle size={32} className="text-green" />
                  </div>
                  <h4 className="text-gray-dark text-xl font-bold">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-gray-dark text-sm">
                    Thank you for reaching out! I&apos;ll get back to you within
                    24 hours.
                  </p>
                  <Button
                    onClick={handleReset}
                    className="bg-green hover:bg-green/90 mt-2 gap-2 rounded-full px-6 text-white"
                  >
                    <Plus size={15} />
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-7 text-center">
                    <h3 className="text-gray-dark mb-2 text-2xl font-bold md:text-3xl">
                      Send Me a <span className="text-pink">Message</span>
                    </h3>
                    <p className="text-gray-dark text-sm">
                      I&apos;d love to hear from you! Fill out the form below.
                    </p>
                  </div>

                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      form.handleSubmit()
                    }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
                  >
                    {/* Parent's Name */}
                    <form.Field
                      name="name"
                      validators={{
                        onBlur: ({ value }) => validateField(value, 'name'),
                      }}
                    >
                      {field => (
                        <div className="md:col-span-1">
                          <Label
                            htmlFor="name"
                            className="text-gray-dark mb-1.5 block text-sm font-semibold"
                          >
                            Parent&apos;s Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            autoComplete="name"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            className="focus-visible:border-pink h-11 rounded-xl border-2 border-gray-200 bg-gray-50 focus-visible:ring-0"
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
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(787) 555-0123"
                            autoComplete="tel"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            className="focus-visible:border-blue h-11 rounded-xl border-2 border-gray-200 bg-gray-50 focus-visible:ring-0"
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
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            className="focus-visible:border-pink h-11 rounded-xl border-2 border-gray-200 bg-gray-50 focus-visible:ring-0"
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
                        <div className="md:col-span-1">
                          <Label
                            htmlFor="children"
                            className="text-gray-dark mb-1.5 block text-sm font-semibold"
                          >
                            Children Info *
                          </Label>
                          <Input
                            id="children"
                            placeholder="Names & ages (e.g., Emma 5, Lucas 3)"
                            autoComplete="off"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            className="focus-visible:border-blue h-11 rounded-xl border-2 border-gray-200 bg-gray-50 focus-visible:ring-0"
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
                          <Label className="text-gray-dark mb-1.5 block text-sm font-semibold">
                            Preferred Service
                          </Label>
                          <Select
                            value={field.state.value}
                            onValueChange={field.handleChange}
                          >
                            <SelectTrigger className="focus:border-orange h-11 rounded-xl border-2 border-gray-200 bg-gray-50 focus:ring-0">
                              <SelectValue placeholder="Select a service type" />
                            </SelectTrigger>
                            <SelectContent>
                              {SERVICE_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
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
                            Additional Information
                          </Label>
                          <Textarea
                            id="message"
                            rows={4}
                            placeholder="Tell me about your children's interests, any special needs, preferred activities, or scheduling preferences..."
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            className="focus-visible:border-pink resize-none rounded-xl border-2 border-gray-200 bg-gray-50 focus-visible:ring-0"
                          />
                        </div>
                      )}
                    </form.Field>

                    {/* Error state */}
                    {formState === 'error' && (
                      <div className="bg-red/10 border-red/20 rounded-xl border p-3 md:col-span-2">
                        <p className="text-red text-sm">
                          Sorry, there was an error sending your message. Please
                          try again or contact me directly.
                        </p>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="mt-2 text-center md:col-span-2">
                      <Button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="from-pink to-pink/90 hover:from-pink/90 hover:to-pink h-auto gap-2 rounded-full bg-gradient-to-r px-10 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                      >
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 size={17} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={17} />
                          </>
                        )}
                      </Button>
                      <p className="text-gray-medium mt-3 text-xs">
                        * Required fields. I&apos;ll respond within 24 hours.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
