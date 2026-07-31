'use client';

/**
 * Theme provider.
 *
 * `attribute="class"` writes `light` or `dark` onto <html>, which is what
 * `styles/globals.css` keys the light palette off — `:root` carries the dark
 * values and `.light` overrides them. Nothing else needs to know the theme.
 *
 * `disableTransitionOnChange` suppresses token transitions during the swap;
 * without it every colour on the page animates at once and the toggle reads as
 * a smear rather than a switch.
 *
 * One of the three client components PLAN.md §12 permits.
 */
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
