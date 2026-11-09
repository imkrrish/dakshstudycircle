import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ContactWhatsappForm } from "@/components/sections/contact-whatsapp-form"
import { ActionButton } from "@/components/shared/action-button"
import { getSite } from "@/lib/content"
import type { SectionOf } from "@/lib/content"
import { CONTACT_FORM_RULES } from "@/lib/content/sections/contact-reach"

const numberLink =
  "focus-ring inline-flex min-h-11 items-center underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"

// Left: the ways to reach us at once (call, WhatsApp, second number, emails).
// Right from lg (below the rest on phones): the WhatsApp prefill form.
async function ContactReachSection({
  section,
}: {
  section: SectionOf<"contact-reach">
}) {
  const {
    id,
    tone,
    heading,
    intro,
    actions,
    otherPhones,
    whatsappNote,
    emailLabel,
    emails,
    form,
  } = section
  const [primary] = (await getSite()).contact.phones

  return (
    <Section
      data-slot="contact-reach-section"
      tone={tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col lg:col-span-5">
          <SectionHeading id={`${id}-heading`} title={heading} intro={intro} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {actions.map((button) => (
              <ActionButton
                key={button.label}
                button={button}
                size="lg"
                className="h-11 w-full sm:w-auto lg:h-10"
              />
            ))}
          </div>
          {otherPhones.length > 0 && (
            <div className="mt-8">
              <ul className="flex flex-col">
                {otherPhones.map(({ e164, display }) => (
                  <li key={e164}>
                    <a
                      href={`tel:${e164}`}
                      className={`${numberLink} text-lead [font-variant-numeric:lining-nums_tabular-nums]`}
                    >
                      {display}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-muted-foreground">{whatsappNote}</p>
            </div>
          )}
          {emails.length > 0 && (
            <div className="mt-6 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                {emailLabel}
              </p>
              <ul className="flex flex-col">
                {emails.map((email) => (
                  <li key={email} className="wrap-anywhere">
                    <a href={`mailto:${email}`} className={numberLink}>
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {primary && (
          <ContactWhatsappForm
            form={form}
            phone={primary.e164}
            rules={CONTACT_FORM_RULES}
            className="lg:col-span-6 lg:col-start-7"
          />
        )}
      </Container>
    </Section>
  )
}

export { ContactReachSection }
