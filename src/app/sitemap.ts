import { getMoviesPopularAPI, getMoviesTrendingAPI } from "@/apis/movie";
import { getTvPopularAPI, getTvTrendingAPI } from "@/apis/tv-series";
import paths from "@/app/paths";
import { absoluteUrl } from "@/utils";
import { MetadataRoute } from "next";

const staticEntries: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl(paths.home()),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: absoluteUrl(paths.movies()),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: absoluteUrl(paths.tvSeries()),
    changeFrequency: "daily",
    priority: 0.8,
  },
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [movies, trendingMovies, series, trendingSeries] = await Promise.all([
    getMoviesPopularAPI(),
    getMoviesTrendingAPI(),
    getTvPopularAPI(),
    getTvTrendingAPI(),
  ]);

  const movieIds = new Set<number>();
  const movieEntries: MetadataRoute.Sitemap = [];
  for (const list of [movies, trendingMovies]) {
    if (list.errors || !list.response) continue;
    for (const movie of list.response.results) {
      if (movieIds.has(movie.id)) continue;
      movieIds.add(movie.id);
      movieEntries.push({
        url: absoluteUrl(paths.movie(movie.id)),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  const seriesIds = new Set<number>();
  const seriesEntries: MetadataRoute.Sitemap = [];
  for (const list of [series, trendingSeries]) {
    if (list.errors || !list.response) continue;
    for (const show of list.response.results) {
      if (seriesIds.has(show.id)) continue;
      seriesIds.add(show.id);
      seriesEntries.push({
        url: absoluteUrl(paths.series(show.id)),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return [...staticEntries, ...movieEntries, ...seriesEntries];
};

export default sitemap;
