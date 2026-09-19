import { getSearchMediaAPI } from "@/apis/common";
import React from "react";
import SearchResultsContainer from "./components/search-results-container";

interface SearchPageProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { keyword } = await searchParams;

  const { response: searchMediaResponse, errors: searchMediaErrors } =
    keyword ? await getSearchMediaAPI(keyword) : { response: null, errors: null };

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      {!searchMediaErrors && keyword && (
        <SearchResultsContainer
          data={searchMediaResponse?.results}
          searchMedia={keyword}
        />
      )}
    </div>
  );
};

export default SearchPage;
