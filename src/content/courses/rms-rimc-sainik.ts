import type { Course } from "@/lib/content"
import { courseCta } from "./shared"

// Entrance facts (ages, selection steps) come from the owner and the research in
// docs/research/c3-content-research.md. Dates change every year, so none are
// printed here; the exam guides will carry them.
//
// Open [CONFIRM] items (docs/content-requests.md):
// - Separate batches by exam or class, interview practice, what the fee includes
// - Session months, boys and girls in the batch
// - Teachers: no faculty record covers these classes yet
// - RIMC official site URL (not in the research doc, so not linked)

export const rmsRimcSainik: Course = {
  slug: "rms-rimc-sainik",
  title: "RMS, RIMC and Sainik School",
  summary:
    "Exam-focused preparation for admission to Class 6 and 9 (RMS, Sainik Schools) and Class 8 (RIMC).",
  cardNote: "Class 6, 8 and 9 entry. Exam subjects only.",
  // The entry classes, not the classes a child is in when applying.
  classes: ["Class 6", "Class 8", "Class 9"],
  subjects: [
    "Intelligence",
    "General Knowledge",
    "Mathematics",
    "English",
    "Hindi",
    "Social Science",
    "Science",
  ],
  facultyIds: [],
  // Owner: Rs 80,000 for the whole session, the same for every entry level.
  fees: {
    rows: [
      {
        label: "Class 6 entry",
        amount: 80000,
        per: "course",
        period: "session",
      },
      {
        label: "Class 8 entry",
        amount: 80000,
        per: "course",
        period: "session",
      },
      {
        label: "Class 9 entry",
        amount: 80000,
        per: "course",
        period: "session",
      },
    ],
    note: "The fee is for the whole session, up to the exam. It is the same for every level and covers the exam-related subjects only.",
  },
  order: 7,
  seo: {
    title: "RMS, RIMC & Sainik School Coaching",
    description:
      "Entrance preparation for RMS, RIMC and Sainik Schools (Class 6, 8 and 9) in Delhi Cantt. Offline, online or home tuition. Free demo for offline classes.",
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
        shot: "Teacher at the board explaining a Maths question to a small group at desks · landscape 3:2 · from the back corner at student eye level, teacher and board in frame · soft natural window light",
      },
      eyebrow: "Defence school entrance",
      heading: ["Entrance preparation for defence schools"],
      subheading:
        "We prepare your child for the written exam for admission to Class 6, 8 and 9. We teach only the subjects the exam asks for, in a small batch.",
    },
    {
      id: "subjects",
      type: "subjects",
      eyebrow: "Subjects",
      heading: "What your child will study",
      intro:
        "Each school has its own exam. We teach the subjects of the exam your child is aiming for, and nothing extra.",
      groups: [
        {
          label: "RMS, Class 6 entry",
          note: "Questions are at Class 5 level.",
          subjects: [
            "Intelligence",
            "General Knowledge",
            "Mathematics",
            "English",
          ],
        },
        {
          label: "RMS, Class 9 entry",
          note: "Questions are at Class 8 level.",
          subjects: [
            "English",
            "Hindi",
            "Social Science",
            "Mathematics",
            "Science",
          ],
        },
        {
          label: "RIMC, Class 8 entry",
          note: "A viva follows the written test.",
          subjects: ["Mathematics", "General Knowledge", "English"],
        },
        {
          label: "Sainik Schools (AISSEE)",
          note: "The subjects follow the latest official NTA notification. Please check it before you plan.",
          subjects: [],
        },
      ],
    },
    {
      id: "how-we-teach",
      type: "reason-list",
      eyebrow: "How we teach",
      heading: "How we prepare your child",
      items: [
        {
          title: "Syllabus finished early",
          body: "We complete the syllabus early, so your child is not rushing near the exam.",
        },
        {
          title: "Revision all year",
          body: "Revision runs through the whole year, not only in the last few weeks.",
        },
        {
          title: "Regular tests",
          body: "Tests are held regularly, so you and your child can see how the preparation is going.",
        },
        {
          title: "Study material",
          body: "Study material is part of the tuition, so your child has material to work from.",
        },
      ],
    },
    {
      id: "fees",
      type: "fees",
      eyebrow: "Fees",
      heading: "Fee for the session",
    },
    {
      id: "faq",
      type: "faq",
      eyebrow: "Questions",
      heading: "Questions about entrance preparation",
      intro:
        "Short answers for parents. Rules and dates change every year, so please confirm them on the official websites. Call or WhatsApp us on {phones} for anything else.",
      items: [
        {
          question: "Which exams does this course cover?",
          answer:
            "RMS (Class 6 and 9), RIMC (Class 8) and Sainik Schools (Class 6 and 9).",
        },
        {
          question: "What are the RMS eligibility and selection steps?",
          answer:
            "There are 5 residential CBSE schools: Chail, Ajmer, Belgaum, Bengaluru and Dholpur. For Class 6, your child should be 10 to 12 years old on 31 March and have passed or be studying in Class 5. For Class 9, the age is 13 to 15 on 31 March, with Class 8 passed or ongoing. Boys and girls can both apply, but seats for girls are limited. Selection is a written test (OMR, multiple choice), then a merit list and interview, then a medical. Forms usually come around September to October and the exam around December. Please check the official notification each year.",
        },
        {
          question: "What are the RIMC eligibility and selection steps?",
          answer:
            "RIMC is in Dehradun and admits to Class 8, for boys and girls. Your child should be studying in or have passed Class 7, and be 11½ to under 13 years old on the term start date. The exam is held twice a year, in June and December: Maths, General Knowledge and English, then a viva, then a medical. The form is submitted to the state government, not to RIMC.",
        },
        {
          question: "How do Sainik School admissions work?",
          answer:
            "Entry to Class 6 and 9 is through the AISSEE exam run by NTA. For eligibility, dates and pattern, please check the latest official NTA notification.",
        },
        {
          question: "Can you promise selection?",
          answer:
            "No. Selection depends only on the official exam and process. We prepare your child for the written test, and we make no promise about marks or selection.",
        },
        {
          question: "How can my child attend, and is there a demo?",
          answer:
            "You can choose offline classes at the centre, online classes or home tuition. A free demo is available for offline classes only, at {address}.",
        },
      ],
    },
    {
      id: "official-links",
      type: "link-list",
      eyebrow: "Official links",
      heading: "Check the official sources",
      intro:
        "Eligibility, dates and forms can change each year. Please confirm them on the official websites.",
      items: [
        {
          label: "RMS official site",
          href: "https://rashtriyamilitaryschools.edu.in",
          purpose: "The schools, admission notice and fees.",
        },
        {
          label: "NTA Sainik School exam page",
          href: "https://exams.nta.nic.in/sainik-school-society/",
          purpose: "AISSEE notification, dates and pattern.",
        },
        {
          label: "Sainik School Society",
          href: "https://sainikschoolsociety.in",
          purpose: "The list of Sainik Schools and general information.",
        },
        {
          label: "AISSAC online counselling",
          href: "https://pesa.ncog.gov.in/sainikschoolecounselling/landingpage",
          purpose:
            "Online counselling for Sainik School admission, after the exam.",
        },
      ],
    },
    courseCta,
  ],
}
