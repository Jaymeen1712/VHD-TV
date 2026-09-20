# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

VHD-TV is a Next.js (App Router) movie/TV streaming browser UI backed by the TMDB API. It renders trending/popular/latest movies and TV series, detail pages, search, and a trailer/video player. Live at vhd-tv.vercel.app.

## Commands

```
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint (flat config, extends next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run format     # Prettier --write
```

There is no test suite configured in this repo.

## Environment

TMDB credentials live in `.env` at the repo root:
- `API_READ_ACCESS_TOKEN` — TMDB API v4 read token; the only credential actually used (bearer auth)
- `API_KEY` — TMDB v3 key; present in `.env` but unused by any code
- `NEXT_APP_BASE_URL` — TMDB base URL (`https://api.themoviedb.org/3`)

## Architecture

### Data fetching: `src/apis/`

All TMDB calls go through `src/apis/request.ts`'s `tmdbRequest<T>()` — a single `fetch`-based helper (base URL + bearer token from env vars, Next.js `next: { revalidate }` for caching). Every call site follows the same shape and never throws:
```ts
const { response, errors } = await tmdbRequest<T>(route, { routeParams, params, revalidate });
```
`ApiResult<T> = { response: T | null; errors: ApiError | null }`. Callers (server components) destructure and conditionally render based on `errors`/`response`.

- `src/apis/common/` — cross-media endpoints: trending (`/trending/all/week`), lightweight media detail/videos by type (used only by `/watch`), multi-search, and the genre catalog (`/genre/:media/list`).
- `src/apis/movie/`, `src/apis/tv-series/` — movie/TV popular, latest, trending, and the consolidated detail endpoint (`getMovieDetailAPI`/`getTvDetailAPI`), which fetches `/movie/:id` or `/tv/:id` with `append_to_response=credits,videos,images,recommendations,similar,release_dates|content_ratings,external_ids,watch/providers` — one request instead of the three (single/credits/similar) this used to take.
- `src/apis/normalize.ts` — the boundary where raw TMDB rows become app types: `normalizeCards()` stamps `media_type` (list endpoints don't return it) and resolves `genre_ids` → `genre_names` via a genre map (`getGenreMap()`, `react cache()`-deduped, backed by `getGenresAPI`). `normalizeSearchResults()` does the same but preserves person rows. Every list-returning API function routes through one of these before returning.
- Route templates with `:param` placeholders live in `src/utils/enum.ts` (`API_ROUTES`); `tmdbRequest`'s `routeParams` option substitutes and URL-encodes them.
- `REVALIDATE` (in `request.ts`) tiers cache lifetimes by volatility: genres 1 week, detail 24h, lists 1h, search 5 min. Default query params (`language=en-US`, `region=US`) are merged into every request.

When adding a new endpoint: add the route to `API_ROUTES`, add the function under the matching domain folder (routing raw list rows through `normalizeCards`/`normalizeSearchResults` if it returns cards), and export it from that folder's `index.ts`.

### Routing (`src/app/`)

App Router pages, mostly async server components that fetch data directly and pass it to presentational client components in a sibling `components/` folder:
- `/` redirects (permanent, in `next.config.js`) to `/home`. Routes: `/home`, `/movies`, `/tv-series`, `/movie/[movieId]`, `/series/[seriesId]`, `/search`, `/watch/[media]/[mediaId]` (video player, `media` is `"movie"` or `"tv"`).
- Centralized route strings (for links, not API calls) live in `src/app/paths.ts` — use this instead of hardcoding hrefs.
- Static nav config (`dashboardMenuItems`) lives in `src/utils/index.ts`. The header is a fixed glass bar (`src/components/header.tsx`, rendered as a sibling *before* `AppScroll` in `src/app/layout.tsx`, not inside it — this keeps the scroll container's own scrollbar from being drawn over the header). `AppScroll` reserves space for it via `pt-(--header-h)`; hero sections cancel that with a matching negative top margin so the backdrop shows through underneath the header.
- `src/app/providers.tsx` wraps the tree in HeroUI's `HeroUIProvider`, wired into `layout.tsx`. There is no app-wide client state/context beyond this.

### Shared UI (`src/components/`)

Reusable presentational components, each usually split into a `container.tsx` (data/state wiring) and leaf render components (e.g. `movie-list/container.tsx` + `header.tsx`/`body-scroll.tsx`, `carousel/container.tsx` + `carousel.tsx`/`image.tsx`/`details.tsx`/`controls/`, `single-media-container/container.tsx` + `detail.tsx`/`cast-row.tsx`/`watch-providers.tsx`). Client components are explicitly marked `"use client"`; server components have no directive.

Notable components:
- `player/` — Plyr-based trailer/video player; ranks appended videos (official > Trailer > Teaser > Clip > Featurette, newest first) rather than only ever looking for an official Trailer.
- `search/` — search box + dropdown results (`search-list.tsx` renders movie/TV/person rows differently), debounced via `src/hooks/useDebounce.ts`. The full `/search` results page only renders movie/TV cards — `MovieCard` has no person layout, so person rows are filtered out there (they're still shown in the dropdown).
- `carousel/` and `list-carousel/` — Swiper-based carousels (two separate implementations for different UI sections).
- `single-media-container/detail.tsx` — the detail-page metadata panel; reads director/creator, genres, cast, certification, watch providers, and IMDb id straight off the consolidated detail response.

### Types and constants

- `src/types/index.ts` — TMDB response shapes. `CommonCardType = MovieCardType | TvCardType`, a real discriminated union on `media_type` (narrow with `data.media_type === "tv"` before reading TV-only fields like `name`/`first_air_date`, or movie-only fields like `title`/`release_date`). `RawCard` is the pre-normalization shape list endpoints actually return (media_type optional, no `genre_names`) — only `normalize.ts` should touch it. `SearchResultType = CommonCardType | PersonCardType` for `/search/multi` rows. `SingleMediaType = MovieDetailType | TvDetailType`, same discriminator, with the `append_to_response` sub-resources (`credits`, `images`, `recommendations`, `similar`, `external_ids`, `"watch/providers"`, plus `release_dates`/`content_ratings`) as optional fields.
- `src/utils/enum.ts` — TMDB API route templates (`API_ROUTES`).
- `src/utils/index.ts` — misc constants (`TMDB_IMAGE_BASE_URL`, `YOUTUBE_VIDEO_BASE_URL`, `DEFAULT_REGION`) and helpers (`tmdbImage`, `capitalizeFirstLetter`).
- `src/utils/certification.ts` — `getCertification()` reads the US entry out of `release_dates`/`content_ratings`.

## Conventions

- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Styling is Tailwind v4 (CSS-first `@theme` in `src/app/globals.css`) plus HeroUI (`@heroui/react`); theme colors like `primary` are defined in `@theme` so they win the cascade over HeroUI's own generated theme values — don't move them back into `tailwind.config.ts`'s `theme.extend`.
- Prettier runs with `prettier-plugin-tailwindcss` for class sorting — no other custom Prettier options are set.
