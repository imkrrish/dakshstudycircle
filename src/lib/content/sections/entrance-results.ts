import { z } from "zod"
import { sectionBase, type LoadedContent } from "../shared"
import { ResultPhotoSchema } from "../collections/results"

const entranceResultsBase = {
  ...sectionBase,
  type: z.literal("entrance-results"),
  heading: z.string().min(1),
  // The one line shown when there are no entrance results (production, until
  // real records arrive).
  empty: z.string().min(1),
}

// One group per entrance exam, in the order they are listed here. `exam`
// matches a result's `exam` ("RMS CET", "RIMC", "AISSEE"); `label` is the
// group's heading.
const GroupSchema = z.strictObject({
  exam: z.string().min(1),
  label: z.string().min(1),
})

// Authoring shape: every entrance result in the collection is shown, grouped.
export const EntranceResultsSectionSchema = z.strictObject({
  ...entranceResultsBase,
  groups: z.array(GroupSchema).min(1),
})

const ItemSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  photo: ResultPhotoSchema.optional(),
  // "Sainik School, Kunjpura" is split at the last comma: `head` is
  // "Sainik School", `place` is "Kunjpura". A name without a comma is all
  // `place`.
  school: z.strictObject({
    head: z.string().optional(),
    place: z.string(),
  }),
  // The quiet line: "Admitted · Class 6 · 2026".
  status: z.string(),
  entryClass: z.string(),
  year: z.number().int(),
})

const ResolvedEntranceResultsSectionSchema = z.strictObject({
  ...entranceResultsBase,
  groups: z.array(
    z.strictObject({
      exam: z.string(),
      label: z.string(),
      items: z.array(ItemSchema),
    }),
  ),
})

export type EntranceResultsSection = z.infer<
  typeof EntranceResultsSectionSchema
>
export type ResolvedEntranceResultsSection = z.infer<
  typeof ResolvedEntranceResultsSectionSchema
>
export type EntranceResultItem = z.infer<typeof ItemSchema>

// ---------- Resolving ----------

function splitSchool(school: string): EntranceResultItem["school"] {
  const at = school.lastIndexOf(",")
  if (at === -1) return { place: school.trim() }
  return {
    head: school.slice(0, at).trim(),
    place: school.slice(at + 1).trim(),
  }
}

// Entrance results only, grouped by exam in the order the section lists them;
// a group with no results is skipped. Within a group newest year first (the
// sort is stable, so data order breaks ties). A duplicate group, or an
// entrance result whose exam has no group, fails the build, so a real result
// is never dropped silently.
export function resolveEntranceResults(
  section: EntranceResultsSection,
  content: LoadedContent,
): ResolvedEntranceResultsSection {
  const exams = section.groups.map((g) => g.exam)
  const duplicate = exams.find((exam, i) => exams.indexOf(exam) !== i)
  if (duplicate) {
    throw new Error(
      `[content] section "${section.id}": duplicate group "${duplicate}"`,
    )
  }

  const entrance = content.results.filter((r) => r.class === "Entrance")
  const orphan = entrance.find((r) => !exams.includes(r.exam))
  if (orphan) {
    throw new Error(
      `[content] section "${section.id}": result "${orphan.id}" is ${orphan.exam}, which has no group`,
    )
  }

  const groups = section.groups
    .map(({ exam, label }) => ({
      exam,
      label,
      items: entrance
        .filter((r) => r.exam === exam)
        .sort((a, b) => b.year - a.year)
        .map((r): EntranceResultItem => ({
          id: r.id,
          name: r.studentName,
          photo: r.photo,
          school: splitSchool(r.outcome?.school ?? r.outcome?.title ?? ""),
          status: r.outcome?.status ?? "Admitted",
          entryClass: `Class ${r.entryClass}`,
          year: r.year,
        })),
    }))
    .filter((group) => group.items.length > 0)

  return { ...section, groups }
}
