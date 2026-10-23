import { ActionButton } from "@/components/shared/action-button"
import { Logo } from "@/components/shared/logo"
import { getNav, getSite } from "@/lib/content"
import { MobileMenu } from "./mobile-menu"
import { NavCtaReveal } from "./nav-cta-reveal"
import { NavLinks } from "./nav-links"
import { NavbarShell } from "./navbar-shell"

async function Navbar() {
  const [site, items] = await Promise.all([getSite(), getNav()])

  return (
    <NavbarShell>
      {/* Resized state is CSS only, keyed off the shell's data-scrolled. */}
      <div
        data-slot="navbar"
        className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 border border-transparent bg-background/0 px-4 backdrop-blur-0 transition-[width,max-width,height,margin,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out group-data-scrolled/navbar:mt-2 group-data-scrolled/navbar:h-12 group-data-scrolled/navbar:w-[calc(100%-1rem)] group-data-scrolled/navbar:max-w-4xl group-data-scrolled/navbar:rounded-4xl group-data-scrolled/navbar:border-border group-data-scrolled/navbar:bg-background/90 group-data-scrolled/navbar:shadow-sm group-data-scrolled/navbar:backdrop-blur-md motion-reduce:transition-none md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <Logo
          name={site.name}
          preload
          className="size-11 transition-[width,height] duration-300 ease-out lg:group-data-scrolled/navbar:size-9 motion-reduce:transition-none"
        />
        <NavLinks items={items} />
        <div className="flex items-center gap-2 justify-self-end">
          <NavCtaReveal>
            <ActionButton button={site.navCta} className="max-lg:h-11" />
          </NavCtaReveal>
          <MobileMenu
            items={items}
            cta={
              <ActionButton
                button={{ ...site.navCta, variant: "outline" }}
                className="h-11 w-full"
              />
            }
          />
        </div>
      </div>
    </NavbarShell>
  )
}

export { Navbar }
