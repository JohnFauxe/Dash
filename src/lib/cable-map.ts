import { geoLength } from "d3-geo"

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

export type Placeholder = {
  operator: string
  capacityTbps: number
  fibrePairs: number
  readyForService: number
}

export type Cable = Placeholder & {
  name: string
  region: Region
  landings: { name: string; at: Position }[]
  /** Hand-sketched waypoints joined by great arcs, not a surveyed route. */
  route: Position[]
}

export function colorOf(region: Region) {
  return REGIONS.find((r) => r.name === region)?.color
}

/** Made-up figures, derived from `seed` so they are stable between loads. */
export function placeholderFor(seed: number): Placeholder {
  return {
    operator: `Example Consortium ${String.fromCharCode(65 + (seed % 26))}`,
    capacityTbps: 20 + ((seed * 47) % 38) * 10,
    fibrePairs: 2 + ((seed * 5) % 11),
    readyForService: 2001 + ((seed * 7) % 25),
  }
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

/** The visible part of the map: `k` is the zoom, `x`/`y` its top-left corner. */
export type View = { k: number; x: number; y: number }
export type Size = { width: number; height: number }

export const FULL_VIEW: View = { k: 1, x: 0, y: 0 }
export const MAX_ZOOM = 12

function clampView({ k, x, y }: View, { width, height }: Size): View {
  const zoom = Math.min(Math.max(k, 1), MAX_ZOOM)
  return {
    k: zoom,
    x: Math.min(Math.max(x, 0), width - width / zoom),
    y: Math.min(Math.max(y, 0), height - height / zoom),
  }
}

/** Zoom by `factor`, holding still the point at fractions `fx`, `fy` of the view. */
export function zoomAt(
  view: View,
  factor: number,
  fx: number,
  fy: number,
  size: Size,
): View {
  const k = Math.min(Math.max(view.k * factor, 1), MAX_ZOOM)
  return clampView(
    {
      k,
      x: view.x + fx * (size.width / view.k - size.width / k),
      y: view.y + fy * (size.height / view.k - size.height / k),
    },
    size,
  )
}

/** Drag the map by fractions `fx`, `fy` of the view. */
export function panBy(view: View, fx: number, fy: number, size: Size): View {
  return clampView(
    {
      k: view.k,
      x: view.x - (fx * size.width) / view.k,
      y: view.y - (fy * size.height) / view.k,
    },
    size,
  )
}

/** The view that frames projected `bounds`, with some margin. */
export function fitBounds(
  [[x0, y0], [x1, y1]]: [[number, number], [number, number]],
  size: Size,
): View {
  const k =
    0.8 * Math.min(size.width / (x1 - x0 || 1), size.height / (y1 - y0 || 1))
  const zoom = Math.min(Math.max(k, 1), MAX_ZOOM)
  return clampView(
    {
      k: zoom,
      x: (x0 + x1) / 2 - size.width / zoom / 2,
      y: (y0 + y1) / 2 - size.height / zoom / 2,
    },
    size,
  )
}
