import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import type { ResolvedVideoGridSection, SectionOf } from "@/lib/content-schema"
import { flameGlowClass, itemClass } from "./card-styles"

type Item = ResolvedVideoGridSection["items"][number]

// Below md: compact rows (thumbnail left) inside one raised panel. From md:
// equal cards, thumbnail on top, wrapping 3 per row (md) or 5 per row (lg);
// a short last row is centred, so no card sits alone at the edge.
// Thumbnails rest desaturated and slightly warm, and return to full colour
// with the flame glow (hover on pointer devices, and while pressed).
function VideoItem({ item }: { item: Item }) {
  return (
    <li
      className={cn(
        itemClass,
        flameGlowClass,
        "group/item isolate flex min-h-16 items-center gap-3 px-4 py-3 transition-none before:-z-10",
        "hover:bg-muted active:bg-accent",
        "md:basis-[calc((100%-2rem)/3)] md:flex-col md:items-stretch md:gap-3 md:p-3 lg:basis-[calc((100%-4rem)/5)]",
      )}
    >
      <div className="relative aspect-video w-24 shrink-0 overflow-clip rounded-md bg-muted md:w-full md:rounded-lg">
        <Image
          src={item.thumbnail.src}
          alt={item.thumbnail.alt}
          fill
          sizes="(min-width: 1024px) 13rem, (min-width: 768px) 30vw, 6rem"
          className="object-cover saturate-60 sepia-[.12] transition-[filter] duration-300 ease-out group-hover/item:saturate-100 group-hover/item:sepia-0 group-active/item:saturate-100 group-active/item:sepia-0 motion-reduce:transition-none"
        />
      </div>
      <div className="grid flex-1 grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 md:px-1 md:pb-1">
        <h3 className="font-heading text-subtitle md:col-span-2">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {item.title}
            <span className="sr-only">
              {" "}
              playlist on YouTube (opens in a new tab)
            </span>
          </a>
        </h3>
        <p className="text-sm text-muted-foreground">{item.meta}</p>
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          strokeWidth={2}
          aria-hidden="true"
          className="col-start-2 row-span-2 row-start-1 size-5 text-muted-foreground transition-transform duration-200 ease-out group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 group-active/item:translate-x-0.5 group-active/item:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/item:translate-x-0 motion-reduce:group-hover/item:translate-y-0 motion-reduce:group-active/item:translate-x-0 motion-reduce:group-active/item:translate-y-0 md:row-span-1 md:row-start-2"
        />
      </div>
    </li>
  )
}

function VideoGridSection({ section }: { section: SectionOf<"video-grid"> }) {
  const { id, eyebrow, heading, intro, tone, items, actions } = section

  return (
    <Section
      data-slot="video-grid-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        <ul className="divide-y overflow-visible rounded-xl border bg-card md:flex md:flex-wrap md:justify-center md:gap-4 md:divide-y-0 md:rounded-none md:border-0 md:bg-transparent">
          {items.map((item) => (
            <VideoItem key={item.href} item={item} />
          ))}
        </ul>
        {actions && actions.length > 0 && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {actions.map((button) => (
              <ActionButton
                key={button.label}
                button={button}
                size="lg"
                className="h-11 w-full sm:h-10 sm:w-auto"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

export { VideoGridSection }
