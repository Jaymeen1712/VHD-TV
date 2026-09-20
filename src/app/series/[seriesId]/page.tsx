import { getTvDetailAPI } from "@/apis/tv-series";
import { normalizeCards } from "@/apis/normalize";
import paths from "@/app/paths";
import JsonLd from "@/components/json-ld";
import MediaShowContainer from "@/components/media-show-container";
import SimilarContainer from "@/components/similar-container";
import { SITE_URL, tmdbImage } from "@/utils";
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

  const description =
    response.overview ||
    `Watch ${response.name} on VHD TV — stream trailers, cast, and more.`;
  const image = tmdbImage(response.backdrop_path, "original") ??
    tmdbImage(response.poster_path, "w780");
  const canonical = paths.series(seriesId);

  return {
    title: response.name,
    description,
    keywords: response.genres?.map((genre) => genre.name),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "video.tv_show",
      title: response.name,
      description,
      url: canonical,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: response.name,
      description,
      images: image ? [image] : undefined,
    },
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

  const seriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: response.name,
    image: tmdbImage(response.poster_path, "w780") ?? undefined,
    description: response.overview || undefined,
    datePublished: response.first_air_date || undefined,
    genre: response.genres?.map((genre) => genre.name),
    numberOfSeasons: response.number_of_seasons || undefined,
    numberOfEpisodes: response.number_of_episodes || undefined,
    creator: response.created_by
      ?.filter((creator) => creator.name)
      .map((creator) => ({ "@type": "Person", name: creator.name })),
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
        name: "TV Series",
        item: `${SITE_URL}${paths.tvSeries()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: response.name,
        item: `${SITE_URL}${paths.series(seriesId)}`,
      },
    ],
  };

  return (
    <div className="animate-fade-in flex-1 flow-root bg-neutral-900">
      <JsonLd data={seriesJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <MediaShowContainer data={response} />
      <SimilarContainer data={recommended} />
    </div>
  );
};

export default SeriesPage;
