export type CommonCardType = MovieTrendingType &
  TvTrendingType &
  OnTheAirTVType &
  MovieNowPlayingType &
  ProfileCardType;

export interface MovieTrendingType {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids?: number[] | null;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvTrendingType {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids?: number[] | null;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[] | null;
}

export interface OnTheAirTVType {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[] | null;
  id: number;
  origin_country?: string[] | null;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieNowPlayingType {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[] | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SingleMediaType {
  adult: boolean;
  backdrop_path: string;
  created_by?: CreatedByEntity[] | null;
  episode_run_time?: number[] | null;
  first_air_date: string;
  genres?: GenresEntity[] | null;
  homepage: string;
  id: number;
  in_production: boolean;
  languages?: string[] | null;
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air?: null;
  networks?: NetworksEntity[] | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country?: string[] | null;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: ProductionCompaniesEntity[] | null;
  production_countries?: ProductionCountriesEntity[] | null;
  seasons?: SeasonsEntity[] | null;
  spoken_languages?: SpokenLanguagesEntity[] | null;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
}
export interface CreatedByEntity {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
export interface GenresEntity {
  id: number;
  name: string;
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
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}
export interface NetworksEntity {
  id: number;
  logo_path: string;
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
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
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
  poster_path: string;
  backdrop_path: string;
}

export interface ProfileCardType {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for?: KnownForEntity[] | null;
}
export interface KnownForEntity {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids?: number[] | null;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CreditType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

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

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface CreditsResponse {
  id: number;
  cast: CreditType[];
  crew: CreditType[];
}

export interface MediaVideosResponse {
  id: number;
  results: MediaVideoType[];
}
