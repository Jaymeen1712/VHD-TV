"use server";

import { API_ROUTES } from "@/utils/enum";
import { CommonCardType, TmdbPaginatedResponse } from "@/types";
import { tmdbRequest } from "../request";

const getSearchMediaAPI = async (search: string, page: number = 1) =>
  tmdbRequest<TmdbPaginatedResponse<CommonCardType>>(API_ROUTES.SEARCH_MEDIA, {
    params: { query: search, page },
  });

export default getSearchMediaAPI;
