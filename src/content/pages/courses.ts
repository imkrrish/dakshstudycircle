import type { Page } from "@/lib/content-schema"

export const courses: Page = {
  slug: "courses",
  seo: {
    title: "Courses: CBSE Tuition 1–12, Delhi Cantt",
    description:
      "CBSE tuition for Classes 1–12, RMS, RIMC and Sainik School prep, Spoken English and college classes at Sadar Bazaar, Delhi Cantt. Try a free demo class.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Courses" }],
      heading: ["One centre,", "from Class 1 to college"],
      subheading:
        "CBSE tuition for Classes 1–12, RMS, RIMC and Sainik School entrance preparation, Spoken English and college classes. Not sure which one fits? We'll help you choose.",
      media: {
        image: {
          src: "/images/classroom-test-day.avif",
          alt: "Students from several classes writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Classroom mid-lesson, teacher at the board · landscape 3:2 · from the back corner at chest height, students seen from behind · daylight with the lights on",
      },
      facts: {
        items: [
          { label: "Batch size", value: "{batchSize}" },
          { label: "Modes", value: "{modes}" },
          { label: "Free demo", value: "{freeDemo}" },
          { label: "Hours", value: "{hours}" },
        ],
      },
    },
    {
      id: "courses",
      type: "course-grid",
      variant: "full",
      heading: "Every course we teach",
      hideHeading: true,
      groups: [
        {
          label: "School tuition",
          items: [
            { kind: "course", course: "classes-1-5" },
            { kind: "course", course: "classes-6-8" },
            { kind: "course", course: "classes-9-10" },
            {
              kind: "stream-group",
              title: "Classes 11–12",
              note: "Choose your stream",
              courses: [
                "class-11-12-science",
                "class-11-12-commerce",
                "class-11-12-humanities",
              ],
            },
          ],
        },
        {
          label: "Beyond school tuition",
          items: [
            { kind: "course", course: "rms-rimc-sainik" },
            { kind: "course", course: "spoken-english" },
            { kind: "course", course: "college-classes" },
          ],
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
