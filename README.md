# Kapil Kumar — Portfolio

A single-page, front-end-only portfolio built with React, TypeScript and Vite. It follows a
BMW M–inspired design language: a black canvas, uppercase 700 headlines over 300-weight body
text, square corners, and the tricolor stripe used only as an accent.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
```

## Edit content

All the copy lives in [`src/data/content.ts`](src/data/content.ts): hero text, numbers,
projects, experience, the stack tabs, résumé links and contact details. Components only
handle layout.

The résumé is `public/resume/kapil_kumar_resume.pdf` and downloads under the same name.
To update it, replace that file and keep the name.

## Where things are

```
src/
├── data/content.ts          # every word on the site
├── styles/tokens.css        # colours, type, spacing (design tokens)
├── styles/base.css          # reset + type scale
├── components/
│   ├── Nav, Hero, Numbers, Projects, Experience, Stack, Contact, Footer
│   ├── FeaturedProject.tsx  # ApplyPilot and ExcelMind sections (data-driven)
│   ├── ui.tsx               # Button, TextLink, MStripe, SpecGrid, Reveal
│   └── visuals/             # the generated "photography"
│       ├── Waveform.tsx     # hero: animated voice-agent call (canvas)
│       ├── Redline.tsx      # ApplyPilot tailor view
│       ├── ExcelScene.tsx   # ExcelMind chat over a sheet
│       ├── AgentGraph.tsx   # scheduling agent + VoiceQA loop
│       ├── ProjectVisuals.tsx  # Contract Intelligence / Process Monitor art
│       └── Circuit.tsx      # contact band
```

The design system relies on full-bleed photography. There are no stock photos here: each
band uses a generated visual of the system it describes. Animations pause when off screen
and respect `prefers-reduced-motion`.

## Deploy

It's a static site. On Vercel, import the repo; the defaults work (framework: Vite,
build: `npm run build`, output: `dist`). Netlify, Cloudflare Pages and Azure Static Web
Apps work the same way.
