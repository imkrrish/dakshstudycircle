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
  const { phones, emails, whatsappMessage } = site.contact

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
            className={cn(footerLinkClass, "min-h-11")}
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
    </FooterColumn>
  )
}

export { FooterContact }
