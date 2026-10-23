import type { ComponentProps } from "react"
import { cn } from "cn"

import type { Site } from "@/lib/content-schema"
import { FooterColumn, footerLinkClass } from "./footer-column"

function FooterVisit({
  site,
  className,
  ...props
}: Omit<ComponentProps<"div">, "title"> & { site: Site }) {
  const { hours, address, mapUrl } = site.contact
  const lines = [
    address.line1,
    address.line2,
    address.locality,
    `${address.city}, ${address.state} ${address.postalCode}`,
  ].filter(Boolean)

  return (
    <FooterColumn
      title="Visit us"
      data-slot="footer-visit"
      className={cn(className)}
      {...props}
    >
      <li>
        <address className="text-sm leading-relaxed text-foreground not-italic md:text-base">
          {lines.join(", ")}
        </address>
      </li>
      <li className="text-sm text-muted-foreground md:text-base">{hours}</li>
      {mapUrl && (
        <li>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(footerLinkClass, "min-h-11 font-medium")}
          >
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      )}
    </FooterColumn>
  )
}

export { FooterVisit }
