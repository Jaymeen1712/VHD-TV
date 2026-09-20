import { getMovieDetailAPI } from "@/apis/movie";
import { normalizeCards } from "@/apis/normalize";
import MediaShowContainer from "@/components/media-show-container";
import SimilarContainer from "@/components/similar-container";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface MoviePageProps {
  params: Promise<{ movieId: string }>;
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { movieId } = await params;
  const { response } = await getMovieDetailAPI(movieId);

  if (!response) return {};

  return {
    title: `${response.title} | VHD TV`,
    description: response.overview,
  };
}

const MoviePage = async ({ params }: MoviePageProps) => {
  const { movieId } = await params;
  const { response } = await getMovieDetailAPI(movieId);

  if (!response) notFound();

  const recommended = await normalizeCards(
    response.recommendations?.results?.length
      ? response.recommendations.results
      : response.similar?.results,
    "movie",
  );

  return (
    <div className="animate-fade-in flex-1 flow-root bg-neutral-900">
      <MediaShowContainer data={response} />
      <SimilarContainer data={recommended} />
    </div>
  );
};

export default MoviePage;
