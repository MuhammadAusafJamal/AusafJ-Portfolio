/**
 * Nav.
 *
 * Provides two presentation variants:
 * - 'floating' (default): Floating island pill navigation, centered at the top
 *   with surface elevation and backdrop blur.
 * - 'bar': Full-width sticky top navigation bar.
 *
 * Every link points at a section of the homepage, root-relative (`/#work`),
 * so every item behaves identically across all routes without dead links.
 */
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
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

        <span className="h-3.5 w-px bg-border shrink-0" aria-hidden="true" />

        <ThemeToggle className="size-7 rounded-full border border-transparent text-muted hover:border-border hover:bg-surface-2" />
      </nav>
    </header>
  );
}
