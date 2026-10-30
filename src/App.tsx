import { useEffect, useState, type ComponentType } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { AustralianStandardsArticle } from "@/components/secpedia/articles/australian-cyber-security-standards"
import { CiaTriadArticle } from "@/components/secpedia/articles/cia-triad"
import { CyberSecurityArticle } from "@/components/secpedia/articles/cyber-security"
import { CyberThreatMapArticle } from "@/components/secpedia/articles/cyber-threat-map"
import { EssentialEightArticle } from "@/components/secpedia/articles/essential-eight"
import { MissingArticle } from "@/components/secpedia/articles/missing-article"
import { NotifyProvider } from "@/components/secpedia/notify-provider"
import {
  CategoryBar,
  Colophon,
  PageTabs,
} from "@/components/secpedia/page-chrome"
import { ArticleContext } from "@/components/secpedia/secpedia-context"
import { SiteHeader } from "@/components/secpedia/site-header"
import { SiteNav } from "@/components/secpedia/site-nav"
import { FRONT_PAGE, findArticle, type ArticleMeta } from "@/data/secpedia"
import { usePathname } from "@/hooks/use-pathname"
import { pathToTitle } from "@/lib/routes"

const bodies: Record<string, ComponentType> = {
  "Cyber security": CyberSecurityArticle,
  "Australian cyber security standards": AustralianStandardsArticle,
  "CIA triad": CiaTriadArticle,
  "Essential Eight": EssentialEightArticle,
  "Cyber threat map": CyberThreatMapArticle,
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const requested = pathToTitle(pathname) ?? FRONT_PAGE
  const article: ArticleMeta = findArticle(requested) ?? {
    title: requested,
    lastEdited: "never",
    revisions: 0,
    categories: ["Missing articles"],
  }
  const Body = bodies[article.title] ?? MissingArticle

  useEffect(() => {
    document.title = `${article.title} · Secpedia`
  }, [article.title])

  return (
    <NotifyProvider>
      <ArticleContext value={article}>
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
            {/* Keyed by title so collapsed sections reset between articles. */}
            <main key={article.title} className="min-w-0 flex-auto">
              <PageTabs />
              <Body />
              <CategoryBar />
            </main>
          </div>

          <Colophon />
        </div>
      </ArticleContext>
    </NotifyProvider>
  )
}
