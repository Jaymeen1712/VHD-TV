import { tmdbImage } from "@/utils";
import Image from "next/image";
import React from "react";
import MediaDetailsContainer from "./detail";
import { CreditType, SingleMediaType } from "@/types";

interface SingleMediaContainerProps {
  data: SingleMediaType | null;
  credits: CreditType[] | null;
  type: string;
}

const SingleMediaContainer = ({ data, credits, type }: SingleMediaContainerProps) => {
  const posterSrc = data ? tmdbImage(data.poster_path, "original") : null;

  return (
    <div className="page-shell w-full">
      <div className="relative mx-auto flex flex-col items-center gap-6 pb-20 pt-12 lg:flex-row lg:items-start lg:gap-0 lg:pt-16">
        {data && (
          <div className="relative z-10 w-[200px] shrink-0 self-start overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 sm:w-[240px] lg:-mr-20 lg:w-[260px] lg:translate-y-10">
            <div className="relative aspect-[2/3] bg-neutral-800">
              <div className="absolute left-3 top-2 z-10 text-xl font-bold text-white drop-shadow-xl">
                HD
              </div>
              {posterSrc && (
                <Image
                  src={posterSrc}
                  alt={data.title || data.name}
                  fill
                  sizes="260px"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        )}
        <div className="min-w-0 flex-1 rounded-2xl bg-white/5 backdrop-blur-xl backdrop-brightness-125 lg:pl-28">
          {data && credits && (
            <MediaDetailsContainer
              data={data}
              credits={credits}
              mediaType={type}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMediaContainer;
