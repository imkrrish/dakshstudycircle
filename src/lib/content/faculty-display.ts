import { yearsOfTeaching, type Faculty } from "./collections/faculty"

// What a visitor reads about a person, built from the faculty record so each
// fact is stored once. Shared by the person-feature and people-grid resolvers.

// The data may spell a subject two ways (e.g. "Maths" for Classes 9–10 and
// "Mathematics" for 11–12); a visitor sees one name, once.
const SUBJECT_NAMES: Record<string, string> = { Maths: "Mathematics" }

function subjectNames(subjects: string[]): string[] {
  return [...new Set(subjects.map((s) => SUBJECT_NAMES[s] ?? s))]
}

function subjectsLabel(subjects: string[]): string {
  return new Intl.ListFormat("en-IN", { type: "conjunction" }).format(
    subjectNames(subjects),
  )
}

// No-break spaces inside a phrase, so a line can only break between phrases.
const glue = (text: string) => text.replace(/ /g, "\u00a0")

function classNumbers(classes: string[]): number[] {
  return classes
    .map((c) => Number.parseInt(c.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b)
}

// ["Class 9", … "Class 12"] → "Classes 9–12"; gaps stay apart: "Classes 9, 11–12".
function classesLabel(classes: string[]): string {
  const nums = classNumbers(classes)
  if (nums.length === 0) return classes.join(", ")
  const runs: string[] = []
  let start = nums[0]
  let prev = nums[0]
  for (const n of [...nums.slice(1), Number.POSITIVE_INFINITY]) {
    if (n !== prev + 1) {
      runs.push(start === prev ? `${start}` : `${start}–${prev}`)
      start = n
    }
    prev = n
  }
  return `${nums.length === 1 ? "Class" : "Classes"}\u00a0${runs.join(", ")}`
}

function experienceLabel(teachingSince?: number): string | undefined {
  if (teachingSince === undefined) return undefined
  // The build year (inlined by next.config.ts), not `new Date()`: a bare
  // Date during prerender is an error with Cache Components.
  const years = yearsOfTeaching(
    teachingSince,
    Number(process.env.NEXT_PUBLIC_BUILD_YEAR),
  )
  if (years < 1) return undefined
  return glue(years === 1 ? "1 year teaching" : `${years} years teaching`)
}

// Fields every person card or feature shows.
export type ResolvedPerson = {
  id: string
  name: string
  role: string
  photo?: Faculty["photo"]
  bio?: string
  // "Mathematics · Classes 9–12"
  teaches: string
  // "Teaches Mathematics in Classes 9–12"
  teachesLine: string
  // "M.Sc. Physics, B.Ed. · 16 years teaching"; each part only if known.
  background?: string
  // Card lines for the teacher grid. Subjects: "Physics and Science"; a
  // subject name never breaks. Quiet line: "Classes 9–12 · M.Sc. Physics,
  // B.Ed. · 16 years teaching"; each part never breaks inside, and the dot
  // stays with the part before it, so a line never starts with a separator.
  subjectsLine: string
  quietLine: string
}

export function resolvePerson(f: Faculty): ResolvedPerson {
  const subjects = subjectsLabel(f.subjects)
  const classes = classesLabel(f.classes)
  const background = [f.qualification, experienceLabel(f.teachingSince)]
    .filter(Boolean)
    .join(" · ")
  const subjectsLine = new Intl.ListFormat("en-IN", { type: "conjunction" })
    .format(subjectNames(f.subjects).map(glue))
  const quietLine = [classes, f.qualification, experienceLabel(f.teachingSince)]
    .filter((part): part is string => Boolean(part))
    .map(glue)
    .join("\u00a0· ")
  return {
    id: f.id,
    name: f.name,
    role: f.role,
    ...(f.photo ? { photo: f.photo } : {}),
    ...(f.bio ? { bio: f.bio } : {}),
    subjectsLine,
    quietLine,
    teaches: `${subjects} · ${classes}`,
    teachesLine: `Teaches ${subjects} in ${classes}`,
    ...(background ? { background } : {}),
  }
}
