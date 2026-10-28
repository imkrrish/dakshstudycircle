import "server-only"
import { z } from "zod"
import {
  CourseSchema,
  FacultySchema,
  PageSchema,
  SiteSchema,
  VideoSchema,
  TestimonialSchema,
  ResultSchema,
  type Testimonial,
  type Result,
  type ResultsGridSection,
  type ResolvedResultsGridSection,
  type ResolvedResultsBoardSection,
  type ResultsBoardSection,
  type TestimonialGridSection,
  type ResolvedTestimonialGridSection,
  type Course,
  type Faculty,
  type NavItem,
  type CourseGridSection,
  type FaqSection,
  type HeroSection,
  type Video,
  type VideoPlayerSection,
  type ResolvedVideoPlayerSection,
  type SubjectsSection,
  type ResolvedSubjectsSection,
  type FeesSection,
  type ResolvedFeesSection,
  type Page,
  type ResolvedCourse,
  type ResolvedCourseGridSection,
  type ResolvedPage,
  type ResolvedSection,
  type Section,
  type Site,
} from "@/lib/content-schema"
import { formatHoursInline, formatHoursShort } from "@/lib/hours"
import { site as rawSite } from "@/content/site"
import { pages as rawPages, type PageSlug } from "@/content/pages"
import { courses as rawCourses } from "@/content/courses"
import { faculty as rawFaculty } from "@/content/faculty"
import { videos as rawVideos } from "@/content/videos"
import { testimonials as rawTestimonials } from "@/content/testimonials"
import { results as rawResults } from "@/content/results"

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
    if (section.type === "course-grid" && section.hideHeading) {
      if (section.eyebrow || section.intro) {
        errors.push(
          `${label}: course-grid "${section.id}" hides its heading, so it cannot have an eyebrow or intro`,
        )
      }
    }
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

// Every video-player id must exist, and appear once per section; the default
// video must be one of them.
function checkVideoPlayers(
  label: string,
  sections: Section[],
  videoIds: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "video-player") continue
    const where = `${label}: video-player "${section.id}"`
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
    if (!seen.has(section.defaultVideo)) {
      errors.push(
        `${where}: defaultVideo "${section.defaultVideo}" is not in its videos`,
      )
    }
  }
}

