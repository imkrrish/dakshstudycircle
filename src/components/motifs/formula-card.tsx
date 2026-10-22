import type { ComponentProps } from "react"
import { cn } from "cn"

function FormulaCard({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="formula-card"
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <rect vectorEffect="non-scaling-stroke" x="6" y="6" width="108" height="68" rx="6" />
      <path vectorEffect="non-scaling-stroke" d="M18 20H48" />
      <path vectorEffect="non-scaling-stroke" className="stroke-saffron" d="M18 24H30" />
      <path vectorEffect="non-scaling-stroke" d="M18 62H102" />
      <text
        x="60"
        y="46"
        textAnchor="middle"
        fontSize="15"
        fill="currentColor"
        stroke="none"
        className="font-heading"
      >
        a² + b² = c²
      </text>
    </svg>
  )
}

export { FormulaCard }
