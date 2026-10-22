import { cva } from "class-variance-authority"
import { cn } from "cn"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { DiyaOrnament } from "@/components/motifs/diya-ornament"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content-schema"

import { HeroEntrance } from "./hero-entrance"
import { HeroFloatingTiles } from "./hero-floating-tiles"

const heroSectionVariants = cva("", {
  variants: {
    size: {
      large: "pt-4 pb-16 md:pt-6 md:pb-24",
      compact: "py-12 md:py-16",
    },
  },
  defaultVariants: { size: "large" },
})

function HeroSection({ section }: { section: SectionOf<"hero"> }) {
  const { id, size, eyebrow, heading, subheading, proofLine, actions } = section
  const large = size === "large"

  const copy = (
    <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
      {large && (
        <DiyaOrnament className="mb-5 h-7 w-40 text-muted-foreground/70" />
      )}
      {eyebrow && (
        <p className="mb-5 flex items-center gap-3 text-sm text-muted-foreground">
          <span aria-hidden="true" className="h-px w-8 bg-muted-foreground/40" />
          {eyebrow}
          <span aria-hidden="true" className="h-px w-8 bg-muted-foreground/40" />
        </p>
      )}
      <h1
        id={`${id}-heading`}
        className="font-heading text-4xl leading-tight font-normal tracking-tight text-balance md:text-6xl"
      >
        {heading}
      </h1>
      {subheading && (
        <p className="mt-5 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
          {subheading}
        </p>
      )}
      {actions && actions.length > 0 && (
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {actions.map((button) => (
            <ActionButton
              key={button.label}
              button={button}
              size="lg"
              className="w-full sm:w-auto"
            />
          ))}
        </div>
      )}
      {proofLine && (
        <p className="mt-6 text-sm text-muted-foreground">{proofLine}</p>
      )}
    </div>
  )

  return (
    <Section
      data-slot="hero-section"
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(heroSectionVariants({ size }))}
    >
      <Container>
        {large ? (
          <HeroEntrance className="relative isolate overflow-hidden rounded-3xl border bg-background px-5 pt-28 pb-14 md:px-10 md:py-32 lg:py-36">
            {/* Dot grid, faded out toward the centre so text sits on clean ground */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[1.25rem_1.25rem] mask-[radial-gradient(ellipse_at_center,transparent_25%,black_80%)]"
            />
            {/* Colour wash, fading into the page background */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-linear-to-b from-flame/20 via-saffron/10 to-transparent"
            />
            {section.floatingItems && (
              <HeroFloatingTiles items={section.floatingItems} />
            )}
            {copy}
          </HeroEntrance>
        ) : (
          copy
        )}
      </Container>
    </Section>
  )
}

export { HeroSection, heroSectionVariants }
