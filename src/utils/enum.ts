const TIME_WINDOW = "week";

const COMMON_API = {
  ALL_TRENDING: `/trending/all/${TIME_WINDOW}`,
  MEDIA_VIDEOS: "/:media/:mediaId/videos",
  MEDIA_DETAILS: "/:media/:mediaId",
  SEARCH_MEDIA: "/search/multi",
  GENRE_LIST: "/genre/:media/list",
};

const MOVIE_API = {
  MOVIE_TRENDING: `/trending/movie/${TIME_WINDOW}`,
  MOVIE_POPULAR: "/movie/popular",
  MOVIE_LATEST: "/movie/now_playing",
  MOVIE_SINGLE: "/movie/:movieId",
};

const TV_API = {
  TV_TRENDING: `/trending/tv/${TIME_WINDOW}`,
  TV_POPULAR: "/tv/popular",
  TV_LATEST: "/tv/on_the_air",
  TV_SINGLE: "/tv/:tvId",
};

export const API_ROUTES = {
  ...COMMON_API,
  ...MOVIE_API,
  ...TV_API,
};
