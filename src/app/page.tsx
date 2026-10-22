import type { Metadata } from "next"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getPage, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage("home"), getSite()])
  return buildMetadata(page.seo, site, "/")
}

export default async function HomePage() {
  const page = await getPage("home")
  return <SectionRenderer sections={page.sections} />
}
