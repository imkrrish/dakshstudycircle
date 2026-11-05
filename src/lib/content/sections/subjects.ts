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

export const SubjectsSectionSchema = z.strictObject({
  ...subjectsBase,
  // One short line per subject on what it covers. Each subject must be in the
  // course's `subjects`, once.
  summaries: z
    .array(
      z.strictObject({ subject: z.string().min(1), text: z.string().min(1) }),
    )
    .optional(),
  // Cards that are not single subjects (e.g. one per exam entry), in place of
  // the course's subjects. Not used together with `summaries`.
  entries: z
    .array(
      z.strictObject({ title: z.string().min(1), text: z.string().min(1) }),
    )
    .min(1)
    .optional(),
})

export const resolvedSubjectItem = z.strictObject({
  name: z.string().min(1),
  summary: z.string().optional(),
})

// What the component receives: one card per item.
export const ResolvedSubjectsSectionSchema = z.strictObject({
  ...subjectsBase,
  items: z.array(resolvedSubjectItem),
})

export type SubjectsSection = z.infer<typeof SubjectsSectionSchema>
export type ResolvedSubjectsSection = z.infer<
  typeof ResolvedSubjectsSectionSchema
>

// ---------- Resolving ----------

// One card per entry when the section has entries; otherwise one per course
// subject, with its summary when the section has one.
export function resolveSubjects(
  section: SubjectsSection,
  course: CourseLike,
): ResolvedSubjectsSection {
  const { entries, summaries, ...rest } = section
  if (entries) {
    return {
      ...rest,
      items: entries.map(({ title, text }) => ({ name: title, summary: text })),
    }
  }
  return {
    ...rest,
    items: course.subjects.map((name) => {
      const summary = summaries?.find((s) => s.subject === name)?.text
      return { name, ...(summary ? { summary } : {}) }
    }),
  }
}
