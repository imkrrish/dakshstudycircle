import type { ComponentProps } from "react"
import { cn } from "cn"

const footerLinkClass =
  "inline-flex min-h-9 items-center rounded-sm text-foreground md:min-h-0 md:inline underline-offset-4 focus-ring hover:underline focus-visible:underline"

function FooterColumn({
  title,
  listClassName,
  className,
  children,
  ...props
}: Omit<ComponentProps<"div">, "title"> & { title: string; listClassName?: string }) {
  return (
    <div data-slot="footer-column" className={cn(className)} {...props}>
      <h2 className="font-sans text-sm font-normal text-muted-foreground">
        {title}
      </h2>
      <ul
        className={cn(
          "mt-2 flex flex-col text-sm md:mt-4 md:gap-3 md:text-base",
          listClassName,
        )}
      >
        {children}
      </ul>
    </div>
  )
}

export { FooterColumn, footerLinkClass }
