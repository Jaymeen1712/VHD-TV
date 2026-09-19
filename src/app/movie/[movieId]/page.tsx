import {
  getMovieCreditsAPI,
  getMovieSingleAPI,
  getMoviesSimilarAPI,
} from "@/apis/movie";
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
  const { response } = await getMovieSingleAPI(movieId);

  if (!response) return {};

  return {
    title: `${response.title} | VHD TV`,
    description: response.overview,
  };
}

const MoviePage = async ({ params }: MoviePageProps) => {
  const { movieId } = await params;

  const [
    { response: movieSingleResponse, errors: movieSingleErrors },
    { response: movieSingleCreditsResponse, errors: movieSingleCreditsErrors },
    { response: moviesSimilarResponse, errors: moviesSimilarErrors },
  ] = await Promise.all([
    getMovieSingleAPI(movieId),
    getMovieCreditsAPI(movieId),
    getMoviesSimilarAPI(movieId),
  ]);

  if (!movieSingleResponse) notFound();

  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      {!movieSingleErrors && !movieSingleCreditsErrors && (
        <MediaShowContainer
          data={movieSingleResponse}
          credits={movieSingleCreditsResponse?.cast ?? []}
          type="Movies"
        />
      )}
      {!moviesSimilarErrors && (
        <SimilarContainer data={moviesSimilarResponse?.results} />
      )}
    </div>
  );
};

export default MoviePage;
