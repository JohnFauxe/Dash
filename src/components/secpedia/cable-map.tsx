import { useEffect, useRef, useState, type PointerEvent } from "react"
import { geoNaturalEarth1, geoPath } from "d3-geo"
import {
  ActivityIcon,
  CircleXIcon,
  ExternalLinkIcon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  TriangleAlertIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"
import { feature } from "topojson-client"
import type { GeometryCollection, Topology } from "topojson-specification"
import land from "world-atlas/land-50m.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cables } from "@/data/cables"
import { useCableStatus } from "@/hooks/use-cable-status"
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
import {
  FAULT_LEVELS,
  faultLevelStyle,
  incidentsFor,
  type FaultLevel,
  type Incident,
} from "@/lib/cable-status"
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

const levelIcons: Record<FaultLevel, LucideIcon> = {
  confirmed: CircleXIcon,
  suspected: TriangleAlertIcon,
  observed: ActivityIcon,
}

/** Status is always icon + label, never colour alone. */
function LevelLabel({ level }: { level: FaultLevel }) {
  const { label, color } = faultLevelStyle(level)
  const Icon = levelIcons[level]
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <Icon className="size-3.5 shrink-0" style={{ color }} aria-hidden />
      {label}
    </span>
  )
}

function LevelIcon({ level }: { level: FaultLevel }) {
  const { label, color } = faultLevelStyle(level)
  const Icon = levelIcons[level]
  return <Icon className="size-3.5" style={{ color }} aria-label={label} />
}

function formatDate(iso?: string) {
  const date = new Date(iso ?? "")
  return Number.isNaN(date.getTime())
    ? "unknown"
    : date.toLocaleDateString("en-AU", { dateStyle: "medium" })
}

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 underline"
    >
      {children}
      <ExternalLinkIcon className="size-3" aria-hidden />
    </a>
  )
}

