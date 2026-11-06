import { z } from "zod"
import { SeoSchema, type LoadedContent } from "./shared"
import {
  SectionSchema,
  type ResolvedSection,
  type Section,
  type UntonedSection,
  type SectionType,
} from "./sections"
import type { Course } from "./collections/courses"
import { resolveHero } from "./sections/hero"
import { resolveFaq } from "./sections/faq"
import { resolveCourseGrid } from "./sections/course-grid"
import { resolveVideoPlayer } from "./sections/video-player"
import { resolveTestimonialGrid } from "./sections/testimonial-grid"
import { resolveSubjects } from "./sections/subjects"
import { resolveFees } from "./sections/fees"
import { resolveResultsGrid } from "./sections/results-grid"
import { resolveResultsBoard } from "./sections/results-board"
import { resolveTeachingPlan } from "./sections/teaching-plan"
import { resolvePersonFeature } from "./sections/person-feature"
import { resolvePeopleGrid } from "./sections/people-grid"
import { assignTones } from "./tones"

// ---------- Page ----------

export const PageSchema = z.strictObject({
  slug: z.string().min(1),
  seo: SeoSchema,
  sections: z.array(SectionSchema),
})

export type Page = z.infer<typeof PageSchema>
export type ResolvedPage = Omit<Page, "sections"> & { sections: ResolvedSection[] }

// ---------- Course Page Slot / Template ----------

// What a course page renders, in this order. Section types left out (fees,
// link-list, video-player) stay in the course data but are not shown; a
// `reason-list` and a `teaching-plan` share the "how we teach" slot.
const COURSE_TEMPLATE: SectionType[][] = [
  ["hero"],
  ["subjects"],
  ["teaching-plan", "reason-list"],
  ["results-board"],
  ["faq"],
  ["cta-band"],
]

export function courseSlot(type: SectionType): number {
  return COURSE_TEMPLATE.findIndex((types) => types.includes(type))
}

// ---------- Section Resolving ----------

// Fills section references to collections so components only receive plain
// data. `course` is the course whose page this is; sections that read the
// course record need it (the build already rejects them on other pages).
export function resolveSections(
  sections: Section[],
  content: LoadedContent,
  course?: Course,
): ResolvedSection[] {
  const resolved = sections.flatMap((section): UntonedSection[] => {
    switch (section.type) {
      case "subjects":
        return [resolveSubjects(section, requireCourse(section.id, course))]
      case "fees": {
        const fees = resolveFees(section, content, requireCourse(section.id, course))
        return fees ? [fees] : []
      }
      // A section with nothing left to show (e.g. only sample results, in
      // production) is dropped rather than rendered empty.
      case "results-grid": {
        const resolved = resolveResultsGrid(section, content)
        return resolved.items.length > 0 ? [resolved] : []
      }
      case "teaching-plan":
        return [resolveTeachingPlan(section, content)]
      // Dropped when no one is left to show (sample faculty, in production).
      case "person-feature": {
        const resolved = resolvePersonFeature(section, content)
        return resolved ? [resolved] : []
      }
      case "people-grid": {
        const resolved = resolvePeopleGrid(section, content)
        return resolved ? [resolved] : []
      }
      case "results-board": {
        // Course pages default the year numeral to "heading", below the h1.
        const resolved = resolveResultsBoard(
          course ? { yearSize: "heading", ...section } : section,
          content,
          course,
        )
        return resolved.years.length > 0 ? [resolved] : []
      }
      default:
        return [resolveOne(section, content, course)]
    }
  })
  // Last: tones depend on which sections survived the drops above.
  return assignTones(resolved)
}

function requireCourse(id: string, course?: Course): Course {
  if (!course) throw new Error(`[content] section "${id}" needs a course`)
  return course
}

function resolveOne(
  section: Exclude<
    Section,
    {
      type:
        | "subjects"
        | "fees"
        | "teaching-plan"
        | "results-grid"
        | "results-board"
        | "person-feature"
        | "people-grid"
    }
  >,
  content: LoadedContent,
  course?: Course,
): UntonedSection {
  {
    switch (section.type) {
      case "hero":
        return resolveHero(section, content, course)
      case "faq":
        return resolveFaq(section, content)
      case "course-grid":
        return resolveCourseGrid(section, content)
      case "video-player":
        return resolveVideoPlayer(section, content)
      case "testimonial-grid":
        return resolveTestimonialGrid(section, content)
      default:
        return section
    }
  }
}

// ---------- Validation ----------

export function checkSections(label: string, sections: Section[], errors: string[]) {
  if (sections[0]?.type !== "hero") {
    errors.push(
      `${label}: first section must be a hero (got ${sections[0] ? `"${sections[0].type}"` : "no sections"})`,
    )
  }
  const seen = new Set<string>()
  for (const { id } of sections) {
    if (seen.has(id)) errors.push(`${label}: duplicate section id "${id}"`)
    seen.add(id)
  }
  const hero = sections[0]
  if (hero?.type === "hero" && hero.breadcrumbs) {
    const { breadcrumbs } = hero
    if (hero.size !== "compact") {
      errors.push(`${label}: breadcrumbs belong on a compact hero`)
    }
    breadcrumbs.forEach((crumb, i) => {
      const last = i === breadcrumbs.length - 1
      if (last && crumb.href) {
        errors.push(
          `${label}: the last breadcrumb is the current page, no href`,
        )
      }
      if (!last && !crumb.href) {
        errors.push(`${label}: breadcrumb "${crumb.label}" needs an href`)
      }
    })
  }
  if (hero?.type === "hero" && hero.size !== "compact") {
    if (hero.media) errors.push(`${label}: media belongs on a compact hero`)
    if (hero.facts) errors.push(`${label}: facts belong on a compact hero`)
  }
  for (const section of sections) {
    if ((section.type === "hero" || section.type === "cta-band") && section.tone) {
      errors.push(
        `${label}: "${section.id}" (${section.type}) has a fixed tone, remove "tone"`,
      )
    }
  }
  const dark = sections.filter(
    (s) => s.type === "cta-band" && s.variant === "dark",
  ).length
  if (dark > 1) {
    errors.push(`${label}: ${dark} dark cta-band sections (max 1)`)
  }
}

export function checkPageSections(label: string, sections: Section[], errors: string[]) {
  for (const section of sections) {
    if (
      section.type === "subjects" ||
      section.type === "fees" ||
      section.type === "teaching-plan"
    ) {
      errors.push(
        `${label}: "${section.id}" (${section.type}) belongs on a course page`,
      )
    }
  }
}
