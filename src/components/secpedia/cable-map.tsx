import { useEffect, useRef, useState, type PointerEvent } from "react"
import { geoNaturalEarth1, geoPath } from "d3-geo"
import { MinusIcon, PlusIcon, RotateCcwIcon, XIcon } from "lucide-react"
import { feature } from "topojson-client"
import type { GeometryCollection, Topology } from "topojson-specification"
import land from "world-atlas/land-50m.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cables } from "@/data/cables"
import {
  FULL_VIEW,
  MAX_ZOOM,
  REGIONS,
  colorOf,
  countByRegion,
  filterCables,
  fitBounds,
  panBy,
  routeLengthKm,
  zoomAt,
  type Cable,
  type Region,
} from "@/lib/cable-map"
import { cn } from "@/lib/utils"

const SIZE = { width: 960, height: 500 }
const DRAG_THRESHOLD_PX = 3

const topology = land as unknown as Topology<{ land: GeometryCollection }>
const projection = geoNaturalEarth1().fitSize([SIZE.width, SIZE.height], {
  type: "Sphere",
})
const toPath = geoPath(projection)
const landPath = toPath(feature(topology, topology.objects.land)) ?? ""
const spherePath = toPath({ type: "Sphere" }) ?? ""

function line(cable: Cable) {
  return { type: "LineString", coordinates: cable.route } as const
}

const sorted = [...cables].sort((a, b) => a.name.localeCompare(b.name))
const routes = new Map(cables.map((c) => [c.name, toPath(line(c)) ?? ""]))
const counts = countByRegion(cables)

function Swatch({ region }: { region: Region }) {
  return (
    <span
      aria-hidden
      className="size-2.5 shrink-0 rounded-full"
      style={{ background: colorOf(region) }}
    />
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="m-0 tabular-nums">{value}</dd>
    </div>
  )
}

