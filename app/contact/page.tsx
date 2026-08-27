/**
 * `/contact`.
 *
 * The email link stays the fastest path—same as the homepage. The form is
 * here for whoever would rather fill in fields than open a mail client; see
 * `components/sections/contact.tsx` for why the email link still comes first.
 */
import type { Metadata } from 'next';
import { getSite, getSocials } from '@/lib/content';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { StatusDot } from '@/components/ui/status-dot';

const DESCRIPTION = "The fastest way to reach me, and a form for whoever'd rather use one.";

export const metadata: Metadata = {
  title: 'Contact',
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact',
    description: DESCRIPTION,
    url: '/contact',
  },
};

export default async function Contact() {
  const [site, socials] = await Promise.all([getSite(), getSocials()]);

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto flex max-w-page flex-col gap-12 px-5 py-24 md:px-8">
        <header className="max-w-prose">
          <p className="font-mono text-xs tracking-wide text-muted uppercase">Contact</p>
          <h1 className="mt-4 font-display text-3xl font-normal">
            Let&apos;s talk about a role or a project.
          </h1>
          <p className="mt-4 text-lg text-muted">{DESCRIPTION}</p>
        </header>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-card border border-border bg-surface p-6">
            <p className="font-mono text-xs tracking-wide text-muted uppercase">
              Contact information
            </p>

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

          <div className="flex flex-col gap-6 rounded-card border border-border bg-surface p-6">
            <p className="font-mono text-xs tracking-wide text-muted uppercase">Send a message</p>
            <p className="text-sm text-subtle">Or use the form. It reaches the same inbox.</p>
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer name={site.name} socials={socials} />
    </>
  );
}
