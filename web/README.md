# Engineering Accelerator — C7

Animated showcase site for the Cohort 7 curriculum, built with Vite + React + TypeScript, Framer Motion, and Tailwind CSS v4. Dark cyberpunk theme with a neon-lime accent and a scroll-driven sprint roadmap.

## Development

```bash
cd web
npm install
npm run dev      # starts the dev server on http://localhost:5173
```

## Build

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Structure

- `src/data/curriculum.ts` — the content layer: all 8 sprints (sessions, outcomes, tools, accent colors) transcribed from the source Excel. Edit here to update curriculum content.
- `src/components/` — `Hero`, `Roadmap` (scroll-linked spine), `SprintCard` (3D tilt), `SprintModal` (per-sprint detail), `Mentors`, `CTA`, `Footer`, `NavBar`, `ParticleField`.
- `src/index.css` — Tailwind v4 `@theme` tokens (colors, fonts) and custom utilities.

All motion respects `prefers-reduced-motion`.
