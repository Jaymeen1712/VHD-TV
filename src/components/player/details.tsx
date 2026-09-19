"use client";

import { CommonCardType } from "@/types";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";

const PlayerContainerDetails = ({ data }: { data: CommonCardType }) => {
  const router = useRouter();

  const handleDetailClick = () => {
    const path =
      !data.first_air_date || data.media_type === "movie"
        ? "/movie"
        : "/series";
    router.push(`${path}/${data.id}`);
  };

  return (
    <div className="flex min-h-[90px] items-center justify-between gap-4 bg-neutral-900 px-(--shell-x) py-4">
      <h1 className="truncate text-lg font-bold text-white">
        {data.title || data.name}
      </h1>
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
