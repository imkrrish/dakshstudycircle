import { z } from "zod"
import { ImageSchema, sectionBase, sectionTone, content } from "../shared"

export const testimonialGridBase = {
  ...sectionBase,
  type: z.literal("testimonial-grid"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  tone: sectionTone.optional(),
  // "carousel": a swipeable row with arrows. "grid": all cards, no scrolling.
  layout: z.enum(["grid", "carousel"]),
}

// Authoring shape: which testimonials to show. getPage() resolves them.
export const TestimonialGridSectionSchema = z.strictObject({
  ...testimonialGridBase,
  show: z.enum(["featured", "all"]),
})

export const ResolvedTestimonialGridSectionSchema = z.strictObject({
  ...testimonialGridBase,
  // Google rating badge; absent when site.googleReviews is not set.
  rating: z
    .strictObject({
      rating: z.number(),
      count: z.number().int(),
      url: z.string(),
    })
    .optional(),
  items: z
    .array(
      z.strictObject({
        id: z.string(),
        name: z.string(),
        source: z.enum(["institute", "google"]),
        // Muted line under the name: context, or "Student" / "Parent".
        byline: z.string().optional(),
        text: z.string(),
        photo: ImageSchema.optional(),
      }),
    )
    .min(1),
})

export type TestimonialGridSection = z.infer<typeof TestimonialGridSectionSchema>
export type ResolvedTestimonialGridSection = z.infer<
  typeof ResolvedTestimonialGridSectionSchema
>

// ---------- Resolving ----------

// The home carousel never shows more than this many cards.
const MAX_CAROUSEL_TESTIMONIALS = 12

export function resolveTestimonialGrid(
  section: TestimonialGridSection,
): ResolvedTestimonialGridSection {
  const { show, ...rest } = section
  const chosen = content.testimonials
    .filter((t) => show === "all" || t.featured)
    // Stable sort: data order breaks ties; no `order` goes last.
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
    .slice(
      0,
      section.layout === "carousel" ? MAX_CAROUSEL_TESTIMONIALS : undefined,
    )
  const google = content.site.googleReviews
  return {
    ...rest,
    rating: google
      ? { rating: google.rating, count: google.count, url: google.url }
      : undefined,
    items: chosen.map((t) => ({
      id: t.id,
      name: t.name,
      source: t.source,
      byline:
        t.context ??
        (t.role === "parent" ? "Parent" : t.role ? "Student" : undefined),
      text: t.text,
      photo: t.photo,
    })),
  }
}

// ---------- Validation ----------

// A testimonial-grid that selects nothing would render an empty section.
export function checkTestimonialGrids(
  label: string,
  sections: Array<{ type: string; id: string; show?: string; [key: string]: unknown }>,
  testimonials: Array<{ featured?: boolean; [key: string]: unknown }>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "testimonial-grid") continue
    if (section.show === "featured" && !testimonials.some((t) => t.featured)) {
      errors.push(
        `${label}: testimonial-grid "${section.id}" shows featured but no testimonial has featured: true`,
      )
    }
    if (section.show === "all" && testimonials.length === 0) {
      errors.push(
        `${label}: testimonial-grid "${section.id}" has no testimonials`,
      )
    }
  }
}
