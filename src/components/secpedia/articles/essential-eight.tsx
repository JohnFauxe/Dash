import { Shield } from "../shield"
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
    anchor: "Strategies",
    title: "The eight strategies",
    children: [
      { anchor: "Prevent", title: "Preventing attacks" },
      { anchor: "Limit", title: "Limiting the extent of incidents" },
      { anchor: "Recover", title: "Recovering data and availability" },
    ],
  },
  {
    anchor: "Maturity_model",
    title: "Maturity model",
    children: [{ anchor: "Scoring", title: "How a level is determined" }],
  },
  { anchor: "Who_must_comply", title: "Who uses it" },
  { anchor: "Getting_started", title: "Getting started" },
  { anchor: "Limitations", title: "Limitations" },
  { anchor: "History", title: "History" },
  { anchor: "See_also", title: "See also" },
  { anchor: "References", title: "References" },
]

const seeAlso = [
  "Australian cyber security standards",
  "Cyber security",
  "CIA triad",
  "Information Security Manual",
  "NIST Cybersecurity Framework",
  "Two-factor authentication",
  "Ransomware",
]

const references = [
  <>
    Australian Signals Directorate (2023). <i>Essential Eight Maturity Model</i>
    . Australian Cyber Security Centre, November 2023 update.
  </>,
  <>
    Australian Signals Directorate (2017).{" "}
    <i>Strategies to Mitigate Cyber Security Incidents</i>.
  </>,
  <>
    Department of Home Affairs (2024).{" "}
    <i>Protective Security Policy Framework</i>. Release 2024.
  </>,
  <>
    Australian Signals Directorate (2025).{" "}
    <i>Commonwealth Cyber Security Posture in 2025</i>.
  </>,
]

