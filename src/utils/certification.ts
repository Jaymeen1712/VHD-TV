import { MovieDetailType, TvDetailType } from "@/types";
import { DEFAULT_REGION } from "@/utils";

/**
 * The US content rating for a movie (from release_dates) or TV show (from
 * content_ratings) — e.g. "R", "TV-MA". Returns null when TMDB has none on
 * file, which the caller should render as an omitted badge, not a fallback.
 */
export function getCertification(
  data: MovieDetailType | TvDetailType,
): string | null {
  if (data.media_type === "movie") {
    const entry = data.release_dates?.results.find(
      (result) => result.iso_3166_1 === DEFAULT_REGION,
    );
    const certification = entry?.release_dates.find(
      (release) => release.certification,
    )?.certification;
    return certification || null;
  }

  const entry = data.content_ratings?.results.find(
    (result) => result.iso_3166_1 === DEFAULT_REGION,
  );
  return entry?.rating || null;
}
