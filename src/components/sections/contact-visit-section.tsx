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
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading id={`${id}-heading`} title={heading} />
        <ContactRoute stations={route.stations} />
        <div className="mt-2 grid gap-14 md:mt-0 lg:mt-4 lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <div className="max-w-xl lg:col-span-6">
            {/* A printed address card: the mat of the hero photo (ring) holding
                a plate of a different tone. The map and the buttons live
                inside it, under the address. */}
            <div className="rounded-xl border bg-card p-1.5">
              <div className="flex flex-col gap-8 rounded-lg bg-muted px-6 py-7 md:px-10 md:py-10">
                <div className="flex flex-col gap-2">
                  <p className={labelClass}>{labels.address}</p>
                  <address className="font-heading text-title not-italic">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        <Unbroken text={line} />
                      </span>
                    ))}
                  </address>
                </div>
                {map ? (
                  <MapFacade {...map}>{buttons}</MapFacade>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {buttons}
                  </div>
                )}
              </div>
            </div>
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
            <p className="mt-3 max-w-prose text-foreground/80">{note}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { ContactVisitSection }
