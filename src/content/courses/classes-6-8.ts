import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Hindi / Social Studies for Classes 1–8 (the pamphlet cover says "I–VIII all subjects")
// - Exact fee per class, batch timings
// - Teachers other than Anil Kumar are invented records (sample: true, development only).

export const classes6To8: Course = {
  slug: "classes-6-8",
  title: "Classes 6–8",
  summary:
    "CBSE tuition for Classes 6–8 in Maths, Science and English, to build habits before Class 9.",
  cardNote: "Building study habits before Class 9",
  classes: ["Class 6", "Class 7", "Class 8"],
  subjects: ["Maths", "Science", "English"],
  facultyIds: [
    "sanjay-bisht",
  ],
  fees: {
    rows: [
      {
        label: "Classes 6–8, all three subjects",
        amount: { from: 25000, to: 30000 },
        per: "course",
        period: "session",
        note: "The amount depends on the class and on when in the session your child joins.",
      },
    ],
  },
  order: 2,
  seo: {
    title: "Classes 6–8 CBSE Tuition, Delhi Cantt",
    description:
      "CBSE tuition for Classes 6 to 8 in Delhi Cantt: Maths, Science and English. Build good study habits before Class 9. Free demo.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        image: {
          src: "/images/classroom/classroom-test-day.avif",
          alt: "Students writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Science · landscape 3:2 · from the back corner at chest height, students seen from behind at desks · daylight with the lights on, clean board",
      },
      eyebrow: "Classes 6–8 · CBSE",
      heading: ["Good habits for the middle school years"],
      subheading: "Coaching CBSE students in Delhi Cantt since 2005.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "What your child will study",
      summaries: [
        {
          subject: "Maths",
          text: "Integers, fractions and decimals, basic algebra, ratio, geometry, mensuration and data handling.",
        },
        {
          subject: "Science",
          text: "Physics, chemistry and biology basics: materials, motion, light, electricity, plants and animals.",
        },
        {
          subject: "English",
          text: "Reading comprehension, grammar, writing skills and the literature chapters.",
        },
      ],
    },
    {
      id: "how-we-teach",
      type: "teaching-plan",
      heading: "Ready well before the final exams",
      steps: [
        {
          icon: "book",
          lead: "Every chapter taught,",
          title: "finished early",
        },
        {
          icon: "note-edit",
          lead: "Revision and regular tests",
          title: "all year round",
        },
        {
          icon: "school",
          lead: "On final exam day, your child",
          title: "walks in prepared",
          destination: true,
        },
      ],
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fees for Classes 6 to 8",
    },
    {
      id: "faq",
      type: "faq",
      heading: "Questions parents ask",
      intro: "Short answers to what parents ask most.",
      items: [
        {
          question: "Can my child attend a demo class?",
          answer:
            "Yes. For offline classes, your child can attend free demo classes until you are satisfied. Then you decide.",
        },
        {
          question: "How many students are in a batch?",
          answer:
            "About 10 to 20 students, so every child gets attention in class.",
        },
        {
          question: "Are online classes or home tuition available?",
          answer:
            "Yes. Classes run offline at our centre in Delhi Cantt, online, and as home tuition.",
        },
        {
          question: "Do you give study material?",
          answer: "Yes. Study material is part of the tuition.",
        },
        {
          question: "What are the fees?",
          answer:
            "Fees depend on the class and course. Please call or WhatsApp us on {phones}, and we will share the details.",
        },
      ],
    },
    courseCta,
  ],
}
