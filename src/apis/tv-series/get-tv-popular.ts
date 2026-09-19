import { API_ROUTES } from "@/utils/enum";
import { CommonCardType, TmdbPaginatedResponse } from "@/types";
import { tmdbRequest } from "../request";

const getTvPopularAPI = (page: number = 1) =>
  tmdbRequest<TmdbPaginatedResponse<CommonCardType>>(API_ROUTES.TV_POPULAR, {
    params: { page },
  });

export default getTvPopularAPI;
