import type { ReactNode } from "react"
import type { ResolvedSection, SectionOf, SectionType } from "@/lib/content"
import { BoardResultsSection } from "./board-results-section"
import { CourseGridSection } from "./course-grid-section"
import { CtaBandSection } from "./cta-band-section"
import { FaqSection } from "./faq-section"
import { FeesSection } from "./fees-section"
import { HeroSection } from "./hero-section"
import { LinkListSection } from "./link-list-section"
import { PeopleGridSection } from "./people-grid-section"
import { PersonFeatureSection } from "./person-feature-section"
import { ReasonListSection } from "./reason-list-section"
import { ResultsBoardSection } from "./results-board-section"
import { SplitSection } from "./split-section"
import { SubjectsSection } from "./subjects-section"
import { TeachingPlanSection } from "./teaching-plan-section"
import { TestimonialGridSection } from "./testimonial-grid-section"
import { VideoPlayerSection } from "./video-player-section"

type SectionComponents = {
  [T in SectionType]: (props: { section: SectionOf<T> }) => ReactNode
}

// A missing key here is a type error.
const sectionComponents = {
  hero: HeroSection,
  split: SplitSection,
  "reason-list": ReasonListSection,
  "course-grid": CourseGridSection,
  "video-player": VideoPlayerSection,
  "board-results": BoardResultsSection,
  "results-board": ResultsBoardSection,
  "testimonial-grid": TestimonialGridSection,
  faq: FaqSection,
  "cta-band": CtaBandSection,
  subjects: SubjectsSection,
  "teaching-plan": TeachingPlanSection,
  fees: FeesSection,
  "link-list": LinkListSection,
  "person-feature": PersonFeatureSection,
  "people-grid": PeopleGridSection,
} satisfies SectionComponents

function SectionRenderer({ sections }: { sections: ResolvedSection[] }) {
  return sections.map((section) => {
    // TS can't correlate section.type with the matching component through the
    // lookup. Safe: the lookup is keyed by that same `type` discriminant.
    const Component = sectionComponents[section.type] as (props: {
      section: ResolvedSection
    }) => ReactNode
    return <Component key={section.id} section={section} />
  })
}

export { SectionRenderer }
