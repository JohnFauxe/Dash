import { Shield } from "../shield"
import { WikiLink } from "../wiki-link"
import {
  ArticleHeading,
  Cite,
  References,
  Infobox,
  Section,
  SubHead,
  Toc,
  WikiTable,
  type TocEntry,
} from "../article-parts"

const contents: TocEntry[] = [
  {
    anchor: "Core_principles",
    title: "Core principles",
    children: [{ anchor: "CIA_triad", title: "The CIA triad" }],
  },
  { anchor: "History", title: "History" },
  { anchor: "Threats_and_attacks", title: "Threats and attacks" },
  {
    anchor: "Defending_systems",
    title: "Defending systems",
    children: [
      { anchor: "Everyday_good_practice", title: "Everyday good practice" },
    ],
  },
  { anchor: "Careers", title: "Careers" },
  { anchor: "See_also", title: "See also" },
  { anchor: "References", title: "References" },
]

const seeAlso = [
  "Australian cyber security standards",
  "Cryptography",
  "Network security",
  "Social engineering",
  "Two-factor authentication",
  "Zero trust architecture",
  "Incident response",
  "Digital forensics",
]

const references = [
  <>
    National Institute of Standards and Technology (2024).{" "}
    <i>The NIST Cybersecurity Framework (CSF) 2.0</i>.
  </>,
  <>
    <i>
      ISO/IEC 27001:2022 — Information security, cybersecurity and privacy
      protection: Information security management systems — Requirements
    </i>
    . International Organization for Standardization.
  </>,
  <>
    Anderson, J. P. (1972). <i>Computer Security Technology Planning Study</i>.
    Electronic Systems Division, United States Air Force.
  </>,
  <>
    European Union Agency for Cybersecurity (2024).{" "}
    <i>ENISA Threat Landscape</i>.
  </>,
  <>
    Verizon Business (2024). <i>Data Breach Investigations Report</i>.
  </>,
  <>
    Cybersecurity and Infrastructure Security Agency.{" "}
    <i>Multi-Factor Authentication: What You Need to Know</i>.
  </>,
]

