/**
 * Hero.
 *
 * Everything a recruiter needs in the first ten seconds sits here: name, what I
 * build, how long I have been doing it, whether I am available, the resume, and a
 * way to make contact. If any of that moves below the fold the page has failed at
 * its one job.
 *
 * The photo and the resume button both render only when their file is actually on
 * disk. A primary call to action that 404s is worse than no call to action, and a
 * broken image in the hero is worse than no image; checking at build time means
 * nobody has to remember.
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { Mail } from 'lucide-react';
import type { Site, Social } from '@ausaf/schema/types';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatusDot } from '@/components/ui/status-dot';

const inPublic = (file: string) => existsSync(path.join(process.cwd(), 'public', file));

export function Hero({ site, socials }: { site: Site; socials: Social[] }) {
  const hasResume = inPublic('resume.pdf');
  const hasPhoto = inPublic('me.png');
  const heroSocials = socials.filter((social) => social.showInHero);

  return (
    <header className="flex flex-col gap-8">
      {hasPhoto && <Avatar src="/me.png" alt={`${site.name}, smiling, in a dark blazer.`} />}

      <StatusDot availability={site.availability} label={site.availabilityLabel} />

      <div>
        <h1 className="text-3xl font-semibold md:text-4xl">{site.name}</h1>
        <p className="mt-4 text-lg text-muted md:text-xl">{site.positioning}</p>
        <p className="mt-4 text-muted">{site.proof}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {hasResume && (
          <Button variant="primary" href={site.resumePath} external>
            Resume
          </Button>
        )}
        <Button variant={hasResume ? 'secondary' : 'primary'} href={`mailto:${site.email}`}>
          <Mail size={16} aria-hidden />
          {site.email}
        </Button>
      </div>

      {/* Brand marks are deliberately absent. Lucide dropped them in v1, and a
          monochrome page reads better with the platform names set in mono than
          with two logos borrowed from someone else's brand guidelines. */}
      <ul className="flex items-center gap-6 font-mono text-xs">
        {heroSocials.map((social) => (
          <li key={social.platform}>
            <a
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors duration-micro ease-standard hover:text-text"
            >
              {social.platform}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
