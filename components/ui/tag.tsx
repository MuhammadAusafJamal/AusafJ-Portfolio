/**
 * Tag.
 *
 * Monospace on purpose: it separates machine words (React, PostgreSQL) from the
 * prose around them without needing a colour to do it.
 */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-tag bg-accent-quiet px-2 py-1 font-mono text-xs text-text">
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
