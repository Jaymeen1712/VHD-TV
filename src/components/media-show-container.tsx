import GradientImageContainer from "@/components/gradient-image-container";
import { SingleMediaType } from "@/types";
import { tmdbImage } from "@/utils";
import React from "react";
import SingleMediaContainer from "@/components/single-media-container/container";

interface MediaShowContainerProps {
  data: SingleMediaType | null;
}

const MediaShowContainer = ({ data }: MediaShowContainerProps) => {
  const bestLogo = data?.images?.logos
    ?.filter((logo) => logo.iso_639_1 === "en")
    .sort((a, b) => b.vote_count - a.vote_count)[0];
  const titleLogo = bestLogo ? tmdbImage(bestLogo.file_path, "w500") : null;

  return (
    <div className="relative isolate -mt-(--header-h) overflow-hidden pt-(--header-h)">
      {data && <GradientImageContainer path={data.backdrop_path} />}
      <SingleMediaContainer data={data} titleLogo={titleLogo} />
    </div>
  );
};

export default MediaShowContainer;
