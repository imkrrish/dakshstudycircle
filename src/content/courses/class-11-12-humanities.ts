import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - The subject split by stream is NOT confirmed by the institute: it follows the usual
//   CBSE groupings from the pamphlet's subject list (docs/content-requests.md).
// - Computer Science language (C++ or Python) and whether Informatics Practices is taught
//   for this stream.
// - Teachers other than Anil Kumar are invented records (sample: true, development only).

export const class11To12Humanities: Course = {
  slug: "class-11-12-humanities",
  title: "Class 11–12 Humanities",
  summary:
    "CBSE Class 11 and 12 Humanities: Political Science, Economics and English.",
  cardNote: "Political Science, Economics and English",
  classes: ["Class 11", "Class 12"],
  subjects: ["Political Science", "Economics", "English"],
  facultyIds: [
    "deepak-arora",
    "anjali-malhotra",
  ],
  // Pamphlet: Rs 25,000 per subject, per session up to the final exams.
  fees: {
    rows: [
      { label: "Class 11", amount: 25000, per: "subject", period: "session" },
      { label: "Class 12", amount: 25000, per: "subject", period: "session" },
    ],
  },
  order: 6,
  seo: {
    title: "Class 11–12 Humanities Tuition, Delhi Cantt",
    description:
      "CBSE Class 11 and 12 Humanities coaching in Delhi Cantt. Political Science, Economics and English. Free demo for offline classes.",
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
        shot: "Humanities · landscape 3:2 · camera at eye level across a table, on students with open books · soft natural light",
      },
      eyebrow: "Classes 11–12 · Humanities",
      heading: ["Getting ready for the Class 12 boards"],
      subheading: "Coaching CBSE students in Delhi Cantt since 2005.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "What your child will study",
      summaries: [
        {
          subject: "Political Science",
          text: "The Indian Constitution, political theory and world politics.",
        },
        {
          subject: "Economics",
          text: "Microeconomics, macroeconomics, statistics for economics and Indian economic development.",
        },
        {
          subject: "English",
          text: "Reading comprehension, writing skills and the literature chapters.",
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
      heading: "Class 12 board results",
      boardTitle: "Honour Board",
      perYear: 8,
      years: 1,
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fees for Classes 11 and 12",
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
