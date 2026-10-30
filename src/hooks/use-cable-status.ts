import { useEffect, useState } from "react"
import {
  FEEDS,
  parseAlerts,
  parseDirectory,
  parseIncidents,
  type CableFacts,
  type Incident,
  type LatencyAlert,
} from "@/lib/cable-status"

const REFRESH_MS = 5 * 60 * 1000
const TIMEOUT_MS = 20 * 1000

export type CableStatus = {
  /** Null until the incident feed has answered at least once. */
  incidents: Incident[] | null
  truncated: boolean
  alerts: LatencyAlert[] | null
  directory: Map<string, CableFacts> | null
  loading: boolean
  /** The latest incident fetch failed; `incidents` may be out of date. */
  failed: boolean
  updatedAt: Date | null
}

const initial: CableStatus = {
  incidents: null,
  truncated: false,
  alerts: null,
  directory: null,
  loading: true,
  failed: false,
  updatedAt: null,
}

async function getJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(TIMEOUT_MS)]),
  })
  if (!response.ok) throw new Error(`${url}: ${response.status}`)
  return response.json()
}

/** Polls the live feeds. Each fails on its own and keeps its last good answer. */
export function useCableStatus(): CableStatus {
  const [status, setStatus] = useState(initial)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    async function refresh() {
      if (document.hidden) return
      const [incidents, alerts, directory] = await Promise.allSettled([
        getJson(FEEDS.incidents, signal).then(parseIncidents),
        getJson(FEEDS.alerts, signal).then(parseAlerts),
        getJson(FEEDS.directory, signal).then(parseDirectory),
      ])
      if (signal.aborted) return
      setStatus((previous) => ({
        ...previous,
        loading: false,
        failed: incidents.status === "rejected",
        ...(incidents.status === "fulfilled" && {
          ...incidents.value,
          updatedAt: new Date(),
        }),
        ...(alerts.status === "fulfilled" && { alerts: alerts.value }),
        ...(directory.status === "fulfilled" && {
          directory: directory.value,
        }),
      }))
    }

    void refresh()
    const timer = setInterval(() => void refresh(), REFRESH_MS)
    return () => {
      clearInterval(timer)
      controller.abort()
    }
  }, [])

  return status
}
