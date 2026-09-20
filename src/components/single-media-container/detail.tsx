"use client";

import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleLeft, FaPlay } from "react-icons/fa";

import paths from "@/app/paths";
import Rating from "@/components/rating";
import { MovieDetailType, TvDetailType } from "@/types";
import { getCertification } from "@/utils/certification";
import CastRow from "./cast-row";
import WatchProviders from "./watch-providers";

interface MediaDetailsContainerProps {
  data: MovieDetailType | TvDetailType;
  titleLogo?: string | null;
}

const MediaDetailsContainer = ({ data, titleLogo }: MediaDetailsContainerProps) => {
  const isTv = data.media_type === "tv";
  const title = isTv ? data.name : data.title;
  const releaseDate = isTv ? data.first_air_date : data.release_date;
  const certification = getCertification(data);
  const director = !isTv
    ? data.credits?.crew.find((member) => member.job === "Director")?.name
    : undefined;
  const creators = isTv
    ? data.created_by?.map((creator) => creator.name).join(", ")
    : undefined;

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
          <Image
            src={titleLogo}
            alt={title}
            width={300}
            height={100}
            className="h-auto max-h-[100px] w-auto max-w-[300px] object-contain"
          />
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
          href={`/watch/${isTv ? "tv" : "movie"}/${data.id}`}
          className={"items-center justify-center bg-primary p-6"}
          radius="sm"
        >
          <FaPlay className={"mr-4"} size={15} />
          <span className="text-base">Watch now</span>
        </Button>
        <div className="flex flex-col items-center justify-center space-y-2 pl-8">
          <Rating stop={data.vote_average} />
          <div className="">
            <span className="text-yellow-400">
              {data.vote_average.toFixed(1)}
            </span>
            <span className="text-white/50"> /10 · {data.vote_count} voted</span>
          </div>
        </div>
      </div>

      {/* overview */}
      <div className="mb-8">
        <h1 className="mb-2 text-base text-white">Overview</h1>
        <p className="text-white">{data.overview}</p>
      </div>

      {data.credits?.cast.length ? (
        <div className="mb-8">
          <h1 className="mb-2 text-base text-white">Cast</h1>
          <CastRow cast={data.credits.cast} />
        </div>
      ) : null}

      <div className="space-y-2">
        {/* Director / Creator */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">
            {isTv ? "Creator" : "Director"}
          </span>
          <span className="sm:col-span-5 text-white">
            {(isTv ? creators : director) || "—"}
          </span>
        </div>

        {/* Genres */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Genres</span>
          <span className="sm:col-span-5 text-white">
            {data.genres?.length
              ? data.genres.map((genre) => genre.name).join(", ")
              : "—"}
          </span>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Duration</span>
          <span className="sm:col-span-5 text-white">
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
            <span className="sm:col-span-1 font-bold text-white">Seasons</span>
            <span className="sm:col-span-5 text-white">
              {data.number_of_seasons} season
              {data.number_of_seasons === 1 ? "" : "s"}, {data.number_of_episodes}{" "}
              episodes
            </span>
          </div>
        )}

        {/* Network (TV only) */}
        {isTv && data.networks?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-6">
            <span className="sm:col-span-1 font-bold text-white">Network</span>
            <span className="sm:col-span-5 text-white">
              {data.networks.map((network) => network.name).join(", ")}
            </span>
          </div>
        ) : null}

        {/* Country */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Country</span>
          <span className="sm:col-span-5 text-white">
            {data.production_countries?.length
              ? data.production_countries.map((country) => country.name).join(", ")
              : "—"}
          </span>
        </div>

        {/* TMDB score */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">TMDB</span>
          <span className="sm:col-span-5 text-white">
            {data.vote_average.toFixed(1)} / 10
          </span>
        </div>

        {/* IMDb */}
        {data.external_ids?.imdb_id && (
          <div className="grid grid-cols-1 sm:grid-cols-6">
            <span className="sm:col-span-1 font-bold text-white">IMDb</span>
            <span className="sm:col-span-5 text-white">
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
          <span className="sm:col-span-1 font-bold text-white">Release</span>
          <span className="sm:col-span-5 text-white">{releaseDate || "—"}</span>
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Status</span>
          <span className="sm:col-span-5 text-white">{data.status || "—"}</span>
        </div>

        {/* Production */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Production</span>
          <span className="sm:col-span-5 text-white">
            {data.production_companies?.length
              ? data.production_companies.map((company) => company.name).join(", ")
              : "—"}
          </span>
        </div>
      </div>

      <WatchProviders data={data["watch/providers"]} />
    </div>
  );
};

export default MediaDetailsContainer;
