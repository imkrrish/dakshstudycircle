import type { ComponentProps } from "react"
import Image from "next/image"
import { cn } from "cn"

import type { ResolvedTestimonialGridSection } from "@/lib/content-schema"
import { initials } from "@/lib/utils"

type Item = ResolvedTestimonialGridSection["items"][number]

// A paper card: the quote verbatim in body text, then who said it, pinned to
// the bottom so attributions line up across a row. `tilt` sets the resting
// angle (about 0.5deg); it straightens on hover (hover devices only).
function TestimonialCard({
  item,
  tilt,
  className,
  ...props
}: Omit<ComponentProps<"figure">, "children"> & {
  item: Item
  tilt?: "left" | "right"
}) {
  const label = [item.byline, item.source === "google" && "Google review"]
    .filter(Boolean)
    .join(" · ")

  return (
    <figure
      data-slot="testimonial-card"
      className={cn(
        "flex h-full flex-col gap-6 rounded-xl border bg-card p-6 hover:rotate-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
        tilt === "left" && "-rotate-[0.5deg]",
        tilt === "right" && "rotate-[0.5deg]",
        className,
      )}
      {...props}
    >
      <blockquote className="text-base text-foreground">
        <p>{item.text}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-start gap-3">
        <span className="relative size-12 shrink-0 overflow-clip rounded-full bg-muted">
          {item.photo ? (
            <Image
              src={item.photo.src}
              alt=""
              fill
              sizes="3rem"
              className="object-cover object-top"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground"
            >
              {initials(item.name)}
            </span>
          )}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold">{item.name}</span>
          {label && (
            <span className="text-sm text-muted-foreground">{label}</span>
          )}
        </span>
      </figcaption>
    </figure>
  )
}

export { TestimonialCard }
