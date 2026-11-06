import { z } from "zod"
import { sectionBase, type LoadedContent } from "../shared"

type CourseLike = {
  fees?: {
    rows: Array<{
      label: string
      amount: number | { from: number; to: number }
      per: "subject" | "course"
      period: "month" | "quarter" | "year" | "session" | "course"
      note?: string
    }>
    note?: string
  }
  [k: string]: unknown
}

// Course pages only: shows the course's `fees` record (see CourseSchema).
const feesBase = {
  ...sectionBase,
  type: z.literal("fees"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
}

export const FeesSectionSchema = z.strictObject(feesBase)

// What the component receives: amounts already formatted, e.g. "₹18,000".
const ResolvedFeesSectionSchema = z.strictObject({
  ...feesBase,
  rows: z
    .array(
      z.strictObject({
        label: z.string().min(1),
        amount: z.string().min(1),
        // "per subject · per year"
        basis: z.string().min(1),
        note: z.string().optional(),
      }),
    )
    .min(1),
  note: z.string().optional(),
})

export type FeesSection = z.infer<typeof FeesSectionSchema>
export type ResolvedFeesSection = z.infer<typeof ResolvedFeesSectionSchema>

// ---------- Resolving ----------

const rupees = new Intl.NumberFormat("en-IN")

// How often the fee is paid, as it reads after "per subject, ".
const FEE_PERIODS = {
  month: "per month",
  quarter: "per quarter",
  year: "per year",
  session: "for the session up to the final exams",
  course: "for the whole course",
} as const

// Null when fees are switched off, so no amount reaches the page.
export function resolveFees(
  section: FeesSection,
  content: LoadedContent,
  course: CourseLike,
): ResolvedFeesSection | null {
  if (!content.site.features.showFees || !course.fees) return null
  const { rows, note } = course.fees
  return {
    ...section,
    rows: rows.map(({ label, amount, per, period, note: rowNote }) => ({
      label,
      amount:
        typeof amount === "number"
          ? `₹${rupees.format(amount)}`
          : `₹${rupees.format(amount.from)}–₹${rupees.format(amount.to)}`,
      basis: [
        per === "subject" ? "per subject" : null,
        // "up to the final exams" is only confirmed for per-subject fees.
        period === "session" && per === "course"
          ? "for the session"
          : FEE_PERIODS[period],
      ]
        .filter(Boolean)
        .join(", "),
      ...(rowNote ? { note: rowNote } : {}),
    })),
    ...(note ? { note } : {}),
  }
}
