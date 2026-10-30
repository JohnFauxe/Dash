import { WikiLink } from "../wiki-link"
import {
  ArticleHeading,
  Callout,
  Cite,
  Infobox,
  References,
  Section,
  SubHead,
  Toc,
  WikiTable,
  type TocEntry,
} from "../article-parts"

const contents: TocEntry[] = [
  {
    anchor: "Properties",
    title: "The three properties",
    children: [
      { anchor: "Confidentiality", title: "Confidentiality" },
      { anchor: "Integrity", title: "Integrity" },
      { anchor: "Availability", title: "Availability" },
    ],
  },
  { anchor: "Trade_offs", title: "Trade-offs" },
  { anchor: "Using_the_model", title: "Using the model" },
  { anchor: "History", title: "History" },
  { anchor: "Limitations", title: "Limitations and extensions" },
  { anchor: "See_also", title: "See also" },
  { anchor: "References", title: "References" },
]

const seeAlso = [
  "Cyber security",
  "Australian cyber security standards",
  "Cryptography",
  "Denial-of-service attack",
  "Ransomware",
  "Two-factor authentication",
]

const references = [
  <>
    <i>
      ISO/IEC 27000:2018 — Information technology — Security techniques —
      Information security management systems — Overview and vocabulary
    </i>
    . International Organization for Standardization.
  </>,
  <>
    National Institute of Standards and Technology (2004).{" "}
    <i>
      FIPS 199: Standards for Security Categorization of Federal Information and
      Information Systems
    </i>
    .
  </>,
  <>
    Saltzer, J. H.; Schroeder, M. D. (1975). &ldquo;The Protection of
    Information in Computer Systems&rdquo;. <i>Proceedings of the IEEE</i>, 63
    (9).
  </>,
  <>
    Parker, D. B. (1998).{" "}
    <i>Fighting Computer Crime: A New Framework for Protecting Information</i>.
    Wiley.
  </>,
]

