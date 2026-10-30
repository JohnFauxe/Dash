import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Article } from "@/components/secpedia/article"
import { DemoProvider } from "@/components/secpedia/demo-provider"
import {
  CategoryBar,
  Colophon,
  PageTabs,
} from "@/components/secpedia/page-chrome"
import { SiteHeader } from "@/components/secpedia/site-header"
import { SiteNav } from "@/components/secpedia/site-nav"

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <DemoProvider>
      <div className="text-[15px] leading-[1.65]">
        <SiteHeader onOpenMenu={() => setMenuOpen(true)} />

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="left" className="w-64 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Secpedia</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6">
              <SiteNav onNavigate={() => setMenuOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <div
          id="top"
          className="mx-auto flex max-w-[1560px] items-start gap-6 px-4 pt-1.5 pb-8"
        >
          <aside className="sticky top-16 hidden w-60 shrink-0 py-3 lg:block">
            <SiteNav />
          </aside>
          <main className="min-w-0 flex-auto">
            <PageTabs />
            <Article />
            <CategoryBar />
          </main>
        </div>

        <Colophon />
      </div>
    </DemoProvider>
  )
}
