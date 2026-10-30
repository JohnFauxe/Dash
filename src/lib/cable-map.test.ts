import { describe, expect, it } from "vitest"
import { cables } from "@/data/cables"
import {
  FULL_VIEW,
  MAX_ZOOM,
  REGIONS,
  countByRegion,
  filterCables,
  fitBounds,
  panBy,
  routeLengthKm,
  zoomAt,
  type Region,
} from "./cable-map"

const size = { width: 960, height: 500 }
const none = new Set<Region>()

describe("cables", () => {
  it("have unique names", () =>
    expect(new Set(cables.map((c) => c.name)).size).toBe(cables.length))
  it("all land at least twice", () => {
    for (const cable of cables)
      expect(cable.landings.length, cable.name).toBeGreaterThanOrEqual(2)
  })
})

describe("routeLengthKm", () => {
  it("measures a quarter of the equator", () =>
    expect(
      routeLengthKm([
        [0, 0],
        [90, 0],
      ]),
    ).toBe(10000))
})

describe("countByRegion", () => {
  it("accounts for every cable", () => {
    const counts = countByRegion(cables)
    expect(REGIONS.reduce((sum, r) => sum + counts[r.name], 0)).toBe(
      cables.length,
    )
  })
})

describe("filterCables", () => {
  it("returns everything with no filters", () =>
    expect(filterCables(cables, "  ", none)).toHaveLength(cables.length))
  it("matches names and landing points, ignoring case", () => {
    expect(filterCables(cables, "marea", none).map((c) => c.name)).toEqual([
      "MAREA",
    ])
    expect(
      filterCables(cables, "sydney", none).every((c) =>
        c.landings.some((l) => l.name === "Sydney"),
      ),
    ).toBe(true)
  })
  it("drops hidden regions", () => {
    const shown = filterCables(cables, "", new Set<Region>(["Pacific"]))
    expect(shown.some((c) => c.region === "Pacific")).toBe(false)
    expect(shown.length).toBeGreaterThan(0)
  })
})

describe("map view", () => {
  it("keeps the point under the cursor still when zooming", () => {
    const view = zoomAt(FULL_VIEW, 2, 0.25, 0.5, size)
    expect(view).toEqual({ k: 2, x: 120, y: 125 })
  })
  it("limits the zoom range", () => {
    expect(zoomAt(FULL_VIEW, 0.5, 0.5, 0.5, size)).toEqual(FULL_VIEW)
    expect(zoomAt(FULL_VIEW, 1000, 0.5, 0.5, size).k).toBe(MAX_ZOOM)
  })
  it("cannot pan off the edge of the map", () => {
    expect(panBy(FULL_VIEW, 0.5, 0.5, size)).toEqual(FULL_VIEW)
    const zoomed = { k: 2, x: 0, y: 0 }
    expect(panBy(zoomed, -10, -10, size)).toEqual({ k: 2, x: 480, y: 250 })
  })
  it("pans in view units, so less when zoomed in", () =>
    expect(panBy({ k: 2, x: 100, y: 100 }, -0.1, 0, size).x).toBe(148))
  it("fits bounds inside the view", () => {
    const view = fitBounds(
      [
        [100, 100],
        [196, 150],
      ],
      size,
    )
    expect(view.k).toBe(8)
    expect(view.x).toBeLessThanOrEqual(100)
    expect(view.x + size.width / view.k).toBeGreaterThanOrEqual(196)
  })
})
