import { Fragment, type ComponentProps } from "react"
import { cn } from "cn"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Crumb = { label: string; href?: string }

// The trail above a compact hero's eyebrow. The last item is the current page.
function HeroBreadcrumbs({
  items,
  className,
  ...props
}: ComponentProps<"nav"> & { items: Crumb[] }) {
  return (
    <Breadcrumb
      data-slot="hero-breadcrumbs"
      className={cn(className)}
      {...props}
    >
      <BreadcrumbList>
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink
                  render={<Link href={item.href} />}
                  className="hit-area link-draw focus-ring"
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { HeroBreadcrumbs }
