import { getMediaDetailsAPI, getMediaVideosAPI } from "@/apis/common";
import PlayerContainer from "@/components/player/container";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface WatchPageProps {
  params: Promise<{
    media: string;
    mediaId: string;
  }>;
}

const isValidMedia = (media: string): media is "movie" | "tv" =>
  media === "movie" || media === "tv";

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  const { media, mediaId } = await params;
  if (!isValidMedia(media)) return {};

  const { response } = await getMediaDetailsAPI(media, mediaId);
  if (!response) return {};

  const title = response.media_type === "movie" ? response.title : response.name;

  return {
    title: `Watch ${title} | VHD TV`,
  };
}

const WatchPage = async ({ params }: WatchPageProps) => {
  const { media, mediaId } = await params;

  if (!isValidMedia(media)) notFound();

  const [
    { response: mediaVideosResponse, errors: mediaVideosErrors },
    { response: mediaDetailsResponse, errors: mediaDetailsErrors },
  ] = await Promise.all([
    getMediaVideosAPI(media, mediaId),
    getMediaDetailsAPI(media, mediaId),
  ]);

  return (
    <div className="animate-fade-in flex-1 bg-neutral-800">
      {!mediaVideosErrors && !mediaDetailsErrors && (
        <PlayerContainer
          videoDetails={mediaVideosResponse?.results ?? null}
          mediaDetails={mediaDetailsResponse}
        />
      )}
    </div>
  );
};

export default WatchPage;
