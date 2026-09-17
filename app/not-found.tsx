/**
 * 404.
 *
 * A 404 should route back into the site rather than apologise, so this is mostly
 * links. Three destinations, because a visitor who lands here arrived from
 * somewhere specific—a stale link, a typo, or a search result pointing at a slug
 * that has since been renamed—and the useful response is the shortest path to
 * what they were probably after.
 *
 * No `metadata` export: Next serves this for any unmatched route, so a canonical
 * URL here would claim one address for every wrong one. The layout's title
 * applies and nothing indexes a 404 anyway.
 */
import Link from 'next/link';
import { getSite, getSocials } from '@/lib/content';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Button } from '@/components/ui/button';

const DESTINATIONS = [
  { href: '/projects', label: 'Projects', note: 'Case studies, filterable by category.' },
  { href: '/resume', label: 'Resume', note: 'Skills, experience, and the PDF.' },
  { href: '/contact', label: 'Contact', note: 'Email, or a form if you prefer one.' },
];

export default async function NotFound() {
  const [site, socials] = await Promise.all([getSite(), getSocials()]);

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto flex max-w-page flex-col gap-12 px-5 py-24 md:px-8">
        <div>
          <p className="font-mono text-xs tracking-wide text-subtle uppercase">404</p>
          <h1 className="mt-3 font-display text-3xl font-normal md:text-4xl">
            That page isn&rsquo;t here
          </h1>
          <p className="mt-4 max-w-prose text-muted">
            Either the address is wrong or the page moved. Project URLs changed in September 2026
            when the client work was renamed, so an older link is the likeliest reason you are
            reading this.
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {DESTINATIONS.map((destination) => (
            <li key={destination.href} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <Link
                href={destination.href}
                className="shrink-0 font-mono text-sm no-underline hover:underline sm:w-28"
              >
                {destination.label}
              </Link>
              <span className="text-sm text-muted">{destination.note}</span>
            </li>
          ))}
        </ul>

        <div>
          <Button variant="primary" href="/">
            Back to the homepage
          </Button>
        </div>
      </main>

      <Footer name={site.name} socials={socials} />
    </>
  );
}
