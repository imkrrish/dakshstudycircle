import type { Page } from "@/lib/content-schema"
import { courses } from "./courses"
import { home } from "./home"

export const pages = { home, courses } satisfies Record<string, Page>

export type PageSlug = keyof typeof pages
