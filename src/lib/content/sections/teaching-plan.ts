import { z } from "zod"
import { sectionBase, content } from "../shared"
import { heroPlaceholders, PLACEHOLDER_PATTERN } from "../placeholders"

// Course pages only: how the course runs. `steps` are the plan through the
// year; `details` are label / value rows (values may use {batchSize}, {modes}
// and {freeDemo}, filled by getCourse()).
export const TeachingPlanSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("teaching-plan"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  steps: z
    .array(
      z.strictObject({ title: z.string().min(1), body: z.string().min(1) }),
    )
    .min(2)
    .max(4),
  details: z
    .array(
      z.strictObject({ label: z.string().min(1), value: z.string().min(1) }),
    )
    .min(2)
    .max(6),
})

export type TeachingPlanSection = z.infer<typeof TeachingPlanSectionSchema>

// ---------- Resolving ----------

// Fills {batchSize}, {modes} and {freeDemo} in the detail values.
export function resolveTeachingPlan(section: TeachingPlanSection): TeachingPlanSection {
  const values = heroPlaceholders(content.site)
  return {
    ...section,
    details: section.details.map(({ label, value }) => ({
      label,
      value: value.replace(
        PLACEHOLDER_PATTERN,
        (_, name: string) => values[name],
      ),
    })),
  }
}

