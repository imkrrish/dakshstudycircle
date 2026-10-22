import type { ComponentProps } from "react"
import { cn } from "cn"

// Symmetric about x=80. Each path carries data-draw so the hero can "draw" it.
function DiyaOrnament({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="diya-ornament"
      viewBox="0 0 160 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Diya: bowl, rim, flame */}
      <path data-draw vectorEffect="non-scaling-stroke" d="M68 18Q80 30 92 18" />
      <path data-draw vectorEffect="non-scaling-stroke" d="M68 18H92" />
      <path
        data-draw
        vectorEffect="non-scaling-stroke"
        className="fill-flame/70"
        d="M80 16C75.5 13 75.5 9 80 3C84.5 9 84.5 13 80 16Z"
      />
      {/* Right side */}
      <path data-draw vectorEffect="non-scaling-stroke" d="M98 19C108 19 112 11 121 11C128 11 130 17 125.5 18C122 18.8 121 14.5 124.5 13.8" />
      <path data-draw vectorEffect="non-scaling-stroke" d="M136 19H150" />
      <circle data-draw vectorEffect="non-scaling-stroke" cx="155" cy="19" r="1" />
      {/* Left side (mirror) */}
      <path data-draw vectorEffect="non-scaling-stroke" d="M62 19C52 19 48 11 39 11C32 11 30 17 34.5 18C38 18.8 39 14.5 35.5 13.8" />
      <path data-draw vectorEffect="non-scaling-stroke" d="M24 19H10" />
      <circle data-draw vectorEffect="non-scaling-stroke" cx="5" cy="19" r="1" />
    </svg>
  )
}

export { DiyaOrnament }
