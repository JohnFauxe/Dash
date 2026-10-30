import { createContext, useContext } from "react"
import { CURRENT_PAGE } from "@/data/secpedia"

export const DemoContext = createContext<(message: string) => void>(() => {})

/** Show a status message, e.g. for a link to a page that does not exist yet. */
export function useNotify() {
  return useContext(DemoContext)
}

export function notWrittenMessage(title: string) {
  return `“${title}” is not written in this demo yet. “${CURRENT_PAGE}” is the only full entry.`
}
