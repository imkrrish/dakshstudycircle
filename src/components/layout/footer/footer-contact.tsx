import type { ComponentProps } from "react"
import { cn } from "cn"

import type { Site } from "@/lib/content-schema"
import { whatsappHref } from "@/lib/utils"
import { FooterColumn, footerLinkClass } from "./footer-column"

function FooterContact({
  site,
  className,
  ...props
}: Omit<ComponentProps<"div">, "title"> & { site: Site }) {
  const { phones, emails, hours, address, mapUrl, whatsappMessage } =
    site.contact
  const lines = [
    address.line1,
    address.line2,
    address.locality,
    `${address.city}, ${address.state} ${address.postalCode}`,
  ].filter(Boolean)

  return (
    <FooterColumn
      title="Contact"
      data-slot="footer-contact"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {phones.map(({ e164, display, label, whatsapp }) => (
        <li key={e164} className="flex flex-wrap items-center gap-x-4">
          <a
            href={`tel:${e164}`}
            aria-label={label ? `Call ${label}, ${display}` : `Call ${display}`}
            className={footerLinkClass}
          >
            {display}
          </a>
          {whatsapp && (
            <a
              href={whatsappHref(e164, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(footerLinkClass, "text-muted-foreground")}
            >
              WhatsApp
              <span className="sr-only"> {display} (opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
      {emails.map((email) => (
        <li key={email} className="wrap-anywhere">
          <a href={`mailto:${email}`} className={footerLinkClass}>
            {email}
          </a>
        </li>
      ))}
      <li className="mt-2 md:mt-0">
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4 text-sm">
          <address className="leading-relaxed text-foreground not-italic">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="text-muted-foreground">{hours}</p>
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
        </div>
      </li>
    </FooterColumn>
  )
}

export { FooterContact }
