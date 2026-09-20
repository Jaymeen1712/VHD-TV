import { API_ROUTES } from "@/utils/enum";
import { SingleMediaType } from "@/types";
import { REVALIDATE, tmdbRequest } from "../request";

/**
 * Lightweight detail fetch (no append_to_response) used only by the /watch
 * page, which just needs a title and id. For the full detail pages, use
 * getMovieDetailAPI / getTvDetailAPI instead.
 */
const getMediaDetailsAPI = async (media: "movie" | "tv", mediaId: string) => {
  const { response, errors } = await tmdbRequest<Omit<SingleMediaType, "media_type">>(
    API_ROUTES.MEDIA_DETAILS,
    { routeParams: { media, mediaId }, revalidate: REVALIDATE.DETAIL },
  );

  if (!response) return { response: null, errors };

  // TMDB's raw /movie/:id and /tv/:id payloads carry no media_type field —
  // stamp it from the route so callers get a real discriminated union.
  return {
    response: { ...response, media_type: media } as SingleMediaType,
    errors: null,
  };
};

export default getMediaDetailsAPI;
