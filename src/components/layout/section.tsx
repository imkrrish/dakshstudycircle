import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionVariants = cva("scroll-mt-20 py-20 md:py-28", {
  variants: {
    tone: {
      default: "",
      muted: "bg-muted",
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
      id={id}
      className={cn(sectionVariants({ tone, className }))}
      {...props}
    />
  )
}

export { Section, sectionVariants }
