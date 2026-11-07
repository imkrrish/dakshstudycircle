import type { Metadata } from "next"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getPage, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage("results"), getSite()])
  return buildMetadata(page.seo, site, "/results")
}

export default async function ResultsPage() {
  const page = await getPage("results")
  return <SectionRenderer sections={page.sections} />
}
