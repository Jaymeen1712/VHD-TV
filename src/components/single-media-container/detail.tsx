"use client";

import Rating from "@/components/rating";
import { CreditType, SingleMediaType } from "@/types";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaAngleLeft, FaPlay } from "react-icons/fa";

interface MovieShowContainerProps {
  data: SingleMediaType;
  credits: CreditType[];
  mediaType: string;
}

const MediaDetailsContainer = ({
  data,
  credits,
  mediaType,
}: MovieShowContainerProps) => {
  const isTv = Boolean(data.seasons);

  return (
    <div className="h-full w-full p-4 sm:p-8 lg:p-12">
      <Button
        as={Link}
        href={isTv ? "/tv-series" : "/movies"}
        className={"mb-6 bg-white"}
        radius="full"
      >
        <FaAngleLeft className="mr-2" />
        <span className="text-base">{mediaType}</span>
      </Button>

      {/* Title */}
      <h1 className={"mb-8 text-4xl font-bold tracking-wide text-white"}>
        {isTv ? data.name : data.title}
      </h1>

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
              {(data.vote_average / 2).toFixed(1)}
            </span>
            <span className="text-white/50">/ {data.vote_count} voted</span>
          </div>
        </div>
      </div>

      {/* overview */}
      <div className="mb-8">
        <h1 className="mb-2 text-base text-white">Overview</h1>
        <p className="text-white">{data.overview}</p>
      </div>

      {/* description */}

      <div className="space-y-2">
        {/* casts */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Casts</span>
          <span className="sm:col-span-5 text-white">
            {credits
              .slice(0, 5)
              .map((subCredit) => subCredit.name)
              .join(", ")}
          </span>
        </div>

        {/* Genres */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Genres</span>
          <span className="sm:col-span-5 text-white">
            {data.genres?.map((subGenre) => subGenre.name).join(", ")}
          </span>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Duration</span>
          <span className="sm:col-span-5 text-white">
            {isTv
              ? data.episode_run_time?.[0]
                ? `${data.episode_run_time[0]} min/ep`
                : "N/A"
              : `${data.runtime} min`}
          </span>
        </div>

        {/* Country */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Country</span>
          <span className="sm:col-span-5 text-white">
            {data.production_countries
              ?.map((country) => country.name)
              .join(", ")}
          </span>
        </div>

        {/* IMDb */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">IMDb</span>
          <span className="sm:col-span-5 text-white">
            {data.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Release */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Release</span>
          <span className="sm:col-span-5 text-white">
            {isTv ? data.first_air_date : data.release_date}
          </span>
        </div>

        {/* Production */}
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <span className="sm:col-span-1 font-bold text-white">Production</span>
          <span className="sm:col-span-5 text-white">
            {data.production_companies
              ?.map((company) => company.name)
              .join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailsContainer;
