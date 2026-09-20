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
      <h1 className="truncate text-lg font-bold text-white">{title}</h1>
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
