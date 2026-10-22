import type { ComponentProps } from "react"
import { cn } from "cn"

function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto max-w-6xl px-4 md:px-6", className)}
      {...props}
    />
  )
}

export { Container }
