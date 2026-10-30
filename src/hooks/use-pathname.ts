import { useSyncExternalStore } from "react"

const NAVIGATE = "secpedia:navigate"

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange)
  window.addEventListener(NAVIGATE, onChange)
  return () => {
    window.removeEventListener("popstate", onChange)
    window.removeEventListener(NAVIGATE, onChange)
  }
}

/** The current URL path, updated on back/forward and `navigate`. */
export function usePathname() {
  return useSyncExternalStore(subscribe, () => window.location.pathname)
}

/** Client-side navigation: push a history entry and jump to the top of the new page. */
export function navigate(path: string) {
  if (path === window.location.pathname) {
    window.scrollTo({ top: 0 })
    return
  }
  window.history.pushState(null, "", path)
  window.dispatchEvent(new Event(NAVIGATE))
  window.scrollTo({ top: 0 })
}
