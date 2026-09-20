import { Card, CardBody } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

import paths from "@/app/paths";
import { CommonCardType } from "@/types";
import { tmdbImage } from "@/utils";

interface MovieCardProps {
  data: CommonCardType;
  className?: string;
}

const MovieCard = ({ data, className = "" }: MovieCardProps) => {
  const width = 216;
  const height = 324;
  const isTv = data.media_type === "tv";

  const title = isTv ? data.name : data.title;
  const year = (isTv ? data.first_air_date : data.release_date)?.split("-")[0];
  const posterSrc = tmdbImage(data.poster_path);

  const rating = data.vote_count > 0 ? data.vote_average.toFixed(1) : null;
  const genres = data.genre_names?.slice(0, 2) ?? [];

  return (
    <Card
      as={Link}
      href={isTv ? paths.series(data.id) : paths.movie(data.id)}
      radius="none"
      className={`group relative aspect-[2/3] h-full w-full overflow-hidden border-none ${className}`}
      shadow="md"
      isPressable
    >
      {/* HeroUI's CardBody ships overflow-y-auto; without overriding it the
          zoomed poster on hover creates scrollable overflow and can paint a
          scrollbar over the card. */}
      <CardBody className="overflow-hidden overflow-y-hidden p-0">
        {posterSrc && (
          <Image
            alt={title}
            className="h-full w-full transform object-cover transition-transform group-hover:scale-110"
            src={posterSrc}
            width={width}
            height={height}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/95" />
      </CardBody>

      {year && (
        <div className="absolute left-2 top-2 z-10 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white ring-1 ring-white/10 backdrop-blur-sm">
          {year}
        </div>
      )}

      <h3 className="absolute inset-x-0 bottom-9 line-clamp-2 px-3 text-left text-sm font-bold leading-tight text-white drop-shadow">
        {title}
      </h3>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/85 px-3 py-1.5 backdrop-blur-sm">
        {rating && (
          <div className="flex shrink-0 items-center gap-1 text-[11px] font-semibold leading-none text-white">
            <FaStar size={11} className="shrink-0 text-yellow-400" />
            {rating}/10
          </div>
        )}
        {rating && genres.length > 0 && (
          <div className="h-3 w-px shrink-0 bg-white/20" />
        )}
        {genres.length > 0 && (
          <div className="min-w-0 flex-1 truncate text-[11px] text-white/60">
            {genres.join(" · ")}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MovieCard;
