/**
 * Footer.
 *
 * Carries the build timestamp and a link to the source. Both are quiet signals: a
 * date proves the site is maintained, and a source link says the code holds up to
 * being read.
 *
 * The timestamp is evaluated when the page is built, which is exactly what it
 * claims to be.
 */
import type { Social } from '@ausaf/schema/types';

const BUILT_AT = new Date().toISOString().slice(0, 10);

export function Footer({ name, socials }: { name: string; socials: Social[] }) {
  const source = socials.find((social) => social.platform === 'GitHub');

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-5 py-8 font-mono text-xs text-subtle md:px-8">
        <p>
          {name} · {BUILT_AT.slice(0, 4)}
        </p>
        <p className="flex flex-wrap items-center gap-4">
          <span>Last deployed {BUILT_AT}</span>
          {source !== undefined && (
            <a
              href={`${source.url}/AusafJ-Portfolio`}
              target="_blank"
              rel="noreferrer"
              className="text-muted"
            >
              Source
            </a>
          )}
        </p>
      </div>
    </footer>
  );
}
