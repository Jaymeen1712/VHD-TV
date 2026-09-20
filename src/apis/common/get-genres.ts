import { API_ROUTES } from "@/utils/enum";
import { GenreListResponse } from "@/types";
import { REVALIDATE, tmdbRequest } from "../request";

const getGenresAPI = (media: "movie" | "tv") =>
  tmdbRequest<GenreListResponse>(API_ROUTES.GENRE_LIST, {
    routeParams: { media },
    revalidate: REVALIDATE.GENRES,
  });

export default getGenresAPI;
