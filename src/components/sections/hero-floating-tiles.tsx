import type { ComponentProps, CSSProperties, ReactNode } from "react"
import Image from "next/image"
import { cn } from "cn"

import { ChemistryMark } from "@/components/motifs/chemistry-mark"
import { FormulaCard } from "@/components/motifs/formula-card"
import { MathsMark } from "@/components/motifs/maths-mark"
import { OpenBook } from "@/components/motifs/open-book"
import { Pencil } from "@/components/motifs/pencil"
import { PhysicsMark } from "@/components/motifs/physics-mark"
import type { FloatingItem } from "@/lib/content-schema"

const icon = "size-3/5 text-muted-foreground"

const itemContent: Record<FloatingItem, ReactNode> = {
  emblem: (
    <Image
      src="/daksh-emblem-only.png"
      alt=""
      width={750}
      height={750}
      sizes="96px"
      className="size-3/5 object-contain"
    />
  ),
  "open-book": <OpenBook className={icon} />,
  compass: <MathsMark className={icon} />,
  atom: <PhysicsMark className={icon} />,
  flask: <ChemistryMark className={icon} />,
  formula: <FormulaCard className="w-4/5 text-muted-foreground" />,
  pencil: <Pencil className={icon} />,
}

// Slot i holds the i-th item. Tiles live in the canvas edges and padding,
// never in the text column: slots 0-1 show from mobile, 2-3 from md,
// 4-5 from lg. Negative offsets let the canvas clip a tile for depth.
const slots = [
  {
    position:
      "top-5 -left-3 size-14 md:top-6 md:left-6 md:size-20 lg:top-14 lg:left-10 lg:size-24",
    rotate: "-6deg",
    duration: "7s",
    delay: "-1s",
  },
  {
    position:
      "top-8 -right-3 size-14 md:top-8 md:right-8 md:size-20 lg:top-20 lg:right-12 lg:size-24",
    rotate: "5deg",
    duration: "8s",
    delay: "-4s",
  },
  {
    position:
      "hidden md:block bottom-6 left-8 size-20 lg:bottom-auto lg:top-[46%] lg:-left-5 lg:size-24",
    rotate: "7deg",
    duration: "9s",
    delay: "-2s",
  },
  {
    position:
      "hidden md:block bottom-8 right-6 size-20 lg:bottom-auto lg:top-[42%] lg:-right-5 lg:size-24",
    rotate: "-8deg",
    duration: "6.5s",
    delay: "-5s",
  },
  {
    position: "hidden lg:block bottom-12 left-20 size-24",
    rotate: "-4deg",
    duration: "8.5s",
    delay: "-3s",
  },
  {
    position: "hidden lg:block bottom-10 right-20 h-20 w-32",
    rotate: "4deg",
    duration: "7.5s",
    delay: "-6s",
  },
] as const

function HeroFloatingTiles({
  items,
  className,
  ...props
}: ComponentProps<"div"> & { items: FloatingItem[] }) {
  return (
    <div
      data-slot="hero-floating-tiles"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      {...props}
    >
      {items.slice(0, slots.length).map((item, i) => {
        const slot = slots[i]
        return (
          <div
            key={`${item}-${i}`}
            data-hero-tile
            className={cn("absolute", slot.position)}
          >
            <div
              className="hero-tile grid size-full place-items-center rounded-2xl border bg-card shadow-sm"
              style={
                {
                  "--tile-rotate": slot.rotate,
                  "--bob-duration": slot.duration,
                  "--bob-delay": slot.delay,
                } as CSSProperties
              }
            >
              {itemContent[item]}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { HeroFloatingTiles }
