import { Card, CardBody, CardFooter, CardHeader, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import paths from "@/app/paths";
import { CommonCardType } from "@/types";
import { isTvCard, tmdbImage } from "@/utils";

interface MovieCardProps {
  data: CommonCardType;
  className?: string;
}

const MovieCard = ({ data, className = "" }: MovieCardProps) => {
  const width = 216;
  const height = 324;
  const isTv = isTvCard(data);

  const chips: string[] = ["HD"];
  if (data.media_type) {
    chips.push(isTv ? "TV Series" : "Movie");
  }

  const year = (isTv ? data.first_air_date : data.release_date)?.split(
    "-",
  )[0];
  if (year) chips.push(year);

  const title = data.title || data.name || "Title";
  const posterSrc = tmdbImage(data.poster_path);

  return (
    <Card
      as={Link}
      href={isTv ? paths.series(data.id) : paths.movie(data.id)}
      radius="none"
      className={`group relative aspect-[2/3] h-full w-full border-none ${className}`}
      shadow="md"
      isPressable
    >
      <CardHeader className="absolute left-2 top-1 z-10">
        <h1 className="text-xl font-bold text-white drop-shadow-xl">HD</h1>
      </CardHeader>
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
          <div className="mb-2 flex items-center justify-start space-x-2">
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
