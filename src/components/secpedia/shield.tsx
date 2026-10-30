import type { ComponentProps } from "react"

/** The Secpedia emblem; it follows the link colour so it tracks light and dark mode. */
export function Shield(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <path
        d="M32 3 L55 11 V29 C55 45 46 56 32 61 C18 56 9 45 9 29 V11 Z"
        className="fill-link"
      />
      <circle cx="32" cy="26" r="5" className="fill-background" />
      <path
        d="M32 30 V40"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-background"
      />
    </svg>
  )
}
