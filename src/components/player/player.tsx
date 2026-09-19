"use client";

import { MediaVideoType } from "@/types";
import React, { useMemo } from "react";

import { Plyr, PlyrSource } from "plyr-react";
import "plyr-react/plyr.css";
import { YOUTUBE_VIDEO_BASE_URL } from "@/utils";

interface PlayerProps {
  data: MediaVideoType[] | null;
}

const options = {
  keyboard: { focused: true, global: true },
  ratio: "16:9",
  quality: {
    default: 1080,
    options: [2160, 1440, 1080, 720, 576, 480, 360, 240],
  },
};

const Player = ({ data }: PlayerProps) => {
  const sources = useMemo<PlyrSource["sources"]>(() => {
    if (!data) return [];

    return data
      .filter((subData) => subData.site === "YouTube" && subData.type === "Trailer")
      .map((subData) => ({
        src: `${YOUTUBE_VIDEO_BASE_URL}${subData.key}`,
        provider: "youtube" as const,
      }));
  }, [data]);

  if (!sources.length) {
    return (
      <div className="flex w-full max-w-[1200px] items-center justify-center py-24 text-white/70">
        No trailer is available for this title yet.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px]">
      <Plyr
        source={{
          sources,
          type: "video",
        }}
        options={options}
      />
    </div>
  );
};

export default Player;
