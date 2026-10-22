import type { Metadata } from "next"
import { Geist_Mono, Inter, Newsreader } from "next/font/google"

import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { ContactDialog } from "@/components/shared/contact-dialog"
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
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-4xl bg-background px-4 py-2 text-sm font-medium shadow-md focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <ContactDialog />
      </body>
    </html>
  )
}
