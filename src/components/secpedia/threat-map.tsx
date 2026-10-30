import { useEffect, useState } from "react"
import { geoNaturalEarth1, geoPath } from "d3-geo"
import { PauseIcon, PlayIcon } from "lucide-react"
import { feature } from "topojson-client"
import type { GeometryCollection, Topology } from "topojson-specification"
import land from "world-atlas/land-110m.json"
import { Button } from "@/components/ui/button"
import {
  ATTACK_TYPES,
  CITIES,
  TICK_MS,
  advance,
  arcPath,
  initialFeed,
  randomShot,
  type City,
} from "@/lib/threat-map"

const WIDTH = 960
const HEIGHT = 500

const topology = land as unknown as Topology<{ land: GeometryCollection }>
const projection = geoNaturalEarth1().fitSize([WIDTH, HEIGHT], {
  type: "Sphere",
})
const toPath = geoPath(projection)
const landPath = toPath(feature(topology, topology.objects.land)) ?? ""
const spherePath = toPath({ type: "Sphere" }) ?? ""

function point({ lon, lat }: City): [number, number] {
  const [x, y] = projection([lon, lat]) ?? [0, 0]
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}

function colorOf(type: string) {
  return ATTACK_TYPES.find((t) => t.name === type)?.color
}

/** Simulated attack arcs over a world map. Always dark, like the real thing. */
export function ThreatMap() {
  const [feed, setFeed] = useState(initialFeed)
  const [running, setRunning] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      const shot = randomShot()
      setFeed((state) => advance(state, shot))
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [running])

  const total = Object.values(feed.counts).reduce((sum, n) => sum + n, 0)

  return (
    <figure
      data-running={running}
      className="threat-map dark bg-background text-foreground my-4 max-w-4xl rounded-sm border p-3"
    >
      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.84rem]">
        <b>Simulated attack feed</b>
        <span className="text-muted-foreground tabular-nums">
          {total.toLocaleString()} fake events
        </span>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={() => setRunning(!running)}
        >
          {running ? <PauseIcon /> : <PlayIcon />}
          {running ? "Pause" : "Play"}
        </Button>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="World map with animated arcs between cities, showing randomly generated attacks"
        className="block h-auto w-full"
      >
        <path d={spherePath} className="fill-card" />
        <path d={landPath} className="fill-muted-foreground/40" />
        {CITIES.map((city) => {
          const [x, y] = point(city)
          return (
            <circle
              key={city.name}
              cx={x}
              cy={y}
              r={1.8}
              className="fill-muted-foreground"
            />
          )
        })}
        {feed.active.map((attack) => {
          const d = arcPath(point(attack.from), point(attack.to))
          const [x, y] = point(attack.to)
          return (
            <g
              key={attack.id}
              fill="none"
              stroke={colorOf(attack.type)}
              strokeLinecap="round"
            >
              <path
                d={d}
                pathLength={1}
                strokeWidth={1}
                className="threat-trail"
              />
              <path
                d={d}
                pathLength={1}
                strokeWidth={2.5}
                className="threat-bolt"
              />
              <circle
                cx={x}
                cy={y}
                r={12}
                strokeWidth={1.5}
                className="threat-ring"
              />
            </g>
          )
        })}
      </svg>

      <figcaption className="mt-2 grid gap-x-6 gap-y-2 text-[0.8rem] md:grid-cols-[auto_1fr]">
        <ul className="m-0! list-none! space-y-0.5!">
          {ATTACK_TYPES.map(({ name, color }) => (
            <li key={name} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 rounded-full"
                style={{ background: color }}
              />
              <span className="w-18">{name}</span>
              <span className="text-muted-foreground tabular-nums">
                {feed.counts[name].toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <ol className="m-0! min-h-[6.6em] list-none! space-y-0!">
          {feed.recent.map((attack) => (
            <li key={attack.id} className="flex gap-2 truncate">
              <span
                className="w-18 shrink-0"
                style={{ color: colorOf(attack.type) }}
              >
                {attack.type}
              </span>
              <span className="truncate">
                {attack.from.name} → {attack.to.name}
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
