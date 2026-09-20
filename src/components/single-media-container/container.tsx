import { tmdbImage } from "@/utils";
import { getCertification } from "@/utils/certification";
import Image from "next/image";
import React from "react";
import MediaDetailsContainer from "./detail";
import { SingleMediaType } from "@/types";

interface SingleMediaContainerProps {
  data: SingleMediaType | null;
  titleLogo?: string | null;
}

const SingleMediaContainer = ({ data, titleLogo }: SingleMediaContainerProps) => {
  const posterSrc = data ? tmdbImage(data.poster_path, "original") : null;
  const title = data ? (data.media_type === "tv" ? data.name : data.title) : "";
  const certification = data ? getCertification(data) : null;

  return (
    <div className="page-shell w-full">
      <div className="relative mx-auto flex flex-col items-center gap-6 pb-20 pt-12 lg:flex-row lg:items-start lg:gap-0 lg:pt-16">
        {data && (
          <div className="relative z-10 w-[200px] shrink-0 self-start overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 sm:w-[240px] lg:-mr-20 lg:w-[260px] lg:translate-y-10">
            <div className="relative aspect-[2/3] bg-neutral-800">
              {certification && (
                <div className="absolute left-3 top-2 z-10 rounded bg-black/60 px-2 py-0.5 text-sm font-bold text-white drop-shadow-xl">
                  {certification}
                </div>
              )}
              {posterSrc && (
                <Image
                  src={posterSrc}
                  alt={title}
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
          {data && <MediaDetailsContainer data={data} titleLogo={titleLogo} />}
        </div>
      </div>
    </div>
  );
};

export default SingleMediaContainer;
