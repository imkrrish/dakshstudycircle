import type { ComponentProps } from "react"
import { cn } from "cn"

function OpenBook({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="open-book"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Draft: redo from the official logo SVG */}
      <path vectorEffect="non-scaling-stroke" d="M50 30C40 22 22 22 10 28V76C22 70 40 70 50 78" />
      <path vectorEffect="non-scaling-stroke" d="M50 30C60 22 78 22 90 28V76C78 70 60 70 50 78" />
      <path vectorEffect="non-scaling-stroke" d="M50 30V78" />
      <path vectorEffect="non-scaling-stroke" d="M45 38C39 33 27 31 16 35" />
      <path vectorEffect="non-scaling-stroke" d="M45 47C39 42 27 40 16 44" />
      <path vectorEffect="non-scaling-stroke" d="M45 56C39 51 27 49 16 53" />
      <path vectorEffect="non-scaling-stroke" d="M55 38C61 33 73 31 84 35" />
      <path vectorEffect="non-scaling-stroke" d="M55 47C61 42 73 40 84 44" />
      <path vectorEffect="non-scaling-stroke" d="M55 56C61 51 73 49 84 53" />
    </svg>
  )
}

export { OpenBook }