export function CiaTriadArticle() {
  return (
    <article>
      <ArticleHeading />

      <div className="wiki-prose">
        <Infobox
          title="CIA triad"
          media={
            <svg
              viewBox="-24 -10 288 234"
              width="160"
              role="img"
              aria-label="Triangle diagram: confidentiality, integrity and availability at the three corners"
              className="fill-foreground text-[13px]"
            >
              <path
                d="M120 16 L10 198 L230 198 Z"
                strokeWidth="1.6"
                className="fill-muted stroke-muted-foreground"
              />
              <text x="120" y="6" textAnchor="middle">
                Confidentiality
              </text>
              <text x="8" y="216" textAnchor="start">
                Availability
              </text>
              <text x="232" y="216" textAnchor="end">
                Integrity
              </text>
            </svg>
          }
          caption="The three goals that security controls protect."
          facts={[
            ["Type", "Information security model"],
            ["Properties", "Confidentiality, integrity, availability"],
            ["Also called", "AIC triad"],
            [
              "Defined in",
              "ISO/IEC 27000, FIPS 199 and many other security standards",
            ],
            [
              "Extended by",
              "Authenticity, accountability, non-repudiation, Parkerian hexad",
            ],
            ["Parent field", <WikiLink key="field" page="Cyber security" />],
          ]}
        />

        <p>
          The <b>CIA triad</b> is a model of the three properties that
          information security aims to preserve: <b>confidentiality</b>,{" "}
          <b>integrity</b> and <b>availability</b>.
          <Cite n={1} first /> It gives security work a shared vocabulary: any
          risk, incident or control can be described by the properties it
          affects. The initials have no connection to the United States Central
          Intelligence Agency.
        </p>
        <p>
          The model is deliberately simple. It says what should be protected,
          not how to protect it, which is why it appears at the start of most
          security courses and underpins more detailed standards.
        </p>

        <Toc entries={contents} />

        <Section anchor="Properties" title="The three properties">
          <WikiTable
            head={["Property", "Question it asks", "Failure looks like"]}
            rows={[
              [
                "Confidentiality",
                "Can only authorised people see this?",
                "A customer database is stolen and published",
              ],
              [
                "Integrity",
                "Is this accurate, and is every change authorised?",
                "An attacker alters the bank details on an invoice",
              ],
              [
                "Availability",
                "Can authorised people use this when they need it?",
                "A flood of traffic takes a website offline",
              ],
            ]}
          />

          <SubHead id="Confidentiality">Confidentiality</SubHead>
          <p>
            Confidentiality means information is not disclosed to people,
            organisations or processes that are not authorised to have it.
            <Cite n={1} /> Common measures include encryption, access control,
            multi-factor authentication and data classification. Failures are
            often called data breaches, as in the 2022 Medibank incident, in
            which data on about 9.7 million Australian customers was stolen.
          </p>

          <SubHead id="Integrity">Integrity</SubHead>
          <p>
            Integrity means information stays accurate and complete, and is
            changed only in authorised ways. Common measures include digital
            signatures, hash checks, version control, audit logs and separation
            of duties. Integrity failures can be harder to notice than the other
            two, because a system can keep running on data that is quietly
            wrong. The Stuxnet malware, for example, disrupted Iranian uranium
            centrifuges while feeding operators normal-looking readings.
          </p>

          <SubHead id="Availability">Availability</SubHead>
          <p>
            Availability means systems and information can be used on demand by
            those authorised to do so. Common measures include redundancy,
            backups, capacity planning, patching and denial-of-service
            protection. Not every outage is an attack: hardware faults, botched
            updates and natural disasters also threaten availability. The 2016
            attack on the DNS provider Dyn, launched from the Mirai botnet, made
            many major websites unreachable for parts of a day.
          </p>

          <Callout title="One incident, several properties">
            <p className="mb-1">
              Real incidents rarely touch just one property. Modern ransomware
              encrypts files (availability) and steals a copy to threaten
              publication (confidentiality), and victims may then be unable to
              trust what they restore (integrity).
            </p>
          </Callout>
        </Section>

        <Section anchor="Trade_offs" title="Trade-offs">
          <p>
            The three properties can pull against each other, so security design
            involves choosing a balance, not maximising all three:
          </p>
          <ul>
            <li>
              <b>Confidentiality against availability</b>: strong encryption
              protects data, but losing the key makes it unusable.
            </li>
            <li>
              <b>Integrity against availability</b>: approvals and verification
              steps catch bad changes, but slow down legitimate ones.
            </li>
            <li>
              <b>Availability against confidentiality</b>: every extra backup
              makes data easier to recover, and is another copy to protect.
            </li>
          </ul>
          <p>
            The right balance depends on the system. A hospital may rank the
            availability and integrity of patient records above all else during
            treatment, while a password store puts confidentiality first.
          </p>
        </Section>

        <Section anchor="Using_the_model" title="Using the model">
          <p>
            Practitioners use the triad to reason about what matters and why.
            The United States standard FIPS 199, for example, rates the
            potential impact of losing each property separately as low, moderate
            or high, and the ratings then guide which controls a system needs.
            <Cite n={2} first /> A worked example for three systems:
          </p>
          <WikiTable
            head={["System", "Confidentiality", "Integrity", "Availability"]}
            rows={[
              ["Public website", "Low", "Moderate", "Moderate"],
              ["Payroll system", "High", "High", "Moderate"],
              ["Hospital patient records", "High", "High", "High"],
            ]}
          />
          <p>
            These ratings are illustrative; a real assessment depends on the
            organisation and the harm that a failure would cause.
          </p>
        </Section>

        <Section anchor="History" title="History">
          <p>
            No single author is credited with the triad, and it is not clear who
            first used the name. The ideas emerged in computer security research
            during the 1970s. James P. Anderson's 1972 study for the United
            States Air Force was an early structured analysis of the field, and
            in 1975 Jerome Saltzer and Michael Schroeder grouped security
            violations into unauthorised release of information, unauthorised
            modification of information and unauthorised denial of use, which
            closely match the three modern properties.
            <Cite n={3} first /> The model later became standard in security
            frameworks and qualifications.
          </p>
        </Section>

        <Section anchor="Limitations" title="Limitations and extensions">
          <p>
            Critics argue that three properties cannot capture everything
            security must deliver. ISO/IEC 27000 notes that other properties,
            such as authenticity, accountability, non-repudiation and
            reliability, can also be involved.
            <Cite n={1} /> Donn Parker's <b>Parkerian hexad</b> adds three
            elements: possession or control, authenticity and utility.
            <Cite n={4} first /> The triad also says little about privacy, about
            safety in systems that act on the physical world, or about the
            people and processes around technology.
          </p>
          <p>
            It therefore works best as a starting point for thinking about risk,
            alongside fuller frameworks such as the{" "}
            <WikiLink page="NIST Cybersecurity Framework" /> and the{" "}
            <WikiLink page="Essential Eight" />.
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
