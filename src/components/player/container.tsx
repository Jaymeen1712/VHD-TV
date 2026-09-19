"use client";

import { CommonCardType, MediaVideoType } from "@/types";
import dynamic from "next/dynamic";
import React from "react";
import PlayerContainerDetails from "./details";

const Player = dynamic(() => import("./player"), { ssr: false });

interface PlayerContainerProps {
  videoDetails: MediaVideoType[] | null;
  mediaDetails: CommonCardType | null;
}

const PlayerContainer = ({
  videoDetails,
  mediaDetails,
}: PlayerContainerProps) => {
  return (
    <div className="page-shell w-full">
      <div className="mx-auto py-12">
        <div className="flex justify-center">
          <div className="items-center justify-center">
            {mediaDetails && <PlayerContainerDetails data={mediaDetails} />}
            {videoDetails && <Player data={videoDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
