import type { ComponentProps } from "react"
import { cn } from "cn"

const footerLinkClass =
  "rounded-sm text-foreground underline-offset-4 outline-none hover:underline focus-visible:underline focus-visible:ring-3 focus-visible:ring-ring/30"

function FooterColumn({
  title,
  className,
  children,
  ...props
}: Omit<ComponentProps<"div">, "title"> & { title: string }) {
  return (
    <div data-slot="footer-column" className={cn(className)} {...props}>
      <h2 className="font-sans text-sm font-normal text-muted-foreground">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3 text-sm md:text-base">
        {children}
      </ul>
    </div>
  )
}

export { FooterColumn, footerLinkClass }
