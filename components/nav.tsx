/**
 * Nav.
 *
 * Three links and a theme toggle. Every entry points at a section of the homepage,
 * so nothing here can rot into a dead route as the site grows; a new page earns a
 * nav slot only once it has something on it.
 *
 * All three go to a homepage section, so every item in this nav behaves the same
 * way. Mixing a route in with two anchors means one click leaves the page and two
 * scroll, and the reader cannot tell which until they try it. `/projects` is
 * reached from the Work section instead.
 *
 * The hrefs are root-relative (`/#work`, not `#work`) because this nav renders on
 * every page. A bare fragment on a case study appends the hash to that URL and
 * scrolls nowhere, since the section it names only exists on `/`.
 */
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
];

export function Nav({ name }: { name: string }) {
  return (
    <nav className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur-sm">
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
