import Link from "next/link"

import { Container } from "@/components/layout/container"
import { DakshWordmark } from "@/components/brand/daksh-wordmark"
import { getCourses, getNav, getSite } from "@/lib/content"
import { FooterBrand } from "./footer-brand"
import { FooterColumn, footerLinkClass } from "./footer-column"
import { FooterContact } from "./footer-contact"

async function Footer() {
  const [site, nav, courses] = await Promise.all([
    getSite(),
    getNav(),
    getCourses(),
  ])
  const explore = [...nav, ...site.footer.exploreExtra]

  return (
    <footer
      data-slot="footer"
      // Pulled up behind <main>'s rounded corners so the tint shows around them.
      className="relative -mt-12 overflow-clip bg-secondary/50 pt-12"
    >
      <Container className="pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] lg:gap-16">
          <div className="flex flex-col gap-12">
            <FooterContact site={site} />
            <FooterBrand site={site} />
          </div>
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
        <p className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          © {Number(process.env.NEXT_PUBLIC_BUILD_YEAR)} {site.name}
        </p>
        {/* Decorative: the lower third is clipped by the footer's bottom edge. */}
        <DakshWordmark fill="brand" className="mt-12 mb-[-9%] md:mt-16" />
      </Container>
    </footer>
  )
}

export { Footer }
