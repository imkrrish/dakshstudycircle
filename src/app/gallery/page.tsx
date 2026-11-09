import type { Metadata } from "next"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getPage, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage("gallery"), getSite()])
  return buildMetadata(page.seo, site, "/gallery")
}

export default async function GalleryPage() {
  const page = await getPage("gallery")
  return <SectionRenderer sections={page.sections} />
}
