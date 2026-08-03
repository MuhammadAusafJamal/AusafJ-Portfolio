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

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Ausaf Jamal',
    template: '%s · Muhammad Ausaf Jamal',
  },
  // The positioning line, verbatim from content/data/site.json. It has to stay in
  // sync with the hero and the OG image: one sentence, three places.
  description: 'Software engineer building full-stack products with React, Next.js, and Node.',
};

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
