import { yearsOfTeaching, type Faculty } from "./collections/faculty"

// What a visitor reads about a person, built from the faculty record so each
// fact is stored once. Shared by the person-feature and people-grid resolvers.

// The data may spell a subject two ways (e.g. "Maths" for Classes 9–10 and
// "Mathematics" for 11–12); a visitor sees one name, once.
const SUBJECT_NAMES: Record<string, string> = { Maths: "Mathematics" }

function subjectsLabel(subjects: string[]): string {
  const names = [...new Set(subjects.map((s) => SUBJECT_NAMES[s] ?? s))]
  return new Intl.ListFormat("en-IN", { type: "conjunction" }).format(names)
}

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
  return `${nums.length === 1 ? "Class" : "Classes"} ${runs.join(", ")}`
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
  return years === 1 ? "1 year teaching" : `${years} years teaching`
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
}

export function resolvePerson(f: Faculty): ResolvedPerson {
  const subjects = subjectsLabel(f.subjects)
  const classes = classesLabel(f.classes)
  const background = [f.qualification, experienceLabel(f.teachingSince)]
    .filter(Boolean)
    .join(" · ")
  return {
    id: f.id,
    name: f.name,
    role: f.role,
    ...(f.photo ? { photo: f.photo } : {}),
    ...(f.bio ? { bio: f.bio } : {}),
    teaches: `${subjects} · ${classes}`,
    teachesLine: `Teaches ${subjects} in ${classes}`,
    ...(background ? { background } : {}),
  }
}
