import type { Page } from "@/lib/content"
import { courses } from "./courses"
import { faculty } from "./faculty"
import { home } from "./home"

export const pages = { home, courses, faculty } satisfies Record<string, Page>

export type PageSlug = keyof typeof pages
