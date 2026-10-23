import type { MetadataRoute } from "next"

import { getSite } from "@/lib/content"
import { themeColors } from "@/lib/theme-colors"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSite()
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: themeColors.paper,
    theme_color: themeColors.paper,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
