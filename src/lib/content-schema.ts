import { z } from "zod"
import { iconNames } from "@/lib/icons"

// ---------- Shared ----------

const ImageSchema = z.strictObject({
  src: z.string().min(1),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const IconSchema = z.enum(iconNames)

// Add new actions (e.g. "book-demo") here only; sections never change.
const ActionSchema = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("link"), href: z.string().min(1) }),
  z.strictObject({ type: z.literal("contact-dialog") }),
])

const ButtonSchema = z.strictObject({
  label: z.string().min(1),
  variant: z.enum(["primary", "secondary", "outline"]).optional(),
  action: ActionSchema,
})

const SeoSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
  ogImage: ImageSchema.optional(),
  noIndex: z.boolean().optional(),
})

// ---------- Site ----------

const FeaturesSchema = z.strictObject({ showFaculty: z.boolean() })

// `feature` hides the item when that site feature is off.
const NavItemSchema = z.strictObject({
  label: z.string().min(1),
  href: z.string().min(1),
  feature: FeaturesSchema.keyof().optional(),
})

const SiteSchema = z.strictObject({
  name: z.string().min(1),
  tagline: z.string(),
  foundedYear: z.number().int(),
  url: z.string().min(1),
  seo: z.strictObject({
    titleTemplate: z.string().min(1),
    description: z.string().min(1),
    ogImage: ImageSchema.optional(),
  }),
  contact: z.strictObject({
    phones: z.array(
      z.strictObject({
        label: z.string(),
        e164: z.string(),
        display: z.string(),
        whatsapp: z.boolean(),
      }),
    ),
    emails: z.array(z.string()),
    hours: z.string(),
    whatsappMessage: z.string(),
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
  socials: z.array(z.strictObject({ platform: z.string(), url: z.string() })),
  nav: z.array(NavItemSchema),
  navCta: ButtonSchema,
  features: FeaturesSchema,
})

// ---------- Sections ----------

const sectionBase = { id: z.string().min(1) }

const HeroSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("hero"),
  heading: z.string(),
  subheading: z.string().optional(),
  actions: z.array(ButtonSchema).optional(),
  image: ImageSchema.optional(),
})

const SplitSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("split"),
  eyebrow: z.string().optional(),
  heading: z.string(),
  body: z.array(z.string()),
  image: ImageSchema,
  imagePosition: z.enum(["left", "right"]),
  actions: z.array(ButtonSchema).optional(),
})

const CardGridSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("card-grid"),
  eyebrow: z.string().optional(),
  heading: z.string(),
  intro: z.string().optional(),
  items: z.array(
    z.strictObject({
      title: z.string(),
      body: z.string(),
      icon: IconSchema.optional(),
      href: z.string().optional(),
    }),
  ),
})

const CtaBandSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("cta-band"),
  variant: z.enum(["dark", "light"]),
  heading: z.string(),
  body: z.string().optional(),
  actions: z.array(ButtonSchema),
})

const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  SplitSectionSchema,
  CardGridSectionSchema,
  CtaBandSectionSchema,
])

// ---------- Pages & collections ----------

const PageSchema = z.strictObject({
  slug: z.string().min(1),
  seo: SeoSchema,
  sections: z.array(SectionSchema),
})

const CourseSchema = z.strictObject({
  slug: z.string().min(1),
  title: z.string(),
  summary: z.string(),
  classes: z.array(z.string()),
  subjects: z.array(z.string()),
  facultyIds: z.array(z.string()),
  order: z.number(),
  seo: SeoSchema,
  sections: z.array(SectionSchema),
})

const FacultySchema = z.strictObject({
  id: z.string().min(1),
  name: z.string(),
  role: z.string(),
  subjects: z.array(z.string()),
  classes: z.array(z.string()),
  bio: z.string().optional(),
  photo: ImageSchema.optional(),
  isDirector: z.boolean(),
  order: z.number(),
})

type Image = z.infer<typeof ImageSchema>
type Icon = z.infer<typeof IconSchema>
type Action = z.infer<typeof ActionSchema>
type Button = z.infer<typeof ButtonSchema>
type Seo = z.infer<typeof SeoSchema>
type Site = z.infer<typeof SiteSchema>
type NavItem = z.infer<typeof NavItemSchema>
type Section = z.infer<typeof SectionSchema>
type SectionType = Section["type"]
type SectionOf<T extends SectionType> = Extract<Section, { type: T }>
type Page = z.infer<typeof PageSchema>
type Course = z.infer<typeof CourseSchema>
type Faculty = z.infer<typeof FacultySchema>

export {
  ImageSchema,
  IconSchema,
  ActionSchema,
  ButtonSchema,
  SeoSchema,
  SiteSchema,
  SectionSchema,
  PageSchema,
  CourseSchema,
  FacultySchema,
}
export type {
  Image,
  Icon,
  Action,
  Button,
  Seo,
  Site,
  NavItem,
  Section,
  SectionType,
  SectionOf,
  Page,
  Course,
  Faculty,
}
