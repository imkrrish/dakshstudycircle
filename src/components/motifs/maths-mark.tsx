import type { ComponentProps } from "react"
import { cn } from "cn"

function MathsMark({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="maths-mark"
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
      <circle vectorEffect="non-scaling-stroke" cx="52" cy="12" r="4" />
      <path vectorEffect="non-scaling-stroke" d="M52 8V2" />
      <path vectorEffect="non-scaling-stroke" d="M50.55 15.73L24 84" />
      <path vectorEffect="non-scaling-stroke" d="M53.45 15.73L76.38 74.68" />
      <path vectorEffect="non-scaling-stroke" d="M78.71 73.77L80 84L74.05 75.59Z" />
      <path vectorEffect="non-scaling-stroke" d="M79.46 91.79A56 56 0 0 0 72.5 56" />
    </svg>
  )
}

export { MathsMark }
