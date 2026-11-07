import { z } from "zod"
import { sectionBase, type LoadedContent } from "../shared"
import { ResultPhotoSchema } from "../collections/results"

const boardResultsBase = {
  ...sectionBase,
  type: z.literal("board-results"),
  heading: z.string().min(1),
  // The one line shown when there are no board results (production, until
  // real records arrive).
  empty: z.string().min(1),
}

// Authoring shape: every board result in the collection is shown.
export const BoardResultsSectionSchema = z.strictObject(boardResultsBase)

const ItemSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  // Class 12 only.
  stream: z.string().optional(),
  // Always one decimal: "93.0%".
  score: z.string(),
  photo: ResultPhotoSchema.optional(),
  // True when the record has subject marks (so it opens the result card).
  hasSheet: z.boolean(),
})

const YearSchema = z.strictObject({
  year: z.number().int(),
  class10: z.array(ItemSchema),
  class12: z.array(ItemSchema),
})

// The popup's data, only for records with subject marks.
const SheetSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  // "Class 12" or "Class 12 · Science".
  classParts: z.array(z.string()),
  year: z.number().int(),
  score: z.string(),
  subjects: z.array(z.strictObject({ name: z.string(), marks: z.number() })),
  photo: ResultPhotoSchema.optional(),
})

// What the component receives: plain data, text already built.
const ResolvedBoardResultsSectionSchema = z.strictObject({
  ...boardResultsBase,
  latest: YearSchema.optional(),
  earlier: z.array(YearSchema),
  sheets: z.array(SheetSchema),
  // Lettered at the head of the result card.
  issuer: z.string(),
})

export type BoardResultsSection = z.infer<typeof BoardResultsSectionSchema>
export type ResolvedBoardResultsSection = z.infer<
  typeof ResolvedBoardResultsSectionSchema
>
export type BoardResultItem = z.infer<typeof ItemSchema>
export type BoardResultSheet = z.infer<typeof SheetSchema>

// ---------- Resolving ----------

// Board results only (Class 10 and 12 with a percentage), highest percentage
// first within a class; the sort is stable, so data order breaks ties. Years
// newest first: the newest is `latest`, the rest `earlier`.
export function resolveBoardResults(
  section: BoardResultsSection,
  content: LoadedContent,
): ResolvedBoardResultsSection {
  const board = content.results.filter(
    (r) => r.class !== "Entrance" && r.percentage !== undefined,
  )
  const years = [...new Set<number>(board.map((r) => r.year))].sort(
    (a, b) => b - a,
  )
  const sheets: BoardResultSheet[] = []

  const toItem = (r: (typeof board)[number]): BoardResultItem => {
    const score = `${(r.percentage ?? 0).toFixed(1)}%`
    const hasSheet = Boolean(r.subjects?.length)
    if (hasSheet && r.subjects) {
      sheets.push({
        id: r.id,
        name: r.studentName,
        classParts: r.stream ? [r.class, r.stream] : [r.class],
        year: r.year,
        score,
        subjects: r.subjects,
        photo: r.photo,
      })
    }
    return {
      id: r.id,
      name: r.studentName,
      stream: r.class === "Class 12" ? r.stream : undefined,
      score,
      photo: r.photo,
      hasSheet,
    }
  }

  const byScore = (a: (typeof board)[number], b: (typeof board)[number]) =>
    (b.percentage ?? 0) - (a.percentage ?? 0)

  const resolveYear = (year: number) => {
    const inYear = board.filter((r) => r.year === year).sort(byScore)
    return {
      year,
      class10: inYear.filter((r) => r.class === "Class 10").map(toItem),
      class12: inYear.filter((r) => r.class === "Class 12").map(toItem),
    }
  }

  const [latestYear, ...earlierYears] = years
  const latest = latestYear === undefined ? undefined : resolveYear(latestYear)
  const earlier = earlierYears.map(resolveYear)
  return {
    ...section,
    latest,
    earlier,
    sheets,
    issuer: content.site.name,
  }
}