function IncidentRow({ incident }: { incident: Incident }) {
  return (
    <li className="border-t py-1.5 first:border-t-0">
      <div className="flex flex-wrap items-center gap-x-3">
        <LevelLabel level={incident.level} />
        <b>{incident.title}</b>
      </div>
      <div className="text-muted-foreground text-xs">
        {incident.phase} · {incident.severity} severity · updated{" "}
        {formatDate(incident.lastUpdatedAt)}
        {incident.expectedRestoreAt &&
          ` · repair estimate ${formatDate(incident.expectedRestoreAt)}`}
        {incident.faultPoint &&
          !incident.exactLocation &&
          " · marker is approximate"}
      </div>
      <ExternalLink href={incident.url}>Incident report</ExternalLink>
    </li>
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
  const status = useCableStatus()
  const { incidents, alerts, directory } = status
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef({ x: 0, y: 0, active: false, moved: false })

  const visible = filterCables(sorted, query, hidden)
  const selected = visible.find((cable) => cable.name === selectedName)

  const levelFor = (cable: Cable): FaultLevel | undefined =>
    incidents ? incidentsFor(incidents, cable.slug)[0]?.level : undefined
  const faultyOnMap = cables.filter(levelFor).length
  const selectedIncidents =
    selected && incidents ? incidentsFor(incidents, selected.slug) : []
  const selectedAlerts = alerts?.filter((a) => a.slug === selected?.slug) ?? []
  const selectedFacts = selected && directory?.get(selected.slug)

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

  // Faults paint above healthy cables, and the selected cable above everything.
  const rank = (cable: Cable) =>
    cable === selected ? 2 : levelFor(cable) ? 1 : 0
  const drawOrder = [...visible].sort((a, b) => rank(a) - rank(b))

  return (
    <figure className="dark bg-background text-foreground my-4 max-w-6xl rounded-sm border p-3">
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.84rem]">
        <b>Undersea cables</b>
        <span className="text-muted-foreground">
          {visible.length} of {cables.length} shown
        </span>
        <span role="status" className="text-muted-foreground">
          {status.loading && "Checking live status…"}
          {!status.loading &&
            !incidents &&
            "Live status unavailable, so faults are not shown"}
          {incidents &&
            `${incidents.length} open ${incidents.length === 1 ? "incident" : "incidents"} worldwide, on ${faultyOnMap} of these cables · checked ${status.updatedAt?.toLocaleTimeString("en-AU", { timeStyle: "short" })}`}
          {incidents && status.failed && " · latest refresh failed"}
          {status.truncated && " · some incidents may be missing"}
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
            aria-label="World map of undersea cables, coloured by region, with faults dashed. The lists around it have the same information."
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
              const level = levelFor(cable)
              const fault = level && faultLevelStyle(level)
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
                    stroke={fault?.color ?? colorOf(cable.region)}
                    strokeWidth={isSelected ? 3.5 : fault ? 2.5 : 1.5}
                    strokeDasharray={fault?.dash}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )
            })}
            {incidents?.map((incident) => {
              const at = incident.faultPoint && projection(incident.faultPoint)
              if (!at) return null
              return (
                <circle
                  key={incident.ref}
                  cx={at[0]}
                  cy={at[1]}
                  r={5 / view.k}
                  fill={faultLevelStyle(incident.level).color}
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  className="stroke-card"
                >
                  <title>{incident.title}</title>
                </circle>
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
              {levelFor(hover.cable) && (
                <LevelLabel level={levelFor(hover.cable)!} />
              )}
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
                  {levelFor(cable) && (
                    <span className="ml-auto">
                      <LevelIcon level={levelFor(cable)!} />
                    </span>
                  )}
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

      <figcaption className="mt-3 space-y-3 text-[0.84rem]">
        <div
          aria-live="polite"
          className="bg-muted min-h-24 rounded-sm px-3 py-2"
        >
          {selected ? (
            <>
              <div className="flex flex-wrap items-center gap-x-2">
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
              <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4">
                <Fact
                  label="Owners"
                  value={selectedFacts?.owners.join(", ") || "Not available"}
                />
                <Fact
                  label="Length"
                  value={
                    selectedFacts?.lengthKm
                      ? `${selectedFacts.lengthKm.toLocaleString("en-AU")} km`
                      : "Not available"
                  }
                />
                <Fact
                  label="Ready for service"
                  value={String(selectedFacts?.rfsYear ?? "Not available")}
                />
                <Fact
                  label="Sketched route"
                  value={`${routeLengthKm(selected.route).toLocaleString("en-AU")} km`}
                />
              </dl>
              <div className="mt-2">
                {!incidents && (
                  <span className="text-muted-foreground">
                    Status unavailable.
                  </span>
                )}
                {incidents && selectedIncidents.length === 0 && (
                  <span className="text-muted-foreground">
                    No reported fault. This does not guarantee the cable is
                    healthy.
                  </span>
                )}
                {selectedIncidents.length > 0 && (
                  <ul className="m-0! list-none! space-y-0!">
                    {selectedIncidents.map((incident) => (
                      <IncidentRow key={incident.ref} incident={incident} />
                    ))}
                  </ul>
                )}
              </div>
              {selectedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="text-muted-foreground mt-1 text-xs"
                >
                  Latency alert, not a confirmed fault: {alert.verdict}.{" "}
                  <ExternalLink href={alert.url}>Details</ExternalLink>
                </div>
              ))}
            </>
          ) : (
            <span className="text-muted-foreground">
              Select a cable on the map or in the list for its details. Scroll
              or use the buttons to zoom, and drag to move around.
            </span>
          )}
        </div>

        {incidents && (
          <section aria-label="Open incidents">
            <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-1">
              <b>Open incidents</b>
              {FAULT_LEVELS.map(({ id, color, dash }) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 text-xs"
                >
                  <svg aria-hidden width="28" height="4">
                    <line
                      x1="1"
                      x2="27"
                      y1="2"
                      y2="2"
                      stroke={color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={dash}
                    />
                  </svg>
                  <LevelLabel level={id} />
                </span>
              ))}
            </div>
            {incidents.length === 0 ? (
              <span className="text-muted-foreground">
                None reported right now.
              </span>
            ) : (
              <ul className="m-0! max-h-72 list-none! space-y-0! overflow-y-auto">
                {incidents.map((incident) => (
                  <IncidentRow key={incident.ref} incident={incident} />
                ))}
              </ul>
            )}
          </section>
        )}

        {alerts && alerts.length > 0 && (
          <section aria-label="Latency alerts">
            <b>Under observation</b>
            <span className="text-muted-foreground ml-2 text-xs">
              Latency alerts, not confirmed faults. They do not change the map.
            </span>
            <ul className="m-0! list-none! space-y-0!">
              {alerts.map((alert) => (
                <li key={alert.id} className="text-xs">
                  {alert.cableName}: {alert.verdict} ·{" "}
                  <ExternalLink href={alert.url}>Details</ExternalLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-muted-foreground m-0! text-xs">
          Status and incidents:{" "}
          <a href="https://submarinecablestatus.com" className="underline">
            Submarine Cable Status
          </a>{" "}
          (
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            className="underline"
          >
            CC BY 4.0
          </a>
          ). Latency alerts:{" "}
          <a href="https://geocables.com" className="underline">
            GeoCables
          </a>{" "}
          (CC BY 4.0). Owners, length and service year: TeleGeography, via
          Submarine Cable Status (
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/3.0/"
            className="underline"
          >
            CC BY-NC-SA 3.0
          </a>
          ).
        </p>
      </figcaption>
    </figure>
  )
}
