import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";

interface MoviesContainerProps {
  data: CommonCardType[];
  totalPages: number;
}

const MoviesContainer = ({ data, totalPages }: MoviesContainerProps) => {
  return (
    <div>
      <MovieListContainer
        data={data}
        title="Movies"
        pagination
        totalPages={totalPages}
      />
    </div>
  );
};

export default MoviesContainer;
