import paths from "@/app/paths";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";
import Rating from "../rating";

interface CarouselDetailsProps {
  chips?: string[];
  title: string;
  rating: number;
  description: string;
  detailId: number;
  type: string;
}

const CarouselDetails = ({
  chips,
  title,
  rating,
  description,
  detailId,
  type,
}: CarouselDetailsProps) => {
  const isTv = type === "tv";

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <div
        data-swiper-parallax-y="18"
        data-swiper-parallax-opacity="0"
        data-swiper-parallax-duration="300"
        className="flex items-center justify-start gap-2"
      >
        {chips?.map((chip) => (
          <Chip
            key={chip}
            className={`rounded-md bg-neutral-800 text-primary`}
            size="sm"
          >
            {chip}
          </Chip>
        ))}
      </div>
      <h2
        data-swiper-parallax-y="18"
        data-swiper-parallax-opacity="0"
        data-swiper-parallax-duration="360"
        className={
          "text-2xl font-bold tracking-wide text-white hover:text-primary sm:text-3xl lg:text-4xl"
        }
      >
        <Link href={isTv ? paths.series(detailId) : paths.movie(detailId)}>
          {title}
        </Link>
      </h2>
      <div
        data-swiper-parallax-y="18"
        data-swiper-parallax-opacity="0"
        data-swiper-parallax-duration="420"
        className="text-white"
      >
        <Rating stop={rating} />
      </div>
      <div
        data-swiper-parallax-y="18"
        data-swiper-parallax-opacity="0"
        data-swiper-parallax-duration="480"
        className="line-clamp-6 text-white"
      >
        {description}
      </div>
      <div
        data-swiper-parallax-y="18"
        data-swiper-parallax-opacity="0"
        data-swiper-parallax-duration="540"
      >
        <Button
          as={Link}
          href={paths.watch(isTv ? "tv" : "movie", detailId)}
          className={`group mt-2 h-12 w-full items-center justify-center rounded-full bg-primary/30 px-8 transition-transform hover:scale-110 hover:cursor-pointer hover:bg-primary sm:w-[12rem]`}
        >
          <FaPlay className={`text-primary group-hover:text-black`} size={15} />
          <span className={`ml-1 text-primary group-hover:text-black`}>
            Watch Trailer
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CarouselDetails;
