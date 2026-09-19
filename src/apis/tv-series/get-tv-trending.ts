import { API_ROUTES } from "@/utils/enum";
import { CommonCardType, TmdbPaginatedResponse } from "@/types";
import { tmdbRequest } from "../request";

const getTvTrendingAPI = (page: number = 1) =>
  tmdbRequest<TmdbPaginatedResponse<CommonCardType>>(API_ROUTES.TV_TRENDING, {
    params: { page },
  });

export default getTvTrendingAPI;
