import { Fragment } from "react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { MapFacade } from "@/components/sections/map-facade"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content"
import { cn } from "cn"

// A line that may break only between its parts: after a comma, or before a
// bracket. Each part stays whole, so a name, "(Magenta Line)", "about 2 km" or
// the pincode line never splits across lines.
function Unbroken({ text }: { text: string }) {
  const parts = text.split(/(?<=,) | (?=\()/)
  return parts.map((part, index) => (
    <Fragment key={part}>
      {index > 0 ? " " : null}
      <span className="whitespace-nowrap">{part}</span>
    </Fragment>
  ))
}

const labelClass = "text-sm font-medium text-muted-foreground"

// Left: the visit details, the free-demo note and the directions button.
// Right from lg (below the rest on phones): the click-to-load map. Without map
// data the section is one plain column.
function ContactVisitSection({
  section,
}: {
  section: SectionOf<"contact-visit">
}) {
  const {
    id,
    tone,
    heading,
    labels,
    addressLines,
    landmark,
    metro,
    metroNote,
    hours,
    note,
    actions,
    map,
  } = section

  return (
    <Section
      data-slot="contact-visit-section"
      tone={tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container
        className={cn(map && "grid gap-12 lg:grid-cols-12 lg:items-start")}
      >
        <div className={cn("flex flex-col", map && "lg:col-span-5")}>
          <SectionHeading id={`${id}-heading`} title={heading} />
          <dl className="mt-8 flex flex-col gap-6 md:gap-7">
            <div className="flex flex-col gap-1">
              <dt className={labelClass}>{labels.address}</dt>
              <dd>
                <address className="text-lead not-italic">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      <Unbroken text={line} />
                    </span>
                  ))}
                </address>
              </dd>
            </div>
            {landmark && (
              <div className="flex flex-col gap-1">
                <dt className={labelClass}>{labels.landmark}</dt>
                <dd className="text-balance">{landmark}</dd>
              </div>
            )}
            {metro && (
              <div className="flex flex-col gap-1">
                <dt className={labelClass}>{labels.metro}</dt>
                <dd>
                  <span className="block">
                    <Unbroken text={metro} />
                  </span>
                  <span className="block text-foreground/80">{metroNote}</span>
                </dd>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <dt className={labelClass}>{labels.hours}</dt>
              <dd className="tabular-nums">
                {hours.map((row) => (
                  <span key={row} className="block whitespace-nowrap">
                    {row}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <p className="mt-8 max-w-prose text-foreground/80">{note}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {actions.map((button) => (
              <ActionButton
                key={button.label}
                button={button}
                size="lg"
                className="h-11 w-full sm:w-auto lg:h-10"
              />
            ))}
          </div>
        </div>
        {map && <MapFacade {...map} className="lg:col-span-6 lg:col-start-7" />}
      </Container>
    </Section>
  )
}

export { ContactVisitSection }
