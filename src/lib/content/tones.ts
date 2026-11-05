import type { ResolvedTone, UntonedSection, ResolvedSection } from "./sections"

// Section backgrounds: no two neighbouring sections share one.
//
// Runs last in `resolveSections()` (after sample/empty sections are dropped),
// so it holds on every page in development and production.
//
// A page author sets a preferred `tone` ("paper" | "muted" | "band") on any
// section in data. A preference is kept unless it equals the section above;
// only then does it fall back:
//   - hero is always paper, a dark cta-band always ink (a light one is band);
//   - paper after paper becomes muted;
//   - muted or band after the same tone becomes paper;
//   - exemption: the section right after a `large` hero keeps its preference.
//     That hero fills the first screen, so its own height separates them.
// Keep muted next to band to a minimum in data: the step is small.
export function assignTones(sections: UntonedSection[]): ResolvedSection[] {
  let previous: ResolvedTone | undefined
  let afterLargeHero = false

  return sections.map((section): ResolvedSection => {
    let tone: ResolvedTone
    if (section.type === "hero") {
      tone = "paper"
    } else if (section.type === "cta-band") {
      tone = section.variant === "dark" ? "ink" : "band"
    } else {
      tone = section.tone ?? "paper"
      if (previous && !afterLargeHero) {
        if (tone === previous) tone = tone === "paper" ? "muted" : "paper"
      }
    }
    afterLargeHero = section.type === "hero" && section.size === "large"
    previous = tone
    return { ...section, tone } as ResolvedSection
  })
}
