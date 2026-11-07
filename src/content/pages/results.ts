import type { Page } from "@/lib/content"

export const results: Page = {
  slug: "results",
  seo: {
    title: "Board and entrance results, Delhi Cantt",
    description:
      "CBSE board results and RMS, RIMC and Sainik School entrance selections of Daksh Study Circle students in Sadar Bazaar, Delhi Cantt.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Results" }],
      heading: ["Board marks and", "entrance selections"],
      subheading: "Coaching CBSE students in Delhi Cantt since 2005.",
      media: {
        image: {
          src: "/images/classroom/classroom-test-day.avif",
          alt: "Students from several classes writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Classroom test day, students writing at their desks · landscape 3:2 · daylight with the lights on",
      },
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
