import type { ComponentProps } from "react"
import { cn } from "cn"

import { Logo } from "@/components/shared/logo"
import type { Site } from "@/lib/content-schema"
import { FooterSocials } from "./footer-socials"

function FooterBrand({
  site,
  className,
  ...props
}: ComponentProps<"div"> & { site: Site }) {
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
    </div>
  )
}

export { FooterBrand }
