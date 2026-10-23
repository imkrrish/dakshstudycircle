import type { ComponentProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

// Intrinsic pixel size of each source file in public/. The emblem is trimmed
// to its visible pixels, so it is not square: size it by height via className.
const logoVariants = {
  "dark-text": { src: "/daksh-black-text.png", width: 750, height: 750 },
  "light-text": { src: "/daksh-white-text.png", width: 1000, height: 1000 },
  emblem: { src: "/daksh-emblem-trimmed.png", width: 528, height: 601 },
} as const

// "lockup" = emblem followed by the site name as real text.
type LogoVariant = keyof typeof logoVariants

function Logo({
  name,
  variant = "emblem",
  preload = false,
  sizes = "48px",
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  name: string
  variant?: LogoVariant
  preload?: boolean
  sizes?: string
}) {
  const { src, width, height } = logoVariants[variant]

  return (
    <Link
      data-slot="logo"
      href="/"
      aria-label={`${name} home`}
      className={cn("inline-flex shrink-0 rounded-full focus-ring", className)}
      {...props}
    >
      <Image
        src={src}
        // In the lockup the name is the adjacent text.
        alt={name}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        className="h-full w-auto object-contain"
      />
    </Link>
  )
}

export { Logo }
export type { LogoVariant }
