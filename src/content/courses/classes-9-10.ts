import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Batch timings, duration
// Course pages render only the types in COURSE_TEMPLATE (src/lib/content.ts):
// the videos, fees and official-links sections below are kept but not shown.

export const classes9To10: Course = {
  slug: "classes-9-10",
  title: "Classes 9–10",
  summary:
    "CBSE tuition for Classes 9–10 with regular tests, and Maths taught by our director, Anil\u00a0Kumar.",
  cardNote: "Five subjects, leading up to the Class 10 boards",
  classes: ["Class 9", "Class 10"],
  subjects: ["Maths", "Science", "English", "Hindi", "Social Studies"],
  facultyIds: [
    "anil-kumar",
    "vivek-pathak",
    "anjali-malhotra",
  ],
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
      "CBSE Classes 9 and 10 coaching in Delhi Cantt. Maths, Science, English, Hindi and Social Studies, batches of about 10 to 20 and a free offline demo.",
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
        shot: "Anil Sir teaching Maths at the board to a Class 9–10 batch · landscape 3:2 · from the back corner at chest height, students seen from behind · daylight with the lights on, clean board",
      },
      eyebrow: "Classes 9–10 · CBSE",
      heading: ["Getting ready for the Class 10 boards"],
      subheading: "Coaching CBSE students in Delhi Cantt since 2005.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "What your child will study",
      summaries: [
        {
          subject: "Maths",
          text: "Number systems, algebra, geometry, trigonometry and statistics.",
        },
        {
          subject: "Science",
          text: "Physics, chemistry and biology topics from the CBSE syllabus.",
        },
        {
          subject: "English",
          text: "Reading comprehension, writing skills, grammar and the literature chapters.",
        },
        {
          subject: "Hindi",
          text: "Hindi grammar, letter and essay writing, and the prose and poetry chapters.",
        },
        {
          subject: "Social Studies",
          text: "History, geography, political science and economics.",
        },
      ],
    },
    {
      id: "how-we-teach",
      type: "teaching-plan",
      heading: "Ready well before the boards",
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
          lead: "On board exam day, your child",
          title: "walks in prepared",
          destination: true,
        },
      ],
    },
    {
      id: "results",
      type: "results-board",
      heading: "Class 10 board results",
      boardTitle: "Honour Board",
      perYear: 8,
      years: 1,
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
    {
      id: "official-links",
      type: "link-list",
      eyebrow: "Official links",
      heading: "Official CBSE material",
      intro:
        "Use these CBSE pages to check the syllabus and practise with sample papers.",
      items: [
        {
          label: "CBSE curriculum 2026-27",
          href: "https://cbseacademic.nic.in/curriculum_2027.html",
          purpose: "Syllabus and sample papers, straight from CBSE.",
        },
      ],
    },
    courseCta,
  ],
}
