# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

VHD-TV is a Next.js 14 (App Router) movie/TV streaming browser UI backed by the TMDB API. It renders trending/popular/latest movies and TV series, detail pages, search, and a trailer/video player. Live at vhd-tv.vercel.app.

## Commands

```
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # next lint (ESLint, extends next/core-web-vitals)
```

There is no test suite configured in this repo.

## Environment

TMDB credentials live in `.env` at the repo root:
- `API_KEY`, `API_READ_ACCESS_TOKEN` — TMDB API v3 key / v4 read token
- `NEXT_APP_BASE_URL` — TMDB base URL (`https://api.themoviedb.org/3`)

## Architecture

### Data fetching: server actions in `src/apis/`

All TMDB calls are React server actions (`"use server"` files), grouped by domain and barrel-exported via `index.ts`:
- `src/apis/api-client.ts` — a single shared Axios instance, base URL and bearer token from env vars.
- `src/apis/common/` — cross-media endpoints (trending, media detail/videos by type, multi-search).
- `src/apis/movie/`, `src/apis/tv-series/` — movie- and TV-specific endpoints (popular, latest, similar, credits, images).
- Route templates with `:param` placeholders live in `src/utils/enum.ts` (`API_ROUTES`); each API function does `.replace(":paramName", value)` itself rather than using a URL templating lib.

Every API function follows the same shape — no exceptions are thrown up to callers:
```ts
const getXAPI = async (...) => {
  let errors = null;
  let response = null;
  try {
    response = await apiClient.get(...);
    response = response.data;
    return { response, errors };
  } catch (error) {
    return { response, errors: error };
  }
};
```
Callers (server components) destructure `{ response, errors }` and conditionally render based on `errors` (see `src/app/movie/[movieId]/page.tsx`, `src/app/watch/[media]/[mediaId]/page.tsx`). When adding a new endpoint, add the route to `API_ROUTES` in `src/utils/enum.ts`, add the function under the matching domain folder, and export it from that folder's `index.ts`.

### Routing (`src/app/`)

App Router pages, mostly async server components that fetch data directly and pass it to presentational client components in a sibling `components/` folder:
- `/` → `page.tsx` (dashboard), `/home`, `/movies`, `/tv-series`, `/movie/[movieId]`, `/series/[seriesId]`, `/search`, `/watch/[media]/[mediaId]` (video player, `media` is `"movie"` or `"tv"`).
- Centralized route strings (for links, not API calls) live in `src/app/paths.ts` — use this instead of hardcoding hrefs.
- Static nav config (`dashboardMenuItems`) lives in `src/utils/index.ts`. The header is a fixed glass bar (`src/components/header.tsx`, rendered as a sibling *before* `AppScroll` in `src/app/layout.tsx`, not inside it — this keeps the scroll container's own scrollbar from being drawn over the header). `AppScroll` reserves space for it via `pt-(--header-h)`; hero sections cancel that with a matching negative top margin so the backdrop shows through underneath the header.

### Shared UI (`src/components/`)

Reusable presentational components, each usually split into a `container.tsx` (data/state wiring) and leaf render components (e.g. `movie-list/container.tsx` + `body-carousel.tsx`/`body-scroll.tsx`, `carousel/container.tsx` + `carousel.tsx`/`image.tsx`/`details.tsx`/`controls/`). Client components are explicitly marked `"use client"`; server components have no directive.

Notable components:
- `player/` — Plyr-based trailer/video player.
- `search/` — search box + results, debounced via `src/hooks/useDebounce.ts`.
- `carousel/` and `list-carousel/` — Swiper-based carousels (two separate implementations for different UI sections).

### Types and constants

- `src/types/index.ts` — TMDB response shapes (movie/TV trending, single-media detail, credits, videos, etc.). `CommonCardType` intersects the card-shaped types for components that render either movies or TV shows generically.
- `src/utils/enum.ts` — TMDB API route templates (`API_ROUTES`).
- `src/utils/index.ts` — misc constants (`TMDB_IMAGE_BASE_URL`, `YOUTUBE_VIDEO_BASE_URL`) and helpers (`capitalizeFirstLetter`).

### Context

`src/context/index.tsx` defines `DefaultContext`/`DefaultContextProvider`, wired in `src/app/providers.tsx` (client component) and mounted once in the root layout. Currently an empty placeholder value — extend this if/when app-wide client state is needed.

## Conventions

- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Styling is Tailwind (`tailwind.config.ts`) plus NextUI (`@nextui-org/react`); custom theme colors (`primary`) are defined as raw RGB in the Tailwind config, not CSS variables.
- Prettier runs with `prettier-plugin-tailwindcss` for class sorting — no other custom Prettier options are set.
