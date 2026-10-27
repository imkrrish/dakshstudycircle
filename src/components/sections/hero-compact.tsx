import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ActionButton } from "@/components/shared/action-button"
import { HeroBreadcrumbs } from "@/components/shared/hero-breadcrumbs"
import { ShotCard } from "@/components/shared/shot-card"
import type { SectionOf } from "@/lib/content-schema"

import { HeroFacts } from "./hero-facts"
import { HeroPhoto } from "./hero-photo"

// The inner-page hero: text on the left, a photo (or the brief for one) on the
// right from lg, with a small facts card laid over the photo's bottom-left
// corner. Below lg it is one column: text, a photo strip, the facts card on the
// strip's bottom edge. Without media the facts card stands alone on the right.
// It owns the space below it (the next section starts with no top padding).
function HeroCompact({ section }: { section: SectionOf<"hero"> }) {
  const {
    id,
    eyebrow,
    heading,
    subheading,
    proofLine,
    actions,
    breadcrumbs,
    media,
    facts,
  } = section

  const back = [...(breadcrumbs ?? [])].reverse().find((crumb) => crumb.href)

  // The first primary button is the hero's call to action (see NavCtaTone).
  const ctaIndex = actions?.findIndex(
    (button) => (button.variant ?? "primary") === "primary",
  )

  const factsCard = facts && <HeroFacts facts={facts.items} />

  return (
    <Section
      data-slot="hero-section"
      data-size="compact"
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative isolate overflow-clip pt-[calc(var(--navbar-height)+1.5rem)] pb-8 md:pt-[calc(var(--navbar-height)+3rem)] md:pb-10"
    >
      <Container className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        {(breadcrumbs || back) && (
          <div className="lg:col-span-12">
            {breadcrumbs && (
              <HeroBreadcrumbs items={breadcrumbs} className="hidden md:block" />
            )}
            {back?.href && (
              <Link
                href={back.href}
                className="hit-area link-draw focus-ring inline-flex items-center gap-1 text-sm text-muted-foreground md:hidden"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="size-4"
                />
                {back.label}
              </Link>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-col items-start lg:col-span-7 lg:mt-5">
          {eyebrow && (
            <p className="mb-3 text-eyebrow text-muted-foreground">{eyebrow}</p>
          )}
          <h1
            id={`${id}-heading`}
            className="max-w-4xl font-heading text-page-title text-balance"
          >
            {heading.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i < heading.length - 1 && " "}
              </span>
            ))}
          </h1>
          {subheading && (
            <p className="mt-4 max-w-md text-intro text-muted-foreground md:mt-5">
              {subheading}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {actions.map((button, i) => (
                <ActionButton
                  key={button.label}
                  button={button}
                  size="lg"
                  data-hero-cta={i === ctaIndex ? "" : undefined}
                  className="h-11 w-full sm:h-10 sm:w-auto"
                />
              ))}
            </div>
          )}
          {proofLine && (
            <p className="mt-6 text-sm text-balance text-muted-foreground">
              {proofLine}
            </p>
          )}
        </div>

        {media ? (
          <div className="relative mt-5 lg:col-span-5 lg:col-start-8 lg:mt-5 xl:col-span-4 xl:col-start-9">
            {media.image ? (
              <HeroPhoto image={media.image} />
            ) : (
              <ShotCard
                brief={media.shot}
                className={cn(
                  "aspect-2/1 md:aspect-5/2 lg:aspect-3/2",
                  facts && "pb-10 lg:pb-24",
                )}
              />
            )}
            {facts && (
              <HeroFacts
                facts={facts.items}
                className="relative -mt-8 mr-3 ml-3 md:mr-0 md:ml-6 md:max-w-sm lg:absolute lg:bottom-0 lg:left-0 lg:m-0 lg:mt-0 lg:w-72 lg:max-w-none lg:translate-y-8 lg:-translate-x-14"
              />
            )}
          </div>
        ) : (
          factsCard && (
            <div className="mt-6 lg:col-span-5 lg:col-start-8 lg:mt-5 lg:self-end xl:col-span-4 xl:col-start-9">
              {factsCard}
            </div>
          )
        )}
      </Container>
    </Section>
  )
}

export { HeroCompact }
