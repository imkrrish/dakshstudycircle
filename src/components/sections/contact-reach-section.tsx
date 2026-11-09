import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ContactWhatsappForm } from "@/components/sections/contact-whatsapp-form"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content"
import { CONTACT_FORM_RULES } from "@/lib/content/sections/contact-reach"

const emailLink =
  "focus-ring inline-flex min-h-11 items-center underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"

// The numbers are the focal point: EB Garamond 500 at the heading size, one
// step below the hero h1, never broken across lines.
const numberClass =
  "font-heading text-heading whitespace-nowrap [font-variant-numeric:lining-nums_tabular-nums]"

// Left: the numbers (call and WhatsApp under the first), then the emails.
// Right from lg (below everything else on phones): the enquiry slip.
function ContactReachSection({
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
    primary,
    otherPhones,
    whatsappNote,
    emailLabel,
    emails,
    form,
  } = section

  // The first primary button is the page's call to action; the navbar's
  // "Talk to us" goes outline while it is on screen (see NavCtaTone).
  const ctaIndex = actions.findIndex(
    (button) => (button.variant ?? "primary") === "primary",
  )

  return (
    <Section
      data-slot="contact-reach-section"
      tone={tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col lg:col-span-6">
          <SectionHeading id={`${id}-heading`} title={heading} intro={intro} />
          {primary && (
            <div className="mt-10 flex flex-col">
              <p className={numberClass}>{primary.display}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                {actions.map((button, i) => (
                  <ActionButton
                    key={button.label}
                    button={button}
                    size="lg"
                    showNumber={false}
                    data-hero-cta={i === ctaIndex ? "" : undefined}
                    className="h-11 w-full px-5 text-base sm:w-auto md:h-12 md:px-6 md:text-lead md:[&_svg:not([class*='size-'])]:size-5"
                  />
                ))}
              </div>
              {otherPhones.map(({ e164, display }) => (
                <a
                  key={e164}
                  href={`tel:${e164}`}
                  className={`${numberClass} mt-8 self-start link-draw py-1 focus-ring`}
                >
                  {display}
                </a>
              ))}
              <p className="mt-5 text-base text-muted-foreground">
                {whatsappNote}
              </p>
            </div>
          )}
          {emails.length > 0 && (
            <div className="mt-10 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                {emailLabel}
              </p>
              <ul className="-mt-0.5 flex flex-col">
                {emails.map((email) => (
                  <li key={email} className="wrap-anywhere">
                    <a href={`mailto:${email}`} className={emailLink}>
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
            className="lg:col-span-5 lg:col-start-8"
          />
        )}
      </Container>
    </Section>
  )
}

export { ContactReachSection }
