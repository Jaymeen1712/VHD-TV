import { API_ROUTES } from "@/utils/enum";
import { TvDetailType } from "@/types";
import { cache } from "react";
import { REVALIDATE, tmdbRequest } from "../request";

// Consolidates what used to be 3 separate requests (single/credits/similar)
// into one, and adds certifications, images, external ids and watch
// providers for free on top.
const APPEND_TO_RESPONSE =
  "credits,videos,images,recommendations,similar,content_ratings,external_ids,watch/providers";

// Wrapped in `cache()` so the page component and `generateMetadata` (which
// both fetch the same series per request) share a single TMDB call.
const getTvDetailAPI = cache(async (tvId: string) => {
  const { response, errors } = await tmdbRequest<Omit<TvDetailType, "media_type">>(
    API_ROUTES.TV_SINGLE,
    {
      routeParams: { tvId },
      params: {
        append_to_response: APPEND_TO_RESPONSE,
        include_image_language: "en,null",
      },
      revalidate: REVALIDATE.DETAIL,
    },
  );

  if (!response) return { response: null, errors };

  return {
    response: { ...response, media_type: "tv" as const },
    errors: null,
  };
});

export default getTvDetailAPI;
