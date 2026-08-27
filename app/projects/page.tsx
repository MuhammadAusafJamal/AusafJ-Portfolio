/**
 * `/projects`. Every project lives here; the homepage only shows three.
 *
 * The homepage shows what is finished enough to lead with. This page is where the
 * rest lives, so nothing has to be deleted to keep the front page short.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx';
import type { ProjectCategory } from '@ausaf/schema/types';
import { getProjects, getSite, getSocials } from '@/lib/content';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { ProjectCard } from '@/components/ui/project-card';
import { PROJECT_CATEGORY_LABELS } from '@/lib/project-categories';
import { PROJECTS_DESCRIPTION } from './description';

/**
 * The `/projects` filter taxonomy. Tiles double as the filter's entry point—each
 * one is a plain link (`?category=mobile`), so the whole thing is server-rendered
 * with no client component, keeping the 3-slot budget in CONTRIBUTING.md intact.
 * Labels come from `PROJECT_CATEGORY_LABELS`—the same map `ProjectCard` reads for
 * its kicker line—so the two can never disagree on what a category is called.
 */
const CATEGORIES: { value: ProjectCategory; blurb: string }[] = [
  { value: 'mobile', blurb: 'React Native builds, shipped on Expo.' },
  { value: 'web', blurb: 'Full-stack sites and platform migrations.' },
  {
    value: 'ai-first',
    blurb: 'Agent pipelines doing the actual work, not a chat widget bolted on.',
  },
  { value: 'creative', blurb: 'Three.js — WebGL, scenes, shaders, animation.' },
];

export const metadata: Metadata = {
  title: 'Projects',
  description: PROJECTS_DESCRIPTION,
  alternates: { canonical: '/projects' },
  // `openGraph` replaces the parent's rather than merging into it, so a page that
  // sets a title here has to restate the url too or the share card points at the
  // homepage. The image comes from `opengraph-image.tsx` beside this file.
  openGraph: {
    title: 'Projects',
    description: PROJECTS_DESCRIPTION,
    url: '/projects',
  },
};

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [site, socials, projects, { category: rawCategory }] = await Promise.all([
    getSite(),
    getSocials(),
    getProjects(),
    searchParams,
  ]);

  // An unrecognised or absent value both mean "show everything"—a bad query
  // string degrades to no filter rather than a 404 or an empty grid.
  const category = CATEGORIES.find((c) => c.value === rawCategory)?.value;
  const filtered =
    category === undefined
      ? projects
      : projects.filter((project) => project.data.categories.includes(category));

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto max-w-page px-5 py-24 md:px-8">
        <header className="border-b border-border pb-8">
          <h1 className="font-display text-3xl font-normal">Projects</h1>
          <p className="mt-4 text-muted">
            Each one below states the problem, the decision that mattered, and what it produced.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const count = projects.filter((project) =>
              project.data.categories.includes(c.value)
            ).length;

            return (
              <Link
                key={c.value}
                href={`/projects?category=${c.value}`}
                scroll={false}
                className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 no-underline transition-colors duration-micro ease-standard hover:border-border-strong"
              >
                <p className="font-mono text-2xl">{count}</p>
                <h2 className="font-semibold">{PROJECT_CATEGORY_LABELS[c.value]}</h2>
                <p className="text-sm text-muted">{c.blurb}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
          <Link
            href="/projects"
            scroll={false}
            className={clsx(
              'rounded-full border px-4 py-1.5 font-mono text-xs no-underline transition-colors duration-micro ease-standard',
              category === undefined
                ? 'border-text bg-text font-semibold text-bg'
                : 'border-border text-muted hover:border-border-strong'
            )}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.value}
              href={`/projects?category=${c.value}`}
              scroll={false}
              className={clsx(
                'rounded-full border px-4 py-1.5 font-mono text-xs no-underline transition-colors duration-micro ease-standard',
                category === c.value
                  ? 'border-text bg-text font-semibold text-bg'
                  : 'border-border text-muted hover:border-border-strong'
              )}
            >
              {PROJECT_CATEGORY_LABELS[c.value]}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.data.slug} project={project.data} />
          ))}
        </div>

        <p className="mt-16 font-mono text-xs">
          <Link href="/">Back to the homepage</Link>
        </p>
      </main>

      <Footer name={site.name} socials={socials} />
    </>
  );
}
