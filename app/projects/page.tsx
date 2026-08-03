/**
 * `/projects`—everything, not just the three on the homepage.
 *
 * The homepage shows what is finished enough to lead with. This page is where the
 * rest lives, so nothing has to be deleted to keep the front page short.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects, getSite, getSocials } from '@/lib/content';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { ProjectCard } from '@/components/ui/project-card';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Case studies for the work worth reading about at length.',
};

export default async function Projects() {
  const [site, socials, projects] = await Promise.all([getSite(), getSocials(), getProjects()]);

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto max-w-page px-5 py-24 md:px-8">
        <header className="border-b border-border pb-8">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="mt-4 text-muted">
            Each one below states the problem, the decision that mattered, and what it produced.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
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
