import type { ComponentProps, CSSProperties, ReactNode } from "react"
import Image from "next/image"
import { cn } from "cn"

import type { FloatingItem } from "@/lib/content-schema"

const itemSize: Record<FloatingItem, string> = {
  emblem: "size-16 lg:size-24",
  book: "size-16 lg:size-24",
  compass: "size-16 lg:size-24",
  atom: "size-16 lg:size-24",
  flask: "size-16 lg:size-24",
  pencil: "size-16 lg:size-24",
  globe: "size-16 lg:size-24",
  formula: "h-16 w-28 lg:h-20 lg:w-40",
}

function tileContent(item: FloatingItem): ReactNode {
  if (item === "formula") {
    return (
      <span className="font-heading text-base whitespace-nowrap text-foreground lg:text-xl">
        a² + b² = c²
      </span>
    )
  }
  if (item === "emblem") {
    return (
      <Image
        src="/daksh-emblem-only.png"
        alt=""
        width={750}
        height={750}
        sizes="(min-width: 1024px) 96px, 64px"
        className="size-full object-contain p-3"
      />
    )
  }
  return (
    <Image
      src={`/hero/${item}.webp`}
      alt=""
      width={256}
      height={256}
      sizes="(min-width: 1024px) 96px, 64px"
      className="size-full object-cover"
    />
  )
}

function HeroTile({
  item,
  rotate,
  duration,
  delay,
  className,
  ...props
}: ComponentProps<"div"> & {
  item: FloatingItem
  rotate: string
  duration: string
  delay: string
}) {
  return (
    <div data-hero-tile className={className} {...props}>
      <div
        className={cn(
          "hero-tile grid place-items-center overflow-hidden rounded-2xl bg-card",
          itemSize[item],
        )}
        style={
          {
            "--tile-rotate": rotate,
            "--bob-duration": duration,
            "--bob-delay": delay,
          } as CSSProperties
        }
      >
        {tileContent(item)}
      </div>
    </div>
  )
}

// Slot i holds the i-th item. Each slot lives beside one of three text bands
// (top: eyebrow, middle: subheading, bottom: buttons), never beside the
// headline, which fills the width. `rail` anchors the tile outside that band's
// content, measured from the centre; `nudge` pushes it further out from lg up
// so the sides stagger. Slots 0-3 show from md, 4-5 from lg.
const slots = [
  {
    band: "top",
    rail: "right-[calc(50%+9.5rem)] lg:items-start",
    nudge: "lg:mr-12",
    rotate: "-7deg",
    duration: "7s",
    delay: "-1s",
  },
  {
    band: "top",
    rail: "left-[calc(50%+9.5rem)] lg:items-end",
    nudge: "lg:ml-24",
    rotate: "6deg",
    duration: "8.5s",
    delay: "-4s",
  },
  {
    band: "bottom",
    rail: "right-[calc(50%+11rem)] lg:items-end",
    nudge: "lg:mr-24",
    rotate: "8deg",
    duration: "9s",
    delay: "-2s",
  },
  {
    band: "bottom",
    rail: "left-[calc(50%+11rem)] lg:items-start",
    nudge: "lg:ml-12",
    rotate: "-8deg",
    duration: "6.5s",
    delay: "-5s",
  },
  {
    band: "middle",
    rail: "right-[calc(50%+19.5rem)] items-center",
    nudge: "xl:mr-10",
    rotate: "-4deg",
    duration: "8s",
    delay: "-3s",
  },
  {
    band: "middle",
    rail: "left-[calc(50%+19.5rem)] items-center",
    nudge: "xl:ml-6",
    rotate: "5deg",
    duration: "7.5s",
    delay: "-6s",
  },
] as const

type Band = (typeof slots)[number]["band"]

// Side tiles for one text band. The parent band is `relative` and tall enough
// to hold a tile, so a tile never reaches the rows above or below it.
function HeroTileRails({
  band,
  items,
  className,
  ...props
}: ComponentProps<"div"> & { band: Band; items: FloatingItem[] }) {
  return (
    <div
      data-slot="hero-tile-rails"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      {...props}
    >
      {slots.map((slot, i) => {
        const item = items[i]
        if (slot.band !== band || !item) return null
        return (
          <div
            key={`${item}-${i}`}
            className={cn(
              "absolute inset-y-0 hidden items-center",
              band === "middle" ? "lg:flex" : "md:flex",
              slot.rail,
            )}
          >
            <HeroTile
              item={item}
              rotate={slot.rotate}
              duration={slot.duration}
              delay={slot.delay}
              className={slot.nudge}
            />
          </div>
        )
      })}
    </div>
  )
}

// Below md: one row of the first three items, under the proof line.
function HeroTileRow({
  items,
  className,
  ...props
}: ComponentProps<"div"> & { items: FloatingItem[] }) {
  return (
    <div
      data-slot="hero-tile-row"
      aria-hidden="true"
      className={cn(
        "pointer-events-none flex items-center justify-center gap-4 md:hidden",
        className,
      )}
      {...props}
    >
      {items.slice(0, 3).map((item, i) => (
        <HeroTile
          key={`${item}-${i}`}
          item={item}
          rotate={slots[i].rotate}
          duration={slots[i].duration}
          delay={slots[i].delay}
        />
      ))}
    </div>
  )
}

export { HeroTileRails, HeroTileRow }
