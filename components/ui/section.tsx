/**
 * A homepage section: a small mono eyebrow, the content, and nothing else.
 *
 * The eyebrow is what makes the page scannable at a glance without adding a
 * second type size, and it is the reason no section needs an explanatory
 * paragraph under its heading.
 */
export function Section({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <h2 id={`${id}-heading`} className="font-mono text-xs tracking-wide text-muted uppercase">
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
