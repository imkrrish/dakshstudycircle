import { ActionButton } from "@/components/shared/action-button"
import { Logo } from "@/components/shared/logo"
import { getNav, getSite } from "@/lib/content"
import { MobileMenu } from "./mobile-menu"
import { NavCtaTone } from "./nav-cta-tone"
import { NavLinks } from "./nav-links"
import { NavbarShell } from "./navbar-shell"

async function Navbar() {
  const [site, items] = await Promise.all([getSite(), getNav()])

  return (
    <NavbarShell>
      {/* Resized state is CSS only, keyed off the shell's data-scrolled.
          Scrolled pill: --nav-inset is the gap between the end control and the
          pill's inner border edge (top, bottom and right), so their rounded
          ends are concentric. The logo isn't round, so it clears the curve by
          about half the pill height instead. */}
      <div
        data-slot="navbar"
        className="relative mx-auto flex h-16 [--nav-h:3rem] [--nav-btn-h:2.25rem] [--nav-inset:calc((var(--nav-h)-var(--nav-btn-h)-2px)/2)] w-full max-w-6xl items-center justify-between gap-3 border border-transparent bg-background/0 px-4 backdrop-blur-0 transition-[width,max-width,height,margin,padding,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out group-data-scrolled/navbar:mt-2 group-data-scrolled/navbar:h-(--nav-h) group-data-scrolled/navbar:pr-(--nav-inset) group-data-scrolled/navbar:pl-[calc(var(--nav-h)/2-1px)] group-data-scrolled/navbar:w-[calc(100%-1rem)] group-data-scrolled/navbar:max-w-4xl group-data-scrolled/navbar:rounded-4xl group-data-scrolled/navbar:border-border group-data-scrolled/navbar:bg-background/90 group-data-scrolled/navbar:shadow-sm group-data-scrolled/navbar:backdrop-blur-md motion-reduce:transition-none md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <Logo
          name={site.name}
          preload
          className="ml-[0.4rem] h-[2.2rem] transition-[height,margin] duration-300 ease-out group-data-scrolled/navbar:ml-0 lg:group-data-scrolled/navbar:h-[1.8rem] motion-reduce:transition-none"
        />
        <NavLinks items={items} />
        <div className="flex items-center gap-3 justify-self-end">
          <NavCtaTone>
            <ActionButton
              button={site.navCta}
              className="hit-area duration-300 motion-reduce:transition-none"
            />
          </NavCtaTone>
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
