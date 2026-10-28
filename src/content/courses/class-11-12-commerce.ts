import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - The subject split by stream is NOT confirmed by the institute: it follows the usual
//   CBSE groupings from the pamphlet's subject list (docs/content-requests.md).
// - Computer Science language (C++ or Python) and whether Informatics Practices is taught
//   for this stream.
// - Teachers other than Anil Kumar are SAMPLE records (shown in development only).

export const class11To12Commerce: Course = {
  slug: "class-11-12-commerce",
  title: "Class 11–12 Commerce",
  summary: "CBSE Class 11 and 12 Commerce, from Accountancy to Economics.",
  cardNote: "Accountancy, Business Studies, Economics, Maths",
  classes: ["Class 11", "Class 12"],
  subjects: [
    "Accountancy",
    "Business Studies",
    "Economics",
    "Mathematics",
    "English",
    "Informatics Practices",
  ],
  facultyIds: [
    "anil-kumar",
    "sample-commerce-teacher",
    "sample-english-teacher",
    "sample-computer-teacher",
  ],
  // Pamphlet: Rs 25,000 per subject, per session up to the final exams.
  fees: {
    rows: [
      { label: "Class 11", amount: 25000, per: "subject", period: "session" },
      { label: "Class 12", amount: 25000, per: "subject", period: "session" },
    ],
  },
  order: 5,
  seo: {
    title: "Class 11–12 Commerce Tuition, Delhi Cantt",
    description:
      "CBSE Class 11 and 12 Commerce coaching in Delhi Cantt. Accountancy, Business Studies, Economics and Maths. Free demo for offline classes.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "Commerce · landscape 3:2 · camera at desk height, side-on, on a student's notebook and calculator · warm, even indoor light",
      },
      eyebrow: "Class 11–12 Commerce",
      heading: ["Get comfortable with accounts, business and numbers"],
      subheading:
        "Accountancy, Business Studies and Economics for CBSE Classes 11 and 12. Maths is taught by our director, Anil Kumar.",
      facts: {
        items: [
          { label: "Classes", value: "{classes}" },
          { label: "Subjects", value: "{subjectCount}" },
          { label: "Free demo", value: "{freeDemo}" },
          { label: "Fee", value: "Rs 25,000 per subject" },
        ],
      },
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "Subjects you can take",
      intro:
        "Join the subjects you need, and no more. Check your school's combination first.",
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      tone: "band",
      eyebrow: "How we teach",
      heading: "How we teach Commerce",
      items: [
        {
          title: "Syllabus finished early",
          body: "We finish the syllabus early, so there is time to practise accounts and numerical questions.",
        },
        {
          title: "Revision all year",
          body: "Revision continues through the year, so concepts stay fresh.",
        },
        {
          title: "Regular tests",
          body: "Regular tests show what is clear and what needs more work.",
        },
        {
          title: "Study material",
          body: "Study material is part of the tuition, for each subject you join.",
        },
      ],
    },
    {
      id: "videos",
      type: "video-player",
      eyebrow: "Free on YouTube",
      heading: "Maths with Anil Sir, free on YouTube",
      intro:
        "If you take Maths, watch the free Class 11 Maths and Class 12 Maths playlists by Anil Sir.",
      videos: ["class-11-maths", "class-12-maths"],
      defaultVideo: "class-11-maths",
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
      heading: "Fees for Classes 11 and 12",
    },
    {
      id: "faq",
      type: "faq",
      eyebrow: "Questions",
      heading: "Questions about Class 11–12 Commerce",
      intro:
        "Short answers for parents and students. If yours is not here, call or WhatsApp us on {phones}.",
      items: [
        {
          question: "Which Commerce subjects do you teach?",
          answer:
            "Accountancy, Business Studies, Economics, Mathematics, English and Informatics Practices.",
        },
        {
          question: "Who teaches Maths for Commerce?",
          answer:
            "Anil Kumar, the director. He also teaches Maths for Classes 9 to 12.",
        },
        {
          question: "Do I have to join every subject?",
          answer:
            "No. The fee is per subject, so you can join the subjects you need. Check your school's combination.",
        },
        {
          question: "Does CBSE have a Commerce stream?",
          answer:
            "As per CBSE guidance, CBSE has no official streams. Schools offer subject combinations. Please check what your school offers.",
        },
        {
          question: "What is the fee for two subjects?",
          answer:
            "Rs 25,000 per subject, per session, up to the final exams. For two subjects, that is Rs 50,000.",
        },
        {
          question: "Can I try a class first?",
          answer:
            "Yes, for offline classes at {address}. It is free until your child is satisfied and ready to join. Call us on {phones} ({hours}). Yes. You can choose offline classes at the centre, online classes or home tuition. The free demo is for offline classes only.",
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
