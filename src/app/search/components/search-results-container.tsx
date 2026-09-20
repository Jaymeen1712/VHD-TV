import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType, SearchResultType } from "@/types";

interface SearchResultsContainerProps {
  data: SearchResultType[] | undefined;
  searchMedia: string;
}

const SearchResultsContainer = ({
  data,
  searchMedia,
}: SearchResultsContainerProps) => {
  // MovieCard has no way to render a person (no poster, no watch/detail
  // destination), so the full results grid keeps only movie/TV rows —
  // the search dropdown (search-list.tsx) is where people are surfaced.
  const mediaResults = data?.filter(
    (result): result is CommonCardType => result.media_type !== "person",
  );

  return (
    <div>
      {mediaResults && (
        <MovieListContainer
          data={mediaResults}
          title={`Search results for: "${searchMedia}"`}
        />
      )}
    </div>
  );
};

export default SearchResultsContainer;
