import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Hindi / Social Studies for Classes 1–8 (the pamphlet cover says "I–VIII all subjects")
// - Exact fee per class, batch timings
// - Teachers are SAMPLE records (shown in development only): docs/content-requests.md

export const classes1To5: Course = {
  slug: "classes-1-5",
  title: "Classes 1–5",
  summary:
    "CBSE tuition for Classes 1–5 in Maths, Science and English, taught in small batches.",
  cardNote: "Maths, Science and English for young learners",
  classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
  subjects: ["Maths", "Science", "English"],
  facultyIds: [
    "sample-maths-junior",
    "sample-science-junior",
    "sample-english-teacher",
  ],
  fees: {
    rows: [
      {
        label: "Classes 1–5, all three subjects",
        amount: { from: 25000, to: 30000 },
        per: "course",
        period: "session",
        note: "The amount depends on the class and on when in the session your child joins.",
      },
    ],
  },
  order: 1,
  seo: {
    title: "Classes 1–5 CBSE Tuition, Delhi Cantt",
    description:
      "CBSE tuition for Classes 1 to 5 in Delhi Cantt: Maths, Science and English in small batches. Free demo at the centre.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        image: {
          src: "/images/classroom-test-day.avif",
          alt: "Students writing a test at their desks in a Daksh Study Circle classroom",
          width: 1280,
          height: 958,
        },
        shot: "Maths · landscape 3:2 · from the side at child's eye level, a small group at a table with notebooks · soft daylight, tidy room",
      },
      eyebrow: "Classes 1–5 · CBSE",
      heading: ["A steady base for young learners"],
      subheading: "Coaching CBSE students in Delhi Cantt since 2005.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "What your child will study",
      summaries: [
        {
          subject: "Maths",
          text: "Numbers, the four operations, fractions, shapes, measurement, money and time.",
        },
        {
          subject: "Science",
          text: "Environmental studies (EVS): plants, animals, our body, food, water and the world around us.",
        },
        {
          subject: "English",
          text: "Reading, phonics, grammar and simple writing.",
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
      heading: "Fees for Classes 1 to 5",
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
