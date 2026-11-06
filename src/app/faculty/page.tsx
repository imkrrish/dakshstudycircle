import type { Metadata } from "next"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getPage, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage("faculty"), getSite()])
  return buildMetadata(page.seo, site, "/faculty")
}

export default async function FacultyPage() {
  const page = await getPage("faculty")
  return <SectionRenderer sections={page.sections} />
}
