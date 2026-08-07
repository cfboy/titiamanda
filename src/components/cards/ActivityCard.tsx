import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { Feature } from '@/data/config'
import type { LucideIcon } from 'lucide-react'

import { cardFadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface ActivityCardProps {
  feature: Feature
}

// Deep variants: white body text on these fills must hold 4.5:1
const CARD_BG: Record<string, string> = {
  blue: 'bg-blue-deep',
  green: 'bg-green-deep',
  dark: 'bg-[#1a1a1a]',
  orange: 'bg-orange-deep',
  pink: 'bg-pink-deep',
}

export default function ActivityCard({ feature }: ActivityCardProps) {
  const { t } = useTranslation()
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[
    feature.icon
  ]

  return (
    <motion.div variants={cardFadeInUp} className="h-full">
      <div
        className={cn(
          'flex h-full min-h-75 flex-col rounded-3xl p-7',
          CARD_BG[feature.color]
        )}
      >
        {/* Icon */}
        <div className="mb-5 self-end">
          {IconComponent && (
            <IconComponent
              size={40}
              className="text-white opacity-90"
              strokeWidth={1.5}
            />
          )}
        </div>

        {/* Title */}
        <h3 className="font-secondary mb-4 max-w-[8em] leading-snug font-bold text-balance text-white">
          {t(`activities.items.${feature.id}.title`)}
        </h3>

        {/* Description */}
        <p className="mt-auto text-sm leading-relaxed text-white">
          {t(`activities.items.${feature.id}.description`)}
        </p>
      </div>
    </motion.div>
  )
}
