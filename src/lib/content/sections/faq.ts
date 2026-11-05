import { z } from "zod"
import { sectionBase, type LoadedContent } from "../shared"
import { FeaturesSchema } from "../site"
import { contactPlaceholders, PLACEHOLDER_PATTERN } from "../placeholders"

export const FaqSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("faq"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "band": a deeper warm surface, full-bleed (same as split).
  tone: z.enum(["default", "band"]).optional(),
  // {address}, {phones}, {hours}, {landmark} and {metro} in text are filled from site data by getPage().
  items: z
    .array(
      z.strictObject({
        question: z.string().min(1),
        answer: z.string().min(1),
        // Dropped from the page when that site feature is off.
        feature: FeaturesSchema.keyof().optional(),
      }),
    )
    .min(1),
})

export type FaqSection = z.infer<typeof FaqSectionSchema>

// ---------- Resolving ----------

export function resolveFaq(
  section: FaqSection,
  content: LoadedContent,
): FaqSection {
  const values = contactPlaceholders(content.site)
  // Names were validated at load, so every match has a value.
  const fill = (text: string) =>
    text.replace(PLACEHOLDER_PATTERN, (_, name: string) => values[name])
  const { features } = content.site
  return {
    ...section,
    ...(section.intro ? { intro: fill(section.intro) } : {}),
    items: section.items
      .filter((item) => !item.feature || features[item.feature])
      .map(({ question, answer }) => ({
        question: fill(question),
        answer: fill(answer),
      })),
  }
}

