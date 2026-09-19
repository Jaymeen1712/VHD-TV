import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";

interface SimilarContainerProps {
  data: CommonCardType[] | undefined;
}

const SimilarContainer = ({ data }: SimilarContainerProps) => {
  return (
    <MovieListContainer data={data} title="You may also like" type="carousel" />
  );
};

export default SimilarContainer;
