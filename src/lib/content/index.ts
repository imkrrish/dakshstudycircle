import "server-only"
import type { PageSlug } from "@/content/pages"
import { content } from "./load"
import {
  courseSlot,
  resolveSections,
  PageSchema,
  SeoSchema,
  type Page,
  type ResolvedPage,
  type Seo,
} from "./page"
import {
  SiteSchema,
  type Site,
  type NavItem,
} from "./site"
import {
  ImageSchema,
  IconSchema,
  ActionSchema,
  ButtonSchema,
  LinkSchema,
  type Image,
  type Icon,
  type Action,
  type Button,
  type Link,
  type SocialPlatform,
} from "./shared"
import {
  CourseSchema,
  type Course,
  type ResolvedCourse,
  type Fees,
} from "./collections/courses"
import { FacultySchema, type Faculty } from "./collections/faculty"
import { VideoSchema, type Video } from "./collections/videos"
import { TestimonialSchema, type Testimonial } from "./collections/testimonials"
import { ResultSchema, type Result } from "./collections/results"
import {
  SectionSchema,
  ResolvedCourseGridSectionSchema,
  ResolvedVideoPlayerSectionSchema,
  ResolvedResultsGridSectionSchema,
  ResolvedResultsBoardSectionSchema,
  ResolvedTestimonialGridSectionSchema,
  ResolvedSubjectsSectionSchema,
  ResolvedFeesSectionSchema,
  type Section,
  type ResolvedSection,
  type SectionType,
  type SectionOf,
  type CourseGridSection,
  type ResolvedCourseGridSection,
  type FaqSection,
  type HeroSection,
  type TeachingPlanSection,
  type VideoPlayerSection,
  type ResolvedVideoPlayerSection,
  type ResultsGridSection,
  type ResolvedResultsGridSection,
  type ResultsBoardSection,
  type ResolvedResultsBoardSection,
  type TestimonialGridSection,
  type ResolvedTestimonialGridSection,
  type SubjectsSection,
  type ResolvedSubjectsSection,
  type FeesSection,
  type ResolvedFeesSection,
} from "./sections"

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
  const shown = course.sections
    .filter((section) => courseSlot(section.type) !== -1)
    // Stable sort: the course file's order breaks ties.
    .sort((a, b) => courseSlot(a.type) - courseSlot(b.type))
  return { ...course, sections: resolveSections(shown, course) }
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

// ---------- Re-exported Schemas and Types (absorbs schema/index.ts) ----------

export {
  ImageSchema,
  IconSchema,
  ActionSchema,
  ButtonSchema,
  LinkSchema,
  SeoSchema,
  SiteSchema,
  PageSchema,
  CourseSchema,
  VideoSchema,
  FacultySchema,
  TestimonialSchema,
  ResultSchema,
  SectionSchema,
  ResolvedCourseGridSectionSchema,
  ResolvedVideoPlayerSectionSchema,
  ResolvedResultsGridSectionSchema,
  ResolvedResultsBoardSectionSchema,
  ResolvedTestimonialGridSectionSchema,
  ResolvedSubjectsSectionSchema,
  ResolvedFeesSectionSchema,
}

export type {
  Image,
  Icon,
  Action,
  Button,
  Link,
  SocialPlatform,
  Seo,
  Site,
  NavItem,
  Page,
  ResolvedPage,
  Fees,
  Course,
  ResolvedCourse,
  Video,
  Faculty,
  Testimonial,
  Result,
  Section,
  ResolvedSection,
  SectionType,
  SectionOf,
  HeroSection,
  CourseGridSection,
  ResolvedCourseGridSection,
  VideoPlayerSection,
  ResolvedVideoPlayerSection,
  ResultsGridSection,
  ResolvedResultsGridSection,
  ResultsBoardSection,
  ResolvedResultsBoardSection,
  TestimonialGridSection,
  ResolvedTestimonialGridSection,
  FaqSection,
  SubjectsSection,
  ResolvedSubjectsSection,
  TeachingPlanSection,
  FeesSection,
  ResolvedFeesSection,
}
