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
  // Opens site.contact.mapUrl in a new tab.
  z.strictObject({ type: z.literal("directions") }),
])

const ButtonSchema = z.strictObject({
  label: z.string().min(1),
  // "quiet" is a text-style button (no fill, not red) for secondary actions.
  variant: z.enum(["primary", "secondary", "outline", "quiet"]).optional(),
  action: ActionSchema,
})

const SeoSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
  ogImage: ImageSchema.optional(),
  noIndex: z.boolean().optional(),
  // true: `title` is the whole <title>, without the site title template.
  absoluteTitle: z.boolean().optional(),
})

// ---------- Site ----------

const FeaturesSchema = z.strictObject({ showFaculty: z.boolean() })

// `feature` hides the item when that site feature is off.
const NavItemSchema = z.strictObject({
  label: z.string().min(1),
  href: z.string().min(1),
  feature: FeaturesSchema.keyof().optional(),
})

const LinkSchema = z.strictObject({
  label: z.string().min(1),
  href: z.string().min(1),
})

const SOCIAL_PLATFORMS = ["facebook", "x", "instagram", "youtube"] as const

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
        label: z.string().optional(),
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
  socials: z.array(
    z.strictObject({ platform: z.enum(SOCIAL_PLATFORMS), url: z.string() }),
  ),
  footer: z.strictObject({
    exploreExtra: z.array(LinkSchema),
    legal: z.array(LinkSchema),
  }),
  nav: z.array(NavItemSchema),
  navCta: ButtonSchema,
  features: FeaturesSchema,
})

// ---------- Sections ----------

const sectionBase = { id: z.string().min(1) }

const HeroSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("hero"),
  size: z.enum(["large", "compact"]),
  eyebrow: z.string().optional(),
  // One entry per line at every width (1-2 lines); a line may wrap inside itself.
  heading: z.array(z.string().min(1)).min(1).max(2),
  subheading: z.string().optional(),
  proofLine: z.string().optional(),
  actions: z.array(ButtonSchema).optional(),
})

const SplitSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("split"),
  eyebrow: z.string().optional(),
  heading: z.string(),
  body: z.array(z.string()),
  // Shown under the message: "Name · role" (text before the first " · " is the name).
  attribution: z.string().optional(),
  image: ImageSchema,
  imagePosition: z.enum(["left", "right"]),
  // "band": a deeper warm surface, full-bleed, to separate this section from its neighbours.
  tone: z.enum(["default", "band"]).optional(),
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

// Authoring shape: items refer to courses by slug. getPage() resolves them.
const CourseGridItemSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("course"), course: z.string().min(1) }),
  // One card for several related courses (e.g. the Class 11–12 streams).
  z.strictObject({
    kind: z.literal("stream-group"),
    title: z.string().min(1),
    note: z.string().optional(),
    courses: z.array(z.string().min(1)).min(2),
  }),
])

const courseGridBase = {
  ...sectionBase,
  type: z.literal("course-grid"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  actions: z.array(ButtonSchema).optional(),
}

const CourseGridSectionSchema = z.strictObject({
  ...courseGridBase,
  groups: z
    .array(
      z.strictObject({
        label: z.string().min(1),
        items: z.array(CourseGridItemSchema).min(1),
      }),
    )
    .min(1),
})

// What the component receives: plain data, hrefs already built.
const ResolvedCourseGridSectionSchema = z.strictObject({
  ...courseGridBase,
  groups: z
    .array(
      z.strictObject({
        label: z.string().min(1),
        items: z.array(
          z.discriminatedUnion("kind", [
            z.strictObject({
              kind: z.literal("course"),
              title: z.string(),
              note: z.string(),
              href: z.string(),
            }),
            z.strictObject({
              kind: z.literal("stream-group"),
              title: z.string(),
              note: z.string().optional(),
              links: z.array(
                z.strictObject({
                  title: z.string(),
                  label: z.string().min(1),
                  href: z.string(),
                }),
              ),
            }),
          ]),
        ),
      }),
    )
    .min(1),
})

const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  SplitSectionSchema,
  CardGridSectionSchema,
  CourseGridSectionSchema,
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
  // Short line for course cards; falls back to the first subject.
  cardNote: z.string().max(60).optional(),
  // "Class 1" … "Class 12", or "All ages".
  classes: z
    .array(
      z.union([
        z.string().regex(/^Class (1[0-2]|[1-9])$/),
        z.literal("All ages"),
      ]),
    )
    .min(1),
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
type Link = z.infer<typeof LinkSchema>
type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]
type Section = z.infer<typeof SectionSchema>
type CourseGridSection = z.infer<typeof CourseGridSectionSchema>
type ResolvedCourseGridSection = z.infer<typeof ResolvedCourseGridSectionSchema>
// Sections as components receive them (references resolved).
type ResolvedSection =
  Exclude<Section, { type: "course-grid" }> | ResolvedCourseGridSection
type SectionType = ResolvedSection["type"]
type SectionOf<T extends SectionType> = Extract<ResolvedSection, { type: T }>
type Page = z.infer<typeof PageSchema>
type ResolvedPage = Omit<Page, "sections"> & { sections: ResolvedSection[] }
type Course = z.infer<typeof CourseSchema>
type ResolvedCourse = Omit<Course, "sections"> & {
  sections: ResolvedSection[]
}
type Faculty = z.infer<typeof FacultySchema>

export {
  ImageSchema,
  IconSchema,
  ActionSchema,
  ButtonSchema,
  SeoSchema,
  SiteSchema,
  SectionSchema,
  ResolvedCourseGridSectionSchema,
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
  Link,
  SocialPlatform,
  Section,
  CourseGridSection,
  ResolvedCourseGridSection,
  ResolvedSection,
  ResolvedPage,
  ResolvedCourse,
  SectionType,
  SectionOf,
  Page,
  Course,
  Faculty,
}
