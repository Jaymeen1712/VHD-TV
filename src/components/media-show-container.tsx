import GradientImageContainer from "@/components/gradient-image-container";
import { CreditType, SingleMediaType } from "@/types";
import React from "react";
import SingleMediaContainer from "@/components/single-media-container/container";

interface MediaShowContainerProps {
  data: SingleMediaType | null;
  credits: CreditType[] | null;
  type: string;
}

const MediaShowContainer = ({ data, credits, type }: MediaShowContainerProps) => {
  return (
    <div className="relative isolate -mt-(--header-h) overflow-hidden pt-(--header-h)">
      {data && <GradientImageContainer path={data.backdrop_path} />}
      <SingleMediaContainer credits={credits} data={data} type={type} />
    </div>
  );
};

export default MediaShowContainer;
