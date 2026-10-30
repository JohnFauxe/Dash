import type { ComponentProps, MouseEvent } from "react"
import { findArticle } from "@/data/secpedia"
import { navigate } from "@/hooks/use-pathname"
import { titleToPath } from "@/lib/routes"
import { notWrittenMessage, useNotify } from "./secpedia-context"

/**
 * A link to a Secpedia page. Written articles navigate client-side;
 * anything else explains that the page does not exist yet.
 */
export function WikiLink({
  page,
  children,
  ...props
}: { page: string } & Omit<ComponentProps<"a">, "href" | "onClick">) {
  const notify = useNotify()
  const article = findArticle(page)

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks open a new tab as usual.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
      return
    event.preventDefault()
    if (article) navigate(titleToPath(article.title))
    else notify(notWrittenMessage(page))
  }

  return (
    <a
      href={article ? titleToPath(article.title) : "#"}
      onClick={onClick}
      {...props}
    >
      {children ?? page}
    </a>
  )
}
