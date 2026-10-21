import type { ComponentProps } from "react"
import { cn } from "cn"

const dots = [30, 50, 70].flatMap((cy) => [30, 50, 70].map((cx) => ({ cx, cy })))

function KolamBloom({
  simple = false,
  className,
  ...props
}: ComponentProps<"svg"> & { simple?: boolean }) {
  return (
    <svg
      data-slot="kolam-bloom"
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
      {/* Loops around a 3x3 pulli grid: r=12 lobes round the edge dots, r=8 arcs round the corner dots */}
      <path
        vectorEffect="non-scaling-stroke"
        d="M62 30A12 12 0 0 0 38 30A8 8 0 0 1 30 38A12 12 0 0 0 30 62A8 8 0 0 1 38 70A12 12 0 0 0 62 70A8 8 0 0 1 70 62A12 12 0 0 0 70 38A8 8 0 0 1 62 30Z"
      />
      {simple ? (
        <circle vectorEffect="non-scaling-stroke" cx="50" cy="50" r="1.5" />
      ) : (
        <>
          <circle vectorEffect="non-scaling-stroke" cx="50" cy="50" r="9" />
          {dots.map(({ cx, cy }) => (
            <circle key={`${cx}-${cy}`} vectorEffect="non-scaling-stroke" cx={cx} cy={cy} r="1.5" />
          ))}
        </>
      )}
    </svg>
  )
}

export { KolamBloom }
