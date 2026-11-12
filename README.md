# Sart — instruments for agents

A personal portfolio built as a small archipelago: a hub and three islands
(Projects, Lab, About), each with its own face, one **Console** design system
graphite / amber-room / paper, and a living instrument background.

Built by hand. No trackers, no telemetry.

## Stack

- Vite + React 19 + TypeScript + React Router
- Design system in `src/console.css` (Console tokens mapped onto Astryx CSS variables)
- Dynamic background: `src/components/ConsoleDust.tsx` (signal waves, dust, phosphor trace)

## Run

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run build    # production build in dist/
```

## Deploy

Pushes to `main` build and publish to GitHub Pages via
`.github/workflows/deploy.yml`. The route fallback lives in `public/404.html`.
