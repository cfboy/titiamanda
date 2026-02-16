import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

import type { Feature } from '@/data/config'
import type { LucideIcon } from 'lucide-react'

import { cardFadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface ActivityCardProps {
  feature: Feature
}

const CARD_BG: Record<string, string> = {
  blue: 'bg-blue',
  green: 'bg-green',
  dark: 'bg-[#1a1a1a]',
  orange: 'bg-orange',
  pink: 'bg-pink',
}

export default function ActivityCard({ feature }: ActivityCardProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[
    feature.icon
  ]

  return (
    <motion.div variants={cardFadeInUp} className="h-full">
      <div
        className={cn(
          'flex h-full min-h-[300px] flex-col rounded-3xl p-7',
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
        <h2
          className="font-secondary mb-4 leading-snug font-bold text-white"
          dangerouslySetInnerHTML={{ __html: feature.title }}
        />

        {/* Description */}
        <p className="mt-auto text-sm leading-relaxed text-white/80">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}
