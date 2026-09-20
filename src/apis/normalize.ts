import { cache } from "react";

import {
  CommonCardType,
  MovieCardType,
  PersonCardType,
  RawCard,
  SearchResultType,
  TvCardType,
} from "@/types";
import getGenresAPI from "./common/get-genres";

/**
 * Movie/TV genre id -> name, merged from /genre/movie/list and /genre/tv/list.
 * `cache()` dedupes this within a single render pass; the weekly revalidate on
 * getGenresAPI means it costs nothing at steady state.
 */
export const getGenreMap = cache(async (): Promise<Map<number, string>> => {
  const [{ response: movieGenres }, { response: tvGenres }] =
    await Promise.all([getGenresAPI("movie"), getGenresAPI("tv")]);

  const map = new Map<number, string>();
  movieGenres?.genres.forEach((genre) => map.set(genre.id, genre.name));
  tvGenres?.genres.forEach((genre) => map.set(genre.id, genre.name));
  return map;
});

const toCard = (
  row: RawCard,
  mediaType: "movie" | "tv",
  genreMap: Map<number, string>,
): CommonCardType => {
  const genre_names = row.genre_ids
    ?.map((id) => genreMap.get(id))
    .filter((name): name is string => Boolean(name));

  if (mediaType === "movie") {
    const movie: MovieCardType = {
      ...row,
      media_type: "movie",
      title: row.title ?? "",
      original_title: row.original_title ?? "",
      release_date: row.release_date ?? null,
      video: row.video ?? false,
      genre_names,
    };
    return movie;
  }

  const tv: TvCardType = {
    ...row,
    media_type: "tv",
    name: row.name ?? "",
    original_name: row.original_name ?? "",
    first_air_date: row.first_air_date ?? null,
    origin_country: row.origin_country ?? null,
    genre_names,
  };
  return tv;
};

/**
 * Stamps media_type (when the endpoint doesn't already carry it) and resolves
 * genre_ids -> genre_names for a page of card rows. Pass `mediaType` for
 * single-media-type endpoints (popular/latest/similar/recommendations);
 * omit it for mixed endpoints (/trending/all) whose rows carry their own.
 */
export async function normalizeCards(
  results: RawCard[] | null | undefined,
  mediaType?: "movie" | "tv",
): Promise<CommonCardType[]> {
  if (!results?.length) return [];

  const genreMap = await getGenreMap();

  return results
    .filter(
      (row) =>
        Boolean(mediaType) ||
        row.media_type === "movie" ||
        row.media_type === "tv",
    )
    .map((row) => toCard(row, mediaType ?? (row.media_type as "movie" | "tv"), genreMap));
}

/** Same as normalizeCards, but keeps person rows (from /search/multi) as-is. */
export async function normalizeSearchResults(
  results: (RawCard | PersonCardType)[] | null | undefined,
): Promise<SearchResultType[]> {
  if (!results?.length) return [];

  const genreMap = await getGenreMap();

  return results.map((row) => {
    if (row.media_type === "person") return row;
    return toCard(row, row.media_type as "movie" | "tv", genreMap);
  });
}
