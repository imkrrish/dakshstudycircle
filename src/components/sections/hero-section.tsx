import { cva } from "class-variance-authority"

import { Section } from "@/components/layout/section"
import { DiyaOrnament } from "@/components/motifs/diya-ornament"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content-schema"

import { HeroEntrance } from "./hero-entrance"
import { HeroWash } from "./hero-wash"

// The hero starts at the top of the page, behind the transparent navbar, so
// it adds the navbar height to its own top padding.
const heroSectionVariants = cva("relative isolate overflow-clip", {
  variants: {
    size: {
      large:
        "flex min-h-[92svh] flex-col justify-center pt-[calc(var(--navbar-height)+3rem)] pb-16 md:pb-24",
      compact: "pt-[calc(var(--navbar-height)+3rem)] pb-12 md:pb-16",
    },
  },
  defaultVariants: { size: "large" },
})

const heroHeadingVariants = cva(
  "font-heading leading-[1.05] font-normal tracking-tight text-balance",
  {
    variants: {
      size: {
        large: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
        compact: "text-4xl sm:text-5xl md:text-6xl",
      },
    },
    defaultVariants: { size: "large" },
  },
)

function HeroSection({ section }: { section: SectionOf<"hero"> }) {
  const { id, size, eyebrow, heading, subheading, proofLine, actions } = section
  const large = size === "large"

  const headline = (
    <h1 id={`${id}-heading`} className={heroHeadingVariants({ size })}>
      {heading.map((line, i) => (
        <span key={line} className="sm:block">
          {line}
          {i < heading.length - 1 && " "}
        </span>
      ))}
    </h1>
  )

  const intro = subheading && (
    <p className="max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
      {subheading}
    </p>
  )

  const buttons = actions && actions.length > 0 && (
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
  )

  const proof = proofLine && (
    <p className="text-sm text-muted-foreground">{proofLine}</p>
  )

  const eyebrowRow = eyebrow && (
    <p className="flex items-center gap-3 text-sm text-muted-foreground">
      <span aria-hidden="true" className="h-px w-8 bg-muted-foreground/40" />
      {eyebrow}
      <span aria-hidden="true" className="h-px w-8 bg-muted-foreground/40" />
    </p>
  )

  return (
    <Section
      data-slot="hero-section"
      id={id}
      aria-labelledby={`${id}-heading`}
      className={heroSectionVariants({ size })}
    >
      <HeroWash size={size} />
      {large ? (
        <HeroEntrance className="mx-auto flex w-full max-w-6xl flex-col px-4 text-center md:px-6">
          <div className="flex flex-col items-center justify-center gap-5">
            <DiyaOrnament data-hero-ornament className="h-8 w-40" />
            {eyebrowRow}
          </div>
          <div className="mx-auto mt-6 max-w-5xl">{headline}</div>
          <div className="mt-6 flex flex-col items-center justify-center">
            {intro}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-6">
            {buttons}
            {proof}
          </div>
        </HeroEntrance>
      ) : (
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center md:px-6">
          {eyebrowRow && <div className="mb-5">{eyebrowRow}</div>}
          <div className="mx-auto max-w-5xl">{headline}</div>
          {intro && <div className="mt-5">{intro}</div>}
          {buttons && <div className="mt-8 w-full sm:w-auto">{buttons}</div>}
          {proof && <div className="mt-6">{proof}</div>}
        </div>
      )}
    </Section>
  )
}

export { HeroSection, heroSectionVariants }
