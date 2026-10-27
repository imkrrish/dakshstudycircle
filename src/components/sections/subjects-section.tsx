import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import type { SectionOf } from "@/lib/content-schema"

// One row per subject; a teacher line appears only where a teacher is known.
function SubjectsSection({ section }: { section: SectionOf<"subjects"> }) {
  const { id, eyebrow, heading, intro, items } = section

  return (
    <Section
      data-slot="subjects-section"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-12 lg:gap-x-16">
          <SectionHeading
            id={`${id}-heading`}
            eyebrow={eyebrow}
            title={heading}
            intro={intro}
            className="md:col-span-5"
          />
          <ul className="divide-y rounded-xl border bg-card px-4 md:col-span-7 md:px-6">
            {items.map((item) => (
              <li
                key={item.name}
                className="flex min-h-16 flex-col justify-center gap-0.5 py-4"
              >
                <h3 className="font-heading text-subtitle">{item.name}</h3>
                {item.teachers.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Taught by{" "}
                    {item.teachers
                      .map((t) => (t.role ? `${t.name}, ${t.role}` : t.name))
                      .join("; ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

export { SubjectsSection }
