import type { Page } from "@/lib/content"
import { courses } from "./courses"
import { faculty } from "./faculty"
import { home } from "./home"
import { results } from "./results"

export const pages = { home, courses, faculty, results } satisfies Record<string, Page>

export type PageSlug = keyof typeof pages
