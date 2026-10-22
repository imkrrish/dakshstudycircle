import type { Metadata } from "next"
import type { Seo, Site } from "@/lib/content-schema"

// `path` is relative; it resolves against metadataBase set in the root layout.
function buildMetadata(seo: Seo, site: Site, path: string): Metadata {
  const ogImage = seo.ogImage ?? site.seo.ogImage
  const images = ogImage
    ? [
        {
          url: ogImage.src,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ]
    : undefined

  return {
    title: seo.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: path,
      siteName: site.name,
      images,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      images,
    },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
  }
}

export { buildMetadata }
