import { API_ROUTES } from "@/utils/enum";
import { TvDetailType } from "@/types";
import { REVALIDATE, tmdbRequest } from "../request";

// Consolidates what used to be 3 separate requests (single/credits/similar)
// into one, and adds certifications, images, external ids and watch
// providers for free on top.
const APPEND_TO_RESPONSE =
  "credits,videos,images,recommendations,similar,content_ratings,external_ids,watch/providers";

const getTvDetailAPI = async (tvId: string) => {
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
};

export default getTvDetailAPI;
