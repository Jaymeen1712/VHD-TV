import { API_ROUTES } from "@/utils/enum";
import { CommonCardType, TmdbPaginatedResponse } from "@/types";
import { tmdbRequest } from "../request";

const getMoviesSimilarAPI = (movieId: string, page: number = 1) =>
  tmdbRequest<TmdbPaginatedResponse<CommonCardType>>(API_ROUTES.MOVIE_SIMILAR, {
    routeParams: { movieId },
    params: { page },
  });

export default getMoviesSimilarAPI;
