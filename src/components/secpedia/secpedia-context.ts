import { createContext, useContext } from "react"
import { articles, type ArticleMeta } from "@/data/secpedia"

export const NotifyContext = createContext<(message: string) => void>(() => {})

/** Show a status message, e.g. for a link to a page that does not exist yet. */
export function useNotify() {
  return useContext(NotifyContext)
}

export function notWrittenMessage(title: string) {
  const written = articles.map((a) => `“${a.title}”`).join(" and ")
  return `“${title}” is not written in this demo yet. Full entries: ${written}.`
}

export const ArticleContext = createContext<ArticleMeta | null>(null)

/** The article being rendered. */
export function useArticle() {
  const article = useContext(ArticleContext)
  if (!article) throw new Error("useArticle must be used inside an article")
  return article
}
