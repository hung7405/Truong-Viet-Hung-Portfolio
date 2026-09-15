# Truong Viet Hung — AI Engineer Portfolio

Production-oriented portfolio of **Truong Viet Hung** (Hung Truong) —
final-year Data Science student @ Swinburne and AI Engineer Intern @ Payoo.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + three.js**,
styled as a dark Awwwards-level experience: glassmorphism, gradient orbs,
custom cursor, scroll reveals, and an interactive WebGL hero.

## Tech stack

- Next.js 14 App Router, React 18, TypeScript
- Tailwind CSS 3, Framer Motion, lucide-react
- three.js (raw WebGL hero, no wrapper deps)
- ESLint (next/core-web-vitals)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint check
```

## Project structure

- `app/` — routes: home, about, projects (+ `[slug]` case studies),
  experience, skills, contact, printable `/cv`
- `components/` — Navbar, Footer, Hero3D, UI primitives, ErrorBoundary
- `lib/data.ts` — single source of truth, mirrored from the CV

## Deployment

Optimized for Vercel (`vercel --prod`). Any static host serving
`next build` output works as well.
