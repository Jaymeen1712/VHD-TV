import { getTvPopularAPI } from "@/apis/tv-series";
import React from "react";
import TvSeriesContainer from "./components/tv-series-container";

interface TvSeriesPageProps {
  searchParams: Promise<{ page?: string }>;
}

const TvSeriesPage = async ({ searchParams }: TvSeriesPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { response, errors } = await getTvPopularAPI(currentPage);

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      <TvSeriesContainer
        data={!errors && response ? response.results : []}
        totalPages={response?.total_pages ?? 1}
      />
    </div>
  );
};

export default TvSeriesPage;
