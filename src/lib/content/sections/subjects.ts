import { z } from "zod"
import { sectionBase } from "../shared"

type CourseLike = { subjects: string[]; [k: string]: unknown }

// Course pages only: one card per subject in the course record.
export const subjectsBase = {
  ...sectionBase,
  type: z.literal("subjects"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
}

// Optional grouping (e.g. one group per exam). Each subject must be in the
// course's `subjects`. A group may have no subjects and only a `note`.
export const subjectGroupSchema = z.strictObject({
  label: z.string().min(1),
  note: z.string().optional(),
  subjects: z.array(z.string().min(1)),
})

export const SubjectsSectionSchema = z.strictObject({
  ...subjectsBase,
  groups: z.array(subjectGroupSchema).min(1).optional(),
  // One short line per subject on what it covers. Each subject must be in the
  // course's `subjects`, once.
  summaries: z
    .array(
      z.strictObject({ subject: z.string().min(1), text: z.string().min(1) }),
    )
    .optional(),
})

export const resolvedSubjectItem = z.strictObject({
  name: z.string().min(1),
  summary: z.string().optional(),
})

// What the component receives. With `groups`, `items` is empty and each group
// carries its own rows.
export const ResolvedSubjectsSectionSchema = z.strictObject({
  ...subjectsBase,
  items: z.array(resolvedSubjectItem),
  groups: z
    .array(
      z.strictObject({
        label: z.string().min(1),
        note: z.string().optional(),
        items: z.array(resolvedSubjectItem),
      }),
    )
    .optional(),
})

export type SubjectsSection = z.infer<typeof SubjectsSectionSchema>
export type ResolvedSubjectsSection = z.infer<typeof ResolvedSubjectsSectionSchema>

// ---------- Resolving ----------

// One row per subject, with its summary when the section has one.
export function resolveSubjects(
  section: SubjectsSection,
  course: CourseLike,
): ResolvedSubjectsSection {
  const { groups, summaries, ...rest } = section
  const rows = (names: string[]) =>
    names.map((name) => {
      const summary = summaries?.find((s) => s.subject === name)?.text
      return { name, ...(summary ? { summary } : {}) }
    })
  if (groups) {
    return {
      ...rest,
      items: [],
      groups: groups.map(({ label, note, subjects }) => ({
        label,
        ...(note ? { note } : {}),
        items: rows(subjects),
      })),
    }
  }
  return { ...rest, items: rows(course.subjects) }
}
