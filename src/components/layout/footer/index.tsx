import Link from "next/link"

import { Container } from "@/components/layout/container"
import { DakshWordmark } from "@/components/brand/daksh-wordmark"
import { getCourses, getNav, getSite } from "@/lib/content"
import { FooterBrand } from "./footer-brand"
import { FooterColumn, footerLinkClass } from "./footer-column"

async function Footer() {
  const [site, nav, courses] = await Promise.all([
    getSite(),
    getNav(),
    getCourses(),
  ])
  const { phones, emails, hours } = site.contact
  const explore = [...nav, ...site.footer.exploreExtra]

  return (
    <footer
      data-slot="footer"
      // Pulled up behind <main>'s rounded corners so the tint shows around them.
      className="relative -mt-12 overflow-clip bg-secondary/50 pt-12"
    >
      <Container className="pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] lg:gap-16">
          <FooterBrand
            site={site}
            year={Number(process.env.NEXT_PUBLIC_BUILD_YEAR)}
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:flex sm:flex-wrap sm:gap-x-12">
            <FooterColumn
              title="Explore"
              className={
                courses.length
                  ? "sm:min-w-32"
                  : "col-span-2 sm:col-span-1 sm:min-w-32"
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
              <FooterColumn title="Courses" className="sm:min-w-32">
                {courses.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link href={`/courses/${slug}`} className={footerLinkClass}>
                      {title}
                    </Link>
                  </li>
                ))}
              </FooterColumn>
            )}
            <FooterColumn
              title="Contact"
              className="col-span-2 sm:col-span-1 sm:min-w-60"
            >
              {phones.map(({ e164, display }) => (
                <li key={e164}>
                  <a href={`tel:${e164}`} className={footerLinkClass}>
                    {display}
                  </a>
                </li>
              ))}
              {emails.map((email) => (
                <li key={email} className="wrap-anywhere">
                  <a href={`mailto:${email}`} className={footerLinkClass}>
                    {email}
                  </a>
                </li>
              ))}
              <li className="text-muted-foreground">{hours}</li>
            </FooterColumn>
            <FooterColumn
              title="Legal"
              className="col-span-2 sm:col-span-1 sm:min-w-32"
            >
              {site.footer.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>
        {/* Decorative: the lower third is clipped by the footer's bottom edge. */}
        <DakshWordmark
          fill="gradient"
          className="mt-16 mb-[-9%] opacity-90 md:mt-24"
        />
      </Container>
    </footer>
  )
}

export { Footer }
