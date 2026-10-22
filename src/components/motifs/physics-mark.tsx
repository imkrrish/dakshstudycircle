import type { ComponentProps } from "react"
import { cn } from "cn"

function PhysicsMark({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="physics-mark"
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
      <circle vectorEffect="non-scaling-stroke" className="fill-saffron" cx="50" cy="50" r="4" />
      <ellipse vectorEffect="non-scaling-stroke" cx="50" cy="50" rx="42" ry="16" transform="rotate(45 50 50)" />
      <ellipse vectorEffect="non-scaling-stroke" cx="50" cy="50" rx="42" ry="16" transform="rotate(135 50 50)" />
      <circle vectorEffect="non-scaling-stroke" cx="70.06" cy="81.38" r="2.5" />
      <circle vectorEffect="non-scaling-stroke" cx="81.78" cy="25.96" r="2.5" />
    </svg>
  )
}

export { PhysicsMark }
