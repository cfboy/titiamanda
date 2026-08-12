import {
  BookOpen,
  Clock,
  HandHeart,
  Heart,
  House,
  Luggage,
  Paintbrush,
  Puzzle,
  ShieldCheck,
  TreePine,
  Users,
  UtensilsCrossed,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

/**
 * The icons referenced by name from src/data/config.ts.
 *
 * They have to be listed one by one: importing the namespace
 * (`import * as LucideIcons`) and indexing it by string defeats tree-shaking
 * and drags the entire icon set (~590 kB minified) into the bundle. Keying
 * `Service.icon` / `Feature.icon` off `IconName` makes a missing entry a
 * compile error instead of a silently missing icon.
 */
export const ICONS = {
  BookOpen,
  Clock,
  HandHeart,
  Heart,
  House,
  Luggage,
  Paintbrush,
  Puzzle,
  ShieldCheck,
  TreePine,
  Users,
  UtensilsCrossed,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS
