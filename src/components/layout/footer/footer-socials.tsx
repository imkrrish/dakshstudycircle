import type { ComponentProps } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Facebook01Icon,
  InstagramIcon,
  NewTwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "cn"

import type { Site, SocialPlatform } from "@/lib/content-schema"

const platforms = {
  facebook: { name: "Facebook", icon: Facebook01Icon },
  x: { name: "X", icon: NewTwitterIcon },
  instagram: { name: "Instagram", icon: InstagramIcon },
  youtube: { name: "YouTube", icon: YoutubeIcon },
} satisfies Record<SocialPlatform, { name: string; icon: unknown }>

function FooterSocials({
  siteName,
  socials,
  className,
  ...props
}: ComponentProps<"ul"> & { siteName: string; socials: Site["socials"] }) {
  return (
    <ul
      data-slot="footer-socials"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {socials.map(({ platform, url }) => {
        const { name, icon } = platforms[platform]
        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteName} on ${name}`}
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors focus-ring hover:bg-secondary focus-visible:bg-secondary"
            >
              <HugeiconsIcon icon={icon} size={20} aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export { FooterSocials }
