import { lazy, Suspense } from "react"
import { WikiLink } from "../wiki-link"
import {
  ArticleHeading,
  Callout,
  Cite,
  References,
  Section,
} from "../article-parts"

// The land outlines are a large chunk of JSON, so only this article loads them.
const ThreatMap = lazy(() =>
  import("../threat-map").then((m) => ({ default: m.ThreatMap })),
)

const seeAlso = [
  "Cyber security",
  "Denial-of-service attack",
  "Malware",
  "Phishing",
  "Incident response",
]

const references = [
  <>
    Krebs, B. (2016). &ldquo;Sources: Security Firm Norse Corp.
    Imploding&rdquo;. <i>Krebs on Security</i>.
  </>,
  <>
    <i>Digital Attack Map</i>. Google Ideas and Arbor Networks.
  </>,
]

export function CyberThreatMapArticle() {
  return (
    <article>
      <ArticleHeading />

      <div className="wiki-prose">
        <p>
          A <b>cyber threat map</b>, known informally as a <b>pew pew map</b>,
          is an animated world map that draws network attacks as lines fired
          between locations. Security vendors publish them as marketing and they
          often appear on the walls of security operations centres, where they
          are better at impressing visitors than at informing defenders.
        </p>

        <Suspense
          fallback={
            <div className="bg-muted my-4 aspect-[960/640] max-w-4xl rounded-sm border" />
          }
        >
          <ThreatMap />
        </Suspense>

        <Callout title="This map is a simulation">
          <p className="mb-1">
            Every attack above is generated at random in your browser. Cities
            are picked with equal probability, so the map says nothing about
            where attacks really come from or who is behind them.
          </p>
        </Callout>

        <Section anchor="Reading" title="Why they mislead">
          <p>
            A real map is usually fed by a vendor's honeypots, sensors or
            customer telemetry, so it shows what that vendor can see and not the
            whole internet. It also tends to imply more than the data supports:
          </p>
          <ul>
            <li>
              <b>Source is not attacker</b>: traffic may come through a botnet,
              a proxy or a compromised server, and source addresses can be
              spoofed in some attacks.
            </li>
            <li>
              <b>Volume is not risk</b>: most events are automated scanning. A
              targeted intrusion may be a handful of quiet connections that a
              map would never make prominent.
            </li>
            <li>
              <b>Geolocation is approximate</b>: an address often resolves to a
              data centre or a country's midpoint.
            </li>
          </ul>
          <p>
            Vendor maps have included Norse's attack map, whose maker collapsed
            in 2016,
            <Cite n={1} first /> and the Digital Attack Map of large{" "}
            <WikiLink page="Denial-of-service attack">
              denial-of-service attacks
            </WikiLink>
            .
            <Cite n={2} first />
          </p>
        </Section>

        <Section anchor="See_also" title="See also">
          <ul>
            {seeAlso.map((page) => (
              <li key={page}>
                <WikiLink page={page} />
              </li>
            ))}
          </ul>
        </Section>

        <Section
          anchor="References"
          title="References"
          className="text-[0.84rem]"
        >
          <References items={references} />
        </Section>
      </div>
    </article>
  )
}
