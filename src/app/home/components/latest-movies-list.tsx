import { getMoviesLatestAPI } from "@/apis/movie";
import paths from "@/app/paths";
import MovieListContainer from "@/components/movie-list/container";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

const LatestMoviesList = async () => {
  const { response, errors } = await getMoviesLatestAPI();
  const latestMovies = !errors && response ? response.results.slice(0, 20) : [];

  return (
    <MovieListContainer
      title="Latest Movies"
      headerRight={
        <Link
          href={paths.movies()}
          className="group flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-primary"
          aria-label="View all movies"
        >
          View all
          <FaAngleRight size={14} />
        </Link>
      }
      data={latestMovies}
      type="carousel"
    />
  );
};

export default LatestMoviesList;
