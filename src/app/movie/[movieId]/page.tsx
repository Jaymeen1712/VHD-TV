import { getMovieDetailAPI } from "@/apis/movie";
import { normalizeCards } from "@/apis/normalize";
import paths from "@/app/paths";
import JsonLd from "@/components/json-ld";
import MediaShowContainer from "@/components/media-show-container";
import SimilarContainer from "@/components/similar-container";
import { SITE_URL, tmdbImage } from "@/utils";
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

  const description =
    response.overview ||
    `Watch ${response.title} on VHD TV — stream trailers, cast, and more.`;
  const image = tmdbImage(response.backdrop_path, "original") ??
    tmdbImage(response.poster_path, "w780");
  const canonical = paths.movie(movieId);

  return {
    title: response.title,
    description,
    keywords: response.genres?.map((genre) => genre.name),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "video.movie",
      title: response.title,
      description,
      url: canonical,
      images: image ? [image] : undefined,
      releaseDate: response.release_date || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: response.title,
      description,
      images: image ? [image] : undefined,
    },
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

  const director = response.credits?.crew?.find(
    (member) => member.job === "Director",
  );

  const movieJsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: response.title,
    image: tmdbImage(response.poster_path, "w780") ?? undefined,
    description: response.overview || undefined,
    datePublished: response.release_date || undefined,
    genre: response.genres?.map((genre) => genre.name),
    duration: response.runtime ? `PT${response.runtime}M` : undefined,
    director: director
      ? { "@type": "Person", name: director.name }
      : undefined,
    actor: response.credits?.cast
      ?.slice(0, 10)
      .map((member) => ({ "@type": "Person", name: member.name })),
    aggregateRating:
      response.vote_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: response.vote_average,
            ratingCount: response.vote_count,
            bestRating: 10,
            worstRating: 0,
          }
        : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Movies",
        item: `${SITE_URL}${paths.movies()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: response.title,
        item: `${SITE_URL}${paths.movie(movieId)}`,
      },
    ],
  };

  return (
    <div className="animate-fade-in flex-1 flow-root bg-neutral-900">
      <JsonLd data={movieJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <MediaShowContainer data={response} />
      <SimilarContainer data={recommended} />
    </div>
  );
};

export default MoviePage;
