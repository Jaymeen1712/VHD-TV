import { API_ROUTES } from "@/utils/enum";
import { RawCard, TmdbPaginatedResponse } from "@/types";
import { normalizeCards } from "../normalize";
import { REVALIDATE, tmdbRequest } from "../request";

const getMoviesLatestAPI = async (page: number = 1) => {
  const { response, errors } = await tmdbRequest<TmdbPaginatedResponse<RawCard>>(
    API_ROUTES.MOVIE_LATEST,
    { params: { page }, revalidate: REVALIDATE.LIST },
  );

  if (!response) return { response: null, errors };

  return {
    response: {
      ...response,
      results: await normalizeCards(response.results, "movie"),
    },
    errors: null,
  };
};

export default getMoviesLatestAPI;
