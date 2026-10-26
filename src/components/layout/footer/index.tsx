import Link from "next/link"

import { Container } from "@/components/layout/container"
import { DakshWordmark } from "@/components/brand/daksh-wordmark"
import { getCourses, getNav, getSite } from "@/lib/content"
import { FooterColumn, footerLinkClass } from "./footer-column"
import { FooterContact } from "./footer-contact"
import { FooterSocials } from "./footer-socials"
import { FooterVisit } from "./footer-visit"

async function Footer() {
  const [site, nav, courses] = await Promise.all([
    getSite(),
    getNav(),
    getCourses(),
  ])
  const explore = [...nav, ...site.footer.exploreExtra]

  return (
    <footer data-slot="footer" className="overflow-clip bg-footer">
      <Container className="pt-10 md:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
          <FooterContact site={site} className="col-span-2 lg:col-span-4" />
          <FooterVisit site={site} className="col-span-2 lg:col-span-3" />
          {/* Two-up on every width; Explore fills the row when there are no courses. */}
          <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-6 lg:col-span-5">
            <FooterColumn
              title="Explore"
              className={courses.length ? undefined : "col-span-2"}
              listClassName={
                courses.length ? undefined : "grid grid-cols-2 gap-x-6"
              }
            >
              {explore.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
            {courses.length > 0 && (
              <FooterColumn title="Courses">
                {courses.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link href={`/courses/${slug}`} className={footerLinkClass}>
                      {title}
                    </Link>
                  </li>
                ))}
              </FooterColumn>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 border-t pt-2 md:mt-10 md:pt-4">
          <p className="font-heading text-base font-bold text-foreground md:text-lead">
            {site.tagline}
          </p>
          <FooterSocials
            siteName={site.name}
            socials={site.socials}
            className="-mx-2"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 text-sm text-muted-foreground">
          <p>
            © {Number(process.env.NEXT_PUBLIC_BUILD_YEAR)} {site.name}
          </p>
          <ul className="flex gap-x-4">
            {site.footer.legal.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={footerLinkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Decorative: tone on tone, the lower third clipped by the footer's bottom edge. */}
        <DakshWordmark
          fill="current"
          className="mt-6 mb-[-9%] text-footer-mark md:mt-12"
        />
      </Container>
    </footer>
  )
}

export { Footer }
