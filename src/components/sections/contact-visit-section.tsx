import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content"

// Plain version: the visit details and the directions button. The map facade
// (section.map) is data only until its design run; no iframe is rendered.
function ContactVisitSection({
  section,
}: {
  section: SectionOf<"contact-visit">
}) {
  const { id, tone, heading, labels, addressLines, landmark, metro, metroNote, hours, note, actions } =
    section

  return (
    <Section
      data-slot="contact-visit-section"
      tone={tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-6">
        <SectionHeading id={`${id}-heading`} title={heading} />
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="font-medium">{labels.address}</dt>
            <dd>
              <address className="not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </dd>
          </div>
          {landmark && (
            <div>
              <dt className="font-medium">{labels.landmark}</dt>
              <dd>{landmark}</dd>
            </div>
          )}
          {metro && (
            <div>
              <dt className="font-medium">{labels.metro}</dt>
              <dd>
                {metro}. {metroNote}
              </dd>
            </div>
          )}
          <div>
            <dt className="font-medium">{labels.hours}</dt>
            <dd>
              {hours.map((row) => (
                <span key={row} className="block">
                  {row}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <p>{note}</p>
        <div className="flex flex-wrap gap-3">
          {actions.map((button) => (
            <ActionButton key={button.label} button={button} size="lg" />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { ContactVisitSection }
