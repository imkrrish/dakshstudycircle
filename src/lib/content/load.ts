import "server-only"
import { parseOrCollect, real, setContent } from "./shared"
import { SiteSchema } from "./site"
import { PageSchema, checkSections, checkPageSections, type Page } from "./page"
import {
  CourseSchema,
  checkCourseSections,
  type Course,
} from "./collections/courses"
import { FacultySchema, type Faculty } from "./collections/faculty"
import { VideoSchema, type Video } from "./collections/videos"
import {
  TestimonialSchema,
  type Testimonial,
} from "./collections/testimonials"
import { ResultSchema, type Result } from "./collections/results"
import {
  contactPlaceholders,
  heroPlaceholders,
  checkPlaceholders,
} from "./placeholders"
import { checkCourseGrids } from "./sections/course-grid"
import {
  checkVideoPlayers,
  checkSocialActions,
} from "./sections/video-player"
import { checkTestimonialGrids } from "./sections/testimonial-grid"
import { checkResultsGrids } from "./sections/results-grid"
import { site as rawSite } from "@/content/site"
import { pages as rawPages } from "@/content/pages"
import { courses as rawCourses } from "@/content/courses"
import { faculty as rawFaculty } from "@/content/faculty"
import { videos as rawVideos } from "@/content/videos"
import { testimonials as rawTestimonials } from "@/content/testimonials"
import { results as rawResults } from "@/content/results"

// ---------- Validation (runs once, when this module loads) ----------

