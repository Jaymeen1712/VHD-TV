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

// Prefer an official Trailer, but fall back through Teaser/Clip/Featurette
// rather than showing "no trailer" just because only a teaser exists.
const TYPE_PRIORITY: Record<string, number> = {
  Trailer: 0,
  Teaser: 1,
  Clip: 2,
  Featurette: 3,
};

const Player = ({ data }: PlayerProps) => {
  const sources = useMemo<PlyrSource["sources"]>(() => {
    if (!data) return [];

    const best = [...data]
      .filter((subData) => subData.site === "YouTube")
      .sort((a, b) => {
        if (a.official !== b.official) return a.official ? -1 : 1;
        const typeDiff =
          (TYPE_PRIORITY[a.type] ?? 99) - (TYPE_PRIORITY[b.type] ?? 99);
        if (typeDiff !== 0) return typeDiff;
        return (
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
        );
      })[0];

    if (!best) return [];

    return [
      {
        src: `${YOUTUBE_VIDEO_BASE_URL}${best.key}`,
        provider: "youtube" as const,
      },
    ];
  }, [data]);

  if (!sources.length) {
    return (
      <div className="flex w-full items-center justify-center py-24 text-white/70">
        No trailer is available for this title yet.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-b-xl">
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
