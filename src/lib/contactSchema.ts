import { z } from 'zod'

import type { TFunction } from 'i18next'

// Factory so validation messages follow the active language — a module-level
// schema would freeze them at import time.
export function createContactSchema(t: TFunction) {
  return z.object({
    name: z
      .string()
      .min(2, t('contact.validation.nameMin'))
      .max(100, t('contact.validation.nameMax')),
    phone: z
      .string()
      .min(7, t('contact.validation.phoneMin'))
      .regex(/^[\d\s\-+()]+$/, t('contact.validation.phoneInvalid')),
    email: z.string().email(t('contact.validation.emailInvalid')),
    children: z
      .string()
      .min(2, t('contact.validation.childrenMin'))
      .max(200, t('contact.validation.childrenMax')),
    service: z.string().optional(),
    message: z
      .string()
      .max(1000, t('contact.validation.messageMax'))
      .optional(),
  })
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>
