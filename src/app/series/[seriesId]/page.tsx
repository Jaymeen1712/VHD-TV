import {
  getTvCreditsAPI,
  getTvSimilarAPI,
  getTvSingleAPI,
} from "@/apis/tv-series";
import MediaShowContainer from "@/components/media-show-container";
import SimilarContainer from "@/components/similar-container";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface SeriesPageProps {
  params: Promise<{ seriesId: string }>;
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { seriesId } = await params;
  const { response } = await getTvSingleAPI(seriesId);

  if (!response) return {};

  return {
    title: `${response.name} | VHD TV`,
    description: response.overview,
  };
}

const SeriesPage = async ({ params }: SeriesPageProps) => {
  const { seriesId } = await params;

  const [
    { response: seriesSingleResponse, errors: seriesSingleErrors },
    {
      response: seriesSingleCreditsResponse,
      errors: seriesSingleCreditsErrors,
    },
    { response: seriesSimilarResponse, errors: seriesSimilarErrors },
  ] = await Promise.all([
    getTvSingleAPI(seriesId),
    getTvCreditsAPI(seriesId),
    getTvSimilarAPI(seriesId),
  ]);

  if (!seriesSingleResponse) notFound();

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      {!seriesSingleErrors && !seriesSingleCreditsErrors && (
        <MediaShowContainer
          data={seriesSingleResponse}
          credits={seriesSingleCreditsResponse?.cast ?? []}
          type="TV Series"
        />
      )}
      {!seriesSimilarErrors && (
        <SimilarContainer data={seriesSimilarResponse?.results} />
      )}
    </div>
  );
};

export default SeriesPage;
