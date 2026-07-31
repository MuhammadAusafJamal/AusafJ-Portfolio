'use client';

/**
 * Theme toggle.
 *
 * Both icons render and CSS picks which is visible, keyed off the theme class
 * next-themes writes onto <html>. That avoids the usual mounted-state dance
 * entirely: there is no server/client icon mismatch to guard against, no flash
 * on first paint, and no layout shift — the budget in PLAN.md §12 allows none.
 *
 * `resolvedTheme` is only read inside the click handler, by which point it is
 * always defined, so nothing about the render depends on it.
 *
 * One of the three client components PLAN.md §12 permits.
 */
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle between light and dark theme"
      className="grid size-9 place-items-center rounded-tag border border-border text-muted transition-colors duration-micro ease-standard hover:border-border-strong hover:text-text"
    >
      <Sun size={16} aria-hidden className="hidden dark:block" />
      <Moon size={16} aria-hidden className="block dark:hidden" />
    </button>
  );
}
