import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content"

// Plain version: call and WhatsApp buttons, the other numbers and the emails.
// The WhatsApp form (section.form) is data only until its design run.
function ContactReachSection({
  section,
}: {
  section: SectionOf<"contact-reach">
}) {
  const { id, tone, heading, intro, actions, otherPhones, whatsappNote, emailLabel, emails } =
    section

  return (
    <Section
      data-slot="contact-reach-section"
      tone={tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-6">
        <SectionHeading id={`${id}-heading`} title={heading} intro={intro} />
        <div className="flex flex-wrap gap-3">
          {actions.map((button) => (
            <ActionButton key={button.label} button={button} size="lg" />
          ))}
        </div>
        {otherPhones.length > 0 && (
          <ul className="flex flex-col gap-1">
            {otherPhones.map(({ e164, display }) => (
              <li key={e164}>
                <a href={`tel:${e164}`} className="focus-ring underline">
                  {display}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="text-muted-foreground">{whatsappNote}</p>
        {emails.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="font-medium">{emailLabel}</p>
            <ul className="flex flex-col gap-1">
              {emails.map((email) => (
                <li key={email} className="wrap-anywhere">
                  <a href={`mailto:${email}`} className="focus-ring underline">
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  )
}

export { ContactReachSection }
