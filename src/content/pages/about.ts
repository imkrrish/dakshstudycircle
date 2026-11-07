import type { Page } from "@/lib/content"

// [CONFIRM] The story and director sections are added after the owner's review
// with the director. Open questions: docs/content-requests.md ("About").
export const about: Page = {
  slug: "about",
  seo: {
    title: "About Daksh Study Circle, Sadar Bazaar, Delhi Cantt",
    absoluteTitle: true,
    description:
      "Daksh Study Circle has taught school and college students in Sadar Bazaar, Delhi Cantt, since July 2005. See how batches, revision, study material and tests run through the year.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "About" }],
      eyebrow: "About Daksh Study Circle",
      heading: ["Your quest for knowledge", "ends here."],
      subheading:
        "Coaching for school and college students in Sadar Bazaar, Delhi Cantt.",
      media: {
        image: {
          src: "/images/classroom/classroom-test-day.avif",
          alt: "Students from several classes writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Classroom test day, students writing at their desks · landscape 4:3 · daylight with the lights on",
      },
    },
    {
      id: "story",
      type: "prose",
      heading: "How Daksh began",
      leadParagraph: true,
      paragraphs: [
        "Daksh Study Circle started in July 2005. Since then, the aim has been to give students good teaching, and over the years it has become a name in coaching that families rely on.",
        "It has come a long way. It still feels like a beginning.",
      ],
    },
    {
      id: "values",
      type: "values",
      heading: "What Daksh believes",
      lines: [
        "Learning should be easy, interesting and meaningful.",
        "Students should grow into aware citizens, not only educated ones.",
        "Students are guided towards their own dreams and careers, not only towards a job.",
      ],
      pullLine: "A home away from home.",
    },
    {
      id: "year",
      type: "point-grid",
      heading: "How a year runs at Daksh",
      items: [
        {
          title: "Batches at different times",
          body: "Classes run in 4 classrooms, with batches at different timings to suit students.",
        },
        {
          title: "Syllabus first, then revision",
          body: "The syllabus is finished early, and revision runs through the whole year.",
        },
        {
          title: "Study material and tests",
          body: "Students get study material and take regular tests, including a test series.",
        },
        {
          title: "Parents stay in touch",
          body: "Parents can call or visit the centre to talk to the teachers.",
        },
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
