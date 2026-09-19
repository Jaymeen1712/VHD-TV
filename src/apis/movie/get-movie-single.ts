import { API_ROUTES } from "@/utils/enum";
import { SingleMediaType } from "@/types";
import { tmdbRequest } from "../request";

const getMovieSingleAPI = (movieId: string) =>
  tmdbRequest<SingleMediaType>(`${API_ROUTES.MOVIE_SINGLE}/${movieId}`);

export default getMovieSingleAPI;
