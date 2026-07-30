/**
 * Tailwind v4 is CSS-first: there is no `tailwind.config.js`. The design tokens
 * live in `styles/globals.css` under `@theme`, and this plugin is the whole build
 * integration.
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
