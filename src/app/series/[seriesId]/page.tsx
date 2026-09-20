import { getTvDetailAPI } from "@/apis/tv-series";
import { normalizeCards } from "@/apis/normalize";
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
  const { response } = await getTvDetailAPI(seriesId);

  if (!response) return {};

  return {
    title: `${response.name} | VHD TV`,
    description: response.overview,
  };
}

const SeriesPage = async ({ params }: SeriesPageProps) => {
  const { seriesId } = await params;
  const { response } = await getTvDetailAPI(seriesId);

  if (!response) notFound();

  const recommended = await normalizeCards(
    response.recommendations?.results?.length
      ? response.recommendations.results
      : response.similar?.results,
    "tv",
  );

  return (
    <div className="animate-fade-in flex-1 flow-root bg-neutral-900">
      <MediaShowContainer data={response} />
      <SimilarContainer data={recommended} />
    </div>
  );
};

export default SeriesPage;
