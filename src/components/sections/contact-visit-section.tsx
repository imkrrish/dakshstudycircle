import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ContactRoute, Unbroken } from "@/components/sections/contact-route"
import { MapFacade } from "@/components/sections/map-facade"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content"

const labelClass = "text-sm font-medium text-muted-foreground"

// The way to the centre. The route comes first (stations joined by a curve,
// in the board-year language); under it, the address on a printed label with
// the map and directions (left), and the hours as a small timetable with the
// free-demo note (right). Stacked on phones, address first.
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
    route,
    addressLines,
    hours,
    note,
    actions,
    map,
  } = section

  const buttons = actions.map((button) => (
    <ActionButton
      key={button.label}
      button={button}
      size="lg"
      className="h-11 w-full sm:w-auto lg:h-10"
    />
  ))

  return (
    <Section
      data-slot="contact-visit-section"
      className="[--caption-bg:var(--background)] data-[tone=muted]:[--caption-bg:var(--muted)]"
      tone={tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading id={`${id}-heading`} title={heading} />
        <ContactRoute stations={route.stations} />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex max-w-lg flex-col gap-6 lg:col-span-6">
            {/* The printed mat of the hero photo, holding a paper plate. */}
            <div className="rounded-xl border bg-card p-1.5">
              <div className="flex flex-col gap-2 rounded-lg bg-background px-5 py-5 md:px-7 md:py-6">
                <p className={labelClass}>{labels.address}</p>
                <address className="font-heading text-subtitle not-italic">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      <Unbroken text={line} />
                    </span>
                  ))}
                </address>
              </div>
            </div>
            {map ? (
              <MapFacade {...map}>{buttons}</MapFacade>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">{buttons}</div>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:col-span-5 lg:col-start-8">
            <p className={labelClass}>{labels.hours}</p>
            <dl className="grid grid-cols-[auto_auto] items-baseline justify-start gap-x-8 gap-y-2">
              {hours.map(({ days, times }) => (
                <div key={days} className="contents">
                  <dt className="text-base whitespace-nowrap text-foreground/80">
                    {days}
                  </dt>
                  <dd className="font-heading text-subtitle whitespace-nowrap tabular-nums">
                    {times}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-prose text-foreground/80">{note}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { ContactVisitSection }
