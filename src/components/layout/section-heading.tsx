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
  className,
  ...props
}: Omit<ComponentProps<"div">, "title" | "id"> &
  VariantProps<typeof sectionHeadingVariants> & {
    eyebrow?: string
    title: string
    intro?: string
    id?: string
  }) {
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
