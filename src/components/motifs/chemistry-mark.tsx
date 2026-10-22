import type { ComponentProps } from "react"
import { cn } from "cn"

function ChemistryMark({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="chemistry-mark"
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
      <path vectorEffect="non-scaling-stroke" d="M38 12H62" />
      <path vectorEffect="non-scaling-stroke" d="M42 12V38" />
      <path vectorEffect="non-scaling-stroke" d="M58 12V38" />
      <path vectorEffect="non-scaling-stroke" d="M42 38L21.25 79.5Q19 84 24 84H76Q81 84 78.75 79.5L58 38" />
      <path vectorEffect="non-scaling-stroke" d="M29 64Q39.5 58 50 64T71 64" />
      <circle vectorEffect="non-scaling-stroke" className="fill-flame" cx="46" cy="74" r="2" />
      <circle vectorEffect="non-scaling-stroke" cx="57" cy="72" r="1.5" />
      <circle vectorEffect="non-scaling-stroke" cx="51" cy="50" r="1.5" />
    </svg>
  )
}

export { ChemistryMark }
