import { getMoviesPopularAPI } from "@/apis/movie";
import React from "react";
import MoviesContainer from "./components/movies-container";

interface MoviesPageProps {
  searchParams: Promise<{ page?: string }>;
}

const MoviesPage = async ({ searchParams }: MoviesPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { response, errors } = await getMoviesPopularAPI(currentPage);

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      <MoviesContainer
        data={!errors && response ? response.results : []}
        totalPages={response?.total_pages ?? 1}
      />
    </div>
  );
};

export default MoviesPage;
