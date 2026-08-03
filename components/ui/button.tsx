/**
 * Button, in three weights.
 *
 * `primary` is an inversion: solid foreground colour, background-coloured text.
 * With no accent hue in the palette, that inversion is the only thing that can
 * make an element the loudest on the page, so exactly one primary per screen.
 *
 * Renders as an `<a>` when given an `href`, because a thing that navigates should
 * be a link no matter what it looks like.
 */
import Link from 'next/link';
import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:bg-accent-hover',
  secondary: 'border border-border hover:border-border-strong',
  ghost: 'text-muted hover:text-text',
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-semibold no-underline transition-colors duration-micro ease-standard';

type Props = {
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({ variant = 'secondary', href, external, className, children }: Props) {
  const classes = clsx(BASE, VARIANTS[variant], className);

  if (href === undefined) {
    return <button className={classes}>{children}</button>;
  }

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
