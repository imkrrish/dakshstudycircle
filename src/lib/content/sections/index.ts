import { z } from "zod"
import { HeroSectionSchema, type HeroSection } from "./hero"
import { SplitSectionSchema } from "./split"
import { CardGridSectionSchema } from "./card-grid"
import { ReasonListSectionSchema } from "./reason-list"
import { CourseGridSectionSchema, ResolvedCourseGridSectionSchema, type CourseGridSection, type ResolvedCourseGridSection } from "./course-grid"
import { VideoPlayerSectionSchema, ResolvedVideoPlayerSectionSchema, type VideoPlayerSection, type ResolvedVideoPlayerSection } from "./video-player"
import { ResultsGridSectionSchema, ResolvedResultsGridSectionSchema, type ResultsGridSection, type ResolvedResultsGridSection } from "./results-grid"
import { ResultsBoardSectionSchema, ResolvedResultsBoardSectionSchema, type ResultsBoardSection, type ResolvedResultsBoardSection } from "./results-board"
import { TestimonialGridSectionSchema, ResolvedTestimonialGridSectionSchema, type TestimonialGridSection, type ResolvedTestimonialGridSection } from "./testimonial-grid"
import { FaqSectionSchema, type FaqSection } from "./faq"
import { CtaBandSectionSchema } from "./cta-band"
import { SubjectsSectionSchema, ResolvedSubjectsSectionSchema, type SubjectsSection, type ResolvedSubjectsSection } from "./subjects"
import { TeachingPlanSectionSchema, type TeachingPlanSection } from "./teaching-plan"
import { FeesSectionSchema, ResolvedFeesSectionSchema, type FeesSection, type ResolvedFeesSection } from "./fees"
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

export {
  HeroSectionSchema,
  SplitSectionSchema,
  CardGridSectionSchema,
  ReasonListSectionSchema,
  CourseGridSectionSchema,
  ResolvedCourseGridSectionSchema,
  VideoPlayerSectionSchema,
  ResolvedVideoPlayerSectionSchema,
  ResultsGridSectionSchema,
  ResolvedResultsGridSectionSchema,
  ResultsBoardSectionSchema,
  ResolvedResultsBoardSectionSchema,
  TestimonialGridSectionSchema,
  ResolvedTestimonialGridSectionSchema,
  FaqSectionSchema,
  CtaBandSectionSchema,
  SubjectsSectionSchema,
  ResolvedSubjectsSectionSchema,
  TeachingPlanSectionSchema,
  FeesSectionSchema,
  ResolvedFeesSectionSchema,
  LinkListSectionSchema,
}

export type {
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

