import { navGroups } from "@/data/secpedia"
import { WikiLink } from "./wiki-link"

const linkClass = "block py-1 text-link hover:underline"

export function SiteNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Site navigation" className="text-[0.87rem]">
      {navGroups.map((group) => (
        <div key={group.heading} className="mt-4 first:mt-0">
          <h3 className="text-muted-foreground mb-1 text-[0.72rem] font-semibold tracking-wider uppercase">
            {group.heading}
          </h3>
          <ul>
            {group.links.map((link) => (
              <li key={link.label} onClick={onNavigate}>
                {link.page ? (
                  <WikiLink page={link.page} className={linkClass}>
                    {link.label}
                  </WikiLink>
                ) : (
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
