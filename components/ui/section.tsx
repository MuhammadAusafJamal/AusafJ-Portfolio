/**
 * A homepage section: a small mono eyebrow, the content, and nothing else.
 *
 * The eyebrow is what makes the page scannable at a glance without adding a
 * second type size, and it is the reason no section needs an explanatory
 * paragraph under its heading.
 *
 * The offset that keeps the sticky nav off this heading when a `/#work` link
 * lands here is `scroll-padding-top` on <html>, not a `scroll-mt` utility on this
 * element. One number covers every anchor on the site rather than each new one
 * needing the class copied onto it.
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
    <section id={id} aria-labelledby={`${id}-heading`}>
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
