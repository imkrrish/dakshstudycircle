import { z } from "zod"
import { iconNames } from "@/lib/icons"

// ---------- Shared ----------
export const ImageSchema = z.strictObject({
  src: z.string().min(1),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

export const IconSchema = z.enum(iconNames)

export const SOCIAL_PLATFORMS = ["facebook", "x", "instagram", "youtube"] as const

// Add new actions (e.g. "book-demo") here only; sections never change.
const ActionSchema = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("link"), href: z.string().min(1) }),
  z.strictObject({ type: z.literal("contact-dialog") }),
  // Opens site.contact.mapUrl in a new tab.
  z.strictObject({ type: z.literal("directions") }),
  // Opens the site.socials url for that platform in a new tab.
  z.strictObject({
    type: z.literal("social"),
    platform: z.enum(SOCIAL_PLATFORMS),
  }),
])

export const ButtonSchema = z.strictObject({
  label: z.string().min(1),
  // "quiet" is a text-style button (no fill, not red) for secondary actions.
  variant: z.enum(["primary", "secondary", "outline", "quiet"]).optional(),
  action: ActionSchema,
})

export const LinkSchema = z.strictObject({
  label: z.string().min(1),
  href: z.string().min(1),
})

// A section's background. In data it is a preference: `assignTones()`
// (tones.ts) resolves clashes so neighbouring sections never share one.
// "ink" (the dark CTA band) is never chosen in data.
const sectionTone = z.enum(["paper", "muted", "band"])

export const sectionBase = { id: z.string().min(1), tone: sectionTone.optional() }

// `sample: true` marks an example record: it shows in development and the
// resolver removes it in production (see content.ts). Collection items that can
// be examples carry it.
export const sampleField = { sample: z.boolean().optional() }

export const SeoSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
  ogImage: ImageSchema.optional(),
  noIndex: z.boolean().optional(),
  // true: `title` is the whole <title>, without the site title template.
  absoluteTitle: z.boolean().optional(),
})

export type Image = z.infer<typeof ImageSchema>
type Icon = z.infer<typeof IconSchema>
type Action = z.infer<typeof ActionSchema>
export type Button = z.infer<typeof ButtonSchema>
type Link = z.infer<typeof LinkSchema>
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]
export type Seo = z.infer<typeof SeoSchema>

// ---------- Parse helper ----------
export function parseOrCollect<T>(
  schema: z.ZodType<T>,
  data: unknown,
  label: string,
  errors: string[],
): T | undefined {
  const result = schema.safeParse(data)
  if (result.success) return result.data
  for (const issue of result.error.issues) {
    const path = issue.path.length ? ` at ${issue.path.join(".")}` : ""
    errors.push(`${label}:${path} ${issue.message}`)
  }
  return undefined
}

// ---------- Sample filter ----------
// Sample items (`sample: true`) are examples: kept in development, removed
// everywhere else. next.config.ts prints a warning for any left in the data.
const showSamples = process.env.NODE_ENV === "development"

export const real = <T extends { sample?: boolean }>(items: T[]) =>
  showSamples ? items : items.filter((item) => !item.sample)

// ---------- Content holder ----------
export interface LoadedContent {
  site: {
    name: string
    shortName: string
    tagline: string
    foundedYear: number
    facts: { batchSize: string; modes: string; freeDemo: string }
    url: string
    seo: { titleTemplate: string; description: string; ogImage?: Image }
    contact: {
      phones: Array<{ label?: string; e164: string; display: string; whatsapp: boolean }>
      emails: string[]
      hours: Array<{ from: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"; to?: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"; opens: string; closes: string }>
      whatsappMessage: string
      landmark?: string
      nearestMetro?: string
      address: { line1: string; line2?: string; locality: string; city: string; state: string; postalCode: string }
      mapUrl?: string
      mapEmbedUrl?: string
    }
    socials: Array<{ platform: SocialPlatform; url: string }>
    googleReviews?: { rating: number; count: number; asOf: string; url: string }
    footer: { exploreExtra: Link[]; legal: Link[] }
    nav: Array<{ label: string; href: string; feature?: "showFaculty" | "showShotCards" | "showFees" }>
    navCta: Button
    features: { showFaculty: boolean; showShotCards: boolean; showFees: boolean }
  }
  courses: Array<{
    slug: string
    title: string
    summary: string
    cardNote?: string
    classes: string[]
    subjects: string[]
    facultyIds: string[]
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
    order: number
    sections: Array<{ type: string; id: string; [key: string]: unknown }>
  }>
  faculty: Array<{
    id: string
    name: string
    role: string
    subjects: string[]
    classes: string[]
    qualification?: string
    experience?: string
    bio?: string
    photo?: Image
    photoShot?: string
    isDirector: boolean
    order: number
    sample?: boolean
  }>
  videos: Array<{
    id: string
    title: string
    youtubePlaylistId: string
    thumbnail: Image
    class?: string
    subject: string
  }>
  testimonials: Array<{
    id: string
    name: string
    role?: "student" | "parent"
    context?: string
    text: string
    photo?: Image
    source: "institute" | "google"
    featured?: boolean
    order?: number
  }>
  results: Array<{
    id: string
    studentName: string
    year: number
    class: "Class 10" | "Class 12" | "Entrance"
    exam: string
    stream?: "Science" | "Commerce" | "Humanities"
    percentage?: number
    subjects?: Array<{ name: string; marks: number }>
    outcome?: { title: string; note: string; school?: string; status?: "Admitted" | "Selected" }
    course: string
    photo?: Image
    highlight?: boolean
    sample?: boolean
  }>
  pages: Map<string, { slug: string; seo: Seo; sections: Array<{ type: string; id: string; [key: string]: unknown }> }>
}
