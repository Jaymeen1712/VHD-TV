import { getSearchMediaAPI } from "@/apis/common";
import { Metadata } from "next";
import React from "react";
import SearchResultsContainer from "./components/search-results-container";

interface SearchPageProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { keyword } = await searchParams;

  return {
    title: keyword ? `Search results for "${keyword}"` : "Search",
    description: keyword
      ? `Movies, TV series, and people matching "${keyword}" on VHD TV.`
      : "Search movies, TV series, and people on VHD TV.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { keyword } = await searchParams;

  const { response: searchMediaResponse, errors: searchMediaErrors } =
    keyword ? await getSearchMediaAPI(keyword) : { response: null, errors: null };

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      <h1 className="sr-only">
        {keyword ? `Search results for "${keyword}"` : "Search"}
      </h1>
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
