import { useId, type ComponentProps } from "react"
import { cn } from "cn"

// Filled, symmetric about x=80: the right half is drawn once and mirrored.
// One gradient (flame at the top, logo red at the bottom) fills every shape.
function DiyaOrnament({ className, ...props }: ComponentProps<"svg">) {
  const gradientId = useId()
  const fill = `url(#${gradientId})`

  return (
    <svg
      data-slot="diya-ornament"
      viewBox="0 0 160 32"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="80"
          y1="2"
          x2="80"
          y2="30"
        >
          <stop offset="0" stopColor="var(--flame)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
      {/* Flame and bowl */}
      <path
        fill={fill}
        d="M80 2C84.5 8 85.5 12.5 80 17.5C74.5 12.5 75.5 8 80 2Z"
      />
      <path fill={fill} d="M69 20.5H91C90 27 86 30 80 30C74 30 70 27 69 20.5Z" />
      {/* Right half, mirrored for the left */}
      {[false, true].map((mirror) => (
        <g key={String(mirror)} transform={mirror ? "translate(160 0) scale(-1 1)" : undefined}>
          <path
            fill={fill}
            d="M95 22.5C106 22.5 112 15.5 128 15C119 21 108 25 95 22.5Z"
          />
          <path
            fill={fill}
            d="M97 19.5C104 17.5 109 12.5 118 9.5C117 15 108 19 97 19.5Z"
          />
          <circle fill={fill} cx="135" cy="14.5" r="1.8" />
          <circle fill={fill} cx="143" cy="14.5" r="1.2" />
          <circle fill={fill} cx="149.5" cy="14.5" r="0.8" />
        </g>
      ))}
    </svg>
  )
}

export { DiyaOrnament }
