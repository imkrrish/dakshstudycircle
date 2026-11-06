import { z } from "zod"
import { SeoSchema } from "../shared"
import { SectionSchema, type ResolvedSection } from "../sections"
import type { Video } from "./videos"

// A fee in rupees: one amount, or a range (e.g. 25,000 to 30,000).
const AmountSchema = z.union([
  z.number().int().positive(),
  z
    .strictObject({
      from: z.number().int().positive(),
      to: z.number().int().positive(),
    })
    .refine((range) => range.from < range.to, "from must be below to"),
])

// What a fee covers. `period` is required on purpose: a fee never renders
// without saying how often it is paid ("course" = one fee for the whole course).
const FeesSchema = z.strictObject({
  rows: z
    .array(
      z.strictObject({
        label: z.string().min(1),
        amount: AmountSchema,
        per: z.enum(["subject", "course"]),
        period: z.enum(["month", "quarter", "year", "session", "course"]),
        // Shown under the row, e.g. what the amount depends on.
        note: z.string().optional(),
      }),
    )
    .min(1),
  note: z.string().optional(),
})

export const CourseSchema = z.strictObject({
  slug: z.string().min(1),
  title: z.string(),
  summary: z.string(),
  // Short line for course cards; falls back to the first subject.
  cardNote: z.string().max(60).optional(),
  // "Class 1" … "Class 12", or "College". Empty for a course by age, not class
  // (Spoken English).
  classes: z.array(
    z.union([z.string().regex(/^Class (1[0-2]|[1-9])$/), z.literal("College")]),
  ),
  subjects: z.array(z.string()),
  facultyIds: z.array(z.string()),
  // Shown by the page's `fees` section, and only when site.features.showFees is on.
  fees: FeesSchema.optional(),
  order: z.number(),
  seo: SeoSchema,
  sections: z.array(SectionSchema),
})

type Fees = z.infer<typeof FeesSchema>
export type Course = z.infer<typeof CourseSchema>
export type ResolvedCourse = Omit<Course, "sections"> & {
  sections: ResolvedSection[]
}

// ---------- Validation ----------

// Course-only sections: a page has no course record to read. A fees section
// needs the course's fees; each video must belong to one of the course's classes.
export function checkCourseSections(
  label: string,
  course: Course,
  videos: Video[],
  errors: string[],
) {
  for (const section of course.sections) {
    if (section.type === "fees" && !course.fees) {
      errors.push(`${label}: fees "${section.id}" but the course has no fees`)
    }
    if (section.type === "subjects") {
      const summarised = new Set<string>()
      for (const { subject } of section.summaries ?? []) {
        if (!course.subjects.includes(subject)) {
          errors.push(
            `${label}: subjects "${section.id}": summary for "${subject}", which is not in the course's subjects`,
          )
        }
        if (summarised.has(subject)) {
          errors.push(
            `${label}: subjects "${section.id}": two summaries for "${subject}"`,
          )
        }
        summarised.add(subject)
      }
      if (section.entries && section.summaries) {
        errors.push(
          `${label}: subjects "${section.id}": use entries or summaries, not both`,
        )
      }
      const titles = new Set<string>()
      for (const { title } of section.entries ?? []) {
        if (titles.has(title)) {
          errors.push(
            `${label}: subjects "${section.id}": two entries titled "${title}"`,
          )
        }
        titles.add(title)
      }
    }
    if (section.type !== "video-player") continue
    for (const id of section.videos) {
      const video = videos.find((v) => v.id === id)
      if (video?.class && !(course.classes as string[]).includes(video.class)) {
        errors.push(
          `${label}: video-player "${section.id}": "${id}" is for ${video.class}, which this course does not teach`,
        )
      }
    }
  }
}
