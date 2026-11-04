/**
 * Look picker.
 *
 * One popover for the whole site, rendered once in the root layout. The palette
 * button in the nav and the "Explore another look" button in the footer both open
 * it through `popoverTarget`, the browser's own popover, so there is no client
 * JavaScript here at all.
 *
 * Each option is a plain link to `?theme=<id>`. A full page load is what lets the
 * script in the root layout store the choice before first paint.
 *
 * The preview chip wears the look's own class, so it shows that look's colours
 * and display face. Its fonts are not preloaded; they download only when the
 * picker is opened and the chip becomes visible. Which option is current is marked
 * in CSS from the class on <html>, so the server render needs no theme.
 */
import { Check, Palette } from 'lucide-react';
import { clsx } from 'clsx';
import { LOOKS } from '@/lib/looks';

export const LOOK_PICKER_ID = 'look-picker';

const OPTIONS = [
  { id: 'dark', label: 'Default', summary: 'Calm and editorial. Light or dark with the toggle.' },
  ...LOOKS,
];

/** The nav's trigger: an icon button sized to sit beside the theme toggle. */
export function LookPickerButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      popoverTarget={LOOK_PICKER_ID}
      aria-label="Explore another look"
      title="Explore another look"
      className={clsx(
        'grid size-7 cursor-pointer place-items-center rounded-full border border-transparent text-muted transition-colors duration-micro ease-standard hover:border-border hover:bg-surface-2 hover:text-text',
        className
      )}
    >
      <Palette size={16} aria-hidden />
    </button>
  );
}

export function LookPicker() {
  return (
    <div
      popover="auto"
      id={LOOK_PICKER_ID}
      aria-label="Pick a look"
      className="look-picker rounded-card border border-border bg-surface p-6 text-text"
    >
      <p className="text-lg font-semibold">Pick a look</p>
      <p className="mt-1 text-sm text-muted">Same site, four designs. Your choice is remembered.</p>

      <ul className="mt-6 flex flex-col gap-2">
        {OPTIONS.map((option) => (
          <li key={option.id}>
            <a
              href={`?theme=${option.id}`}
              data-look={option.id}
              className="look-option flex items-center gap-4 rounded-tag border border-border p-3 no-underline transition-colors duration-micro ease-standard hover:border-border-strong hover:bg-surface-2"
            >
              <span
                aria-hidden
                className={clsx(
                  'look-chip grid size-12 shrink-0 place-items-center rounded-tag border border-border font-display text-lg',
                  option.id === 'dark' ? 'look-chip-default' : option.id
                )}
              >
                Aa
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  {option.label}
                  <span className="look-current hidden items-center gap-1 font-mono text-xs font-normal text-muted">
                    <Check size={12} aria-hidden /> Current
                  </span>
                </span>
                <span className="text-xs text-muted">{option.summary}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
