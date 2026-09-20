import paths from "@/app/paths";
import { SearchResultType } from "@/types";
import { capitalizeFirstLetter, tmdbImage } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

interface SearchListProps {
  data: SearchResultType;
}

const roundDot = <span className="mx-1 text-white/50">•</span>;

const SearchList = ({ data }: SearchListProps) => {
  const isPerson = data.media_type === "person";
  const title = data.media_type === "movie" ? data.title : data.name;
  const imageSrc = tmdbImage(
    isPerson ? data.profile_path : data.poster_path,
    "w200",
  );

  const content = (
    <div className="group flex items-center gap-3 rounded-lg p-2 text-white transition-colors hover:cursor-pointer hover:bg-white/5">
      {imageSrc && (
        <Image
          alt={title}
          src={imageSrc}
          width={40}
          height={60}
          className="h-[60px] w-[40px] shrink-0 rounded object-cover"
        />
      )}
      <div>
        <h3 className="text-sm group-hover:text-primary">
          {capitalizeFirstLetter(title)}
        </h3>
        {!isPerson && (
          <span className="flex items-center text-xs">
            {capitalizeFirstLetter(data.media_type)}
            {roundDot}
            <FaStar size={10} className="mr-2 text-white" />
            {data.vote_average.toFixed(1)}
            {roundDot}
            {(data.media_type === "movie"
              ? data.release_date
              : data.first_air_date
            )?.split("-")[0]}
            {data.genre_names?.[0] && (
              <>
                {roundDot}
                {data.genre_names[0]}
              </>
            )}
          </span>
        )}
        {isPerson && (
          <span className="flex items-center text-xs">
            {capitalizeFirstLetter(data.known_for_department)}
            {roundDot}
          </span>
        )}
      </div>
    </div>
  );

  if (isPerson) return content;

  return (
    <Link
      href={
        data.media_type === "movie"
          ? paths.movie(data.id)
          : paths.series(data.id)
      }
    >
      {content}
    </Link>
  );
};

export default SearchList;
