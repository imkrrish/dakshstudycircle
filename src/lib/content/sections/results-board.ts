import { z } from "zod"
import { ButtonSchema, ImageSchema, sectionBase, type LoadedContent } from "../shared"
import { findCourse } from "./course-grid"

type CourseLike = { slug: string; [k: string]: unknown }

const resultsBoardBase = {
  ...sectionBase,
  type: z.literal("results-board"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // Lettered at the head of the board, above the year switcher.
  boardTitle: z.string().min(1),
  // Size of the large year numeral between the rules. "display" (the default)
  // is the home board; "heading" keeps it below a page's h1 (course pages).
  yearSize: z.enum(["display", "heading"]).optional(),
  actions: z.array(ButtonSchema).optional(),
}

// Authoring shape. The board shows every year present in the results data,
// newest first, at most `perYear` rows each. getPage() resolves them.
export const ResultsBoardSectionSchema = z.strictObject({
  ...resultsBoardBase,
  perYear: z.number().int().min(1).max(12).default(6),
  // Only the newest N years (default: all). On a course page the board also
  // keeps only that course's results.
  years: z.number().int().min(1).optional(),
})

// What the component receives: one tab per year, text already built.
const ResolvedResultsBoardSectionSchema = z.strictObject({
  ...resultsBoardBase,
  years: z
    .array(
      z.strictObject({
        year: z.number().int(),
        items: z
          .array(
            z.strictObject({
              id: z.string(),
              name: z.string(),
              // Absent when every row of the board shares the same meta.
              meta: z.string().optional(),
              course: z.string(),
              // "96.2%" for board results; entrance results carry an outcome.
              score: z.string().optional(),
              outcome: z
                .strictObject({ status: z.string(), school: z.string() })
                .optional(),
              subjects: z
                .array(z.strictObject({ name: z.string(), marks: z.number() }))
                .optional(),
              photo: ImageSchema.optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
})

export type ResultsBoardSection = z.infer<typeof ResultsBoardSectionSchema>
export type ResolvedResultsBoardSection = z.infer<
  typeof ResolvedResultsBoardSectionSchema
>

// ---------- Resolving ----------

// Year tabs newest first. Within a year: highlights, then the higher
// percentage; entrance results (no percentage) after board results. The sort
// is stable, so data order breaks ties.
export function resolveResultsBoard(
  section: ResultsBoardSection,
  content: LoadedContent,
  course?: CourseLike,
): ResolvedResultsBoardSection {
  const { perYear, years: yearCount, ...rest } = section
  const results = course
    ? content.results.filter((r) => r.course === course.slug)
    : content.results
  const years = [...new Set<number>(results.map((r) => r.year))]
    .sort((a, b) => b - a)
    .slice(0, yearCount)
  const resolvedYears = years.map((year) => ({
      year,
      items: results
        .filter((r) => r.year === year)
        .sort(
          (a, b) =>
            Number(b.highlight ?? false) - Number(a.highlight ?? false) ||
            (b.percentage ?? -1) - (a.percentage ?? -1),
        )
        .slice(0, perYear)
        .map((r) => ({
          id: r.id,
          name: r.studentName,
          meta: (r.outcome ? [r.class, r.exam] : [r.class, r.stream])
            .filter((part): part is string => Boolean(part))
            .join(" · "),
          course: findCourse(r.course, content.courses).title,
          // One decimal, so "93.0%" lines up with "96.2%" down the board.
          score:
            r.percentage === undefined
              ? undefined
              : `${r.percentage.toFixed(1)}%`,
          outcome: r.outcome
            ? {
                status: r.outcome.status ?? "Admitted",
                school: r.outcome.school ?? r.outcome.title,
              }
            : undefined,
          subjects: r.subjects?.length ? r.subjects : undefined,
          photo: r.photo,
        })),
    }))
  // A meta line every row repeats ("Class 10" on a one-class board) says
  // nothing per row, so it is dropped when all rows share it.
  const rows = resolvedYears.flatMap((y) => y.items)
  const shared =
    rows.length > 1 && rows.every((row) => row.meta === rows[0].meta)
  return {
    ...rest,
    years: shared
      ? resolvedYears.map((y) => ({
          ...y,
          items: y.items.map((item) => ({ ...item, meta: undefined })),
        }))
      : resolvedYears,
  }
}

// ---------- Validation ----------

export function checkResultsBoards(
  label: string,
  sections: Array<{ type: string; id: string; [key: string]: unknown }>,
  results: Array<unknown>,
  errors: string[],
  onCoursePage = false,
) {
  for (const section of sections) {
    // On a course page the board filters by course and drops itself when
    // nothing matches, so an empty collection is not an error there.
    if (
      section.type === "results-board" &&
      !onCoursePage &&
      results.length === 0
    ) {
      errors.push(`${label}: results-board "${section.id}" has no results`)
    }
  }
}
