import type { Metadata, Viewport } from "next"
import { EB_Garamond, Nunito_Sans } from "next/font/google"

import "./globals.css"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { ContactDialog } from "@/components/shared/contact-dialog"
import { getSite } from "@/lib/content"
import { themeColors } from "@/lib/theme-colors"
import { cn } from "@/lib/utils"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

export const viewport: Viewport = {
  themeColor: themeColors.paper,
}

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
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        nunitoSans.variable,
        ebGaramond.variable,
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
        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 flex-1 overflow-clip border-b border-border bg-background outline-none has-[>[data-surface=ink]:last-child]:border-b-0"
        >
          {children}
        </main>
        <Footer />
        <ContactDialog />
      </body>
    </html>
  )
}
