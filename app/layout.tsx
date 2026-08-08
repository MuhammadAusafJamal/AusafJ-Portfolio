/**
 * Root layout.
 *
 * Fonts come through `next/font`, which self-hosts and subsets them at build time
 * and emits an `@font-face` with a metric-matched fallback, so there is no network
 * hop to a font host and no shift when the real face arrives.
 *
 * `styles/globals.css` is imported here and nowhere else. It carries the design
 * tokens, so every route inherits them.
 */
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { getSite } from '@/lib/content';
import '@/styles/globals.css';

const sans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Read from `content/data/site.json` rather than written out here, so the name,
 * the positioning line, and the domain have exactly one source. `metadataBase` is
 * what turns every relative OG image and canonical path elsewhere in the app into
 * an absolute URL; without it a share preview resolves against nothing.
 *
 * No `alternates.canonical` here. Metadata is inherited, so a canonical set on the
 * root layout is inherited by every route below it, and each case study ends up
 * declaring the homepage as its canonical version—which asks Google to drop it
 * from the index. Every page sets its own instead.
 *
 * No `openGraph.images` either. `app/opengraph-image.tsx` supplies those for this
 * segment and every one below it. File-based metadata outranks the config kind, so
 * setting images in both places leaves a dead value that looks authoritative.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.name,
      template: `%s · ${site.name}`,
    },
    description: site.positioning,
    openGraph: {
      type: 'profile',
      siteName: site.name,
      title: site.name,
      description: site.positioning,
      url: site.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: site.name,
      description: site.positioning,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // `suppressHydrationWarning` on <html> is required once next-themes writes the
  // theme class before React hydrates.
  //
  // On <body> it covers browser extensions that mutate the DOM before hydration:
  // ColorZilla adds `cz-shortcut-listen`, Grammarly adds `data-gr-*`. The server
  // HTML cannot contain those, so React reports a mismatch on every load. It only
  // suppresses attribute diffs on this element, not anything React renders inside.
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only rounded-card bg-accent px-4 py-2 text-bg focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-20"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
