"use client";

import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleLeft, FaPlay } from "react-icons/fa";

import paths from "@/app/paths";
import Rating from "@/components/rating";
import { MovieDetailType, TvDetailType } from "@/types";
import { tmdbCompanyUrl, tmdbNetworkUrl, tmdbPersonUrl } from "@/utils";
import { getCertification } from "@/utils/certification";
import CastRow from "./cast-row";
import WatchProviders from "./watch-providers";

interface MediaDetailsContainerProps {
  data: MovieDetailType | TvDetailType;
  titleLogo?: string | null;
}

interface LinkListEntry {
  key: string | number;
  name: string;
  href: string;
  external?: boolean;
}

/** Renders a comma-separated list of links — shared by Director/Creator, Network and Production rows. */
const LinkList = ({ items }: { items: LinkListEntry[] }) => (
  <>
    {items.map((item, index) => (
      <React.Fragment key={item.key}>
        {index > 0 && ", "}
        {item.external ? (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            {item.name}
          </a>
        ) : (
          <Link href={item.href} className="underline hover:text-primary">
            {item.name}
          </Link>
        )}
      </React.Fragment>
    ))}
  </>
);

const MediaDetailsContainer = ({
  data,
  titleLogo,
}: MediaDetailsContainerProps) => {
  const isTv = data.media_type === "tv";
  const title = isTv ? data.name : data.title;
  const releaseDate = isTv ? data.first_air_date : data.release_date;
  const certification = getCertification(data);
  const director = !isTv
    ? data.credits?.crew.find((member) => member.job === "Director")
    : undefined;
  const creators = isTv ? data.created_by : undefined;
  const directorOrCreators: LinkListEntry[] = isTv
    ? (creators ?? []).map((creator) => ({
        key: creator.id,
        name: creator.name,
        href: tmdbPersonUrl(creator.id),
        external: true,
      }))
    : director
      ? [
          {
            key: director.id,
            name: director.name,
            href: tmdbPersonUrl(director.id),
            external: true,
          },
        ]
      : [];

  return (
    <div className="h-full w-full p-4 sm:p-8 lg:p-12">
      <Button
        as={Link}
        href={isTv ? paths.tvSeries() : paths.movies()}
        className={"mb-6 bg-white"}
        radius="full"
      >
        <FaAngleLeft className="mr-2" />
        <span className="text-base">{isTv ? "TV Series" : "Movies"}</span>
      </Button>

      {/* Title */}
      <div className="mb-2 flex flex-wrap items-center gap-3">
        {titleLogo ? (
          <>
            {/* The logo image is decorative — the real page <h1> stays in
                the DOM for accessibility/SEO but is visually hidden. */}
            <h1 className="sr-only">{title}</h1>
            <Image
              src={titleLogo}
              alt={title}
              width={300}
              height={100}
              className="h-auto max-h-[100px] w-auto max-w-[300px] object-contain"
            />
          </>
        ) : (
          <h1 className="text-4xl font-bold tracking-wide text-white">
            {title}
          </h1>
        )}
        {certification && (
          <Chip size="sm" className="rounded-md bg-white/10 text-white">
            {certification}
          </Chip>
        )}
      </div>
      {data.tagline && (
        <p className="mb-8 italic text-white/50">{data.tagline}</p>
      )}

      {/* Action  */}
      <div className="mb-8 flex space-x-8 divide-x-1">
        <Button
          as={Link}
          href={paths.watch(isTv ? "tv" : "movie", data.id)}
          className={"items-center justify-center bg-primary p-6"}
          radius="sm"
        >
          <FaPlay className={"mr-4"} size={15} />
          <span className="text-base">Watch Trailer</span>
        </Button>
        <div className="flex flex-col items-center justify-center space-y-2 pl-8">
          <Rating stop={data.vote_average} />
          <div className="">
            <span className="text-yellow-400">
              {data.vote_average.toFixed(1)}
            </span>
            <span className="text-white/50">
              {" "}
              /10 · {data.vote_count} voted
            </span>
          </div>
        </div>
      </div>

      {/* overview */}
      <div className="mb-8">
        <h2 className="mb-2 text-base text-white">Overview</h2>
        <p className="text-white">{data.overview}</p>
      </div>

      {data.credits?.cast.length ? (
        <div className="mb-8">
          <h2 className="mb-2 text-base text-white">Cast</h2>
          <CastRow cast={data.credits.cast} />
        </div>
      ) : null}

      <div className="space-y-2">
        {/* Director / Creator */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">
            {isTv ? "Creator" : "Director"}
          </span>
          <span className="text-white sm:col-span-5">
            {directorOrCreators.length ? (
              <LinkList items={directorOrCreators} />
            ) : (
              "—"
            )}
          </span>
        </div>

        {/* Genres */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">Genres</span>
          <span className="text-white sm:col-span-5">
            {data.genres?.length ? (
              <LinkList
                items={data.genres.map((genre) => ({
                  key: genre.id,
                  name: genre.name,
                  href: paths.search(genre.name),
                }))}
              />
            ) : (
              "—"
            )}
          </span>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">Duration</span>
          <span className="text-white sm:col-span-5">
            {isTv
              ? data.episode_run_time?.[0]
                ? `${data.episode_run_time[0]} min/ep`
                : "—"
              : data.runtime
                ? `${data.runtime} min`
                : "—"}
          </span>
        </div>

        {/* Seasons (TV only) */}
        {isTv && (
          <div className="grid grid-cols-1 sm:grid-cols-6">
            <span className="font-bold text-white sm:col-span-1">Seasons</span>
            <span className="text-white sm:col-span-5">
              {data.number_of_seasons} season
              {data.number_of_seasons === 1 ? "" : "s"},{" "}
              {data.number_of_episodes} episodes
            </span>
          </div>
        )}

        {/* Network (TV only) */}
        {isTv && data.networks?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-6">
            <span className="font-bold text-white sm:col-span-1">Network</span>
            <span className="text-white sm:col-span-5">
              <LinkList
                items={data.networks.map((network) => ({
                  key: network.id,
                  name: network.name,
                  href: tmdbNetworkUrl(network.id),
                  external: true,
                }))}
              />
            </span>
          </div>
        ) : null}

        {/* Country */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">Country</span>
          <span className="text-white sm:col-span-5">
            {data.production_countries?.length
              ? data.production_countries
                  .map((country) => country.name)
                  .join(", ")
              : "—"}
          </span>
        </div>

        {/* TMDB score */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">TMDB</span>
          <span className="text-white sm:col-span-5">
            {data.vote_average.toFixed(1)} / 10
          </span>
        </div>

        {/* IMDb */}
        {data.external_ids?.imdb_id && (
          <div className="grid grid-cols-1 sm:grid-cols-6">
            <span className="font-bold text-white sm:col-span-1">IMDb</span>
            <span className="text-white sm:col-span-5">
              <a
                href={`https://www.imdb.com/title/${data.external_ids.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-primary"
              >
                View on IMDb
              </a>
            </span>
          </div>
        )}

        {/* Release */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">Release</span>
          <span className="text-white sm:col-span-5">{releaseDate || "—"}</span>
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">Status</span>
          <span className="text-white sm:col-span-5">{data.status || "—"}</span>
        </div>

        {/* Production */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="font-bold text-white sm:col-span-1">Production</span>
          <span className="text-white sm:col-span-5">
            {data.production_companies?.length ? (
              <LinkList
                items={data.production_companies.map((company) => ({
                  key: company.id,
                  name: company.name,
                  href: tmdbCompanyUrl(company.id),
                  external: true,
                }))}
              />
            ) : (
              "—"
            )}
          </span>
        </div>
      </div>

      <WatchProviders data={data["watch/providers"]} />
    </div>
  );
};

export default MediaDetailsContainer;
