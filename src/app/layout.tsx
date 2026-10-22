import type { Metadata } from "next"
import { Geist_Mono, Inter, Newsreader } from "next/font/google"

import "./globals.css"
import { getSite } from "@/lib/content"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif" })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: site.seo.titleTemplate },
    description: site.seo.description,
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans",
        inter.variable,
        newsreader.variable,
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
