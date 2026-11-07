import type { Page } from "@/lib/content"
import { about } from "./about"
import { courses } from "./courses"
import { faculty } from "./faculty"
import { home } from "./home"
import { results } from "./results"

export const pages = {
  home,
  courses,
  faculty,
  results,
  about,
} satisfies Record<string, Page>

export type PageSlug = keyof typeof pages
