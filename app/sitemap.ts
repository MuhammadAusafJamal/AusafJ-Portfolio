/**
 * `sitemap.xml`, generated at build from the same content the pages render from.
 *
 * A new case study appears here the moment its `.mdx` file does, which is the only
 * reason this is worth having over a hand-written file—a static list rots the first
 * time someone forgets to update it.
 *
 * URLs here have to be absolute. `metadataBase` turns relative paths absolute for
 * canonical and OG tags but does not reach this file, so the host is spelled out.
 *
 * `/style-guide` is deliberately absent. It is a working tool, and it carries
 * `noindex` of its own.
 */
import type { MetadataRoute } from 'next';
import { getProjects, getSite } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, projects] = await Promise.all([getSite(), getProjects()]);

  // No `lastModified`. The obvious sources are all wrong: a project's `endDate` is
  // when the work stopped, not when the page changed, and file mtimes on Vercel are
  // the checkout time, identical across every file. A date that means nothing is
  // worse than none, since a crawler that learns to distrust it stops reading it.
  // The static routes are listed by hand because there is no content file to derive
  // them from. /resume and /contact were missing until Sep 2026, which meant the two
  // pages a recruiter is most likely to want were the two a crawler had to stumble
  // into from a nav link.
  return [
    { url: site.url },
    { url: `${site.url}/about` },
    { url: `${site.url}/projects` },
    { url: `${site.url}/resume` },
    { url: `${site.url}/contact` },
    ...projects.map((project) => ({ url: `${site.url}/projects/${project.data.slug}` })),
  ];
}
