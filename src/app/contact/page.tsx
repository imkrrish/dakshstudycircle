import type { Metadata } from "next"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getPage, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPage("contact"), getSite()])
  return buildMetadata(page.seo, site, "/contact")
}

export default async function ContactPage() {
  const page = await getPage("contact")
  return <SectionRenderer sections={page.sections} />
}
