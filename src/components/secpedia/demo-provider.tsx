import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { DemoContext } from "./demo-context"

const TOAST_MS = 3400

export function DemoProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const notify = useCallback((next: string) => {
    setMessage(next)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), TOAST_MS)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <DemoContext value={notify}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
      >
        {message && (
          <p className="bg-foreground text-background max-w-md rounded-lg px-4 py-2.5 text-sm shadow-lg">
            {message}
          </p>
        )}
      </div>
    </DemoContext>
  )
}
