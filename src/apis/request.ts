import { DEFAULT_REGION } from "@/utils";

const TMDB_BASE_URL = process.env.NEXT_APP_BASE_URL;
const TMDB_TOKEN = process.env.API_READ_ACCESS_TOKEN;

if (!TMDB_BASE_URL || !TMDB_TOKEN) {
  // Not thrown — API functions never throw up to callers — but an
  // "undefined/movie/popular" fetch failing silently is worse than a loud log.
  console.error(
    "[tmdbRequest] Missing NEXT_APP_BASE_URL or API_READ_ACCESS_TOKEN env vars.",
  );
}

/** Seconds before Next.js Data Cache revalidates a route, by data volatility. */
export const REVALIDATE = {
  GENRES: 60 * 60 * 24 * 7, // 1 week — genre lists effectively never change.
  DETAIL: 60 * 60 * 24, // 24h — movie/show detail pages.
  LIST: 60 * 60, // 1h — popular/latest/trending/similar lists.
  SEARCH: 60 * 5, // 5 min.
} as const;

const DEFAULT_PARAMS = {
  language: "en-US",
  region: DEFAULT_REGION,
};

export interface ApiError {
  status: number | null;
  message: string;
}

export interface ApiResult<T> {
  response: T | null;
  errors: ApiError | null;
}

interface RequestOptions {
  /** Values substituted into `:param` placeholders in the route. */
  routeParams?: Record<string, string | number>;
  /** Values sent as the query string, merged over the language/region defaults. */
  params?: Record<string, string | number | boolean | undefined>;
  /** Seconds before Next.js Data Cache revalidates this route. */
  revalidate?: number;
}

const buildPath = (
  route: string,
  routeParams: RequestOptions["routeParams"],
) => {
  if (!routeParams) return route;

  return Object.entries(routeParams).reduce(
    (path, [key, value]) =>
      path.replace(`:${key}`, encodeURIComponent(String(value))),
    route,
  );
};

const buildQuery = (params: RequestOptions["params"]) => {
  const merged = { ...DEFAULT_PARAMS, ...params };

  const searchParams = new URLSearchParams();
  Object.entries(merged).forEach(([key, value]) => {
    if (value !== undefined) searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export async function tmdbRequest<T>(
  route: string,
  { routeParams, params, revalidate = REVALIDATE.LIST }: RequestOptions = {},
): Promise<ApiResult<T>> {
  const url = `${TMDB_BASE_URL}${buildPath(route, routeParams)}${buildQuery(params)}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      next: { revalidate },
    });

    if (!res.ok) {
      let message = res.statusText;
      try {
        const body = await res.json();
        if (body?.status_message) message = body.status_message;
      } catch {
        // Non-JSON error body — fall back to statusText.
      }
      return { response: null, errors: { status: res.status, message } };
    }

    return { response: (await res.json()) as T, errors: null };
  } catch (error) {
    return {
      response: null,
      errors: {
        status: null,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
