import { getMoviesPopularAPI } from "@/apis/movie";
import paths from "@/app/paths";
import { Metadata } from "next";
import React from "react";
import MoviesContainer from "./components/movies-container";

interface MoviesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: MoviesPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const canonical =
    currentPage > 1 ? `${paths.movies()}?page=${currentPage}` : paths.movies();

  return {
    title: currentPage > 1 ? `Movies — Page ${currentPage}` : "Movies",
    description:
      "Browse popular movies streaming now, with genres, ratings, and cast details.",
    alternates: {
      canonical,
    },
  };
}

const MoviesPage = async ({ searchParams }: MoviesPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { response, errors } = await getMoviesPopularAPI(currentPage);

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      <h1 className="sr-only">Movies</h1>
      <MoviesContainer
        data={!errors && response ? response.results : []}
        totalPages={response?.total_pages ?? 1}
      />
    </div>
  );
};

export default MoviesPage;
