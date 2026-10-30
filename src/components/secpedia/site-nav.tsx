import { navGroups } from "@/data/secpedia"
import { DemoLink } from "./demo-link"

export function SiteNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Site navigation" className="text-[0.87rem]">
      {navGroups.map((group) => (
        <div key={group.heading} className="mt-4 first:mt-0">
          <h3 className="text-muted-foreground mt-4 mb-1 text-[0.72rem] font-semibold tracking-wider uppercase first:mt-0">
            {group.heading}
          </h3>
          <ul>
            {group.links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a
                    href={link.href}
                    onClick={onNavigate}
                    className="text-link block py-1 hover:underline"
                  >
                    {link.label}
                  </a>
                ) : (
                  <DemoLink
                    page={link.label}
                    className="text-link block py-1 hover:underline"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
