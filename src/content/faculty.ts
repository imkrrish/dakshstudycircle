import type { Faculty } from "@/lib/content"

// Anil Kumar is the only real record. Every other record is an invented
// example (`sample: true`): shown in development, removed from production.
// `order` drives the teachers grid: junior stage first, then Classes 9–12.
// Replace each with the real teacher once the institute sends the details
// (docs/content-requests.md).
export const faculty: Faculty[] = [
  {
    id: "anil-kumar",
    name: "Anil Kumar",
    role: "Director",
    // "Maths" matches Classes 9–10; "Mathematics" matches Classes 11–12.
    subjects: ["Maths", "Mathematics"],
    classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
    // [CONFIRM] qualification, teachingSince and joinedYear: not in any source yet.
    bio: "Anil Kumar is the Director of Daksh Study Circle. Students and parents know him as Anil Sir.",
    photo: {
      src: "/images/people/anildaksh-portrait-crop.jpg",
      alt: "Anil Kumar, Director",
      width: 960,
      height: 1200,
    },
    isDirector: true,
    order: 1,
  },
  {
    id: "vivek-pathak",
    sample: true,
    // [CONFIRM] Only "Pathak Sir" and his subjects are known; the rest is invented.
    name: "Vivek Pathak",
    role: "Physics and Science teacher",
    // Science is for Classes 9–10, Physics for 11–12.
    subjects: ["Physics", "Science"],
    classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
    qualification: "M.Sc. Physics, B.Ed.",
    teachingSince: 2010,
    joinedYear: 2012,
    bio: "Starts each chapter with a daily-life example before the formulas. Numericals are solved step by step in class, so students know how to begin on their own.",
    photo: {
      src: "/images/people/sample/faculty-vivek-pathak.jpg",
      alt: "Vivek Pathak, Physics and Science teacher",
      width: 717,
      height: 896,
    },
    isDirector: false,
    order: 3,
  },
  {
    id: "shalini-mehra",
    sample: true,
    // [CONFIRM] Teacher, subjects and classes are not known yet.
    name: "Shalini Mehra",
    role: "Chemistry and Biology teacher",
    subjects: ["Chemistry", "Biology"],
    classes: ["Class 11", "Class 12"],
    qualification: "M.Sc. Chemistry, B.Ed.",
    teachingSince: 2015,
    joinedYear: 2017,
    bio: "Breaks long chapters into short topics with clear diagrams. Reactions and NCERT lines are revised often, so nothing is left for the last week.",
    photo: {
      src: "/images/people/sample/faculty-shalini-mehra.jpg",
      alt: "Shalini Mehra, Chemistry and Biology teacher",
      width: 627,
      height: 784,
    },
    isDirector: false,
    order: 5,
  },
  {
    id: "deepak-arora",
    sample: true,
    // [CONFIRM] Teacher, subjects and classes are not known yet.
    name: "Deepak Arora",
    role: "Commerce teacher",
    subjects: ["Accountancy", "Economics", "Business Studies"],
    classes: ["Class 11", "Class 12"],
    qualification: "M.Com., B.Ed.",
    teachingSince: 2012,
    joinedYear: 2015,
    bio: "Teaches accounts through worked entries from small shop examples. Students write answers in the board-exam format from the first month.",
    photo: {
      src: "/images/people/sample/faculty-deepak-arora.jpg",
      alt: "Deepak Arora, Commerce teacher",
      width: 592,
      height: 740,
    },
    isDirector: false,
    order: 6,
  },
  {
    id: "anjali-malhotra",
    sample: true,
    // [CONFIRM] Teacher, subjects and classes are not known yet. Spoken English
    // is a course for students under 20, not for a class range.
    name: "Anjali Malhotra",
    role: "English teacher",
    subjects: ["English", "Spoken English"],
    classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
    qualification: "M.A. English, B.Ed.",
    teachingSince: 2017,
    joinedYear: 2019,
    bio: "Helps students write clear answers, letters and essays in their own words. In Spoken English, every student speaks in every class, in small groups first.",
    photo: {
      src: "/images/people/sample/faculty-anjali-malhotra.jpg",
      alt: "Anjali Malhotra, English teacher",
      width: 550,
      height: 688,
    },
    isDirector: false,
    order: 4,
  },
  {
    id: "sanjay-bisht",
    sample: true,
    // [CONFIRM] Teacher, subjects and classes are not known yet. Science is
    // called EVS in Classes 1–5; courses use "Science" for Classes 1–8.
    name: "Sanjay Bisht",
    role: "Junior classes teacher",
    subjects: ["Maths", "Science", "English"],
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
    qualification: "B.Sc., B.Ed.",
    teachingSince: 2019,
    joinedYear: 2020,
    bio: "Keeps lessons simple and patient, with short daily practice. Younger children learn EVS through things they see at home and around them.",
    photo: {
      src: "/images/people/sample/faculty-sanjay-bisht.jpg",
      alt: "Sanjay Bisht, teacher for Classes 1 to 8",
      width: 270,
      height: 337,
    },
    isDirector: false,
    order: 2,
  },
]
