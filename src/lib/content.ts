import "server-only"
import { z } from "zod"
import {
  CourseSchema,
  FacultySchema,
  PageSchema,
  SiteSchema,
  type Course,
  type Faculty,
  type NavItem,
  type Page,
  type Section,
  type Site,
} from "@/lib/content-schema"
import { site as rawSite } from "@/content/site"
import { pages as rawPages, type PageSlug } from "@/content/pages"
import { courses as rawCourses } from "@/content/courses"
import { faculty as rawFaculty } from "@/content/faculty"

// ---------- Validation (runs once, when this module loads) ----------

function parseOrCollect<T>(
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

function checkSections(label: string, sections: Section[], errors: string[]) {
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
  const dark = sections.filter(
    (s) => s.type === "cta-band" && s.variant === "dark",
  ).length
  if (dark > 1) {
    errors.push(`${label}: ${dark} dark cta-band sections (max 1)`)
  }
}

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

  if (errors.length || !site) {
    throw new Error(
      `Invalid content:\n${errors.map((e) => `[content] ${e}`).join("\n")}`,
    )
  }

  return {
    site,
    pages,
    courses: courses.sort((a, b) => a.order - b.order),
    faculty: faculty.sort((a, b) => a.order - b.order),
  }
}

const content = loadContent()

// ---------- Resolve ----------

// Fills section references to collections (none yet) so components only
// ever receive plain data.
function resolveSections(sections: Section[]): Section[] {
  return sections
}

// ---------- API (async so a CMS fetch can replace the body later) ----------

async function getSite(): Promise<Site> {
  return content.site
}

// Nav items whose feature is switched off are dropped (the footer reuses this).
async function getNav(): Promise<NavItem[]> {
  const { nav, features } = content.site
  return nav.filter((item) => !item.feature || features[item.feature])
}

async function getPage(slug: PageSlug): Promise<Page> {
  const page = content.pages.get(slug)
  if (!page) {
    throw new Error(
      `[content] unknown page "${slug}". Known: ${[...content.pages.keys()].join(", ")}`,
    )
  }
  return { ...page, sections: resolveSections(page.sections) }
}

async function getCourses(): Promise<Course[]> {
  return content.courses
}

async function getCourse(slug: string): Promise<Course> {
  const course = content.courses.find((c) => c.slug === slug)
  if (!course) {
    throw new Error(
      `[content] unknown course "${slug}". Known: ${content.courses.map((c) => c.slug).join(", ") || "(none)"}`,
    )
  }
  return { ...course, sections: resolveSections(course.sections) }
}

async function getFaculty(): Promise<Faculty[]> {
  return content.faculty
}

async function getFacultyForCourse(slug: string): Promise<Faculty[]> {
  const course = await getCourse(slug)
  return content.faculty.filter((f) => course.facultyIds.includes(f.id))
}

async function getCoursesForFaculty(id: string): Promise<Course[]> {
  return content.courses.filter((c) => c.facultyIds.includes(id))
}

export {
  getSite,
  getNav,
  getPage,
  getCourses,
  getCourse,
  getFaculty,
  getFacultyForCourse,
  getCoursesForFaculty,
}
