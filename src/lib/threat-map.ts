/** A simulated feed of attacks for the cyber threat map. Nothing here is real data. */
export type City = { name: string; lon: number; lat: number }

export const ATTACK_TYPES = [
  { name: "DDoS", color: "var(--threat-1)" },
  { name: "Malware", color: "var(--threat-2)" },
  { name: "Phishing", color: "var(--threat-3)" },
  { name: "Intrusion", color: "var(--threat-4)" },
] as const

export type AttackType = (typeof ATTACK_TYPES)[number]["name"]

export const CITIES: City[] = [
  { name: "Sydney", lon: 151.2, lat: -33.9 },
  { name: "Perth", lon: 115.9, lat: -32 },
  { name: "Auckland", lon: 174.8, lat: -36.8 },
  { name: "Singapore", lon: 103.8, lat: 1.4 },
  { name: "Tokyo", lon: 139.7, lat: 35.7 },
  { name: "Seoul", lon: 127, lat: 37.6 },
  { name: "Mumbai", lon: 72.9, lat: 19.1 },
  { name: "Dubai", lon: 55.3, lat: 25.2 },
  { name: "Istanbul", lon: 29, lat: 41 },
  { name: "Frankfurt", lon: 8.7, lat: 50.1 },
  { name: "London", lon: -0.1, lat: 51.5 },
  { name: "Stockholm", lon: 18.1, lat: 59.3 },
  { name: "Lagos", lon: 3.4, lat: 6.5 },
  { name: "Nairobi", lon: 36.8, lat: -1.3 },
  { name: "Johannesburg", lon: 28, lat: -26.2 },
  { name: "São Paulo", lon: -46.6, lat: -23.6 },
  { name: "Bogotá", lon: -74.1, lat: 4.7 },
  { name: "Mexico City", lon: -99.1, lat: 19.4 },
  { name: "Ashburn", lon: -77.5, lat: 39 },
  { name: "Toronto", lon: -79.4, lat: 43.7 },
  { name: "San Francisco", lon: -122.4, lat: 37.8 },
]

/** How many ticks an attack stays on the map; matches the CSS animation length. */
export const TICK_MS = 300
export const LIFETIME_TICKS = 7
const FEED_SIZE = 4

export type Shot = { type: AttackType; from: City; to: City }
export type Attack = Shot & { id: number; born: number }

export type FeedState = {
  tick: number
  active: Attack[]
  recent: Attack[]
  counts: Record<AttackType, number>
}

export const initialFeed: FeedState = {
  tick: 0,
  active: [],
  recent: [],
  counts: { DDoS: 0, Malware: 0, Phishing: 0, Intrusion: 0 },
}

/** Pick a random attack between two different cities. `random` returns [0, 1). */
export function randomShot(random: () => number = Math.random): Shot {
  const pick = <T>(list: readonly T[]) =>
    list[Math.floor(random() * list.length)]
  const from = pick(CITIES)
  const others = CITIES.filter((city) => city !== from)
  return { type: pick(ATTACK_TYPES).name, from, to: pick(others) }
}

/** Fire `shot` and retire any attack that has outlived its animation. */
export function advance(state: FeedState, shot: Shot): FeedState {
  const tick = state.tick + 1
  const attack: Attack = { ...shot, id: tick, born: tick }
  return {
    tick,
    active: [
      ...state.active.filter((a) => tick - a.born < LIFETIME_TICKS),
      attack,
    ],
    recent: [attack, ...state.recent].slice(0, FEED_SIZE),
    counts: { ...state.counts, [shot.type]: state.counts[shot.type] + 1 },
  }
}

type Point = [number, number]

/** SVG path for a curve from `a` to `b`, bowed upward in proportion to its length. */
export function arcPath([ax, ay]: Point, [bx, by]: Point): string {
  const lift = Math.hypot(bx - ax, by - ay) * 0.3
  const cx = (ax + bx) / 2
  const cy = (ay + by) / 2 - lift
  return `M${ax} ${ay}Q${cx} ${cy} ${bx} ${by}`
}
