import "server-only"
import type { PageSlug } from "@/content/pages"
import { content } from "./load"
import {
  courseSlot,
  resolveSections,
  type Page,
  type ResolvedPage,
} from "./page"
import type { Site, NavItem } from "./site"
import type { Button, Image, SocialPlatform, Seo } from "./shared"
import type { Course, ResolvedCourse } from "./collections/courses"
import type { Faculty } from "./collections/faculty"
import type { Video } from "./collections/videos"
import type { Testimonial } from "./collections/testimonials"
import type { Result } from "./collections/results"
import type { GalleryGroup, GalleryPhoto } from "./collections/gallery"
import type { ResolvedGallerySection } from "./sections/gallery"
import type {
  Section,
  ResolvedSection,
  SectionType,
  SectionOf,
} from "./sections"
import type { ResolvedCourseGridSection } from "./sections/course-grid"
import type { ResolvedVideoPlayerSection } from "./sections/video-player"
import type { ResolvedBoardResultsSection } from "./sections/board-results"
import type { ResolvedEntranceResultsSection } from "./sections/entrance-results"
import type { ResolvedResultsBoardSection } from "./sections/results-board"
import type { ResolvedTestimonialGridSection } from "./sections/testimonial-grid"

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
  return { ...page, sections: resolveSections(page.sections, content) }
}

async function getCourses(): Promise<Course[]> {
  return content.courses
}

// Resolved faculty, ordered; sample records are already stripped in production.
async function getFaculty(): Promise<Faculty[]> {
  return content.faculty
}

// All results, newest year first; sample records are already stripped in production.
async function getResults(): Promise<Result[]> {
  return content.results
}

// The photo groups (display order) and all photos (best first within a group).
async function getGallery(): Promise<{
  groups: GalleryGroup[]
  photos: GalleryPhoto[]
}> {
  return content.gallery
}

async function getCourse(slug: string): Promise<ResolvedCourse> {
  const course = content.courses.find((c) => c.slug === slug)
  if (!course) {
    throw new Error(
      `[content] unknown course "${slug}". Known: ${content.courses.map((c) => c.slug).join(", ") || "(none)"}`,
    )
  }
  const shown = course.sections
    .filter((section) => courseSlot(section.type) !== -1)
    // Stable sort: the course file's order breaks ties.
    .sort((a, b) => courseSlot(a.type) - courseSlot(b.type))
  return { ...course, sections: resolveSections(shown, content, course) }
}

export {
  getSite,
  getNav,
  getPage,
  getCourses,
  getCourse,
  getFaculty,
  getGallery,
  getResults,
}

export { yearsOfTeaching } from "./collections/faculty"

export type {
  Button,
  Course,
  Faculty,
  GalleryGroup,
  GalleryPhoto,
  Image,
  NavItem,
  Page,
  ResolvedBoardResultsSection,
  ResolvedCourseGridSection,
  ResolvedEntranceResultsSection,
  ResolvedGallerySection,
  ResolvedResultsBoardSection,
  ResolvedSection,
  ResolvedTestimonialGridSection,
  ResolvedVideoPlayerSection,
  Result,
  Section,
  SectionOf,
  SectionType,
  Seo,
  Site,
  SocialPlatform,
  Testimonial,
  Video,
}
