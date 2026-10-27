import type { Metadata } from "next"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getPage, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage("courses"), getSite()])
  return buildMetadata(page.seo, site, "/courses")
}

export default async function CoursesPage() {
  const page = await getPage("courses")
  return <SectionRenderer sections={page.sections} />
}
