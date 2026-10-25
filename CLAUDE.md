# CLAUDE.md

Personal portfolio site for Mohamed Elmugtaba (bioinformatics / pharmacy), served at https://mujtababarsi.github.io/.

## Stack

- React 19 + TypeScript, built with Vite 6
- Tailwind CSS 3 via PostCSS (`tailwind.config.js`, `postcss.config.js`, `index.css`) — a real build step, not the CDN script
- Fonts self-hosted with `@fontsource` (Archivo headings, Space Grotesk text), imported in `index.tsx`
- Framer Motion for animation, lucide-react for icons, Recharts for the genomic coverage chart

## Commands

- `npm run dev` — dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`
- `npm run cv` — print `cv/cv.html` to `public/Mohamed_Elmugtaba_Bioinformatics_CV.pdf` with headless Chrome (set `CHROME_PATH` if Chrome isn't found)

There are no tests, linter, or formatter configured. `npm run build` is the check: it fails on TypeScript/import errors.

## Layout

- `App.tsx` — page composition and section scroll tracking (section ids: `home`, `me`, `expertise`, `projects`, `experience`, `education`)
- `components/` — one file per page section; `components/ui/` holds shared pieces
- `data/portfolioData.tsx` — all portfolio content (projects, experience, education, certificates, profile image path). Edit content here, not in components.
- `types.ts` — shared data types (`Project`, `Experience`, ...)
- `components/ui/ProjectCover.tsx` — generated SVG cover art for projects, drawn with theme colours
- `public/` — static assets served at the site root (`me.jpg`, `favicon.svg`, `robots.txt`, `sitemap.xml`, the CV PDF)
- `cv/cv.html` — source of the 2-page A4 CV. Not part of the site build; its fonts (Lora, Source Sans 3, Source Code Pro) are dev dependencies

## Adding a project

Add an entry to `PROJECTS` in `data/portfolioData.tsx` (newest first). Set `kind` (`pipeline` or `analysis`, which decides the group it shows in), `cover` (one of the kinds in `ProjectCover.tsx`; add a new one there if none fits) and 2–3 short `stats`.

## Updating the CV

Edit the text in `cv/cv.html`, run `npm run cv`, then open the PDF and check that both pages still fit: each `.page` has a fixed A4 height with `overflow: hidden`, so text that runs past the bottom of a page is cut off, not moved to the next page. Commit both files. The site's CV buttons open the PDF in a new tab. When the DNA-seq or other project wording changes, update the CV alongside `data/portfolioData.tsx`.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. The deploy job is restricted to `main` by the `github-pages` environment, so a manual run on any other branch will build but fail at deploy. That is expected.

## Gotchas

- **No secrets in the client bundle.** Anything Vite inlines (via `define` or `import.meta.env`) ships in the public JS. The site used to inline a Gemini API key this way; the key, the "Ask AI" copilot and the per-project "AI insight" were removed for that reason. Bring AI features back only behind a server-side proxy that holds the key.
- **Framer Motion owns `transform`.** On a `motion.div` that animates `x`/`y`/`scale`/`rotate`, Framer Motion writes an inline `transform` that overrides Tailwind `translate-*`/`scale-*` classes. Center or position such elements with flexbox or a wrapper instead.
- **Keep `AnimatePresence` mounted.** Don't early-return `null` above an `AnimatePresence`; put the condition inside it, or exit animations are skipped.
- **Colours and fonts are theme variables.** `index.css` defines `--c-*` colour channels and `--font-body`/`--font-display`; `tailwind.config.js` maps them to classes (`text-ink`, `text-body`, `text-muted`, `text-subtle`, `bg-canvas`, `bg-surface`, `bg-accent`, `bg-accent-soft`, `bg-success`, ...). Use these, not raw hex, so the site can be re-themed in one place. `text-subtle` is below 4.5:1 contrast: use it only for large or decorative text.
- **Icon weight is global.** `index.css` sets `.lucide { stroke-width: 1.5 }`, which overrides the `strokeWidth` prop; use a class like `![stroke-width:0.5]` for a deliberate exception.

## Open ideas

- Code-split the ~700KB JS bundle (Vite warns on every build)
- Restore "Ask AI" and "AI insight" behind a server-side proxy (e.g. a Cloudflare Worker); the removed code is in git history before the key-removal commit
- Dark mode
- Live GitHub stats (stars, last updated) on project cards
