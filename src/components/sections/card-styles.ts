import { cn } from "cn"

// The flame: a soft glow rising from the bottom edge of a linked card, on
// hover (pointer devices only) and while pressed. It stays in the bottom third
// and is faint enough that muted text keeps AA contrast. Under reduced motion
// it only changes colour; it does not move.
export const flameGlowClass = cn(
  "overflow-hidden",
  "before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-1/2 before:translate-y-1/3 before:opacity-0 before:transition-[opacity,translate] before:duration-300 before:ease-out before:content-['']",
  "before:bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,color-mix(in_oklch,var(--flame)_40%,transparent),color-mix(in_oklch,var(--saffron)_12%,transparent)_55%,transparent_80%)]",
  "hover:before:translate-y-0 hover:before:opacity-100 active:before:translate-y-0 active:before:opacity-100",
  "motion-reduce:before:translate-y-0 motion-reduce:before:transition-none",
)

// Mobile: items are rows inside one raised panel (the <ul>). From md the panel
// disappears and each <li> becomes its own card.
export const itemClass = cn(
  "relative first:rounded-t-xl last:rounded-b-xl md:rounded-xl md:border md:bg-card",
  "has-[:focus-visible]:z-10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
)
