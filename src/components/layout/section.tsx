import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionVariants = cva("scroll-mt-(--navbar-height) py-20 md:py-28", {
  variants: {
    tone: {
      default: "",
      muted: "bg-muted",
      band: "bg-secondary",
    },
  },
  defaultVariants: {
    tone: "default",
  },
})

function Section({
  id,
  tone = "default",
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
