/**
 * Project card.
 *
 * Reading order is deliberate: problem, then number, then stack, then links. A
 * recruiter who reads only the first two lines still leaves knowing what the thing
 * did and how well it worked.
 */
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@ausaf/schema/types';
import { PROJECT_CATEGORY_LABELS } from '@/lib/project-categories';
import { MetricRow } from './metric-badge';
import { TagList } from './tag';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-6 rounded-card border border-border bg-surface p-6 transition-colors duration-micro ease-standard hover:border-border-strong">
      <div>
        <p className="font-mono text-xs tracking-wide text-muted uppercase">
          {project.categories.map((category) => PROJECT_CATEGORY_LABELS[category]).join(' · ')}
        </p>
        <h3 className="mt-2 text-lg font-semibold">
          <Link href={`/projects/${project.slug}`} className="no-underline hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-muted">{project.summary}</p>
      </div>

      <MetricRow metrics={project.metrics} />

      <TagList items={project.stack} />

      <div className="mt-auto flex flex-wrap items-center gap-6 font-mono text-xs">
        <Link href={`/projects/${project.slug}`} className="no-underline hover:underline">
          Case study
        </Link>
        {project.links.live !== undefined && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 no-underline hover:underline"
          >
            Live <ArrowUpRight size={12} aria-hidden />
          </a>
        )}
        {project.links.repo !== undefined && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 no-underline hover:underline"
          >
            Source <ArrowUpRight size={12} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}
