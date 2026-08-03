/**
 * `/projects/[slug]`—the case study.
 *
 * Statically generated for every published project, so there is no runtime MDX
 * compilation and no database on the path to a page a recruiter is reading.
 *
 * The meta row, the metrics, and the links come from validated frontmatter; the
 * body is authored MDX. That split is why every case study has the same skeleton
 * without a template forcing the prose into a shape.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowUpRight } from 'lucide-react';
import { getProject, getProjects, getSite, getSocials } from '@/lib/content';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { MetricRow } from '@/components/ui/metric-badge';
import { TagList } from '@/components/ui/tag';

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.data.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (project === undefined) return {};

  return {
    title: project.data.title,
    description: project.data.summary,
    openGraph: { title: project.data.title, description: project.data.summary },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, socials, project] = await Promise.all([getSite(), getSocials(), getProject(slug)]);

  if (project === undefined) notFound();

  const { data, body } = project;
  const period = `${data.startDate.slice(0, 7)}—${data.endDate === 'present' ? 'Present' : data.endDate.slice(0, 7)}`;

  return (
    <>
      <Nav name={site.name} />

      <main id="main" className="mx-auto max-w-page px-5 py-24 md:px-8">
        <p className="font-mono text-xs">
          <Link href="/projects">Projects</Link>
        </p>

        <header className="mt-8 flex flex-col gap-6 border-b border-border pb-12">
          <div>
            <h1 className="text-3xl font-semibold">{data.title}</h1>
            <p className="mt-4 text-lg text-muted">{data.summary}</p>
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted">
            <div className="flex gap-2">
              <dt className="text-subtle">Role</dt>
              <dd>{data.role}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-subtle">Period</dt>
              <dd>{period}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-subtle">Status</dt>
              <dd>{data.status}</dd>
            </div>
            {data.teamSize !== undefined && (
              <div className="flex gap-2">
                <dt className="text-subtle">Team</dt>
                <dd>{data.teamSize}</dd>
              </div>
            )}
          </dl>

          {(data.links.live !== undefined || data.links.repo !== undefined) && (
            <div className="flex flex-wrap gap-6 font-mono text-xs">
              {data.links.live !== undefined && (
                <a
                  href={data.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Live <ArrowUpRight size={12} aria-hidden />
                </a>
              )}
              {data.links.repo !== undefined && (
                <a
                  href={data.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Source <ArrowUpRight size={12} aria-hidden />
                </a>
              )}
            </div>
          )}

          <MetricRow metrics={data.metrics} />
        </header>

        <article className="prose mt-12">
          <MDXRemote source={body} />
        </article>

        <div className="mt-16 border-t border-border pt-8">
          <p className="font-mono text-xs text-muted">Stack</p>
          <div className="mt-4">
            <TagList items={data.stack} />
          </div>
        </div>
      </main>

      <Footer name={site.name} socials={socials} />
    </>
  );
}
