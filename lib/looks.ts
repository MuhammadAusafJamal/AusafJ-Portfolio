/**
 * Alternate looks.
 *
 * A look is a full theme beyond light and dark: its own palette, fonts, shape, and
 * motion, switched on with `?theme=<id>` and remembered by next-themes after that.
 * Each one is a class in `styles/globals.css` and gets its own page at
 * `/style-guide/<id>`.
 *
 * This list is the only place a look is registered. The theme provider, the
 * `?theme=` script in the root layout, the footer switcher, and the style guide
 * routes all read it.
 */
export const LOOKS = [
  {
    id: 'console',
    label: 'Console',
    summary: 'A warm amber terminal. Monospace headings, square corners, a blinking caret.',
  },
  {
    id: 'riso',
    label: 'Riso',
    summary:
      'A risograph zine. Halftone paper, pink and blue ink, cards taped up slightly crooked.',
  },
  {
    id: 'blocks',
    label: 'Signal Blocks',
    summary: 'Transit signage. A cobalt hero band, wide uppercase type, hard offset shadows.',
  },
] as const;

export type LookId = (typeof LOOKS)[number]['id'];

/** Every value next-themes accepts. `system` stays valid for the plain toggle. */
export const THEMES: string[] = ['light', 'dark', ...LOOKS.map((look) => look.id)];
