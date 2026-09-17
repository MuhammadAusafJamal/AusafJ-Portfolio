/**
 * `/about`.
 *
 * The homepage answers "what does this person do" in three lines. This page
 * answers it in paragraphs, and it is where education and certifications live
 * rather than competing for space above the fold.
 *
 * It carries the same `Person` graph the homepage does. Two pages describing one
 * identity is what lets a crawler resolve the name to an entity instead of to a
 * string, and it is the reason this page matters beyond the people who read it.
 *
 * Experience and skills reuse the same content functions the homepage and
 * `/resume` call, so a role added to `content/experience/` appears on all three
 * without a second edit.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyHistory, getSite, getSkills, getSocials } from '@/lib/content';
import { CERTIFICATIONS, EDUCATION } from '@/lib/credentials';
import { buildPersonSchema } from '@/lib/person-schema';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/ui/section';
import { TagList } from '@/components/ui/tag';

const DESCRIPTION =
  'Two-plus years of production work across two backend stacks, and the degree behind it.';

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About',
    description: DESCRIPTION,
    url: '/about',
  },
};

const formatRange = (start: string, end: string) =>
  `${start.slice(0, 7)}—${end === 'present' ? 'Present' : end.slice(0, 7)}`;

export default async function About() {
  const [site, socials, skills, history] = await Promise.all([
    getSite(),
    getSocials(),
    getSkills(),
    getCompanyHistory(),
  ]);

  const personSchema = buildPersonSchema({ site, socials, skills });

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto flex max-w-page flex-col gap-24 px-5 py-24 md:px-8">
        <header className="max-w-prose">
          <h1 className="font-display text-3xl font-normal md:text-4xl">About</h1>

          <div className="mt-6 flex flex-col gap-4 text-muted">
            <p>
              I am a software engineer in Karachi, and I have been at Technyx Systems since July
              2024, first as an intern and since January 2025 full time. The work is government
              digital platforms, and I build them end to end.
            </p>
            <p>
              Most of that time has been spent across two backend stacks. Node and Express over
              MongoDB came first. ASP.NET Core with Umbraco over SQL Server arrived with the
              government contracts in mid-2026, and I learned it against a live platform with real
              users on it. That is the part of this job that has taught me most. The front end has
              been React, Next.js, TypeScript, and Redux throughout, plus React Native when a
              project needs a mobile client against the same API.
            </p>
            <p>
              The work I am proudest of is the least glamorous: migrating a React 16 tourism
              platform onto Next.js while it kept serving real traffic, with no freeze window and no
              big-bang cutover. Crash handling that went in alongside it cut runtime crashes by
              roughly 5-6%.
            </p>
            <p>
              I finished a B.S. in Computer Science at the University of Karachi in December 2025.
              Outside client work I build in Three.js and deploy every one of them, which is a habit
              rather than a portfolio strategy: an unfinished scene teaches you nothing.
            </p>
          </div>
        </header>

        <Section
          id="experience"
          title="Experience"
          action={
            <Link href="/resume" className="font-mono text-xs">
              Resume
            </Link>
          }
        >
          <div className="flex flex-col gap-12">
            {history.map((company) => (
              <div key={company.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold">{company.company}</h3>
                  <p className="font-mono text-xs text-subtle">{company.location}</p>
                </div>

                <div className="mt-4 flex flex-col gap-6">
                  {company.roles.map((role) => (
                    <div key={role.slug}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="text-sm font-semibold">{role.role}</p>
                        <p className="font-mono text-xs text-subtle">
                          {formatRange(role.startDate, role.endDate)}
                        </p>
                      </div>
                      <ul className="mt-2 flex flex-col gap-1 text-sm text-muted">
                        {role.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      <div className="mt-3">
                        <TagList items={role.stack} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="flex flex-col gap-5">
            {skills.map((group) => (
              <div key={group.group} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                <dt className="shrink-0 font-mono text-xs text-muted sm:w-24 sm:pt-1">
                  {group.group}
                </dt>
                <dd>
                  <TagList items={group.items.map((item) => item.name)} />
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <ul className="flex flex-col gap-5">
            {EDUCATION.map((entry) => (
              <li key={entry.qualification}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-semibold">{entry.qualification}</p>
                  <p className="font-mono text-xs text-subtle">
                    {entry.start}—{entry.end}
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {entry.institution}, {entry.location}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="certifications" title="Certifications">
          <ul className="flex flex-col gap-3">
            {CERTIFICATIONS.map((credential) => (
              <li
                key={credential.name}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                <p className="text-sm">
                  {credential.name} <span className="text-muted">— {credential.issuer}</span>
                </p>
                <p className="font-mono text-xs text-subtle">{credential.date}</p>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <Footer name={site.name} socials={socials} />

      <script
        type="application/ld+json"
        // The value is generated above from validated content, never from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
