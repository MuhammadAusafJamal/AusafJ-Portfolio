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
import {
  Archivo,
  Atkinson_Hyperlegible,
  Familjen_Grotesk,
  Fragment_Mono,
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Instrument_Serif,
  Martian_Mono,
} from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { getSite } from '@/lib/content';
import { THEMES } from '@/lib/looks';
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
 * The one display face on the site—used for exactly one line per page (the hero name, a
 * case study's title). Self-hosted the same way as Geist rather than a stylesheet link, so
 * it never becomes a second network hop.
 */
const display = Instrument_Serif({
  variable: '--font-instrument-serif',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * The console look's faces. `preload: false` keeps them off every page's critical
 * path: the `@font-face` rules ship, but a browser only fetches a file when the
 * console class makes something use it.
 */
const consoleMono = Martian_Mono({
  variable: '--font-martian',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

const consoleSans = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

/** The riso look's faces. Not preloaded, same as the console pair. */
const risoSans = Familjen_Grotesk({
  variable: '--font-familjen',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

const risoMono = Fragment_Mono({
  variable: '--font-fragment',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

/** Signal Blocks. Archivo carries its width axis so the hero name can stretch. */
const blocksDisplay = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  preload: false,
});

const blocksSans = Atkinson_Hyperlegible({
  variable: '--font-atkinson',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

/**
 * `?theme=<id>` written into next-themes' storage before its own script reads it,
 * so a shared link opens in that look with no flash of the default. Unknown values
 * are ignored. It runs in <head>, ahead of the provider's script in <body>.
 *
 * The parameter is then dropped from the address bar. Left there, it wins again on
 * every reload or Back, so switching to the default with the toggle never sticks.
 */
const THEME_FROM_QUERY = `try{var u=new URL(location.href),t=u.searchParams.get('theme');if(t!==null){if(${JSON.stringify(
  THEMES
)}.indexOf(t)>-1)localStorage.setItem('theme',t);u.searchParams.delete('theme');history.replaceState(history.state,'',u.pathname+u.search+u.hash)}}catch(e){}`;

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
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} ${consoleMono.variable} ${consoleSans.variable} ${risoSans.variable} ${risoMono.variable} ${blocksDisplay.variable} ${blocksSans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_FROM_QUERY }} />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only rounded-card bg-accent px-4 py-2 text-bg focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
