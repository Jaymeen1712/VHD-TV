// ---------------------------------------------------------------------------
// Card shapes — trending/popular/latest/similar/search list rows.
// ---------------------------------------------------------------------------

export interface BaseCardType {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  genre_ids?: number[] | null;
  /** Resolved from genre_ids by normalizeCards(); absent on raw API rows. */
  genre_names?: string[];
}

export interface MovieCardType extends BaseCardType {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date?: string | null;
  video: boolean;
}

export interface TvCardType extends BaseCardType {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date?: string | null;
  origin_country?: string[] | null;
}

/** A movie or TV card, always with a stamped, non-optional media_type. */
export type CommonCardType = MovieCardType | TvCardType;

/**
 * Raw shape of a row as TMDB actually returns it from list endpoints
 * (popular/now_playing/on_the_air/trending/similar/recommendations).
 * `media_type` is only present on rows from /trending/all and /search/multi —
 * everywhere else it's stamped afterwards by normalizeCards().
 */
export interface RawCard extends BaseCardType {
  media_type?: "movie" | "tv";
  title?: string;
  original_title?: string;
  release_date?: string | null;
  video?: boolean;
  name?: string;
  original_name?: string;
  first_air_date?: string | null;
  origin_country?: string[] | null;
}

export interface PersonCardType {
  media_type: "person";
  id: number;
  adult: boolean;
  name: string;
  original_name: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string | null;
  known_for?: KnownForEntity[] | null;
}

export interface KnownForEntity {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

/** A /search/multi result row: movie, TV, or person. */
export type SearchResultType = CommonCardType | PersonCardType;

export interface GenresEntity {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: GenresEntity[];
}

// ---------------------------------------------------------------------------
// Credits (append_to_response=credits on both /movie/:id and /tv/:id)
// ---------------------------------------------------------------------------

interface CreditPersonBase {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

export interface CastCreditType extends CreditPersonBase {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewCreditType extends CreditPersonBase {
  department: string;
  job: string;
}

export interface CreditsResponse {
  id: number;
  cast: CastCreditType[];
  crew: CrewCreditType[];
}

// ---------------------------------------------------------------------------
// Videos (append_to_response=videos, and the standalone /:media/:id/videos)
// ---------------------------------------------------------------------------

export interface MediaVideoType {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MediaVideosResponse {
  id: number;
  results: MediaVideoType[];
}

// ---------------------------------------------------------------------------
// Images (append_to_response=images)
// ---------------------------------------------------------------------------

export interface ImageEntity {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImagesResponse {
  backdrops: ImageEntity[];
  posters: ImageEntity[];
  logos: ImageEntity[];
}

// ---------------------------------------------------------------------------
// Certifications (release_dates for movies, content_ratings for TV)
// ---------------------------------------------------------------------------

export interface ReleaseDateEntity {
  certification: string;
  iso_639_1: string;
  release_date: string;
  type: number;
  note?: string;
}

export interface ReleaseDatesResponse {
  results: { iso_3166_1: string; release_dates: ReleaseDateEntity[] }[];
}

export interface ContentRatingsResponse {
  results: { iso_3166_1: string; rating: string }[];
}

// ---------------------------------------------------------------------------
// External ids + watch providers
// ---------------------------------------------------------------------------

export interface ExternalIdsResponse {
  id: number;
  imdb_id: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
}

export interface WatchProviderEntity {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviderRegion {
  link: string;
  flatrate?: WatchProviderEntity[];
  rent?: WatchProviderEntity[];
  buy?: WatchProviderEntity[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, WatchProviderRegion>;
}

// ---------------------------------------------------------------------------
// Detail (/movie/:id, /tv/:id, each with append_to_response attached)
// ---------------------------------------------------------------------------

export interface CreatedByEntity {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface NetworksEntity {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCompaniesEntity {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}

export interface SeasonsEntity {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface SpokenLanguagesEntity {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface DetailBase {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  homepage: string;
  original_language: string;
  overview: string;
  popularity: number;
  genres?: GenresEntity[] | null;
  production_companies?: ProductionCompaniesEntity[] | null;
  production_countries?: ProductionCountriesEntity[] | null;
  spoken_languages?: SpokenLanguagesEntity[] | null;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;

  // Populated via append_to_response; all optional since the plain
  // /:media/:mediaId fetch (getMediaDetailsAPI) doesn't request them.
  credits?: CreditsResponse;
  videos?: MediaVideosResponse;
  images?: ImagesResponse;
  recommendations?: TmdbPaginatedResponse<RawCard>;
  similar?: TmdbPaginatedResponse<RawCard>;
  external_ids?: ExternalIdsResponse;
  "watch/providers"?: WatchProvidersResponse;
}

export interface MovieDetailType extends DetailBase {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date: string;
  runtime: number | null;
  budget: number;
  revenue: number;
  imdb_id: string | null;
  video: boolean;
  belongs_to_collection: BelongsToCollection | null;
  release_dates?: ReleaseDatesResponse;
}

export interface TvDetailType extends DetailBase {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  episode_run_time?: number[] | null;
  number_of_episodes: number;
  number_of_seasons: number;
  created_by?: CreatedByEntity[] | null;
  networks?: NetworksEntity[] | null;
  seasons?: SeasonsEntity[] | null;
  origin_country?: string[] | null;
  languages?: string[] | null;
  last_episode_to_air: LastEpisodeToAir | null;
  next_episode_to_air?: LastEpisodeToAir | null;
  type: string;
  content_ratings?: ContentRatingsResponse;
}

/** A full /movie/:id or /tv/:id detail payload, discriminated on media_type. */
export type SingleMediaType = MovieDetailType | TvDetailType;

// ---------------------------------------------------------------------------
// Pagination envelope
// ---------------------------------------------------------------------------

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  /** Present on /movie/now_playing. */
  dates?: { maximum: string; minimum: string };
}