function loadContent() {
  const errors: string[] = []

  const site = parseOrCollect(SiteSchema, rawSite, "site", errors)

  const pages = new Map<string, Page>()
  for (const [key, raw] of Object.entries(rawPages)) {
    const label = `pages/${key}`
    const page = parseOrCollect(PageSchema, raw, label, errors)
    if (!page) continue
    if (page.slug !== key) {
      errors.push(`${label}: slug "${page.slug}" does not match registry key`)
    }
    checkSections(label, page.sections, errors)
    pages.set(key, page)
  }

  const faculty: Faculty[] = []
  const facultyIds = new Set<string>()
  rawFaculty.forEach((raw, i) => {
    const parsed = parseOrCollect(FacultySchema, raw, `faculty[${i}]`, errors)
    if (!parsed) return
    if (facultyIds.has(parsed.id)) {
      errors.push(`faculty: duplicate id "${parsed.id}"`)
    }
    facultyIds.add(parsed.id)
    faculty.push(parsed)
  })

  const videos: Video[] = []
  const videoIds = new Set<string>()
  rawVideos.forEach((raw, i) => {
    const parsed = parseOrCollect(VideoSchema, raw, `videos[${i}]`, errors)
    if (!parsed) return
    if (videoIds.has(parsed.id)) {
      errors.push(`videos: duplicate id "${parsed.id}"`)
    }
    videoIds.add(parsed.id)
    videos.push(parsed)
  })

  // Dev data must read as real copy: no "mock"/"placeholder" wording on the page.
  // "mock tests" is ordinary wording (a real testimonial uses it), so it is allowed.
  const VISIBLE_TEXT_BAN = /\bmock\b(?!\s+tests?\b)|\b(placeholder|lorem)\b/i

  const testimonials: Testimonial[] = []
  const testimonialIds = new Set<string>()
  rawTestimonials.forEach((raw, i) => {
    const label = `testimonials[${i}]`
    const parsed = parseOrCollect(TestimonialSchema, raw, label, errors)
    if (!parsed) return
    if (testimonialIds.has(parsed.id)) {
      errors.push(`testimonials: duplicate id "${parsed.id}"`)
    }
    testimonialIds.add(parsed.id)
    if (parsed.source === "institute" && !parsed.role) {
      errors.push(`${label}: institute testimonials need a role`)
    }
    if (parsed.photo && !parsed.photo.src.startsWith("/")) {
      errors.push(`${label}: photo src must start with "/"`)
    }
    for (const text of [parsed.name, parsed.context ?? "", parsed.text]) {
      if (VISIBLE_TEXT_BAN.test(text)) {
        errors.push(`${label}: visible text contains mock/placeholder wording`)
      }
    }
    testimonials.push(parsed)
  })

  const results: Result[] = []
  const resultIds = new Set<string>()
  rawResults.forEach((raw, i) => {
    const label = `results[${i}]`
    const parsed = parseOrCollect(ResultSchema, raw, label, errors)
    if (!parsed) return
    if (resultIds.has(parsed.id)) {
      errors.push(`results: duplicate id "${parsed.id}"`)
    }
    resultIds.add(parsed.id)
    if (!rawCourses.some((c) => c.slug === parsed.course)) {
      errors.push(`${label}: unknown course "${parsed.course}"`)
    }
    if ((parsed.percentage === undefined) === (parsed.outcome === undefined)) {
      errors.push(`${label}: needs either a percentage or an outcome, not both`)
    }
    if ((parsed.class === "Class 12") !== (parsed.stream !== undefined)) {
      errors.push(
        `${label}: stream is required for Class 12 and only for Class 12`,
      )
    }
    if (parsed.photo && !parsed.photo.src.startsWith("/")) {
      errors.push(`${label}: photo src must start with "/"`)
    }
    for (const text of [
      parsed.studentName,
      parsed.outcome?.title ?? "",
      parsed.outcome?.note ?? "",
      ...(parsed.subjects ?? []).map((subject) => subject.name),
    ]) {
      if (VISIBLE_TEXT_BAN.test(text)) {
        errors.push(`${label}: visible text contains mock/placeholder wording`)
      }
    }
    results.push(parsed)
  })

  const courses: Course[] = []
  const courseSlugs = new Set<string>()
  rawCourses.forEach((raw, i) => {
    const parsed = parseOrCollect(CourseSchema, raw, `courses[${i}]`, errors)
    if (!parsed) return
    const label = `courses/${parsed.slug}`
    if (courseSlugs.has(parsed.slug)) {
      errors.push(`courses: duplicate slug "${parsed.slug}"`)
    }
    courseSlugs.add(parsed.slug)
    checkSections(label, parsed.sections, errors)
    for (const id of parsed.facultyIds) {
      if (!facultyIds.has(id)) {
        errors.push(`${label}: unknown faculty id "${id}"`)
      }
    }
    courses.push(parsed)
  })

  const socialPlatforms = new Set<string>(
    site ? site.socials.map((s) => s.platform) : [],
  )
  const placeholderNames = new Set(
    site ? Object.keys(contactPlaceholders(site)) : [],
  )
  const heroPlaceholderNames = new Set(
    site ? Object.keys(heroPlaceholders(site)) : [],
  )
  for (const [key, page] of pages) {
    checkPlaceholders(
      `pages/${key}`,
      page.sections,
      placeholderNames,
      heroPlaceholderNames,
      errors,
    )
    checkPageSections(`pages/${key}`, page.sections, errors)
    checkCourseGrids(`pages/${key}`, page.sections, courseSlugs, errors)
    checkVideoPlayers(`pages/${key}`, page.sections, videoIds, errors)
    checkTestimonialGrids(`pages/${key}`, page.sections, testimonials, errors)
    checkResultsGrids(`pages/${key}`, page.sections, results, errors)
    checkSocialActions(`pages/${key}`, page.sections, socialPlatforms, errors)
  }
  for (const course of courses) {
    checkPlaceholders(
      `courses/${course.slug}`,
      course.sections,
      placeholderNames,
      heroPlaceholderNames,
      errors,
    )
    checkCourseSections(`courses/${course.slug}`, course, videos, errors)
    checkCourseGrids(
      `courses/${course.slug}`,
      course.sections,
      courseSlugs,
      errors,
    )
    checkVideoPlayers(
      `courses/${course.slug}`,
      course.sections,
      videoIds,
      errors,
    )
    checkTestimonialGrids(
      `courses/${course.slug}`,
      course.sections,
      testimonials,
      errors,
    )
    checkResultsGrids(
      `courses/${course.slug}`,
      course.sections,
      results,
      errors,
      true,
    )
    checkSocialActions(
      `courses/${course.slug}`,
      course.sections,
      socialPlatforms,
      errors,
    )
  }

  if (errors.length || !site) {
    throw new Error(
      `Invalid content:\n${errors.map((e) => `[content] ${e}`).join("\n")}`,
    )
  }

  return {
    site,
    pages,
    videos,
    testimonials,
    // Year descending; Array.sort is stable, so data order breaks ties.
    results: real(results).sort((a, b) => b.year - a.year),
    courses: courses.sort((a, b) => a.order - b.order),
    faculty: real(faculty).sort((a, b) => a.order - b.order),
  }
}

export const content = loadContent()
setContent(content)
