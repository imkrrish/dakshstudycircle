import type { ComponentProps } from "react"
import { cn } from "cn"

type Fact = { label: string; value: string }

// A small card of label, dotted leader, value rows, like a line on a printed
// notice. Kept tight so that, laid over a photo, it hides as little as possible.
function HeroFacts({
  facts,
  className,
  ...props
}: ComponentProps<"dl"> & { facts: Fact[] }) {
  return (
    <dl
      data-slot="hero-facts"
      className={cn("rounded-xl border bg-card px-3.5 py-2", className)}
      {...props}
    >
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-baseline gap-2 py-px">
          <dt className="flex min-w-0 flex-1 items-baseline gap-2 text-sm text-muted-foreground after:leader after:min-w-3 after:flex-1">
            {fact.label}
          </dt>
          <dd className="text-right text-sm text-foreground">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { HeroFacts }
