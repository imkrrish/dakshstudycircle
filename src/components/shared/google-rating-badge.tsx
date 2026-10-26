import type { ComponentProps } from "react"
import { StarIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

// A link to the Google listing: "4.8 ★ · 197 Google reviews". The star is
// decoration; the rating itself is text. Text "Google" only, no logo.
function GoogleRatingBadge({
  rating,
  count,
  className,
  ...props
}: Omit<ComponentProps<"a">, "children"> & {
  rating: number
  count: number
  href: string
}) {
  return (
    <a
      data-slot="google-rating-badge"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-11 items-center gap-1.5 rounded-4xl border bg-background px-4 text-sm whitespace-nowrap focus-ring transition-colors hover:bg-muted",
        className,
      )}
      {...props}
    >
      <span className="font-semibold tabular-nums">{rating.toFixed(1)}</span>
      <span className="sr-only">out of 5,</span>
      <HugeiconsIcon
        icon={StarIcon}
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-4 text-saffron [&_path]:fill-current"
      />
      <span aria-hidden="true" className="text-muted-foreground">
        ·
      </span>
      <span>{new Intl.NumberFormat("en-IN").format(count)} Google reviews</span>
      <span className="sr-only">, see them on Google (opens in a new tab)</span>
    </a>
  )
}

export { GoogleRatingBadge }
