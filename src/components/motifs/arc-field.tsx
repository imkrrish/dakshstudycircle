import type { ComponentProps } from "react"
import { cn } from "cn"

function ArcField({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="arc-field"
      viewBox="0 0 200 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path vectorEffect="non-scaling-stroke" d="M-10 100A30 30 0 0 1 50 100" />
      <path vectorEffect="non-scaling-stroke" d="M-30 100A50 50 0 0 1 70 100" />
      <path vectorEffect="non-scaling-stroke" d="M-50 100A70 70 0 0 1 90 100" />
      <path vectorEffect="non-scaling-stroke" d="M30 100A30 30 0 0 1 90 100" />
      <path vectorEffect="non-scaling-stroke" d="M10 100A50 50 0 0 1 110 100" />
      <path vectorEffect="non-scaling-stroke" d="M-10 100A70 70 0 0 1 130 100" />
      <path vectorEffect="non-scaling-stroke" d="M70 100A30 30 0 0 1 130 100" />
      <path vectorEffect="non-scaling-stroke" d="M50 100A50 50 0 0 1 150 100" />
      <path vectorEffect="non-scaling-stroke" d="M30 100A70 70 0 0 1 170 100" />
      <path vectorEffect="non-scaling-stroke" d="M110 100A30 30 0 0 1 170 100" />
      <path vectorEffect="non-scaling-stroke" d="M90 100A50 50 0 0 1 190 100" />
      <path vectorEffect="non-scaling-stroke" d="M70 100A70 70 0 0 1 210 100" />
      <path vectorEffect="non-scaling-stroke" d="M150 100A30 30 0 0 1 210 100" />
      <path vectorEffect="non-scaling-stroke" d="M130 100A50 50 0 0 1 230 100" />
      <path vectorEffect="non-scaling-stroke" d="M110 100A70 70 0 0 1 250 100" />
    </svg>
  )
}

export { ArcField }
