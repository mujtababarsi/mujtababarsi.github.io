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
      screens: {
        // Laptop screens with little vertical room (e.g. 1920x1080 at 150% scaling
        // leaves about 1280x600 inside Chrome). Used to keep the hero on one screen.
        short: { raw: '(min-width: 1024px) and (max-height: 820px)' },
      },
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
        success: token('success'),
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
