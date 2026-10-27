import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionHeadingVariants = cva("flex flex-col gap-3", {
  variants: {
    align: {
      left: "",
      center: "items-center text-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
})

function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  srOnly = false,
  className,
  ...props
}: Omit<ComponentProps<"div">, "title" | "id"> &
  VariantProps<typeof sectionHeadingVariants> & {
    eyebrow?: string
    title: string
    intro?: string
    id?: string
    // Only the h2, for screen readers (the page already says it above).
    srOnly?: boolean
  }) {
  if (srOnly) {
    return (
      <h2 id={id} className="sr-only">
        {title}
      </h2>
    )
  }
  return (
    <div
      data-slot="section-heading"
      className={cn(sectionHeadingVariants({ align, className }))}
      {...props}
    >
      {eyebrow && (
        <p className="text-eyebrow text-muted-foreground">{eyebrow}</p>
      )}
      <h2 id={id} className="font-heading text-heading">
        {title}
      </h2>
      {intro && (
        <p className="mt-1 max-w-prose text-intro text-muted-foreground">{intro}</p>
      )}
    </div>
  )
}

export { SectionHeading, sectionHeadingVariants }
