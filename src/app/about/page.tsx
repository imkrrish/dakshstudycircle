import type { Metadata } from "next"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getPage, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage("about"), getSite()])
  return buildMetadata(page.seo, site, "/about")
}

export default async function AboutPage() {
  const page = await getPage("about")
  return <SectionRenderer sections={page.sections} />
}
