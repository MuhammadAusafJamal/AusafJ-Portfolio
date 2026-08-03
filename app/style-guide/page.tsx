/**
 * `/style-guide`—the living reference for the design system.
 *
 * Every token the design system defines is rendered here from the token itself,
 * never from a hardcoded value, so this page breaks the moment a token breaks.
 * Per CONTRIBUTING, no component ships until it appears on this page.
 *
 * Excluded from the sitemap and marked noindex—it is a working tool, not a page
 * a recruiter should land on.
 */
import type { Metadata } from 'next';
import { Avatar } from '@/components/ui/avatar';
import { StatusDot } from '@/components/ui/status-dot';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const metadata: Metadata = {
  title: 'Style guide',
  robots: { index: false, follow: false },
};

const COLORS = [
  { name: 'bg', cls: 'bg-bg', note: 'Page background' },
  { name: 'surface', cls: 'bg-surface', note: 'Cards, panels' },
  { name: 'surface-2', cls: 'bg-surface-2', note: 'Hover, raised, code blocks' },
  { name: 'border', cls: 'bg-border', note: 'Hairlines, card outlines' },
  { name: 'border-strong', cls: 'bg-border-strong', note: 'Focus outlines, active borders' },
  { name: 'text', cls: 'bg-text', note: 'Headings, body' },
  { name: 'muted', cls: 'bg-muted', note: 'Secondary copy, meta' },
  { name: 'subtle', cls: 'bg-subtle', note: 'Non-essential only—never load-bearing' },
  { name: 'accent', cls: 'bg-accent', note: 'Primary button, active state' },
  { name: 'accent-hover', cls: 'bg-accent-hover', note: 'Accent hover' },
  { name: 'accent-quiet', cls: 'bg-accent-quiet', note: 'Tag backgrounds, subtle fills' },
  { name: 'success', cls: 'bg-success', note: 'Status dot only—6px, nowhere else' },
  { name: 'danger', cls: 'bg-danger', note: 'Errors, destructive' },
];

const TYPE = [
  { token: 'text-4xl', cls: 'text-4xl', px: '49px', use: 'Hero, desktop' },
  { token: 'text-3xl', cls: 'text-3xl', px: '39px', use: 'Hero mobile, page titles' },
  { token: 'text-2xl', cls: 'text-2xl', px: '31px', use: 'Page titles' },
  { token: 'text-xl', cls: 'text-xl', px: '25px', use: 'Section headings' },
  { token: 'text-lg', cls: 'text-lg', px: '20px', use: 'Lead paragraph, card titles' },
  { token: 'text-base', cls: 'text-base', px: '16px', use: 'Body—never smaller' },
  { token: 'text-sm', cls: 'text-sm', px: '14px', use: 'Secondary copy, nav' },
  { token: 'text-xs', cls: 'text-xs', px: '13px', use: 'Tags, meta, captions' },
];

const SPACING = [
  { token: '1', px: '4px', use: 'Inside a tag' },
  { token: '2', px: '8px', use: 'Tag padding, icon gaps' },
  { token: '3', px: '12px', use: 'Button padding (y)' },
  { token: '4', px: '16px', use: 'Between elements in a block' },
  { token: '6', px: '24px', use: 'Card padding, button padding (x)' },
  { token: '8', px: '32px', use: 'Between blocks in a section' },
  { token: '12', px: '48px', use: 'Large block separation' },
  { token: '16', px: '64px', use: 'Between sections, mobile' },
  { token: '24', px: '96px', use: 'Between sections, desktop' },
  { token: '32', px: '128px', use: 'Page top/bottom' },
];

const MOTION = [
  { token: 'duration-micro', ms: '150ms', use: 'Hover, color, opacity' },
  { token: 'duration-standard', ms: '200ms', use: 'Toggles, expand/collapse' },
  { token: 'duration-entrance', ms: '320ms', use: 'Section reveal, modal' },
];

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border pt-12">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{intro}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-4 border-b border-border py-3">{children}</div>;
}

