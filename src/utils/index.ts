export const dashboardMenuItems = [
  {
    key: "home",
    name: "Home",
    link: "/home",
  },
  {
    key: "movies",
    name: "Movies",
    link: "/movies",
  },
  {
    key: "tv-series",
    name: "Tv series",
    link: "/tv-series",
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

export function isTvCard(data: {
  media_type?: string;
  first_air_date?: string;
}) {
  return (
    data.media_type === "tv" ||
    (!data.media_type && Boolean(data.first_air_date))
  );
}

export function capitalizeFirstLetter(inputString: string | undefined | null) {
  if (!inputString) return "";
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const HEADER_TRANSPARENT = ["movie", "home", "series"];
