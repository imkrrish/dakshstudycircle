import { useId, type ComponentProps } from "react"
import { cn } from "cn"

function FlameBlob({ className, ...props }: ComponentProps<"svg">) {
  const id = useId()
  const gradientId = `${id}-gradient`
  const blurId = `${id}-blur`

  return (
    <svg
      data-slot="flame-blob"
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("shrink-0 overflow-visible", className)}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0"
            style={{ stopColor: "var(--saffron)", stopOpacity: 0.45 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--flame)", stopOpacity: 0.2 }}
          />
        </linearGradient>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <path
        d="M50 8C70 28 88 44 82 66C77 84 58 92 44 90C24 87 12 70 18 52C24 34 42 24 50 8Z"
        fill={`url(#${gradientId})`}
        filter={`url(#${blurId})`}
      />
    </svg>
  )
}

export { FlameBlob }
