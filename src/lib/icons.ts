import {
  Award01Icon,
  BookOpen01Icon,
  Call02Icon,
  Location01Icon,
  Mail01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

// Allowed icon names → Hugeicons icons. Content refers to icons by name only.
export const iconRegistry = {
  award: Award01Icon,
  book: BookOpen01Icon,
  phone: Call02Icon,
  location: Location01Icon,
  mail: Mail01Icon,
  users: UserGroupIcon,
} as const

export type IconName = keyof typeof iconRegistry

export const iconNames = Object.keys(iconRegistry) as [IconName, ...IconName[]]
