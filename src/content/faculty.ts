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
]
