/** Wiki-style paths: "Cyber security" <-> "/wiki/Cyber_security". */
const PREFIX = "/wiki/"

export function titleToPath(title: string): string {
  return PREFIX + encodeURIComponent(title.replace(/ /g, "_"))
}

/** The article title a path points at, or undefined for "/" and non-wiki paths. */
export function pathToTitle(path: string): string | undefined {
  if (!path.startsWith(PREFIX)) return undefined
  const slug = path.slice(PREFIX.length).replace(/\/+$/, "")
  if (!slug) return undefined
  try {
    return decodeURIComponent(slug).replace(/_/g, " ")
  } catch {
    return undefined
  }
}
