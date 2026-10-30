import { geoCentroid, geoDistance, geoLength } from "d3-geo"

/** Fixed order: a cable keeps its region's colour whatever the filters hide. */
export const REGIONS = [
  { name: "Atlantic", color: "var(--cable-1)" },
  { name: "Pacific", color: "var(--cable-2)" },
  { name: "Indian Ocean & Asia", color: "var(--cable-3)" },
  { name: "Africa", color: "var(--cable-4)" },
  { name: "Europe", color: "var(--cable-5)" },
] as const

export type Region = (typeof REGIONS)[number]["name"]

/** A [longitude, latitude] position. */
export type Position = [number, number]

export type Cable = {
  name: string
  /** The cable's ID in the live feeds and cable directory. */
  slug: string
  region: Region
  landings: { name: string; at: Position }[]
  /** Hand-sketched waypoints joined by great arcs, not a surveyed route. */
  route: Position[]
}

export function colorOf(region: Region) {
  return REGIONS.find((r) => r.name === region)?.color
}

const EARTH_RADIUS_KM = 6371

/** Length of the sketched route, rounded to the nearest 100 km. */
export function routeLengthKm(route: Position[]): number {
  const radians = geoLength({ type: "LineString", coordinates: route })
  return Math.round((radians * EARTH_RADIUS_KM) / 100) * 100
}

export function countByRegion(cables: Cable[]): Record<Region, number> {
  const counts = Object.fromEntries(REGIONS.map((r) => [r.name, 0])) as Record<
    Region,
    number
  >
  for (const cable of cables) counts[cable.region]++
  return counts
}

/** Cables outside `hidden` whose name or a landing point matches `query`. */
export function filterCables(
  cables: Cable[],
  query: string,
  hidden: ReadonlySet<Region>,
): Cable[] {
  const q = query.trim().toLowerCase()
  return cables.filter(
    (cable) =>
      !hidden.has(cable.region) &&
      (cable.name.toLowerCase().includes(q) ||
        cable.landings.some((l) => l.name.toLowerCase().includes(q))),
  )
}

/** The globe's orientation: the point facing the viewer, and the zoom. */
export type View = { lon: number; lat: number; k: number }

/** Opens on the Indo-Pacific, where most mapped cables and incidents are. */
export const DEFAULT_VIEW: View = { lon: 115, lat: 5, k: 1 }
export const MAX_ZOOM = 12
const MAX_LAT = 85

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function wrapLon(lon: number) {
  return ((((lon + 180) % 360) + 360) % 360) - 180
}

export function zoomBy(view: View, factor: number): View {
  return { ...view, k: clamp(view.k * factor, 1, MAX_ZOOM) }
}

/**
 * Turn the globe so the surface follows a drag of `dx`, `dy` pixels, where
 * `radius` is the globe's radius in the same pixels.
 */
export function rotateBy(
  view: View,
  dx: number,
  dy: number,
  radius: number,
): View {
  const degrees = 180 / Math.PI / radius
  return {
    k: view.k,
    lon: wrapLon(view.lon - dx * degrees),
    lat: clamp(view.lat + dy * degrees, -MAX_LAT, MAX_LAT),
  }
}

/** A step of the way from `a` to `b`, turning the short way round the globe. */
export function interpolateView(a: View, b: View, t: number): View {
  const turn = wrapLon(b.lon - a.lon)
  return {
    lon: wrapLon(a.lon + turn * t),
    lat: a.lat + (b.lat - a.lat) * t,
    k: a.k * (b.k / a.k) ** t,
  }
}

/** Whether `point` is on the side of the globe facing the viewer. */
export function isFacing(view: View, point: Position): boolean {
  return geoDistance([view.lon, view.lat], point) < Math.PI / 2
}

/** The view centred on a route, zoomed in as far as still shows all of it. */
export function fitRoute(route: Position[]): View {
  const [lon, lat] = geoCentroid({ type: "LineString", coordinates: route })
  const reach = Math.max(...route.map((p) => geoDistance([lon, lat], p)))
  const k = reach < Math.PI / 2 ? 0.8 / Math.sin(reach || 0.01) : 1
  return {
    lon,
    lat: clamp(lat, -MAX_LAT, MAX_LAT),
    k: clamp(k, 1, MAX_ZOOM),
  }
}
