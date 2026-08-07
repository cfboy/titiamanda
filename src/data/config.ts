export type ServiceColor = 'pink' | 'blue' | 'orange' | 'green'
export type FeatureColor = 'pink' | 'blue' | 'orange' | 'green' | 'dark'

// All user-facing text lives in src/locales/{es,en}.json under
// services.items.<id> / activities.items.<id>, keyed by these ids.

export interface Service {
  id: string
  icon: string
  image: string
  color: ServiceColor
  delay: number
}

export interface Feature {
  id: string
  icon: string
  color: FeatureColor
  delay: number
}

export const SERVICES: Service[] = [
  {
    id: 'at-home-care',
    icon: 'House',
    image: '/assets/images/children-coloring.webp',
    color: 'pink',
    delay: 0.3,
  },
  {
    id: 'hotel-vacation',
    icon: 'Luggage',
    image: '/assets/images/children-playing.webp',
    color: 'blue',
    delay: 0.4,
  },
  {
    id: 'special-needs',
    icon: 'Heart',
    image: '/assets/images/full-shot-girl-playing-home.webp',
    color: 'orange',
    delay: 0.5,
  },
  {
    id: 'family-outing',
    icon: 'Users',
    image: '/assets/images/close-up-child-enjoying-didactic-game.webp',
    color: 'green',
    delay: 0.6,
  },
]

export const FEATURES: Feature[] = [
  { id: 'reading-time', icon: 'BookOpen', color: 'blue', delay: 0.1 },
  { id: 'arts-crafts', icon: 'Paintbrush', color: 'green', delay: 0.2 },
  { id: 'sensory-playtime', icon: 'Puzzle', color: 'dark', delay: 0.3 },
  { id: 'meal-support', icon: 'UtensilsCrossed', color: 'orange', delay: 0.4 },
  { id: 'routines-transitions', icon: 'Clock', color: 'blue', delay: 0.5 },
  { id: 'outdoor-play', icon: 'TreePine', color: 'green', delay: 0.6 },
  { id: 'emotional-support', icon: 'HandHeart', color: 'dark', delay: 0.7 },
  {
    id: 'safety-supervision',
    icon: 'ShieldCheck',
    color: 'orange',
    delay: 0.8,
  },
]

export const CONTACT_INFO = {
  email: 'titiamandababysitter@gmail.com',
  phone: '+1 (787) 585-7123',
  phoneRaw: '+17875857123',
  whatsapp: 'https://wa.me/17875857123',
  instagram: 'https://www.instagram.com/titiamandababysitter/',
  instagramHandle: '@titiamandababysitter',
  location: 'San Juan, Puerto Rico',
  webhook: 'https://hook.us2.make.com/mg4r1kqxumwo6lq65r7h2cde39moc4m9',
}

// `value` is POSTed to the Make.com webhook and must stay in English regardless
// of the UI language; only the displayed label (contact.form.serviceOptions.<id>)
// is translated.
export const SERVICE_OPTIONS = [
  { id: 'at-home-care', value: 'At Home Care' },
  { id: 'hotel-vacation', value: 'Hotel & Vacation Babysitting' },
  { id: 'special-needs', value: 'Special Needs Support' },
  { id: 'family-outing', value: 'Family Outing Support' },
]
