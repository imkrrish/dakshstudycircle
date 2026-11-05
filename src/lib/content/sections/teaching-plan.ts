import { z } from "zod"
import { IconSchema, sectionBase, type LoadedContent } from "../shared"
import { heroPlaceholders, PLACEHOLDER_PATTERN } from "../placeholders"

// Course pages only: how the course runs. `steps` are the stations of the
// year, in order; each has an `icon` (a registry name, shown in its disc), a
// light `lead` and a bold key phrase `title` that read as one sentence, and at
// most one is the `destination` (marked by tone).
// `details` (optional) are label / value rows for a printed notice (values may
// use {batchSize}, {modes} and {freeDemo}, filled by getCourse()).
export const TeachingPlanSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("teaching-plan"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  steps: z
    .array(
      z.strictObject({
        icon: IconSchema,
        lead: z.string().min(1),
        title: z.string().min(1),
        destination: z.boolean().optional(),
      }),
    )
    .min(2)
    .max(4)
    .refine((steps) => steps.filter((s) => s.destination).length <= 1, {
      message: "at most one step can be the destination",
    }),
  details: z
    .array(
      z.strictObject({ label: z.string().min(1), value: z.string().min(1) }),
    )
    .min(2)
    .max(6)
    .optional(),
})

export type TeachingPlanSection = z.infer<typeof TeachingPlanSectionSchema>

// ---------- Resolving ----------

// Fills {batchSize}, {modes} and {freeDemo} in the detail values.
export function resolveTeachingPlan(
  section: TeachingPlanSection,
  content: LoadedContent,
): TeachingPlanSection {
  const values = heroPlaceholders(content.site)
  return {
    ...section,
    details: section.details?.map(({ label, value }) => ({
      label,
      value: value.replace(
        PLACEHOLDER_PATTERN,
        (_, name: string) => values[name],
      ),
    })),
  }
}