// Course-only sections: a page has no course record to read. A fees section
// needs the course's fees; each video must belong to one of the course's classes.
function checkCourseSections(
  label: string,
  course: Course,
  videos: Video[],
  errors: string[],
) {
  for (const section of course.sections) {
    if (section.type === "fees" && !course.fees) {
      errors.push(`${label}: fees "${section.id}" but the course has no fees`)
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

function checkPageSections(label: string, sections: Section[], errors: string[]) {
  for (const section of sections) {
    if (section.type === "subjects" || section.type === "fees") {
      errors.push(
        `${label}: "${section.id}" (${section.type}) belongs on a course page`,
      )
    }
  }
}

// A testimonial-grid that selects nothing would render an empty section.
function checkTestimonialGrids(
  label: string,
  sections: Section[],
  testimonials: Testimonial[],
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "testimonial-grid") continue
    if (section.show === "featured" && !testimonials.some((t) => t.featured)) {
      errors.push(
        `${label}: testimonial-grid "${section.id}" shows featured but no testimonial has featured: true`,
      )
    }
    if (section.show === "all" && testimonials.length === 0) {
      errors.push(
        `${label}: testimonial-grid "${section.id}" has no testimonials`,
      )
    }
  }
}

// A results-grid that selects nothing would render an empty section.
function checkResultsGrids(
  label: string,
  sections: Section[],
  results: Result[],
  errors: string[],
) {
  for (const section of sections) {
    if (section.type === "results-board" && results.length === 0) {
      errors.push(`${label}: results-board "${section.id}" has no results`)
    }
    if (section.type !== "results-grid") continue
    if (section.show === "highlights" && !results.some((r) => r.highlight)) {
      errors.push(
        `${label}: results-grid "${section.id}" shows highlights but no result has highlight: true`,
      )
    }
    if (section.show === "all" && results.length === 0) {
      errors.push(`${label}: results-grid "${section.id}" has no results`)
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

// Site facts that faq text may use as {address}, {phones}, {hours}, {landmark}
// and {metro}. The last two exist only when set in site.contact.
function contactPlaceholders(site: Site): Record<string, string> {
  const { address, phones, hours, landmark, nearestMetro } = site.contact
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
    hours: formatHoursInline(hours),
    ...(landmark ? { landmark } : {}),
    ...(nearestMetro ? { metro: nearestMetro } : {}),
  }
}

// Centre-wide facts that hero fact values may use: {hours}, {batchSize}, {modes}, {freeDemo}.
function heroPlaceholders(site: Site, course?: Course): Record<string, string> {
  return {
    hours: formatHoursShort(site.contact.hours),
    batchSize: site.facts.batchSize,
    modes: site.facts.modes,
    freeDemo: site.facts.freeDemo,
    ...(course
      ? {
          classes: classRange(course.classes),
          subjectCount: String(course.subjects.length),
        }
      : {}),
  }
}

// "Class 9", "Class 10" → "9–10"; a gap or "College" keeps the list ("9 and 11").
function classRange(classes: string[]): string {
  const numbers = classes.map((c) => Number(c.replace("Class ", "")))
  if (numbers.some(Number.isNaN)) return classes.join(", ")
  const contiguous = numbers.every((n, i) => i === 0 || n === numbers[i - 1] + 1)
  if (contiguous && numbers.length > 1) {
    return `${numbers[0]}–${numbers[numbers.length - 1]}`
  }
  return new Intl.ListFormat("en-IN", { type: "conjunction" }).format(
    numbers.map(String),
  )
}

// A course page's hero facts may also use {classes} and {subjectCount}.
const COURSE_HERO_PLACEHOLDERS = ["classes", "subjectCount"]

const PLACEHOLDER_PATTERN = /\{(\w+)\}/g

// An unknown {name} in faq text or hero facts would ship as literal braces, so it fails the build.
function checkPlaceholders(
  label: string,
  sections: Section[],
  known: Set<string>,
  knownHero: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type === "hero") {
      section.facts?.items.forEach((item, i) => {
        for (const [, name] of item.value.matchAll(PLACEHOLDER_PATTERN)) {
          if (knownHero.has(name)) continue
          errors.push(
            `${label}: hero "${section.id}" fact ${i + 1}: unknown placeholder {${name}}. Known: ${[...knownHero].map((k) => `{${k}}`).join(", ")}`,
          )
        }
      })
      continue
    }
    if (section.type !== "faq") continue
    const unknownIn = (text: string, where: string) => {
      for (const [, name] of text.matchAll(PLACEHOLDER_PATTERN)) {
        if (known.has(name)) continue
        errors.push(
          `${label}: faq "${section.id}" ${where}: unknown placeholder {${name}}. Known: ${[...known].map((k) => `{${k}}`).join(", ")}`,
        )
      }
    }
    if (section.intro) unknownIn(section.intro, "intro")
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
      parsed.course,
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
  const courseHeroPlaceholderNames = new Set([
    ...heroPlaceholderNames,
    ...COURSE_HERO_PLACEHOLDERS,
  ])
  for (const course of courses) {
    checkPlaceholders(
      `courses/${course.slug}`,
      course.sections,
      placeholderNames,
      courseHeroPlaceholderNames,
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

  // Sample items (`sample: true`) are examples: kept in development, removed
  // everywhere else. next.config.ts prints a warning for any left in the data.
  const showSamples = process.env.NODE_ENV === "development"
  const real = <T extends { sample?: boolean }>(items: T[]) =>
    showSamples ? items : items.filter((item) => !item.sample)

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
  const { ribbon, ...rest } = section
  const resolved: ResolvedCourseGridSection = {
    ...rest,
    groups: section.groups.map((group) => ({
      label: group.label,
      items: group.items.map((item) => {
        if (item.kind === "course") {
          const course = findCourse(item.course)
          return {
            kind: "course" as const,
            title: course.title,
            note: course.cardNote ?? course.subjects[0] ?? "",
            ...(section.variant === "full" && { summary: course.summary }),
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
  // The ribbon reads the same titles the cards show, in the same order.
  if (ribbon) {
    resolved.ribbon = resolved.groups.flatMap((group) =>
      group.items.map((item) => item.title),
    )
  }
  return resolved
}

// The only place YouTube playlist URLs are built.
function playlistHref(playlistId: string) {
  return `https://www.youtube.com/playlist?list=${playlistId}`
}

// Built here only; used by the player after a click. nocookie host, autoplay
// because the visitor has just pressed play.
function playlistEmbedSrc(playlistId: string) {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1`
}

function resolveVideoPlayer(
  section: VideoPlayerSection,
): ResolvedVideoPlayerSection {
  const { videos: ids, ...rest } = section
  return {
    ...rest,
    items: ids.map((id) => {
      const video = content.videos.find((v) => v.id === id)
      if (!video) throw new Error(`[content] unknown video "${id}"`)
      return {
        id: video.id,
        title: video.title,
        href: playlistHref(video.youtubePlaylistId),
        embedSrc: playlistEmbedSrc(video.youtubePlaylistId),
        thumbnail: video.thumbnail,
        meta: "Playlist",
      }
    }),
  }
}

function resolveResultsGrid(
  section: ResultsGridSection,
): ResolvedResultsGridSection {
  const { show, ...rest } = section
  const chosen = content.results.filter((r) => show === "all" || r.highlight)
  return {
    ...rest,
    items: chosen.map((r) => {
      const meta = r.outcome
        ? [`${r.outcome.note} ${r.year}`, r.course]
        : [r.class, r.stream, `${r.exam} ${r.year}`, r.course].filter(
            (part): part is string => Boolean(part),
          )
      return {
        id: r.id,
        name: r.studentName,
        photo: r.photo,
        headline: r.outcome ? r.outcome.title : `${r.percentage}%`,
        meta: meta.join(" · "),
        subjects:
          section.variant === "full" && r.subjects?.length
            ? r.subjects.map((s) => `${s.name} ${s.marks}`).join(" · ")
            : undefined,
      }
    }),
  }
}

// Year tabs newest first. Within a year: highlights, then the higher
// percentage; entrance results (no percentage) after board results. The sort
// is stable, so data order breaks ties.
function resolveResultsBoard(
  section: ResultsBoardSection,
): ResolvedResultsBoardSection {
  const { perYear, ...rest } = section
  const years = [...new Set(content.results.map((r) => r.year))].sort(
    (a, b) => b - a,
  )
  return {
    ...rest,
    years: years.map((year) => ({
      year,
      items: content.results
        .filter((r) => r.year === year)
        .sort(
          (a, b) =>
            Number(b.highlight ?? false) - Number(a.highlight ?? false) ||
            (b.percentage ?? -1) - (a.percentage ?? -1),
        )
        .slice(0, perYear)
        .map((r) => ({
          id: r.id,
          name: r.studentName,
          meta: (r.outcome ? [r.class, r.exam] : [r.class, r.stream])
            .filter((part): part is string => Boolean(part))
            .join(" · "),
          course: r.course,
          // One decimal, so "93.0%" lines up with "96.2%" down the board.
          score:
            r.percentage === undefined
              ? undefined
              : `${r.percentage.toFixed(1)}%`,
          outcome: r.outcome
            ? {
                status: r.outcome.status ?? "Admitted",
                school: r.outcome.school ?? r.outcome.title,
              }
            : undefined,
          subjects: r.subjects?.length ? r.subjects : undefined,
          photo: r.photo,
        })),
    })),
  }
}

// The home carousel never shows more than this many cards.
const MAX_CAROUSEL_TESTIMONIALS = 12

function resolveTestimonialGrid(
  section: TestimonialGridSection,
): ResolvedTestimonialGridSection {
  const { show, ...rest } = section
  const chosen = content.testimonials
    .filter((t) => show === "all" || t.featured)
    // Stable sort: data order breaks ties; no `order` goes last.
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
    .slice(
      0,
      section.layout === "carousel" ? MAX_CAROUSEL_TESTIMONIALS : undefined,
    )
  const google = content.site.googleReviews
  return {
    ...rest,
    rating: google
      ? { rating: google.rating, count: google.count, url: google.url }
      : undefined,
    items: chosen.map((t) => ({
      id: t.id,
      name: t.name,
      source: t.source,
      byline:
        t.context ??
        (t.role === "parent" ? "Parent" : t.role ? "Student" : undefined),
      text: t.text,
      photo: t.photo,
    })),
  }
}

function resolveFaq(section: FaqSection): FaqSection {
  const values = contactPlaceholders(content.site)
  // Names were validated at load, so every match has a value.
  const fill = (text: string) =>
    text.replace(PLACEHOLDER_PATTERN, (_, name: string) => values[name])
  const { features } = content.site
  return {
    ...section,
    ...(section.intro ? { intro: fill(section.intro) } : {}),
    items: section.items
      .filter((item) => !item.feature || features[item.feature])
      .map(({ question, answer }) => ({
        question: fill(question),
        answer: fill(answer),
      })),
  }
}

// Fills the hero's fact placeholders. Without a photo the media is dropped
// unless shot cards are on, so production never shows "photo to come". A course
// hero without its own trail gets Home › Courses › the course.
function resolveHero(section: HeroSection, course?: Course): HeroSection {
  const { site } = content
  const values = heroPlaceholders(site, course)
  const { media, facts, ...rest } = section
  const showMedia =
    media && (media.image || site.features.showShotCards) ? media : undefined
  const breadcrumbs =
    section.breadcrumbs ??
    (course && section.size === "compact"
      ? [
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.title },
        ]
      : undefined)
  return {
    ...rest,
    ...(breadcrumbs ? { breadcrumbs } : {}),
    ...(showMedia ? { media: showMedia } : {}),
    ...(facts
      ? {
          facts: {
            items: facts.items.map(({ label, value }) => ({
              label,
              value: value.replace(
                PLACEHOLDER_PATTERN,
                (_, name: string) => values[name],
              ),
            })),
          },
        }
      : {}),
  }
}

// Teachers of a subject in a course: the course's faculty who teach that
// subject to at least one of its classes. Derived, never stored.
function resolveSubjects(
  section: SubjectsSection,
  course: Course,
): ResolvedSubjectsSection {
  return {
    ...section,
    items: course.subjects.map((name) => ({
      name,
      teachers: content.faculty
        .filter(
          (f) =>
            course.facultyIds.includes(f.id) &&
            f.subjects.includes(name) &&
            (course.classes.length === 0 ||
              f.classes.some((c) => (course.classes as string[]).includes(c))),
        )
        .map((f) => ({ name: f.name, role: f.role })),
    })),
  }
}

const rupees = new Intl.NumberFormat("en-IN")

// How often the fee is paid, as it reads after "per subject, ".
const FEE_PERIODS = {
  month: "per month",
  quarter: "per quarter",
  year: "per year",
  session: "for the session up to the final exams",
  course: "for the whole course",
} as const

// Null when fees are switched off, so no amount reaches the page.
function resolveFees(
  section: FeesSection,
  course: Course,
): ResolvedFeesSection | null {
  if (!content.site.features.showFees || !course.fees) return null
  const { rows, note } = course.fees
  return {
    ...section,
    rows: rows.map(({ label, amount, per, period, note: rowNote }) => ({
      label,
      amount:
        typeof amount === "number"
          ? `₹${rupees.format(amount)}`
          : `₹${rupees.format(amount.from)}–₹${rupees.format(amount.to)}`,
      basis: [
        per === "subject" ? "per subject" : null,
        // "up to the final exams" is only confirmed for per-subject fees.
        period === "session" && per === "course"
          ? "for the session"
          : FEE_PERIODS[period],
      ]
        .filter(Boolean)
        .join(", "),
      ...(rowNote ? { note: rowNote } : {}),
    })),
    ...(note ? { note } : {}),
  }
}

// Fills section references to collections so components only receive plain
// data. `course` is the course whose page this is; sections that read the
// course record need it (the build already rejects them on other pages).
function resolveSections(
  sections: Section[],
  course?: Course,
): ResolvedSection[] {
  return sections.flatMap((section): ResolvedSection[] => {
    switch (section.type) {
      case "subjects":
        return [resolveSubjects(section, requireCourse(section.id, course))]
      case "fees": {
        const fees = resolveFees(section, requireCourse(section.id, course))
        return fees ? [fees] : []
      }
      // A section with nothing left to show (e.g. only sample results, in
      // production) is dropped rather than rendered empty.
      case "results-grid": {
        const resolved = resolveResultsGrid(section)
        return resolved.items.length > 0 ? [resolved] : []
      }
      case "results-board": {
        const resolved = resolveResultsBoard(section)
        return resolved.years.length > 0 ? [resolved] : []
      }
      default:
        return [resolveOne(section, course)]
    }
  })
}

function requireCourse(id: string, course?: Course): Course {
  if (!course) throw new Error(`[content] section "${id}" needs a course`)
  return course
}

function resolveOne(
  section: Exclude<
    Section,
    { type: "subjects" | "fees" | "results-grid" | "results-board" }
  >,
  course?: Course,
): ResolvedSection {
  {
    switch (section.type) {
      case "hero":
        return resolveHero(section, course)
      case "faq":
        return resolveFaq(section)
      case "course-grid":
        return resolveCourseGrid(section)
      case "video-player":
        return resolveVideoPlayer(section)
      case "testimonial-grid":
        return resolveTestimonialGrid(section)
      default:
        return section
    }
  }
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
  return { ...course, sections: resolveSections(course.sections, course) }
}

async function getFaculty(): Promise<Faculty[]> {
  return content.faculty
}

async function getTestimonials(): Promise<Testimonial[]> {
  return content.testimonials
}

async function getResults(): Promise<Result[]> {
  return content.results
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
  getTestimonials,
  getResults,
  getFacultyForCourse,
  getCoursesForFaculty,
}
