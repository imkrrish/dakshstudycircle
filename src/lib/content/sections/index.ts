import { z } from "zod"
import { HeroSectionSchema } from "./hero"
import { SplitSectionSchema } from "./split"
import { ReasonListSectionSchema } from "./reason-list"
import { PointGridSectionSchema } from "./point-grid"
import { ProseSectionSchema } from "./prose"
import {
  CourseGridSectionSchema,
  type ResolvedCourseGridSection,
} from "./course-grid"
import {
  VideoPlayerSectionSchema,
  type ResolvedVideoPlayerSection,
} from "./video-player"
import {
  BoardResultsSectionSchema,
  type ResolvedBoardResultsSection,
} from "./board-results"
import {
  EntranceResultsSectionSchema,
  type ResolvedEntranceResultsSection,
} from "./entrance-results"
import {
  ResultsBoardSectionSchema,
  type ResolvedResultsBoardSection,
} from "./results-board"
import {
  TestimonialGridSectionSchema,
  type ResolvedTestimonialGridSection,
} from "./testimonial-grid"
import { FaqSectionSchema } from "./faq"
import { CtaBandSectionSchema } from "./cta-band"
import { SubjectsSectionSchema, type ResolvedSubjectsSection } from "./subjects"
import { TeachingPlanSectionSchema } from "./teaching-plan"
import { FeesSectionSchema, type ResolvedFeesSection } from "./fees"
import { LinkListSectionSchema } from "./link-list"
import {
  PersonFeatureSectionSchema,
  type ResolvedPersonFeatureSection,
} from "./person-feature"
import {
  PeopleGridSectionSchema,
  type ResolvedPeopleGridSection,
} from "./people-grid"

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  SplitSectionSchema,
  ReasonListSectionSchema,
  PointGridSectionSchema,
  ProseSectionSchema,
  CourseGridSectionSchema,
  VideoPlayerSectionSchema,
  BoardResultsSectionSchema,
  EntranceResultsSectionSchema,
  ResultsBoardSectionSchema,
  TestimonialGridSectionSchema,
  FaqSectionSchema,
  CtaBandSectionSchema,
  SubjectsSectionSchema,
  TeachingPlanSectionSchema,
  FeesSectionSchema,
  LinkListSectionSchema,
  PersonFeatureSectionSchema,
  PeopleGridSectionSchema,
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
          | "board-results"
          | "entrance-results"
          | "results-board"
          | "testimonial-grid"
          | "subjects"
          | "fees"
          | "person-feature"
          | "people-grid"
      }
    >
  | ResolvedCourseGridSection
  | ResolvedVideoPlayerSection
  | ResolvedBoardResultsSection
  | ResolvedEntranceResultsSection
  | ResolvedResultsBoardSection
  | ResolvedTestimonialGridSection
  | ResolvedSubjectsSection
  | ResolvedFeesSection
  | ResolvedPersonFeatureSection
  | ResolvedPeopleGridSection

// The background a section renders with (see tones.ts). "ink" is the dark CTA.
export type ResolvedTone = "paper" | "muted" | "band" | "ink"

type WithTone<T> = T extends unknown
  ? Omit<T, "tone"> & { tone: ResolvedTone }
  : never

// Sections as components receive them: references resolved, tone assigned.
export type ResolvedSection = WithTone<UntonedSection>

export type SectionType = ResolvedSection["type"]
export type SectionOf<T extends SectionType> = Extract<
  ResolvedSection,
  { type: T }
>
