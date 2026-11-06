import { z } from "zod"
import { sectionBase, type LoadedContent } from "../shared"
import { resolvePerson, type ResolvedPerson } from "../faculty-display"

// One person from the faculty collection, shown large: portrait, name, role,
// bio and what they teach. The h2 is the person's name.
export const PersonFeatureSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("person-feature"),
  // A faculty id.
  person: z.string().min(1),
})

export type PersonFeatureSection = z.infer<typeof PersonFeatureSectionSchema>
export type ResolvedPersonFeatureSection = Omit<
  PersonFeatureSection,
  "person"
> & { person: ResolvedPerson }

// ---------- Resolving ----------

// undefined when the person is not in the (production-filtered) collection,
// so the section is dropped rather than rendered empty.
export function resolvePersonFeature(
  section: PersonFeatureSection,
  content: LoadedContent,
): ResolvedPersonFeatureSection | undefined {
  const found = content.faculty.find((f) => f.id === section.person)
  if (!found) return undefined
  return { ...section, person: resolvePerson(found) }
}

// ---------- Validation ----------

export function checkPersonFeatures(
  label: string,
  sections: Array<{ type: string; id: string; [key: string]: unknown }>,
  facultyIds: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "person-feature") continue
    if (!facultyIds.has(section.person as string)) {
      errors.push(
        `${label}: person-feature "${section.id}" has unknown faculty id "${section.person}"`,
      )
    }
  }
}
