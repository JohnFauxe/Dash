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
  { anchor: "Regulatory_landscape", title: "Regulatory landscape" },
  {
    anchor: "Relationship_to_NIST",
    title: "Relationship to the NIST Cybersecurity Framework",
    children: [
      { anchor: "NIST_CSF_functions", title: "Mapping the CSF functions" },
      {
        anchor: "NIST_lineage",
        title: "Where NIST appears in Australian rules",
      },
      { anchor: "NIST_differences", title: "Key differences" },
    ],
  },
  {
    anchor: "Essential_Eight",
    title: "Essential Eight",
    children: [
      { anchor: "E8_strategies", title: "The eight mitigation strategies" },
      { anchor: "E8_maturity", title: "Maturity model" },
      { anchor: "E8_history", title: "History" },
    ],
  },
  {
    anchor: "Information_Security_Manual",
    title: "Information Security Manual",
    children: [
      { anchor: "ISM_principles", title: "Cyber security principles" },
      { anchor: "ISM_risk", title: "Risk management framework" },
      { anchor: "ISM_controls", title: "Guidelines and controls" },
    ],
  },
  {
    anchor: "Government_frameworks",
    title: "Government security frameworks",
    children: [
      { anchor: "PSPF", title: "Protective Security Policy Framework" },
      { anchor: "IRAP", title: "IRAP and cloud assessment" },
    ],
  },
  {
    anchor: "Legislation",
    title: "Legislation",
    children: [
      { anchor: "SOCI_Act", title: "Security of Critical Infrastructure Act" },
      { anchor: "Cyber_Security_Act", title: "Cyber Security Act 2024" },
      { anchor: "Privacy_Act", title: "Privacy Act 1988" },
      { anchor: "Directors_duties", title: "Directors' and licensees' duties" },
    ],
  },
  { anchor: "Incident_reporting", title: "Incident reporting obligations" },
  { anchor: "Sector_frameworks", title: "Sector-specific frameworks" },
  { anchor: "Standards_Australia", title: "Standards Australia adoptions" },
  { anchor: "Comparison", title: "Comparison of frameworks" },
  { anchor: "National_strategy", title: "National strategy" },
  { anchor: "Timeline", title: "Timeline" },
  { anchor: "Getting_started", title: "Applying the standards" },
  { anchor: "See_also", title: "See also" },
  { anchor: "References", title: "References" },
]

const seeAlso = [
  "Cyber security",
  "NIST Cybersecurity Framework",
  "Essential Eight",
  "Information Security Manual",
  "Security of Critical Infrastructure Act 2018",
  "ISO/IEC 27001",
  "Notifiable Data Breaches scheme",
  "Zero trust architecture",
  "Incident response",
]

const references = [
  <>
    National Institute of Standards and Technology (2024).{" "}
    <i>The NIST Cybersecurity Framework (CSF) 2.0</i>. NIST CSWP 29.
  </>,
  <>
    Australian Signals Directorate (2023). <i>Essential Eight Maturity Model</i>
    . Australian Cyber Security Centre, November 2023 update.
  </>,
  <>
    Australian Signals Directorate (2026). <i>Information Security Manual</i>.
    September 2026 edition.
  </>,
  <>
    Joint Task Force (2018).{" "}
    <i>
      NIST SP 800-37 Rev. 2: Risk Management Framework for Information Systems
      and Organizations
    </i>
    . National Institute of Standards and Technology.
  </>,
  <>
    Department of Home Affairs (2024).{" "}
    <i>Protective Security Policy Framework</i>. Release 2024.
  </>,
  <>
    <i>Security of Critical Infrastructure Act 2018</i> (Cth), and{" "}
    <i>
      Security of Critical Infrastructure (Critical infrastructure risk
      management program) Rules (LIN 23/006) 2023
    </i>
    .
  </>,
  <>
    <i>Cyber Security Act 2024</i> (Cth), and{" "}
    <i>Cyber Security (Ransomware Payment Reporting) Rules 2025</i>.
  </>,
  <>
    <i>Privacy Act 1988</i> (Cth), as amended by the{" "}
    <i>Privacy and Other Legislation Amendment Act 2024</i> (Cth); Office of the
    Australian Information Commissioner, <i>Notifiable Data Breaches</i>{" "}
    guidance.
  </>,
  <>
    Australian Prudential Regulation Authority (2019).{" "}
    <i>Prudential Standard CPS 234 Information Security</i>; (2023){" "}
    <i>Prudential Standard CPS 230 Operational Risk Management</i>.
  </>,
  <>
    Australian Energy Market Operator. <i>AESCSF Framework Overview</i>, Version
    2.
  </>,
  <>
    Department of Home Affairs (2023).{" "}
    <i>2023–2030 Australian Cyber Security Strategy</i>.
  </>,
  <>
    Australian Signals Directorate (2025).{" "}
    <i>Commonwealth Cyber Security Posture in 2025</i>.
  </>,
  <>
    <i>
      Australian Securities and Investments Commission v RI Advice Group Pty Ltd
    </i>{" "}
    [2022] FCA 496.
  </>,
]

