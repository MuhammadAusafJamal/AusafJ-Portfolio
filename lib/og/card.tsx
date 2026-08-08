/**
 * The share card every route renders into.
 *
 * One layout, three callers, so a card can never drift from the others—the thing
 * that makes a set of share cards read as designed rather than assembled is that
 * they are identical apart from the words.
 *
 * This renders through Satori, not the browser: no CSS file, no Tailwind, no
 * cascade, and every element needs an explicit `display`. The colours are the dark
 * palette from `styles/globals.css`, restated because there is no stylesheet here
 * to read variables from. The card does not follow the reader's theme—a share card
 * is a flat image on someone else's timeline, so it picks one and commits.
 *
 * The typeface is Satori's bundled default rather than Geist. Geist arrives through
 * `next/font/google` as woff2, which Satori cannot parse, so matching the site would
 * mean either a new font dependency or fetching a ttf from Google during the build.
 * The second one makes a production deploy fail whenever Google has a bad minute.
 * At 76px the difference between two neutral grotesques is not what anyone notices
 * about a link preview, so the hermetic build wins.
 */
import { mark } from './mark';

/** The size every social scraper crops to. Anything else gets letterboxed. */
export const OG_SIZE = { width: 1200, height: 630 };

export const OG_CONTENT_TYPE = 'image/png';

export function Card({
  title,
  subtitle,
  eyebrow,
  name,
  url,
}: {
  title: string;
  subtitle: string;
  /** What kind of page this is—"Case study", "Portfolio". Sits opposite the domain. */
  eyebrow: string;
  name: string;
  /** The site's own url, from `site.json`. Shown as the bare host. */
  url: string;
}) {
  const logo = `data:image/svg+xml;base64,${Buffer.from(mark({ radius: 8 })).toString('base64')}`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 72,
        backgroundColor: '#0b0b0c',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders this,
            not the DOM, so next/image has nothing to optimise here. */}
        <img src={logo} width={56} height={56} alt="" />
        <span style={{ fontSize: 26, color: '#a1a1aa' }}>{name}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            lineHeight: 1.1,
            // The same -0.02em the site applies to headings, in absolute units
            // because Satori resolves no relative lengths.
            letterSpacing: -1.5,
            color: '#ededef',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 30,
            lineHeight: 1.4,
            color: '#a1a1aa',
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: '1px solid #26262b',
          fontSize: 22,
          color: '#71717a',
        }}
      >
        <span>{eyebrow}</span>
        {/* Without the `www.`. The canonical host carries it because that is where
            the apex redirects, but nobody reads a domain on a share card as an
            address to type—it is there to say whose page this is. */}
        <span>{new URL(url).host.replace(/^www\./, '')}</span>
      </div>
    </div>
  );
}
