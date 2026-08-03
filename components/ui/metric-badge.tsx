/**
 * A measured outcome: one number, one label, optionally one line of context.
 *
 * The number is set in mono at 31px because it is the only thing on a project
 * card a recruiter is guaranteed to read. Everything else on the card explains it.
 */
import type { Metric } from '@ausaf/schema/types';

export function MetricBadge({ metric }: { metric: Metric }) {
  return (
    <div>
      <p className="font-mono text-2xl">{metric.value}</p>
      <p className="font-mono text-xs text-muted">{metric.label}</p>
      {metric.detail !== undefined && <p className="mt-1 text-xs text-subtle">{metric.detail}</p>}
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
