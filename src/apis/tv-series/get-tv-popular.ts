import { API_ROUTES } from "@/utils/enum";
import { RawCard, TmdbPaginatedResponse } from "@/types";
import { normalizeCards } from "../normalize";
import { REVALIDATE, tmdbRequest } from "../request";

const getTvPopularAPI = async (page: number = 1) => {
  const { response, errors } = await tmdbRequest<TmdbPaginatedResponse<RawCard>>(
    API_ROUTES.TV_POPULAR,
    { params: { page }, revalidate: REVALIDATE.LIST },
  );

  if (!response) return { response: null, errors };

  return {
    response: {
      ...response,
      results: await normalizeCards(response.results, "tv"),
    },
    errors: null,
  };
};

export default getTvPopularAPI;
