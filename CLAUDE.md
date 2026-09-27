# CLAUDE.md

Personal portfolio site for Mohamed Elmugtaba (bioinformatics / pharmacy), served at https://mujtababarsi.github.io/.

## Stack

- React 19 + TypeScript, built with Vite 6
- Tailwind CSS 3 via PostCSS (`tailwind.config.js`, `postcss.config.js`, `index.css`) — a real build step, not the CDN script
- Framer Motion for animation, lucide-react for icons, Recharts for the genomic coverage chart
- `@google/genai` for the "Ask AI" copilot and per-project "AI Insight"

## Commands

- `npm run dev` — dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`

There are no tests, linter, or formatter configured. `npm run build` is the check: it fails on TypeScript/import errors.

## Layout

- `App.tsx` — page composition and section scroll tracking (section ids: `home`, `me`, `expertise`, `projects`, `experience`, `education`)
- `components/` — one file per page section; `components/ui/` holds shared pieces
- `data/portfolioData.tsx` — all portfolio content (projects, experience, education, certificates, profile image path). Edit content here, not in components.
- `types.ts` — shared data types (`Project`, `Experience`, ...)
- `services/gemini.ts` — Gemini API wrapper with retry
- `public/` — static assets served at the site root (`me.jpg`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `projects/*.svg` cover art)

## Adding a project

Add an entry to `PROJECTS` in `data/portfolioData.tsx` (newest first). Prefer a local cover image under `public/projects/` over a hotlinked stock photo.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. The deploy job is restricted to `main` by the `github-pages` environment, so a manual run on any other branch will build but fail at deploy. That is expected.

## Gotchas

- **Gemini key is public.** The workflow passes the repo secret `VITE_GEMINI_API_KEY` into the build as `GEMINI_API_KEY`, and `vite.config.ts` inlines it into the client bundle via `define`. Anyone can read it from the deployed JS. Fixing this needs a server-side proxy; it has not been done.
- **Framer Motion owns `transform`.** On a `motion.div` that animates `x`/`y`/`scale`/`rotate`, Framer Motion writes an inline `transform` that overrides Tailwind `translate-*`/`scale-*` classes. Center or position such elements with flexbox or a wrapper instead.
- **Keep `AnimatePresence` mounted.** Don't early-return `null` above an `AnimatePresence`; put the condition inside it, or exit animations are skipped.
- **Projects carousel** (`components/Projects.tsx`): cards and the container are both `h-[400px]`, so anything absolutely positioned at the container's bottom overlaps card content. The navigation dots sit in normal flow below the carousel for this reason.

## Open ideas

- Code-split the ~1MB JS bundle (Vite warns on every build)
- Dark mode
- Live GitHub stats (stars, last updated) on project cards
- Custom cover art for the projects still using Unsplash photos
