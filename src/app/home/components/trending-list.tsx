import { getMoviesTrendingAPI } from "@/apis/movie";
import { getTvTrendingAPI } from "@/apis/tv-series";
import TrendingListTabs from "./trending-list-tabs";

const TrendingList = async () => {
  const [
    { response: trendingMoviesResponse, errors: trendingMoviesErrors },
    { response: trendingTvResponse, errors: trendingTvErrors },
  ] = await Promise.all([getMoviesTrendingAPI(), getTvTrendingAPI()]);

  return (
    <TrendingListTabs
      movieData={
        !trendingMoviesErrors && trendingMoviesResponse
          ? trendingMoviesResponse.results
          : []
      }
      tvData={
        !trendingTvErrors && trendingTvResponse ? trendingTvResponse.results : []
      }
    />
  );
};

export default TrendingList;
