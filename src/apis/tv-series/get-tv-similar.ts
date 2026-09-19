import { API_ROUTES } from "@/utils/enum";
import { CommonCardType, TmdbPaginatedResponse } from "@/types";
import { tmdbRequest } from "../request";

const getTvSimilarAPI = (tvId: string, page: number = 1) =>
  tmdbRequest<TmdbPaginatedResponse<CommonCardType>>(API_ROUTES.TV_SIMILAR, {
    routeParams: { tvId },
    params: { page },
  });

export default getTvSimilarAPI;
