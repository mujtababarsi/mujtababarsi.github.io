/** @type {import('tailwindcss').Config} */
const token = name => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Colours and fonts are CSS variables defined in index.css, so the whole
      // site can be re-themed in one place.
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        ink: token('ink'),
        body: token('body'),
        muted: token('muted'),
        subtle: token('subtle'),
        line: token('line'),
        accent: {
          DEFAULT: token('accent'),
          hover: token('accent-hover'),
          soft: token('accent-soft'),
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
