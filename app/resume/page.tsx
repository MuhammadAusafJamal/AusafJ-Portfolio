/**
 * `/resume`.
 *
 * Renders inline so a recruiter can answer "does this person fit" without
 * opening a PDF. Download stays one click away for whoever wants the file
 * anyway. Every section reuses the same content functions the homepage does,
 * so this page and the homepage can never drift: a role added to
 * `content/experience/` shows up in both without a second edit.
 */
import type { Metadata } from 'next';
import {
  getCompanyHistory,
  getFeaturedProjects,
  getSite,
  getSkills,
  getSocials,
} from '@/lib/content';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';

const DESCRIPTION = 'Skills, experience, and projects—viewable here, downloadable as a PDF.';

/**
 * Static on purpose: this list appears in exactly one place, so it doesn't
 * earn a content schema and a JSON file the way skills or experience do.
 * Sourced from LinkedIn's Licenses & Certifications, Aug 2026—trimmed from
 * eight to six by dropping one expired credential and one generic seminar
 * attendance, per the site's own rule that this list stays short.
 */
const CERTIFICATIONS = [
  { name: 'Claude Code in Action', issuer: 'Anthropic', date: 'Apr 2026' },
  {
    name: 'AI Seekho Google Antigravity Hackathon 2026',
    issuer: 'Google for Developers',
    date: 'Jun 2026',
  },
  { name: 'Claude 101', issuer: 'Anthropic', date: 'Aug 2026' },
  { name: 'JavaScript (Intermediate) Certification', issuer: 'HackerRank', date: 'Aug 2026' },
  { name: 'Intro to Deep Learning', issuer: 'Kaggle', date: 'Nov 2025' },
  { name: 'Web and Mobile App Development', issuer: 'S.M.I.T', date: 'Nov 2023' },
] as const;

export const metadata: Metadata = {
  title: 'Resume',
  description: DESCRIPTION,
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume',
    description: DESCRIPTION,
    url: '/resume',
  },
};

export default async function Resume() {
  const [site, socials, skills, history, projects] = await Promise.all([
    getSite(),
    getSocials(),
    getSkills(),
    getCompanyHistory(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto max-w-prose px-5 py-24 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="font-display text-2xl font-normal">{site.name}</h1>
            <p className="mt-1 text-muted">{site.positioning}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-subtle">
              <span>{site.location}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href="https://github.com/MuhammadAusafJamal" target="_blank" rel="noreferrer">
                github.com/MuhammadAusafJamal
              </a>
              <a href="https://linkedin.com/in/muhammadausafjamal" target="_blank" rel="noreferrer">
                linkedin.com/in/muhammadausafjamal
              </a>
            </div>
          </div>
          <a
            href={site.resumePath}
            target="_blank"
            rel="noreferrer"
            className="rounded-card bg-accent px-6 py-3 font-mono text-xs font-semibold text-bg no-underline transition-colors duration-micro ease-standard hover:bg-accent-hover"
          >
            Download PDF
          </a>
        </div>

        <section className="mt-16">
          <p className="border-b border-border pb-3 font-mono text-xs tracking-wide text-muted uppercase">
            Technical skills
          </p>
          <dl className="mt-5 flex flex-col gap-3">
            {skills.map((group) => (
              <div key={group.group} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="shrink-0 font-mono text-xs text-muted sm:w-24">{group.group}</dt>
                <dd className="text-sm">{group.items.map((item) => item.name).join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <p className="border-b border-border pb-3 font-mono text-xs tracking-wide text-muted uppercase">
            Professional experience
          </p>
          <div className="mt-5 flex flex-col gap-8">
            {history.flatMap((company) =>
              company.roles.map((role) => (
                <div key={role.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold">
                      {role.role} — {company.company}
                    </h3>
                    <p className="font-mono text-xs text-subtle">
                      {role.startDate.slice(0, 7)}—
                      {role.endDate === 'present' ? 'Present' : role.endDate.slice(0, 7)}
                    </p>
                  </div>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-muted">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mt-16">
          <p className="border-b border-border pb-3 font-mono text-xs tracking-wide text-muted uppercase">
            Education
          </p>
          <p className="mt-5 text-sm">{site.proof}</p>
        </section>

        <section className="mt-16">
          <p className="border-b border-border pb-3 font-mono text-xs tracking-wide text-muted uppercase">
            Certifications
          </p>
          <ul className="mt-5 flex flex-col gap-1">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.name} className="text-sm">
                {cert.name} — {cert.issuer}{' '}
                <span className="font-mono text-xs text-subtle">({cert.date})</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <p className="border-b border-border pb-3 font-mono text-xs tracking-wide text-muted uppercase">
            Selected projects
          </p>
          <div className="mt-5 flex flex-col gap-4">
            {projects.map((project) => (
              <div key={project.data.slug} className="flex flex-wrap justify-between gap-x-6">
                <div>
                  <h3 className="font-semibold">{project.data.title}</h3>
                  <p className="text-sm text-muted">{project.data.summary}</p>
                </div>
                {project.data.metrics[0] !== undefined && (
                  <p className="font-mono text-xs text-subtle whitespace-nowrap">
                    {project.data.metrics[0].value} {project.data.metrics[0].label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer name={site.name} socials={socials} />
    </>
  );
}
