const TMDB_BASE_URL = process.env.NEXT_APP_BASE_URL;
const TMDB_TOKEN = process.env.API_READ_ACCESS_TOKEN;

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
  /** Values sent as the query string. */
  params?: Record<string, string | number | undefined>;
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
  if (!params) return "";

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export async function tmdbRequest<T>(
  route: string,
  { routeParams, params, revalidate = 3600 }: RequestOptions = {},
): Promise<ApiResult<T>> {
  const url = `${TMDB_BASE_URL}${buildPath(route, routeParams)}${buildQuery(params)}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      next: { revalidate },
    });

    if (!res.ok) {
      return {
        response: null,
        errors: { status: res.status, message: res.statusText },
      };
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
