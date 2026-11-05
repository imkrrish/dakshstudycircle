import { z } from "zod"
import { ButtonSchema, ImageSchema, sectionBase, content } from "../shared"
import { heroPlaceholders, PLACEHOLDER_PATTERN } from "../placeholders"

type CourseLike = { title: string; [k: string]: unknown }

export const HeroSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("hero"),
  size: z.enum(["large", "compact"]),
  eyebrow: z.string().optional(),
  // One entry per line at every width (1-2 lines); a line may wrap inside itself.
  heading: z.array(z.string().min(1)).min(1).max(2),
  subheading: z.string().optional(),
  proofLine: z.string().optional(),
  actions: z.array(ButtonSchema).optional(),
  // Compact hero only: the trail above the eyebrow. Every item but the last
  // links somewhere; the last is the current page and has no href.
  breadcrumbs: z
    .array(
      z.strictObject({ label: z.string().min(1), href: z.string().optional() }),
    )
    .min(2)
    .optional(),
  // Compact hero only. `shot` is the brief for the photo this slot needs; the
  // hero shows `image` when there is one, otherwise a shot card (see
  // features.showShotCards).
  media: z
    .strictObject({ image: ImageSchema.optional(), shot: z.string().min(1) })
    .optional(),
  // Compact hero only: 2-4 label/value rows. Values may use {hours},
  // {batchSize}, {modes} and {freeDemo}, filled by getPage().
  facts: z
    .strictObject({
      items: z
        .array(
          z.strictObject({ label: z.string().min(1), value: z.string().min(1) }),
        )
        .min(2)
        .max(4),
    })
    .optional(),
})

export type HeroSection = z.infer<typeof HeroSectionSchema>

// Fills the hero's fact placeholders. Without a photo the media is dropped
// unless shot cards are on, so production never shows "photo to come". A course
// hero without its own trail gets Home › Courses › the course.
export function resolveHero(section: HeroSection, course?: CourseLike): HeroSection {
  const { site } = content
  const values = heroPlaceholders(site)
  const { media, facts, ...rest } = section
  const showMedia =
    media && (media.image || site.features.showShotCards) ? media : undefined
  const breadcrumbs =
    section.breadcrumbs ??
    (course && section.size === "compact"
      ? [
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.title },
        ]
      : undefined)
  return {
    ...rest,
    ...(breadcrumbs ? { breadcrumbs } : {}),
    ...(showMedia ? { media: showMedia } : {}),
    ...(facts
      ? {
          facts: {
            items: facts.items.map(({ label, value }) => ({
              label,
              value: value.replace(
                PLACEHOLDER_PATTERN,
                (_, name: string) => values[name],
              ),
            })),
          },
        }
      : {}),
  }
}
