/**
 * The one coloured pixel on the site.
 *
 * Green means available, grey means selective, dim grey means not looking. The
 * colour carries meaning here, which is what separates it from decoration.
 *
 * Only the open state pulses. A halo expanding out of a dot reads as live, and
 * putting that on "not looking" would animate a claim the label contradicts. It is
 * also a halo rather than a blink: an indicator that switches off and on again
 * reads as broken hardware.
 */
import type { Availability } from '@ausaf/schema/types';

const COLOR: Record<Availability, string> = {
  open: 'bg-success',
  selective: 'bg-muted',
  closed: 'bg-subtle',
};

export function StatusDot({ availability, label }: { availability: Availability; label: string }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs text-muted">
      <span className="relative flex size-1.5 shrink-0" aria-hidden>
        {availability === 'open' && (
          <span className="absolute inset-0 rounded-full bg-success animate-status-pulse" />
        )}
        <span className={`relative size-1.5 rounded-full ${COLOR[availability]}`} />
      </span>
      {label}
    </p>
  );
}
