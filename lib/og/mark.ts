/**
 * The `A` mark, as SVG source.
 *
 * One definition, two consumers: the browser favicon and the iOS home-screen icon.
 * They need different corner radii—Chrome renders the tile as authored, iOS applies
 * its own rounded mask over a full-bleed square—so the radius is the only parameter.
 *
 * The letter is drawn as stroked paths rather than set as `<text>`. `public/fonts`
 * is empty and an icon cannot load a webfont anyway, so a text element would be
 * rendered with whatever the OS substitutes: a different shape on Windows, macOS,
 * and Android. Two paths look the same everywhere.
 *
 * Colours are restated here rather than read from `globals.css` because an icon is
 * a standalone file with no stylesheet and no CSS variables. They are `--palette-bg`
 * and `--palette-accent` from the dark theme. If the palette changes, this changes.
 *
 * The tile is filled rather than transparent on purpose. A transparent glyph has to
 * stay legible against both a light and a dark browser chrome; a filled tile looks
 * identical in every tab on every platform, so the icon does not need a theme.
 */
export function mark({ radius }: { radius: number }): string {
  // A 64-unit box. The letter spans x 16–48 and y 14–50, which leaves room for the
  // round caps to extend past those numbers without touching the edge.
  //
  // The crossbar stops at 20.9 and 43.1 because that is where the legs actually are
  // at y=39—the diagonals have moved inward by then, and a bar drawn to the full
  // width would poke out either side.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="${radius}" fill="#0b0b0c"/>
  <g fill="none" stroke="#fafafa" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 50 L32 14 L48 50"/>
    <path d="M20.9 39 L43.1 39"/>
  </g>
</svg>
`;
}
