export const dashboardMenuItems = [
  {
    key: "home",
    name: "Home",
    link: "/home",
    activeSegments: ["home"],
  },
  {
    key: "movies",
    name: "Movies",
    link: "/movies",
    activeSegments: ["movies", "movie"],
  },
  {
    key: "tv-series",
    name: "Tv series",
    link: "/tv-series",
    activeSegments: ["tv-series", "series"],
  },
];

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function tmdbImage(
  path: string | null | undefined,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500",
) {
  return path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null;
}

export const YOUTUBE_VIDEO_BASE_URL = "https://www.youtube.com/watch?v="

/** ISO 3166-1 region used for language, certifications, and watch providers. */
export const DEFAULT_REGION = "US";

export function capitalizeFirstLetter(inputString: string | undefined | null) {
  if (!inputString) return "";
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
