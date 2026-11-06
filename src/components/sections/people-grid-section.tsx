import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { PrintedPortrait } from "@/components/shared/printed-portrait"
import type { SectionOf } from "@/lib/content"

type Person = SectionOf<"people-grid">["items"][number]

// Phone: the portrait beside the name and role, the details full width below.
// From sm the portrait sits above the text.
function PersonEntry({ person }: { person: Person }) {
  return (
    <li className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-6rem)/3)]">
      <article className="grid grid-cols-[6.5rem_1fr] items-center gap-x-4 gap-y-4 sm:flex sm:flex-col sm:items-stretch sm:gap-y-5">
        <PrintedPortrait
          photo={person.photo}
          sizes="(min-width: 1152px) 22rem, (min-width: 640px) 45vw, 104px"
        />
        <div className="flex flex-col gap-0.5">
          <h3 className="font-heading text-subtitle md:text-title">
            {person.name}
          </h3>
          <p className="text-sm text-muted-foreground">{person.role}</p>
        </div>
        <div className="col-span-full flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold">{person.teaches}</p>
            {person.background && (
              <p className="text-sm text-muted-foreground">
                {person.background}
              </p>
            )}
          </div>
          {person.bio && (
            <p className="text-base text-foreground/80">{person.bio}</p>
          )}
        </div>
      </article>
    </li>
  )
}

function PeopleGridSection({ section }: { section: SectionOf<"people-grid"> }) {
  const { id, heading, intro, items } = section
  return (
    <Section
      data-slot="people-grid-section"
      tone={section.tone}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading id={`${id}-heading`} title={heading} intro={intro} />
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-12 lg:gap-x-12">
          {items.map((person) => (
            <PersonEntry key={person.id} person={person} />
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export { PeopleGridSection }
