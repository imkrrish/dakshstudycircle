import { z } from "zod"
import {
  ButtonSchema,
  ImageSchema,
  LinkSchema,
  SOCIAL_PLATFORMS,
} from "./shared"

// ---------- Site ----------

export const FeaturesSchema = z.strictObject({
  showFaculty: z.boolean(),
  // A hero with no photo shows a "photo to come" card with its shot brief.
  // On in development, off in production: without it the hero drops the media.
  showShotCards: z.boolean(),
  // Fees blocks (and FAQ items marked `feature: "showFees"`) are dropped when off.
  showFees: z.boolean(),
})

const DaySchema = z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])

// 24-hour "HH:MM".
const TimeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)

// One row of opening hours: a single day (`from` only) or a range `from`–`to`.
const OpeningHoursSchema = z.strictObject({
  from: DaySchema,
  to: DaySchema.optional(),
  opens: TimeSchema,
  closes: TimeSchema,
})

// `feature` hides the item when that site feature is off.
const NavItemSchema = z.strictObject({
  label: z.string().min(1),
  href: z.string().min(1),
  feature: FeaturesSchema.keyof().optional(),
})

export const SiteSchema = z.strictObject({
  name: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string(),
  foundedYear: z.number().int(),
  // True for the whole centre; usable in hero facts as {batchSize}, {modes}, {freeDemo}.
  facts: z.strictObject({
    batchSize: z.string().min(1),
    modes: z.string().min(1),
    freeDemo: z.string().min(1),
  }),
  url: z.string().min(1),
  seo: z.strictObject({
    titleTemplate: z.string().min(1),
    description: z.string().min(1),
    ogImage: ImageSchema.optional(),
  }),
  contact: z.strictObject({
    phones: z.array(
      z.strictObject({
        label: z.string().optional(),
        e164: z.string(),
        display: z.string(),
        whatsapp: z.boolean(),
      }),
    ),
    emails: z.array(z.string()),
    // Rows are rendered by formatHours() in src/lib/hours.ts, everywhere hours appear.
    hours: z.array(OpeningHoursSchema).min(1),
    whatsappMessage: z.string(),
    // Directions aids; usable in faq text as {landmark} and {metro}.
    landmark: z.string().optional(),
    nearestMetro: z.string().optional(),
    address: z.strictObject({
      line1: z.string(),
      line2: z.string().optional(),
      locality: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
    }),
    mapUrl: z.string().optional(),
    mapEmbedUrl: z.string().optional(),
  }),
  socials: z.array(
    z.strictObject({ platform: z.enum(SOCIAL_PLATFORMS), url: z.string() }),
  ),
  // The Google listing's rating. The rating badge is hidden when this is missing.
  googleReviews: z
    .strictObject({
      rating: z.number().min(0).max(5),
      count: z.number().int().positive(),
      // "YYYY-MM": when rating and count were read.
      asOf: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
      url: z.string().min(1),
    })
    .optional(),
  footer: z.strictObject({
    exploreExtra: z.array(LinkSchema),
    legal: z.array(LinkSchema),
  }),
  nav: z.array(NavItemSchema),
  navCta: ButtonSchema,
  features: FeaturesSchema,
})

export type Site = z.infer<typeof SiteSchema>
export type NavItem = z.infer<typeof NavItemSchema>