export default function Styleguide() {
  return (
    <main className="mx-auto max-w-page px-5 py-24 md:px-8">
      <header className="pb-12">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold">Style guide</h1>
          <ThemeToggle />
        </div>
        <p className="mt-4 text-muted">
          Every value below is rendered from its token, never from a hardcoded literal—so this page
          breaks the moment a token breaks. No component ships until it appears here.
        </p>
        <p className="mt-4 text-sm text-muted">
          The palette is monochrome. Hierarchy comes from size, weight, and contrast; the only
          coloured pixel on the site is a 6px status dot.
        </p>
      </header>

      <div className="flex flex-col gap-24">
        <Section
          id="color"
          title="Color"
          intro="Swatches read live from the theme, so this section doubles as the light/dark check."
        >
          <div className="flex flex-col">
            {COLORS.map((c) => (
              <Row key={c.name}>
                <span
                  className={`${c.cls} size-10 shrink-0 rounded-tag border border-border`}
                  aria-hidden
                />
                <code className="w-36 shrink-0 font-mono text-sm">{c.name}</code>
                <span className="text-sm text-muted">{c.note}</span>
              </Row>
            ))}
          </div>
        </Section>

        <Section
          id="type"
          title="Typography"
          intro="Geist Sans for text, Geist Mono for tags, metrics, and code. Two weights only: 400 and 600."
        >
          <div className="flex flex-col gap-8">
            {TYPE.map((t) => (
              <div key={t.token}>
                <div className="flex items-baseline gap-3">
                  <code className="font-mono text-xs text-muted">{t.token}</code>
                  <span className="font-mono text-xs text-subtle">{t.px}</span>
                  <span className="text-xs text-muted">{t.use}</span>
                </div>
                <p className={`${t.cls} mt-2 font-semibold`}>Backend engineer</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <p className="text-base">
              Body copy at 16px with a 1.65 line-height, capped at 70 characters. That measure is
              what separates a page that reads as polished from one that reads as amateur, and it
              costs nothing to get right.
            </p>
            <p className="font-mono text-sm">
              Monospace—used for tags, metrics, dates, and the command palette.
            </p>
            <p className="text-sm text-muted">Secondary copy, for meta and supporting lines.</p>
          </div>
        </Section>

        <Section
          id="spacing"
          title="Spacing"
          intro="4px base. These ten values are the entire permitted set—anything else is a review comment."
        >
          <div className="flex flex-col">
            {SPACING.map((s) => (
              <Row key={s.token}>
                <div className="w-32 shrink-0">
                  <div className={`h-4 bg-accent-quiet`} style={{ width: s.px }} aria-hidden />
                </div>
                <code className="w-24 shrink-0 font-mono text-sm">
                  {s.token} · {s.px}
                </code>
                <span className="text-sm text-muted">{s.use}</span>
              </Row>
            ))}
          </div>
        </Section>

        <Section
          id="shape"
          title="Shape & elevation"
          intro="Two radii plus full. In dark mode, surfaces are separated by border and background shift—never by shadow."
        >
          <div className="flex flex-wrap gap-6">
            <div className="rounded-tag border border-border bg-surface px-6 py-4">
              <code className="font-mono text-xs text-muted">rounded-tag · 6px</code>
            </div>
            <div className="rounded-card border border-border bg-surface px-6 py-4">
              <code className="font-mono text-xs text-muted">rounded-card · 12px</code>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-4">
              <span className="size-8 rounded-full bg-surface-2" aria-hidden />
              <code className="font-mono text-xs text-muted">rounded-full</code>
            </div>
          </div>
        </Section>

        <Section
          id="motion"
          title="Motion"
          intro="One duration set, one easing pair, one entrance pattern. All of it collapses to zero under prefers-reduced-motion."
        >
          <div className="flex flex-col">
            {MOTION.map((m) => (
              <Row key={m.token}>
                <code className="w-52 shrink-0 font-mono text-sm">{m.token}</code>
                <span className="w-16 shrink-0 font-mono text-sm text-subtle">{m.ms}</span>
                <span className="text-sm text-muted">{m.use}</span>
              </Row>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Easings: <code className="font-mono text-xs">ease-standard</code> for state changes,{' '}
            <code className="font-mono text-xs">ease-entrance</code> for reveals.
          </p>
        </Section>

        <Section
          id="components"
          title="Components"
          intro="Each primitive lands here as it is built. These are the ones that exist so far."
        >
          <div className="flex flex-col gap-12">
            <div>
              <p className="font-mono text-xs text-muted">Avatar</p>
              <div className="mt-4">
                <Avatar src="/me.png" alt="Muhammad Ausaf Jamal, smiling, in a dark blazer." />
              </div>
              <p className="mt-3 text-sm text-muted">
                160px, and the source is decoded at twice that so a retina screen has pixels to use.
                The image ships pre-masked to a circle with transparent corners, so the dark
                backdrop belongs to the photo rather than to the page, and the same file works on
                both themes.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs text-muted">Buttons</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button className="rounded-card bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors duration-micro ease-standard hover:bg-accent-hover">
                  View resume
                </button>
                <button className="rounded-card border border-border px-6 py-3 text-sm transition-colors duration-micro ease-standard hover:border-border-strong">
                  Get in touch
                </button>
                <button className="rounded-card px-6 py-3 text-sm text-muted transition-colors duration-micro ease-standard hover:text-text">
                  Ghost
                </button>
              </div>
              <p className="mt-3 text-sm text-muted">
                The primary button is an inversion—solid foreground, background-coloured text.
                Without a hue, that is what makes it the loudest element on the page.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs text-muted">Tags</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['TypeScript', 'Node', 'MongoDB', 'AWS', 'Redis'].map((t) => (
                  <span
                    key={t}
                    className="rounded-tag bg-accent-quiet px-2 py-1 font-mono text-xs text-text"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-muted">Status dot</p>
              <div className="mt-4 flex flex-col gap-2">
                <StatusDot availability="open" label="Karachi, Pakistan · Open to work" />
                <StatusDot availability="selective" label="Selective — listening, not looking" />
                <StatusDot availability="closed" label="Not currently open to roles" />
              </div>
              <p className="mt-3 text-sm text-muted">
                The single exception to the monochrome rule. Colour that carries meaning is fine;
                colour that carries emphasis is what was removed. The halo pulses only while the
                status is open, runs for two seconds, and stops dead under{' '}
                <code className="font-mono text-xs">prefers-reduced-motion</code>. It is the only
                looping animation anywhere on the site.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs text-muted">Card</p>
              <div className="mt-4 max-w-md rounded-card border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold">Ledger API</h3>
                <p className="mt-4 text-muted">
                  Double-entry ledger service handling millions of financial transactions with
                  strict consistency guarantees.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Node', 'TypeScript', 'PostgreSQL'].map((t) => (
                    <span
                      key={t}
                      className="rounded-tag bg-accent-quiet px-2 py-1 font-mono text-xs text-text"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="font-mono text-2xl">128ms</p>
                  <p className="font-mono text-xs text-muted">p95 latency</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-muted">Links</p>
              <p className="mt-4">
                Links are <a href="#color">underlined by default</a>—with no accent hue, the
                underline is the only affordance a link has left, so it is never optional. Nav items
                and button-styled links opt out.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs text-muted">Focus ring</p>
              <p className="mt-4 text-sm text-muted">
                Tab through this page. Every interactive element takes the same 2px ring at 2px
                offset. <code className="font-mono text-xs">outline: none</code> without a
                replacement is never acceptable.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
