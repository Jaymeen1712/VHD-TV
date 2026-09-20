"use client";

import { SingleMediaType } from "@/types";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";

import paths from "@/app/paths";

const PlayerContainerDetails = ({ data }: { data: SingleMediaType }) => {
  const router = useRouter();
  const isTv = data.media_type === "tv";
  const title = isTv ? data.name : data.title;

  const handleDetailClick = () => {
    router.push(isTv ? paths.series(data.id) : paths.movie(data.id));
  };

  return (
    <div className="flex min-h-[90px] items-center justify-between gap-4 rounded-t-xl bg-neutral-900 px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <h1 className="truncate text-lg font-bold text-white">{title}</h1>
        <span className="shrink-0 rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary">
          TRAILER
        </span>
      </div>
      <button
        onClick={handleDetailClick}
        className="flex shrink-0 items-center justify-center text-lg font-bold text-white transition-colors hover:text-primary"
      >
        <FaInfoCircle color="white" className="mr-2" />
        Detail
      </button>
    </div>
  );
};

export default PlayerContainerDetails;
