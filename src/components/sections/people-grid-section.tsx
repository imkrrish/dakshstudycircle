import { cn } from "cn"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { PrintedPortrait } from "@/components/shared/printed-portrait"
import type { SectionOf } from "@/lib/content"

type Person = SectionOf<"people-grid">["items"][number]

// Phone: the portrait beside the name and subjects, the rest full width below.
// From sm each card is five subgrid rows of the list (photo, name, subjects,
// quiet line, bio), so every row of cards lines up whatever wraps. A short
// last row is centred: cards span two columns of a four-column grid at sm and
// of a six-column grid at lg.
function PersonEntry({ person }: { person: Person }) {
  return (
    <li
      className={cn(
        "min-w-0 sm:col-span-2 sm:row-span-5 sm:grid sm:grid-rows-subgrid",
        "sm:max-lg:last:nth-[2n+1]:col-start-2",
        "lg:last:nth-[3n+1]:col-start-3 lg:nth-last-2:nth-[3n+1]:col-start-2",
      )}
    >
      <article className="grid grid-cols-[6.5rem_1fr] items-center gap-x-4 gap-y-4 sm:row-span-5 sm:grid-cols-1 sm:grid-rows-subgrid sm:items-stretch sm:gap-y-0">
        <PrintedPortrait
          photo={person.photo}
          decorative
          sizes="(min-width: 1152px) 22rem, (min-width: 640px) 45vw, 104px"
          className="sm:row-start-1"
        />
        <div className="flex flex-col gap-0.5 sm:contents">
          <h3 className="font-heading text-subtitle sm:row-start-2 sm:pt-5 md:text-title">
            {person.name}
          </h3>
          <p className="text-base font-semibold sm:row-start-3 sm:pt-0.5">
            {person.subjectsLine}
          </p>
        </div>
        <div className="col-span-full flex flex-col gap-3 sm:contents">
          <p className="text-sm text-muted-foreground sm:row-start-4 sm:pt-1">
            {person.quietLine}
          </p>
          {person.bio && (
            <p className="text-base text-foreground/80 sm:row-start-5 sm:pt-3 sm:pb-12">
              {person.bio}
            </p>
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
        <ul className="grid grid-cols-1 gap-y-12 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-0 lg:grid-cols-6 lg:gap-x-12">
          {items.map((person) => (
            <PersonEntry key={person.id} person={person} />
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export { PeopleGridSection }
