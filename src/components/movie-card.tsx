import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
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
  const year = (isTv ? data.first_air_date : data.release_date)?.split(
    "-",
  )[0];
  const posterSrc = tmdbImage(data.poster_path);

  const rating = data.vote_count > 0 ? data.vote_average.toFixed(1) : null;
  const chips: string[] = [];
  data.genre_names?.slice(0, 2).forEach((genre) => chips.push(genre));
  if (year) chips.push(year);

  return (
    <Card
      as={Link}
      href={isTv ? paths.series(data.id) : paths.movie(data.id)}
      radius="none"
      className={`group relative aspect-[2/3] h-full w-full border-none ${className}`}
      shadow="md"
      isPressable
    >
      <CardBody className="overflow-hidden p-0">
        {posterSrc && (
          <Image
            alt={title}
            className="h-full w-full transform object-cover transition-transform group-hover:scale-110"
            src={posterSrc}
            width={width}
            height={height}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-neutral-800" />
      </CardBody>
      <CardFooter className="delay-20 absolute inset-x-3 bottom-3 w-auto justify-between rounded-lg py-2 transition ease-in-out group-hover:-translate-y-1 group-hover:bg-white/10 group-hover:backdrop-blur-sm">
        <div className="grid-rows-2">
          <div className="mb-2 flex flex-wrap items-center justify-start gap-2">
            {rating && (
              <Chip
                className="rounded-md bg-primary/30 p-0 text-primary"
                size="sm"
                startContent={<FaStar size={10} className="ml-2" />}
              >
                {rating}
              </Chip>
            )}
            {chips.map((chip) => (
              <Chip
                key={chip}
                className={`rounded-md bg-primary/30 p-0 text-primary`}
                size="sm"
              >
                {chip}
              </Chip>
            ))}
          </div>
          <h1 className="text-left font-bold text-white">{title}</h1>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
