import type { Page } from "@/lib/content-schema"

export const home: Page = {
  slug: "home",
  seo: {
    title: "Daksh Study Circle | CBSE Coaching in Delhi Cantt",
    absoluteTitle: true,
    description:
      "CBSE coaching for Classes 1–12 in Sadar Bazaar, Delhi Cantt, since 2005. Personal attention for every student. Talk to us or visit us.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "large",
      eyebrow: "CBSE coaching in Delhi Cantt",
      heading: ["Every child learns differently.", "We teach that way."],
      subheading:
        "Personal attention for every student, from Class 1 to Class 12, in the heart of Sadar Bazaar.",
      proofLine: "Since 2005 · Classes 1–12 · All subjects",
      actions: [
        {
          label: "Talk to us",
          variant: "primary",
          action: { type: "contact-dialog" },
        },
        {
          label: "Explore courses",
          variant: "outline",
          action: { type: "link", href: "/courses" },
        },
      ],
      floatingItems: [
        "emblem",
        "book",
        "compass",
        "atom",
        "flask",
        "formula",
      ],
    },
  ],
}
