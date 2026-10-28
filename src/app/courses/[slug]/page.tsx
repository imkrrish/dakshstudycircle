import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { getCourse, getCourses, getSite } from "@/lib/content"
import { buildMetadata } from "@/lib/metadata"

async function findCourse(slug: string) {
  const courses = await getCourses()
  if (!courses.some((c) => c.slug === slug)) notFound()
  return getCourse(slug)
}

export async function generateStaticParams() {
  const courses = await getCourses()
  return courses.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const [course, site] = await Promise.all([findCourse(slug), getSite()])
  return buildMetadata(course.seo, site, `/courses/${slug}`)
}

async function CourseSections({
  params,
}: {
  params: PageProps<"/courses/[slug]">["params"]
}) {
  const { slug } = await params
  const course = await findCourse(slug)
  // Tighter section rhythm than the rest of the site; `contents` keeps the
  // sections direct children of <main> for its layout rules.
  return (
    <div className="contents [--section-y-md:4rem] [--section-y:3rem]">
      <SectionRenderer sections={course.sections} />
    </div>
  )
}

// Partial Prefetching: params are awaited inside Suspense. Every course is
// listed by generateStaticParams, so each page is still prerendered in full.
export default function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  return (
    <Suspense>
      <CourseSections params={params} />
    </Suspense>
  )
}
