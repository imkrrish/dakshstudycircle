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

const SOCIAL_PLATFORMS = ["facebook", "x", "instagram", "youtube"] as const

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

const FeaturesSchema = z.strictObject({
  showFaculty: z.boolean(),
  // A hero with no photo shows a "photo to come" card with its shot brief.
  // On in development, off in production: without it the hero drops the media.
  showShotCards: z.boolean(),
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

const LinkSchema = z.strictObject({
  label: z.string().min(1),
  href: z.string().min(1),
})

const SiteSchema = z.strictObject({
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

const ReasonListSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("reason-list"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "band": a deeper warm surface, full-bleed (same as split).
  tone: z.enum(["default", "band"]).optional(),
  items: z
    .array(
      z.strictObject({ title: z.string().min(1), body: z.string().min(1) }),
    )
    .min(3)
    .max(8),
  // Photo beside the list; the caption is shown under it (alt must differ).
  figure: z
    .strictObject({ image: ImageSchema, caption: z.string().min(1) })
    .optional(),
})

const FaqSectionSchema = z.strictObject({
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
      }),
    )
    .min(1),
})

const CtaBandSectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("cta-band"),
  variant: z.enum(["dark", "light"]),
  heading: z.string(),
  body: z.string().optional(),
  actions: z.array(ButtonSchema),
  // Shows the site.contact.hours rows under the buttons.
  showHours: z.boolean().optional(),
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
  // The h2 stays for screen readers but is not shown (a hero right above says
  // it already). Then eyebrow and intro must be left out.
  hideHeading: z.boolean().optional(),
  actions: z.array(ButtonSchema).optional(),
  // "full" also shows each course's summary under its note.
  variant: z.enum(["compact", "full"]).optional(),
}

