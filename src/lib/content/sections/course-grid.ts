import { z } from "zod"
import { ButtonSchema, sectionBase, type LoadedContent } from "../shared"

// Authoring shape: items refer to courses by slug. getPage() resolves them.
export const CourseGridItemSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("course"), course: z.string().min(1) }),
  // One card for several related courses (e.g. the Class 11–12 streams).
  z.strictObject({
    kind: z.literal("stream-group"),
    title: z.string().min(1),
    note: z.string().optional(),
    courses: z.array(z.string().min(1)).min(2),
  }),
])

export const courseGridBase = {
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

export const CourseGridSectionSchema = z.strictObject({
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
export const ResolvedCourseGridSectionSchema = z.strictObject({
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

export type CourseGridSection = z.infer<typeof CourseGridSectionSchema>
export type ResolvedCourseGridSection = z.infer<
  typeof ResolvedCourseGridSectionSchema
>

// ---------- Resolving ----------

// The only place course URLs are built.
export function courseHref(slug: string) {
  return `/courses/${slug}`
}

// Stream chip text: the course title minus the words shared by the whole group
// ("Class 11–12 Science" → "Science").
function streamLabels(titles: string[]): string[] {
  const words = titles.map((t) => t.split(" "))
  let shared = 0
  while (
    words.every((w) => w.length > shared + 1 && w[shared] === words[0][shared])
  ) {
    shared++
  }
  return words.map((w) => w.slice(shared).join(" "))
}

export function findCourse(
  slug: string,
  courses: LoadedContent["courses"],
) {
  const course = courses.find((c) => c.slug === slug)
  if (!course) throw new Error(`[content] unknown course "${slug}"`)
  return course
}

export function resolveCourseGrid(
  section: CourseGridSection,
  content: LoadedContent,
): ResolvedCourseGridSection {
  const { ribbon, ...rest } = section
  const resolved: ResolvedCourseGridSection = {
    ...rest,
    groups: section.groups.map((group) => ({
      label: group.label,
      items: group.items.map((item) => {
        if (item.kind === "course") {
          const course = findCourse(item.course, content.courses)
          return {
            kind: "course" as const,
            title: course.title,
            note: course.cardNote ?? course.subjects[0] ?? "",
            ...(section.variant === "full" && { summary: course.summary }),
            href: courseHref(course.slug),
          }
        }
        const courses = item.courses.map((slug) =>
          findCourse(slug, content.courses),
        )
        const labels = streamLabels(courses.map((c) => c.title))
        return {
          kind: "stream-group" as const,
          title: item.title,
          note: item.note,
          links: courses.map((c, i) => ({
            title: c.title,
            label: labels[i],
            href: courseHref(c.slug),
          })),
        }
      }),
    })),
  }
  // The ribbon reads the same titles the cards show, in the same order.
  if (ribbon) {
    resolved.ribbon = resolved.groups.flatMap((group) =>
      group.items.map((item) => item.title),
    )
  }
  return resolved
}

// ---------- Validation ----------

// Every course-grid slug must exist, and appear once per section.
export function checkCourseGrids(
  label: string,
  sections: Array<{
    type: string
    id: string
    hideHeading?: boolean
    eyebrow?: string
    intro?: string
    [key: string]: unknown
  }>,
  courseSlugs: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "course-grid") continue
    if (section.hideHeading && (section.eyebrow || section.intro)) {
      errors.push(
        `${label}: course-grid "${section.id}" hides its heading, so it cannot have an eyebrow or intro`,
      )
    }
    const groups = section.groups as Array<{ items: Array<{ kind: string; course?: string; courses?: string[] }> }> | undefined
    if (!groups) continue
    const where = `${label}: course-grid "${section.id}"`
    const seen = new Set<string>()
    for (const group of groups) {
      for (const item of group.items) {
        const slugs = item.kind === "course" && item.course ? [item.course] : (item.courses ?? [])
        for (const slug of slugs) {
          if (!courseSlugs.has(slug)) {
            errors.push(
              `${where}: unknown course "${slug}". Known: ${[...courseSlugs].join(", ")}`,
            )
          }
          if (seen.has(slug))
            errors.push(`${where}: course "${slug}" appears twice`)
          seen.add(slug)
        }
      }
    }
  }
}
