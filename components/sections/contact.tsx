/**
 * Contact.
 *
 * The email is plain text and a `mailto:` link, not a form. A form makes a
 * recruiter's job harder and gives them nothing to paste into their own tooling.
 * The form lands later, alongside the email, never instead of it.
 */
import type { Site, Social } from '@ausaf/schema/types';
import { StatusDot } from '@/components/ui/status-dot';

export function Contact({ site, socials }: { site: Site; socials: Social[] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg">
        Reachable at{' '}
        <a href={`mailto:${site.email}`} className="font-medium">
          {site.email}
        </a>
        .
      </p>

      <StatusDot availability={site.availability} label={site.availabilityLabel} />

      <ul className="flex flex-wrap gap-6 font-mono text-xs">
        {socials.map((social) => (
          <li key={social.platform}>
            <a href={social.url} target="_blank" rel="noreferrer" className="text-muted">
              {social.platform} / {social.handle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
