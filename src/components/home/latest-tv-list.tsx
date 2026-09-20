import { getTvLatestAPI } from "@/apis/tv-series";
import paths from "@/app/paths";
import MovieListContainer from "@/components/movie-list/container";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

const LatestTvList = async () => {
  const { response, errors } = await getTvLatestAPI();
  const latestTv = !errors && response ? response.results.slice(0, 20) : [];

  return (
    <MovieListContainer
      title="Latest TV Series"
      headerRight={
        <Link
          href={paths.tvSeries()}
          className="group flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-primary"
          aria-label="View all TV series"
        >
          View all
          <FaAngleRight size={14} />
        </Link>
      }
      data={latestTv}
      type="carousel"
    />
  );
};

export default LatestTvList;
