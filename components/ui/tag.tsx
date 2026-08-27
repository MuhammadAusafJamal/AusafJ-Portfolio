/**
 * Tag.
 *
 * Monospace on purpose: it separates machine words (React, PostgreSQL) from the
 * prose around them without needing a colour to do it.
 *
 * A hairline border rather than a filled background—on a project card the tag row
 * sits right below the metric, and a filled pill was competing with it for
 * attention instead of sitting quietly under it.
 */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-tag border border-border-strong px-2 py-1 font-mono text-xs text-text">
      {children}
    </span>
  );
}

export function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
