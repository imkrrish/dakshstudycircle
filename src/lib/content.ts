import "server-only"
import { z } from "zod"
import {
  CourseSchema,
  FacultySchema,
  PageSchema,
  SiteSchema,
  VideoSchema,
  type Course,
  type Faculty,
  type NavItem,
  type CourseGridSection,
  type FaqSection,
  type Video,
  type VideoGridSection,
  type ResolvedVideoGridSection,
  type Page,
  type ResolvedCourse,
  type ResolvedCourseGridSection,
  type ResolvedPage,
  type ResolvedSection,
  type Section,
  type Site,
} from "@/lib/content-schema"
import { site as rawSite } from "@/content/site"
import { pages as rawPages, type PageSlug } from "@/content/pages"
import { courses as rawCourses } from "@/content/courses"
import { faculty as rawFaculty } from "@/content/faculty"
import { videos as rawVideos } from "@/content/videos"

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

// Every course-grid slug must exist, and appear once per section.
function checkCourseGrids(
  label: string,
  sections: Section[],
  courseSlugs: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "course-grid") continue
    const where = `${label}: course-grid "${section.id}"`
    const seen = new Set<string>()
    for (const group of section.groups) {
      for (const item of group.items) {
        const slugs = item.kind === "course" ? [item.course] : item.courses
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

// Every video-grid id must exist, and appear once per section.
function checkVideoGrids(
  label: string,
  sections: Section[],
  videoIds: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "video-grid") continue
    const where = `${label}: video-grid "${section.id}"`
    const seen = new Set<string>()
    for (const id of section.videos) {
      if (!videoIds.has(id)) {
        errors.push(
          `${where}: unknown video "${id}". Known: ${[...videoIds].join(", ")}`,
        )
      }
      if (seen.has(id)) errors.push(`${where}: video "${id}" appears twice`)
      seen.add(id)
    }
  }
}

// A `social` button needs that platform in site.socials, or it would vanish.
function checkSocialActions(
  label: string,
  sections: Section[],
  platforms: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (!("actions" in section) || !section.actions) continue
    for (const { action } of section.actions) {
      if (action.type === "social" && !platforms.has(action.platform)) {
        errors.push(
          `${label}: "${section.id}" has a ${action.platform} button but site.socials has no ${action.platform}`,
        )
      }
    }
  }
}

// Site facts that faq text may use as {address}, {phones} and {hours}.
function contactPlaceholders(site: Site): Record<string, string> {
  const { address, phones, hours } = site.contact
  return {
    // Same one-line format as the footer.
    address: [
      address.line1,
      address.line2,
      address.locality,
      `${address.city}, ${address.state} ${address.postalCode}`,
    ]
      .filter(Boolean)
      .join(", "),
    phones: new Intl.ListFormat("en-IN", { type: "disjunction" }).format(
      phones.map((p) => p.display),
    ),
    hours,
  }
}

const PLACEHOLDER_PATTERN = /\{(\w+)\}/g

// An unknown {name} in faq text would ship as literal braces, so it fails the build.
function checkPlaceholders(
  label: string,
  sections: Section[],
  known: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "faq") continue
    section.items.forEach((item, i) => {
      for (const text of [item.question, item.answer]) {
        for (const [, name] of text.matchAll(PLACEHOLDER_PATTERN)) {
          if (known.has(name)) continue
          errors.push(
            `${label}: faq "${section.id}" item ${i + 1}: unknown placeholder {${name}}. Known: ${[...known].map((k) => `{${k}}`).join(", ")}`,
          )
        }
      }
    })
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
  for (const [key, page] of pages) {
    checkPlaceholders(`pages/${key}`, page.sections, placeholderNames, errors)
    checkCourseGrids(`pages/${key}`, page.sections, courseSlugs, errors)
    checkVideoGrids(`pages/${key}`, page.sections, videoIds, errors)
    checkSocialActions(`pages/${key}`, page.sections, socialPlatforms, errors)
  }
  for (const course of courses) {
    checkPlaceholders(
      `courses/${course.slug}`,
      course.sections,
      placeholderNames,
      errors,
    )
    checkCourseGrids(
      `courses/${course.slug}`,
      course.sections,
      courseSlugs,
      errors,
    )
    checkVideoGrids(`courses/${course.slug}`, course.sections, videoIds, errors)
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
    courses: courses.sort((a, b) => a.order - b.order),
    faculty: faculty.sort((a, b) => a.order - b.order),
  }
}

const content = loadContent()

// ---------- Resolve ----------

// The only place course URLs are built.
function courseHref(slug: string) {
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

function findCourse(slug: string) {
  const course = content.courses.find((c) => c.slug === slug)
  if (!course) throw new Error(`[content] unknown course "${slug}"`)
  return course
}

function resolveCourseGrid(
  section: CourseGridSection,
): ResolvedCourseGridSection {
  return {
    ...section,
    groups: section.groups.map((group) => ({
      label: group.label,
      items: group.items.map((item) => {
        if (item.kind === "course") {
          const course = findCourse(item.course)
          return {
            kind: "course" as const,
            title: course.title,
            note: course.cardNote ?? course.subjects[0] ?? "",
            href: courseHref(course.slug),
          }
        }
        const courses = item.courses.map(findCourse)
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
}

// The only place YouTube playlist URLs are built.
function playlistHref(playlistId: string) {
  return `https://www.youtube.com/playlist?list=${playlistId}`
}

function resolveVideoGrid(section: VideoGridSection): ResolvedVideoGridSection {
  const { videos: ids, ...rest } = section
  return {
    ...rest,
    items: ids.map((id) => {
      const video = content.videos.find((v) => v.id === id)
      if (!video) throw new Error(`[content] unknown video "${id}"`)
      return {
        title: video.title,
        href: playlistHref(video.youtubePlaylistId),
        thumbnail: video.thumbnail,
        meta: "Playlist · YouTube",
      }
    }),
  }
}

function resolveFaq(section: FaqSection): FaqSection {
  const values = contactPlaceholders(content.site)
  // Names were validated at load, so every match has a value.
  const fill = (text: string) =>
    text.replace(PLACEHOLDER_PATTERN, (_, name: string) => values[name])
  return {
    ...section,
    items: section.items.map(({ question, answer }) => ({
      question: fill(question),
      answer: fill(answer),
    })),
  }
}

// Fills section references to collections so components only receive plain data.
function resolveSections(sections: Section[]): ResolvedSection[] {
  return sections.map((section) => {
    switch (section.type) {
      case "faq":
        return resolveFaq(section)
      case "course-grid":
        return resolveCourseGrid(section)
      case "video-grid":
        return resolveVideoGrid(section)
      default:
        return section
    }
  })
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

async function getPage(slug: PageSlug): Promise<ResolvedPage> {
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

async function getCourse(slug: string): Promise<ResolvedCourse> {
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
