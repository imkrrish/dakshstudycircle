import type { Metadata } from "next"
import { Mukta, Young_Serif } from "next/font/google"

import "./globals.css"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { ContactDialog } from "@/components/shared/contact-dialog"
import { getSite } from "@/lib/content"
import { cn } from "@/lib/utils"

const mukta = Mukta({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
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
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        mukta.variable,
        youngSerif.variable,
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
          className="relative z-10 flex-1 overflow-clip border-b border-border bg-background outline-none"
        >
          {children}
        </main>
        <Footer />
        <ContactDialog />
      </body>
    </html>
  )
}
