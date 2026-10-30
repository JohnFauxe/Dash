import { Fragment } from "react"
import { cn } from "@/lib/utils"
import { useArticle } from "./secpedia-context"
import { WikiLink } from "./wiki-link"

const tab = "inline-block px-3 pt-2 pb-1.5 whitespace-nowrap"
const currentTab = "border-b-3 border-link font-semibold text-foreground"

export function PageTabs() {
  const { title, lastEdited, revisions } = useArticle()
  return (
    <>
      <nav
        aria-label="Page tabs"
        className="text-link flex justify-between gap-4 overflow-x-auto border-b text-[0.87rem]"
      >
        <div aria-label="Namespaces" className="flex">
          <a href="#top" aria-current="page" className={cn(tab, currentTab)}>
            Article
          </a>
          <WikiLink page={`Talk: ${title}`} className={tab}>
            Talk
          </WikiLink>
        </div>
        <div aria-label="Views" className="flex">
          <a href="#top" aria-current="page" className={cn(tab, currentTab)}>
            Read
          </a>
          <WikiLink page={`Editing ${title}`} className={tab}>
            Edit
          </WikiLink>
          <WikiLink page={`History of ${title}`} className={tab}>
            View history
          </WikiLink>
        </div>
      </nav>
      <p className="text-muted-foreground mt-2 mb-0.5 text-right text-[0.77rem]">
        Last edited on {lastEdited} ·{" "}
        <WikiLink
          page={`History of ${title}`}
          className="text-link hover:underline"
        >
          {revisions} revisions
        </WikiLink>
      </p>
    </>
  )
}

export function CategoryBar() {
  const { categories } = useArticle()
  return (
    <div
      aria-label="Categories"
      className="bg-muted mt-8 rounded-sm border px-3 py-2 text-[0.84rem]"
    >
      <b>Categories</b>:{" "}
      {categories.map((name, i) => (
        <Fragment key={name}>
          {i > 0 && (
            <span aria-hidden className="text-muted-foreground mx-1.5">
              |
            </span>
          )}
          <WikiLink
            page={`Category: ${name}`}
            className="text-link hover:underline"
          >
            {name}
          </WikiLink>
        </Fragment>
      ))}
    </div>
  )
}

export function Colophon() {
  return (
    <footer className="border-t pb-[env(safe-area-inset-bottom)]">
      <div className="text-muted-foreground mx-auto max-w-[1560px] space-y-2 px-4 py-6 text-[0.8rem]">
        <p>
          Secpedia is a layout study of a reference-style encyclopedia, built
          for learning. It is not affiliated with Wikipedia, and the entries are
          original study texts. They are not legal advice: check obligations
          against the current legislation and regulator guidance.
        </p>
        <p className="text-link flex flex-wrap gap-x-2">
          <WikiLink page="About Secpedia" className="hover:underline" />
          <span aria-hidden className="text-muted-foreground">
            ·
          </span>
          <WikiLink page="Disclaimers" className="hover:underline" />
          <span aria-hidden className="text-muted-foreground">
            ·
          </span>
          <WikiLink page="Privacy policy" className="hover:underline" />
        </p>
      </div>
    </footer>
  )
}
