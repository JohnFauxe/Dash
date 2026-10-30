import type { ComponentProps } from "react"
import { notWrittenMessage, useNotify } from "./demo-context"

/** A link to a page that is not written yet: clicking explains instead of navigating. */
export function DemoLink({
  page,
  children,
  ...props
}: { page: string } & Omit<ComponentProps<"a">, "href" | "onClick">) {
  const notify = useNotify()
  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault()
        notify(notWrittenMessage(page))
      }}
      {...props}
    >
      {children ?? page}
    </a>
  )
}
