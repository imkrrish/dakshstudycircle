import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PrintedPortrait } from "@/components/shared/printed-portrait"
import type { SectionOf } from "@/lib/content"

// One person, large. Phone: the portrait beside the name and role, the rest
// full width below. From md: portrait left, all text in one column on the right.
function PersonFeatureSection({
  section,
}: {
  section: SectionOf<"person-feature">
}) {
  const { id, person } = section
  return (
    <Section
      data-slot="person-feature-section"
      tone={section.tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="grid grid-cols-[7rem_1fr] items-center gap-x-4 gap-y-6 md:grid-cols-[15rem_1fr] md:items-center md:gap-x-12 lg:grid-cols-[18rem_1fr] lg:gap-x-16">
        <PrintedPortrait
          photo={person.photo}
          priority
          decorative
          sizes="(min-width: 1024px) 18rem, (min-width: 768px) 15rem, 112px"
        />
        <div className="contents md:flex md:flex-col md:gap-6">
          <div className="flex flex-col gap-1">
            <h2 id={`${id}-heading`} className="font-heading text-heading">
              {person.name}
            </h2>
            <p className="text-lead text-muted-foreground">{person.role}</p>
          </div>
          <div className="col-span-full flex flex-col gap-4 md:col-span-1">
            {person.bio && (
              <p className="max-w-prose text-lead text-foreground/80">
                {person.bio}
              </p>
            )}
            <p className="font-heading text-title">{person.teachesLine}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { PersonFeatureSection }
