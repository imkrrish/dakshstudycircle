import type { ComponentProps } from "react"
import { cn } from "cn"

// Soft mesh of layered radial gradients (see .hero-wash in globals.css),
// fading into the page background. Starts at the top of the page so it sits
// behind the transparent navbar.
function HeroWash({
  size,
  className,
  ...props
}: ComponentProps<"div"> & { size: "large" | "compact" }) {
  return (
    <div
      data-slot="hero-wash"
      data-size={size}
      aria-hidden="true"
      className={cn("hero-wash", className)}
      {...props}
    />
  )
}

export { HeroWash }
