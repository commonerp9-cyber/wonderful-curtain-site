# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A Korean-language product catalog site for a curtain business: curtains, curtain-making components, and curtain-making machines. It is display-only — there is no cart, checkout, or pricing anywhere in the UI. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (utility classes + CSS custom properties) |
| Icons | lucide-react |
| Language | TypeScript 5.9 |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   └── placeholder.png            # Placeholder product image reused across the catalog
├── src
│   ├── data
│   │   └── products.ts            # Product catalog: categories + product list (name, description, specs)
│   ├── routes
│   │   ├── __root.tsx             # Root HTML shell: lang="ko", fonts, meta/title
│   │   ├── index.tsx              # Catalog page: search, category filter, right-side nav
│   │   └── products
│   │       └── $productId.tsx     # Product detail page (description + specs, no price)
│   ├── router.tsx                 # TanStack Router instance
│   └── styles.css                 # Tailwind import + theme CSS variables (linen/clay palette)
├── netlify.toml                   # Build command (vite build), publish dir (dist/client), dev server
├── package.json
├── tsconfig.json
└── vite.config.ts                 # TanStack Start + React + Tailwind + Netlify vite plugins
```

## Key Concepts

### File-based routing (TanStack Router)

- `__root.tsx` wraps every page (HTML shell, fonts, global `<head>` metadata).
- `index.tsx` is `/` — the catalog listing with search + category filter.
- `products/$productId.tsx` is `/products/:productId` — product detail, loaded via the route's `loader` from `src/data/products.ts`.

### Product data

All product content lives in `src/data/products.ts` as a typed array (`Product[]`) plus a `categories` list (`curtain` / `component` / `machine`). This is static display data, not user-generated data, so it is committed as code rather than stored in a database. To add a product, add an entry to the array with `id`, `category`, `image`, `shortDescription`, `description`, and `specs`.

### Search and filtering

Both are implemented client-side in `src/routes/index.tsx` with `useState`/`useMemo` over the static `products` array — no backend calls. The category filter doubles as the "menu" on the right side (`NavPanel` component in the same file), which collapses into a slide-over panel on small screens (`lg:` breakpoint).

## Conventions

### Styling
- Tailwind CSS utility classes throughout.
- Theme colors (`--color-linen`, `--color-clay`, `--color-clay-dark`, `--color-ink`, `--color-taupe`, `--color-border`) are defined once in `styles.css` and referenced via Tailwind arbitrary values, e.g. `bg-[var(--color-clay)]`.
- Body background stays white per the design brief; warm clay/linen tones are used as accents only.
- Korean typography: `Noto Sans KR` for body text, `Gowun Batang` (`font-display` class) for headings, loaded via Google Fonts links in `__root.tsx`.

### Language
- All user-facing copy is Korean. Keep new copy in Korean unless told otherwise.
- `<html lang="ko">` is set in `__root.tsx`.

### TypeScript
- Strict mode enabled.
- Type-only imports use the `type` keyword (see `Category` import in the routes).

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
```
