export type NavLink = { label: string; href?: string }
export type NavGroup = { heading: string; links: NavLink[] }

/** The only article that exists; every other title is a placeholder. */
export const CURRENT_PAGE = "Cyber security"

/** Static search index. */
export const pages: string[] = [
  "Cyber security",
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

/** Links without an href are placeholders for pages not written yet. */
export const navGroups: NavGroup[] = [
  {
    heading: "Navigation",
    links: [
      { label: "Front page", href: "#top" },
      { label: "Contents", href: "#contents-box" },
      { label: "Featured articles" },
      { label: "Study paths" },
    ],
  },
  {
    heading: "Study areas",
    links: [
      { label: "Foundations" },
      { label: "Network security" },
      { label: "Cryptography" },
      { label: "Incident response" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "What links here" },
      { label: "Cite this page" },
      { label: "Printable version" },
    ],
  },
]
