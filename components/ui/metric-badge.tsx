/**
 * A measured outcome: one number, one label, optionally one line of context.
 *
 * The number is set in mono at 39px—the largest size on the scale after the hero
 * name—because it is the only thing on a project card a recruiter is guaranteed to
 * read. The label sits above it rather than below: a reader's eye lands on the
 * number first either way, so the label above frames it instead of trailing it.
 */
import type { Metric } from '@ausaf/schema/types';

export function MetricBadge({ metric }: { metric: Metric }) {
  return (
    <div>
      <p className="font-mono text-xs tracking-wide text-muted uppercase">{metric.label}</p>
      <p className="mt-1 font-mono text-3xl tabular-nums">{metric.value}</p>
      {metric.detail !== undefined && <p className="mt-1 text-xs text-muted">{metric.detail}</p>}
    </div>
  );
}

export function MetricRow({ metrics }: { metrics: readonly Metric[] }) {
  if (metrics.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-8">
      {metrics.map((metric) => (
        <MetricBadge key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
