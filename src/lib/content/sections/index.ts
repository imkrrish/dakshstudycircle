import { z } from "zod"
import { HeroSectionSchema } from "./hero"
import { SplitSectionSchema } from "./split"
import { ReasonListSectionSchema } from "./reason-list"
import { CourseGridSectionSchema, type ResolvedCourseGridSection } from "./course-grid"
import { VideoPlayerSectionSchema, type ResolvedVideoPlayerSection } from "./video-player"
import { ResultsGridSectionSchema, type ResolvedResultsGridSection } from "./results-grid"
import { ResultsBoardSectionSchema, type ResolvedResultsBoardSection } from "./results-board"
import { TestimonialGridSectionSchema, type ResolvedTestimonialGridSection } from "./testimonial-grid"
import { FaqSectionSchema } from "./faq"
import { CtaBandSectionSchema } from "./cta-band"
import { SubjectsSectionSchema, type ResolvedSubjectsSection } from "./subjects"
import { TeachingPlanSectionSchema } from "./teaching-plan"
import { FeesSectionSchema, type ResolvedFeesSection } from "./fees"
import { LinkListSectionSchema } from "./link-list"

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  SplitSectionSchema,
  ReasonListSectionSchema,
  CourseGridSectionSchema,
  VideoPlayerSectionSchema,
  ResultsGridSectionSchema,
  ResultsBoardSectionSchema,
  TestimonialGridSectionSchema,
  FaqSectionSchema,
  CtaBandSectionSchema,
  SubjectsSectionSchema,
  TeachingPlanSectionSchema,
  FeesSectionSchema,
  LinkListSectionSchema,
])

export type Section = z.infer<typeof SectionSchema>
// A section with its references resolved, before tones are assigned.
export type UntonedSection =
  | Exclude<
      Section,
      {
        type:
          | "course-grid"
          | "video-player"
          | "results-grid"
          | "results-board"
          | "testimonial-grid"
          | "subjects"
          | "fees"
      }
    >
  | ResolvedCourseGridSection
  | ResolvedVideoPlayerSection
  | ResolvedResultsGridSection
  | ResolvedResultsBoardSection
  | ResolvedTestimonialGridSection
  | ResolvedSubjectsSection
  | ResolvedFeesSection

// The background a section renders with (see tones.ts). "ink" is the dark CTA.
export type ResolvedTone = "paper" | "muted" | "band" | "ink"

type WithTone<T> = T extends unknown ? Omit<T, "tone"> & { tone: ResolvedTone } : never

// Sections as components receive them: references resolved, tone assigned.
export type ResolvedSection = WithTone<UntonedSection>

export type SectionType = ResolvedSection["type"]
export type SectionOf<T extends SectionType> = Extract<ResolvedSection, { type: T }>

