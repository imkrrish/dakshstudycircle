import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Batch timings, duration
// - Pathak Sir is a SAMPLE faculty record (shown in development only): needs his
//   real details before launch (docs/content-requests.md).

export const classes9To10: Course = {
  slug: "classes-9-10",
  title: "Classes 9–10",
  summary:
    "CBSE tuition for Classes 9–10 with regular tests, and Maths taught by our director, Anil\u00a0Kumar.",
  cardNote: "Five subjects, leading up to the Class 10 boards",
  classes: ["Class 9", "Class 10"],
  subjects: ["Maths", "Science", "English", "Hindi", "Social Studies"],
  facultyIds: ["anil-kumar", "pathak-sir"],
  // Pamphlet: Rs 18,000 per subject, per session up to the final exams.
  fees: {
    rows: [
      { label: "Class 9", amount: 18000, per: "subject", period: "session" },
      { label: "Class 10", amount: 18000, per: "subject", period: "session" },
    ],
  },
  order: 3,
  seo: {
    title: "Classes 9–10 CBSE Tuition, Delhi Cantt",
    description:
      "Class 9 and 10 CBSE tuition in Delhi Cantt: Maths, Science, English, Hindi, Social Studies. Syllabus finished early, then revision for the boards.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Anil Sir teaching Maths at the board to a Class 9–10 batch · landscape 3:2 · from the back corner at chest height, students seen from behind · daylight with the lights on, clean board",
      },
      eyebrow: "Classes 9–10 · CBSE",
      heading: ["Getting ready for the Class 10 boards"],
      subheading:
        "Maths, Science, English, Hindi and Social Studies for Classes 9 and 10, in Delhi Cantt.",
      facts: {
        items: [
          { label: "Classes", value: "{classes}" },
          { label: "Subjects", value: "{subjectCount}" },
          { label: "Batch size", value: "{batchSize}" },
          { label: "Free demo", value: "{freeDemo}" },
        ],
      },
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "Five subjects for Classes 9 and 10",
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      tone: "band",
      eyebrow: "How we teach",
      heading: "A plan that runs the whole year",
      items: [
        {
          title: "Syllabus finished early",
          body: "We complete the syllabus early. Revision runs through the whole year, not just before the exams.",
        },
        {
          title: "Regular tests",
          body: "Regular tests are part of the tuition, so your child sees what is clear and what needs more work.",
        },
        {
          title: "Study material",
          body: "Study material is part of the tuition, so your child has material to work from.",
        },
      ],
    },
    {
      id: "videos",
      type: "video-player",
      eyebrow: "Free on YouTube",
      heading: "Watch Maths with Anil Sir",
      intro:
        "Anil Sir has made free Maths playlists for Class 9 and Class 10 on YouTube. They cover Maths only.",
      videos: ["class-9-maths", "class-10-maths"],
      defaultVideo: "class-10-maths",
      actions: [
        {
          label: "Visit our YouTube channel",
          variant: "outline",
          action: { type: "social", platform: "youtube" },
        },
      ],
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fees for Classes 9 and 10",
    },
    {
      id: "faq",
      type: "faq",
      eyebrow: "Questions",
      heading: "Questions about Classes 9–10",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        {
          question: "Can my child attend a demo class?",
          answer:
            "Yes. Offline demo classes are held at the centre, {address}. They are free until your child is satisfied and ready to join.",
        },
        {
          question: "Who teaches Maths?",
          answer: "Director Anil Kumar teaches Maths for Classes 9 to 12.",
        },
        {
          question: "Are there regular tests and study material?",
          answer:
            "Yes. Regular tests and study material are part of the tuition.",
        },
        {
          question: "How many students are in a batch?",
          answer: "Batches are about 10 to 20 students.",
        },
        {
          question: "Are online classes or home tuition available?",
          answer:
            "Yes. You can choose offline classes at the centre, online classes or home tuition. The free demo is for offline classes only.",
        },
        {
          question: "What are the fees?",
          answer:
            "Fees depend on the class and course. Please call or WhatsApp us on {phones} and we will tell you.",
        },
      ],
    },
    courseCta,
  ],
}
