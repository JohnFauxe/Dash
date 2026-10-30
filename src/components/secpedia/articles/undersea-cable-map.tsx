import { lazy, Suspense } from "react"
import { WikiLink } from "../wiki-link"
import { ArticleHeading, Callout, Section } from "../article-parts"

// The detailed land outlines are large, so only this article loads them.
const CableMap = lazy(() =>
  import("../cable-map").then((m) => ({ default: m.CableMap })),
)

const seeAlso = [
  "CIA triad",
  "Security of Critical Infrastructure Act 2018",
  "Incident response",
]

export function UnderseaCableMapArticle() {
  return (
    <article>
      <ArticleHeading />

      <div className="wiki-prose">
        <p>
          An <b>undersea cable map</b> shows the fibre-optic cables laid along
          the sea floor between continents, which carry most intercontinental
          internet traffic. Damage to a cable is an availability problem in the
          terms of the <WikiLink page="CIA triad" />, and regions served by few
          cables have the fewest alternatives when one fails.
        </p>

        <Callout title="This map uses placeholder data">
          <p className="mb-1">
            The map shows a small selection of cables, not all of them. Names
            and landing points follow real cables, but routes are sketched by
            hand. Each cable's operator, capacity, fibre pairs and service year
            are made up.
          </p>
        </Callout>

        <Suspense
          fallback={
            <div className="bg-muted my-4 aspect-[960/640] max-w-6xl rounded-sm border" />
          }
        >
          <CableMap />
        </Suspense>

        <Section anchor="See_also" title="See also">
          <ul>
            {seeAlso.map((page) => (
              <li key={page}>
                <WikiLink page={page} />
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </article>
  )
}
