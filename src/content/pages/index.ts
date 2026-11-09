import type { Page } from "@/lib/content"
import { about } from "./about"
import { contact } from "./contact"
import { courses } from "./courses"
import { faculty } from "./faculty"
import { gallery } from "./gallery"
import { home } from "./home"
import { results } from "./results"

export const pages = {
  home,
  courses,
  faculty,
  results,
  about,
  contact,
  gallery,
} satisfies Record<string, Page>

export type PageSlug = keyof typeof pages