export function EssentialEightArticle() {
  return (
    <article>
      <ArticleHeading />

      <div className="wiki-prose">
        <Infobox
          title="Essential Eight"
          media={
            <Shield
              role="img"
              aria-label="Shield emblem for the Essential Eight"
              width={64}
              height={64}
            />
          }
          caption="Eight baseline mitigation strategies, measured against a maturity model."
          facts={[
            ["Publisher", "Australian Signals Directorate (ASD)"],
            ["Introduced", "2017, expanding the earlier Top 4"],
            ["Type", "Prioritised mitigation strategies"],
            [
              "Measured by",
              "Essential Eight Maturity Model, Levels Zero to Three",
            ],
            [
              "Mainly applies to",
              "Microsoft Windows-based networks connected to the internet",
            ],
            [
              "Parent topic",
              <WikiLink
                key="parent"
                page="Australian cyber security standards"
              />,
            ],
          ]}
        />

        <p>
          The <b>Essential Eight</b> is a prioritised set of eight mitigation
          strategies published by the Australian Signals Directorate (ASD) to
          make it much harder for adversaries to compromise internet-connected
          Microsoft Windows-based networks.
          <Cite n={1} first /> It is drawn from ASD's longer{" "}
          <i>Strategies to Mitigate Cyber Security Incidents</i> list.
          <Cite n={2} first />
        </p>
        <p>
          It is the best-known Australian cyber security standard. Commonwealth
          entities must implement it under the Protective Security Policy
          Framework, and many private organisations adopt it voluntarily because
          its requirements are concrete and testable.
        </p>

        <Toc entries={contents} />

        <Section anchor="Strategies" title="The eight strategies">
          <p>
            The strategies are usually grouped by what they achieve: the first
            stop malicious code from reaching or running on a system, the next
            contain an attacker who gets in, and the last makes recovery
            possible.
            <Cite n={2} />
          </p>

          <SubHead id="Prevent">Preventing attacks</SubHead>
          <WikiTable
            head={["Strategy", "What it requires", "Why it helps"]}
            rows={[
              [
                "Application control",
                "Only approved programs, scripts, installers and libraries can run",
                "Malicious code fails to execute even if it reaches the system",
              ],
              [
                "Patch applications",
                "Fix vulnerabilities within set timeframes, fastest for internet-facing services; remove unsupported applications",
                "Closes known flaws before they can be exploited",
              ],
              [
                "Configure Microsoft Office macro settings",
                "Block macros from the internet; allow only vetted or trusted macros",
                "Stops malicious documents from running code",
              ],
              [
                "User application hardening",
                "Browsers block web advertisements and Java; risky features such as OLE and legacy PowerShell are disabled",
                "Removes common routes for drive-by downloads and abuse of built-in tools",
              ],
            ]}
          />

          <SubHead id="Limit">Limiting the extent of incidents</SubHead>
          <WikiTable
            head={["Strategy", "What it requires", "Why it helps"]}
            rows={[
              [
                "Restrict administrative privileges",
                "Validate requests, limit privileged accounts, block their internet and email access, review them regularly",
                "A compromised account can reach less of the network",
              ],
              [
                "Patch operating systems",
                "Fix vulnerabilities within set timeframes, fastest for internet-facing systems; use only supported versions",
                "Blocks exploits used to gain higher privileges or move between systems",
              ],
              [
                "Multi-factor authentication",
                "MFA for online services, remote access and privileged users; phishing-resistant MFA at higher levels",
                "A stolen password alone is no longer enough",
              ],
            ]}
          />

          <SubHead id="Recover">Recovering data and availability</SubHead>
          <WikiTable
            head={["Strategy", "What it requires", "Why it helps"]}
            rows={[
              [
                "Regular backups",
                "Back up important data, software and settings; test restoration; protect backups from modification and deletion",
                "Systems can be restored after ransomware or a destructive attack",
              ],
            ]}
          />
        </Section>

        <Section anchor="Maturity_model" title="Maturity model">
          <p>
            Implementation is measured with the{" "}
            <b>Essential Eight Maturity Model</b>. Each level is defined by the
            sophistication of the adversary it is designed to resist, not simply
            by how much work has been done.
            <Cite n={1} />
          </p>
          <WikiTable
            head={["Level", "Adversary it targets", "Typical expectation"]}
            rows={[
              [
                "Maturity Level Zero",
                "None: weaknesses in the overall posture",
                "Strategies are not implemented or not to the Level One standard",
              ],
              [
                "Maturity Level One",
                "Opportunistic adversaries using commodity tools and publicly available exploits",
                "Baseline for small businesses and the minimum named in critical infrastructure rules",
              ],
              [
                "Maturity Level Two",
                "Adversaries willing to invest more time and use moderately sophisticated techniques, such as targeted phishing",
                "Required target for non-corporate Commonwealth entities",
              ],
              [
                "Maturity Level Three",
                "Adaptive, persistent adversaries who exploit weaknesses quickly and target specific organisations",
                "For high-value targets such as defence, national security and critical infrastructure",
              ],
            ]}
          />

          <SubHead id="Scoring">How a level is determined</SubHead>
          <p>
            An organisation's overall level is the <i>lowest</i> level it
            achieves across all eight strategies. A single weak strategy
            therefore caps the result, however strong the others are. ASD
            advises reaching the same level across all eight before moving to
            the next.
            <Cite n={1} />
          </p>
          <Callout title="Study tip">
            <p className="mb-1">
              Remember that levels describe the adversary. Level One resists
              opportunists, Level Two resists those who invest more effort, and
              Level Three resists adaptive attackers targeting you specifically.
            </p>
          </Callout>
        </Section>

        <Section anchor="Who_must_comply" title="Who uses it">
          <ul>
            <li>
              <b>Non-corporate Commonwealth entities</b>: must implement the
              strategies under the Protective Security Policy Framework, with
              Maturity Level Two as the required target.
              <Cite n={3} first />
            </li>
            <li>
              <b>Critical infrastructure operators</b>: Maturity Level One is
              one of the frameworks they may use to meet their risk management
              program obligations.
            </li>
            <li>
              <b>Other organisations</b>: adoption is voluntary, though
              customers and insurers may ask about it.
            </li>
          </ul>
          <p>
            Adoption is still uneven. ASD's annual Commonwealth posture report
            found that only 22 per cent of federal entities reached overall
            Maturity Level Two in 2025, up from 15 per cent the year before.
            <Cite n={4} first /> Patching and application control are commonly
            the weakest strategies.
          </p>
        </Section>

        <Section anchor="Getting_started" title="Getting started">
          <ol>
            <li>
              <b>Identify the systems in scope</b> and what the organisation
              most needs to protect.
            </li>
            <li>
              <b>Choose a target level</b> based on who is likely to attack the
              organisation.
            </li>
            <li>
              <b>Assess the current state</b> of each strategy and record the
              gaps.
            </li>
            <li>
              <b>Close the gaps evenly</b>, because the lowest strategy sets the
              overall level.
            </li>
            <li>
              <b>Reassess regularly</b>, since systems, threats and the model
              itself all change.
            </li>
          </ol>
        </Section>

        <Section anchor="Limitations" title="Limitations">
          <p>
            The Essential Eight is a baseline, not a complete security program.
            It says little about logging, network segmentation, cloud services
            or incident response, and it was designed around Windows-based
            networks, so it needs interpretation for other environments. ASD
            notes that it does not stop every attack and that organisations may
            need further mitigations based on their own risks.
            <Cite n={1} /> Broader coverage comes from the{" "}
            <WikiLink page="Information Security Manual" />, while the{" "}
            <WikiLink page="NIST Cybersecurity Framework" /> helps structure a
            whole program.
          </p>
        </Section>

        <Section anchor="History" title="History">
          <ul>
            <li>
              <b>2010</b>: the Defence Signals Directorate publishes the{" "}
              <i>Strategies to Mitigate Targeted Cyber Intrusions</i>,
              highlighting the &ldquo;Top 4&rdquo; (application control,
              patching applications, patching operating systems and restricting
              admin privileges).
            </li>
            <li>
              <b>2013</b>: the Top 4 become mandatory for Commonwealth agencies
              through the Protective Security Policy Framework.
            </li>
            <li>
              <b>2017</b>: the Top 4 are expanded into the Essential Eight, with
              a first maturity model.
            </li>
            <li>
              <b>2021</b>: the maturity model is restructured so that each level
              is defined by adversary tradecraft rather than implementation
              steps.
            </li>
            <li>
              <b>2023</b>: the November update strengthens patching timeframes,
              phishing-resistant MFA and requirements around internet-facing
              services.
            </li>
            <li>
              <b>2026</b>: ASD consults with government and industry on the
              future direction of the model.
            </li>
          </ul>
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
