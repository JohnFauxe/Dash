import { useId, useRef, useState } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CURRENT_PAGE, pages } from "@/data/secpedia"
import { resolve, suggest } from "@/lib/search"
import { notWrittenMessage, useNotify } from "./demo-context"

export function SiteSearch() {
  const notify = useNotify()
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const hits = open ? suggest(query, pages) : []

  function pick(title: string) {
    if (title === CURRENT_PAGE) {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
    } else {
      notify(notWrittenMessage(title))
    }
    setQuery("")
    setOpen(false)
    inputRef.current?.blur()
  }

  return (
    <form
      role="search"
      className="relative ml-auto max-w-[26rem] flex-auto"
      onSubmit={(event) => {
        event.preventDefault()
        if (!query.trim()) return
        const match = resolve(query, pages)
        if (match) pick(match)
        else notify(`No entry matches “${query.trim()}”.`)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <label className="sr-only" htmlFor="search">
        Search Secpedia
      </label>
      <SearchIcon
        aria-hidden
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
      />
      <Input
        ref={inputRef}
        id="search"
        type="search"
        placeholder="Search Secpedia"
        autoComplete="off"
        role="combobox"
        aria-expanded={hits.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false)
        }}
        className="bg-muted pl-8"
      />
      <div
        id={listId}
        hidden={hits.length === 0}
        className="bg-popover text-popover-foreground absolute inset-x-0 top-[calc(100%+5px)] z-50 max-h-68 overflow-y-auto rounded-lg border shadow-lg"
      >
        {hits.map((title) => (
          <button
            key={title}
            type="button"
            // Keep focus in the form so its onBlur does not close the list mid-click.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => pick(title)}
            className="hover:bg-accent focus-visible:bg-accent flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-[0.87rem] focus-visible:outline-none"
          >
            <span>{title}</span>
            <small className="text-muted-foreground text-xs whitespace-nowrap">
              {title === CURRENT_PAGE ? "this page" : "placeholder"}
            </small>
          </button>
        ))}
      </div>
    </form>
  )
}
