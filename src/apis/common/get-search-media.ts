"use server";

import { API_ROUTES } from "@/utils/enum";
import { PersonCardType, RawCard, TmdbPaginatedResponse } from "@/types";
import { normalizeSearchResults } from "../normalize";
import { REVALIDATE, tmdbRequest } from "../request";

const getSearchMediaAPI = async (search: string, page: number = 1) => {
  const { response, errors } = await tmdbRequest<
    TmdbPaginatedResponse<RawCard | PersonCardType>
  >(API_ROUTES.SEARCH_MEDIA, {
    params: { query: search, page, include_adult: false },
    revalidate: REVALIDATE.SEARCH,
  });

  if (!response) return { response: null, errors };

  return {
    response: {
      ...response,
      results: await normalizeSearchResults(response.results),
    },
    errors: null,
  };
};

export default getSearchMediaAPI;
