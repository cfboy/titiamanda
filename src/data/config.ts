export type ServiceColor = 'pink' | 'blue' | 'orange' | 'green'
export type FeatureColor = 'pink' | 'blue' | 'orange' | 'green' | 'dark'

export interface Service {
  id: string
  icon: string
  image: string
  title: string
  description: string
  idealFor: string[]
  color: ServiceColor
  delay: number
}

export interface Feature {
  id: string
  icon: string
  title: string
  description: string
  color: FeatureColor
  delay: number
}

export const SERVICES: Service[] = [
  {
    id: 'at-home-care',
    icon: 'House',
    image: '/assets/images/children-coloring.png',
    title: 'At Home Care',
    description:
      "Personalized childcare in the comfort of your home. I provide a safe, engaging, and nurturing environment tailored to your child's routine.",
    idealFor: [
      'Families living in Puerto Rico',
      'Parents who work from home',
      'Date nights or special events',
    ],
    color: 'pink',
    delay: 0.3,
  },
  {
    id: 'hotel-vacation',
    icon: 'Luggage',
    image: '/assets/images/children-playing.png',
    title: 'Hotel & Vacation Babysitting',
    description:
      'Trusted babysitting while you enjoy your vacation or a night out. I bring age-appropriate activities and ensure your little ones feel safe and entertained.',
    idealFor: [
      'Tourists and travelers',
      'Destination weddings or events',
      'Resort and hotel stays',
    ],
    color: 'blue',
    delay: 0.4,
  },
  {
    id: 'special-needs',
    icon: 'Heart',
    image: '/assets/images/full-shot-girl-playing-home.jpg',
    title: 'Special Needs Support',
    description:
      'Compassionate care tailored to children with autism and other developmental needs, incorporating visual supports and sensory-friendly activities.',
    idealFor: [
      'Children with autism or developmental needs',
      'Families needing experienced, trained care',
    ],
    color: 'orange',
    delay: 0.5,
  },
  {
    id: 'family-outing',
    icon: 'Users',
    image: '/assets/images/close-up-child-enjoying-didactic-game.jpg',
    title: 'Family Outing Support',
    description:
      "Extra hands and heart while you're out and about. I accompany families during outings to provide calm, professional assistance.",
    idealFor: [
      'Families with multiple children',
      'Parents attending events',
      'Errands or special plans',
    ],
    color: 'green',
    delay: 0.6,
  },
]

export const FEATURES: Feature[] = [
  {
    id: 'reading-time',
    icon: 'BookOpen',
    title: 'Reading<br />Time',
    description:
      'We explore books together to build language skills, spark imagination, and create calm moments.',
    color: 'blue',
    delay: 0.1,
  },
  {
    id: 'arts-crafts',
    icon: 'Paintbrush',
    title: 'Arts &<br />Crafts',
    description:
      'Creative time using age-appropriate materials to support fine motor skills and self-expression.',
    color: 'green',
    delay: 0.2,
  },
  {
    id: 'sensory-playtime',
    icon: 'Puzzle',
    title: 'Sensory &<br />Playtime',
    description:
      'Structured and free play using toys, music, sensory bins, or imaginative games to support learning.',
    color: 'dark',
    delay: 0.3,
  },
  {
    id: 'meal-support',
    icon: 'UtensilsCrossed',
    title: 'Meal & Snack<br />Support',
    description:
      'I help with feeding routines, encourage independence, and ensure safe, clean, and enjoyable mealtimes.',
    color: 'orange',
    delay: 0.4,
  },
  {
    id: 'routines-transitions',
    icon: 'Clock',
    title: 'Routines &<br />Transitions',
    description:
      'Support with daily routines such as hand washing, diapering, clean-up, naptime, or bedtime.',
    color: 'blue',
    delay: 0.5,
  },
  {
    id: 'outdoor-play',
    icon: 'TreePine',
    title: 'Outdoor<br />Play',
    description:
      'Time outside in fresh air for movement, exploration, and physical activity—when space and weather allow.',
    color: 'green',
    delay: 0.6,
  },
  {
    id: 'emotional-support',
    icon: 'HandHeart',
    title: 'Emotional<br />Support',
    description:
      'Gentle guidance to help children feel safe, regulated, and confident during activities and transitions.',
    color: 'dark',
    delay: 0.7,
  },
  {
    id: 'safety-supervision',
    icon: 'ShieldCheck',
    title: 'Safety &<br />Supervision',
    description:
      "I prioritize your child's well-being at all times with close supervision, clear boundaries, and safe environments.",
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

export const SERVICE_OPTIONS = [
  { value: 'At Home Care', label: 'At Home Care' },
  {
    value: 'Hotel & Vacation Babysitting',
    label: 'Hotel & Vacation Babysitting',
  },
  { value: 'Special Needs Support', label: 'Special Needs Support' },
  { value: 'Family Outing Support', label: 'Family Outing Support' },
]
