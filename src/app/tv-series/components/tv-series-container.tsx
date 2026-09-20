import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";

interface TvSeriesContainerProps {
  data: CommonCardType[];
  totalPages: number;
}

const TvSeriesContainer = ({ data, totalPages }: TvSeriesContainerProps) => {
  return (
    <div>
      <MovieListContainer
        data={data}
        title="TV Series"
        pagination
        totalPages={totalPages}
      />
    </div>
  );
};

export default TvSeriesContainer;
