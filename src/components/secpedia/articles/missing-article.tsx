import { articles } from "@/data/secpedia"
import { ArticleHeading } from "../article-parts"
import { WikiLink } from "../wiki-link"

export function MissingArticle() {
  return (
    <article>
      <ArticleHeading />
      <div className="wiki-prose">
        <p>
          <b>Secpedia does not have an article with this exact name.</b> It may
          be a placeholder that has not been written yet. Written articles:
        </p>
        <ul>
          {articles.map((a) => (
            <li key={a.title}>
              <WikiLink page={a.title} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
