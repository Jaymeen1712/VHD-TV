import { API_ROUTES } from "@/utils/enum";
import { CommonCardType, TmdbPaginatedResponse } from "@/types";
import { tmdbRequest } from "../request";

const getMoviesPopularAPI = (page: number = 1) =>
  tmdbRequest<TmdbPaginatedResponse<CommonCardType>>(API_ROUTES.MOVIE_POPULAR, {
    params: { page },
  });

export default getMoviesPopularAPI;
