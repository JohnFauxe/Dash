export type ArticleMeta = {
  title: string
  lastEdited: string
  revisions: number
  categories: string[]
}

/** NavLink: `page` opens a Secpedia page; `href` jumps within the current page. */
export type NavLink = { label: string; page?: string; href?: string }
export type NavGroup = { heading: string; links: NavLink[] }

export const FRONT_PAGE = "Cyber security"

/** Every written article. Any other title is a placeholder. */
export const articles: ArticleMeta[] = [
  {
    title: "Cyber security",
    lastEdited: "26 October 2026, at 09:14",
    revisions: 34,
    categories: [
      "Cyber security",
      "Information security",
      "Computer security",
      "Security engineering",
    ],
  },
  {
    title: "Australian cyber security standards",
    lastEdited: "30 October 2026, at 13:40",
    revisions: 12,
    categories: [
      "Cyber security in Australia",
      "Information security standards",
      "Australian law",
      "Regulatory compliance",
    ],
  },
  {
    title: "CIA triad",
    lastEdited: "30 October 2026, at 15:05",
    revisions: 1,
    categories: ["Cyber security", "Information security", "Security models"],
  },
  {
    title: "Essential Eight",
    lastEdited: "30 October 2026, at 15:05",
    revisions: 1,
    categories: [
      "Cyber security in Australia",
      "Information security standards",
      "Regulatory compliance",
    ],
  },
  {
    title: "Cyber threat map",
    lastEdited: "30 October 2026, at 16:20",
    revisions: 1,
    categories: ["Cyber security", "Data visualisation"],
  },
]

export function findArticle(title: string): ArticleMeta | undefined {
  return articles.find((a) => a.title.toLowerCase() === title.toLowerCase())
}

/** Static search index. */
export const pages: string[] = [
  "Cyber security",
  "Australian cyber security standards",
  "CIA triad",
  "Essential Eight",
  "Cyber threat map",
  "Information Security Manual",
  "NIST Cybersecurity Framework",
  "Security of Critical Infrastructure Act 2018",
  "Phishing",
  "Malware",
  "Ransomware",
  "Firewall (computing)",
  "Cryptography",
  "Social engineering (security)",
  "Two-factor authentication",
  "Denial-of-service attack",
  "SQL injection",
  "Zero trust architecture",
  "Incident response",
  "Digital forensics",
  "Password strength",
]

export const navGroups: NavGroup[] = [
  {
    heading: "Navigation",
    links: [
      { label: "Front page", page: FRONT_PAGE },
      { label: "Contents", href: "#contents-box" },
      { label: "Featured articles", page: "Featured articles" },
      { label: "Study paths", page: "Study paths" },
    ],
  },
  {
    heading: "Study areas",
    links: [
      { label: "Foundations", page: "Foundations" },
      {
        label: "Australian standards",
        page: "Australian cyber security standards",
      },
      { label: "Network security", page: "Network security" },
      { label: "Cryptography", page: "Cryptography" },
      { label: "Incident response", page: "Incident response" },
      { label: "Threat map", page: "Cyber threat map" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "What links here", page: "What links here" },
      { label: "Cite this page", page: "Cite this page" },
      { label: "Printable version", page: "Printable version" },
    ],
  },
]
