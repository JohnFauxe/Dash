/** Titles containing the query, case-insensitively. An empty query matches nothing. */
export function suggest(query: string, titles: string[]): string[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return titles.filter((title) => title.toLowerCase().includes(q))
}

/** The title a submitted query should open: an exact match, else the first partial match. */
export function resolve(query: string, titles: string[]): string | undefined {
  const q = query.trim().toLowerCase()
  if (!q) return undefined
  return (
    titles.find((title) => title.toLowerCase() === q) ?? suggest(q, titles)[0]
  )
}
