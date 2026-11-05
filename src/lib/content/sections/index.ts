import { z } from "zod"
import { HeroSectionSchema } from "./hero"
import { SplitSectionSchema } from "./split"
import { CardGridSectionSchema } from "./card-grid"
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
  CardGridSectionSchema,
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
// Sections as components receive them (references resolved).
export type ResolvedSection =
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

export type SectionType = ResolvedSection["type"]
export type SectionOf<T extends SectionType> = Extract<ResolvedSection, { type: T }>

