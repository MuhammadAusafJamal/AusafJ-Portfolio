/**
 * Placeholder homepage.
 *
 * Deliberately not the real design — it renders the design tokens so the dev
 * server and the Vercel deploy have something meaningful to show, and so a
 * broken token is visible immediately. The real homepage is PLAN.md §5.3.
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-prose px-5 py-24">
      <p className="font-mono text-xs text-accent">scaffold</p>
      <h1 className="mt-4 text-3xl font-semibold">Muhammad Ausaf Jamal</h1>
      <p className="mt-4 text-muted">
        Portfolio in progress. The specification lives in <code>PLAN.md</code>; the design tokens
        rendering this page live in <code>styles/globals.css</code>.
      </p>
      <p className="mt-6 text-sm text-muted">
        Next up: Phase 0 — the positioning line, the resume, and three flagship projects.
      </p>
    </main>
  );
}
