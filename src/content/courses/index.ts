import type { Course } from "@/lib/content-schema"
import { classes1To5 } from "./classes-1-5"
import { classes6To8 } from "./classes-6-8"
import { classes9To10 } from "./classes-9-10"
import { class11To12Science } from "./class-11-12-science"
import { class11To12Commerce } from "./class-11-12-commerce"
import { class11To12Humanities } from "./class-11-12-humanities"
import { rmsRimcSainik } from "./rms-rimc-sainik"
import { spokenEnglish } from "./spoken-english"

// Home page courses section copy (used in the next step; not rendered yet):
//   eyebrow: "Our courses"
//   heading: "Tuition for every class, from 1 to 12"
//   intro: "CBSE tuition for Classes 1 to 12, plus entrance preparation for defence schools and a
//     Spoken English course. Choose your child's class to begin."
//   grouping: "School tuition" (the 6 CBSE courses: classes-1-5, classes-6-8, classes-9-10,
//     class-11-12-science, class-11-12-commerce, class-11-12-humanities)
//             "Entrance and skills" (rms-rimc-sainik, spoken-english)

// One file per course, imported and listed here.
export const courses: Course[] = [
  classes1To5,
  classes6To8,
  classes9To10,
  class11To12Science,
  class11To12Commerce,
  class11To12Humanities,
  rmsRimcSainik,
  spokenEnglish,
]
