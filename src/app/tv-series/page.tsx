import { getTvPopularAPI } from "@/apis/tv-series";
import paths from "@/app/paths";
import { Metadata } from "next";
import React from "react";
import TvSeriesContainer from "./components/tv-series-container";

interface TvSeriesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: TvSeriesPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const canonical =
    currentPage > 1
      ? `${paths.tvSeries()}?page=${currentPage}`
      : paths.tvSeries();

  return {
    title: currentPage > 1 ? `TV Series — Page ${currentPage}` : "TV Series",
    description:
      "Browse popular TV series streaming now, with genres, ratings, and cast details.",
    alternates: {
      canonical,
    },
  };
}

const TvSeriesPage = async ({ searchParams }: TvSeriesPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { response, errors } = await getTvPopularAPI(currentPage);

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      <h1 className="sr-only">TV Series</h1>
      <TvSeriesContainer
        data={!errors && response ? response.results : []}
        totalPages={response?.total_pages ?? 1}
      />
    </div>
  );
};

export default TvSeriesPage;
