"use client";

import { MediaVideoType, SingleMediaType } from "@/types";
import dynamic from "next/dynamic";
import React from "react";
import PlayerContainerDetails from "./details";

const Player = dynamic(() => import("./player"), { ssr: false });

interface PlayerContainerProps {
  videoDetails: MediaVideoType[] | null;
  mediaDetails: SingleMediaType | null;
}

const PlayerContainer = ({
  videoDetails,
  mediaDetails,
}: PlayerContainerProps) => {
  return (
    <div className="page-shell w-full">
      <div className="mx-auto w-full max-w-[1100px] py-8">
        {mediaDetails && <PlayerContainerDetails data={mediaDetails} />}
        {videoDetails && <Player data={videoDetails} />}
        <p className="mt-3 text-center text-xs text-white/40">
          VHD TV plays official trailers and clips.
        </p>
      </div>
    </div>
  );
};

export default PlayerContainer;
