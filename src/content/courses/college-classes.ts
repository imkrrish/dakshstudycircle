import type { Course } from "@/lib/content-schema"
import { courseCta } from "./shared"

// Open [CONFIRM] items:
// - Subjects, mode (offline/online), batch size, timings, fees
// - Faculty (facultyIds)

export const collegeClasses: Course = {
  slug: "college-classes",
  title: "College classes",
  summary:
    "College tuition for B.A., B.Com. and B.Sc. students at our Sadar Bazaar centre, opposite the bus\u00a0stand.",
  cardNote: "Classes for B.A., B.Com. and B.Sc. students",
  classes: ["College"],
  subjects: [],
  facultyIds: [],
  order: 9,
  seo: {
    title: "College Classes: B.A., B.Com., B.Sc.",
    description:
      "Classes for B.A., B.Com. and B.Sc. students at Daksh Study Circle, Sadar Bazaar, Delhi Cantt. Call or WhatsApp us to ask about subjects and batches.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      size: "compact",
      media: {
        shot: "College students studying at a table with books and notes · landscape 3:2 · from behind at chest height · daylight with the lights on",
      },
      eyebrow: "B.A., B.Com., B.Sc.",
      heading: ["Support for your college studies"],
      subheading:
        "Classes for college students at our centre in Sadar Bazaar, Delhi Cantt.",
    },
    courseCta,
  ],
}
