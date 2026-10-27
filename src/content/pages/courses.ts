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
      eyebrow: "Courses in Delhi Cantt",
      heading: ["One centre,", "from Class 1 to college"],
      subheading:
        "CBSE tuition for Classes 1–12, RMS, RIMC and Sainik School entrance preparation, Spoken English and college classes. Every batch is about 10–20 students.",
    },
    {
      id: "courses",
      type: "course-grid",
      variant: "full",
      eyebrow: "Choose a course",
      heading: "Every course we teach",
      intro:
        "Open a course to see its subjects and how classes run. Not sure which one fits? We'll help you choose.",
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