/** Pannable, zoomable world map of undersea cables. Dark in both themes. */
export function CableMap() {
  const [view, setView] = useState(FULL_VIEW)
  const [query, setQuery] = useState("")
  const [hidden, setHidden] = useState<ReadonlySet<Region>>(new Set())
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [hover, setHover] = useState<{
    cable: Cable
    x: number
    y: number
    flip: boolean
  }>()
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef({ x: 0, y: 0, active: false, moved: false })

  const visible = filterCables(sorted, query, hidden)
  const selected = visible.find((cable) => cable.name === selectedName)

  // React's wheel listener is passive. Native lets the map stop the page
  // scrolling, but only while it can still zoom in that direction.
  const { k } = view
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    function onWheel(event: WheelEvent) {
      if ((event.deltaY > 0 && k <= 1) || (event.deltaY < 0 && k >= MAX_ZOOM))
        return
      event.preventDefault()
      const rect = svg!.getBoundingClientRect()
      const fx = (event.clientX - rect.left) / rect.width
      const fy = (event.clientY - rect.top) / rect.height
      const factor = Math.exp(-event.deltaY * 0.002)
      setView((v) => zoomAt(v, factor, fx, fy, SIZE))
    }
    svg.addEventListener("wheel", onWheel, { passive: false })
    return () => svg.removeEventListener("wheel", onWheel)
  }, [k])

  function onPointerDown(event: PointerEvent<SVGSVGElement>) {
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      active: true,
      moved: false,
    }
  }

  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    const state = drag.current
    if (!state.active) return
    const dx = event.clientX - state.x
    const dy = event.clientY - state.y
    if (!state.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return
    if (!state.moved) {
      state.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
      setHover(undefined)
    }
    const rect = event.currentTarget.getBoundingClientRect()
    state.x = event.clientX
    state.y = event.clientY
    setView((v) => panBy(v, dx / rect.width, dy / rect.height, SIZE))
  }

  function onPointerUp() {
    drag.current.active = false
  }

  function hoverAt(cable: Cable, event: PointerEvent<SVGGElement>) {
    if (drag.current.active) return
    const rect = svgRef.current!.getBoundingClientRect()
    setHover({
      cable,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      flip: event.clientX - rect.left > rect.width / 2,
    })
  }

  function toggleRegion(region: Region) {
    const next = new Set(hidden)
    if (!next.delete(region)) next.add(region)
    setHidden(next)
  }

  function focus(cable: Cable) {
    setSelectedName(cable.name)
    setView(fitBounds(toPath.bounds(line(cable)), SIZE))
  }

  // The selected cable paints last, on top of everything else.
  const drawOrder = [...visible].sort(
    (a, b) => Number(a === selected) - Number(b === selected),
  )

  return (
    <figure className="dark bg-background text-foreground my-4 max-w-6xl rounded-sm border p-3">
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.84rem]">
        <b>Undersea cables</b>
        <span className="text-muted-foreground">
          {visible.length} of {cables.length} shown
        </span>
        <div
          role="group"
          aria-label="Show or hide cables by region"
          className="ml-auto flex flex-wrap gap-1"
        >
          {REGIONS.map(({ name }) => (
            <button
              key={name}
              aria-pressed={!hidden.has(name)}
              onClick={() => toggleRegion(name)}
              className={cn(
                "hover:bg-muted flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs",
                hidden.has(name) && "opacity-50",
              )}
            >
              <Swatch region={name} />
              {name}
              <span className="text-muted-foreground tabular-nums">
                {counts[name]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="relative min-w-0 self-start">
          <svg
            ref={svgRef}
            viewBox={`${view.x} ${view.y} ${SIZE.width / view.k} ${SIZE.height / view.k}`}
            role="img"
            aria-label="World map of undersea cables, coloured by region. The list beside it has the same cables."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={() => setHover(undefined)}
            className={cn(
              "block h-auto w-full cursor-grab select-none active:cursor-grabbing",
              view.k > 1 ? "touch-none" : "touch-pan-y",
            )}
          >
            <path d={spherePath} className="fill-card" />
            <path d={landPath} className="fill-muted-foreground/40" />
            {drawOrder.map((cable) => {
              const isSelected = cable === selected
              const d = routes.get(cable.name)
              return (
                <g
                  key={cable.name}
                  fill="none"
                  opacity={selected && !isSelected ? 0.3 : 1}
                  className="cursor-pointer"
                  onPointerMove={(event) => hoverAt(cable, event)}
                  onClick={() => {
                    if (!drag.current.moved)
                      setSelectedName(isSelected ? null : cable.name)
                  }}
                >
                  {/* A wider invisible line makes thin cables easy to hit. */}
                  <path
                    d={d}
                    stroke="transparent"
                    strokeWidth={12}
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={d}
                    stroke={colorOf(cable.region)}
                    strokeWidth={isSelected ? 3 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )
            })}
            {selected?.landings.map(({ name, at }) => {
              const [x, y] = projection(at) ?? [0, 0]
              return (
                <circle
                  key={name}
                  cx={x}
                  cy={y}
                  r={4 / view.k}
                  fill={colorOf(selected.region)}
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  className="stroke-card pointer-events-none"
                />
              )
            })}
          </svg>

          {hover && (
            <div
              className="bg-popover text-popover-foreground pointer-events-none absolute z-10 max-w-56 rounded-sm border px-2 py-1 text-xs shadow-md"
              style={{
                left: hover.x + 12,
                top: hover.y + 12,
                translate: hover.flip ? "calc(-100% - 24px)" : undefined,
              }}
            >
              <b>{hover.cable.name}</b>
              <div className="text-muted-foreground">
                {hover.cable.landings.at(0)?.name} –{" "}
                {hover.cable.landings.at(-1)?.name}
              </div>
            </div>
          )}

          <div className="absolute top-2 left-2 flex gap-1 sm:flex-col">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Zoom in"
              disabled={view.k >= MAX_ZOOM}
              onClick={() => setView(zoomAt(view, 2, 0.5, 0.5, SIZE))}
            >
              <PlusIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Zoom out"
              disabled={view.k <= 1}
              onClick={() => setView(zoomAt(view, 0.5, 0.5, 0.5, SIZE))}
            >
              <MinusIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Reset map view"
              disabled={view === FULL_VIEW}
              onClick={() => setView(FULL_VIEW)}
            >
              <RotateCcwIcon />
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-2 lg:h-0 lg:min-h-full">
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cables or landings"
            aria-label="Search cables by name or landing point"
          />
          <ul className="m-0! max-h-64 min-h-0 flex-1 list-none! space-y-0! overflow-y-auto text-[0.8rem] lg:max-h-none">
            {visible.map((cable) => (
              <li key={cable.name}>
                <button
                  aria-pressed={cable === selected}
                  onClick={() => focus(cable)}
                  className={cn(
                    "hover:bg-muted flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left",
                    cable === selected && "bg-muted font-semibold",
                  )}
                >
                  <Swatch region={cable.region} />
                  <span className="truncate">{cable.name}</span>
                </button>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="text-muted-foreground px-2 py-1">
                No cables match.
              </li>
            )}
          </ul>
        </div>
      </div>

      <figcaption
        aria-live="polite"
        className="bg-muted mt-3 min-h-24 rounded-sm px-3 py-2 text-[0.84rem]"
      >
        {selected ? (
          <>
            <div className="flex items-center gap-2">
              <Swatch region={selected.region} />
              <b>{selected.name}</b>
              <span className="text-muted-foreground">{selected.region}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Clear selection"
                className="ml-auto"
                onClick={() => setSelectedName(null)}
              >
                <XIcon />
              </Button>
            </div>
            <div className="mb-2">
              {selected.landings.map((l) => l.name).join(" – ")}
            </div>
            <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-5">
              <Fact label="Operator" value={selected.operator} />
              <Fact label="Capacity" value={`${selected.capacityTbps} Tbps`} />
              <Fact label="Fibre pairs" value={String(selected.fibrePairs)} />
              <Fact
                label="In service"
                value={String(selected.readyForService)}
              />
              <Fact
                label="Sketched route"
                value={`${routeLengthKm(selected.route).toLocaleString("en-AU")} km`}
              />
            </dl>
            <div className="text-muted-foreground mt-1 text-xs">
              Operator, capacity, fibre pairs and year are placeholders.
            </div>
          </>
        ) : (
          <span className="text-muted-foreground">
            Select a cable on the map or in the list for its details. Scroll or
            use the buttons to zoom, and drag to move around.
          </span>
        )}
      </figcaption>
    </figure>
  )
}