export function CyberSecurityArticle() {
  return (
    <article>
      <ArticleHeading />

      <div className="wiki-prose">
        <Infobox
          title="Cyber security"
          media={
            <Shield
              role="img"
              aria-label="Shield emblem for cyber security"
              width={64}
              height={64}
            />
          }
          caption="Layered defences protect systems, networks and the people who use them."
          facts={[
            ["Field", "Information technology, information assurance"],
            [
              "Core model",
              <>
                Confidentiality, integrity and availability (the{" "}
                <b>CIA triad</b>)
              </>,
            ],
            [
              "Key practices",
              "Multi-factor authentication, encryption, patching, backups, awareness training",
            ],
            [
              "Related fields",
              "Cryptography, network security, digital forensics, incident response",
            ],
            [
              "Standards",
              <>
                ISO/IEC 27001, NIST Cybersecurity Framework, CIS Controls; see
                also <WikiLink page="Australian cyber security standards" />
              </>,
            ],
            [
              "Typical roles",
              "SOC analyst, penetration tester, security engineer, incident responder",
            ],
          ]}
        />

        <p className="hatnote">
          For habits that keep your own accounts and devices safe, see{" "}
          <WikiLink page="Personal digital hygiene" />.
        </p>

        <p>
          <b>Cyber security</b> (also written <b>cybersecurity</b>) is the
          practice of protecting computer systems, networks and programs from
          digital attack, unauthorised access, damage or theft.
          <Cite n={1} first /> The field studies how attacks are carried out,
          how they can be prevented or detected, and what organisations should
          do when defences fail.
          <Cite n={2} first />
        </p>
        <p>
          Its goals are usually summarised by the CIA triad: confidentiality,
          integrity and availability. Because no system can be made perfectly
          safe, modern practice treats security as ongoing risk management:
          reduce what an attacker can reach, detect intrusions quickly, and keep
          the ability to recover. Individuals meet security mainly as habits
          (strong passwords, multi-factor authentication, caution with
          unexpected links), while organisations add layered technical defences,
          monitoring and rehearsed response plans.
        </p>

        <Toc entries={contents} />

        <Section anchor="Core_principles" title="Core principles">
          <p>
            Every security decision answers three questions: who may see this
            information, may it be changed, and will it be there when needed?
            The field formalises these as three properties that controls are
            designed to protect. Security work is judged by practical outcomes,
            so the properties are treated as goals to be managed, not absolute
            states to be achieved.
          </p>
          <SubHead id="CIA_triad">The CIA triad</SubHead>
          <p>
            The <b>CIA triad</b> is the field's model for what security efforts
            protect. Each property suggests its own family of measures:
            <Cite n={2} />
          </p>
          <WikiTable
            head={["Property", "It protects", "Example measures"]}
            rows={[
              [
                "Confidentiality",
                "information from being seen by people who should not have it",
                "encryption, access control, data classification",
              ],
              [
                "Integrity",
                "data and systems from unauthorised or undetected change",
                "checksums, code signing, audit logs, version control",
              ],
              [
                "Availability",
                "services staying usable for the people who rely on them",
                "redundancy, backups, capacity planning, denial-of-service protection",
              ],
            ]}
          />
          <figure className="bg-muted/50 mx-auto my-5 w-fit rounded-sm border p-3 text-center">
            <svg
              viewBox="-24 -10 288 234"
              width="240"
              role="img"
              aria-label="Triangle diagram: confidentiality, integrity and availability at the three corners"
              className="fill-foreground mx-auto text-[13px]"
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
            <figcaption className="text-muted-foreground mt-2 max-w-60 text-xs">
              <b>The CIA triad</b>: the three goals that security controls
              protect.
            </figcaption>
          </figure>
        </Section>

        <Section anchor="History" title="History">
          <ul>
            <li>
              <b>Early 1970s</b>: James P. Anderson's planning study for the
              United States Air Force set out the first structured analysis of
              computer security and the protection goals that later became the
              CIA triad.
              <Cite n={3} first />
            </li>
            <li>
              <b>1988</b>: the Morris worm spreads across the early internet,
              disrupting a notable share of connected machines and prompting the
              creation of the first computer emergency response team.
            </li>
            <li>
              <b>1990s to 2000s</b>: commercial use of the internet turns
              hobbyist viruses into organised crime: email worms, password theft
              and the first large-scale botnets.
            </li>
            <li>
              <b>2010s</b>: ransomware, state-sponsored operations and large
              data breaches make security a board-level concern, and the
              profession matures.
            </li>
            <li>
              <b>2020s</b>: cloud services, hybrid work and default encryption
              reshape defences; zero trust architectures replace the assumption
              that an internal network is trustworthy.
            </li>
          </ul>
        </Section>

        <Section anchor="Threats_and_attacks" title="Threats and attacks">
          <p>
            An attack is a deliberate attempt to breach confidentiality,
            integrity or availability. Attackers usually chain several simple
            techniques rather than one sophisticated trick, and most breaches
            begin with a stolen or guessed credential rather than a novel
            exploit.
            <Cite n={4} first /> The human element is involved in roughly two
            thirds of reported data breaches, which is why procedures and
            training matter as much as software.
            <Cite n={5} first />
          </p>
          <WikiTable
            head={["Threat", "How it works", "Typical defences"]}
            rows={[
              [
                "Phishing",
                "Fake emails, messages or websites that imitate a trusted sender to harvest passwords or install malware",
                "Mail filtering, sender verification, multi-factor authentication, user training",
              ],
              [
                "Ransomware",
                "Malware that encrypts files or locks systems and demands payment for their release",
                "Offline backups, prompt patching, restricted admin rights, network segmentation",
              ],
              [
                "Malware",
                "Umbrella term for viruses, worms, trojans, spyware and rootkits that run unwanted code",
                "Up-to-date antivirus or endpoint detection, software updates, allowlists",
              ],
              [
                "Social engineering",
                "Manipulating people through pretexting or impersonation into revealing information or access",
                "Identity-verification steps, least-privilege access, awareness training",
              ],
              [
                "Denial of service",
                "Flooding a service with traffic until genuine users cannot reach it",
                "Traffic filtering, content delivery networks, capacity planning",
              ],
              [
                "Web application attacks",
                "Untrusted input is treated as code or reaches another user (SQL injection, cross-site scripting)",
                "Input validation, parameterised queries, output encoding, security testing",
              ],
              [
                "Man-in-the-middle",
                "An attacker silently relays or alters traffic between two parties",
                "TLS encryption, certificate validation, VPNs on untrusted networks",
              ],
              [
                "Insider threats",
                "People with legitimate access who misuse it, deliberately or by accident",
                "Least privilege, audit logging, clear onboarding and offboarding",
              ],
            ]}
          />
        </Section>

        <Section anchor="Defending_systems" title="Defending systems">
          <p>
            Individual controls fail. Defenders therefore layer controls so that
            a single failure does not expose everything, an approach known as{" "}
            <b>defence in depth</b>. A typical layering runs from the governance
            of people down to the data itself:
            <Cite n={1} />
          </p>
          <ul>
            <li>
              <b>Governance and people</b>: policy, training and a culture of
              questioning the unexpected
            </li>
            <li>
              <b>Perimeter and network</b>: firewalls, segmentation and
              controlled remote access
            </li>
            <li>
              <b>Endpoint</b>: hardened configurations and endpoint detection
              and response
            </li>
            <li>
              <b>Application</b>: secure coding, dependency updates and security
              testing
            </li>
            <li>
              <b>Data</b>: classification, encryption and backups
            </li>
            <li>
              <b>Monitoring and response</b>: centralised logging, alerting and
              a rehearsed incident response plan
            </li>
          </ul>
          <SubHead id="Everyday_good_practice">Everyday good practice</SubHead>
          <p>
            Few learners can reshape an organisation, but the personal measures
            below block a large share of attacks:
            <Cite n={6} first />
          </p>
          <ol>
            <li>
              Use a unique, long password for each account, kept in a password
              manager.
            </li>
            <li>
              Turn on multi-factor authentication wherever it is offered; it
              blocks most password attacks even when the password leaks.
            </li>
            <li>
              Install updates promptly for systems, phones and applications;
              most exploits target known, unpatched flaws.
            </li>
            <li>
              Keep backups disconnected from the network, following the 3-2-1
              rule (three copies, two media types, one off site).
            </li>
            <li>
              Check links before you click: inspect the sender's address and be
              suspicious of urgency.
            </li>
            <li>
              Limit what you install, and remove software you no longer use.
            </li>
          </ol>
        </Section>

        <Section anchor="Careers" title="Careers">
          <ul>
            <li>
              <b>Security operations centre (SOC) analyst</b>: watches alerts,
              triages incidents and escalates what matters.
            </li>
            <li>
              <b>Penetration tester</b>: attacks systems under explicit, written
              authorisation to find weaknesses before criminals do.
            </li>
            <li>
              <b>Security engineer</b>: builds and maintains the technical
              defences.
            </li>
            <li>
              <b>Incident responder</b>: investigates breaches and leads
              recovery.
            </li>
            <li>
              <b>Chief information security officer (CISO)</b>: owns the
              organisation's security strategy.
            </li>
          </ul>
          <p>
            Security study includes offensive techniques. Practise them only on
            systems you have explicit permission to test; unauthorised access is
            a crime in most jurisdictions.
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
