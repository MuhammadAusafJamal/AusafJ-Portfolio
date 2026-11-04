/**
 * Project cover.
 *
 * A real screenshot when the project has one. Otherwise a skeleton of the
 * product's shape: a phone for mobile work, a browser window for everything
 * else. Client work under NDA never gets a screenshot, so its skeleton carries
 * an "Under NDA" mark that says why the picture is blank.
 *
 * The bar widths come from the slug, so each card looks different but renders
 * the same on every build.
 */
import Image from 'next/image';
import { Lock } from 'lucide-react';
import type { Project } from '@ausaf/schema/types';

/** Cheap string hash; good enough to vary bar widths, nothing more. */
function seed(slug: string): number[] {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return Array.from({ length: 6 }, (_, i) => 40 + ((h >>> (i * 4)) % 16) * 3.5);
}

function Bar({ width, strong = false }: { width: number; strong?: boolean }) {
  return (
    <span
      className={`block h-2 rounded-full ${strong ? 'bg-border-strong' : 'bg-border'}`}
      style={{ width: `${width}%` }}
    />
  );
}

function BrowserSkeleton({ widths }: { widths: number[] }) {
  return (
    <div className="absolute inset-x-6 top-6 bottom-0 flex flex-col overflow-hidden rounded-t-tag border border-b-0 border-border bg-bg">
      <div className="flex items-center gap-1 border-b border-border px-3 py-2">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-3 h-2 w-1/3 rounded-full bg-surface-2" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <Bar width={widths[0]! * 0.6} strong />
        <Bar width={widths[1]!} />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {widths.slice(2, 5).map((w, i) => (
            <div
              key={i}
              className="flex h-12 flex-col justify-end gap-1 rounded-tag bg-surface-2 p-2"
            >
              <Bar width={w} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneSkeleton({ widths }: { widths: number[] }) {
  return (
    <div className="absolute top-6 bottom-0 left-1/2 flex w-1/3 -translate-x-1/2 flex-col gap-3 overflow-hidden rounded-t-card border border-b-0 border-border bg-bg p-3">
      <span className="mx-auto h-1.5 w-1/3 rounded-full bg-border" />
      <Bar width={widths[0]!} strong />
      <div className="h-10 rounded-tag bg-surface-2" />
      {widths.slice(1, 4).map((w, i) => (
        <Bar key={i} width={w} />
      ))}
    </div>
  );
}

export function ProjectCover({ project }: { project: Project }) {
  if (project.cover !== undefined) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-tag border border-border">
        <Image
          src={project.cover}
          alt={project.coverAlt ?? ''}
          fill
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const widths = seed(project.slug);
  const isMobile = project.categories[0] === 'mobile';

  return (
    <div
      role="img"
      aria-label={
        project.confidential
          ? `${project.title}: client work under NDA, no screenshots shown.`
          : `${project.title}: placeholder, no screenshot yet.`
      }
      className="cover-skeleton relative aspect-video overflow-hidden rounded-tag border border-border bg-surface-2"
    >
      {isMobile ? <PhoneSkeleton widths={widths} /> : <BrowserSkeleton widths={widths} />}
      {project.confidential && (
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-tag border border-border bg-surface px-2 py-1 font-mono text-xs text-muted">
          <Lock size={12} aria-hidden /> Under NDA
        </span>
      )}
    </div>
  );
}
