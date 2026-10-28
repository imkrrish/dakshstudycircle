import type { Faculty } from "@/lib/content-schema"

export const faculty: Faculty[] = [
  {
    id: "anil-kumar",
    name: "Anil Kumar",
    role: "Director",
    subjects: ["Maths"],
    classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
    isDirector: true,
    order: 1,
  },
  // SAMPLE: a full example of a real record, every field filled. Everything
  // below except `subjects` (recorded as "Science / Physics") is invented
  // placeholder text. Shows in development only; delete `sample` and replace
  // each value once the institute sends the real details
  // (see docs/content-requests.md).
  {
    // Lowercase name with hyphens; never changes once courses refer to it.
    id: "pathak-sir",
    sample: true,
    // NEEDED: his full name as he wants it printed (we only know "Pathak Sir").
    name: "SAMPLE Full Name Pathak",
    // NEEDED: his job title, as the institute uses it.
    role: "Science teacher (SAMPLE)",
    // NEEDED: confirm the subjects. Recorded as "Science / Physics": Science for
    // Classes 9–10 is what puts him on the Science row; Physics is for 11–12.
    subjects: ["Science", "Physics"],
    // NEEDED: which classes he teaches (unknown; 9–10 assumed for this example).
    classes: ["Class 9", "Class 10"],
    // NEEDED: degrees and certificates, one line.
    qualification: "SAMPLE M.Sc. Physics, B.Ed.",
    // NEEDED: how long he has taught, in his words or the director's.
    experience: "SAMPLE 10 years of teaching",
    // NEEDED: two or three true sentences about how he teaches; no claims we
    // cannot back up (no ranks or "best").
    bio: "SAMPLE: Teaches Science to Classes 9 and 10 and Physics to older students. Replace with a real bio from the institute.",
    // NEEDED: a real photo ({ src, alt, width, height }) once taken. Leave out
    // until then; the shot brief below is shown in development.
    photoShot:
      "SAMPLE: Pathak Sir at the board explaining a Science diagram · portrait 4:5 · head and shoulders, daylight, plain background",
    // Only the director is true.
    isDirector: false,
    // Order on the faculty page: the director first, then 2, 3, …
    order: 2,
  },
  // SAMPLE records below: invented placeholders so every subject row shows a
  // teacher in development. They are removed in production. Replace each with
  // the real teacher (docs/content-requests.md).
  {
    id: "sample-maths-junior",
    sample: true,
    // NEEDED: the teacher's full name as they want it printed.
    name: "SAMPLE Full Name Maths Junior",
    // NEEDED: job title, as the institute uses it.
    role: "Maths teacher (SAMPLE)",
    // NEEDED: confirm the subjects, named as in the course data.
    subjects: ["Maths"],
    // NEEDED: which classes they take.
    classes: [
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
      "Class 6",
      "Class 7",
      "Class 8",
    ],
    // NEEDED: degrees and certificates, one line.
    qualification: "SAMPLE B.Sc. Mathematics, B.Ed.",
    // NEEDED: how long they have taught.
    experience: "SAMPLE 8 years of teaching",
    // NEEDED: two or three true sentences about how they teach; no ranks or "best".
    bio: "SAMPLE: Teaches Maths to Classes 1 to 8. Replace with a real bio from the institute.",
    // NEEDED: a real photo once taken; this brief shows in development only.
    photoShot:
      "SAMPLE: Maths teacher at the board with a junior batch · portrait 4:5 · head and shoulders, daylight, plain background",
    isDirector: false,
    order: 3,
  },
  {
    id: "sample-science-junior",
    sample: true,
    // NEEDED: the teacher's full name as they want it printed.
    name: "SAMPLE Full Name Science Junior",
    // NEEDED: job title, as the institute uses it.
    role: "Science teacher (SAMPLE)",
    // NEEDED: confirm the subjects, named as in the course data.
    subjects: ["Science"],
    // NEEDED: which classes they take.
    classes: [
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
      "Class 6",
      "Class 7",
      "Class 8",
    ],
    // NEEDED: degrees and certificates, one line.
    qualification: "SAMPLE B.Sc. Chemistry, B.Ed.",
    // NEEDED: how long they have taught.
    experience: "SAMPLE 7 years of teaching",
    // NEEDED: two or three true sentences about how they teach; no ranks or "best".
    bio: "SAMPLE: Teaches Science to Classes 1 to 8. Replace with a real bio from the institute.",
    // NEEDED: a real photo once taken; this brief shows in development only.
    photoShot:
      "SAMPLE: Science teacher holding a classroom model · portrait 4:5 · head and shoulders, daylight, plain background",
    isDirector: false,
    order: 4,
  },
  {
    id: "sample-english-teacher",
    sample: true,
    // NEEDED: the teacher's full name as they want it printed.
    name: "SAMPLE Full Name English",
    // NEEDED: job title, as the institute uses it.
    role: "English teacher (SAMPLE)",
    // NEEDED: confirm the subjects, named as in the course data.
    subjects: ["English", "Spoken English"],
    // NEEDED: which classes they take.
    classes: [
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
      "Class 6",
      "Class 7",
      "Class 8",
      "Class 9",
      "Class 10",
      "Class 11",
      "Class 12",
    ],
    // NEEDED: degrees and certificates, one line.
    qualification: "SAMPLE M.A. English, B.Ed.",
    // NEEDED: how long they have taught.
    experience: "SAMPLE 9 years of teaching",
    // NEEDED: two or three true sentences about how they teach; no ranks or "best".
    bio: "SAMPLE: Teaches English and Spoken English. Replace with a real bio from the institute.",
    // NEEDED: a real photo once taken; this brief shows in development only.
    photoShot:
      "SAMPLE: English teacher with a book in hand · portrait 4:5 · head and shoulders, daylight, plain background",
    isDirector: false,
    order: 5,
  },
  {
    id: "sample-college-teacher",
    sample: true,
    // NEEDED: the teacher's full name as they want it printed.
    name: "SAMPLE Full Name College",
    // NEEDED: job title, as the institute uses it.
    role: "College classes teacher (SAMPLE)",
    // NEEDED: confirm the subjects, named as in the course data.
    subjects: ["B.A.", "B.Com."],
    // NEEDED: which classes they take.
    classes: ["College"],
    // NEEDED: degrees and certificates, one line.
    qualification: "SAMPLE M.A., M.Com.",
    // NEEDED: how long they have taught.
    experience: "SAMPLE 6 years of teaching",
    // NEEDED: two or three true sentences about how they teach; no ranks or "best".
    bio: "SAMPLE: Teaches college students of open and distance degrees. Replace with a real bio from the institute.",
    // NEEDED: a real photo once taken; this brief shows in development only.
    photoShot:
      "SAMPLE: College classes teacher at a table with books · portrait 4:5 · head and shoulders, daylight, plain background",
    isDirector: false,
    order: 6,
  },
]
