import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FRONT_PAGE } from "@/data/secpedia"
import { WikiLink } from "./wiki-link"
import { Shield } from "./shield"
import { SiteSearch } from "./site-search"

export function SiteHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="bg-background sticky top-0 z-40 border-b pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-[1560px] items-center gap-4 px-4 py-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          onClick={onOpenMenu}
          className="lg:hidden"
        >
          <MenuIcon />
        </Button>
        <WikiLink
          page={FRONT_PAGE}
          aria-label="Secpedia front page"
          className="flex shrink-0 items-center gap-2"
        >
          <Shield aria-hidden width={26} height={26} />
          <span>
            <span className="block font-serif text-xl leading-tight font-bold">
              Secpedia
            </span>
            <span className="text-muted-foreground hidden text-[0.68rem] sm:block">
              the open study encyclopedia
            </span>
          </span>
        </WikiLink>
        <SiteSearch />
        <nav
          aria-label="Account"
          className="text-link hidden gap-3 text-[0.82rem] whitespace-nowrap md:flex"
        >
          <WikiLink page="Create account" className="hover:underline" />
          <WikiLink page="Log in" className="hover:underline" />
        </nav>
      </div>
    </header>
  )
}
