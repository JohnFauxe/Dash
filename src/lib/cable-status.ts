/** Parsers for the live cable feeds. Responses are external, so check their shape. */

/** Most certain first: this order drives sorting and which level a cable shows. */
export const FAULT_LEVELS = [
  {
    id: "confirmed",
    label: "Confirmed fault",
    color: "var(--status-critical)",
    dash: "1.5 5",
  },
  {
    id: "suspected",
    label: "Suspected fault",
    color: "var(--status-serious)",
    dash: "6 4",
  },
  {
    id: "observed",
    label: "Telemetry only",
    color: "var(--status-warning)",
    dash: "12 5",
  },
] as const

export type FaultLevel = (typeof FAULT_LEVELS)[number]["id"]

export type Incident = {
  ref: string
  title: string
  level: FaultLevel
  /** Where the repair has got to, such as "Repair planned". */
  phase: string
  severity: string
  cables: { slug: string; name: string }[]
  lastUpdatedAt: string
  expectedRestoreAt?: string
  faultPoint?: [number, number]
  exactLocation: boolean
  summary: string
  url: string
}

export type LatencyAlert = {
  id: string
  cableName: string
  slug: string
  status: string
  detectedAt: string
  verdict: string
  url: string
}

export type CableFacts = {
  owners: string[]
  lengthKm?: number
  rfsYear?: number
}

const INCIDENT_FEED = "https://submarinecablestatus.com/api/v1/incidents"
const DIRECTORY_FEED = "https://submarinecablestatus.com/api/v1/cables"
const ALERT_FEED = "https://geocables.com/api/v1/incidents?limit=100"
export const FEEDS = {
  incidents: INCIDENT_FEED,
  directory: DIRECTORY_FEED,
  alerts: ALERT_FEED,
}

const FINISHED = new Set(["CLOSED", "RESOLVED", "RESTORED"])

const VERDICTS: Record<string, string> = {
  routing_event_non_cable: "Likely a routing change, not the cable",
  probe_specific_likely_fp: "Likely a false alarm from one probe",
  insufficient_witness_context: "Too few other probes to judge",
  mixed: "Mixed signals",
  widespread: "Seen across several probes",
}

type Json = Record<string, unknown>

function rows(payload: unknown): Json[] {
  const data = (payload as Json | null)?.data
  if (!Array.isArray(data)) throw new Error("Unexpected feed shape")
  return data.filter((row): row is Json => !!row && typeof row === "object")
}

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function number(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

/** "REPAIR_PLANNED" to "Repair planned". */
export function humanize(status: string): string {
  const words = status.toLowerCase().replaceAll("_", " ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/** The form of a cable's name used as its slug in the directory. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s/g, "-")
}

function levelOf(verification: unknown): FaultLevel {
  if (verification === "CONFIRMED") return "confirmed"
  if (verification === "SUSPECTED") return "suspected"
  return "observed"
}

function point(value: unknown): [number, number] | undefined {
  if (!Array.isArray(value)) return undefined
  const [lon, lat] = value.map(number)
  return lon === undefined || lat === undefined ? undefined : [lon, lat]
}

/** Open incidents only. `truncated` means the feed had further pages. */
export function parseIncidents(payload: unknown): {
  incidents: Incident[]
  truncated: boolean
} {
  const incidents = rows(payload)
    .filter((row) => !FINISHED.has(text(row.status)) && !row.restoredAt)
    .map((row): Incident => {
      const location = row.location as Json | null | undefined
      const etr = row.currentEtr as Json | null | undefined
      const cables = Array.isArray(row.cables) ? (row.cables as Json[]) : []
      return {
        ref: text(row.publicRef, text(row.id)),
        title: text(row.title, "Untitled incident"),
        level: levelOf(row.verification),
        phase: humanize(text(row.status, "Unknown")),
        severity: humanize(text(row.severity, "Unknown")),
        cables: cables.map((c) => ({
          slug: text(c.slug),
          name: text(c.name),
        })),
        lastUpdatedAt: text(row.lastUpdatedAt),
        expectedRestoreAt: text(etr?.etrEnd) || undefined,
        faultPoint: point(row.faultPoint),
        exactLocation: location?.exact === true,
        summary: text(row.publicSummary),
        url: `https://submarinecablestatus.com/incidents/${encodeURIComponent(text(row.slug))}`,
      }
    })
    .sort((a, b) => severity(a.level) - severity(b.level))
  const next = ((payload as Json).meta as Json | undefined)?.nextCursor
  return { incidents, truncated: !!next }
}

function severity(level: FaultLevel) {
  return FAULT_LEVELS.findIndex((l) => l.id === level)
}

/** Unresolved latency alerts. These are signals, not confirmed faults. */
export function parseAlerts(payload: unknown): LatencyAlert[] {
  return rows(payload)
    .filter((row) => row.status !== "resolved")
    .map((row) => {
      const id = text(row.alert_number)
      const cableName = text(row.cable_name, "Unknown cable")
      return {
        id,
        cableName,
        slug: slugify(cableName),
        status: humanize(text(row.status, "Unknown")),
        detectedAt: text(row.detected_at),
        verdict: VERDICTS[text(row.verdict)] ?? "Not yet assessed",
        url: `https://geocables.com/incident/${encodeURIComponent(id)}`,
      }
    })
}

export function parseDirectory(payload: unknown): Map<string, CableFacts> {
  return new Map(
    rows(payload).map((row) => [
      text(row.slug),
      {
        owners: Array.isArray(row.owners)
          ? row.owners.filter((o) => typeof o === "string")
          : [],
        lengthKm: number(row.lengthKm),
        rfsYear: number(row.rfsYear),
      },
    ]),
  )
}

export function faultLevelStyle(level: FaultLevel) {
  return FAULT_LEVELS.find((l) => l.id === level)!
}

export function incidentsFor(incidents: Incident[], slug: string): Incident[] {
  return incidents.filter((i) => i.cables.some((c) => c.slug === slug))
}
