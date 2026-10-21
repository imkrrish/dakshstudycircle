import type { ComponentProps } from "react"
import { cn } from "cn"

function Flame({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="flame"
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
      <path vectorEffect="non-scaling-stroke" d="M50 78C34 78 25 67 27 54C29 40 40 32 46 22C51 13 54 8 58 2C60 12 74 28 74 52C74 68 64 78 50 78Z" />
      <path vectorEffect="non-scaling-stroke" d="M48 44C54 50 62 56 62 64C62 71 56 74 50 74C44 74 38 70 38 63C38 55 44 50 48 44Z" />
      <path vectorEffect="non-scaling-stroke" d="M18 84H82" />
      <path vectorEffect="non-scaling-stroke" d="M24 84Q50 100 76 84" />
    </svg>
  )
}

export { Flame }
