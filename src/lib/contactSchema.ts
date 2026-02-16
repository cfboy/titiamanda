import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .regex(/^[\d\s\-+()]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  children: z
    .string()
    .min(2, "Please describe your children (e.g., 'Emma 5, Lucas 3')")
    .max(200, 'Description is too long'),
  service: z.string().optional(),
  message: z.string().max(1000, 'Message is too long').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
