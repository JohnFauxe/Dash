import { describe, expect, it } from "vitest"
import { cables } from "@/data/cables"
import {
  DEFAULT_VIEW,
  MAX_ZOOM,
  REGIONS,
  countByRegion,
  filterCables,
  fitRoute,
  interpolateView,
  isFacing,
  rotateBy,
  routeLengthKm,
  zoomBy,
  type Region,
} from "./cable-map"

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

describe("globe view", () => {
  it("follows the drag with the surface", () => {
    const view = rotateBy({ lon: 0, lat: 0, k: 1 }, 100, 50, 100)
    expect(view.lon).toBeCloseTo(-57.3, 1)
    expect(view.lat).toBeCloseTo(28.6, 1)
  })
  it("wraps longitude and stops short of the poles", () => {
    const view = rotateBy({ lon: 179, lat: 80, k: 1 }, -10, 1000, 100)
    expect(view.lon).toBeCloseTo(-175.3, 1)
    expect(view.lat).toBe(85)
  })
  it("limits the zoom range", () => {
    expect(zoomBy(DEFAULT_VIEW, 0.5).k).toBe(1)
    expect(zoomBy(DEFAULT_VIEW, 1000).k).toBe(MAX_ZOOM)
  })
  it("turns the short way across the antimeridian", () => {
    const a = { lon: 170, lat: 0, k: 1 }
    const b = { lon: -170, lat: 10, k: 4 }
    const middle = interpolateView(a, b, 0.5)
    expect(Math.abs(middle.lon)).toBeCloseTo(180)
    expect(middle.lat).toBe(5)
    expect(middle.k).toBeCloseTo(2)
    expect(interpolateView(a, b, 1).lon).toBeCloseTo(-170)
  })
  it("knows which side of the globe a point is on", () => {
    const view = { lon: 0, lat: 0, k: 1 }
    expect(isFacing(view, [45, 10])).toBe(true)
    expect(isFacing(view, [180, 0])).toBe(false)
  })
  it("centres on a short route and zooms in", () => {
    const view = fitRoute([
      [10, 0],
      [20, 0],
    ])
    expect(view.lon).toBeCloseTo(15)
    expect(view.k).toBeGreaterThan(5)
  })
  it("stays zoomed out for a route too long to fit", () => {
    const longest = cables.find((c) => c.name === "SEA-ME-WE 4")!
    expect(fitRoute(longest.route).k).toBeLessThan(2)
    expect(
      fitRoute([
        [0, 0],
        [90, 0],
        [180, 0],
      ]).k,
    ).toBe(1)
  })
  it("keeps every route's ends on the visible side when it fits", () => {
    for (const { name, route } of cables) {
      const view = fitRoute(route)
      if (view.k > 1) {
        expect(isFacing(view, route[0]), name).toBe(true)
        expect(isFacing(view, route.at(-1)!), name).toBe(true)
      }
    }
  })
})
