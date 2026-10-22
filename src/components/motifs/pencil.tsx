import type { ComponentProps } from "react"
import { cn } from "cn"

// Drawn horizontally (tip left), then turned 45° about the centre.
function Pencil({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="pencil"
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
      <g transform="rotate(-45 50 50)">
        <path vectorEffect="non-scaling-stroke" d="M22 42L8 50L22 58" />
        <path vectorEffect="non-scaling-stroke" className="fill-saffron" d="M8 50L10.4 48.63V51.37Z" />
        <path vectorEffect="non-scaling-stroke" d="M22 42H78" />
        <path vectorEffect="non-scaling-stroke" d="M22 58H78" />
        <path vectorEffect="non-scaling-stroke" d="M22 42V58" />
        <path vectorEffect="non-scaling-stroke" d="M22 50H70" />
        <path vectorEffect="non-scaling-stroke" d="M70 42V58" />
        <path vectorEffect="non-scaling-stroke" d="M74 42V58" />
        <path vectorEffect="non-scaling-stroke" d="M78 42H86Q90 42 90 46V54Q90 58 86 58H78" />
      </g>
    </svg>
  )
}

export { Pencil }
