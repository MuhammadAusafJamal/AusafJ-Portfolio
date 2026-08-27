/**
 * Nav.
 *
 * Provides two presentation variants:
 * - 'floating' (default): Floating island pill navigation, centered at the top
 *   with surface elevation and backdrop blur.
 * - 'bar': Full-width sticky top navigation bar.
 *
 * `LINKS` is what's always visible, `MORE_LINKS` is a native-Popover-API
 * overflow (`popover`/`popoverTarget`, React 19's built-in support—no client
 * component) so the performance budget in CONTRIBUTING.md stays intact.
 * Popover over `<details>` because the browser closes it on outside click and
 * Escape for free; a plain `<details>` stayed open once you clicked anything
 * outside it.
 *
 * The visible/overflow split is by intent, not by anchor-vs-route: Projects
 * and Contact are the two actions a recruiter actually converts on, so they
 * stay one tap away. Work/Experience/Skills are sub-sections of the homepage's
 * own story, and Resume duplicates what the hero already links—lower stakes
 * if those cost an extra tap into More.
 */
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const MORE_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/resume', label: 'Resume' },
];

export type NavVariant = 'floating' | 'bar';

type NavProps = {
  name: string;
  variant?: NavVariant;
};

export function Nav({ name, variant = 'floating' }: NavProps) {
  if (variant === 'bar') {
    return (
      <nav
        aria-label="Primary navigation"
        className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-14 max-w-page items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" className="font-mono text-xs no-underline">
            {name}
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 font-mono text-xs sm:flex">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted no-underline transition-colors duration-micro ease-standard hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-more-wrap relative">
              <button
                popoverTarget="nav-more-bar"
                type="button"
                className="nav-more-trigger flex cursor-pointer items-center gap-1 font-mono text-xs text-muted no-underline transition-colors duration-micro ease-standard hover:text-text"
              >
                More
                <ChevronDown
                  size={12}
                  aria-hidden
                  className="nav-more-chevron transition-transform duration-micro ease-standard"
                />
              </button>
              <ul
                popover="auto"
                id="nav-more-bar"
                className="nav-more-menu m-0 flex min-w-36 flex-col gap-1 rounded-card border border-border bg-surface p-2 font-mono text-xs"
              >
                {MORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-tag px-3 py-2 text-muted no-underline transition-colors duration-micro ease-standard hover:bg-surface-2 hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <header className="sticky top-4 z-40 flex w-full justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto flex h-11 max-w-fit items-center gap-2.5 sm:gap-3.5 rounded-full border border-border bg-surface/90 pl-4 pr-2.5 py-1.5 backdrop-blur-md transition-colors duration-standard"
      >
        <Link
          href="/"
          className="rounded-full px-2 py-1 font-mono text-xs font-medium no-underline text-text transition-colors duration-micro ease-standard hover:text-text"
          aria-label={`${name} home`}
        >
          <span className="hidden sm:inline">{name}</span>
          <span className="sm:hidden">AJ</span>
        </Link>

        <span className="h-3.5 w-px bg-border shrink-0" aria-hidden="true" />

        <ul className="flex items-center gap-1 sm:gap-1.5 font-mono text-xs">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-2.5 py-1 text-muted no-underline transition-colors duration-micro ease-standard hover:bg-surface-2/60 hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-more-wrap relative">
          <button
            popoverTarget="nav-more-floating"
            type="button"
            className="nav-more-trigger flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs text-muted no-underline transition-colors duration-micro ease-standard hover:bg-surface-2/60 hover:text-text"
          >
            More
            <ChevronDown
              size={12}
              aria-hidden
              className="nav-more-chevron transition-transform duration-micro ease-standard"
            />
          </button>
          <ul
            popover="auto"
            id="nav-more-floating"
            className="nav-more-menu m-0 flex min-w-36 flex-col gap-1 rounded-card border border-border bg-surface p-2 font-mono text-xs"
          >
            {MORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-tag px-3 py-2 text-muted no-underline transition-colors duration-micro ease-standard hover:bg-surface-2 hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <span className="h-3.5 w-px bg-border shrink-0" aria-hidden="true" />

        <ThemeToggle className="size-7 rounded-full border border-transparent text-muted hover:border-border hover:bg-surface-2" />
      </nav>
    </header>
  );
}
