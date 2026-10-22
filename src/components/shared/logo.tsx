import type { ComponentProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

// Intrinsic pixel size of each source file in public/.
const logoVariants = {
  "dark-text": { src: "/daksh-black-text.png", size: 750 },
  "light-text": { src: "/daksh-white-text.png", size: 1000 },
  emblem: { src: "/daksh-emblem-only.png", size: 750 },
} as const

// "lockup" = emblem followed by the site name as real text.
type LogoVariant = keyof typeof logoVariants

function Logo({
  name,
  variant = "emblem",
  preload = false,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  name: string
  variant?: LogoVariant
  preload?: boolean
}) {
  const { src, size } = logoVariants[variant]

  return (
    <Link
      data-slot="logo"
      href="/"
      aria-label={`${name} home`}
      className={cn(
        "inline-flex shrink-0 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
        className,
      )}
      {...props}
    >
      <Image
        src={src}
        // In the lockup the name is the adjacent text.
        alt={name}
        width={size}
        height={size}
        sizes="48px"
        preload={preload}
        className="size-full object-contain"
      />
    </Link>
  )
}

export { Logo }
export type { LogoVariant }
