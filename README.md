# Khansa Shafeeq — Portfolio

Lightweight React + Vite portfolio showcasing projects, skills and contact.

## Features
- Animated hero, Projects, About, Skills and Contact sections
- Framer Motion animations and touch-friendly interactions
- Responsive layout with mobile/tablet adjustments

## Tech
- React + Vite
- Framer Motion
- Plain CSS (located at `src/styles.css`)

## Quick start
Prerequisites: Node.js 16+ and npm.

1. Install dependencies

```bash
npm install
```

2. Start dev server (local network accessible)

```bash
npm run dev
```

Open the printed `Local` or `Network` URL in your phone/emulator to test mobile behavior.

3. Build for production

```bash
npm run build
npm run preview
```

## Where to edit
- Main app: `src/App.jsx`
- Styles: `src/styles.css`
- Public assets: `public/` (images, projects)

## Deploy
- Recommended: Vercel or Netlify — connect the repo and deploy the `dist/` output from the build.
- GitHub Pages (simple): use the `gh-pages` package or deploy from `dist/` via GitHub Actions.
