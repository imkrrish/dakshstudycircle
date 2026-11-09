import type { Page } from "@/lib/content"

// The hero photo is gallery entry "classroom-empty-desks"; its alt and size must
// match that entry (checked when the content loads).
export const gallery: Page = {
  slug: "gallery",
  seo: {
    title: "Photos of Daksh Study Circle, Sadar Bazaar, Delhi Cantt",
    absoluteTitle: true,
    description:
      "See the classrooms, tests and events at Daksh Study Circle in Sadar Bazaar, Delhi Cantt.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Gallery" }],
      eyebrow: "Gallery",
      heading: ["Inside Daksh Study Circle"],
      subheading: "Classrooms, tests and events at the centre in Sadar Bazaar.",
      media: {
        image: {
          src: "/images/daksh-images/13-img.avif",
          alt: "An empty classroom with rows of blue desks and balloons on the wall",
          width: 2048,
          height: 1360,
        },
        shot: "Empty classroom with rows of blue desks · landscape 3:2 · daylight",
      },
    },
    {
      id: "gallery",
      type: "gallery",
      groups: [
        { group: "the-centre", heading: "The centre" },
        { group: "classrooms", heading: "Classrooms" },
        { group: "tests", heading: "Tests" },
        { group: "events", heading: "Events" },
      ],
    },
    {
      id: "cta",
      type: "cta-band",
      variant: "dark",
      heading: "Let's find the right class for your child",
      body: "Call or WhatsApp us, or drop by the centre. We'll help you choose the right course and batch for your child. Your child can try our offline classes free before you decide.",
      actions: [
        {
          label: "Talk to us",
          variant: "primary",
          action: { type: "contact-dialog" },
        },
        {
          label: "Get directions",
          variant: "outline",
          action: { type: "directions" },
        },
      ],
      showHours: true,
    },
  ],
}
