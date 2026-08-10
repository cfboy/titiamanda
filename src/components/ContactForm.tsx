import { useForm } from '@tanstack/react-form'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Plus, Loader2, MessageCircle } from 'lucide-react'
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
import { createContactSchema } from '@/lib/contactSchema'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Formulario de contacto reutilizable: lo usan la sección del home y el
 * drawer. Los ids de los campos llevan sufijo para no duplicarse cuando
 * ambos están montados en la misma página.
 */
export default function ContactForm({ idSuffix = '' }: { idSuffix?: string }) {
  const { t, i18n } = useTranslation()
  const [formState, setFormState] = useState<FormState>('idle')
  const fid = (name: string) => `${name}${idSuffix}`

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
      if (!result.success) {
        const firstInvalid = result.error.issues[0]?.path?.[0]
        if (typeof firstInvalid === 'string') {
          const el = document.getElementById(fid(firstInvalid))
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el?.focus({ preventScroll: true })
        }
        return
      }

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
    <>
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
            className="bg-green-deep hover:bg-green-deep/90 mt-2 gap-2 rounded-full px-6 text-white"
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
                  htmlFor={fid('name')}
                  className="text-gray-dark mb-1.5 block text-sm font-semibold"
                >
                  {t('contact.form.name')}
                </Label>
                <Input
                  id={fid('name')}
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
                  htmlFor={fid('email')}
                  className="text-gray-dark mb-1.5 block text-sm font-semibold"
                >
                  {t('contact.form.email')}
                </Label>
                <Input
                  id={fid('email')}
                  type="email"
                  autoComplete="email"
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
                  htmlFor={fid('phone')}
                  className="text-gray-dark mb-1.5 block text-sm font-semibold"
                >
                  {t('contact.form.phone')}
                </Label>
                <Input
                  id={fid('phone')}
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
                  htmlFor={fid('children')}
                  className="text-gray-dark mb-1.5 block text-sm font-semibold"
                >
                  {t('contact.form.children')}
                </Label>
                <Input
                  id={fid('children')}
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
                  htmlFor={fid('service')}
                  className="text-gray-dark mb-1.5 block text-sm font-semibold"
                >
                  {t('contact.form.serviceType')}
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id={fid('service')}
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
                  htmlFor={fid('message')}
                  className="text-gray-dark mb-1.5 block text-sm font-semibold"
                >
                  {t('contact.form.message')}
                </Label>
                <Textarea
                  id={fid('message')}
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
              <p className="text-red text-sm">{t('contact.form.error')}</p>
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-deep mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-2"
              >
                <MessageCircle size={15} />
                {t('contact.form.errorWhatsapp')}
              </a>
            </div>
          )}

          {/* Submit */}
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
            <p className="text-gray-text text-xs">
              {t('contact.form.requiredNote')}
            </p>
            <Button
              type="submit"
              disabled={formState === 'submitting'}
              className="bg-blue-deep hover:bg-blue-deep/90 h-auto w-full gap-2 rounded-full px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
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
    </>
  )
}
