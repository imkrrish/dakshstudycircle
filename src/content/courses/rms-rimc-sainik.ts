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
      eyebrow: "RMS · RIMC · Sainik School entrance",
      heading: ["Preparing your child for defence school entrance exams"],
      subheading:
        "Coaching in Delhi Cantt since 2005, for Class 6, 8 and 9 entry.",
    },
    {
      id: "subjects",
      type: "subjects",
      heading: "What your child will study for each exam",
      // One card per exam entry. Exact ages stay out until the institute
      // confirms the current limits (docs/content-requests.md).
      entries: [
        {
          title: "RMS · Class 6 entry",
          text: "For children in or past Class 5. Intelligence, General Knowledge, Maths and English, at Class 5 level.",
        },
        {
          title: "RMS · Class 9 entry",
          text: "For children in or past Class 8. English, Hindi, Social Science, Maths and Science, at Class 8 level.",
        },
        {
          title: "RIMC · Class 8 entry",
          text: "For children in or past Class 7. Maths, General Knowledge and English, then a viva.",
        },
        {
          title: "Sainik Schools · Class 6 and 9 entry",
          text: "We prepare your child for the AISSEE. Please check the latest NTA notice for eligibility, subjects and pattern.",
        },
      ],
    },
    {
      id: "how-we-teach",
      type: "teaching-plan",
      heading: "Ready well before the entrance exam",
      steps: [
        {
          icon: "book",
          lead: "Every exam topic taught,",
          title: "finished early",
        },
        {
          icon: "note-edit",
          lead: "Revision and regular tests",
          title: "all year round",
        },
        {
          icon: "school",
          lead: "On entrance exam day, your child",
          title: "walks in prepared",
          destination: true,
        },
      ],
    },
    {
      id: "results",
      type: "results-board",
      heading: "Entrance exam results",
      boardTitle: "Honour Board",
      perYear: 8,
      years: 1,
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
      heading: "Questions parents ask",
      intro:
        "Short answers to what parents ask most. Rules change every year, so please check the latest official notice.",
      items: [
        {
          question: "How does RMS admission work?",
          answer:
            "There are 5 RMS schools, for boys and girls. For Class 6, your child should be in or have passed Class 5; for Class 9, Class 8. Selection is a written OMR test, then a merit list and interview, then a medical. Forms usually open in September–October and the exam is usually in December. Please check the age limits in the latest notice.",
        },
        {
          question: "How does RIMC admission work?",
          answer:
            "RIMC, Dehradun, admits boys and girls to Class 8. Your child should be in or have passed Class 7. The exam is held in June and December: Maths, General Knowledge and English, then a viva and a medical. You send the form to your state government.",
        },
        {
          question: "How do Sainik School admissions work?",
          answer:
            "Entry to Class 6 and 9 is through the AISSEE, run by NTA. For eligibility, pattern and dates, please check the latest official notification.",
        },
        {
          question: "How are classes run?",
          answer:
            "Batches of about 10 to 20. We teach only the subjects in the entrance exam, with study material. Classes run at our centre in Delhi Cantt, online, or as home tuition.",
        },
        {
          question: "Can my child attend a demo class?",
          answer:
            "Yes. For offline classes, your child can attend free demo classes until you are satisfied. Then you decide.",
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
