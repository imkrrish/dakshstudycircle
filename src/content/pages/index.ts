import type { Page } from "@/lib/content-schema"
import { home } from "./home"

export const pages = { home } satisfies Record<string, Page>

export type PageSlug = keyof typeof pages
