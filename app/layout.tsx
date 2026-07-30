/**
 * Root layout.
 *
 * Minimal on purpose — it exists so the dev server and the deploy pipeline have
 * something to render. The real shell (nav, footer, theme provider, self-hosted
 * Geist) lands in Phase 3; see PLAN.md §5.
 *
 * `styles/globals.css` is imported here and nowhere else. It carries the design
 * tokens, so every route inherits them.
 */
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Ausaf Jamal',
  // Replaced by the positioning line from PLAN.md §3 once it is written.
  description: 'Backend engineer. Portfolio in progress.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // `suppressHydrationWarning` on <html> is required once next-themes writes the
  // theme class before React hydrates. Set now so adding the provider is a no-op.
  //
  // On <body> it covers browser extensions that mutate the DOM before hydration —
  // ColorZilla adds `cz-shortcut-listen`, Grammarly adds `data-gr-*`. The server
  // HTML cannot contain those, so React reports a mismatch on every load. It only
  // suppresses attribute diffs on this element, not anything React renders inside.
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
