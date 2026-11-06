import { z } from "zod"
import { ButtonSchema, ImageSchema, sectionBase, type LoadedContent } from "../shared"
import { findCourse } from "./course-grid"

const resultsGridBase = {
  ...sectionBase,
  type: z.literal("results-grid"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "compact": photo, score or outcome, name, meta. "full" adds subject marks.
  variant: z.enum(["compact", "full"]),
  actions: z.array(ButtonSchema).optional(),
}

// Authoring shape: which results to show. getPage() resolves them.
export const ResultsGridSectionSchema = z.strictObject({
  ...resultsGridBase,
  show: z.enum(["highlights", "all"]),
})

// What the component receives: plain data, text already built.
const ResolvedResultsGridSectionSchema = z.strictObject({
  ...resultsGridBase,
  items: z
    .array(
      z.strictObject({
        id: z.string(),
        name: z.string(),
        photo: ImageSchema.optional(),
        headline: z.string(),
        meta: z.string(),
        subjects: z.string().optional(),
      }),
    )
    .min(1),
})

export type ResultsGridSection = z.infer<typeof ResultsGridSectionSchema>
export type ResolvedResultsGridSection = z.infer<
  typeof ResolvedResultsGridSectionSchema
>

// ---------- Resolving ----------

export function resolveResultsGrid(
  section: ResultsGridSection,
  content: LoadedContent,
): ResolvedResultsGridSection {
  const { show, ...rest } = section
  const chosen = content.results.filter((r) => show === "all" || r.highlight)
  return {
    ...rest,
    items: chosen.map((r) => {
      const meta = r.outcome
        ? [`${r.outcome.note} ${r.year}`, findCourse(r.course, content.courses).title]
        : [
            r.class,
            r.stream,
            `${r.exam} ${r.year}`,
            findCourse(r.course, content.courses).title,
          ].filter(
            (part): part is string => Boolean(part),
          )
      return {
        id: r.id,
        name: r.studentName,
        photo: r.photo,
        headline: r.outcome ? r.outcome.title : `${r.percentage}%`,
        meta: meta.join(" · "),
        subjects:
          section.variant === "full" && r.subjects?.length
            ? r.subjects.map((s) => `${s.name} ${s.marks}`).join(" · ")
            : undefined,
      }
    }),
  }
}

// ---------- Validation ----------

// A results-grid that selects nothing would render an empty section.
export function checkResultsGrids(
  label: string,
  sections: Array<{ type: string; id: string; show?: string; [key: string]: unknown }>,
  results: Array<{ highlight?: boolean; [key: string]: unknown }>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "results-grid") continue
    if (section.show === "highlights" && !results.some((r) => r.highlight)) {
      errors.push(
        `${label}: results-grid "${section.id}" shows highlights but no result has highlight: true`,
      )
    }
    if (section.show === "all" && results.length === 0) {
      errors.push(`${label}: results-grid "${section.id}" has no results`)
    }
  }
}
