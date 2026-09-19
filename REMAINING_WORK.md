# VHD-TV Remediation — Status

## Context

This continued the original 32-finding audit + 6-phase remediation plan (approved in full: P0–P3 + major dependency upgrade) on branch `feat/new-changes`. The prior checkpoint (this file) flagged one open styling bug and a short verification punch list; both are now closed out below. **Still nothing has been committed** — everything remains uncommitted working-tree changes.

`npm run build`, `npm run lint`, and `npm run typecheck` are all clean as of the last check (after the fixes below). `npm audit`: 0 vulnerabilities.

---

## Resolved this session

**The `bg-primary` cascade bug is fixed.** Root cause matched the leading theory in the prior checkpoint: Tailwind v4 + `@config` (JS config shim) let HeroUI's plugin-generated theme values win the cascade over `tailwind.config.ts`'s `theme.extend.backgroundColor/textColor/borderColor.primary`. Fix: moved `primary` (and the `3xl` breakpoint) into a CSS-first `@theme` block in `src/app/globals.css`, removed the now-redundant entries from `tailwind.config.ts`. Verified against the production build's generated CSS (`.next/static/chunks/*.css`): `.bg-primary`, `.text-primary`, `.border-primary` are each now a single unambiguous rule resolving to `var(--color-primary)` → `#67e8f9`, with no competing HeroUI rule at the same selector (HeroUI's own primary shades are namespaced `bg-primary-50/100/400`, not `bg-primary`).

**Verification checklist items, all confirmed against the live dev server (port 3000) via curl/build inspection** (browser extension wasn't connected this session, so this was done at the HTTP/HTML/CSS level rather than visually — see note below):
- `/watch/tv/{id}` (Reacher, 108978): confirmed the real TMDB "Official Trailer" (`GSycMV-_Csw`) is fetched and embedded, not just a correct href; page title renders `Watch Reacher | VHD TV`.
- Search `&` encoding: `keyword=Fast %26 Furious` returns correct mixed movie/TV results from TMDB (`URLSearchParams.set` in `src/apis/request.ts` handles this correctly); TV-result subtitle line (`search-list.tsx`) correctly falls back `title||name` / `release_date||first_air_date`.
- `/movies?page=2`: confirmed genuinely different data from page 1 (different first result ID); pagination (`movie-list/body-scroll.tsx`) uses `router.push` with real URL params, so browser back/forward works via standard History API — no code change needed here, just confirmed.
- `npm audit`: re-run, still 0 vulnerabilities.

**390px mobile viewport — found and fixed three real bugs** (this item was previously unchecked; a static/DOM-level pass surfaced concrete breakage, not just a "looked fine" check):
- `src/components/dashboard-container.tsx` (root `/` landing hero card): was `w-[40%] p-12` — at 390px that's a ~156px box with 48px padding per side, leaving ~60px of usable width for a logo + "Browse All Movies & Series" button. Fixed to `w-[90%] max-w-md p-6 sm:w-[40%] sm:p-12`.
- `src/components/single-media-container/detail.tsx` (movie/series detail page): outer `p-12` (fixed) → `p-4 sm:p-8 lg:p-12`; the seven metadata rows (Casts/Genres/Duration/Country/IMDb/Release/Production) used `grid-cols-6` with a `col-span-1` label unconditionally, which is unreadably narrow at 390px — changed to `grid-cols-1 sm:grid-cols-6` with `sm:col-span-1`/`sm:col-span-5`, so rows stack label-over-value on narrow screens instead of squeezing.
- `src/components/player/details.tsx` (watch-page header bar): `h-[90px]` was a **fixed** height combined with `justify-between` and no truncation — a long title at narrow width would wrap and get clipped by the fixed height. Changed to `min-h-[90px]` with `py-4`, added `truncate` to the title and `shrink-0` to the Detail button, and made horizontal padding responsive (`px-4 sm:px-12`).

All three verified via build + typecheck (clean) and route smoke test (`/`, `/movie/123`, `/series/108978`, `/watch/movie/123`, `/watch/tv/108978`, `/movies?page=2`, `/search?keyword=...` all HTTP 200 after the changes).

**Note on verification method**: the Claude in Chrome extension was not connected this session, so the mobile-viewport and color fixes above were verified via generated-CSS inspection, build output, and HTTP/HTML response inspection rather than an actual rendered screenshot at 390px. This is lower-confidence than a visual check. **Recommended before merging**: a quick manual look at `/`, `/movie/[id]`, and `/watch/movie/[id]` in an actual 390px-wide browser or devtools device toolbar to confirm the fixes look right, not just that the classes are structurally correct.

---

## Found but deliberately not fixed (new, worth a decision)

**`src/components/carousel/carousel.tsx`'s home-page hero (`grid grid-cols-2 gap-14`, image + text side-by-side) is also cramped at 390px** — a 2-column layout with a 56px gap leaves each column very narrow on a phone. This was **not** in the original "not yet done" checklist (which scoped the mobile check to "detail/watch pages" specifically), and fixing it properly means a real layout decision (stack image-above-text on mobile, resize the poster image, possibly thread a new prop through `CarouselImage`/`CarouselDetails`) rather than a padding tweak. Flagging it rather than quietly redesigning the home hero without sign-off.

## Deliberately deferred (unchanged from prior checkpoint, documented, not done)

**`CommonCardType` discriminated union rewrite** (Phase 6 item 1 of the original plan). `types/index.ts`'s `CommonCardType` is still the movie∧tv∧person intersection that makes `title`/`name`/`release_date`/`first_air_date`/`profile_path` all falsely non-optional. Concrete bugs from this have already been fixed with targeted null-guards and a shared `isTvCard()` helper (`src/utils/index.ts`) rather than a type-level fix — it's the single largest remaining mechanical change (touches every card-rendering component) and wasn't required for any of the checklist items above. Still unblocked if wanted; still just flagged, not forgotten.

## Not committed

Everything above is uncommitted working-tree changes on `feat/new-changes`. No commit has been made.
