import { Fragment } from "react"
import { cn } from "@/lib/utils"
import { DemoLink } from "./demo-link"

const tab = "inline-block px-3 pt-2 pb-1.5 whitespace-nowrap"
const currentTab = "border-b-3 border-link font-semibold text-foreground"

export function PageTabs() {
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
          <DemoLink page="Talk page" className={tab}>
            Talk
          </DemoLink>
        </div>
        <div aria-label="Views" className="flex">
          <a href="#top" aria-current="page" className={cn(tab, currentTab)}>
            Read
          </a>
          <DemoLink page="Visual editor" className={tab}>
            Edit
          </DemoLink>
          <DemoLink page="View history" className={tab}>
            View history
          </DemoLink>
        </div>
      </nav>
      <p className="text-muted-foreground mt-2 mb-0.5 text-right text-[0.77rem]">
        Last edited on 26 October 2026, at 09:14 ·{" "}
        <DemoLink page="Page history" className="text-link hover:underline">
          34 revisions
        </DemoLink>
      </p>
    </>
  )
}

const categories = [
  "Cyber security",
  "Information security",
  "Computer security",
  "Security engineering",
]

export function CategoryBar() {
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
          <DemoLink
            page={`Category: ${name}`}
            className="text-link hover:underline"
          >
            {name}
          </DemoLink>
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
          original study texts.
        </p>
        <p className="text-link flex flex-wrap gap-x-2">
          <a href="#top" className="hover:underline">
            About Secpedia
          </a>
          <span aria-hidden className="text-muted-foreground">
            ·
          </span>
          <DemoLink page="Disclaimers" className="hover:underline" />
          <span aria-hidden className="text-muted-foreground">
            ·
          </span>
          <DemoLink page="Privacy policy" className="hover:underline" />
        </p>
      </div>
    </footer>
  )
}
