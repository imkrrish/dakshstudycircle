import type { Course } from "@/lib/content-schema"
import { classes1To5 } from "./classes-1-5"
import { classes6To8 } from "./classes-6-8"
import { classes9To10 } from "./classes-9-10"
import { class11To12Science } from "./class-11-12-science"
import { class11To12Commerce } from "./class-11-12-commerce"
import { class11To12Humanities } from "./class-11-12-humanities"
import { rmsRimcSainik } from "./rms-rimc-sainik"
import { spokenEnglish } from "./spoken-english"
import { collegeClasses } from "./college-classes"

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
  collegeClasses,
]
