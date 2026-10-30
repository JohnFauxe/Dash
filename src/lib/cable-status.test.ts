import { describe, expect, it } from "vitest"
import { cables } from "@/data/cables"
import {
  humanize,
  incidentsFor,
  parseAlerts,
  parseDirectory,
  parseIncidents,
  slugify,
} from "./cable-status"

const incident = {
  publicRef: "SCS-1",
  slug: "a b",
  title: "Break",
  status: "REPAIR_PLANNED",
  verification: "CONFIRMED",
  severity: "CRITICAL",
  cables: [{ slug: "marea", name: "MAREA" }],
  restoredAt: null,
  lastUpdatedAt: "2026-10-23T06:23:00.000Z",
  faultPoint: [106.91, -2.65],
  location: { exact: false },
  currentEtr: { etrEnd: "2026-11-11T00:00:00.000Z" },
  publicSummary: "Summary",
}

function feed(...data: unknown[]) {
  return { data, meta: { nextCursor: null } }
}

describe("parseIncidents", () => {
  it("maps a record from the feed", () => {
    const [parsed] = parseIncidents(feed(incident)).incidents
    expect(parsed).toMatchObject({
      level: "confirmed",
      phase: "Repair planned",
      faultPoint: [106.91, -2.65],
      exactLocation: false,
      expectedRestoreAt: "2026-11-11T00:00:00.000Z",
      url: "https://submarinecablestatus.com/incidents/a%20b",
    })
  })
  it("drops finished incidents", () => {
    const closed = { ...incident, status: "CLOSED" }
    const restored = { ...incident, restoredAt: "2026-10-01T00:00:00.000Z" }
    expect(parseIncidents(feed(closed, restored)).incidents).toEqual([])
  })
  it("puts the most certain first", () => {
    const suspected = { ...incident, verification: "SUSPECTED" }
    const { incidents } = parseIncidents(feed(suspected, incident))
    expect(incidents.map((i) => i.level)).toEqual(["confirmed", "suspected"])
  })
  it("treats an unknown verification as the weakest level", () =>
    expect(
      parseIncidents(feed({ ...incident, verification: "NEW" })).incidents[0]
        .level,
    ).toBe("observed"))
  it("tolerates missing optional fields", () => {
    const [parsed] = parseIncidents(feed({ status: "SUSPECTED" })).incidents
    expect(parsed.faultPoint).toBeUndefined()
    expect(parsed.cables).toEqual([])
  })
  it("flags further pages", () =>
    expect(
      parseIncidents({ data: [], meta: { nextCursor: "x" } }).truncated,
    ).toBe(true))
  it("rejects an unexpected shape", () => {
    expect(() => parseIncidents({ error: "nope" })).toThrow()
    expect(() => parseIncidents(null)).toThrow()
  })
})

describe("parseAlerts", () => {
  const alert = {
    alert_number: "2026102801",
    cable_name: "Australia-Singapore Cable (ASC)",
    status: "monitoring",
    detected_at: "2026-10-28 21:03:09",
    verdict: "routing_event_non_cable",
  }
  it("keeps unresolved alerts and explains the verdict", () => {
    const [parsed, ...rest] = parseAlerts(
      feed(alert, { ...alert, status: "resolved" }),
    )
    expect(rest).toEqual([])
    expect(parsed.slug).toBe("australia-singapore-cable-asc")
    expect(parsed.verdict).toBe("Likely a routing change, not the cable")
  })
  it("does not invent a verdict", () =>
    expect(parseAlerts(feed({ ...alert, verdict: null }))[0].verdict).toBe(
      "Not yet assessed",
    ))
})

describe("parseDirectory", () => {
  it("indexes facts by slug", () => {
    const facts = parseDirectory(
      feed({ slug: "marea", owners: ["A", 1], lengthKm: 6600, rfsYear: null }),
    ).get("marea")
    expect(facts).toEqual({ owners: ["A"], lengthKm: 6600, rfsYear: undefined })
  })
})

describe("helpers", () => {
  it("humanizes statuses", () =>
    expect(humanize("VESSEL_EN_ROUTE")).toBe("Vessel en route"))
  it.each([
    ["Australia-Singapore Cable (ASC)", "australia-singapore-cable-asc"],
    ["BCS North - Phase 1", "bcs-north---phase-1"],
    ["Havfrue/AEC-2", "havfrueaec-2"],
  ])("slugifies %s as the directory does", (name, slug) =>
    expect(slugify(name)).toBe(slug),
  )
  it("finds incidents by cable", () => {
    const { incidents } = parseIncidents(feed(incident))
    expect(incidentsFor(incidents, "marea")).toHaveLength(1)
    expect(incidentsFor(incidents, "dunant")).toHaveLength(0)
  })
  it("every mapped cable has a directory slug", () => {
    for (const cable of cables) expect(cable.slug, cable.name).toBeTruthy()
  })
})
