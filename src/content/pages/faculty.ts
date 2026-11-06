import type { Page } from "@/lib/content"

// [CONFIRM] Only Anil Kumar is a real record; the teachers grid is dropped in
// production while every other faculty record is a sample.
export const faculty: Page = {
  slug: "faculty",
  seo: {
    title: "Faculty: Anil Kumar and Our Teachers, Delhi Cantt",
    description:
      "Meet Anil Kumar, Director of Daksh Study Circle, who teaches Mathematics to Classes 9–12. CBSE coaching at Sadar Bazaar, Delhi Cantt since 2005.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Faculty" }],
      heading: ["The teachers", "of Daksh Study Circle"],
      subheading: "Coaching CBSE students in Delhi Cantt since 2005.",
      media: {
        image: {
          src: "/images/classroom/classroom-test-day.avif",
          alt: "Students from several classes writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Classroom mid-lesson, teacher at the board · landscape 3:2 · from the back corner at chest height, students seen from behind · daylight with the lights on",
      },
    },
    {
      id: "director",
      type: "person-feature",
      person: "anil-kumar",
    },
    {
      id: "teachers",
      type: "people-grid",
      heading: "Who teaches at Daksh",
      show: "all-but-leads",
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
