import type { ComponentProps } from "react"
import { cn } from "cn"

import { Logo } from "@/components/shared/logo"
import type { Site } from "@/lib/content-schema"
import { footerLinkClass } from "./footer-column"
import { FooterSocials } from "./footer-socials"

function FooterBrand({
  site,
  year,
  className,
  ...props
}: ComponentProps<"div"> & { site: Site; year: number }) {
  const { address, mapUrl } = site.contact
  const lines = [
    address.line1,
    address.line2,
    address.locality,
    `${address.city}, ${address.state} ${address.postalCode}`,
  ].filter(Boolean)

  return (
    <div
      data-slot="footer-brand"
      className={cn("flex flex-col items-start gap-6", className)}
      {...props}
    >
      <Logo
        name={site.name}
        variant="dark-text"
        sizes="96px"
        className="size-24"
      />
      <p className="max-w-xs text-base text-foreground">{site.tagline}</p>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Find us at</p>
        <FooterSocials
          siteName={site.name}
          socials={site.socials}
          className="-ml-2"
        />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4 text-sm">
        <address className="leading-relaxed text-foreground not-italic">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(footerLinkClass, "w-fit font-medium")}
          >
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <p className="text-muted-foreground">
          © {year} {site.name}
        </p>
      </div>
    </div>
  )
}

export { FooterBrand }
