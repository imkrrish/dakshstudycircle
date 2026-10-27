import { Clock01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cva } from "class-variance-authority"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import { getSite } from "@/lib/content"
import { formatHours } from "@/lib/hours"
import type { SectionOf } from "@/lib/content-schema"

import { CtaGlow } from "./cta-glow"

const ctaBandVariants = cva("", {
  variants: {
    variant: {
      // The page's one dark band: warm ink, light text (see [data-surface="ink"]).
      dark: "relative isolate overflow-clip bg-background text-foreground",
      light: "bg-secondary",
    },
  },
})

async function CtaBandSection({ section }: { section: SectionOf<"cta-band"> }) {
  const { id, variant, heading, body, actions, showHours } = section
  const hours = showHours
    ? formatHours((await getSite()).contact.hours)
    : undefined

  return (
    <Section
      data-slot="cta-band-section"
      data-surface={variant === "dark" ? "ink" : undefined}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={ctaBandVariants({ variant })}
    >
      {variant === "dark" && <CtaGlow />}
      <Container className="flex flex-col items-center gap-8 text-center">
        <SectionHeading
          id={`${id}-heading`}
          title={heading}
          intro={body}
          align="center"
          className="max-w-2xl text-balance [&_p]:text-pretty [&_p]:text-foreground/85"
        />
        {actions.length > 0 && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {actions.map((button) => (
              <ActionButton
                key={button.label}
                button={button}
                size="lg"
                className="h-11 w-full sm:w-auto lg:h-10"
              />
            ))}
          </div>
        )}
        {hours && (
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground tabular-nums">
            <HugeiconsIcon
              icon={Clock01Icon}
              strokeWidth={2}
              className="size-4"
              aria-hidden="true"
            />
            {hours.map((row, i) => (
              <span key={row} className="whitespace-nowrap">
                {i > 0 && (
                  <span aria-hidden="true" className="mr-2">
                    ·
                  </span>
                )}
                {row}
              </span>
            ))}
          </p>
        )}
      </Container>
    </Section>
  )
}

export { CtaBandSection }
