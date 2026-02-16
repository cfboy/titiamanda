import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ICON_COLOR_MAP: Record<string, string> = {
  pink: 'text-pink',
  blue: 'text-blue',
  orange: 'text-orange',
  green: 'text-green',
  'purple-500': 'text-purple-500',
}

export const HOVER_TEXT_COLOR_MAP: Record<string, string> = {
  pink: 'group-hover:text-pink',
  blue: 'group-hover:text-blue',
  orange: 'group-hover:text-orange',
  green: 'group-hover:text-green',
}

export const DIVIDER_BG_MAP: Record<string, string> = {
  pink: 'bg-pink/30',
  blue: 'bg-blue/30',
  orange: 'bg-orange/30',
  green: 'bg-green/30',
}

export const CONTACT_ICON_BG: Record<string, string> = {
  pink: 'bg-pink/10 group-hover:bg-pink',
  blue: 'bg-blue/10 group-hover:bg-blue',
  orange: 'bg-orange/10 group-hover:bg-orange',
  green: 'bg-green/10 group-hover:bg-green',
}

export const CONTACT_ICON_TEXT: Record<string, string> = {
  pink: 'text-pink group-hover:text-white',
  blue: 'text-blue group-hover:text-white',
  orange: 'text-orange group-hover:text-white',
  green: 'text-green group-hover:text-white',
}

export const CONTACT_LINK_HOVER: Record<string, string> = {
  pink: 'hover:text-pink',
  blue: 'hover:text-blue',
  orange: 'hover:text-orange',
  green: 'hover:text-green',
}