export function AustralianStandardsArticle() {
  return (
    <article>
      <ArticleHeading />

      <div className="wiki-prose">
        <Infobox
          title="Australian cyber security standards"
          media={<FlagBadge />}
          caption="Australia combines prescriptive government controls with risk-based obligations for industry."
          facts={[
            [
              "Lead agency",
              "Australian Signals Directorate (ASD), through the Australian Cyber Security Centre (ACSC)",
            ],
            [
              "Policy owner",
              "Department of Home Affairs; National Cyber Security Coordinator",
            ],
            [
              "Core frameworks",
              "Essential Eight, Information Security Manual (ISM), Protective Security Policy Framework (PSPF)",
            ],
            [
              "Key legislation",
              "Security of Critical Infrastructure Act 2018, Cyber Security Act 2024, Privacy Act 1988",
            ],
            [
              "Sector rules",
              "APRA CPS 234 and CPS 230 (finance), AESCSF (energy), DISP (defence industry)",
            ],
            [
              "International alignment",
              "NIST Cybersecurity Framework 2.0, NIST SP 800-37, ISO/IEC 27001",
            ],
            [
              "National strategy",
              "2023–2030 Australian Cyber Security Strategy",
            ],
          ]}
        />

        <p className="hatnote">
          This article covers Australian frameworks and law. For the general
          topic, see <WikiLink page="Cyber security" />. For the US framework
          most of these are compared against, see{" "}
          <WikiLink page="NIST Cybersecurity Framework" />.
        </p>

        <p>
          <b>Australian cyber security standards</b> are the frameworks, control
          sets and laws that govern how Australian governments, critical
          infrastructure operators and businesses protect their systems and
          data. Unlike jurisdictions that rely on a single national framework,
          Australia uses layers. Federal government agencies follow prescriptive
          technical controls published by the{" "}
          <b>Australian Signals Directorate</b> (ASD), chiefly the{" "}
          <b>Essential Eight</b> and the <b>Information Security Manual</b>{" "}
          (ISM).
          <Cite n={2} first />
          <Cite n={3} first /> Critical infrastructure, regulated financial
          entities and businesses holding personal information face legal
          obligations that are mostly <i>outcome-based</i>: they must manage
          cyber risk and report incidents, but may choose the framework they use
          to do so.
        </p>
        <p>
          The US <b>NIST Cybersecurity Framework</b> (CSF) is a useful reference
          point for studying the Australian system. It is not mandated in
          Australia, but it is named as an acceptable framework in critical
          infrastructure rules, it underpins the energy sector's framework, and
          the ISM's risk management process is adapted from NIST guidance.
          <Cite n={1} first />
          <Cite n={4} first /> Many Australian organisations use the CSF to
          structure their programs and then layer the Essential Eight over it as
          a technical baseline.
        </p>

        <Toc entries={contents} />

        <Section anchor="Regulatory_landscape" title="Regulatory landscape">
          <p>
            Responsibility for cyber security is spread across several
            Commonwealth bodies. Policy and legislation sit with the Department
            of Home Affairs; technical advice, incident response and the control
            frameworks sit with ASD. Sector regulators enforce cyber obligations
            within their own industries.
          </p>
          <WikiTable
            head={["Body", "Role", "Key instruments"]}
            rows={[
              [
                "Australian Signals Directorate (ASD)",
                "National technical authority. Runs the Australian Cyber Security Centre (ACSC), which publishes guidance, responds to incidents and receives incident reports.",
                "Essential Eight, ISM, IRAP, ReportCyber",
              ],
              [
                "Department of Home Affairs",
                "Owns national cyber and critical infrastructure policy and legislation; houses the Cyber and Infrastructure Security Centre (CISC), which regulates critical infrastructure.",
                "SOCI Act, Cyber Security Act 2024, PSPF, national strategy",
              ],
              [
                "National Cyber Security Coordinator",
                "Coordinates the whole-of-government response to major incidents and leads policy coordination. Created in 2023.",
                "Incident coordination; limited-use information sharing",
              ],
              [
                "Office of the Australian Information Commissioner (OAIC)",
                "Privacy regulator. Enforces the security of personal information and runs the data breach notification scheme.",
                "Privacy Act 1988, Notifiable Data Breaches scheme",
              ],
              [
                "Australian Prudential Regulation Authority (APRA)",
                "Prudential regulator for banks, insurers and superannuation funds.",
                "CPS 234, CPS 230, CPG 234",
              ],
              [
                "Australian Securities and Investments Commission (ASIC)",
                "Corporate and markets regulator. Treats poor cyber risk management as a breach of directors' and licensees' duties.",
                "Corporations Act 2001, market integrity rules",
              ],
              [
                "Australian Energy Market Operator (AEMO)",
                "Coordinates the energy sector's cyber maturity program.",
                "AESCSF",
              ],
              [
                "Standards Australia",
                "National standards body. Adopts international security standards as Australian Standards.",
                "AS ISO/IEC 27001, AS IEC 62443",
              ],
            ]}
          />
        </Section>

        <Section
          anchor="Relationship_to_NIST"
          title="Relationship to the NIST Cybersecurity Framework"
        >
          <p>
            The NIST Cybersecurity Framework was first published by the US
            National Institute of Standards and Technology in 2014 for critical
            infrastructure and revised as <b>CSF 2.0</b> in February 2024, which
            broadened its scope to all organisations and added a sixth function,{" "}
            <i>Govern</i>.
            <Cite n={1} /> The CSF is a voluntary, outcome-based taxonomy: it
            describes <i>what</i> a security program should achieve, organised
            into functions, categories and subcategories, and leaves the{" "}
            <i>how</i> to referenced control catalogues such as NIST SP 800-53
            or ISO/IEC 27001.
          </p>
          <p>
            Australian frameworks are easiest to understand when placed against
            this structure. The ISM, for example, adopted the same six function
            names for its cyber security principles, while the Essential Eight
            maps almost entirely onto <i>Protect</i> and <i>Recover</i>.
            <Cite n={3} />
          </p>

          <SubHead id="NIST_CSF_functions">Mapping the CSF functions</SubHead>
          <p>
            The table below is a study aid that relates each CSF 2.0 function to
            the Australian instruments that address it. It is a conceptual
            mapping, not an official crosswalk.
          </p>
          <WikiTable
            head={[
              "CSF 2.0 function",
              "Outcome it describes",
              "Main Australian equivalents",
            ]}
            rows={[
              [
                "Govern (GV)",
                "Cyber risk strategy, roles, policy, oversight and supply chain risk management",
                "ISM Govern principles; PSPF governance requirements; SOCI board-approved CIRMP and annual report; APRA CPS 234 board accountability",
              ],
              [
                "Identify (ID)",
                "Understanding assets, risks and improvement opportunities",
                "ISM Identify principles; SOCI register of critical infrastructure assets; CIRMP hazard identification",
              ],
              [
                "Protect (PR)",
                "Safeguards: identity and access, awareness, data security, platform security, resilience",
                "Essential Eight (seven of its eight strategies); ISM Protect controls; APP 11 under the Privacy Act",
              ],
              [
                "Detect (DE)",
                "Finding and analysing anomalies and attacks",
                "ISM system monitoring and event logging guidelines; ASD's Cyber Threat Intelligence Sharing (CTIS) platform",
              ],
              [
                "Respond (RS)",
                "Incident management, analysis, reporting and mitigation",
                "SOCI 12- and 72-hour incident reporting; ransomware payment reporting; NDB scheme; APRA 72-hour notification",
              ],
              [
                "Recover (RC)",
                "Restoring assets and operations after an incident",
                "Essential Eight regular backups; ISM business continuity controls; APRA CPS 230 tolerance levels",
              ],
            ]}
          />

          <SubHead id="NIST_lineage">
            Where NIST appears in Australian rules
          </SubHead>
          <ul>
            <li>
              <b>Critical infrastructure risk management programs</b>: the SOCI
              rules require responsible entities to comply with a recognised
              cyber framework. The NIST CSF is one of the listed options,
              alongside AS ISO/IEC 27001, Essential Eight Maturity Level One,
              the US Cybersecurity Capability Maturity Model (C2M2) and the
              AESCSF, or an equivalent.
              <Cite n={6} first />
            </li>
            <li>
              <b>ISM risk management framework</b>: the ISM's six-step process
              for authorising systems is adapted from NIST SP 800-37, the US
              Risk Management Framework.
              <Cite n={4} />
            </li>
            <li>
              <b>Energy sector</b>: the Australian Energy Sector Cyber Security
              Framework is built on the US C2M2 maturity model and is closely
              aligned to the NIST CSF.
              <Cite n={10} first />
            </li>
            <li>
              <b>Cryptography</b>: ASD-approved cryptographic algorithms in the
              ISM largely follow NIST standards such as AES, SHA-2 and, for
              post-quantum transition planning, the NIST-standardised ML-KEM and
              ML-DSA.
            </li>
          </ul>

          <SubHead id="NIST_differences">Key differences</SubHead>
          <WikiTable
            head={["Aspect", "NIST CSF", "Australian approach"]}
            rows={[
              [
                "Nature",
                "Voluntary, outcome-based taxonomy",
                "Mix of prescriptive controls (Essential Eight, ISM) and legal obligations",
              ],
              [
                "Prescription",
                "Does not specify controls; points to informative references",
                "Essential Eight specifies exact technical requirements at each maturity level",
              ],
              [
                "Measurement",
                "Profiles and implementation tiers (Partial to Adaptive)",
                "Maturity levels Zero to Three, defined by the adversary tradecraft they resist",
              ],
              [
                "Mandate",
                "Required for US federal agencies by executive policy",
                "ISM and Essential Eight required for non-corporate Commonwealth entities through the PSPF",
              ],
              [
                "Threat focus",
                "Threat-agnostic",
                "Explicitly threat-driven: Essential Eight targets the techniques ASD sees most in incident response",
              ],
            ]}
          />
          <Callout title="Study tip">
            <p className="my-0">
              A common way to explain the two is that the NIST CSF tells you{" "}
              <i>which rooms the house needs</i>, while the Essential Eight
              tells you <i>exactly which locks to put on the doors</i>. Mature
              organisations use the CSF for program structure and board
              reporting, and the Essential Eight as a measurable technical
              baseline.
            </p>
          </Callout>
        </Section>

        <Section anchor="Essential_Eight" title="Essential Eight">
          <p>
            The <b>Essential Eight</b> is a prioritised set of eight mitigation
            strategies published by ASD. It is drawn from the larger{" "}
            <i>Strategies to Mitigate Cyber Security Incidents</i> list and is
            designed to make it much harder for adversaries to compromise
            Microsoft Windows-based networks connected to the internet.
            <Cite n={2} /> It is the best-known Australian cyber standard and is
            widely used outside government as a security baseline.
          </p>

          <SubHead id="E8_strategies">The eight mitigation strategies</SubHead>
          <p>
            The strategies fall into three groups: preventing malware delivery
            and execution, limiting the extent of incidents, and recovering data
            and system availability.
          </p>
          <WikiTable
            head={[
              "Strategy",
              "What it requires",
              "Threat it addresses",
              "CSF function",
            ]}
            rows={[
              [
                "Application control",
                "Only approved programs, scripts, installers and libraries can run",
                "Execution of malicious code",
                "Protect",
              ],
              [
                "Patch applications",
                "Fix vulnerabilities in internet-facing services within 48 hours if an exploit exists; patch other applications within set timeframes; remove unsupported applications",
                "Exploitation of known flaws",
                "Protect / Identify",
              ],
              [
                "Configure Microsoft Office macro settings",
                "Block macros from the internet; allow only vetted or trusted macros",
                "Malicious documents",
                "Protect",
              ],
              [
                "User application hardening",
                "Browsers block web advertisements and Java; disable risky features such as OLE and legacy PowerShell",
                "Drive-by downloads and abuse of built-in tools",
                "Protect",
              ],
              [
                "Restrict administrative privileges",
                "Validate admin requests, limit privileged accounts, block internet and email access for them, review regularly",
                "Privilege escalation and lateral movement",
                "Protect",
              ],
              [
                "Patch operating systems",
                "Patch internet-facing systems within 48 hours if an exploit exists; use only supported OS versions",
                "Exploitation of OS flaws",
                "Protect / Identify",
              ],
              [
                "Multi-factor authentication",
                "MFA for online services, remote access and privileged users; phishing-resistant MFA at higher levels",
                "Credential theft and password spraying",
                "Protect",
              ],
              [
                "Regular backups",
                "Back up important data, software and settings; test restoration; protect backups from modification and deletion",
                "Ransomware and destructive attacks",
                "Recover",
              ],
            ]}
          />

          <SubHead id="E8_maturity">Maturity model</SubHead>
          <p>
            Implementation is measured with the{" "}
            <b>Essential Eight Maturity Model</b>. Each level is defined by the
            sophistication of the adversary it is designed to resist, and an
            organisation's overall level is the <i>lowest</i> level it achieves
            across all eight strategies.
            <Cite n={2} />
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
          <p>
            Adoption is still uneven. ASD's annual Commonwealth posture report
            found that only 22 per cent of federal entities reached overall
            Maturity Level Two in 2025, up from 15 per cent the year before.
            <Cite n={12} first /> Patching and application control are commonly
            the weakest strategies.
          </p>

          <SubHead id="E8_history">History</SubHead>
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

        <Section
          anchor="Information_Security_Manual"
          title="Information Security Manual"
        >
          <p>
            The <b>Information Security Manual</b> (ISM) is ASD's comprehensive
            cyber security framework. Where the Essential Eight is a short
            prioritised list, the ISM contains several hundred controls covering
            the full lifecycle of a system. It is written for government but is
            freely available and widely used by industry, especially suppliers
            to government. The ISM is updated quarterly, in March, June,
            September and December.
            <Cite n={3} />
          </p>

          <SubHead id="ISM_principles">Cyber security principles</SubHead>
          <p>
            The ISM opens with high-level cyber security principles, grouped
            under the same function names as the NIST CSF 2.0. The September
            2026 edition uses all six functions; earlier editions had five, with
            recovery folded into <i>Respond</i>.
          </p>
          <ul>
            <li>
              <b>Govern</b>: a chief information security officer provides
              leadership; security roles and risks are owned and managed.
            </li>
            <li>
              <b>Identify</b>: systems, their business criticality and their
              risks are identified and documented.
            </li>
            <li>
              <b>Protect</b>: systems are designed, deployed, maintained and
              decommissioned securely; access is controlled; data is protected
              at rest and in transit.
            </li>
            <li>
              <b>Detect</b>: event logs are collected and analysed to detect
              cyber security events in a timely manner.
            </li>
            <li>
              <b>Respond</b>: incidents are identified, reported, contained and
              eradicated.
            </li>
            <li>
              <b>Recover</b>: business continuity and disaster recovery plans
              are enacted to restore operations.
            </li>
          </ul>

          <SubHead id="ISM_risk">Risk management framework</SubHead>
          <p>
            The ISM uses a six-step risk management framework adapted from NIST
            SP 800-37.
            <Cite n={4} /> A system owner works through each step before the
            system is authorised to operate:
          </p>
          <ol>
            <li>
              <b>Define the system</b>: its type, purpose, the data it handles
              and its security objectives.
            </li>
            <li>
              <b>Select controls</b>: choose applicable ISM controls and tailor
              them to the system's risk.
            </li>
            <li>
              <b>Implement controls</b>: put the controls in place and document
              them in a system security plan.
            </li>
            <li>
              <b>Assess controls</b>: an assessor, often IRAP-endorsed, checks
              that controls are implemented and effective.
            </li>
            <li>
              <b>Authorise the system</b>: an authorising officer accepts the
              residual risk and approves operation.
            </li>
            <li>
              <b>Monitor the system</b>: controls and threats are monitored, and
              the system is reassessed when it changes.
            </li>
          </ol>

          <SubHead id="ISM_controls">Guidelines and controls</SubHead>
          <p>
            Controls are grouped into guidelines covering topics such as cyber
            security roles, incidents, outsourcing, security documentation,
            physical security, personnel security, communications
            infrastructure, mobile devices, evaluated products, ICT equipment,
            media, system hardening, system management, system monitoring,
            software development, databases, email, networking, cryptography,
            gateways and data transfers.
          </p>
          <p>
            Each control carries <b>applicability markings</b> showing which
            data classifications it applies to:
          </p>
          <WikiTable
            head={["Marking", "Applies to systems handling"]}
            rows={[
              [
                "NC",
                "Non-classified information (OFFICIAL and OFFICIAL: Sensitive)",
              ],
              ["OS", "OFFICIAL: Sensitive information"],
              ["P", "PROTECTED information"],
              ["S", "SECRET information"],
              ["TS", "TOP SECRET information"],
            ]}
          />
        </Section>

        <Section
          anchor="Government_frameworks"
          title="Government security frameworks"
        >
          <SubHead id="PSPF">Protective Security Policy Framework</SubHead>
          <p>
            The <b>Protective Security Policy Framework</b> (PSPF) sets the
            protective security requirements for Australian Government entities.
            It covers governance, risk, information, technology, personnel and
            physical security, and is mandatory for non-corporate Commonwealth
            entities. Responsibility moved from the Attorney-General's
            Department to Home Affairs in 2022, and the framework was
            substantially rewritten as <b>Release 2024</b>.
            <Cite n={5} first />
          </p>
          <p>
            The PSPF is the policy instrument that makes ASD's technical
            frameworks mandatory: entities must apply the ISM and implement the
            Essential Eight to Maturity Level Two, and report their security
            maturity each year. The Secretary of Home Affairs can also issue
            binding <i>PSPF directions</i>, such as those requiring entities to
            remove TikTok (2023) and DeepSeek (2025) products from government
            devices.
          </p>

          <SubHead id="IRAP">IRAP and cloud assessment</SubHead>
          <p>
            The <b>Infosec Registered Assessors Program</b> (IRAP) is run by
            ASD. It endorses individual assessors who independently evaluate
            systems against the ISM, most often cloud services seeking to host
            government data. An IRAP assessment produces a report that the
            government customer uses to make its own risk decision. ASD does not
            &ldquo;certify&rdquo; services.
          </p>
          <p>
            Data centre and cloud providers handling sensitive government data
            may also need certification under the{" "}
            <b>Hosting Certification Framework</b>, which looks at ownership,
            control and supply chain risks as well as technical controls.
          </p>
        </Section>

        <Section anchor="Legislation" title="Legislation">
          <SubHead id="SOCI_Act">
            Security of Critical Infrastructure Act 2018
          </SubHead>
          <p>
            The <b>SOCI Act</b> is Australia's main critical infrastructure law.
            Amendments in 2021 and 2022 expanded it from four sectors to eleven
            (communications; data storage or processing; financial services and
            markets; water and sewerage; energy; health care and medical; higher
            education and research; food and grocery; transport; space
            technology; and defence industry).
            <Cite n={6} /> Obligations depend on the asset class:
          </p>
          <WikiTable
            head={["Obligation", "What it requires"]}
            rows={[
              [
                "Register of critical infrastructure assets",
                "Report ownership and operational information to the Cyber and Infrastructure Security Centre.",
              ],
              [
                "Critical infrastructure risk management program (CIRMP)",
                "Adopt and maintain a written program covering cyber and information security, personnel, supply chain, and physical and natural hazards; have it approved by the board and report on it annually. Cyber controls must meet a recognised framework such as the NIST CSF, AS ISO/IEC 27001 or Essential Eight Maturity Level One.",
              ],
              [
                "Mandatory cyber incident reporting",
                "Report critical incidents within 12 hours and other relevant incidents within 72 hours.",
              ],
              [
                "Enhanced cyber security obligations",
                "For Systems of National Significance: incident response plans, cyber exercises, vulnerability assessments and system information sharing with ASD.",
              ],
              [
                "Government assistance",
                "Last-resort powers for the government to direct or intervene during a serious incident.",
              ],
            ]}
          />
          <p>
            The 2024 cyber security legislative package added further
            amendments: it brought data storage systems holding
            business-critical data into scope, created a consequence management
            power for post-incident recovery, and moved telecommunications
            security obligations into the SOCI framework.
          </p>

          <SubHead id="Cyber_Security_Act">Cyber Security Act 2024</SubHead>
          <p>
            The <b>Cyber Security Act 2024</b> is Australia's first standalone
            cyber security law. It received Royal Assent on 29 November 2024 and
            introduced:
            <Cite n={7} first />
          </p>
          <ul>
            <li>
              <b>Security standards for smart devices</b>: minimum standards for
              consumer internet-connected devices, such as banning universal
              default passwords, requiring a way to report vulnerabilities, and
              disclosing how long security updates will be provided.
            </li>
            <li>
              <b>Ransomware payment reporting</b>: from 30 May 2025, businesses
              with annual turnover above A$3 million, and responsible entities
              for critical infrastructure, must report any ransomware or cyber
              extortion payment to ASD within 72 hours of paying or becoming
              aware of the payment.
            </li>
            <li>
              <b>Limited use</b>: information voluntarily shared with ASD or the
              National Cyber Security Coordinator about an incident can only be
              used for limited purposes, to encourage early engagement.
            </li>
            <li>
              <b>Cyber Incident Review Board</b>: an independent board that
              conducts no-fault reviews of significant incidents and publishes
              lessons learned.
            </li>
          </ul>

          <SubHead id="Privacy_Act">Privacy Act 1988</SubHead>
          <p>
            <b>Australian Privacy Principle 11</b> requires organisations with
            annual turnover over A$3 million, and some smaller ones such as
            health service providers, to take reasonable steps to protect the
            personal information they hold. The{" "}
            <b>Notifiable Data Breaches scheme</b>, in force since February
            2018, requires them to notify the OAIC and affected individuals of
            an eligible data breach (one likely to result in serious harm) as
            soon as practicable, and to assess a suspected breach within 30
            days.
            <Cite n={8} first />
          </p>
          <p>
            After major breaches in 2022, maximum penalties for serious or
            repeated interferences with privacy rose to the greatest of A$50
            million, three times the benefit obtained, or 30 per cent of
            adjusted turnover. The{" "}
            <i>Privacy and Other Legislation Amendment Act 2024</i> clarified
            that reasonable steps under APP 11 include technical and
            organisational measures, added lower tiers of civil penalties and
            infringement notices, and created a statutory tort for serious
            invasions of privacy, which commenced in June 2025.
          </p>

          <SubHead id="Directors_duties">
            Directors' and licensees' duties
          </SubHead>
          <p>
            There is no general cyber security duty in the Corporations Act, but
            ASIC treats inadequate cyber risk management as a breach of existing
            duties. In <i>ASIC v RI Advice Group</i> (2022), the Federal Court
            found that a financial services licensee breached its obligations by
            failing to have adequate cyber security risk management across its
            authorised representatives.
            <Cite n={13} first /> Directors can also breach their duty of care
            and diligence if they fail to oversee cyber risk.
          </p>
        </Section>

        <Section
          anchor="Incident_reporting"
          title="Incident reporting obligations"
        >
          <p>
            An organisation may owe several overlapping reports for one
            incident. The main obligations are:
          </p>
          <WikiTable
            head={["Obligation", "Who", "Trigger", "Deadline", "Report to"]}
            rows={[
              [
                "SOCI critical incident",
                "Responsible entities for critical infrastructure assets",
                "Incident with a significant impact on the availability of an essential service",
                "12 hours",
                "ASD (ACSC)",
              ],
              [
                "SOCI relevant incident",
                "Responsible entities for critical infrastructure assets",
                "Incident with a relevant impact on an asset",
                "72 hours",
                "ASD (ACSC)",
              ],
              [
                "Ransomware payment",
                "Businesses with turnover above A$3 million; critical infrastructure entities",
                "Making, or learning of, a ransomware or extortion payment",
                "72 hours",
                "ASD",
              ],
              [
                "Notifiable data breach",
                "APP entities under the Privacy Act",
                "Eligible data breach likely to cause serious harm",
                "As soon as practicable (assess within 30 days)",
                "OAIC and affected individuals",
              ],
              [
                "APRA information security incident",
                "APRA-regulated entities",
                "Material incident under CPS 234",
                "72 hours",
                "APRA",
              ],
              [
                "APRA control weakness",
                "APRA-regulated entities",
                "Material control weakness that cannot be fixed in time",
                "10 business days",
                "APRA",
              ],
            ]}
          />
        </Section>

        <Section anchor="Sector_frameworks" title="Sector-specific frameworks">
          <ul>
            <li>
              <b>Financial services</b>: APRA's{" "}
              <i>CPS 234 Information Security</i> (in force since 1 July 2019)
              makes boards responsible for information security, requires
              controls proportional to threats, independent testing and incident
              notification. <i>CPS 230 Operational Risk Management</i>, in force
              from 1 July 2025, adds business continuity, tolerance levels for
              critical operations and management of material service providers.
              <Cite n={9} first />
            </li>
            <li>
              <b>Energy</b>: the{" "}
              <b>Australian Energy Sector Cyber Security Framework</b> (AESCSF),
              coordinated by AEMO, is a maturity assessment built on the US C2M2
              and aligned with the NIST CSF. Version 2, released in 2023, adds
              operational technology practices. Participants self-assess each
              year.
              <Cite n={10} />
            </li>
            <li>
              <b>Defence industry</b>: the{" "}
              <b>Defence Industry Security Program</b> (DISP) requires suppliers
              to Defence to meet security standards based on the ISM and
              Essential Eight, at levels matching the sensitivity of their work.
            </li>
            <li>
              <b>Telecommunications</b>: carriers and carriage service providers
              must protect their networks from unauthorised interference. These
              obligations were moved from the Telecommunications Act into the
              SOCI framework in 2024.
            </li>
            <li>
              <b>Consumer Data Right</b>: accredited data recipients must meet
              the information security controls in Schedule 2 of the CDR Rules.
            </li>
            <li>
              <b>Health</b>: the My Health Records framework sets security
              requirements for participating healthcare providers, alongside the
              Privacy Act's stricter treatment of health information.
            </li>
          </ul>
        </Section>

        <Section
          anchor="Standards_Australia"
          title="Standards Australia adoptions"
        >
          <p>
            Standards Australia generally adopts international security
            standards rather than writing its own. Key adoptions include the
            ISO/IEC 27000 family, such as <b>AS ISO/IEC 27001:2023</b>{" "}
            (information security management systems, an identical adoption of
            ISO/IEC 27001:2022), and parts of the <b>IEC 62443</b> series for
            industrial automation and control systems. Certification to ISO/IEC
            27001 is common among Australian service providers and is one of the
            frameworks accepted for SOCI risk management programs.
          </p>
        </Section>

        <Section anchor="Comparison" title="Comparison of frameworks">
          <WikiTable
            head={[
              "Framework",
              "Owner",
              "Type",
              "Who must comply",
              "Structure",
            ]}
            rows={[
              [
                "NIST CSF 2.0",
                "NIST (United States)",
                "Outcome-based taxonomy",
                "Voluntary in Australia; accepted for SOCI CIRMPs",
                "6 functions, 22 categories, 106 subcategories",
              ],
              [
                "Essential Eight",
                "ASD",
                "Prescriptive baseline",
                "Non-corporate Commonwealth entities (ML2); voluntary for others",
                "8 strategies × 4 maturity levels",
              ],
              [
                "ISM",
                "ASD",
                "Comprehensive control catalogue",
                "Commonwealth entities; government suppliers by contract",
                "Principles plus several hundred controls with applicability markings",
              ],
              [
                "PSPF",
                "Home Affairs",
                "Protective security policy",
                "Non-corporate Commonwealth entities",
                "Requirements across six security domains",
              ],
              [
                "ISO/IEC 27001",
                "ISO/IEC; adopted by Standards Australia",
                "Certifiable management system",
                "Voluntary; often required by customers",
                "Clauses 4–10 plus 93 Annex A controls",
              ],
              [
                "AESCSF",
                "AEMO",
                "Sector maturity model",
                "Energy market participants (assessment program)",
                "Domains and practices across maturity indicator levels",
              ],
              [
                "CPS 234",
                "APRA",
                "Prudential standard (legally binding)",
                "Banks, insurers, superannuation funds",
                "Principles-based requirements",
              ],
            ]}
          />
        </Section>

        <Section anchor="National_strategy" title="National strategy">
          <p>
            The <b>2023–2030 Australian Cyber Security Strategy</b> sets the
            goal of making Australia a world leader in cyber security by 2030.
            <Cite n={11} first /> It is organised around six &ldquo;cyber
            shields&rdquo;:
          </p>
          <ol>
            <li>Strong businesses and citizens</li>
            <li>Safe technology</li>
            <li>World-class threat sharing and blocking</li>
            <li>Protected critical infrastructure</li>
            <li>Sovereign capabilities</li>
            <li>Resilient region and global leadership</li>
          </ol>
          <p>
            Delivery runs in three horizons: <b>Horizon 1</b> (2023–2025) built
            foundations, including the Cyber Security Act 2024; <b>Horizon 2</b>{" "}
            (2026–2028) focuses on scaling cyber maturity across the whole
            economy; and <b>Horizon 3</b> (2029–2030) aims to advance the global
            frontier of cyber security.
          </p>
        </Section>

        <Section anchor="Timeline" title="Timeline">
          <WikiTable
            head={["Year", "Development"]}
            rows={[
              ["1988", "Privacy Act passed"],
              [
                "2010",
                "Strategies to Mitigate Targeted Cyber Intrusions and the Top 4 published",
              ],
              ["2013", "Top 4 made mandatory for Commonwealth agencies"],
              [
                "2014",
                "Australian Cyber Security Centre established; NIST CSF 1.0 published in the US",
              ],
              ["2017", "Essential Eight introduced"],
              [
                "2018",
                "Notifiable Data Breaches scheme commences; SOCI Act passed; AESCSF launched",
              ],
              ["2019", "APRA CPS 234 takes effect"],
              [
                "2021–2022",
                "SOCI Act expanded to 11 sectors; mandatory incident reporting begins (July 2022)",
              ],
              [
                "2022",
                "Major data breaches lead to higher privacy penalties; ASIC v RI Advice decided",
              ],
              [
                "2023",
                "2023–2030 Cyber Security Strategy released; CIRMP rules take effect; National Cyber Security Coordinator appointed",
              ],
              [
                "2024",
                "NIST CSF 2.0 released; Cyber Security Act 2024 and privacy reforms passed; PSPF Release 2024",
              ],
              [
                "2025",
                "Ransomware payment reporting (May); statutory privacy tort (June); APRA CPS 230 (July)",
              ],
              [
                "2026",
                "Horizon 2 of the national strategy begins; ISM adopts six principle functions",
              ],
            ]}
          />
        </Section>

        <Section anchor="Getting_started" title="Applying the standards">
          <p>
            For a typical Australian organisation, the frameworks fit together
            in a practical order:
          </p>
          <ol>
            <li>
              <b>Work out which laws apply</b>: check whether you are an APP
              entity, a responsible entity for a critical infrastructure asset,
              APRA-regulated, or above the ransomware reporting threshold.
            </li>
            <li>
              <b>Choose a program structure</b>: use the NIST CSF 2.0 or ISO/IEC
              27001 to organise governance, risk assessment and reporting to the
              board.
            </li>
            <li>
              <b>Set a technical baseline</b>: implement the Essential Eight,
              aiming for Maturity Level One first and Level Two where the threat
              justifies it.
            </li>
            <li>
              <b>Add depth where needed</b>: draw on ISM controls for areas the
              Essential Eight does not cover, such as logging, network
              segmentation and secure software development.
            </li>
            <li>
              <b>Prepare to report</b>: build the 12-hour, 72-hour and
              notifiable data breach timelines into your incident response plan,
              and rehearse them.
            </li>
          </ol>
          <Callout title="Not legal advice">
            <p className="my-0">
              Thresholds, deadlines and penalties change often. Check
              obligations against the current legislation, the Federal Register
              of Legislation and guidance from ASD, Home Affairs, the OAIC and
              your sector regulator.
            </p>
          </Callout>
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

/** Infobox emblem: the Southern Cross over a shield. */
function FlagBadge() {
  const stars: [number, number, number][] = [
    [32, 20, 3.2],
    [22, 30, 2.8],
    [42, 28, 2.8],
    [35, 38, 2.2],
    [30, 44, 3.2],
  ]
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Shield showing the Southern Cross"
    >
      <path
        d="M32 3 L55 11 V29 C55 45 46 56 32 61 C18 56 9 45 9 29 V11 Z"
        className="fill-link"
      />
      {stars.map(([cx, cy, r]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          className="fill-background"
        />
      ))}
    </svg>
  )
}
