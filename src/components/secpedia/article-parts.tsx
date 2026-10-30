import { useState, type ReactNode } from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DemoLink } from "./demo-link"

/** Superscript citation marker, e.g. [1], that links to its reference. */
export function Cite({ id, to, n }: { id: string; to: string; n: number }) {
  return (
    <sup id={id}>
      <a href={`#${to}`}>[{n}]</a>
    </sup>
  )
}

/** A collapsible top-level section; `anchor` is the fragment the contents box links to. */
export function Section({
  anchor,
  title,
  children,
  className,
}: {
  anchor: string
  title: string
  children: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(true)
  const headingId = `h-${anchor}`
  const bodyId = `b-${anchor}`

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mt-7 mb-2 flex items-baseline gap-3 border-b pb-1 font-serif text-2xl leading-snug font-semibold"
      >
        <button
          id={anchor}
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen(!open)}
          className="group flex items-baseline gap-1.5 text-left"
        >
          <ChevronDownIcon
            aria-hidden
            className="text-muted-foreground size-4 shrink-0 self-center transition-transform group-aria-[expanded=false]:-rotate-90 motion-reduce:transition-none"
          />
          {title}
        </button>
        <DemoLink
          page="Editing Cyber security"
          className="ml-auto font-sans text-xs font-normal"
        >
          [ edit ]
        </DemoLink>
      </h2>
      <div id={bodyId} hidden={!open} className={className}>
        {children}
      </div>
    </section>
  )
}

export function SubHead({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-5 mb-1 text-[1.05rem] font-bold">
      {children}
    </h3>
  )
}

export function WikiTable({
  head,
  rows,
}: {
  head: string[]
  rows: [ReactNode, ...ReactNode[]][]
}) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="bg-muted/50 min-w-[32rem] border-collapse border text-[0.88rem]">
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="bg-muted border px-3 py-1.5 text-left font-bold"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest], i) => (
            <tr key={i}>
              <td className="border px-3 py-1.5 align-top font-bold">
                {first}
              </td>
              {rest.map((cell, j) => (
                <td key={j} className="border px-3 py-1.5 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export type TocEntry = { anchor: string; title: string; children?: TocEntry[] }

/** The "Contents" box, numbered like 1, 1.1, 2 … */
export function Toc({ entries }: { entries: TocEntry[] }) {
  const [open, setOpen] = useState(true)

  function list(items: TocEntry[], prefix: string, nested = false) {
    return (
      <ol
        className={cn("list-none", nested ? "my-0 ml-5" : "mt-1.5 mb-0 ml-0")}
      >
        {items.map((item, i) => {
          const number = `${prefix}${i + 1}`
          return (
            <li key={item.anchor} className="my-0.5">
              <a href={`#${item.anchor}`}>
                <span className="text-foreground mr-1.5">{number}</span>
                {item.title}
              </a>
              {item.children && list(item.children, `${number}.`, true)}
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <nav
      id="contents-box"
      aria-label="Table of contents"
      className="bg-muted my-4 inline-block rounded-sm border px-4 py-2.5 text-[0.88rem]"
    >
      <div className="text-center font-bold">
        Contents{" "}
        <button
          aria-expanded={open}
          aria-controls="toc-list"
          onClick={() => setOpen(!open)}
          className="text-link text-[0.8rem] font-normal hover:underline"
        >
          ({open ? "hide" : "show"})
        </button>
      </div>
      <div id="toc-list" hidden={!open}>
        {list(entries, "")}
      </div>
    </nav>
  )
}

export function Infobox({
  title,
  media,
  caption,
  facts,
}: {
  title: string
  media: ReactNode
  caption: string
  facts: [string, ReactNode][]
}) {
  return (
    <aside
      aria-label={`Facts about ${title.toLowerCase()}`}
      className="bg-muted mb-4 border p-2 text-[0.84rem] leading-snug md:float-right md:clear-right md:ml-5 md:w-[22rem]"
    >
      <div className="pb-1.5 text-center font-serif text-lg font-bold">
        {title}
      </div>
      <figure className="mb-2 flex flex-col items-center gap-1.5 px-2 text-center">
        {media}
        <figcaption className="text-muted-foreground text-xs">
          {caption}
        </figcaption>
      </figure>
      <table className="w-full">
        <tbody>
          {facts.map(([label, value]) => (
            <tr key={label} className="border-t">
              <th
                scope="row"
                className="w-[38%] py-1.5 pr-2 text-left align-top font-bold"
              >
                {label}
              </th>
              <td className="py-1.5 align-top">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}
