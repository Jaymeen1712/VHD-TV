import { API_ROUTES } from "@/utils/enum";
import { CreditsResponse } from "@/types";
import { tmdbRequest } from "../request";

const getMovieCreditsAPI = (movieId: string) =>
  tmdbRequest<CreditsResponse>(API_ROUTES.MOVIE_CREDITS, {
    routeParams: { movieId },
  });

export default getMovieCreditsAPI;
