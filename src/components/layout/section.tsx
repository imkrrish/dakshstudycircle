import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionVariants = cva("scroll-mt-(--navbar-height) py-(--section-y) md:py-(--section-y-md)", {
  variants: {
    // A section's background; page data picks it, `assignTones()` resolves
    // clashes so neighbours never match. "ink" is styled by its own section.
    tone: {
      paper: "",
      muted: "bg-muted",
      band: "bg-secondary",
      ink: "",
    },
  },
  defaultVariants: {
    tone: "paper",
  },
})

function Section({
  id,
  tone = "paper",
  className,
  ...props
}: ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & { id: string }) {
  return (
    <section
      data-slot="section"
      data-tone={tone}
      id={id}
      className={cn(sectionVariants({ tone, className }))}
      {...props}
    />
  )
}

export { Section, sectionVariants }