const CourseGridSectionSchema = z.strictObject({
  ...courseGridBase,
  // Show the course ribbon above the section (titles come from `groups`).
  ribbon: z.boolean().optional(),
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
  // Course titles in section order, when the ribbon is on.
  ribbon: z.array(z.string().min(1)).optional(),
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
              // Only with variant "full".
              summary: z.string().optional(),
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

const videoPlayerBase = {
  ...sectionBase,
  type: z.literal("video-player"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "band": a deeper warm surface, full-bleed (same as split).
  tone: z.enum(["default", "band"]).optional(),
  actions: z.array(ButtonSchema).optional(),
}

// Authoring shape: videos are referenced by id; defaultVideo is the one shown
// first and must be among them. getPage() resolves them.
const VideoPlayerSectionSchema = z.strictObject({
  ...videoPlayerBase,
  videos: z.array(z.string().min(1)).min(1),
  defaultVideo: z.string().min(1),
})

// What the component receives: plain data, URLs already built.
const ResolvedVideoPlayerSectionSchema = z.strictObject({
  ...videoPlayerBase,
  defaultVideo: z.string().min(1),
  items: z
    .array(
      z.strictObject({
        id: z.string(),
        title: z.string(),
        href: z.string(),
        embedSrc: z.string(),
        thumbnail: ImageSchema,
        meta: z.string(),
      }),
    )
    .min(1),
})

const sectionTone = z.enum(["default", "muted", "band"])

const resultsGridBase = {
  ...sectionBase,
  type: z.literal("results-grid"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "muted": the alternate paper tone, full-bleed.
  tone: sectionTone.optional(),
  // "compact": photo, score or outcome, name, meta. "full" adds subject marks.
  variant: z.enum(["compact", "full"]),
  actions: z.array(ButtonSchema).optional(),
}

// Authoring shape: which results to show. getPage() resolves them.
const ResultsGridSectionSchema = z.strictObject({
  ...resultsGridBase,
  show: z.enum(["highlights", "all"]),
})

// What the component receives: plain data, text already built.
const ResolvedResultsGridSectionSchema = z.strictObject({
  ...resultsGridBase,
  items: z
    .array(
      z.strictObject({
        id: z.string(),
        name: z.string(),
        photo: ImageSchema.optional(),
        headline: z.string(),
        meta: z.string(),
        subjects: z.string().optional(),
      }),
    )
    .min(1),
})

const resultsBoardBase = {
  ...sectionBase,
  type: z.literal("results-board"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // Lettered at the head of the board, above the year switcher.
  boardTitle: z.string().min(1),
  tone: sectionTone.optional(),
  actions: z.array(ButtonSchema).optional(),
}

// Authoring shape. The board shows every year present in the results data,
// newest first, at most `perYear` rows each. getPage() resolves them.
const ResultsBoardSectionSchema = z.strictObject({
  ...resultsBoardBase,
  perYear: z.number().int().min(1).max(12).default(6),
})

// What the component receives: one tab per year, text already built.
const ResolvedResultsBoardSectionSchema = z.strictObject({
  ...resultsBoardBase,
  years: z
    .array(
      z.strictObject({
        year: z.number().int(),
        items: z
          .array(
            z.strictObject({
              id: z.string(),
              name: z.string(),
              meta: z.string(),
              course: z.string(),
              // "96.2%" for board results; entrance results carry an outcome.
              score: z.string().optional(),
              outcome: z
                .strictObject({ status: z.string(), school: z.string() })
                .optional(),
              subjects: z
                .array(z.strictObject({ name: z.string(), marks: z.number() }))
                .optional(),
              photo: ImageSchema.optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
})

const testimonialGridBase = {
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
const TestimonialGridSectionSchema = z.strictObject({
  ...testimonialGridBase,
  show: z.enum(["featured", "all"]),
})

const ResolvedTestimonialGridSectionSchema = z.strictObject({
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

const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  SplitSectionSchema,
  CardGridSectionSchema,
  ReasonListSectionSchema,
  CourseGridSectionSchema,
  VideoPlayerSectionSchema,
  ResultsGridSectionSchema,
  ResultsBoardSectionSchema,
  TestimonialGridSectionSchema,
  FaqSectionSchema,
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
  // "Class 1" … "Class 12", or "College".
  classes: z
    .array(
      z.union([
        z.string().regex(/^Class (1[0-2]|[1-9])$/),
        z.literal("College"),
      ]),
    )
    .min(1),
  subjects: z.array(z.string()),
  facultyIds: z.array(z.string()),
  order: z.number(),
  seo: SeoSchema,
  sections: z.array(SectionSchema),
})

// A free YouTube playlist. Rows link out to it; the player embeds it only after a click.
const VideoSchema = z.strictObject({
  id: z.string().min(1),
  title: z.string().min(1),
  youtubePlaylistId: z.string().regex(/^PL[\w-]+$/),
  thumbnail: ImageSchema,
  class: z
    .string()
    .regex(/^Class (1[0-2]|[1-9])$/)
    .optional(),
  subject: z.string().min(1),
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

const TestimonialSchema = z.strictObject({
  id: z.string().min(1),
  name: z.string().min(1),
  // Required for "institute" testimonials; a Google reviewer's role is unknown.
  role: z.enum(["student", "parent"]).optional(),
  // e.g. "Class 12, 2025" or "Parent of a Class 8 student".
  context: z.string().min(1).optional(),
  text: z.string().min(1),
  photo: ImageSchema.optional(),
  // "google" cards carry a small "Google review" label.
  source: z.enum(["institute", "google"]),
  // Shown on home. Sorted by `order`; entries without one go last.
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

const RESULT_CLASSES = ["Class 10", "Class 12", "Entrance"] as const

const ResultSchema = z.strictObject({
  id: z.string().min(1),
  studentName: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  class: z.enum(RESULT_CLASSES),
  // Board or entrance exam: "CBSE", "AISSEE", "RMS CET", "RIMC".
  exam: z.string().min(1),
  // Class 12 only.
  stream: z.enum(["Science", "Commerce", "Humanities"]).optional(),
  percentage: z.number().min(0).max(100).optional(),
  subjects: z
    .array(
      z.strictObject({
        name: z.string().min(1),
        marks: z.number().min(0).max(100),
      }),
    )
    .optional(),
  // Entrance results: title is the school, note the status, e.g.
  // { title: "Sainik School", note: "Admitted · AISSEE" }.
  // The honour board sets it as "{status} · {school}": `school` is the full
  // name (falls back to `title`), `status` defaults to "Admitted".
  outcome: z
    .strictObject({
      title: z.string().min(1),
      note: z.string().min(1),
      school: z.string().min(1).optional(),
      status: z.enum(["Admitted", "Selected"]).optional(),
    })
    .optional(),
  // The Daksh course the student took, e.g. "Classes 11–12 tuition".
  course: z.string().min(1),
  // Without a photo the card shows the student's initials.
  photo: ImageSchema.optional(),
  // Shown on the home page.
  highlight: z.boolean().optional(),
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
type FaqSection = z.infer<typeof FaqSectionSchema>
type HeroSection = z.infer<typeof HeroSectionSchema>
type VideoPlayerSection = z.infer<typeof VideoPlayerSectionSchema>
type ResolvedVideoPlayerSection = z.infer<
  typeof ResolvedVideoPlayerSectionSchema
>
type ResultsGridSection = z.infer<typeof ResultsGridSectionSchema>
type ResolvedResultsGridSection = z.infer<
  typeof ResolvedResultsGridSectionSchema
>
type ResultsBoardSection = z.infer<typeof ResultsBoardSectionSchema>
type ResolvedResultsBoardSection = z.infer<
  typeof ResolvedResultsBoardSectionSchema
>
type TestimonialGridSection = z.infer<typeof TestimonialGridSectionSchema>
type ResolvedTestimonialGridSection = z.infer<
  typeof ResolvedTestimonialGridSectionSchema
>
// Sections as components receive them (references resolved).
type ResolvedSection =
  | Exclude<
      Section,
      {
        type:
          | "course-grid"
          | "video-player"
          | "results-grid"
          | "results-board"
          | "testimonial-grid"
      }
    >
  | ResolvedCourseGridSection
  | ResolvedVideoPlayerSection
  | ResolvedResultsGridSection
  | ResolvedResultsBoardSection
  | ResolvedTestimonialGridSection
type SectionType = ResolvedSection["type"]
type SectionOf<T extends SectionType> = Extract<ResolvedSection, { type: T }>
type Page = z.infer<typeof PageSchema>
type ResolvedPage = Omit<Page, "sections"> & { sections: ResolvedSection[] }
type Course = z.infer<typeof CourseSchema>
type ResolvedCourse = Omit<Course, "sections"> & {
  sections: ResolvedSection[]
}
type Video = z.infer<typeof VideoSchema>
type Faculty = z.infer<typeof FacultySchema>
type Testimonial = z.infer<typeof TestimonialSchema>
type Result = z.infer<typeof ResultSchema>

export {
  ImageSchema,
  IconSchema,
  ActionSchema,
  ButtonSchema,
  SeoSchema,
  SiteSchema,
  SectionSchema,
  ResolvedCourseGridSectionSchema,
  ResolvedVideoPlayerSectionSchema,
  ResolvedResultsGridSectionSchema,
  ResolvedResultsBoardSectionSchema,
  ResolvedTestimonialGridSectionSchema,
  PageSchema,
  CourseSchema,
  VideoSchema,
  FacultySchema,
  TestimonialSchema,
  ResultSchema,
}
export type {
  Testimonial,
  Result,
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
  FaqSection,
  HeroSection,
  VideoPlayerSection,
  ResolvedVideoPlayerSection,
  ResultsGridSection,
  ResolvedResultsGridSection,
  ResultsBoardSection,
  ResolvedResultsBoardSection,
  TestimonialGridSection,
  ResolvedTestimonialGridSection,
  ResolvedSection,
  ResolvedPage,
  ResolvedCourse,
  SectionType,
  SectionOf,
  Page,
  Course,
  Video,
  Faculty,
}
